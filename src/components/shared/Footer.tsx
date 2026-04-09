import type { Dictionary } from "@/libs/i18n";

export function Footer({ dictionary }: { dictionary: Dictionary }) {
  return (
    <footer className="w-full border-t border-[var(--color-divider)] px-4 py-6 md:px-12 md:py-8 lg:px-[var(--spacing-footer-px)] lg:py-[var(--spacing-footer-py)] flex items-center justify-center lg:justify-between">
      <span className="w-full text-center text-base font-bold text-white font-[family-name:var(--font-montserrat-alternates)] leading-6">
        {dictionary.footer_copyright}
      </span>
    </footer>
  );
}
