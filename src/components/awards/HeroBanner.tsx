import Image from "next/image";

interface HeroBannerProps {
  subtitle: string;
  title: string;
}

export function HeroBanner({ subtitle, title }: HeroBannerProps) {
  return (
    <section className="relative w-full min-h-[320px] md:min-h-[400px] lg:min-h-[480px] overflow-hidden">
      {/* Background key visual */}
      <Image
        src="/assets/home/images/hero-keyvisual.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />

      {/* Gradient overlay - stronger bottom fade for title readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full min-h-[420px] md:min-h-[520px] lg:min-h-[627px] px-4 md:px-12 lg:px-[var(--spacing-hero-px)] pt-24 md:pt-28 lg:pt-32 pb-8 md:pb-12 lg:pb-16">
        {/* ROOT FURTHER title - left aligned */}
        <Image
          src="/assets/home/images/root-further-title.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          className="object-contain w-[180px] md:w-[300px] lg:w-[400px] h-auto"
        />

        {/* Spacer to push section title to bottom */}
        <div className="flex-1" />

        {/* Section title - centered at bottom */}
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <p
            className="text-sm md:text-lg lg:text-2xl font-bold leading-8 text-white"
            aria-hidden="true"
          >
            {subtitle}
          </p>
          <h1 className="text-[24px] md:text-[36px] lg:text-[57px] font-bold leading-[32px] md:leading-[44px] lg:leading-[64px] text-[var(--color-primary)] text-center tracking-[-0.25px]">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}
