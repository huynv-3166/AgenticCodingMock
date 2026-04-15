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

  // Get user profile stats
  const { data: profile } = await supabase
    .from("user_profiles")
    .select(
      "kudo_received_count, kudo_sent_count, heart_received_count"
    )
    .eq("user_id", user.id)
    .single();

  // Count secret boxes
  const { count: openedCount } = await supabase
    .from("secret_boxes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_opened", true);

  const { count: unopenedCount } = await supabase
    .from("secret_boxes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_opened", false);

  return NextResponse.json({
    kudos_received: profile?.kudo_received_count ?? 0,
    kudos_sent: profile?.kudo_sent_count ?? 0,
    hearts_received: profile?.heart_received_count ?? 0,
    secret_boxes_opened: openedCount ?? 0,
    secret_boxes_unopened: unopenedCount ?? 0,
  });
}
