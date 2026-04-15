"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { KudoCard } from "./KudoCard";
import type { Kudo, KudoFilters } from "@/types";

interface KudoFeedProps {
  initialKudos: Kudo[];
  initialCursor: string | null;
  filters: KudoFilters;
  specialDayActive: boolean;
  labels: {
    empty: string;
    noMore: string;
    connectionLost: string;
    retry: string;
    anonymous: string;
    copyLink: string;
  };
  onFilterByHashtag?: (hashtag: string) => void;
}

export function KudoFeed({
  initialKudos,
  initialCursor,
  filters,
  specialDayActive: _specialDayActive,
  labels,
  onFilterByHashtag: _onFilterByHashtag,
}: KudoFeedProps) {
  // These props will be used in US2 (heart) and US4 (filter) phases
  void _specialDayActive;
  void _onFilterByHashtag;
  const [kudos, setKudos] = useState<Kudo[]>(initialKudos);
  const [cursor, setCursor] = useState<string | null>(initialCursor);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [feedError, setFeedError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Track if filters have been changed by user (skip initial mount)
  const hasFiltersChanged = useRef(false);

  // Reset feed when filters change (but not on initial mount)
  useEffect(() => {
    if (!hasFiltersChanged.current) {
      hasFiltersChanged.current = true;
      return; // Skip first render — use initialKudos from SSR
    }

    setIsInitialLoading(true);
    setFeedError(null);

    const params = new URLSearchParams();
    params.set("limit", "10");
    if (filters.hashtag) params.set("hashtag", filters.hashtag);
    if (filters.department) params.set("department", filters.department);

    fetch(`/api/kudos?${params.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load kudos");
        return r.json() as Promise<{ data?: Kudo[]; nextCursor?: string | null }>;
      })
      .then((data) => {
        setKudos(data.data ?? []);
        setCursor(data.nextCursor ?? null);
      })
      .catch(() => {
        // If API fails, keep showing current data
        setIsInitialLoading(false);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, [filters.hashtag, filters.department]);

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !cursor) return;

    setIsLoadingMore(true);
    setFeedError(null);

    try {
      const params = new URLSearchParams();
      params.set("cursor", cursor);
      params.set("limit", "10");
      if (filters.hashtag) params.set("hashtag", filters.hashtag);
      if (filters.department) params.set("department", filters.department);

      const res = await fetch(`/api/kudos?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load more kudos");

      const data = (await res.json()) as { data?: Kudo[]; nextCursor?: string | null };
      setKudos((prev) => [...prev, ...(data.data ?? [])]);
      setCursor(data.nextCursor ?? null);
    } catch (err) {
      setFeedError(
        err instanceof Error ? err.message : labels.connectionLost
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [cursor, isLoadingMore, filters, labels.connectionLost]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && cursor && !isLoadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cursor, isLoadingMore, loadMore]);

  // Initial loading — skeleton state
  if (isInitialLoading) {
    return (
      <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading kudos">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full h-[400px] bg-[var(--color-kudos-card-bg)] rounded-[24px] animate-pulse opacity-50"
          />
        ))}
      </div>
    );
  }

  // Error state
  if (feedError && kudos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="font-bold text-base text-[var(--color-kudos-text-muted)]">
          {feedError}
        </p>
        <button
          onClick={() => {
            setFeedError(null);
            setIsInitialLoading(true);
            fetch(`/api/kudos?limit=10`)
              .then((r) => r.json() as Promise<{ data?: Kudo[]; nextCursor?: string | null }>)
              .then((data) => {
                setKudos(data.data ?? []);
                setCursor(data.nextCursor ?? null);
              })
              .catch((err) => setFeedError(err.message))
              .finally(() => setIsInitialLoading(false));
          }}
          className="px-6 py-3 bg-[var(--color-button-bg)] rounded-lg font-bold text-base text-[var(--color-button-text)] hover:brightness-95 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        >
          {labels.retry}
        </button>
      </div>
    );
  }

  // Empty state
  if (kudos.length === 0) {
    return (
      <p className="font-bold text-base text-[var(--color-kudos-text-muted)] text-center py-20">
        {labels.empty}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6" aria-live="polite">
      {kudos.map((kudo) => (
        <KudoCard
          key={kudo.id}
          kudo={kudo}
          anonymousLabel={labels.anonymous}
          copyLinkLabel={labels.copyLink}
        />
      ))}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-1" aria-hidden="true" />

      {/* Loading more spinner */}
      {isLoadingMore && (
        <div className="flex justify-center py-6">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Inline error during load more */}
      {feedError && kudos.length > 0 && (
        <div className="flex flex-col items-center gap-2 py-4">
          <p className="font-bold text-sm text-[var(--color-kudos-text-muted)]">
            {labels.connectionLost}
          </p>
          <button
            onClick={loadMore}
            className="font-bold text-sm text-[var(--color-primary)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
          >
            {labels.retry}
          </button>
        </div>
      )}

      {/* End of feed */}
      {!cursor && !isLoadingMore && kudos.length > 0 && (
        <p className="font-bold text-sm text-[var(--color-kudos-text-muted)] text-center py-4">
          {labels.noMore}
        </p>
      )}
    </div>
  );
}
