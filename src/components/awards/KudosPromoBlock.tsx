import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon";

interface KudosPromoBlockProps {
  label: string;
  description: string;
  ctaLabel: string;
}

export function KudosPromoBlock({
  label,
  description,
  ctaLabel,
}: KudosPromoBlockProps) {
  return (
    <section
      className="w-full max-w-[1152px] mx-auto px-4 md:px-8 lg:px-0 py-12 lg:py-0"
      aria-label="Sun* Kudos promotion"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-kudos-bg)] flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-[40px_90px] gap-8 lg:gap-0 min-h-[300px] lg:min-h-[500px]">
        {/* Background image */}
        <Image
          src="/assets/home/logos/kudos-bg.png"
          alt=""
          fill
          className="object-cover opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Left content */}
        <div className="relative z-10 flex flex-col gap-6 max-w-[500px]">
          <p className="text-base font-bold leading-6 text-white">{label}</p>
          <h2 className="text-[32px] md:text-[40px] lg:text-[57px] font-bold leading-[40px] md:leading-[48px] lg:leading-[64px] text-[var(--color-primary)] tracking-[-0.25px]">
            Sun* Kudos
          </h2>
          <p className="text-sm md:text-base font-bold leading-6 text-white tracking-[0.5px]">
            {description}
          </p>
          <Link
            href="/sun-kudos"
            className="inline-flex items-center gap-2 px-4 py-4 rounded bg-[var(--color-button-bg)] text-[var(--color-button-text)] font-bold text-base leading-6 w-fit transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            {ctaLabel}
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Right decorative */}
        <div className="relative z-10 flex items-center">
          <Image
            src="/assets/home/logos/kudos-label.svg"
            alt="Kudos"
            width={300}
            height={120}
            className="w-[200px] md:w-[250px] lg:w-[300px] h-auto opacity-80"
          />
        </div>
      </div>
    </section>
  );
}
