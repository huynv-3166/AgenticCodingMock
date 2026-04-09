"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Category {
  id: string;
  title: string;
}

interface AwardSidebarProps {
  categories: Category[];
}

export function AwardSidebar({ categories }: AwardSidebarProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const isScrollingRef = useRef(false);

  const handleClick = useCallback((id: string) => {
    isScrollingRef.current = true;
    setActiveCategory(id);

    const element = document.getElementById(id);
    if (element) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      element.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "start",
      });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const headerOffset = 120;
      let currentId = categories[0]?.id ?? "";

      for (const category of categories) {
        const el = document.getElementById(category.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            currentId = category.id;
          }
        }
      }

      setActiveCategory(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // Handle deep links on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && categories.some((c) => c.id === hash)) {
      setActiveCategory(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "instant", block: "start" });
        }, 100);
      }
    }
  }, [categories]);

  return (
    <nav aria-label="Award categories">
      {/* Desktop: vertical sidebar */}
      <div className="hidden lg:flex flex-col gap-4">
        {categories.map((category) => (
          <SidebarButton
            key={category.id}
            category={category}
            isActive={activeCategory === category.id}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Mobile/Tablet: horizontal scroll tabs */}
      <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-3 sticky top-[80px] z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-sm -mx-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.id)}
            aria-current={activeCategory === category.id ? "true" : undefined}
            className={`shrink-0 px-4 py-2 rounded text-xs font-bold leading-5 whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 motion-reduce:transition-none ${
              activeCategory === category.id
                ? "bg-[rgba(255,234,158,0.1)] text-[var(--color-primary)] border-b border-[var(--color-primary)]"
                : "text-white hover:bg-[rgba(255,234,158,0.1)]"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </nav>
  );
}

function SidebarButton({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onClick(category.id)}
      aria-current={isActive ? "true" : undefined}
      className={`text-left p-4 rounded text-sm font-bold leading-5 tracking-[0.25px] cursor-pointer transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 motion-reduce:transition-none ${
        isActive
          ? "bg-[rgba(255,234,158,0.1)] text-[var(--color-primary)] border-b border-[var(--color-primary)]"
          : "text-white hover:bg-[rgba(255,234,158,0.1)]"
      }`}
      style={
        isActive
          ? { textShadow: "var(--text-shadow-active)" }
          : undefined
      }
    >
      {category.title}
    </button>
  );
}
