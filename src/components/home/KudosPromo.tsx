import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon";

type KudosPromoProps = {
  label: string;
  title: string;
  highlight: string;
  description: string;
  detailLabel: string;
};

export function KudosPromo({
  label,
  title,
  highlight,
  description,
  detailLabel,
}: KudosPromoProps) {
  return (
    <section className="w-full max-w-[1224px] mx-auto px-4 md:px-0">
      <div className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[400px] lg:min-h-[500px]">
        {/* Background image */}
        <Image
          src="/assets/home/logos/kudos-bg.png"
          alt=""
          fill
          sizes="1224px"
          className="object-cover"
        />

        {/* Left: Text content */}
        <div className="relative z-10 flex flex-col gap-4 p-8 md:p-12 lg:p-16 flex-1 justify-center">
          <span className="text-base font-bold text-white">
            {label}
          </span>
          <h2 className="text-4xl lg:text-[57px] font-bold text-[var(--color-primary)] leading-tight lg:leading-[64px]">
            {title}
          </h2>
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            {highlight}
          </span>
          <p className="text-sm font-normal text-white leading-6 max-w-[457px]">
            {description}
          </p>
          <Link
            href="/sun-kudos"
            className="inline-flex items-center justify-center gap-2 w-[127px] h-[56px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] rounded text-base font-medium text-[var(--color-bg-primary)] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 mt-4"
          >
            {detailLabel}
            <ArrowRightIcon className="w-6 h-6" />
          </Link>
        </div>

        {/* Right: KUDOS logo */}
        <div className="relative z-10 flex items-center justify-center w-full md:w-2/5 p-8 md:p-12">
          <Image
            src="/assets/home/logos/kudos-label.svg"
            alt="KUDOS"
            width={364}
            height={74}
            className="w-full max-w-[364px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
