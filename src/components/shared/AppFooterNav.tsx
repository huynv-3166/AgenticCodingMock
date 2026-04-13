"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterNavLabels = {
  aboutSaa: string;
  awardInformation: string;
  sunKudos: string;
  communityStandards: string;
};

export function AppFooterNav({ navLabels }: { navLabels: FooterNavLabels }) {
  const pathname = usePathname();

  const NAV_LINKS = [
    { label: navLabels.aboutSaa, href: "/" },
    { label: navLabels.awardInformation, href: "/awards" },
    { label: navLabels.sunKudos, href: "/sun-kudos" },
    { label: navLabels.communityStandards, href: "/community-standards" },
  ];

  return (
    <nav className="flex flex-wrap justify-center gap-12">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-base font-bold rounded px-4 py-4 transition-colors duration-150 ${
              isActive
                ? "text-white bg-[rgba(255,234,158,0.10)]"
                : "text-white hover:text-[#FFEA9E] hover:bg-[rgba(255,234,158,0.10)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
