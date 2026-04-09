import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About SAA 2025", href: "/" },
  { label: "Award Information", href: "/awards-information" },
  { label: "Sun* Kudos", href: "/sun-kudos" },
  { label: "Tiêu chuẩn chung", href: "/community-standards" },
];

export function AppFooter() {
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

      {/* Center: Nav links */}
      <nav className="flex flex-wrap justify-center gap-12">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base font-bold text-white hover:text-[#FFEA9E] hover:bg-[rgba(255,234,158,0.10)] rounded px-4 py-4 transition-colors duration-150"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right: Copyright */}
      <span className="text-base text-white font-[family-name:var(--font-montserrat-alternates)] whitespace-nowrap">
        Bản quyền thuộc về Sun* © 2025
      </span>
    </footer>
  );
}
