"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HashtagChip } from "./HashtagChip";
import type { Hashtag } from "@/types";

interface HashtagSelectorProps {
  selected: Hashtag[];
  onChange: (hashtags: Hashtag[]) => void;
  error?: string;
  labels: {
    label: string;
    add: string;
    max: string;
  };
}

const MAX_HASHTAGS = 5;

export function HashtagSelector({ selected, onChange, error, labels }: HashtagSelectorProps) {
  const [allHashtags, setAllHashtags] = useState<Hashtag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch hashtags on first open
  const fetchHashtags = useCallback(async () => {
    if (allHashtags.length > 0) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/hashtags");
      if (res.ok) {
        const json = await res.json() as { data?: Hashtag[] };
        const hashtags = json.data ?? [];
        setAllHashtags(Array.isArray(hashtags) ? hashtags : []);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, [allHashtags.length]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    fetchHashtags();
  }, [fetchHashtags]);

  const handleSelect = useCallback(
    (hashtag: Hashtag) => {
      if (selected.length >= MAX_HASHTAGS) return;
      if (selected.find((h) => h.id === hashtag.id)) return;
      onChange([...selected, hashtag]);
      setIsOpen(false);
    },
    [selected, onChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      onChange(selected.filter((h) => h.id !== id));
    },
    [selected, onChange]
  );

  const selectedIds = new Set(selected.map((h) => h.id));
  const available = allHashtags.filter((h) => !selectedIds.has(h.id));
  const borderColor = error ? "border-[#CF1322]" : "";

  return (
    <div className={`flex flex-col md:flex-row gap-4 items-start md:items-center ${borderColor}`} ref={dropdownRef}>
      {/* Label */}
      <span className="flex items-center gap-0.5 shrink-0">
        <span className="text-[#CF1322] font-bold text-base font-['Noto_Sans_JP']">*</span>
        <span className="font-bold text-[22px] leading-7 text-[#00101A]">
          {labels.label}
        </span>
      </span>

      {/* Chips + Add button */}
      <div className="flex flex-wrap gap-2 items-center relative">
        {selected.map((h) => (
          <HashtagChip key={h.id} name={h.name} onRemove={() => handleRemove(h.id)} />
        ))}

        {/* Add button — hidden when max reached */}
        {selected.length < MAX_HASHTAGS && (
          <button
            type="button"
            onClick={handleOpen}
            className="flex items-center gap-1 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white hover:bg-[rgba(153,140,95,0.05)] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12h14" stroke="#999" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="text-[11px] leading-4 tracking-[0.5px] text-[#999] font-bold">{labels.add}</span>
              <span className="text-[11px] leading-4 tracking-[0.5px] text-[#999] font-bold">{labels.max}</span>
            </span>
          </button>
        )}

        {/* Dropdown */}
        {isOpen && (
          <ul className="absolute top-full mt-1 left-0 z-10 w-60 max-h-48 overflow-y-auto bg-white border border-[#998C5F] rounded-lg shadow-lg">
            {isLoading ? (
              <li className="px-4 py-3 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-[#998C5F] border-t-transparent rounded-full animate-spin" />
              </li>
            ) : available.length === 0 ? (
              <li className="px-4 py-3 text-[#999] text-sm font-bold">
                {selected.length >= MAX_HASHTAGS ? labels.max : "No more hashtags"}
              </li>
            ) : (
              available.map((h) => (
                <li
                  key={h.id}
                  onClick={() => handleSelect(h)}
                  className="px-4 py-3 cursor-pointer hover:bg-[rgba(153,140,95,0.1)] font-bold text-sm text-[#00101A] transition-colors"
                >
                  #{h.name}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && <p className="text-sm font-bold text-[#CF1322]">{error}</p>}
    </div>
  );
}
