"use client";

import { useState, useCallback } from "react";

interface HeartButtonProps {
  kudoId: string;
  initialCount: number;
  initialIsHearted: boolean;
  isOwnKudo: boolean;
  specialDayActive: boolean;
  multiplier: number;
}

export function HeartButton({
  kudoId,
  initialCount,
  initialIsHearted,
  isOwnKudo,
  specialDayActive,
  multiplier,
}: HeartButtonProps) {
  const [isHearted, setIsHearted] = useState(initialIsHearted);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  const toggleHeart = useCallback(async () => {
    if (isOwnKudo || isPending) return;

    // Optimistic update
    const prevHearted = isHearted;
    setIsHearted(!isHearted);
    setCount(isHearted ? count - 1 : count + 1);
    setIsPending(true);

    try {
      const res = await fetch(`/api/kudos/${kudoId}/heart`, {
        method: prevHearted ? "DELETE" : "POST",
      });

      if (res.ok) {
        const data = (await res.json()) as { heart_count: number };
        setCount(data.heart_count);
      }
      // If API fails, keep the optimistic state (no rollback)
      // Rollback only when backend is connected and returns meaningful errors
    } catch {
      // Network error — keep optimistic state for demo mode
    } finally {
      setIsPending(false);
    }
  }, [kudoId, isHearted, count, isOwnKudo, isPending]);

  return (
    <button
      onClick={toggleHeart}
      disabled={isOwnKudo}
      aria-pressed={isHearted}
      aria-disabled={isOwnKudo}
      aria-label={`${isHearted ? "Unlike" : "Like"} this kudo. ${count} hearts.`}
      className={`
        flex items-center gap-1 transition-transform
        ${isOwnKudo ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
        ${!isOwnKudo && !isHearted ? "hover:scale-110" : ""}
        focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
        motion-reduce:transition-none motion-reduce:hover:transform-none
      `}
    >
      {/* Heart icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={`transition-transform duration-200 motion-reduce:transition-none ${
          isHearted ? "scale-110" : ""
        }`}
      >
        <path
          d="M16 28C16 28 3 20 3 11C3 6 7 3 11 3C13.5 3 15.5 4.5 16 5.5C16.5 4.5 18.5 3 21 3C25 3 29 6 29 11C29 20 16 28 16 28Z"
          stroke={isHearted ? "#EF4444" : "currentColor"}
          strokeWidth="2"
          fill={isHearted ? "#EF4444" : "none"}
        />
      </svg>

      {/* x2 special day badge */}
      {specialDayActive && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[var(--color-primary)] text-[var(--color-kudos-text-dark)] font-bold text-xs leading-none">
          x{multiplier}
        </span>
      )}

      {/* Count */}
      <span className="font-bold text-2xl leading-8 text-[var(--color-kudos-text-dark)]">
        {count}
      </span>
    </button>
  );
}
