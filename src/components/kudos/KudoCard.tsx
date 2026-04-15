"use client";

import Image from "next/image";
import { KudoUserInfo } from "./KudoUserInfo";
import { HeartButton } from "./HeartButton";
import { CopyLinkButton } from "./CopyLinkButton";
import { ImageThumbnail } from "./ImageThumbnail";
import { HashtagTag } from "./HashtagTag";
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
        name: anonymousLabel,
        avatar_url: null,
        department: "",
        department_code: "",
        star_level: 0,
      }
    : kudo.sender;

  const formattedTime = formatTimestamp(kudo.created_at);

  return (
    <article
      className="flex flex-col gap-4 w-full p-4 md:p-[40px_40px_16px_40px] bg-[var(--color-kudos-card-bg)] rounded-[24px]"
      aria-label={`Kudo from ${senderDisplay.name} to ${kudo.receiver.name}`}
    >
      {/* User info row */}
      <div className="flex items-center justify-between gap-4 md:gap-6">
        <KudoUserInfo user={senderDisplay} showBadge={!kudo.is_anonymous} />
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <Image
            src="/assets/kudos/icon-arrow-send.svg"
            alt=""
            width={32}
            height={32}
            aria-hidden="true"
          />
        </div>
        <KudoUserInfo user={kudo.receiver} />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Content */}
      <div className="flex flex-col gap-4">
        {/* Timestamp */}
        <span className="font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-kudos-text-muted)]">
          {formattedTime}
        </span>

        {/* Category */}
        <span className="font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-kudos-text-dark)]">
          {kudo.category}
        </span>

        {/* Message box */}
        <div className="p-4 md:py-4 md:px-6 border border-[var(--color-primary)] bg-[var(--color-kudos-card-bg-content)] rounded-xl">
          <p className="font-bold text-base md:text-xl leading-6 md:leading-8 text-[var(--color-kudos-text-dark)] line-clamp-5">
            {kudo.message}
          </p>
        </div>

        {/* Images */}
        {kudo.images.length > 0 && (
          <div className="flex gap-4 overflow-x-auto">
            {kudo.images.slice(0, 5).map((url, i) => (
              <ImageThumbnail
                key={i}
                src={url}
                alt={`Attached image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Hashtags */}
        {kudo.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {kudo.hashtags.map((tag) => (
              <HashtagTag
                key={tag}
                name={tag}
                onFilter={onFilterByHashtag ?? (() => {})}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--color-primary)]" />

      {/* Action row */}
      <div className="flex items-center justify-between">
        <CopyLinkButton
          kudoId={kudo.id}
          label={copyLinkLabel}
          copiedLabel={copiedLabel}
        />
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

function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${month}/${day}/${year}`;
}
