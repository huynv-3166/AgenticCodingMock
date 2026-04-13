import Image from "next/image";
import type { Dictionary } from "@/libs/i18n";
import { AppFooterNav } from "./AppFooterNav";

export function AppFooter({ dictionary }: { dictionary: Dictionary }) {
  const footerNavLabels = {
    aboutSaa: dictionary.nav_about_saa,
    awardInformation: dictionary.nav_award_information,
    sunKudos: dictionary.nav_sun_kudos,
    communityStandards: dictionary.nav_community_standards,
  };

  return (
    <footer className="w-full border-t border-[#2E3940] px-4 py-6 md:px-12 md:py-8 lg:px-[90px] lg:py-10 flex flex-col gap-6 items-center md:flex-row md:justify-between">
      {/* Left: Logo */}
      <a href="#">
        <Image
          src="/assets/home/logos/footer-logo.png"
          alt="Sun Annual Awards 2025"
          width={69}
          height={64}
          className="object-contain"
        />
      </a>

      {/* Center: Nav links (client component for active state) */}
      <AppFooterNav navLabels={footerNavLabels} />

      {/* Right: Copyright */}
      <span className="text-base text-white font-[family-name:var(--font-montserrat-alternates)] whitespace-nowrap">
        {dictionary.footer_copyright}
      </span>
    </footer>
  );
}
