import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { highlightParamsSchema } from "@/libs/validations/kudos";
import {
  fetchProfileMapForKudos,
  formatKudo,
  resolveDepartmentReceiverIds,
  resolveHashtagKudoIds,
} from "@/libs/kudos/queries";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = highlightParamsSchema.safeParse({
    hashtag: searchParams.get("hashtag") ?? undefined,
    department: searchParams.get("department") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid parameters" },
      { status: 400 }
    );
  }

  const { hashtag, department } = parsed.data;

  const hashtagKudoIds = await resolveHashtagKudoIds(supabase, hashtag);
  const departmentReceiverIds = await resolveDepartmentReceiverIds(supabase, department);

  if (hashtagKudoIds?.length === 0 || departmentReceiverIds?.length === 0) {
    return NextResponse.json({ data: [] });
  }

  // Spec (US3 AC#1, AC#6): highlight always shows the top 5 kudos with the most hearts,
  // kudos with 0 hearts never appear — filters further constrain this set.
  let query = supabase
    .from("kudos")
    .select(
      `
      id, sender_id, receiver_id, message, category, is_anonymous, anonymous_name, heart_count, created_at,
      hashtags:kudo_hashtags(hashtag:hashtags(name)),
      images:kudo_images(image_url, display_order),
      hearts!left(user_id)
    `
    )
    .order("heart_count", { ascending: false })
    .gt("heart_count", 0)
    .limit(5);

  if (hashtagKudoIds) query = query.in("id", hashtagKudoIds);
  if (departmentReceiverIds) query = query.in("receiver_id", departmentReceiverIds);

  const { data: kudos, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const profileMap = await fetchProfileMapForKudos(supabase, kudos ?? []);
  const formattedKudos = (kudos ?? []).map((kudo) => formatKudo(kudo, profileMap, user.id));

  return NextResponse.json({ data: formattedKudos });
}
