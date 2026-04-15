"use client";

import { useState, useCallback, Suspense } from "react";
import { KudosSectionHeader } from "./KudosSectionHeader";
import { FilterBar } from "./FilterBar";
import { KudoFeed } from "./KudoFeed";
import { HighlightCarousel } from "./HighlightCarousel";
import { StatsSidebar } from "./StatsSidebar";
import { SunnerLeaderboard } from "./SunnerLeaderboard";
import {
  SPOTLIGHT_NAMES as spotlightNames,
  SPOTLIGHT_TOTAL_KUDOS as spotlightTotal,
} from "@/libs/data/spotlight-mock";
import type {
  Kudo,
  UserStats,
  GiftRecipient,
  SpecialDayInfo,
  KudoFilters,
} from "@/types";

interface KudosPageClientProps {
  initialKudos: Kudo[];
  stats: UserStats;
  gifts: GiftRecipient[];
  specialDay: SpecialDayInfo;
  labels: {
    sectionSubtitle: string;
    sectionHighlight: string;
    sectionSpotlight: string;
    sectionAll: string;
    filterHashtag: string;
    filterDepartment: string;
    empty: string;
    noMore: string;
    connectionLost: string;
    retry: string;
    anonymous: string;
    copyLink: string;
    viewDetail: string;
    statReceived: string;
    statSent: string;
    statHearts: string;
    statBoxesOpened: string;
    statBoxesUnopened: string;
    openGift: string;
    leaderboardTitle: string;
    leaderboardEmpty: string;
  };
}

export function KudosPageClient({
  initialKudos,
  stats,
  gifts,
  specialDay,
  labels,
}: KudosPageClientProps) {
  const [filters, setFilters] = useState<KudoFilters>({});

  const handleFilterChange = useCallback((newFilters: KudoFilters) => {
    setFilters(newFilters);
  }, []);

  const handleFilterByHashtag = useCallback((hashtag: string) => {
    setFilters((prev) => ({ ...prev, hashtag }));
  }, []);

  return (
    <>
      {/* Highlight Kudos Section */}
      <section className="mt-[60px] md:mt-[120px]">
        <KudosSectionHeader
          subtitle={labels.sectionSubtitle}
          title={labels.sectionHighlight}
        >
          <Suspense fallback={null}>
            <FilterBar
              hashtagLabel={labels.filterHashtag}
              departmentLabel={labels.filterDepartment}
              onFilterChange={handleFilterChange}
            />
          </Suspense>
        </KudosSectionHeader>
        <div className="mt-4 md:mt-6">
          <HighlightCarousel
            kudos={initialKudos.slice(0, 5)}
            specialDayActive={specialDay.active}
            specialDayMultiplier={specialDay.multiplier}
            labels={{
              empty: labels.empty,
              anonymous: labels.anonymous,
              copyLink: labels.copyLink,
              viewDetail: labels.viewDetail,
            }}
          />
        </div>
      </section>

      {/* Spotlight Board Section */}
      <section className="mt-[60px] md:mt-[120px]">
        <KudosSectionHeader
          subtitle={labels.sectionSubtitle}
          title={labels.sectionSpotlight}
        />
        <div className="px-4 md:px-10 lg:px-[144px] mt-4 md:mt-6">
          <div className="relative w-full h-[300px] md:h-[548px] rounded-[47px] border border-[var(--color-border)] overflow-hidden">
            {/* Background */}
            <img
              src="/assets/countdown/background.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-[50%_15%]"
              style={{ transform: "scaleX(-1)" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            {/* Word cloud names from mock data */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {spotlightNames.map((item, i) => (
                <span
                  key={i}
                  className={`absolute font-bold whitespace-nowrap cursor-default select-none ${
                    item.highlight ? "text-[#F17676]" : "text-white"
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    fontSize: `${item.size}px`,
                    opacity: item.opacity,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>

            {/* UI overlay */}
            <div className="absolute inset-0 p-4 md:p-8 flex flex-col">
              {/* Top row: search (left) + label (center) */}
              <div className="flex items-start">
                {/* Search input — left */}
                <div className="relative z-10 flex-shrink-0">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-60"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder={labels.filterHashtag === "Hashtag" ? "Search" : "Tìm kiếm"}
                    maxLength={100}
                    className="w-[140px] md:w-[180px] pl-9 pr-3 py-2 rounded-full border border-[var(--color-border)] bg-transparent text-white text-sm font-medium placeholder:text-white/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                </div>

                {/* 388 KUDOS — centered */}
                <div className="flex-1 text-center z-10">
                  <span className="font-bold text-xl md:text-[36px] md:leading-[44px] text-white">
                    {spotlightTotal} KUDOS
                  </span>
                </div>

                {/* Spacer to balance search input width */}
                <div className="w-[140px] md:w-[180px] flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Kudos Section */}
      <section className="mt-[60px] md:mt-[120px]">
        <KudosSectionHeader
          subtitle={labels.sectionSubtitle}
          title={labels.sectionAll}
        />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[80px] px-4 md:px-10 lg:px-[144px] mt-4 md:mt-6 justify-between">
          {/* Feed with infinite scroll */}
          <div className="flex-1 max-w-[680px]">
            <KudoFeed
              initialKudos={initialKudos}
              initialCursor={
                initialKudos.length === 10
                  ? initialKudos[initialKudos.length - 1]?.created_at ?? null
                  : null
              }
              filters={filters}
              specialDayActive={specialDay.active}
              labels={{
                empty: labels.empty,
                noMore: labels.noMore,
                connectionLost: labels.connectionLost,
                retry: labels.retry,
                anonymous: labels.anonymous,
                copyLink: labels.copyLink,
              }}
              onFilterByHashtag={handleFilterByHashtag}
            />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:w-auto">
            <StatsSidebar
              stats={stats}
              labels={{
                received: labels.statReceived,
                sent: labels.statSent,
                hearts: labels.statHearts,
                boxesOpened: labels.statBoxesOpened,
                boxesUnopened: labels.statBoxesUnopened,
                openGift: labels.openGift,
              }}
              onOpenGift={() => {
                // US7: Wire to secret box dialog
                fetch("/api/secret-box/open", { method: "POST" })
                  .then((r) => r.json())
                  .catch(() => {});
              }}
              canOpenGift={stats.secret_boxes_unopened > 0}
            />
            <SunnerLeaderboard
              title={labels.leaderboardTitle}
              emptyLabel={labels.leaderboardEmpty}
              entries={gifts}
            />
          </div>
        </div>
      </section>
    </>
  );
}
