import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { createClient } from "@/libs/supabase/server";
import { getDictionary } from "@/libs/i18n";
import { EVENT_CONFIG } from "@/libs/data/homepage";
import { PrelaunchCountdownTimer } from "@/components/countdown/PrelaunchCountdownTimer";
import type { Language } from "@/types";

export default async function CountdownPage() {
  // TODO: Re-enable auth check after preview
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   redirect("/login");
  // }

  // 2. Event start time (use a future date for preview if not configured)
  const eventStartTime =
    process.env.NEXT_PUBLIC_EVENT_START_TIME ||
    EVENT_CONFIG.event_start_date ||
    new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(); // Fallback: 5 hours from now
  // TODO: Re-enable event-started redirect after preview
  // const hasStarted = new Date(eventStartTime) <= new Date();
  // if (hasStarted) {
  //   redirect("/");
  // }

  // 3. i18n
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  // 4. Server timestamp for clock drift correction
  const serverNow = Date.now();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg-primary)]">
      {/* Background artwork */}
      <Image
        src="/assets/countdown/background.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0.00) 63.41%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12 md:px-12 md:py-16 lg:px-[144px] lg:py-24 animate-[fadeIn_500ms_ease-in]">
        <PrelaunchCountdownTimer
          targetDate={eventStartTime}
          serverNow={serverNow}
          title={dictionary.countdown_title}
          daysLabel={dictionary.countdown_days}
          hoursLabel={dictionary.countdown_hours}
          minutesLabel={dictionary.countdown_minutes}
          errorMessage={dictionary.countdown_error_message}
          retryLabel={dictionary.countdown_retry}
          eventStartedLabel={dictionary.countdown_event_started}
        />
      </div>
    </div>
  );
}
