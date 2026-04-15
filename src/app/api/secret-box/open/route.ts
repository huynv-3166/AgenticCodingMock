import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find the oldest unopened box for this user
  const { data: box, error: findError } = await supabase
    .from("secret_boxes")
    .select("id, gift_details")
    .eq("user_id", user.id)
    .eq("is_opened", false)
    .order("id", { ascending: true })
    .limit(1)
    .single();

  if (findError || !box) {
    return NextResponse.json(
      { error: "No unopened boxes" },
      { status: 404 }
    );
  }

  // Open the box
  const { error: updateError } = await supabase
    .from("secret_boxes")
    .update({ is_opened: true, opened_at: new Date().toISOString() })
    .eq("id", box.id);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  // Count remaining unopened
  const { count } = await supabase
    .from("secret_boxes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_opened", false);

  return NextResponse.json({
    gift_details: box.gift_details ?? "",
    remaining_unopened: count ?? 0,
  });
}
