export function formatLeadDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatLeadDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function activityLabel(type: string, _metadata: Record<string, unknown>): string {
  if (type === "lead_created") return "Lead created";
  if (type === "lead_claimed" || type === "owner_claimed") return "Lead claimed";
  if (type === "owner_changed") return "Owner changed";
  if (type === "owner_released") return "Owner released";
  if (type === "note_added") return "Note added";
  if (type === "note_updated") return "Note updated";
  if (type === "identity_attached") return "Identity attached";
  if (type === "identity_updated") return "Identity updated";
  if (type === "lead_archived") return "Lead archived";
  if (type === "lead_merged") return "Lead merged";
  if (type === "lead_status_changed" || type === "status_changed") return "Status changed";
  const human = type.replaceAll("_", " ").trim();
  return human || "Activity";
}

export function activityDetail(type: string, metadata: Record<string, unknown>): string | null {
  if (type === "lead_status_changed" || type === "lead_archived") {
    const from = typeof metadata.from_status === "string" ? metadata.from_status : "";
    const to = typeof metadata.to_status === "string" ? metadata.to_status : "";
    if (from && to) return `${from} → ${to}`;
  }
  if (type === "identity_attached" || type === "identity_updated") {
    const source = typeof metadata.source === "string" ? metadata.source : "";
    const handle = typeof metadata.handle === "string" ? metadata.handle : "";
    const line = [source, handle].filter(Boolean).join(" · ");
    return line || null;
  }
  return null;
}

export function safeHttpUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function activityClock(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function activityDayLabel(iso: string, now = new Date()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Earlier";
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  const diff = Math.round((start.getTime() - day.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return formatLeadDate(iso);
}

/**
 * Stale is derived from inactivity. It is not a lead status.
 * No business threshold is defined yet, so callers must pass the day count.
 * A non-positive threshold never marks a lead stale.
 */
export function isLeadStale(lastActivityAt: string, thresholdDays: number, now = new Date()): boolean {
  if (!Number.isFinite(thresholdDays) || thresholdDays <= 0) return false;
  const then = new Date(lastActivityAt).getTime();
  if (Number.isNaN(then)) return false;
  return now.getTime() - then >= thresholdDays * 86_400_000;
}

export function pageCount(total: number, pageSize: number): number {
  if (total <= 0) return 1;
  return Math.ceil(total / pageSize);
}
