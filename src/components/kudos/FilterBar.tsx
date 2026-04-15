"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Hashtag, Department, KudoFilters } from "@/types";

interface FilterBarProps {
  hashtagLabel: string;
  departmentLabel: string;
  onFilterChange: (filters: KudoFilters) => void;
}

export function FilterBar({
  hashtagLabel,
  departmentLabel,
  onFilterChange,
}: FilterBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [hashtagOpen, setHashtagOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const activeHashtag = searchParams.get("hashtag") ?? undefined;
  const activeDepartment = searchParams.get("department") ?? undefined;

  // Fetch filter options once
  useEffect(() => {
    fetch("/api/hashtags")
      .then((r) => r.json() as Promise<{ data?: Hashtag[] }>)
      .then((d) => setHashtags(d.data ?? []))
      .catch(() => {});
    fetch("/api/departments")
      .then((r) => r.json() as Promise<{ data?: Department[] }>)
      .then((d) => setDepartments(d.data ?? []))
      .catch(() => {});
  }, []);

  const updateFilter = (key: "hashtag" | "department", value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    const newFilters: KudoFilters = {
      hashtag: key === "hashtag" ? value : activeHashtag,
      department: key === "department" ? value : activeDepartment,
    };
    onFilterChange(newFilters);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Hashtag filter */}
      <div className="relative">
        <button
          onClick={() => {
            setHashtagOpen(!hashtagOpen);
            setDepartmentOpen(false);
          }}
          aria-expanded={hashtagOpen}
          aria-haspopup="listbox"
          className={`flex items-center gap-2 px-4 py-4 rounded border font-bold text-base leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 ${
            activeHashtag
              ? "border-[var(--color-primary)] bg-[rgba(255,234,158,0.30)] text-[var(--color-primary)]"
              : "border-[var(--color-border)] bg-[var(--color-btn-secondary-bg)] text-white hover:bg-[rgba(255,234,158,0.20)] hover:border-[var(--color-primary)]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 1L5 11M15 1L13 11M3 5H17M2 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {activeHashtag || hashtagLabel}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`transition-transform ${hashtagOpen ? "rotate-180" : ""}`}>
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {hashtagOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 max-h-60 overflow-y-auto bg-[var(--color-kudos-container)] border border-[var(--color-border)] rounded-lg shadow-lg z-50">
            <button
              onClick={() => { updateFilter("hashtag", undefined); setHashtagOpen(false); }}
              className="w-full px-4 py-3 text-left font-bold text-sm text-white hover:bg-[rgba(255,234,158,0.10)] transition-colors"
            >
              All
            </button>
            {hashtags.map((h) => (
              <button
                key={h.id}
                onClick={() => { updateFilter("hashtag", h.name); setHashtagOpen(false); }}
                className={`w-full px-4 py-3 text-left font-bold text-sm transition-colors ${
                  activeHashtag === h.name
                    ? "text-[var(--color-primary)] bg-[rgba(255,234,158,0.10)]"
                    : "text-white hover:bg-[rgba(255,234,158,0.05)]"
                }`}
              >
                {h.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Department filter */}
      <div className="relative">
        <button
          onClick={() => {
            setDepartmentOpen(!departmentOpen);
            setHashtagOpen(false);
          }}
          aria-expanded={departmentOpen}
          aria-haspopup="listbox"
          className={`flex items-center gap-2 px-4 py-4 rounded border font-bold text-base leading-6 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 ${
            activeDepartment
              ? "border-[var(--color-primary)] bg-[rgba(255,234,158,0.30)] text-[var(--color-primary)]"
              : "border-[var(--color-border)] bg-[var(--color-btn-secondary-bg)] text-white hover:bg-[rgba(255,234,158,0.20)] hover:border-[var(--color-primary)]"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          {activeDepartment || departmentLabel}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className={`transition-transform ${departmentOpen ? "rotate-180" : ""}`}>
            <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {departmentOpen && (
          <div className="absolute top-full left-0 mt-2 w-56 max-h-60 overflow-y-auto bg-[var(--color-kudos-container)] border border-[var(--color-border)] rounded-lg shadow-lg z-50">
            <button
              onClick={() => { updateFilter("department", undefined); setDepartmentOpen(false); }}
              className="w-full px-4 py-3 text-left font-bold text-sm text-white hover:bg-[rgba(255,234,158,0.10)] transition-colors"
            >
              All
            </button>
            {departments.map((d) => (
              <button
                key={d.id}
                onClick={() => { updateFilter("department", d.code); setDepartmentOpen(false); }}
                className={`w-full px-4 py-3 text-left font-bold text-sm transition-colors ${
                  activeDepartment === d.code
                    ? "text-[var(--color-primary)] bg-[rgba(255,234,158,0.10)]"
                    : "text-white hover:bg-[rgba(255,234,158,0.05)]"
                }`}
              >
                {d.name} ({d.code})
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
