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

  const sidebarCategories = AWARD_CATEGORIES_DETAIL.map((a) => ({
    id: a.id,
    title: a.title,
  }));

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)]">
      <AppHeader currentLanguage={locale} />

      <main className="flex-1 flex flex-col">
        <HeroBanner
          subtitle={dictionary.awards_page_subtitle}
          title={dictionary.awards_page_title}
        />

        <AwardContent
          sidebar={<AwardSidebar categories={sidebarCategories} />}
        >
          <AwardCardList
            awards={AWARD_CATEGORIES_DETAIL}
            quantityLabel={dictionary.awards_quantity_label}
            prizeLabel={dictionary.awards_prize_label}
            orDivider={dictionary.awards_or_divider}
          />
        </AwardContent>

        <KudosPromo
          label={dictionary.kudos_label}
          title={dictionary.kudos_title}
          highlight={dictionary.kudos_highlight}
          description={dictionary.kudos_description}
          detailLabel={dictionary.kudos_detail}
        />
      </main>

      <AppFooter />
    </div>
  );
}
