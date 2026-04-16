import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { userSearchSchema } from "@/libs/validations/kudos";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = userSearchSchema.safeParse({
    q: searchParams.get("q") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { q } = parsed.data;

  // Search user_profiles by display_name, exclude current user
  const { data: profiles, error } = await supabase
    .from("user_profiles")
    .select(`
      user_id,
      display_name,
      star_level,
      department:departments(name)
    `)
    .neq("user_id", user.id)
    .ilike("display_name", `%${q}%`)
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = (profiles ?? []).map((p: any) => {
    const dept = Array.isArray(p.department) ? p.department[0] : p.department;
    return {
      user_id: p.user_id,
      name: p.display_name ?? p.user_id,
      avatar_url: null,
      department: dept?.name ?? "",
    };
  });

  return NextResponse.json({ data: results });
}
