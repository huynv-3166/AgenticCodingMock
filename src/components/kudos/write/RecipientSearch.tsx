"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { UserSearchResult } from "@/types";

interface RecipientSearchProps {
  value: UserSearchResult | null;
  onChange: (user: UserSearchResult | null) => void;
  error?: string;
  labels: {
    label: string;
    placeholder: string;
    noResults: string;
  };
}

export function RecipientSearch({ value, onChange, error, labels }: RecipientSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 1) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const json = await res.json() as { data?: UserSearchResult[] };
          console.log("[RecipientSearch] API response:", JSON.stringify(json));
          const users = json.data ?? [];
          setResults(Array.isArray(users) ? users : []);
          setIsOpen(true);
        }
      } catch {
        // silently fail — user can retry by typing
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = useCallback(
    (user: UserSearchResult) => {
      onChange(user);
      setQuery("");
      setIsOpen(false);
      setHighlightIndex(-1);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(null);
    setQuery("");
    inputRef.current?.focus();
  }, [onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        e.preventDefault();
        handleSelect(results[highlightIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [isOpen, results, highlightIndex, handleSelect]
  );

  const borderColor = error ? "border-[#CF1322]" : "border-[#998C5F]";

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
      {/* Label */}
      <label className="flex items-center gap-0.5 shrink-0" htmlFor="recipient-search">
        <span className="text-[#CF1322] font-bold text-base font-['Noto_Sans_JP']">*</span>
        <span className="font-bold text-[22px] leading-7 text-[#00101A]">
          {labels.label}
        </span>
      </label>

      {/* Input area */}
      <div className="relative flex-1 w-full">
        {value ? (
          // Selected state
          <div
            className={`flex items-center justify-between h-14 px-6 py-4 border ${borderColor} rounded-lg bg-white`}
          >
            <span className="font-bold text-base text-[#00101A] truncate">
              {value.name}
              {value.department && (
                <span className="text-[#999] ml-2">({value.department})</span>
              )}
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="ml-2 text-[#999] hover:text-[#00101A] transition-colors"
              aria-label="Clear recipient"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ) : (
          // Search input
          <div className="relative">
            <input
              ref={inputRef}
              id="recipient-search"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                search(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => query.length > 0 && results.length > 0 && setIsOpen(true)}
              placeholder={labels.placeholder}
              className={`w-full h-14 px-6 py-4 pr-12 border ${borderColor} rounded-lg bg-white font-bold text-base text-[#00101A] placeholder:text-[#999] placeholder:font-bold focus:outline-none focus:border-[#998C5F] transition-colors`}
              autoComplete="off"
              role="combobox"
              aria-expanded={isOpen}
              aria-autocomplete="list"
              aria-controls="recipient-results"
            />
            {/* Dropdown arrow / spinner */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[#998C5F] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="#00101A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Dropdown */}
        {isOpen && !value && (
          <ul
            id="recipient-results"
            role="listbox"
            className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-[#998C5F] rounded-lg shadow-lg"
          >
            {results.length === 0 ? (
              <li className="px-6 py-4 text-[#999] font-bold text-sm">
                {labels.noResults}
              </li>
            ) : (
              results.map((user, i) => (
                <li
                  key={user.user_id}
                  role="option"
                  aria-selected={i === highlightIndex}
                  onClick={() => handleSelect(user)}
                  onMouseEnter={() => setHighlightIndex(i)}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
                    i === highlightIndex ? "bg-[rgba(153,140,95,0.1)]" : "hover:bg-[rgba(153,140,95,0.05)]"
                  }`}
                >
                  {/* Avatar placeholder */}
                  <div className="w-8 h-8 rounded-full bg-[#E5E5E5] flex-shrink-0 flex items-center justify-center">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="#999" strokeWidth="2" />
                      </svg>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm text-[#00101A] truncate">{user.name}</span>
                    {user.department && (
                      <span className="text-xs text-[#999] truncate">{user.department}</span>
                    )}
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
    {error && <p className="text-sm font-bold text-[#CF1322] md:ml-[155px]">{error}</p>}
    </div>
  );
}
