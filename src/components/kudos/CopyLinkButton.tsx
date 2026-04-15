"use client";

import { useState, useCallback } from "react";

interface CopyLinkButtonProps {
  kudoId: string;
  label: string;
  copiedLabel: string;
}

export function CopyLinkButton({
  kudoId,
  label,
  copiedLabel,
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const url = `${window.location.origin}/sun-kudos?kudo=${kudoId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [kudoId]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-3 rounded font-bold text-base leading-6 tracking-[0.15px] text-[var(--color-kudos-text-dark)] hover:bg-black/5 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
