"use client";

import { useState } from "react";

interface ImageThumbnailProps {
  src: string;
  alt: string;
}

export function ImageThumbnail({ src, alt }: ImageThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-[88px] h-[88px] flex-shrink-0 rounded-[18px] border border-[var(--color-border)] bg-white overflow-hidden cursor-pointer transition-transform hover:opacity-85 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 motion-reduce:hover:transform-none"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </button>

      {/* Lightbox modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
