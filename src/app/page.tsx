import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/libs/supabase/server";
import { getDictionary } from "@/libs/i18n";
import { AWARD_CATEGORIES, EVENT_CONFIG } from "@/libs/data/homepage";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { HeroSection } from "@/components/home/HeroSection";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { EventInfo } from "@/components/home/EventInfo";
import { HeroCTA } from "@/components/home/HeroCTA";
import { RootFurtherContent } from "@/components/home/RootFurtherContent";
import { AwardSectionHeader } from "@/components/home/AwardSectionHeader";
import { AwardGrid } from "@/components/home/AwardGrid";
import { KudosPromo } from "@/components/home/KudosPromo";
import { FloatingActionButton } from "@/components/home/FloatingActionButton";
import type { Language } from "@/types";

export default async function HomePage() {
  // TODO: Re-enable auth check after preview
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   redirect("/login");
  // }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  const targetDate = EVENT_CONFIG.event_start_date || null;

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)] overflow-x-hidden">
      <AppHeader currentLanguage={locale} />

      <main className="flex-1 flex flex-col gap-[var(--spacing-section-gap)]">
        <HeroSection>
          <CountdownTimer
            targetDate={targetDate}
            comingSoonLabel={dictionary.coming_soon}
            daysLabel={dictionary.countdown_days}
            hoursLabel={dictionary.countdown_hours}
            minutesLabel={dictionary.countdown_minutes}
          />
          <EventInfo
            dateDisplay={EVENT_CONFIG.event_date_display}
            location={EVENT_CONFIG.event_location}
            livestreamInfo={EVENT_CONFIG.livestream_info}
            timeLabel={dictionary.event_time_label}
            locationLabel={dictionary.event_location_label}
          />
          <HeroCTA
            aboutAwardsLabel={dictionary.cta_about_awards}
            aboutKudosLabel={dictionary.cta_about_kudos}
          />
        </HeroSection>

        <RootFurtherContent />

        <section className="w-full max-w-[1224px] mx-auto px-4 md:px-12 lg:px-[var(--spacing-hero-px)] flex flex-col gap-20">
          <AwardSectionHeader
            caption={dictionary.awards_caption}
            title={dictionary.awards_title}
            subtitle={dictionary.awards_subtitle}
          />
          <AwardGrid
            awards={AWARD_CATEGORIES}
            detailLabel={dictionary.awards_detail_link}
            emptyMessage={dictionary.awards_empty}
          />
        </section>

        <KudosPromo
          label={dictionary.kudos_label}
          title={dictionary.kudos_title}
          highlight={dictionary.kudos_highlight}
          description={dictionary.kudos_description}
          detailLabel={dictionary.kudos_detail}
        />
      </main>

      <AppFooter />
      <FloatingActionButton />
    </div>
  );
}
