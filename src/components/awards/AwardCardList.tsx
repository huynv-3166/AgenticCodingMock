import type { AwardDetail } from "@/types";
import { AwardCard } from "./AwardCard";

interface AwardCardListProps {
  awards: AwardDetail[];
  quantityLabel: string;
  prizeLabel: string;
  orDivider: string;
}

export function AwardCardList({
  awards,
  quantityLabel,
  prizeLabel,
  orDivider,
}: AwardCardListProps) {
  return (
    <div className="flex flex-col">
      {awards.map((award, index) => (
        <div key={award.id}>
          {index > 0 && (
            <hr className="border-t border-[var(--color-divider)] my-[var(--spacing-award-detail-cards-gap)]" />
          )}
          <AwardCard
            award={award}
            index={index}
            quantityLabel={quantityLabel}
            prizeLabel={prizeLabel}
            orDivider={orDivider}
          />
        </div>
      ))}
    </div>
  );
}
