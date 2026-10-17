import type { AnnouncementPriority, BoardAnnouncement, BoardMeeting } from "@/lib/internal/board-types";

const PRIORITY_RANK: Record<AnnouncementPriority, number> = {
  high: 0,
  normal: 1,
  low: 2,
};

export function sortAnnouncements(items: BoardAnnouncement[]): BoardAnnouncement[] {
  return [...items].sort((a, b) => {
    const rank = PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
    if (rank !== 0) return rank;
    return Date.parse(b.created_at) - Date.parse(a.created_at);
  });
}

export function sortMeetings(items: BoardMeeting[], nowMs = Date.now()): BoardMeeting[] {
  const bucket = (meeting: BoardMeeting) => {
    const start = Date.parse(meeting.starts_at);
    if (meeting.status === "scheduled" && start >= nowMs) return 0;
    if (meeting.status === "scheduled") return 1;
    if (meeting.status === "completed") return 2;
    return 3;
  };

  return [...items].sort((a, b) => {
    const bucketDiff = bucket(a) - bucket(b);
    if (bucketDiff !== 0) return bucketDiff;
    const aStart = Date.parse(a.starts_at);
    const bStart = Date.parse(b.starts_at);
    if (bucket(a) === 0) return aStart - bStart;
    return bStart - aStart;
  });
}

export function nextUpcomingMeeting(
  items: BoardMeeting[],
  nowMs = Date.now(),
): BoardMeeting | null {
  return (
    sortMeetings(items, nowMs).find((meeting) => {
      return meeting.status === "scheduled" && Date.parse(meeting.starts_at) >= nowMs;
    }) ?? null
  );
}
