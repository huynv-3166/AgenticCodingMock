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

  // Get total kudos count
  const { count: totalKudos } = await supabase
    .from("kudos")
    .select("*", { count: "exact", head: true });

  // Get kudo recipient counts grouped by receiver
  const { data: receivers, error } = await supabase
    .from("kudos")
    .select("receiver_id")
    .then(({ data, error }) => {
      if (error || !data) return { data: null, error };

      const countMap = new Map<string, number>();
      for (const kudo of data) {
        const count = countMap.get(kudo.receiver_id) ?? 0;
        countMap.set(kudo.receiver_id, count + 1);
      }

      const nodes = Array.from(countMap.entries()).map(
        ([userId, kudoCount]) => ({
          user_id: userId,
          kudo_count: kudoCount,
        })
      );

      return { data: nodes, error: null };
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch user profiles for the receivers
  const userIds = (receivers ?? []).map((r) => r.user_id);
  const { data: profiles } = await supabase
    .from("user_profiles")
    .select("user_id")
    .in("user_id", userIds);

  const nodes = (receivers ?? []).map((r) => {
    const profile = (profiles ?? []).find((p) => p.user_id === r.user_id);
    return {
      user_id: r.user_id,
      name: profile ? "" : "Unknown",
      kudo_count: r.kudo_count,
      avatar_url: null,
    };
  });

  return NextResponse.json({
    total_kudos: totalKudos ?? 0,
    nodes,
  });
}
