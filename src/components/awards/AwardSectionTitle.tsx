interface AwardSectionTitleProps {
  subtitle: string;
  title: string;
}

export function AwardSectionTitle({ subtitle, title }: AwardSectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 md:px-8 lg:px-[var(--spacing-hero-px)] py-12 lg:py-[var(--spacing-hero-py)]">
      <p
        className="text-base md:text-xl lg:text-2xl font-bold leading-8 text-[var(--color-divider)]"
        aria-hidden="true"
      >
        {subtitle}
      </p>
      <h1 className="text-[32px] md:text-[40px] lg:text-[57px] font-bold leading-[40px] md:leading-[48px] lg:leading-[64px] text-[var(--color-primary)] text-center tracking-[-0.25px]">
        {title}
      </h1>
    </div>
  );
}
