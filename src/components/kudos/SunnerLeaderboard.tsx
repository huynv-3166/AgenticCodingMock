"use client";

import Image from "next/image";
import type { GiftRecipient } from "@/types";

interface SunnerLeaderboardProps {
  title: string;
  emptyLabel: string;
  entries: GiftRecipient[];
}

export function SunnerLeaderboard({
  title,
  emptyLabel,
  entries,
}: SunnerLeaderboardProps) {
  return (
    <div className="w-full lg:w-[422px] p-6 pr-4 bg-[var(--color-kudos-container)] rounded-[17px] border border-[var(--color-border)]">
      <h3 className="font-bold text-[22px] leading-7 text-[var(--color-primary)] mb-4">
        {title}
      </h3>

      {entries.length === 0 ? (
        <p className="font-bold text-base leading-6 text-[var(--color-kudos-text-muted)]">
          {emptyLabel}
        </p>
      ) : (
        <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
          {entries.map((entry) => (
            <div
              key={entry.user_id + entry.opened_at}
              className="flex items-center gap-2 cursor-pointer hover:bg-[rgba(255,234,158,0.05)] rounded-lg transition-colors p-1 -m-1"
            >
              {/* Avatar */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-[1.869px] border-white">
                {entry.avatar_url ? (
                  <Image
                    src={entry.avatar_url}
                    alt={entry.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-divider)] flex items-center justify-center text-white font-bold text-xl">
                    {entry.name.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="font-bold text-[22px] leading-7 text-[var(--color-primary)] truncate">
                  {entry.name}
                </span>
                <span className="font-bold text-base leading-6 tracking-[0.15px] text-white truncate">
                  {entry.gift_description}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
