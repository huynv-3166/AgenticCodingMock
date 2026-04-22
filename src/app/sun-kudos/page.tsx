import { cookies } from "next/headers";
import { getDictionary } from "@/libs/i18n";
import { createClient } from "@/libs/supabase/server";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { KudosPageClient } from "@/components/kudos/KudosPageClient";
import { fetchProfileMapForKudos, formatKudo } from "@/libs/kudos/queries";
// Mock data removed — using Supabase as data source
import type { Language, Kudo, UserStats, GiftRecipient, SpecialDayInfo } from "@/types";

const HIGHLIGHT_SELECT = `
  id, sender_id, receiver_id, message, category, is_anonymous, heart_count, created_at,
  hashtags:kudo_hashtags(hashtag:hashtags(name)),
  images:kudo_images(image_url, display_order),
  hearts!left(user_id)
`;

export default async function SunKudosPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  let kudos: Kudo[] = [];
  let highlightKudos: Kudo[] = [];
  let stats: UserStats = { kudos_received: 0, kudos_sent: 0, hearts_received: 0, secret_boxes_opened: 0, secret_boxes_unopened: 0 };
  const gifts: GiftRecipient[] = [];
  const specialDay: SpecialDayInfo = { active: false, multiplier: 1 };
  let spotlightData: { totalKudos: number; names: { name: string; kudoCount: number }[] } = { totalKudos: 0, names: [] };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Run feed and highlight queries in parallel — they index on different columns.
      const [feedResult, highlightResult] = await Promise.all([
        supabase
          .from("kudos")
          .select(HIGHLIGHT_SELECT)
          .order("created_at", { ascending: false })
          .limit(10),
        // Spec US3 AC#1: top 5 kudos with the most hearts (kudos with 0 hearts never appear).
        supabase
          .from("kudos")
          .select(HIGHLIGHT_SELECT)
          .order("heart_count", { ascending: false })
          .gt("heart_count", 0)
          .limit(5),
      ]);

      const kudosData = feedResult.data;
      const highlightData = highlightResult.data;

      // One profile lookup for both lists
      const profileMap = await fetchProfileMapForKudos(supabase, [
        ...(kudosData ?? []),
        ...(highlightData ?? []),
      ]);

      kudos = (kudosData ?? []).map((k) => formatKudo(k, profileMap, user.id));
      highlightKudos = (highlightData ?? []).map((k) => formatKudo(k, profileMap, user.id));

      // Fetch user stats
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("kudo_received_count, kudo_sent_count, heart_received_count")
        .eq("user_id", user.id)
        .single();

      if (profileData) {
        const { count: unopenedBoxes } = await supabase
          .from("secret_boxes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_opened", false);

        const { count: openedBoxes } = await supabase
          .from("secret_boxes")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("is_opened", true);

        stats = {
          kudos_received: profileData.kudo_received_count,
          kudos_sent: profileData.kudo_sent_count,
          hearts_received: profileData.heart_received_count,
          secret_boxes_opened: openedBoxes ?? 0,
          secret_boxes_unopened: unopenedBoxes ?? 0,
        };
      }

      // Fetch spotlight data from `spotlight_receiver_counts` view so the
      // total and per-user counts both derive from the `kudos` table and
      // cannot drift from reality.
      const { count: totalKudosCount } = await supabase
        .from("kudos")
        .select("*", { count: "exact", head: true });

      const { data: receiverCounts } = await supabase
        .from("spotlight_receiver_counts")
        .select("display_name, kudo_count")
        .order("kudo_count", { ascending: false })
        .limit(30);

      spotlightData = {
        totalKudos: totalKudosCount ?? 0,
        names: (receiverCounts ?? []).map((r) => ({
          name: (r as { display_name: string; kudo_count: number }).display_name ?? "",
          kudoCount: (r as { display_name: string; kudo_count: number }).kudo_count ?? 0,
        })),
      };
    }
  } catch {
    // Supabase unavailable — use mock data (already set as defaults)
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      <AppHeader currentLanguage={locale} dictionary={dictionary} />

      <main className="flex-1 flex flex-col">
        <KudosPageClient
          initialKudos={kudos}
          initialHighlightKudos={highlightKudos}
          stats={stats}
          gifts={gifts}
          specialDay={specialDay}
          spotlightData={spotlightData}
          dictionary={dictionary}
          heroLabels={{
            heroTitle: dictionary.kudos_hero_title,
            writePlaceholder: dictionary.kudos_write_placeholder,
            searchLabel: dictionary.kudos_search,
          }}
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
