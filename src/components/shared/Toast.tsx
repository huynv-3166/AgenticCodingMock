"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
}

export function Toast({ message, type, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-[fadeInUp_200ms_ease-out]">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2`}
        role="alert"
      >
        <span>{message}</span>
        <button
          onClick={onDismiss}
          className="ml-2 opacity-70 hover:opacity-100 text-lg leading-none"
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
