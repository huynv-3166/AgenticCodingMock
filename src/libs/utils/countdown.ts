export function calculateTimeLeft(
  targetDate: string | null,
  clockOffsetMs: number = 0
): {
  days: number;
  hours: number;
  minutes: number;
  isPassed: boolean;
} {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, isPassed: true };
  }

  const target = new Date(targetDate).getTime();
  const now = Date.now() + clockOffsetMs;
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isPassed: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes, isPassed: false };
}

export function padTwo(n: number): string {
  return n.toString().padStart(2, "0");
}
