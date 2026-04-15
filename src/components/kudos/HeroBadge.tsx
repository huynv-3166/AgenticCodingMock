"use client";

interface HeroBadgeProps {
  level: number; // 0 = hidden, 1 = 10+, 2 = 20+, 3 = 50+
}

const BADGE_LABELS: Record<number, string> = {
  1: "New Hero",
  2: "Rising Hero",
  3: "Super Hero",
};

const BADGE_TOOLTIPS: Record<number, string> = {
  1: "Received 10+ kudos",
  2: "Received 20+ kudos",
  3: "Received 50+ kudos",
};

export function HeroBadge({ level }: HeroBadgeProps) {
  if (level <= 0 || level > 3) return null;

  const stars = "★".repeat(level);

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border-[0.5px] border-[var(--color-primary)] text-white font-bold leading-4 whitespace-nowrap"
      style={{ fontSize: "11.4px", lineHeight: "16.3px" }}
      title={BADGE_TOOLTIPS[level]}
    >
      <span className="text-[var(--color-primary)]">{stars}</span>
      <span>{BADGE_LABELS[level]}</span>
    </span>
  );
}
