import Image from "next/image";
import type { Dictionary } from "@/libs/i18n";

export function LoginHero({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-[var(--spacing-hero-gap)]">
      {/* ROOT FURTHER key visual */}
      <div className="w-full max-w-[280px] md:w-[360px] md:max-w-none lg:w-[451px] relative">
        <Image
          src="/assets/auth/login/root-further.png"
          alt="Root Further"
          width={451}
          height={200}
          className="object-cover w-full h-auto"
          style={{ aspectRatio: "115 / 51" }}
        />
      </div>

      {/* Description text */}
      <div className="pl-0 md:pl-[var(--spacing-content-left)]">
        <p className="text-base leading-7 md:text-lg md:leading-9 lg:text-[20px] lg:leading-[40px] font-bold italic tracking-[0.5px] text-white">
          <span className="block">{dictionary.description_line1}</span>
          <span className="block">{dictionary.description_line2}</span>
        </p>
      </div>
    </div>
  );
}
