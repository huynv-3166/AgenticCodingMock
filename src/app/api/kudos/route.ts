import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { kudoFeedParamsSchema } from "@/libs/validations/kudos";

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

  let query = supabase
    .from("kudos")
    .select(
      `
      id, message, category, is_anonymous, heart_count, created_at,
      sender:user_profiles!kudos_sender_id_fkey(user_id, star_level, department:departments(name, code)),
      receiver:user_profiles!kudos_receiver_id_fkey(user_id, star_level, department:departments(name, code)),
      hashtags:kudo_hashtags(hashtag:hashtags(name)),
      images:kudo_images(image_url, display_order),
      hearts!left(user_id)
    `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  if (hashtag) {
    query = query.filter(
      "kudo_hashtags.hashtags.name",
      "eq",
      hashtag
    );
  }

  if (department) {
    query = query.or(
      `sender_id.in.(select user_id from user_profiles inner join departments on user_profiles.department_id = departments.id where departments.code = '${department}'),receiver_id.in.(select user_id from user_profiles inner join departments on user_profiles.department_id = departments.id where departments.code = '${department}')`
    );
  }

  const { data: kudos, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedKudos = (kudos ?? []).map((kudo: any) => ({
    id: kudo.id,
    sender: formatUserInfo(kudo.sender, kudo.is_anonymous),
    receiver: formatUserInfo(kudo.receiver, false),
    message: kudo.message,
    category: kudo.category,
    hashtags: (kudo.hashtags ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (h: any) => {
        const hashtag = Array.isArray(h.hashtag) ? h.hashtag[0] : h.hashtag;
        return hashtag?.name ?? "";
      }
    ),
    images: (kudo.images ?? [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((i: any) => i.image_url),
    heart_count: kudo.heart_count,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    is_hearted_by_me: (kudo.hearts ?? []).some((h: any) => h.user_id === user.id),
    is_anonymous: kudo.is_anonymous,
    created_at: kudo.created_at,
  }));

  const lastItem = formattedKudos[formattedKudos.length - 1];
  const nextCursor = formattedKudos.length === limit ? lastItem?.created_at ?? null : null;

  return NextResponse.json({
    data: formattedKudos,
    nextCursor,
    total: count ?? 0,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatUserInfo(profileData: any, isAnonymous: boolean) {
  const profile = Array.isArray(profileData) ? profileData[0] : profileData;
  if (!profile || isAnonymous) {
    return {
      user_id: "",
      name: "An danh",
      avatar_url: null,
      department: "",
      department_code: "",
      star_level: 0,
    };
  }
  const dept = Array.isArray(profile.department) ? profile.department[0] : profile.department;
  return {
    user_id: profile.user_id ?? "",
    name: "",
    avatar_url: null,
    department: dept?.name ?? "",
    department_code: dept?.code ?? "",
    star_level: profile.star_level ?? 0,
  };
}
