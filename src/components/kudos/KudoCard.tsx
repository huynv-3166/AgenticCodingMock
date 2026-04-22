"use client";

import Image from "next/image";
import { KudoUserInfo } from "./KudoUserInfo";
import { KudoCardContent, formatTimestamp } from "./KudoCardContent";
import { HeartButton } from "./HeartButton";
import { CopyLinkButton } from "./CopyLinkButton";
import type { Kudo } from "@/types";

interface KudoCardProps {
  kudo: Kudo;
  anonymousLabel: string;
  copyLinkLabel: string;
  copiedLabel?: string;
  currentUserId?: string;
  specialDayActive?: boolean;
  specialDayMultiplier?: number;
  onFilterByHashtag?: (hashtag: string) => void;
}

export function KudoCard({
  kudo,
  anonymousLabel,
  copyLinkLabel,
  copiedLabel = "Copied!",
  currentUserId,
  specialDayActive = false,
  specialDayMultiplier = 1,
  onFilterByHashtag,
}: KudoCardProps) {
  const senderDisplay = kudo.is_anonymous
    ? {
        user_id: "",
        name: kudo.anonymous_name?.trim() || anonymousLabel,
        avatar_url: null,
        department: "",
        department_code: "",
        star_level: 0,
      }
    : kudo.sender;

  return (
    <article
      className="flex flex-col gap-4 w-full p-4 md:p-[40px_40px_16px_40px] bg-[var(--color-kudos-card-bg)] rounded-[24px]"
      aria-label={`Kudo from ${senderDisplay.name} to ${kudo.receiver.name}`}
    >
      {/* User info row */}
      <div className="flex items-center justify-between gap-4 md:gap-6">
        <KudoUserInfo user={senderDisplay} showBadge={!kudo.is_anonymous} />
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <Image src="/assets/kudos/icon-arrow-send.svg" alt="" width={32} height={32} aria-hidden="true" />
        </div>
        <KudoUserInfo user={kudo.receiver} />
      </div>

      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Shared content: timestamp, category, message, images, hashtags */}
      <KudoCardContent
        timestamp={formatTimestamp(kudo.created_at)}
        category={kudo.category}
        message={kudo.message}
        hashtags={kudo.hashtags}
        images={kudo.images}
        showImages={true}
        messageLineClamp={5}
        onFilterByHashtag={onFilterByHashtag}
      />

      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Action row */}
      <div className="flex items-center justify-between">
        <CopyLinkButton kudoId={kudo.id} label={copyLinkLabel} copiedLabel={copiedLabel} />
        <HeartButton
          kudoId={kudo.id}
          initialCount={kudo.heart_count}
          initialIsHearted={kudo.is_hearted_by_me}
          isOwnKudo={currentUserId === kudo.sender.user_id}
          specialDayActive={specialDayActive}
          multiplier={specialDayMultiplier}
        />
      </div>
    </article>
  );
}
