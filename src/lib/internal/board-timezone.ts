import { BOARD_TIMEZONES } from "@/lib/internal/board-types";

type WallParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export function isSupportedTimeZone(value: string): boolean {
  if (!value || typeof value !== "string") return false;
  if ((BOARD_TIMEZONES as readonly string[]).includes(value)) return true;
  try {
    Intl.DateTimeFormat("en-US", { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

function readZonedParts(instant: Date, timeZone: string): WallParts | null {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(instant);

    const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    let hour = Number(map.hour);
    if (hour === 24) hour = 0;

    return {
      year: Number(map.year),
      month: Number(map.month),
      day: Number(map.day),
      hour,
      minute: Number(map.minute),
    };
  } catch {
    return null;
  }
}

/**
 * Interpret a wall-clock date+time in `timeZone` and return a UTC ISO string.
 * Does not use the browser/server local zone.
 */
export function wallTimeToUtcIso(
  date: string,
  time: string,
  timeZone: string,
): string | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  if (!/^\d{2}:\d{2}$/.test(time)) return null;
  if (!isSupportedTimeZone(timeZone)) return null;

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  if (
    year == null ||
    month == null ||
    day == null ||
    hour == null ||
    minute == null ||
    hour > 23 ||
    minute > 59
  ) {
    return null;
  }

  let utcMs = Date.UTC(year, month - 1, day, hour, minute, 0);

  for (let step = 0; step < 4; step += 1) {
    const seen = readZonedParts(new Date(utcMs), timeZone);
    if (!seen) return null;
    const seenAsUtc = Date.UTC(seen.year, seen.month - 1, seen.day, seen.hour, seen.minute, 0);
    const wantedAsUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
    const delta = wantedAsUtc - seenAsUtc;
    if (delta === 0) break;
    utcMs += delta;
  }

  const confirmed = readZonedParts(new Date(utcMs), timeZone);
  if (
    !confirmed ||
    confirmed.year !== year ||
    confirmed.month !== month ||
    confirmed.day !== day ||
    confirmed.hour !== hour ||
    confirmed.minute !== minute
  ) {
    return null;
  }

  return new Date(utcMs).toISOString();
}

export function utcIsoToWallTime(
  iso: string,
  timeZone: string,
): { date: string; time: string } | null {
  const instant = new Date(iso);
  if (Number.isNaN(instant.getTime())) return null;
  const parts = readZonedParts(instant, timeZone);
  if (!parts) return null;
  const date = `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
  const time = `${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
  return { date, time };
}
