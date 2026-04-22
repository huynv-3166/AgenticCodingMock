import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { kudoFeedParamsSchema, createKudoSchema } from "@/libs/validations/kudos";
import { sanitizeKudoHtml } from "@/libs/utils/sanitize";
import {
  fetchProfileMapForKudos,
  formatKudo,
  resolveDepartmentReceiverIds,
  resolveHashtagKudoIds,
} from "@/libs/kudos/queries";

const emptyFeed = { data: [], nextCursor: null, total: 0 };

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = kudoFeedParamsSchema.safeParse({
    cursor: searchParams.get("cursor") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    hashtag: searchParams.get("hashtag") ?? undefined,
    department: searchParams.get("department") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { cursor, limit, hashtag, department } = parsed.data;

  const hashtagKudoIds = await resolveHashtagKudoIds(supabase, hashtag);
  const departmentReceiverIds = await resolveDepartmentReceiverIds(supabase, department);

  // An empty array means "filter applied but no matches" — short-circuit.
  if (hashtagKudoIds?.length === 0 || departmentReceiverIds?.length === 0) {
    return NextResponse.json(emptyFeed);
  }

  // Query kudos (no direct FK to user_profiles — join separately)
  let query = supabase
    .from("kudos")
    .select(
      `
      id, sender_id, receiver_id, message, category, is_anonymous, anonymous_name, heart_count, created_at,
      hashtags:kudo_hashtags(hashtag:hashtags(name)),
      images:kudo_images(image_url, display_order),
      hearts!left(user_id)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) query = query.lt("created_at", cursor);
  if (hashtagKudoIds) query = query.in("id", hashtagKudoIds);
  if (departmentReceiverIds) query = query.in("receiver_id", departmentReceiverIds);

  const { data: kudos, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const profileMap = await fetchProfileMapForKudos(supabase, kudos ?? []);
  const formattedKudos = (kudos ?? []).map((kudo) => formatKudo(kudo, profileMap, user.id));

  const lastItem = formattedKudos[formattedKudos.length - 1];
  const nextCursor = formattedKudos.length === limit ? lastItem?.created_at ?? null : null;

  return NextResponse.json({
    data: formattedKudos,
    nextCursor,
    total: count ?? 0,
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createKudoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const input = parsed.data;

  // Self-send rejection
  if (input.recipient_id === user.id) {
    return NextResponse.json(
      { error: "Cannot send kudos to yourself" },
      { status: 400 }
    );
  }

  // Sanitize HTML message
  const sanitizedMessage = sanitizeKudoHtml(input.message);

  // Only persist a custom anonymous name when anonymous mode is on and a name was provided.
  const anonymousName =
    input.is_anonymous && input.anonymous_name?.trim()
      ? input.anonymous_name.trim()
      : null;

  try {
    // Step 1: Insert kudo
    const { data: kudo, error: kudoError } = await supabase
      .from("kudos")
      .insert({
        sender_id: user.id,
        receiver_id: input.recipient_id,
        message: sanitizedMessage,
        category: input.badge_title,
        is_anonymous: input.is_anonymous,
        anonymous_name: anonymousName,
        heart_count: 0,
      })
      .select("id, created_at")
      .single();

    if (kudoError || !kudo) {
      return NextResponse.json(
        { error: kudoError?.message ?? "Failed to create kudo" },
        { status: 500 }
      );
    }

    // Step 2: Insert hashtag junctions
    if (input.hashtag_ids.length > 0) {
      const hashtagRows = input.hashtag_ids.map((hashtagId) => ({
        kudo_id: kudo.id,
        hashtag_id: hashtagId,
      }));

      const { error: hashtagError } = await supabase
        .from("kudo_hashtags")
        .insert(hashtagRows);

      if (hashtagError) {
        // Rollback: delete the kudo
        await supabase.from("kudos").delete().eq("id", kudo.id);
        return NextResponse.json(
          { error: `Failed to add hashtags: ${hashtagError.message}` },
          { status: 500 }
        );
      }
    }

    // Step 3: Insert images with display_order
    if (input.image_urls.length > 0) {
      const imageRows = input.image_urls.map((url, index) => ({
        kudo_id: kudo.id,
        image_url: url,
        display_order: index,
      }));

      const { error: imageError } = await supabase
        .from("kudo_images")
        .insert(imageRows);

      if (imageError) {
        // Rollback: delete hashtags and kudo
        await supabase.from("kudo_hashtags").delete().eq("kudo_id", kudo.id);
        await supabase.from("kudos").delete().eq("id", kudo.id);
        return NextResponse.json(
          { error: `Failed to add images: ${imageError.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      data: {
        id: kudo.id,
        created_at: kudo.created_at,
      },
    }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

