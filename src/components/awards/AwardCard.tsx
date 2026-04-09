import Image from "next/image";
import type { AwardDetail } from "@/types";

interface AwardCardProps {
  award: AwardDetail;
  index: number;
  quantityLabel: string;
  prizeLabel: string;
  orDivider: string;
}

export function AwardCard({
  award,
  index,
  quantityLabel,
  prizeLabel,
  orDivider,
}: AwardCardProps) {
  const isReversed = index % 2 === 1;

  return (
    <section
      id={award.id}
      aria-labelledby={`${award.id}-title`}
      className="scroll-mt-[100px]"
    >
      <div className={`flex flex-col items-center gap-8 lg:gap-[var(--spacing-award-detail-card-gap)] ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Award Image */}
        <div className="shrink-0">
          <Image
            src={award.image}
            alt={`${award.title} award`}
            width={336}
            height={336}
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[336px] lg:h-[336px] rounded-[var(--radius-award-image)] mix-blend-screen"
            style={{
              boxShadow: "var(--shadow-award)",
              border: "var(--border-award-image)",
            }}
          />
        </div>

        {/* Award Content */}
        <div className="flex-1 flex flex-col rounded-2xl text-center lg:text-left">
          {/* Title + Description */}
          <div className="pb-6 lg:pb-8 border-b border-[var(--color-divider)]">
            <h2
              id={`${award.id}-title`}
              className="text-xl md:text-2xl font-bold leading-8 text-[var(--color-primary)] mb-4"
            >
              {award.title}
            </h2>
            <p className="text-sm md:text-base font-bold leading-6 text-white tracking-[0.5px]">
              {award.description}
            </p>
          </div>

          {/* Quantity Row */}
          <div className="py-6 lg:py-8 border-b border-[var(--color-divider)]">
            <p className="text-lg md:text-2xl font-bold leading-8 text-[var(--color-primary)] mb-2">
              {quantityLabel}
            </p>
            <div className="flex items-baseline gap-2 justify-center lg:justify-start">
              <span className="text-[28px] md:text-4xl font-bold leading-[44px] text-white">
                {String(award.quantity).padStart(2, "0")}
              </span>
              <span className="text-sm font-bold leading-5 text-white tracking-[0.1px]">
                {award.unit}
              </span>
            </div>
          </div>

          {/* Prize Row */}
          <div className={`pt-6 lg:pt-8 ${award.prizeValueGroup ? "pb-6 lg:pb-8 border-b border-[var(--color-divider)]" : ""}`}>
            <p className="text-lg md:text-2xl font-bold leading-8 text-[var(--color-primary)] mb-2">
              {prizeLabel}
            </p>
            <span className="text-[28px] md:text-4xl font-bold leading-[44px] text-white">
              {award.prizeValue}
            </span>
            <p className="text-sm font-bold leading-5 text-white tracking-[0.1px] mt-1">
              {award.prizeNote}
            </p>
          </div>

          {/* Dual Prize for Signature 2025 */}
          {award.prizeValueGroup && award.prizeNoteGroup && (
            <>
              <p className="py-4 text-sm font-bold leading-5 text-[var(--color-divider)]">
                {orDivider}
              </p>
              <div>
                <p className="text-lg md:text-2xl font-bold leading-8 text-[var(--color-primary)] mb-2">
                  {prizeLabel}
                </p>
                <span className="text-[28px] md:text-4xl font-bold leading-[44px] text-white">
                  {award.prizeValueGroup}
                </span>
                <p className="text-sm font-bold leading-5 text-white tracking-[0.1px] mt-1">
                  {award.prizeNoteGroup}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
