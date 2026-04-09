import { AwardCard } from "@/components/home/AwardCard";
import type { AwardCategory } from "@/types";

export function AwardGrid({
  awards,
  detailLabel,
  emptyMessage,
}: {
  awards: AwardCategory[];
  detailLabel: string;
  emptyMessage: string;
}) {
  if (awards.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-base text-white/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-20">
      {awards.map((award) => (
        <AwardCard key={award.id} award={award} detailLabel={detailLabel} />
      ))}
    </div>
  );
}
