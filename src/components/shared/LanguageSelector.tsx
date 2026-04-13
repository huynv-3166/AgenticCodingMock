"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@/components/shared/icons/ChevronDownIcon";
import {
  type Language,
  LANGUAGES,
  LANGUAGE_LABELS,
  LANGUAGE_FLAGS,
} from "@/types";

export function LanguageSelector({
  currentLanguage,
  onOpen,
}: {
  currentLanguage: Language;
  onOpen?: () => void;
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

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) onOpen?.();
  };

  const handleSelect = (lang: Language) => {
    if (lang === currentLanguage) {
      setIsOpen(false);
      return;
    }
    document.cookie = `NEXT_LOCALE=${lang};max-age=${365 * 24 * 60 * 60};path=/;SameSite=Lax`;
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-0.5 px-4 py-4 rounded-[var(--radius-language)] cursor-pointer transition-colors duration-150 hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2"
      >
        <Image
          src={LANGUAGE_FLAGS[currentLanguage]}
          alt={LANGUAGE_LABELS[currentLanguage]}
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="text-base font-bold text-white tracking-[0.15px] font-[family-name:var(--font-montserrat)]">
          {LANGUAGE_LABELS[currentLanguage]}
        </span>
        <ChevronDownIcon className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-full mt-1 bg-[#00070C] border border-[var(--color-border)] rounded-lg p-1.5 flex flex-col min-w-[120px] z-50 transition-opacity transition-transform duration-150 ease-out"
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
              className={`flex items-center gap-1 px-4 py-4 cursor-pointer text-base font-bold text-white tracking-[0.15px] font-[family-name:var(--font-montserrat)] transition-colors duration-150 ${
                lang === currentLanguage
                  ? "bg-[rgba(255,234,158,0.2)] rounded-sm"
                  : "bg-transparent rounded hover:bg-white/10"
              }`}
            >
              <Image
                src={LANGUAGE_FLAGS[lang]}
                alt={LANGUAGE_LABELS[lang]}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              {LANGUAGE_LABELS[lang]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
