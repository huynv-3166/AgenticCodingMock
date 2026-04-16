"use client";

interface ImageUploadThumbnailProps {
  url: string | null; // null = loading state
  onRemove: () => void;
}

export function ImageUploadThumbnail({ url, onRemove }: ImageUploadThumbnailProps) {
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      {url ? (
        <img
          src={url}
          alt=""
          className="w-20 h-20 rounded-[18px] border border-[#998C5F] object-cover bg-white"
        />
      ) : (
        // Loading placeholder
        <div className="w-20 h-20 rounded-[18px] border border-[#998C5F] bg-[#f0f0f0] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#998C5F] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Close/delete button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4271D] rounded-full flex items-center justify-center hover:bg-[#b8221a] transition-colors"
        aria-label="Remove image"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M9 3L3 9M3 3l6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
