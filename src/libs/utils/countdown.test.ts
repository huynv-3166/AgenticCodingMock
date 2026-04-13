import { describe, it, expect, vi, afterEach } from "vitest";
import { calculateTimeLeft, padTwo } from "./countdown";

describe("padTwo", () => {
  it("pads single digit with leading zero", () => {
    expect(padTwo(0)).toBe("00");
    expect(padTwo(5)).toBe("05");
    expect(padTwo(9)).toBe("09");
  });

  it("returns two-digit numbers as-is", () => {
    expect(padTwo(10)).toBe("10");
    expect(padTwo(23)).toBe("23");
    expect(padTwo(99)).toBe("99");
  });

  it("handles numbers greater than 99", () => {
    expect(padTwo(100)).toBe("100");
    expect(padTwo(365)).toBe("365");
  });
});

describe("calculateTimeLeft", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns correct days, hours, minutes for a future date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-10T00:00:00Z"));

    const result = calculateTimeLeft("2025-11-15T09:00:00Z");

    expect(result.days).toBe(5);
    expect(result.hours).toBe(9);
    expect(result.minutes).toBe(0);
    expect(result.isPassed).toBe(false);
  });

  it("returns zeros with isPassed true for a past date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-20T00:00:00Z"));

    const result = calculateTimeLeft("2025-11-15T09:00:00Z");

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.isPassed).toBe(true);
  });

  it("returns zeros with isPassed true for null date", () => {
    const result = calculateTimeLeft(null);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.isPassed).toBe(true);
  });

  it("returns zeros with isPassed true at exactly the target time", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-15T09:00:00Z"));

    const result = calculateTimeLeft("2025-11-15T09:00:00Z");

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.isPassed).toBe(true);
  });

  it("handles more than 99 days remaining", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));

    const result = calculateTimeLeft("2025-11-15T09:00:00Z");

    expect(result.days).toBeGreaterThan(99);
    expect(result.isPassed).toBe(false);
  });

  it("calculates correctly with clock offset applied", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-11-14T08:00:00Z"));

    // Server is 30 minutes ahead of client
    const offsetMs = 30 * 60 * 1000;
    const result = calculateTimeLeft("2025-11-15T09:00:00Z", offsetMs);

    // Without offset: 25 hours = 1 day + 1 hour
    // With offset (+30min): 24h30m = 1 day + 0 hours + 30 min
    expect(result.days).toBe(1);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(30);
    expect(result.isPassed).toBe(false);
  });
});
