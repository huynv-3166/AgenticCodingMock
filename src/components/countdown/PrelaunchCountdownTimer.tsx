"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { calculateTimeLeft, padTwo } from "@/libs/utils/countdown";
import { PrelaunchDigitCard } from "./PrelaunchDigitCard";

type PrelaunchCountdownTimerProps = {
  targetDate: string;
  serverNow: number;
  title: string;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
  errorMessage: string;
  retryLabel: string;
  eventStartedLabel: string;
};

type Status = "loading" | "active" | "completed" | "error";

function CountdownUnit({
  value,
  label,
  ariaLabel,
}: {
  value: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 md:gap-3.5 lg:gap-[21px]"
      aria-label={ariaLabel}
    >
      <div className="flex gap-2 md:gap-3.5 lg:gap-[21px]">
        <PrelaunchDigitCard digit={value[0]} />
        <PrelaunchDigitCard digit={value[1]} />
      </div>
      <span className="font-[family-name:var(--font-montserrat)] text-sm md:text-2xl lg:text-4xl font-bold leading-5 md:leading-8 lg:leading-[48px] text-white tracking-normal">
        {label}
      </span>
    </div>
  );
}

export function PrelaunchCountdownTimer({
  targetDate,
  serverNow,
  title,
  daysLabel,
  hoursLabel,
  minutesLabel,
  errorMessage,
  retryLabel,
  eventStartedLabel,
}: PrelaunchCountdownTimerProps) {
  const router = useRouter();
  const clockOffsetRef = useRef(0);
  const [status, setStatus] = useState<Status>("loading");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Calculate clock offset and initialize countdown on mount
  useEffect(() => {
    if (!targetDate || Number.isNaN(new Date(targetDate).getTime())) {
      setStatus("error");
      return;
    }

    clockOffsetRef.current = serverNow - Date.now();
    const initial = calculateTimeLeft(targetDate, clockOffsetRef.current);

    if (initial.isPassed) {
      setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
      setStatus("completed");
      return;
    }

    setTimeRemaining({
      days: initial.days,
      hours: initial.hours,
      minutes: initial.minutes,
    });
    setStatus("active");

    const interval = setInterval(() => {
      const updated = calculateTimeLeft(targetDate, clockOffsetRef.current);
      setTimeRemaining({
        days: updated.days,
        hours: updated.hours,
        minutes: updated.minutes,
      });
      if (updated.isPassed) {
        setStatus("completed");
        clearInterval(interval);
      }
    }, 60_000);

    return () => clearInterval(interval);
  }, [targetDate, serverNow]);

  // Auto-redirect when countdown completes
  useEffect(() => {
    if (status !== "completed") return;

    const timeout = setTimeout(() => {
      router.push("/");
    }, 1000);

    return () => clearTimeout(timeout);
  }, [status, router]);

  // Error state
  if (status === "error") {
    return (
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <p className="text-white text-lg md:text-xl font-[family-name:var(--font-montserrat)]">
          {errorMessage}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[var(--color-button-bg)] text-[var(--color-button-text)] px-6 py-4 rounded-lg font-bold font-[family-name:var(--font-montserrat)] cursor-pointer"
        >
          {retryLabel}
        </button>
      </div>
    );
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center gap-4 md:gap-5 lg:gap-[var(--spacing-prelaunch-title-gap)]">
        <div className="h-7 md:h-9 lg:h-12 w-60 md:w-72 lg:w-80 animate-pulse bg-white/10 rounded-lg" />
        <div className="flex gap-4 md:gap-10 lg:gap-[var(--spacing-prelaunch-unit-gap)]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 md:gap-3.5 lg:gap-[21px]">
              <div className="flex gap-2 md:gap-3.5 lg:gap-[21px]">
                <div className="w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[77px] lg:h-[123px] animate-pulse bg-white/10 rounded-lg md:rounded-[10px] lg:rounded-xl" />
                <div className="w-12 h-[77px] md:w-[60px] md:h-24 lg:w-[77px] lg:h-[123px] animate-pulse bg-white/10 rounded-lg md:rounded-[10px] lg:rounded-xl" />
              </div>
              <div className="h-5 md:h-8 lg:h-12 w-16 md:w-20 lg:w-24 animate-pulse bg-white/10 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayDays = Math.min(timeRemaining.days, 99);
  const daysDisplay = padTwo(displayDays);
  const hoursDisplay = padTwo(timeRemaining.hours);
  const minutesDisplay = padTwo(timeRemaining.minutes);

  const ariaLabel =
    status === "completed"
      ? eventStartedLabel
      : `${timeRemaining.days} ${daysLabel}, ${timeRemaining.hours} ${hoursLabel}, ${timeRemaining.minutes} ${minutesLabel}`;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
      className="flex flex-col items-center gap-4 md:gap-5 lg:gap-[var(--spacing-prelaunch-title-gap)]"
    >
      <h1 className="font-[family-name:var(--font-montserrat)] text-xl md:text-[28px] lg:text-4xl font-bold leading-7 md:leading-9 lg:leading-[48px] text-white text-center">
        {title}
      </h1>
      <div className="flex items-center gap-4 md:gap-10 lg:gap-[var(--spacing-prelaunch-unit-gap)]">
        <CountdownUnit
          value={daysDisplay}
          label={daysLabel}
          ariaLabel={`${timeRemaining.days} ${daysLabel}`}
        />
        <CountdownUnit
          value={hoursDisplay}
          label={hoursLabel}
          ariaLabel={`${timeRemaining.hours} ${hoursLabel}`}
        />
        <CountdownUnit
          value={minutesDisplay}
          label={minutesLabel}
          ariaLabel={`${timeRemaining.minutes} ${minutesLabel}`}
        />
      </div>
    </div>
  );
}
