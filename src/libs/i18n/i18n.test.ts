import { describe, it, expect } from "vitest";
import { getDictionary } from "./index";
import type { Language } from "@/types";

import vi from "./dictionaries/vi.json";
import en from "./dictionaries/en.json";
import ja from "./dictionaries/ja.json";

// T024: All 3 dictionaries have identical key sets
describe("i18n dictionary parity", () => {
  const viKeys = Object.keys(vi).sort();
  const enKeys = Object.keys(en).sort();
  const jaKeys = Object.keys(ja).sort();

  it("en.json has the same keys as vi.json", () => {
    const missingInEn = viKeys.filter((k) => !enKeys.includes(k));
    const extraInEn = enKeys.filter((k) => !viKeys.includes(k));
    expect(missingInEn).toEqual([]);
    expect(extraInEn).toEqual([]);
  });

  it("ja.json has the same keys as vi.json", () => {
    const missingInJa = viKeys.filter((k) => !jaKeys.includes(k));
    const extraInJa = jaKeys.filter((k) => !viKeys.includes(k));
    expect(missingInJa).toEqual([]);
    expect(extraInJa).toEqual([]);
  });

  it("no dictionary has empty string values", () => {
    const emptyVi = viKeys.filter((k) => vi[k as keyof typeof vi] === "");
    const emptyEn = enKeys.filter((k) => en[k as keyof typeof en] === "");
    const emptyJa = jaKeys.filter((k) => ja[k as keyof typeof ja] === "");
    expect(emptyVi).toEqual([]);
    expect(emptyEn).toEqual([]);
    expect(emptyJa).toEqual([]);
  });
});

// T025: getDictionary returns correct dictionary for each locale
describe("getDictionary", () => {
  it("returns Vietnamese dictionary for 'vi'", () => {
    const dict = getDictionary("vi");
    expect(dict.countdown_title).toBe("Sự kiện sẽ bắt đầu sau");
  });

  it("returns English dictionary for 'en'", () => {
    const dict = getDictionary("en");
    expect(dict.countdown_title).toBe("Event will start in");
  });

  it("returns Japanese dictionary for 'ja'", () => {
    const dict = getDictionary("ja");
    expect(dict.countdown_title).toBe("イベント開始まで");
  });
});

// T026: Falls back to Vietnamese for unsupported locale
describe("getDictionary fallback", () => {
  it("returns Vietnamese dictionary for unsupported locale", () => {
    const dict = getDictionary("fr" as Language);
    expect(dict.countdown_title).toBe("Sự kiện sẽ bắt đầu sau");
  });
});
