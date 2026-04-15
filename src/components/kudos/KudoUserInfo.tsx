"use client";

import Image from "next/image";
import { HeroBadge } from "./HeroBadge";
import type { UserInfo } from "@/types";

interface KudoUserInfoProps {
  user: UserInfo;
  showBadge?: boolean;
}

export function KudoUserInfo({ user, showBadge = true }: KudoUserInfoProps) {
  return (
    <div className="flex items-center gap-[13px] max-w-[235px]">
      {/* Avatar */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-[1.869px] border-white">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[var(--color-divider)] flex items-center justify-center text-white font-bold text-xl">
            {user.name.charAt(0).toUpperCase() || "?"}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-bold text-base leading-6 tracking-[0.15px] text-[var(--color-kudos-text-dark)] truncate">
          {user.name}
        </span>
        <span className="font-bold text-sm leading-5 tracking-[0.1px] text-[var(--color-kudos-text-muted)]">
          {user.department_code}
        </span>
        {showBadge && user.star_level > 0 && (
          <HeroBadge level={user.star_level} />
        )}
      </div>
    </div>
  );
}
