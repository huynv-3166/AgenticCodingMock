import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: boxes, error } = await supabase
    .from("secret_boxes")
    .select("user_id, gift_details, opened_at")
    .eq("is_opened", true)
    .order("opened_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const entries = (boxes ?? []).map((box) => ({
    user_id: box.user_id,
    name: "",
    avatar_url: null,
    gift_description: box.gift_details ?? "",
    opened_at: box.opened_at,
  }));

  return NextResponse.json({ data: entries });
}
