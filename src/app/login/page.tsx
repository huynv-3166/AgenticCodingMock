import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/libs/supabase/server";
import { getDictionary } from "@/libs/i18n";
import { BackgroundLayers } from "@/components/login/BackgroundLayers";
import { LoginHero } from "@/components/login/LoginHero";
import { LoginButton } from "@/components/login/LoginButton";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import type { Language } from "@/types";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "vi") as Language;
  const dictionary = getDictionary(locale);

  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--color-bg-primary)] overflow-x-hidden">
      {/* Background layers */}
      <BackgroundLayers />

      {/* Header */}
      <Header currentLanguage={locale} />

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 py-12 md:px-12 md:py-16 lg:px-[var(--spacing-hero-px)] lg:py-[var(--spacing-hero-py)] mt-16 md:mt-[80px]">
        <div className="flex flex-col gap-6 lg:gap-[var(--spacing-content-gap)]">
          <LoginHero dictionary={dictionary} />
          <LoginButton dictionary={dictionary} />
        </div>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer dictionary={dictionary} />
      </div>
    </div>
  );
}
