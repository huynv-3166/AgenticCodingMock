import { cookies } from "next/headers";
import { getDictionary } from "@/libs/i18n";
import { createClient } from "@/libs/supabase/server";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { KudosPageClient } from "@/components/kudos/KudosPageClient";
// Mock data removed — using Supabase as data source
import type { Language, Kudo, UserInfo, UserStats, GiftRecipient, SpecialDayInfo } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatUserProfile(profile: any, isAnonymous: boolean): UserInfo {
  if (!profile || isAnonymous) {
    return {
      user_id: "",
      name: "",
      avatar_url: null,
      department: "",
      department_code: "",
      star_level: 0,
    };
  }
  const dept = Array.isArray(profile.department) ? profile.department[0] : profile.department;
  return {
    user_id: profile.user_id ?? "",
    name: profile.display_name ?? "",
    avatar_url: null,
    department: dept?.name ?? "",
    department_code: dept?.code ?? "",
    star_level: profile.star_level ?? 0,
  };
}

export default async function SunKudosPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  let kudos: Kudo[] = [];
  let stats: UserStats = { kudos_received: 0, kudos_sent: 0, hearts_received: 0, secret_boxes_opened: 0, secret_boxes_unopened: 0 };
  let gifts: GiftRecipient[] = [];
  let specialDay: SpecialDayInfo = { active: false, multiplier: 1 };
  let spotlightData: { totalKudos: number; names: { name: string; kudoCount: number }[] } = { totalKudos: 0, names: [] };

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Fetch kudos feed directly from Supabase
      // Query kudos with basic fields only (no join to user_profiles — no direct FK)
      const { data: kudosData, error: kudosError } = await supabase
        .from("kudos")
        .select(`
          id, sender_id, receiver_id, message, category, is_anonymous, heart_count, created_at,
          hashtags:kudo_hashtags(hashtag:hashtags(name)),
          images:kudo_images(image_url, display_order),
          hearts!left(user_id)
        `)
        .order("created_at", { ascending: false })
        .limit(10);

      // Fetch all user profiles separately to resolve sender/receiver names
      const userIds = new Set<string>();
      for (const kudo of kudosData ?? []) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const k = kudo as any;
        if (k.sender_id) userIds.add(k.sender_id);
        if (k.receiver_id) userIds.add(k.receiver_id);
      }

      const { data: profilesData } = userIds.size > 0
        ? await supabase
            .from("user_profiles")
            .select("user_id, display_name, star_level, department:departments(name, code)")
            .in("user_id", Array.from(userIds))
        : { data: [] };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const profileMap = new Map((profilesData ?? []).map((p: any) => [p.user_id, p]));

      if (kudosData && kudosData.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        kudos = kudosData.map((kudo: any) => ({
          id: kudo.id,
          sender: formatUserProfile(profileMap.get(kudo.sender_id), kudo.is_anonymous),
          receiver: formatUserProfile(profileMap.get(kudo.receiver_id), false),
          message: kudo.message,
          category: kudo.category,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hashtags: (kudo.hashtags ?? []).map((h: any) => {
            const tag = Array.isArray(h.hashtag) ? h.hashtag[0] : h.hashtag;
            return tag?.name ?? "";
          }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          images: (kudo.images ?? []).sort((a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)).map((i: any) => i.image_url),
          heart_count: kudo.heart_count,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          is_hearted_by_me: (kudo.hearts ?? []).some((h: any) => h.user_id === user.id),
          is_anonymous: kudo.is_anonymous,
          created_at: kudo.created_at,
        }));
      }

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

      // Fetch spotlight data: receiver names + kudo counts
      const { count: totalKudosCount } = await supabase
        .from("kudos")
        .select("*", { count: "exact", head: true });

      const { data: receiverCounts } = await supabase
        .from("user_profiles")
        .select("display_name, kudo_received_count")
        .gt("kudo_received_count", 0)
        .order("kudo_received_count", { ascending: false })
        .limit(30);

      spotlightData = {
        totalKudos: totalKudosCount ?? 0,
        names: (receiverCounts ?? []).map((r) => ({
          name: (r as { display_name: string; kudo_received_count: number }).display_name ?? "",
          kudoCount: (r as { display_name: string; kudo_received_count: number }).kudo_received_count ?? 0,
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
