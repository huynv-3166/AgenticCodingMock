"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { KudosSectionHeader } from "./KudosSectionHeader";
import { FilterBar } from "./FilterBar";
import { KudoFeed } from "./KudoFeed";
import type { KudoFeedHandle } from "./KudoFeed";
import { KudosHero } from "./KudosHero";
import { HighlightCarousel } from "./HighlightCarousel";
import { StatsSidebar } from "./StatsSidebar";
import { SunnerLeaderboard } from "./SunnerLeaderboard";
// Mock spotlight data removed — using real data from Supabase
import type {
  Kudo,
  UserStats,
  GiftRecipient,
  SpecialDayInfo,
  KudoFilters,
} from "@/types";
import type { Dictionary } from "@/libs/i18n";

// Dynamic import — keeps TipTap out of server bundle (Cloudflare Workers safe)
const WriteKudoModal = dynamic(
  () => import("./write/WriteKudoModal").then((m) => ({ default: m.WriteKudoModal })),
  { ssr: false }
);

interface KudosPageClientProps {
  initialKudos: Kudo[];
  initialHighlightKudos: Kudo[];
  stats: UserStats;
  gifts: GiftRecipient[];
  specialDay: SpecialDayInfo;
  spotlightData: { totalKudos: number; names: { name: string; kudoCount: number }[] };
  dictionary: Dictionary;
  heroLabels: {
    heroTitle: string;
    writePlaceholder: string;
    searchLabel: string;
  };
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
  initialHighlightKudos,
  stats,
  gifts,
  specialDay,
  spotlightData,
  dictionary,
  heroLabels,
  labels,
}: KudosPageClientProps) {
  const [filters, setFilters] = useState<KudoFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightKudos, setHighlightKudos] = useState(initialHighlightKudos);
  const kudoFeedRef = useRef<KudoFeedHandle>(null);

  const [spotlightSearch, setSpotlightSearch] = useState("");

  const handleFilterChange = useCallback((newFilters: KudoFilters) => {
    setFilters(newFilters);
  }, []);

  // Keep the highlight carousel in sync with the active filter.
  // Without a filter, reuse the SSR highlight (already top-5 by heart_count).
  useEffect(() => {
    if (!filters.hashtag && !filters.department) {
      setHighlightKudos(initialHighlightKudos);
      return;
    }

    const params = new URLSearchParams();
    if (filters.hashtag) params.set("hashtag", filters.hashtag);
    if (filters.department) params.set("department", filters.department);

    fetch(`/api/kudos/highlight?${params.toString()}`)
      .then((res) => (res.ok ? (res.json() as Promise<{ data: Kudo[] }>) : null))
      .then((json) => {
        if (json?.data) setHighlightKudos(json.data);
      })
      .catch(() => {});
  }, [filters.hashtag, filters.department, initialHighlightKudos]);

  const handleFilterByHashtag = useCallback((hashtag: string) => {
    setFilters((prev) => ({ ...prev, hashtag }));
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleKudoCreated = useCallback(() => {
    // Refresh All Kudos feed
    kudoFeedRef.current?.resetFeed();

    // Refresh Highlight Kudos against the heart-ranked endpoint (spec US3 AC#1).
    const params = new URLSearchParams();
    if (filters.hashtag) params.set("hashtag", filters.hashtag);
    if (filters.department) params.set("department", filters.department);
    const qs = params.toString();

    fetch(qs ? `/api/kudos/highlight?${qs}` : "/api/kudos/highlight")
      .then((res) => (res.ok ? (res.json() as Promise<{ data: Kudo[] }>) : null))
      .then((json) => {
        if (json?.data) setHighlightKudos(json.data);
      })
      .catch(() => {});
  }, [filters.hashtag, filters.department]);

  return (
    <>
      {/* Hero — rendered here so onOpenWriteModal can be wired as client callback */}
      <KudosHero
        heroTitle={heroLabels.heroTitle}
        writePlaceholder={heroLabels.writePlaceholder}
        searchLabel={heroLabels.searchLabel}
        onOpenWriteModal={handleOpenModal}
      />

      {/* Write Kudos Modal */}
      <WriteKudoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleKudoCreated}
        dictionary={dictionary}
      />

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
            kudos={highlightKudos}
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

            {/* Word cloud names — contained below header area */}
            <div className="absolute left-4 right-4 md:left-8 md:right-8 top-16 md:top-20 bottom-4 md:bottom-8 overflow-hidden" aria-hidden="true">
              {spotlightData.names.map((item, i) => {
                const maxCount = spotlightData.names[0]?.kudoCount ?? 1;
                const ratio = item.kudoCount / Math.max(maxCount, 1);
                const fontSize = 14 + ratio * 22;
                const isTop = i === 0;
                const col = i % 3;
                const row = Math.floor(i / 3);
                const x = 10 + col * 30 + ((i * 7) % 15);
                const y = 10 + row * 18 + ((i * 11) % 10);

                // Search highlight logic
                const searchTerm = spotlightSearch.trim().toLowerCase();
                const isMatch = searchTerm.length > 0 && item.name.toLowerCase().includes(searchTerm);
                const isDimmed = searchTerm.length > 0 && !isMatch;
                const opacity = isDimmed ? 0.15 : (0.5 + ratio * 0.5);

                let colorClass = "text-white";
                if (isMatch) colorClass = "text-[#FFEA9E]"; // gold highlight for search match
                else if (isTop && !isDimmed) colorClass = "text-[#F17676]";

                return (
                  <span
                    key={item.name + i}
                    className={`absolute font-bold whitespace-nowrap cursor-default select-none transition-all duration-300 ${colorClass}`}
                    style={{
                      left: `${Math.min(x, 85)}%`,
                      top: `${Math.min(y, 85)}%`,
                      fontSize: isMatch ? `${fontSize + 4}px` : `${fontSize}px`,
                      opacity,
                      transform: isMatch ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    {item.name}
                  </span>
                );
              })}
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
                    value={spotlightSearch}
                    onChange={(e) => setSpotlightSearch(e.target.value)}
                    placeholder={labels.filterHashtag === "Hashtag" ? "Search" : "Tìm kiếm"}
                    maxLength={100}
                    className="w-[140px] md:w-[180px] pl-9 pr-3 py-2 rounded-full border border-[var(--color-border)] bg-transparent text-white text-sm font-medium placeholder:text-white/50 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                </div>

                {/* 388 KUDOS — centered */}
                <div className="flex-1 text-center z-10">
                  <span className="font-bold text-xl md:text-[36px] md:leading-[44px] text-white">
                    {spotlightData.totalKudos} KUDOS
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
              ref={kudoFeedRef}
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
