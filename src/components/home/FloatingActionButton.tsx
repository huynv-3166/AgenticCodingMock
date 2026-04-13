"use client";

import { useState } from "react";
import { PencilIcon } from "@/components/shared/icons/PencilIcon";
import { SAAWidgetIcon } from "@/components/shared/icons/SAAWidgetIcon";

export function FloatingActionButton({ comingSoonLabel }: { comingSoonLabel: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-48 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg p-4 shadow-lg">
          <p className="text-sm text-white/60 text-center">{comingSoonLabel}</p>
        </div>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 w-[106px] h-16 bg-[var(--color-primary)] rounded-full shadow-[var(--shadow-award)] cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        aria-label="Quick actions"
        aria-expanded={isOpen}
      >
        <PencilIcon className="w-6 h-6 text-[var(--color-bg-primary)]" />
        <span className="text-[var(--color-bg-primary)] font-bold">/</span>
        <SAAWidgetIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
