import Image from "next/image";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import type { Language } from "@/types";

export function Header({ currentLanguage }: { currentLanguage: Language }) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-[80px] bg-[rgba(11,15,18,0.8)] px-4 md:px-12 lg:px-[var(--spacing-header-px)] py-[var(--spacing-header-py)] flex items-center justify-between z-50">
      {/* Logo */}
      <div className="w-10 h-9 md:w-[52px] md:h-[56px] relative">
        <Image
          src="/assets/auth/login/saa-logo.png"
          alt="Sun Annual Awards 2025"
          width={52}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Language selector */}
      <LanguageSelector currentLanguage={currentLanguage} />
    </header>
  );
}
