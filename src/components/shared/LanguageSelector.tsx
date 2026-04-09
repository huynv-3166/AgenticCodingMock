"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@/components/shared/icons/ChevronDownIcon";
import {
  type Language,
  LANGUAGES,
  LANGUAGE_LABELS,
} from "@/types";

export function LanguageSelector({
  currentLanguage,
}: {
  currentLanguage: Language;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    document.cookie = `NEXT_LOCALE=${lang};max-age=${365 * 24 * 60 * 60};path=/;SameSite=Lax`;
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-0.5 px-4 py-4 rounded-[var(--radius-language)] cursor-pointer transition-colors duration-150 hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2"
      >
        {currentLanguage === "vi" && (
          <Image
            src="/assets/auth/login/vn-flag.svg"
            alt="Vietnam"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        )}
        <span className="text-base font-bold text-white tracking-[0.15px]">
          {LANGUAGE_LABELS[currentLanguage]}
        </span>
        <ChevronDownIcon className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-full mt-1 bg-[#1a2330] border border-[var(--color-divider)] rounded-lg py-1 min-w-[120px] z-50 transition-opacity transition-transform duration-150 ease-out"
        >
          {LANGUAGES.map((lang) => (
            <li
              key={lang}
              role="option"
              aria-selected={lang === currentLanguage}
              tabIndex={0}
              onClick={() => handleSelect(lang)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(lang);
                }
              }}
              className={`px-4 py-2 cursor-pointer text-sm font-bold text-white hover:bg-white/10 ${
                lang === currentLanguage ? "bg-white/5" : ""
              }`}
            >
              {LANGUAGE_LABELS[lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
