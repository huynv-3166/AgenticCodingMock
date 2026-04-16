"use client";

interface BadgeInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  labels: {
    label: string;
    placeholder: string;
    helper: string;
  };
}

const MAX_CHARS = 100;

export function BadgeInput({ value, onChange, error, labels }: BadgeInputProps) {
  const borderColor = error ? "border-[#CF1322]" : "border-[#998C5F]";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Label */}
        <label className="flex items-center gap-0.5 shrink-0" htmlFor="badge-input">
          <span className="text-[#CF1322] font-bold text-base font-['Noto_Sans_JP']">*</span>
          <span className="font-bold text-[22px] leading-7 text-[#00101A]">
            {labels.label}
          </span>
        </label>

        {/* Input */}
        <div className="relative flex-1 w-full">
          <input
            id="badge-input"
            type="text"
            value={value}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) {
                onChange(e.target.value);
              }
            }}
            maxLength={MAX_CHARS}
            placeholder={labels.placeholder}
            className={`w-full h-14 px-6 py-4 border ${borderColor} rounded-lg bg-white font-bold text-base text-[#00101A] placeholder:text-[#999] placeholder:font-bold focus:outline-none focus:border-[#998C5F] transition-colors`}
          />
          {/* Character counter */}
          {value.length > 0 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#999] font-bold">
              {value.length}/{MAX_CHARS}
            </span>
          )}
        </div>
      </div>

      {/* Helper text */}
      <p className="font-bold text-base leading-6 tracking-[0.15px] text-[#999] whitespace-pre-line md:ml-[155px]">
        {labels.helper}
      </p>
      {error && <p className="text-sm font-bold text-[#CF1322] md:ml-[155px]">{error}</p>}
    </div>
  );
}
