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

// Figma: 109x19px pill with background image (Root Further visual, darkened) + white text
// border: 0.5px solid #FFEA9E, radius: 48px
// bg: linear-gradient(rgba(9,36,50,0.5), rgba(9,36,50,0.5)), url(kv-kudos-bg.png)
// text: Montserrat 11.4px 700 #FFF, text-shadow: 0 0.386px 1.543px #000
export function HeroBadge({ level }: HeroBadgeProps) {
  if (level <= 0 || level > 3) return null;

  return (
    <span
      className="relative inline-flex items-center justify-center w-[109px] h-[19px] rounded-[48px] border-[0.5px] border-[#FFEA9E] overflow-hidden font-bold whitespace-nowrap"
      style={{
        fontSize: "11.4px",
        lineHeight: "16.3px",
        letterSpacing: "0.081px",
      }}
      title={BADGE_TOOLTIPS[level]}
    >
      {/* Background: event visual with dark overlay */}
      <span
        className="absolute inset-0"
        style={{
          background: "linear-gradient(0deg, rgba(9,36,50,0.50) 0%, rgba(9,36,50,0.50) 100%), url(/assets/kudos/kv-kudos-bg.png) lightgray center / cover no-repeat",
        }}
        aria-hidden="true"
      />
      {/* Text */}
      <span
        className="relative z-10 text-white"
        style={{ textShadow: "0 0.386px 1.543px #000" }}
      >
        {BADGE_LABELS[level]}
      </span>
    </span>
  );
}
