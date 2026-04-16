"use client";

import { HashtagTag } from "./HashtagTag";
import { ImageThumbnail } from "./ImageThumbnail";

interface KudoCardContentProps {
  timestamp: string;
  category: string;
  message: string;
  hashtags: string[];
  images?: string[];
  messageLineClamp?: number;
  showImages?: boolean;
  onFilterByHashtag?: (hashtag: string) => void;
}

export function formatTimestamp(isoDate: string): string {
  const date = new Date(isoDate);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes} - ${month}/${day}/${year}`;
}

export function KudoCardContent({
  timestamp,
  category,
  message,
  hashtags,
  images = [],
  messageLineClamp = 5,
  showImages = false,
  onFilterByHashtag,
}: KudoCardContentProps) {
  const lineClampClass = messageLineClamp === 3 ? "line-clamp-3" : "line-clamp-5";

  return (
    <div className="flex flex-col gap-4">
      {/* Timestamp — left aligned, time before date */}
      <span className="font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-kudos-text-muted)]">
        {timestamp}
      </span>

      {/* Category / Badge Title — centered */}
      <span className="font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-kudos-text-dark)] text-center">
        {category}
      </span>

      {/* Message box — renders HTML from rich text editor */}
      <div className="p-4 md:py-4 md:px-6 border border-[var(--color-primary)] bg-[var(--color-kudos-card-bg-content)] rounded-xl">
        <div
          className={`font-bold text-base md:text-xl leading-6 md:leading-8 text-[var(--color-kudos-text-dark)] ${lineClampClass} [&_p]:m-0 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:opacity-80`}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>

      {/* Images — only in full kudo card */}
      {showImages && images.length > 0 && (
        <div className="flex gap-4 overflow-x-auto">
          {images.slice(0, 5).map((url, i) => (
            <ImageThumbnail
              key={i}
              src={url}
              alt={`Attached image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <HashtagTag
              key={tag}
              name={tag}
              onFilter={onFilterByHashtag ?? (() => {})}
            />
          ))}
        </div>
      )}
    </div>
  );
}
