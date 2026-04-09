export type Language = "vi" | "en" | "ja";

export const LANGUAGES: readonly Language[] = ["vi", "en", "ja"] as const;

export const LANGUAGE_LABELS: Record<Language, string> = {
  vi: "VN",
  en: "EN",
  ja: "JA",
};

export const DEFAULT_LANGUAGE: Language = "vi";
