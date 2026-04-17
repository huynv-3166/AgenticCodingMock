import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/types";
import type { Dictionary } from "@/libs/i18n";
import { createClient } from "@/libs/supabase/server";
import { AppHeaderClient } from "@/components/shared/AppHeaderClient";
import { MobileMenuButton } from "@/components/shared/MobileMenuButton";

export async function AppHeader({
  currentLanguage,
  dictionary,
}: {
  currentLanguage: Language;
  dictionary: Dictionary;
}) {
  const navLabels = {
    aboutSaa: dictionary.nav_about_saa,
    awardInformation: dictionary.nav_award_information,
    sunKudos: dictionary.nav_sun_kudos,
    comingSoon: dictionary.coming_soon,
    logout: dictionary.profile_logout,
    guest: dictionary.profile_guest,
  };

  let userName: string | null = null;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .single();

      userName =
        (profile as { display_name?: string } | null)?.display_name ??
        user.user_metadata?.full_name ??
        user.email?.split("@")[0] ??
        null;
    }
  } catch {
    userName = null;
  }

  return (
    <header className="sticky top-0 z-50 w-full h-16 md:h-20 bg-[rgba(16,20,23,0.80)] backdrop-blur px-4 md:px-12 lg:px-[144px] py-3 flex items-center justify-between">
      {/* Left: Logo */}
      <Link href="/" className="shrink-0">
        <Image
          src="/assets/auth/login/saa-logo.png"
          alt="Sun Annual Awards 2025"
          width={52}
          height={48}
          className="w-10 h-9 md:w-[52px] md:h-12 object-cover"
        />
      </Link>

      {/* Center + Right: Desktop nav links and actions (handled by client component) */}
      <AppHeaderClient
        currentLanguage={currentLanguage}
        navLabels={navLabels}
        userName={userName}
      />

      {/* Mobile: Hamburger button (visible only below md) */}
      <MobileMenuButton currentLanguage={currentLanguage} navLabels={navLabels} />
    </header>
  );
}
