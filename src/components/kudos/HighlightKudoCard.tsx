"use client";

import { KudoUserInfo } from "./KudoUserInfo";
import { KudoCardContent, formatTimestamp } from "./KudoCardContent";
import { HeartButton } from "./HeartButton";
import type { Kudo } from "@/types";

interface HighlightKudoCardProps {
  kudo: Kudo;
  isActive: boolean;
  specialDayActive: boolean;
  specialDayMultiplier: number;
  currentUserId?: string;
  labels: {
    anonymous: string;
    copyLink: string;
    viewDetail: string;
  };
}

export function HighlightKudoCard({
  kudo,
  isActive,
  specialDayActive,
  specialDayMultiplier,
  currentUserId,
  labels,
}: HighlightKudoCardProps) {
  const senderDisplay = kudo.is_anonymous
    ? { user_id: "", name: labels.anonymous, avatar_url: null, department: "", department_code: "", star_level: 0 }
    : kudo.sender;

  return (
    <div
      className={`
        flex flex-col gap-4 w-full md:w-[528px] flex-shrink-0 p-4 md:p-[24px_24px_16px_24px]
        bg-[var(--color-kudos-card-bg)] rounded-[24px] transition-all duration-300
        ${isActive ? "border-4 border-[var(--color-primary)]" : "border border-transparent"}
        motion-reduce:transition-none
      `}
    >
      {/* User info row */}
      <div className="flex items-center justify-between gap-3">
        <KudoUserInfo user={senderDisplay} showBadge={!kudo.is_anonymous} />
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[var(--color-kudos-text-dark)]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M6 16H26M26 16L18 8M26 16L18 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <KudoUserInfo user={kudo.receiver} />
      </div>

      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Shared content: timestamp, category, message, hashtags (no images in highlight) */}
      <KudoCardContent
        timestamp={formatTimestamp(kudo.created_at)}
        category={kudo.category}
        message={kudo.message}
        hashtags={kudo.hashtags}
        showImages={false}
        messageLineClamp={3}
      />

      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Action row — highlight has copy link + view detail */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 rounded font-bold text-sm leading-6 text-[var(--color-kudos-text-dark)] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2">
            {labels.copyLink}
          </button>
          <a
            href={`#kudo-${kudo.id}`}
            className="px-3 py-2 rounded font-bold text-sm leading-6 text-[var(--color-kudos-text-dark)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            {labels.viewDetail}
          </a>
        </div>
        <HeartButton
          kudoId={kudo.id}
          initialCount={kudo.heart_count}
          initialIsHearted={kudo.is_hearted_by_me}
          isOwnKudo={currentUserId === kudo.sender.user_id}
          specialDayActive={specialDayActive}
          multiplier={specialDayMultiplier}
        />
      </div>
    </div>
  );
}
