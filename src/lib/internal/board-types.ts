export type AnnouncementPriority = "low" | "normal" | "high";
export type AnnouncementStatus = "draft" | "published";
export type MeetingStatus = "scheduled" | "completed" | "cancelled";

export type BoardAnnouncement = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  created_at: string;
  updated_at: string;
};

export type BoardMeeting = {
  id: string;
  author_id: string;
  title: string;
  description: string | null;
  starts_at: string;
  timezone: string;
  location_or_url: string | null;
  status: MeetingStatus;
  created_at: string;
  updated_at: string;
};

export type BoardLoad =
  | {
      status: "ok";
      announcements: BoardAnnouncement[];
      meetings: BoardMeeting[];
    }
  | { status: "error" };

export type BoardWriteResult =
  | { ok: true }
  | { ok: false; error: string };

export type AnnouncementInput = {
  title: string;
  body: string;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
};

export type MeetingInput = {
  title: string;
  description: string;
  date: string;
  time: string;
  timezone: string;
  location_or_url: string;
  status: MeetingStatus;
};

export const BOARD_TIMEZONES = [
  "Asia/Dubai",
  "UTC",
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Tehran",
  "Asia/Singapore",
] as const;
