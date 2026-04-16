"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { GoogleIcon } from "@/components/shared/icons/GoogleIcon";
import { LoadingSpinner } from "@/components/shared/icons/LoadingSpinner";
import type { Dictionary } from "@/libs/i18n";

export function LoginButton({ dictionary }: { dictionary: Dictionary }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setErrorMessage(dictionary.error_login_failed);
    }
  }, [searchParams, dictionary.error_login_failed]);

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(dictionary.error_login_failed);
      setIsLoading(false);
    }
  };


  return (
    <div className="pl-0 md:pl-[var(--spacing-content-left)]">
      <button
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Login with Google"
        aria-busy={isLoading}
        className="flex items-center gap-[var(--spacing-button-icon-gap)] px-[var(--spacing-button-px)] py-[var(--spacing-button-py)] bg-[var(--color-button-bg)] rounded-[var(--radius-button)] cursor-pointer w-full max-w-[305px] lg:w-[305px] h-[60px] transition-all duration-150 ease-in-out hover:bg-[var(--color-button-hover)] hover:-translate-y-px hover:shadow-[var(--shadow-button-hover)] focus:outline-2 focus:outline-[var(--color-button-bg)] focus:outline-offset-2 active:bg-[var(--color-button-active)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        <span className="text-[22px] font-bold leading-7 text-[var(--color-button-text)]">
          {dictionary.login_button}
        </span>
        {isLoading ? (
          <LoadingSpinner className="w-6 h-6 text-[var(--color-button-text)]" />
        ) : (
          <GoogleIcon className="w-6 h-6" />
        )}
      </button>

      {errorMessage && (
        <p className="mt-3 text-sm font-medium text-[var(--color-error)]">
          {errorMessage}
        </p>
      )}

      {/* Dev login — only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 flex flex-col gap-2 max-w-[305px]">
          <p className="text-xs text-white/40 font-bold">DEV LOGIN (local Supabase)</p>
          {[
            { email: "alice@sun-asterisk.com", name: "Alice Nguyen" },
            { email: "bob@sun-asterisk.com", name: "Bob Tran" },
            { email: "charlie@sun-asterisk.com", name: "Charlie Le" },
          ].map((user) => (
            <button
              key={user.email}
              disabled={isLoading}
              onClick={async () => {
                setIsLoading(true);
                setErrorMessage(null);
                const supabase = createClient();
                const { error: err } = await supabase.auth.signInWithPassword({
                  email: user.email,
                  password: "password123",
                });
                if (err) {
                  setErrorMessage(err.message);
                  setIsLoading(false);
                } else {
                  window.location.href = "/";
                }
              }}
              className="h-10 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-bold hover:bg-white/20 disabled:opacity-50 transition-colors text-left"
            >
              {user.name} ({user.email.split("@")[0]})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
