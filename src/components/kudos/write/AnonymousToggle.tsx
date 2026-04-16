"use client";

interface AnonymousToggleProps {
  isAnonymous: boolean;
  anonymousName: string;
  onToggle: () => void;
  onNameChange: (name: string) => void;
  labels: {
    label: string;
  };
}

export function AnonymousToggle({
  isAnonymous,
  anonymousName,
  onToggle,
  onNameChange,
  labels,
}: AnonymousToggleProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Checkbox row */}
      <label className="flex items-center gap-4 cursor-pointer">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={onToggle}
          className="sr-only peer"
        />
        {/* Custom checkbox */}
        <span
          className={`w-6 h-6 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
            isAnonymous
              ? "bg-[#FFEA9E] border-[#998C5F]"
              : "bg-white border-[#999] hover:border-[#998C5F]"
          }`}
          aria-hidden="true"
        >
          {isAnonymous && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11.5 3.5L5.5 10L2.5 7" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="font-bold text-[22px] leading-7 text-[#999]">
          {labels.label}
        </span>
      </label>

      {/* Anonymous name field — shown when checked */}
      {isAnonymous && (
        <input
          type="text"
          value={anonymousName}
          onChange={(e) => onNameChange(e.target.value.slice(0, 50))}
          maxLength={50}
          placeholder="e.g. Mot nguoi ban"
          className="ml-10 w-full max-w-sm h-12 px-4 py-3 border border-[#998C5F] rounded-lg bg-white font-bold text-base text-[#00101A] placeholder:text-[#999] focus:outline-none focus:border-[#998C5F] transition-colors"
        />
      )}
    </div>
  );
}
