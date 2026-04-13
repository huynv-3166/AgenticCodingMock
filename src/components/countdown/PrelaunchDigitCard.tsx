type PrelaunchDigitCardProps = {
  digit: string;
};

export function PrelaunchDigitCard({ digit }: PrelaunchDigitCardProps) {
  return (
    <div className="relative w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[77px] lg:h-[123px] flex items-center justify-center">
      {/* Glassmorphism background */}
      <div
        className="absolute inset-0 rounded-lg md:rounded-[10px] lg:rounded-xl border-[0.75px] border-[var(--color-primary)] opacity-50 backdrop-blur-[var(--blur-prelaunch-digit)] [-webkit-backdrop-filter:blur(var(--blur-prelaunch-digit))]"
        style={{
          background:
            "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.10) 100%)",
        }}
      />
      {/* Digit */}
      <span className="relative z-10 font-[family-name:var(--font-digital-numbers)] text-[44px] md:text-[56px] lg:text-[73.73px] text-white leading-none">
        {digit}
      </span>
    </div>
  );
}
