import { cookies } from "next/headers";
import { getDictionary } from "@/libs/i18n";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { KudosHero } from "@/components/kudos/KudosHero";
import { KudosPageClient } from "@/components/kudos/KudosPageClient";
import {
  MOCK_KUDOS,
  MOCK_STATS,
  MOCK_GIFTS,
  MOCK_SPECIAL_DAY,
} from "@/libs/data/kudos-mock";
import type { Language, Kudo, UserStats, GiftRecipient, SpecialDayInfo } from "@/types";

export default async function SunKudosPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  // Try fetching from API routes; fallback to mock data if unavailable
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const headers = { cookie: cookieStore.toString() };

  let kudos: Kudo[] = MOCK_KUDOS;
  let stats: UserStats = MOCK_STATS;
  let gifts: GiftRecipient[] = MOCK_GIFTS;
  let specialDay: SpecialDayInfo = MOCK_SPECIAL_DAY;

  try {
    const [feedRes, statsRes, giftsRes, specialDayRes] = await Promise.all([
      fetch(`${baseUrl}/api/kudos?limit=10`, { headers }).then((r) =>
        r.ok ? (r.json() as Promise<{ data?: Kudo[] }>) : null
      ),
      fetch(`${baseUrl}/api/users/me/stats`, { headers }).then((r) =>
        r.ok ? (r.json() as Promise<UserStats>) : null
      ),
      fetch(`${baseUrl}/api/users/gifts/recent`, { headers }).then((r) =>
        r.ok ? (r.json() as Promise<{ data?: GiftRecipient[] }>) : null
      ),
      fetch(`${baseUrl}/api/special-days/current`, { headers }).then((r) =>
        r.ok ? (r.json() as Promise<SpecialDayInfo>) : null
      ),
    ]);

    if (feedRes?.data && feedRes.data.length > 0) kudos = feedRes.data;
    if (statsRes) stats = statsRes;
    if (giftsRes?.data) gifts = giftsRes.data;
    if (specialDayRes) specialDay = specialDayRes;
  } catch {
    // API unavailable — use mock data (already set as defaults)
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      <AppHeader currentLanguage={locale} dictionary={dictionary} />

      <main className="flex-1 flex flex-col">
        <KudosHero
          heroTitle={dictionary.kudos_hero_title}
          writePlaceholder={dictionary.kudos_write_placeholder}
          searchLabel={dictionary.kudos_search}
        />

        <KudosPageClient
          initialKudos={kudos}
          stats={stats}
          gifts={gifts}
          specialDay={specialDay}
          labels={{
            sectionSubtitle: dictionary.kudos_section_subtitle,
            sectionHighlight: dictionary.kudos_section_highlight,
            sectionSpotlight: dictionary.kudos_section_spotlight,
            sectionAll: dictionary.kudos_section_all,
            filterHashtag: dictionary.kudos_filter_hashtag,
            filterDepartment: dictionary.kudos_filter_department,
            empty: dictionary.kudos_empty,
            noMore: dictionary.kudos_no_more,
            connectionLost: dictionary.kudos_connection_lost,
            retry: dictionary.kudos_retry,
            anonymous: dictionary.kudos_anonymous,
            copyLink: dictionary.kudos_copy_link,
            viewDetail: dictionary.kudos_view_detail,
            statReceived: dictionary.kudos_stat_received,
            statSent: dictionary.kudos_stat_sent,
            statHearts: dictionary.kudos_stat_hearts,
            statBoxesOpened: dictionary.kudos_stat_boxes_opened,
            statBoxesUnopened: dictionary.kudos_stat_boxes_unopened,
            openGift: dictionary.kudos_open_gift,
            leaderboardTitle: dictionary.kudos_leaderboard_title,
            leaderboardEmpty: dictionary.kudos_leaderboard_empty,
          }}
        />
      </main>

      <AppFooter dictionary={dictionary} />
    </div>
  );
}
