"use client";

import type { ReactNode } from "react";

interface AwardContentProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function AwardContent({ sidebar, children }: AwardContentProps) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[var(--spacing-hero-px)] pb-12 lg:pb-[var(--spacing-hero-py)]">
      {/* Mobile/Tablet: tabs shown above content (rendered inside sidebar component) */}
      <div className="lg:hidden">{sidebar}</div>

      <div className="relative flex gap-8 lg:gap-[var(--spacing-sidebar-content-gap)]">
        {/* Desktop: sidebar pinned on left */}
        <div className="hidden lg:block shrink-0 w-[var(--spacing-sidebar-width)] sticky top-[100px] self-start h-fit">
          {sidebar}
        </div>

        {/* Award cards (Server-rendered children) */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
