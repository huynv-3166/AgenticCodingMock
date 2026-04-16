"use client";

import { useState, useCallback, useEffect } from "react";

interface HeartButtonProps {
  kudoId: string;
  initialCount: number;
  initialIsHearted: boolean;
  isOwnKudo: boolean;
  specialDayActive: boolean;
  multiplier: number;
  onHeartChange?: (kudoId: string, heartCount: number, isHearted: boolean) => void;
}

// Custom event for cross-component heart sync
const HEART_SYNC_EVENT = "kudo-heart-sync";

interface HeartSyncDetail {
  kudoId: string;
  heartCount: number;
  isHearted: boolean;
  source: string; // unique ID of the HeartButton that triggered it
}

let instanceCounter = 0;

export function HeartButton({
  kudoId,
  initialCount,
  initialIsHearted,
  isOwnKudo,
  specialDayActive,
  multiplier,
  onHeartChange,
}: HeartButtonProps) {
  const [instanceId] = useState(() => `hb-${++instanceCounter}`);
  const [isHearted, setIsHearted] = useState(initialIsHearted);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  // Listen for heart sync events from other HeartButton instances
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<HeartSyncDetail>).detail;
      if (detail.kudoId === kudoId && detail.source !== instanceId) {
        setCount(detail.heartCount);
        setIsHearted(detail.isHearted);
      }
    };
    window.addEventListener(HEART_SYNC_EVENT, handler);
    return () => window.removeEventListener(HEART_SYNC_EVENT, handler);
  }, [kudoId, instanceId]);

  const toggleHeart = useCallback(async () => {
    if (isPending) return;

    const prevHearted = isHearted;
    const prevCount = count;
    const newHearted = !isHearted;
    const newCount = Math.max(0, newHearted ? count + 1 : count - 1);

    setIsHearted(newHearted);
    setCount(newCount);
    setIsPending(true);

    try {
      const res = await fetch(`/api/kudos/${kudoId}/heart`, {
        method: prevHearted ? "DELETE" : "POST",
      });

      if (res.ok) {
        const data = (await res.json()) as { heart_count: number };
        const serverCount = Math.max(0, data.heart_count);
        setCount(serverCount);
        setIsHearted(newHearted);

        // Broadcast to all other HeartButton instances on the page
        window.dispatchEvent(
          new CustomEvent<HeartSyncDetail>(HEART_SYNC_EVENT, {
            detail: { kudoId, heartCount: serverCount, isHearted: newHearted, source: instanceId },
          })
        );

        onHeartChange?.(kudoId, serverCount, newHearted);
      } else {
        // 403 = own kudo, 409 = already hearted — rollback
        setIsHearted(prevHearted);
        setCount(prevCount);
      }
    } catch {
      setIsHearted(prevHearted);
      setCount(prevCount);
    } finally {
      setIsPending(false);
    }
  }, [kudoId, isHearted, count, isOwnKudo, isPending, instanceId, onHeartChange]);

  return (
    <button
      onClick={toggleHeart}
      aria-pressed={isHearted}
      aria-label={`${isHearted ? "Unlike" : "Like"} this kudo. ${count} hearts.`}
      className={`
        flex items-center gap-1 transition-transform cursor-pointer
        ${!isHearted ? "hover:scale-110" : ""}
        focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
        motion-reduce:transition-none motion-reduce:hover:transform-none
      `}
    >
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

      {specialDayActive && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-[var(--color-primary)] text-[var(--color-kudos-text-dark)] font-bold text-xs leading-none">
          x{multiplier}
        </span>
      )}

      <span className="font-bold text-2xl leading-8 text-[var(--color-kudos-text-dark)]">
        {count}
      </span>
    </button>
  );
}
