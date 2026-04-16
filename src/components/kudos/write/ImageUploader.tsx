"use client";

import { useRef, useCallback } from "react";
import { ImageUploadThumbnail } from "./ImageUploadThumbnail";
import type { ImageAttachment } from "@/types";

interface ImageUploaderProps {
  images: ImageAttachment[];
  uploadingCount: number;
  onAdd: (attachment: ImageAttachment) => void;
  onRemove: (index: number) => void;
  onUploadStart: () => void;
  onUploadEnd: () => void;
  onError: (message: string) => void;
  labels: {
    label: string;
    add: string;
    max: string;
  };
}

const MAX_IMAGES = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUploader({
  images,
  uploadingCount,
  onAdd,
  onRemove,
  onUploadStart,
  onUploadEnd,
  onError,
  labels,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset input so same file can be selected again
      e.target.value = "";

      // Validate type
      if (!ACCEPTED_TYPES.includes(file.type)) {
        onError(labels.max); // Will use proper error message from parent
        return;
      }

      // Validate size
      if (file.size > MAX_SIZE) {
        onError(labels.max);
        return;
      }

      onUploadStart();

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/kudos/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = (await res.json().catch(() => ({ error: "Upload failed" }))) as { error?: string };
          throw new Error(err.error ?? "Upload failed");
        }

        const data = (await res.json()) as { url: string; thumbnail_url: string };
        onAdd({ url: data.url, thumbnail_url: data.thumbnail_url });
      } catch (err) {
        onError(err instanceof Error ? err.message : "Upload failed");
      } finally {
        onUploadEnd();
      }
    },
    [onAdd, onUploadStart, onUploadEnd, onError, labels.max]
  );

  const totalCount = images.length + uploadingCount;

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      {/* Label — no asterisk (optional field) */}
      <span className="font-bold text-[22px] leading-7 text-[#00101A] shrink-0">
        {labels.label}
      </span>

      {/* Thumbnails + Add button */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Existing uploaded images */}
        {images.map((img, i) => (
          <ImageUploadThumbnail
            key={img.url}
            url={img.thumbnail_url}
            onRemove={() => onRemove(i)}
          />
        ))}

        {/* Loading placeholders for in-progress uploads */}
        {Array.from({ length: uploadingCount }).map((_, i) => (
          <ImageUploadThumbnail key={`uploading-${i}`} url={null} onRemove={() => {}} />
        ))}

        {/* Add button — hidden when max reached */}
        {totalCount < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white hover:bg-[rgba(153,140,95,0.05)] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="text-[11px] leading-4 tracking-[0.5px] text-[#999] font-bold">{labels.add}</span>
              <span className="text-[11px] leading-4 tracking-[0.5px] text-[#999] font-bold">{labels.max}</span>
            </span>
          </button>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload image"
        />
      </div>
    </div>
  );
}
