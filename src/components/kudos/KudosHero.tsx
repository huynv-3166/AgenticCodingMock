import Image from "next/image";

interface KudosHeroProps {
  heroTitle: string;
  writePlaceholder: string;
  searchLabel: string;
  onOpenWriteModal?: () => void;
}

export function KudosHero({
  heroTitle,
  writePlaceholder,
  searchLabel,
  onOpenWriteModal,
}: KudosHeroProps) {
  return (
    <section className="relative w-full h-[400px] md:h-[512px] overflow-hidden">
      {/* Background image — from Figma node I2940:13432;2167:5141 */}
      <Image
        src="/assets/kudos/kv-kudos-bg.png"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      {/* Gradient overlay — design-style.md KV Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(25deg, #00101A 14.74%, rgba(0, 19, 32, 0.00) 47.8%)",
        }}
        aria-hidden="true"
      />

      {/* Content — positioned at bottom-left per Figma */}
      <div className="relative z-10 flex flex-col justify-end h-full px-4 md:px-10 lg:px-[144px] pb-10 md:pb-[120px] pt-[96px]">
        {/* Title + KUDOS logo */}
        <div className="flex flex-col gap-2 mb-6 md:mb-8">
          <h1 className="font-bold text-xl md:text-[36px] md:leading-[44px] text-[#FFEA9E]">
            {heroTitle}
          </h1>
          {/* KUDOS logo SVG — from Figma node 2940:13440 */}
          <Image
            src="/assets/kudos/kudos-logo.svg"
            alt="KUDOS"
            width={593}
            height={106}
            className="w-[280px] md:w-[450px] lg:w-[593px] h-auto opacity-80"
          />
        </div>

        {/* Action buttons row */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6">
          {/* Write Kudos CTA — pill shape 738x72 per design-style */}
          <button
            onClick={onOpenWriteModal}
            className="flex items-center gap-3 w-full md:w-[738px] h-14 md:h-[72px] px-4 md:px-6 rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.10)] text-white font-bold text-sm md:text-base leading-6 tracking-[0.15px] transition-colors hover:bg-[rgba(255,234,158,0.20)] hover:border-[#FFEA9E] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            {/* Pen icon — from Figma */}
            <Image
              src="/assets/kudos/icon-pen.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="truncate text-left opacity-70">
              {writePlaceholder}
            </span>
          </button>

          {/* Search button — pill shape 381x72 per design-style */}
          <button
            className="flex items-center justify-center gap-2 w-full md:w-[381px] h-14 md:h-[72px] px-4 md:px-6 rounded-[68px] border border-[#998C5F] bg-[rgba(255,234,158,0.10)] text-white font-bold text-sm md:text-base leading-6 tracking-[0.15px] transition-colors hover:bg-[rgba(255,234,158,0.20)] hover:border-[#FFEA9E] focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2"
          >
            {/* Search icon — from Figma */}
            <Image
              src="/assets/kudos/icon-search.svg"
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 md:w-8 md:h-8"
              aria-hidden="true"
            />
            <span>{searchLabel}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
