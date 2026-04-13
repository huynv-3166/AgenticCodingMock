import Image from "next/image";

type RootFurtherContentProps = {
  p1: string;
  p2: string;
  p3: string;
  quote: string;
  quoteCite: string;
  p4: string;
  p5: string;
};

export function RootFurtherContent({
  p1,
  p2,
  p3,
  quote,
  quoteCite,
  p4,
  p5,
}: RootFurtherContentProps) {
  return (
    <section className="relative w-full max-w-[1224px] mx-auto px-6 py-16 md:px-12 md:py-20 lg:px-[104px] lg:py-[120px]">
      {/* ROOT FURTHER small logo - centered */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/assets/home/images/root-further-logo-sm.png"
          alt=""
          width={189}
          height={67}
          className="object-contain opacity-80"
        />
        <Image
          src="/assets/home/images/root-further-logo-sm2.png"
          alt=""
          width={290}
          height={67}
          className="object-contain opacity-80"
        />
      </div>

      <div className="flex flex-col gap-6 text-white text-base font-bold leading-6 tracking-[0.5px] text-justify">
        <p>{p1}</p>
        <p>{p2}</p>
        <p>{p3}</p>

        <blockquote className="text-center my-8">
          <p className="text-xl font-bold">&quot;{quote}&quot;</p>
          <cite className="block mt-2 text-base font-normal not-italic">
            {quoteCite}
          </cite>
        </blockquote>

        <p>{p4}</p>
        <p>{p5}</p>
      </div>
    </section>
  );
}
