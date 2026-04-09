"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BellIcon } from "@/components/shared/icons/BellIcon";
import { UserIcon } from "@/components/shared/icons/UserIcon";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import type { Language } from "@/types";

const NAV_LINKS = [
  { label: "About SAA 2025", href: "/" },
  { label: "Award Information", href: "/awards-information" },
  { label: "Sun* Kudos", href: "/sun-kudos" },
] as const;

type DropdownKey = "notification" | "profile";

export function AppHeaderClient({
  currentLanguage,
}: {
  currentLanguage: Language;
}) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openDropdown) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown]);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div ref={dropdownRef} className="hidden md:flex items-center flex-1 justify-between">
      {/* Left: Navigation links (positioned after logo with gap) */}
      <nav className="flex items-center gap-1 ml-8 lg:ml-16">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 text-sm font-bold font-[family-name:var(--font-montserrat)] rounded transition-colors duration-150 ${
                isActive
                  ? "text-[#FFEA9E] border-b border-[#FFEA9E]"
                  : "text-white hover:text-[#FFEA9E] hover:bg-[rgba(255,234,158,0.10)] hover:rounded-[4px]"
              }`}
              style={
                isActive
                  ? {
                      textShadow:
                        "0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287",
                    }
                  : undefined
              }
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right: Action buttons */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <div className="relative">
          <button
            aria-label="Notifications"
            aria-expanded={openDropdown === "notification"}
            onClick={() => toggleDropdown("notification")}
            className="flex items-center justify-center w-10 h-10 rounded cursor-pointer text-white hover:bg-white/10 transition-colors duration-150"
          >
            <BellIcon className="w-6 h-6" />
          </button>
          {openDropdown === "notification" && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a2330] border border-[var(--color-divider)] rounded-lg p-4 z-50">
              <p className="text-sm text-white/60">Coming soon</p>
            </div>
          )}
        </div>

        {/* Language selector */}
        <LanguageSelector currentLanguage={currentLanguage} />

        {/* Profile */}
        <div className="relative">
          <button
            aria-label="Profile"
            aria-expanded={openDropdown === "profile"}
            onClick={() => toggleDropdown("profile")}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#998C5F] cursor-pointer text-white hover:bg-white/10 transition-colors duration-150"
          >
            <UserIcon className="w-6 h-6" />
          </button>
          {openDropdown === "profile" && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a2330] border border-[var(--color-divider)] rounded-lg p-4 z-50">
              <p className="text-sm text-white/60">Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
