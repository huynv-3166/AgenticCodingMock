"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BellIcon } from "@/components/shared/icons/BellIcon";
import { UserIcon } from "@/components/shared/icons/UserIcon";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { createClient } from "@/libs/supabase/client";
import type { Language } from "@/types";

type NavLabels = {
  aboutSaa: string;
  awardInformation: string;
  sunKudos: string;
  comingSoon: string;
  logout: string;
  guest: string;
};

type DropdownKey = "notification" | "profile";

export function AppHeaderClient({
  currentLanguage,
  navLabels,
  userName,
}: {
  currentLanguage: Language;
  navLabels: NavLabels;
  userName: string | null;
}) {
  const NAV_LINKS = [
    { label: navLabels.aboutSaa, href: "/" },
    { label: navLabels.awardInformation, href: "/awards" },
    { label: navLabels.sunKudos, href: "/sun-kudos" },
  ];
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpenDropdown(null);
    router.refresh();
    router.push("/login");
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
              <p className="text-sm text-white/60">{navLabels.comingSoon}</p>
            </div>
          )}
        </div>

        {/* Language selector */}
        <LanguageSelector
          currentLanguage={currentLanguage}
          onOpen={() => setOpenDropdown(null)}
        />

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
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a2330] border border-[var(--color-divider)] rounded-lg p-2 z-50">
              <div className="px-3 py-2 border-b border-white/10">
                <p
                  className="text-sm font-bold text-white truncate"
                  title={userName ?? navLabels.guest}
                >
                  {userName ?? navLabels.guest}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut || !userName}
                className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded text-sm font-medium text-white hover:bg-white/10 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L5 12M5 12L10 7M5 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {navLabels.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
