import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/icons/ArrowRightIcon";
import type { AwardCategory } from "@/types";

export function AwardCard({
  award,
  detailLabel,
}: {
  award: AwardCategory;
  detailLabel: string;
}) {
  return (
    <Link
      href={`/awards-information#${award.slug}`}
      className="group flex flex-col gap-6 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1"
    >
      <Image
        src={award.thumbnail_url}
        alt={`${award.title} award badge`}
        width={336}
        height={336}
        sizes="(max-width: 768px) 50vw, 336px"
        className="w-full h-auto"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-normal text-[var(--color-primary)]">
          {award.title}
        </h3>
        <p className="text-base font-normal text-white line-clamp-2">
          {award.description}
        </p>
      </div>
      <span className="flex items-center gap-1 text-base font-medium text-[var(--color-primary)] py-4 group-hover:underline">
        {detailLabel}
        <ArrowRightIcon className="w-6 h-6 text-[var(--color-primary)] transition-transform duration-150 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
