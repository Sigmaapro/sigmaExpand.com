import { cache } from "react";
import type {
  AnnouncementPriority,
  AnnouncementStatus,
  BoardAnnouncement,
  BoardLoad,
  BoardMeeting,
  MeetingStatus,
} from "@/lib/internal/board-types";
import { sortAnnouncements, sortMeetings } from "@/lib/internal/board-sort";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { createClient } from "@/lib/supabase/server";

const ANNOUNCEMENT_COLUMNS =
  "id, author_id, title, body, priority, status, created_at, updated_at";
const MEETING_COLUMNS =
  "id, author_id, title, description, starts_at, timezone, location_or_url, status, created_at, updated_at";

function asPriority(value: unknown): AnnouncementPriority {
  if (value === "high" || value === "low" || value === "normal") return value;
  return "normal";
}

function asAnnouncementStatus(value: unknown): AnnouncementStatus {
  if (value === "draft" || value === "published") return value;
  return "published";
}

function asMeetingStatus(value: unknown): MeetingStatus {
  if (value === "scheduled" || value === "completed" || value === "cancelled") return value;
  return "scheduled";
}

function parseAnnouncement(value: unknown): BoardAnnouncement | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.author_id !== "string") return null;
  if (typeof row.title !== "string" || typeof row.body !== "string") return null;
  if (typeof row.created_at !== "string" || typeof row.updated_at !== "string") return null;
  return {
    id: row.id,
    author_id: row.author_id,
    title: row.title,
    body: row.body,
    priority: asPriority(row.priority),
    status: asAnnouncementStatus(row.status),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function parseMeeting(value: unknown): BoardMeeting | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.author_id !== "string") return null;
  if (typeof row.title !== "string" || typeof row.starts_at !== "string") return null;
  if (typeof row.timezone !== "string") return null;
  if (typeof row.created_at !== "string" || typeof row.updated_at !== "string") return null;
  return {
    id: row.id,
    author_id: row.author_id,
    title: row.title,
    description: typeof row.description === "string" ? row.description : null,
    starts_at: row.starts_at,
    timezone: row.timezone,
    location_or_url: typeof row.location_or_url === "string" ? row.location_or_url : null,
    status: asMeetingStatus(row.status),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * Load board rows the signed-in user is allowed to see.
 * RLS is the row filter; this only sorts for display.
 */
export const getTeamBoard = cache(async (): Promise<BoardLoad> => {
  try {
    const user = await getInternalAuthUser();
    if (!user) return { status: "error" };

    const supabase = await createClient();
    const [announcementsResult, meetingsResult] = await Promise.all([
      supabase.from("board_announcements").select(ANNOUNCEMENT_COLUMNS),
      supabase.from("board_meetings").select(MEETING_COLUMNS),
    ]);

    if (announcementsResult.error || meetingsResult.error) {
      console.error("[internal-board] load failed");
      return { status: "error" };
    }

    const announcements = (announcementsResult.data ?? [])
      .map(parseAnnouncement)
      .filter((row): row is BoardAnnouncement => Boolean(row));
    const meetings = (meetingsResult.data ?? [])
      .map(parseMeeting)
      .filter((row): row is BoardMeeting => Boolean(row));

    return {
      status: "ok",
      announcements: sortAnnouncements(announcements),
      meetings: sortMeetings(meetings),
    };
  } catch {
    console.error("[internal-board] load unavailable");
    return { status: "error" };
  }
});
