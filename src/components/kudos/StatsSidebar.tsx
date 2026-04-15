"use client";

import type { UserStats } from "@/types";

interface StatsSidebarProps {
  stats: UserStats;
  labels: {
    received: string;
    sent: string;
    hearts: string;
    boxesOpened: string;
    boxesUnopened: string;
    openGift: string;
  };
  onOpenGift: () => void;
  canOpenGift: boolean;
}

export function StatsSidebar({
  stats,
  labels,
  onOpenGift,
  canOpenGift,
}: StatsSidebarProps) {
  return (
    <div className="w-full lg:w-[422px] p-6 bg-[var(--color-kudos-container)] rounded-[17px] border border-[var(--color-border)]">
      <div className="flex flex-col gap-4">
        {/* Stats rows */}
        <StatRow label={labels.received} value={stats.kudos_received} />
        <StatRow label={labels.sent} value={stats.kudos_sent} />
        <StatRow label={labels.hearts} value={stats.hearts_received} />

        {/* Divider */}
        <div className="w-full h-px bg-[var(--color-divider)]" />

        {/* Secret box stats */}
        <StatRow label={labels.boxesOpened} value={stats.secret_boxes_opened} />
        <StatRow
          label={labels.boxesUnopened}
          value={stats.secret_boxes_unopened}
        />

        {/* Open gift button */}
        <button
          onClick={onOpenGift}
          disabled={!canOpenGift}
          className="w-full py-4 bg-[var(--color-button-bg)] rounded-lg font-bold text-[22px] leading-7 text-[var(--color-button-text)] transition-all hover:-translate-y-px hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        >
          {labels.openGift}
        </button>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-bold text-[22px] leading-7 text-white">
        {label}
      </span>
      <span className="font-bold text-[32px] leading-10 text-[var(--color-primary)]">
        {value}
      </span>
    </div>
  );
}
