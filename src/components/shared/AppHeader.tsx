import Image from "next/image";
import Link from "next/link";
import type { Language } from "@/types";
import { AppHeaderClient } from "@/components/shared/AppHeaderClient";
import { MobileMenuButton } from "@/components/shared/MobileMenuButton";

export function AppHeader({ currentLanguage }: { currentLanguage: Language }) {
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
      <AppHeaderClient currentLanguage={currentLanguage} />

      {/* Mobile: Hamburger button (visible only below md) */}
      <MobileMenuButton />
    </header>
  );
}
