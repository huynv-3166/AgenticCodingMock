import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon";

interface HeroCTAProps {
  aboutAwardsLabel: string;
  aboutKudosLabel: string;
}

export function HeroCTA({ aboutAwardsLabel, aboutKudosLabel }: HeroCTAProps) {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      {/* ABOUT AWARDS button */}
      <Link
        href="/awards"
        className="flex w-[276px] max-w-full h-[60px] items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] px-6 py-4 text-[22px] font-bold text-[#00101A] transition-all duration-150 hover:bg-[#F5DC82]"
      >
        {aboutAwardsLabel}
        <ArrowRightIcon className="text-[#00101A]" />
      </Link>

      {/* ABOUT KUDOS button */}
      <Link
        href="/sun-kudos"
        className="flex h-[60px] items-center justify-center gap-2 rounded-lg border border-[#998C5F] px-6 py-4 text-[22px] font-bold text-[#FFEA9E] transition-all duration-150 hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent"
      >
        {aboutKudosLabel}
        <ArrowRightIcon className="text-[#FFEA9E]" />
      </Link>
    </div>
  );
}
