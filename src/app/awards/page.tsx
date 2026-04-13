import { cookies } from "next/headers";
import { getDictionary } from "@/libs/i18n";
import { AWARD_CATEGORIES_DETAIL } from "@/libs/data/awards";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { HeroBanner } from "@/components/awards/HeroBanner";
import { AwardSidebar } from "@/components/awards/AwardSidebar";
import { AwardContent } from "@/components/awards/AwardContent";
import { AwardCardList } from "@/components/awards/AwardCardList";
import { KudosPromo } from "@/components/home/KudosPromo";
import type { Language } from "@/types";

export default async function AwardsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  const awardDetailDescriptions: Record<string, string> = {
    "top-talent": dictionary.award_detail_top_talent_desc,
    "top-project": dictionary.award_detail_top_project_desc,
    "top-project-leader": dictionary.award_detail_top_project_leader_desc,
    "best-manager": dictionary.award_detail_best_manager_desc,
    "signature-2025-creator": dictionary.award_detail_signature_creator_desc,
    "mvp": dictionary.award_detail_mvp_desc,
  };

  const unitMap: Record<string, string> = {
    "Cá nhân": dictionary.award_unit_individual,
    "Tập thể": dictionary.award_unit_team,
    "Cá nhân hoặc tập thể": dictionary.award_unit_individual_or_team,
  };

  const prizeNoteMap: Record<string, string> = {
    "cho mỗi giải thưởng": dictionary.award_prize_note_each,
    "cho giải cá nhân": dictionary.award_prize_note_individual,
    "cho giải tập thể": dictionary.award_prize_note_team,
  };

  const localizedAwards = AWARD_CATEGORIES_DETAIL.map((award) => ({
    ...award,
    description: awardDetailDescriptions[award.id] ?? award.description,
    unit: unitMap[award.unit] ?? award.unit,
    prizeNote: prizeNoteMap[award.prizeNote] ?? award.prizeNote,
    prizeNoteGroup: award.prizeNoteGroup
      ? (prizeNoteMap[award.prizeNoteGroup] ?? award.prizeNoteGroup)
      : undefined,
  }));

  const sidebarCategories = localizedAwards.map((a) => ({
    id: a.id,
    title: a.title,
  }));

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      <AppHeader currentLanguage={locale} dictionary={dictionary} />

      <main className="flex-1 flex flex-col">
        <HeroBanner
          subtitle={dictionary.awards_page_subtitle}
          title={dictionary.awards_page_title}
        />

        <AwardContent
          sidebar={<AwardSidebar categories={sidebarCategories} />}
        >
          <AwardCardList
            awards={localizedAwards}
            quantityLabel={dictionary.awards_quantity_label}
            prizeLabel={dictionary.awards_prize_label}
            orDivider={dictionary.awards_or_divider}
          />
        </AwardContent>

        <KudosPromo
          label={dictionary.awards_kudos_promo_label}
          title={dictionary.kudos_title}
          highlight={dictionary.kudos_highlight}
          description={dictionary.awards_kudos_promo_description}
          detailLabel={dictionary.awards_kudos_promo_cta}
        />
      </main>

      <AppFooter dictionary={dictionary} />
    </div>
  );
}
