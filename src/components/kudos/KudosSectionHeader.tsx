interface KudosSectionHeaderProps {
  subtitle: string;
  title: string;
  children?: React.ReactNode; // For filter buttons
}

export function KudosSectionHeader({
  subtitle,
  title,
  children,
}: KudosSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-2 px-4 md:px-10 lg:px-[144px]">
      {/* Subtitle */}
      <p className="font-bold text-base md:text-2xl leading-8 text-white">
        {subtitle}
      </p>

      {/* Divider — tight to subtitle */}
      <div className="w-full h-px bg-[var(--color-divider)]" />

      {/* Title row — tight to divider, same line as filter buttons on desktop */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-1">
        <h2 className="font-bold text-[28px] md:text-[40px] lg:text-[57px] leading-[36px] md:leading-[48px] lg:leading-[64px] tracking-[-0.25px] text-[var(--color-primary)]">
          {title}
        </h2>
        {children && (
          <div className="flex items-center gap-4">{children}</div>
        )}
      </div>
    </div>
  );
}
