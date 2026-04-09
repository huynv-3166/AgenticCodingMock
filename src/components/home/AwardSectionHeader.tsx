type AwardSectionHeaderProps = {
  caption: string;
  title: string;
  subtitle: string;
};

export function AwardSectionHeader({
  caption,
  title,
  subtitle,
}: AwardSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-base font-bold text-[var(--color-primary)]">
        {caption}
      </span>
      <h2 className="text-4xl lg:text-[57px] font-bold text-white leading-tight lg:leading-[64px] tracking-[-0.25px]">
        {title}
      </h2>
      <p className="text-base font-normal text-white">
        {subtitle}
      </p>
    </div>
  );
}
