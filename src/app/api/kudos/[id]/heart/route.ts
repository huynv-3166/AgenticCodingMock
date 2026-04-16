import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(
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

  const { id: kudoId } = await params;

  // Check kudo exists and get sender
  const { data: kudo, error: kudoError } = await supabase
    .from("kudos")
    .select("id, sender_id")
    .eq("id", kudoId)
    .single();

  if (kudoError || !kudo) {
    return NextResponse.json({ error: "Kudo not found" }, { status: 404 });
  }

  // Self-like allowed — no restriction on hearting own kudos

  // Get current special day multiplier
  const today = new Date().toISOString().split("T")[0];
  const { data: specialDay } = await supabase
    .from("special_days")
    .select("heart_multiplier")
    .eq("date", today)
    .single();

  const multiplier = specialDay?.heart_multiplier ?? 1;

  // Insert heart (unique constraint prevents duplicates)
  const { error: heartError } = await supabase.from("hearts").insert({
    kudo_id: kudoId,
    user_id: user.id,
    multiplier,
  });

  if (heartError) {
    if (heartError.code === "23505") {
      return NextResponse.json(
        { error: "Already hearted" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: heartError.message }, { status: 500 });
  }

  // Fetch updated heart count
  const { data: updated } = await supabase
    .from("kudos")
    .select("heart_count")
    .eq("id", kudoId)
    .single();

  return NextResponse.json(
    { heart_count: updated?.heart_count ?? 0, multiplier },
    { status: 201 }
  );
}

export async function DELETE(
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

  const { id: kudoId } = await params;

  const { error } = await supabase
    .from("hearts")
    .delete()
    .eq("kudo_id", kudoId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "Heart not found" }, { status: 404 });
  }

  const { data: updated } = await supabase
    .from("kudos")
    .select("heart_count")
    .eq("id", kudoId)
    .single();

  return NextResponse.json({ heart_count: updated?.heart_count ?? 0 });
}
