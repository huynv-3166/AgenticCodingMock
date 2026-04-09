import type { Language } from "@/types";

import vi from "./dictionaries/vi.json";
import en from "./dictionaries/en.json";
import ja from "./dictionaries/ja.json";

export type Dictionary = typeof vi;

const dictionaries: Record<Language, Dictionary> = { vi, en, ja };

export function getDictionary(locale: Language): Dictionary {
  return dictionaries[locale] ?? dictionaries.vi;
}
