"use client";

interface HashtagTagProps {
  name: string;
  onFilter: (hashtag: string) => void;
}

export function HashtagTag({ name, onFilter }: HashtagTagProps) {
  return (
    <button
      onClick={() => onFilter(name)}
      className="font-bold text-base leading-6 tracking-[0.5px] text-[var(--color-kudos-hashtag)] cursor-pointer hover:underline hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
    >
      #{name}
    </button>
  );
}
