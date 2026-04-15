import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const { data: kudo, error } = await supabase
    .from("kudos")
    .select(
      `
      id, message, category, is_anonymous, heart_count, created_at,
      sender:user_profiles!kudos_sender_id_fkey(user_id, star_level, department:departments(name, code)),
      receiver:user_profiles!kudos_receiver_id_fkey(user_id, star_level, department:departments(name, code)),
      hashtags:kudo_hashtags(hashtag:hashtags(name)),
      images:kudo_images(image_url, display_order),
      hearts!left(user_id)
    `
    )
    .eq("id", id)
    .single();

  if (error || !kudo) {
    return NextResponse.json(
      { error: "Kudo not found" },
      { status: 404 }
    );
  }

  const s = Array.isArray(kudo.sender) ? kudo.sender[0] : kudo.sender;
  const r = Array.isArray(kudo.receiver) ? kudo.receiver[0] : kudo.receiver;
  const sDept = Array.isArray(s?.department) ? s.department[0] : s?.department;
  const rDept = Array.isArray(r?.department) ? r.department[0] : r?.department;

  return NextResponse.json({
    data: {
      id: kudo.id,
      sender: {
        user_id: s?.user_id ?? "",
        name: "",
        avatar_url: null,
        department: sDept?.name ?? "",
        department_code: sDept?.code ?? "",
        star_level: s?.star_level ?? 0,
      },
      receiver: {
        user_id: r?.user_id ?? "",
        name: "",
        avatar_url: null,
        department: rDept?.name ?? "",
        department_code: rDept?.code ?? "",
        star_level: r?.star_level ?? 0,
      },
      message: kudo.message,
      category: kudo.category,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      hashtags: (kudo.hashtags ?? []).map((h: any) => { const ht = Array.isArray(h.hashtag) ? h.hashtag[0] : h.hashtag; return ht?.name ?? ""; }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: (kudo.images ?? []).sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)).map((i: any) => i.image_url),
      heart_count: kudo.heart_count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      is_hearted_by_me: (kudo.hearts ?? []).some((h: any) => h.user_id === user.id),
      is_anonymous: kudo.is_anonymous,
      created_at: kudo.created_at,
    },
  });
}
