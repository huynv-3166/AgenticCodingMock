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

  const today = new Date().toISOString().split("T")[0];
  const { data: specialDay } = await supabase
    .from("special_days")
    .select("heart_multiplier")
    .eq("date", today)
    .single();

  return NextResponse.json({
    active: !!specialDay,
    multiplier: specialDay?.heart_multiplier ?? 1,
  });
}
