export type Language = "vi" | "en" | "ja";

export const LANGUAGES: readonly Language[] = ["vi", "en", "ja"] as const;

export const LANGUAGE_LABELS: Record<Language, string> = {
  vi: "VN",
  en: "EN",
  ja: "JA",
};

export const DEFAULT_LANGUAGE: Language = "vi";

export type AwardCategory = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  slug: string;
  display_order: number;
};

export type EventConfig = {
  event_start_date: string;
  event_date_display: string;
  event_location: string;
  livestream_info: string;
};

export type AwardDetail = {
  id: string;
  title: string;
  description: string;
  image: string;
  quantity: number;
  unit: string;
  prizeValue: string;
  prizeNote: string;
  prizeValueGroup?: string;
  prizeNoteGroup?: string;
};
