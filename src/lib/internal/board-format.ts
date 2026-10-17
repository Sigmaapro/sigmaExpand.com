import type { AnnouncementPriority, BoardMeeting } from "@/lib/internal/board-types";

export function formatBoardDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatMeetingWhen(meeting: BoardMeeting): string {
  const date = new Date(meeting.starts_at);
  if (Number.isNaN(date.getTime())) return meeting.starts_at;
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: meeting.timezone,
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function priorityLabel(priority: AnnouncementPriority): string {
  if (priority === "high") return "High";
  if (priority === "low") return "Low";
  return "Normal";
}

export function looksLikeUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}
