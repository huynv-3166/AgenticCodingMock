"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About SAA 2025", href: "/" },
  { label: "Award Information", href: "/awards" },
  { label: "Sun* Kudos", href: "/sun-kudos" },
  { label: "Tiêu chuẩn chung", href: "/community-standards" },
];

export function AppFooterNav() {
  const pathname = usePathname();

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
