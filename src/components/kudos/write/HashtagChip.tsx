"use client";

interface HashtagChipProps {
  name: string;
  onRemove: () => void;
}

export function HashtagChip({ name, onRemove }: HashtagChipProps) {
  return (
    <span className="inline-flex items-center gap-1 h-8 px-3 py-1 bg-[rgba(153,140,95,0.15)] border border-[#998C5F] rounded-2xl font-bold text-sm text-[#00101A]">
      #{name}
      <button
        type="button"
        onClick={onRemove}
        className="text-[#999] hover:text-[#00101A] transition-colors"
        aria-label={`Remove #${name}`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </span>
  );
}
