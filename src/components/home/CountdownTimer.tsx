"use client";

import { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: string | null;
  comingSoonLabel: string;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
};

function calculateTimeLeft(targetDate: string | null): {
  days: number;
  hours: number;
  minutes: number;
  isPassed: boolean;
} {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, isPassed: true };
  }

  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPassed: false };
}

function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}

function DigitTile({ digit }: { digit: string }) {
  return (
    <div className="w-[51px] h-[82px] flex items-center justify-center rounded-lg border-[0.5px] border-[var(--color-primary)] opacity-50 font-[family-name:var(--font-digital-numbers)] text-[49px] text-[var(--color-bg-primary)] leading-none bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.10)_100%)] backdrop-blur-[var(--blur-countdown)]">
      {digit}
    </div>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-[14px]">
        <DigitTile digit={value[0]} />
        <DigitTile digit={value[1]} />
      </div>
      <span className="text-2xl font-bold text-[var(--color-primary)] tracking-normal">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer({
  targetDate,
  comingSoonLabel,
  daysLabel,
  hoursLabel,
  minutesLabel,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 60_000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const ariaLabel = timeLeft.isPassed
    ? "Event has started"
    : `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes remaining`;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
      className="flex flex-col gap-4"
    >
      {!timeLeft.isPassed && (
        <span className="text-base font-bold text-[var(--color-primary)]">
          {comingSoonLabel}
        </span>
      )}
      <div className="flex gap-10">
        <CountdownUnit value={padTwo(timeLeft.days)} label={daysLabel} />
        <CountdownUnit value={padTwo(timeLeft.hours)} label={hoursLabel} />
        <CountdownUnit value={padTwo(timeLeft.minutes)} label={minutesLabel} />
      </div>
    </div>
  );
}
