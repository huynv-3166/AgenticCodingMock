"use client";

import { useState, useCallback, useEffect } from "react";
import { HighlightKudoCard } from "./HighlightKudoCard";
import type { Kudo } from "@/types";

interface HighlightCarouselProps {
  kudos: Kudo[];
  specialDayActive: boolean;
  specialDayMultiplier: number;
  currentUserId?: string;
  labels: {
    empty: string;
    anonymous: string;
    copyLink: string;
    viewDetail: string;
  };
}

const CARD_WIDTH = 528;
const GAP = 24;

export function HighlightCarousel({
  kudos,
  specialDayActive,
  specialDayMultiplier,
  currentUserId,
  labels,
}: HighlightCarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = kudos.length;

  const goTo = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(currentPage - 1);
      if (e.key === "ArrowRight") goTo(currentPage + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, goTo]);

  if (kudos.length === 0) {
    return (
      <p className="font-bold text-base text-[var(--color-kudos-text-muted)] text-center py-20">
        {labels.empty}
      </p>
    );
  }

  // Calculate translateX to center the active card
  // The track starts with the first card at position 0
  // We want the active card to be centered in the viewport
  const centerIndex = currentPage - 1;
  const translateX = -(centerIndex * (CARD_WIDTH + GAP));

  return (
    <div
      className="flex flex-col gap-6"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Highlight Kudos, slide ${currentPage} of ${totalPages}`}
    >
      {/* Carousel viewport — clips overflow */}
      <div className="relative overflow-hidden">
        {/* Left edge gradient — covers only the outer margin before cards start */}
        <div
          className="hidden lg:block absolute left-0 top-0 bottom-0 w-[160px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #00101A 40%, rgba(0, 16, 26, 0) 100%)" }}
          aria-hidden="true"
        />
        {/* Right edge gradient — covers only the outer margin after cards end */}
        <div
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[160px] z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #00101A 40%, rgba(0, 16, 26, 0) 100%)" }}
          aria-hidden="true"
        />
        {/* Scrolling track — all cards in a row, slides via translateX */}
        <div
          className="flex gap-6 px-4 md:px-10 lg:px-[144px] transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - 144px + ${translateX}px))`,
          }}
        >
          {kudos.map((kudo, index) => (
            <div key={kudo.id} className="flex-shrink-0 w-full md:w-[528px]">
              <HighlightKudoCard
                kudo={kudo}
                isActive={index === centerIndex}
                specialDayActive={specialDayActive}
                specialDayMultiplier={specialDayMultiplier}
                currentUserId={currentUserId}
                labels={labels}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous slide"
          className="w-12 h-12 flex items-center justify-center rounded transition-colors hover:bg-[rgba(255,234,158,0.10)] disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M18 4L8 14L18 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <span className="font-bold text-[28px] leading-9 text-[var(--color-kudos-text-muted)] tabular-nums">
          {currentPage}/{totalPages}
        </span>

        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next slide"
          className="w-12 h-12 flex items-center justify-center rounded transition-colors hover:bg-[rgba(255,234,158,0.10)] disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M10 4L20 14L10 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
