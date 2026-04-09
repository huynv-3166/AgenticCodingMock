import Image from "next/image";

export function HeroSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px] w-full overflow-hidden">
      {/* Background key visual */}
      <Image
        src="/assets/home/images/hero-keyvisual.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0.00) 48.92%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-10 px-4 md:px-12 lg:px-[144px] pt-32 pb-24">
        {/* ROOT FURTHER title */}
        <Image
          src="/assets/home/images/root-further-title.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          className="object-contain w-full max-w-[451px] h-auto"
        />

        {children}
      </div>
    </section>
  );
}
