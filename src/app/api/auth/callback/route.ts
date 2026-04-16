import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Defense-in-depth: verify email domain
  const email = data.user?.email;
  if (!email || !email.endsWith("@sun-asterisk.com")) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Auto-create user_profile if first login (for Google OAuth users)
  const userId = data.user.id;
  const { data: existingProfile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!existingProfile) {
    const fullName = data.user.user_metadata?.full_name ?? data.user.email?.split("@")[0] ?? "";
    await supabase.from("user_profiles").insert({
      user_id: userId,
      display_name: fullName,
      star_level: 0,
      kudo_received_count: 0,
      kudo_sent_count: 0,
      heart_received_count: 0,
    });
  }

  return NextResponse.redirect(`${origin}/`);
}
