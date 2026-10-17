"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  GlassButton,
  GlassChip,
  GlassField,
  GlassSelect,
  GlassSurface,
  GlassTextarea,
} from "@/components/internal/glass/Glass";
import {
  createAnnouncementAction,
  createMeetingAction,
  deleteAnnouncementAction,
  deleteMeetingAction,
  updateAnnouncementAction,
  updateMeetingAction,
} from "@/lib/internal/board-actions";
import {
  formatBoardDate,
  formatMeetingWhen,
  looksLikeUrl,
  priorityLabel,
} from "@/lib/internal/board-format";
import { nextUpcomingMeeting } from "@/lib/internal/board-sort";
import { utcIsoToWallTime } from "@/lib/internal/board-timezone";
import type {
  AnnouncementInput,
  BoardAnnouncement,
  BoardMeeting,
  MeetingInput,
} from "@/lib/internal/board-types";
import { BOARD_TIMEZONES } from "@/lib/internal/board-types";
import { cn } from "@/lib/utils";

type Panel =
  | { type: "announcement"; id: string | null }
  | { type: "meeting"; id: string | null }
  | null;

type PendingDelete =
  | { kind: "announcement"; id: string }
  | { kind: "meeting"; id: string }
  | null;

const EMPTY_ANNOUNCEMENT: AnnouncementInput = {
  title: "",
  body: "",
  priority: "normal",
  status: "published",
};

const EMPTY_MEETING: MeetingInput = {
  title: "",
  description: "",
  date: "",
  time: "",
  timezone: "Asia/Dubai",
  location_or_url: "",
  status: "scheduled",
};

function announcementToInput(row: BoardAnnouncement): AnnouncementInput {
  return {
    title: row.title,
    body: row.body,
    priority: row.priority,
    status: row.status,
  };
}

function meetingToInput(row: BoardMeeting): MeetingInput {
  const wall = utcIsoToWallTime(row.starts_at, row.timezone);
  return {
    title: row.title,
    description: row.description ?? "",
    date: wall?.date ?? "",
    time: wall?.time ?? "",
    timezone: row.timezone,
    location_or_url: row.location_or_url ?? "",
    status: row.status,
  };
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="internal-board-field-label">
      {children}
    </label>
  );
}

export function SigmaTeamBoard({
  isAdmin,
  announcements,
  meetings,
  loadError,
}: {
  isAdmin: boolean;
  announcements: BoardAnnouncement[];
  meetings: BoardMeeting[];
  loadError: boolean;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [announcementDraft, setAnnouncementDraft] = useState<AnnouncementInput>(EMPTY_ANNOUNCEMENT);
  const [meetingDraft, setMeetingDraft] = useState<MeetingInput>(EMPTY_MEETING);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextMeeting = useMemo(() => nextUpcomingMeeting(meetings), [meetings]);
  const visibleAnnouncements = isAdmin
    ? announcements
    : announcements.filter((item) => item.status === "published");
  const timezoneOptions =
    meetingDraft.timezone &&
    !(BOARD_TIMEZONES as readonly string[]).includes(meetingDraft.timezone)
      ? [meetingDraft.timezone, ...BOARD_TIMEZONES]
      : [...BOARD_TIMEZONES];

  function openNewAnnouncement() {
    setError(null);
    setPendingDelete(null);
    setAnnouncementDraft(EMPTY_ANNOUNCEMENT);
    setPanel({ type: "announcement", id: null });
  }

  function openEditAnnouncement(row: BoardAnnouncement) {
    setError(null);
    setPendingDelete(null);
    setAnnouncementDraft(announcementToInput(row));
    setPanel({ type: "announcement", id: row.id });
  }

  function openNewMeeting() {
    setError(null);
    setPendingDelete(null);
    setMeetingDraft(EMPTY_MEETING);
    setPanel({ type: "meeting", id: null });
  }

  function openEditMeeting(row: BoardMeeting) {
    setError(null);
    setPendingDelete(null);
    setMeetingDraft(meetingToInput(row));
    setPanel({ type: "meeting", id: row.id });
  }

  async function submitAnnouncement() {
    setSaving(true);
    setError(null);
    const result = panel?.type === "announcement" && panel.id
      ? await updateAnnouncementAction(panel.id, announcementDraft)
      : await createAnnouncementAction(announcementDraft);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPanel(null);
    router.refresh();
  }

  async function submitMeeting() {
    setSaving(true);
    setError(null);
    const result = panel?.type === "meeting" && panel.id
      ? await updateMeetingAction(panel.id, meetingDraft)
      : await createMeetingAction(meetingDraft);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPanel(null);
    router.refresh();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setSaving(true);
    setError(null);
    const result =
      pendingDelete.kind === "announcement"
        ? await deleteAnnouncementAction(pendingDelete.id)
        : await deleteMeetingAction(pendingDelete.id);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPendingDelete(null);
    setPanel(null);
    router.refresh();
  }

  return (
    <section className="internal-board internal-profile-enter" aria-label="SIGMA team board">
      <header className="internal-board-header">
        <p className="internal-board-kicker font-display">SIGMA</p>
        <h1 className="internal-board-title font-display">Team Board</h1>
      </header>

      {isAdmin ? (
        <div className="internal-board-actions">
          <GlassButton type="button" onClick={openNewAnnouncement}>
            + New announcement
          </GlassButton>
          <GlassButton type="button" variant="secondary" onClick={openNewMeeting}>
            + Schedule meeting
          </GlassButton>
        </div>
      ) : null}

      {error ? <p className="internal-board-error">{error}</p> : null}

      {panel?.type === "announcement" ? (
        <GlassSurface className="internal-board-card">
          <p className="internal-board-section-title font-display">
            {panel.id ? "Edit announcement" : "New announcement"}
          </p>
          <form
            className="internal-board-form"
            onSubmit={(event) => {
              event.preventDefault();
              void submitAnnouncement();
            }}
          >
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-announcement-title">Title</FieldLabel>
              <GlassField
                id="board-announcement-title"
                value={announcementDraft.title}
                onChange={(event) =>
                  setAnnouncementDraft((current) => ({ ...current, title: event.target.value }))
                }
                required
              />
            </div>
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-announcement-body">Body</FieldLabel>
              <GlassTextarea
                id="board-announcement-body"
                rows={6}
                value={announcementDraft.body}
                onChange={(event) =>
                  setAnnouncementDraft((current) => ({ ...current, body: event.target.value }))
                }
                required
              />
            </div>
            <div className="internal-board-field-grid">
              <div className="internal-board-field">
                <FieldLabel htmlFor="board-announcement-priority">Priority</FieldLabel>
                <GlassSelect
                  id="board-announcement-priority"
                  value={announcementDraft.priority}
                  onChange={(event) =>
                    setAnnouncementDraft((current) => ({
                      ...current,
                      priority: event.target.value as AnnouncementInput["priority"],
                    }))
                  }
                >
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </GlassSelect>
              </div>
              <div className="internal-board-field">
                <FieldLabel htmlFor="board-announcement-status">Status</FieldLabel>
                <GlassSelect
                  id="board-announcement-status"
                  value={announcementDraft.status}
                  onChange={(event) =>
                    setAnnouncementDraft((current) => ({
                      ...current,
                      status: event.target.value as AnnouncementInput["status"],
                    }))
                  }
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </GlassSelect>
              </div>
            </div>
            <div className="internal-board-card-actions">
              <GlassButton type="submit" disabled={saving}>
                {saving ? "Saving" : panel.id ? "Save announcement" : "Post announcement"}
              </GlassButton>
              <GlassButton type="button" variant="secondary" disabled={saving} onClick={() => setPanel(null)}>
                Cancel
              </GlassButton>
            </div>
          </form>
        </GlassSurface>
      ) : null}

      {panel?.type === "meeting" ? (
        <GlassSurface className="internal-board-card">
          <p className="internal-board-section-title font-display">
            {panel.id ? "Edit meeting" : "Schedule meeting"}
          </p>
          <form
            className="internal-board-form"
            onSubmit={(event) => {
              event.preventDefault();
              void submitMeeting();
            }}
          >
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-meeting-title">Title</FieldLabel>
              <GlassField
                id="board-meeting-title"
                value={meetingDraft.title}
                onChange={(event) =>
                  setMeetingDraft((current) => ({ ...current, title: event.target.value }))
                }
                required
              />
            </div>
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-meeting-description">Description</FieldLabel>
              <GlassTextarea
                id="board-meeting-description"
                rows={4}
                value={meetingDraft.description}
                onChange={(event) =>
                  setMeetingDraft((current) => ({ ...current, description: event.target.value }))
                }
              />
            </div>
            <div className="internal-board-field-grid">
              <div className="internal-board-field">
                <FieldLabel htmlFor="board-meeting-date">Date</FieldLabel>
                <GlassField
                  id="board-meeting-date"
                  type="date"
                  value={meetingDraft.date}
                  onChange={(event) =>
                    setMeetingDraft((current) => ({ ...current, date: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="internal-board-field">
                <FieldLabel htmlFor="board-meeting-time">Time</FieldLabel>
                <GlassField
                  id="board-meeting-time"
                  type="time"
                  value={meetingDraft.time}
                  onChange={(event) =>
                    setMeetingDraft((current) => ({ ...current, time: event.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-meeting-timezone">Timezone</FieldLabel>
              <GlassSelect
                id="board-meeting-timezone"
                value={meetingDraft.timezone}
                onChange={(event) =>
                  setMeetingDraft((current) => ({ ...current, timezone: event.target.value }))
                }
              >
                {timezoneOptions.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace(/_/g, " ")}
                  </option>
                ))}
              </GlassSelect>
            </div>
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-meeting-location">Location / Meeting URL</FieldLabel>
              <GlassField
                id="board-meeting-location"
                value={meetingDraft.location_or_url}
                onChange={(event) =>
                  setMeetingDraft((current) => ({ ...current, location_or_url: event.target.value }))
                }
              />
            </div>
            <div className="internal-board-field">
              <FieldLabel htmlFor="board-meeting-status">Status</FieldLabel>
              <GlassSelect
                id="board-meeting-status"
                value={meetingDraft.status}
                onChange={(event) =>
                  setMeetingDraft((current) => ({
                    ...current,
                    status: event.target.value as MeetingInput["status"],
                  }))
                }
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </GlassSelect>
            </div>
            <div className="internal-board-card-actions">
              <GlassButton type="submit" disabled={saving}>
                {saving ? "Saving" : panel.id ? "Save meeting" : "Schedule meeting"}
              </GlassButton>
              <GlassButton type="button" variant="secondary" disabled={saving} onClick={() => setPanel(null)}>
                Cancel
              </GlassButton>
            </div>
          </form>
        </GlassSurface>
      ) : null}

      <section className="internal-board-section">
        <h2 className="internal-board-section-title font-display">Next meeting</h2>
        {loadError ? (
          <GlassSurface className="internal-board-card">
            <p className="internal-board-empty">Could not load the team board.</p>
          </GlassSurface>
        ) : nextMeeting ? (
          <MeetingCard
            meeting={nextMeeting}
            isAdmin={isAdmin}
            pendingDelete={pendingDelete}
            saving={saving}
            onEdit={openEditMeeting}
            onAskDelete={(id) => setPendingDelete({ kind: "meeting", id })}
            onCancelDelete={() => setPendingDelete(null)}
            onConfirmDelete={() => void confirmDelete()}
          />
        ) : (
          <GlassSurface className="internal-board-card">
            <p className="internal-board-empty">No upcoming meeting scheduled.</p>
          </GlassSurface>
        )}
      </section>

      <section className="internal-board-section">
        <h2 className="internal-board-section-title font-display">Announcements</h2>
        {loadError ? (
          <GlassSurface className="internal-board-card">
            <p className="internal-board-empty">Could not load announcements.</p>
          </GlassSurface>
        ) : visibleAnnouncements.length === 0 ? (
          <GlassSurface className="internal-board-card">
            <p className="internal-board-empty">No announcements yet.</p>
          </GlassSurface>
        ) : (
          visibleAnnouncements.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              isAdmin={isAdmin}
              pendingDelete={pendingDelete}
              saving={saving}
              onEdit={openEditAnnouncement}
              onAskDelete={(id) => setPendingDelete({ kind: "announcement", id })}
              onCancelDelete={() => setPendingDelete(null)}
              onConfirmDelete={() => void confirmDelete()}
            />
          ))
        )}
      </section>

      {meetings.some((meeting) => meeting.id !== nextMeeting?.id) ? (
        <section className="internal-board-section">
          <h2 className="internal-board-section-title font-display">Meetings</h2>
          {meetings
            .filter((meeting) => meeting.id !== nextMeeting?.id)
            .map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                isAdmin={isAdmin}
                pendingDelete={pendingDelete}
                saving={saving}
                onEdit={openEditMeeting}
                onAskDelete={(id) => setPendingDelete({ kind: "meeting", id })}
                onCancelDelete={() => setPendingDelete(null)}
                onConfirmDelete={() => void confirmDelete()}
              />
            ))}
        </section>
      ) : null}
    </section>
  );
}

function AnnouncementCard({
  announcement,
  isAdmin,
  pendingDelete,
  saving,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  announcement: BoardAnnouncement;
  isAdmin: boolean;
  pendingDelete: PendingDelete;
  saving: boolean;
  onEdit: (row: BoardAnnouncement) => void;
  onAskDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  const updated =
    Date.parse(announcement.updated_at) - Date.parse(announcement.created_at) > 60_000;

  return (
    <GlassSurface className="internal-board-card">
      <div className="internal-board-chip-row">
        <GlassChip>{priorityLabel(announcement.priority)}</GlassChip>
        {announcement.status === "draft" ? <GlassChip>Draft</GlassChip> : null}
      </div>
      <h3 className="internal-board-card-title font-display">{announcement.title}</h3>
      <p className="internal-board-card-body">{announcement.body}</p>
      <p className="internal-board-meta">
        {formatBoardDate(announcement.created_at)}
        {updated ? ` · Updated ${formatBoardDate(announcement.updated_at)}` : ""}
      </p>
      {isAdmin ? (
        <AdminRow
          pending={pendingDelete?.kind === "announcement" && pendingDelete.id === announcement.id}
          confirmLabel="Delete announcement?"
          saving={saving}
          onEdit={() => onEdit(announcement)}
          onAskDelete={() => onAskDelete(announcement.id)}
          onCancelDelete={onCancelDelete}
          onConfirmDelete={onConfirmDelete}
        />
      ) : null}
    </GlassSurface>
  );
}

function MeetingCard({
  meeting,
  isAdmin,
  pendingDelete,
  saving,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  meeting: BoardMeeting;
  isAdmin: boolean;
  pendingDelete: PendingDelete;
  saving: boolean;
  onEdit: (row: BoardMeeting) => void;
  onAskDelete: (id: string) => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  const location = meeting.location_or_url?.trim() ?? "";
  const muted = meeting.status === "cancelled" || meeting.status === "completed";

  return (
    <GlassSurface className={cn("internal-board-card", muted && "internal-board-muted")}>
      {meeting.status !== "scheduled" ? (
        <div className="internal-board-chip-row">
          <GlassChip>{meeting.status === "completed" ? "Completed" : "Cancelled"}</GlassChip>
        </div>
      ) : null}
      <h3 className="internal-board-card-title font-display">{meeting.title}</h3>
      <p className="internal-board-meta">
        {formatMeetingWhen(meeting)} · {meeting.timezone.replace(/_/g, " ")}
      </p>
      {location ? (
        looksLikeUrl(location) ? (
          <a className="internal-board-link mt-2 text-[14.5px]" href={location} target="_blank" rel="noreferrer">
            {location}
          </a>
        ) : (
          <p className="internal-board-card-body">{location}</p>
        )
      ) : null}
      {meeting.description ? <p className="internal-board-card-body">{meeting.description}</p> : null}
      {isAdmin ? (
        <AdminRow
          pending={pendingDelete?.kind === "meeting" && pendingDelete.id === meeting.id}
          confirmLabel="Delete meeting?"
          saving={saving}
          onEdit={() => onEdit(meeting)}
          onAskDelete={() => onAskDelete(meeting.id)}
          onCancelDelete={onCancelDelete}
          onConfirmDelete={onConfirmDelete}
        />
      ) : null}
    </GlassSurface>
  );
}

function AdminRow({
  pending,
  confirmLabel,
  saving,
  onEdit,
  onAskDelete,
  onCancelDelete,
  onConfirmDelete,
}: {
  pending: boolean;
  confirmLabel: string;
  saving: boolean;
  onEdit: () => void;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  if (pending) {
    return (
      <div className="internal-board-confirm mt-4">
        <p className="internal-board-empty">{confirmLabel}</p>
        <div className="internal-board-card-actions">
          <GlassButton type="button" disabled={saving} onClick={onConfirmDelete}>
            {saving ? "Deleting" : "Delete"}
          </GlassButton>
          <GlassButton type="button" variant="secondary" disabled={saving} onClick={onCancelDelete}>
            Cancel
          </GlassButton>
        </div>
      </div>
    );
  }

  return (
    <div className="internal-board-card-actions mt-4">
      <GlassButton type="button" variant="secondary" onClick={onEdit}>
        Edit
      </GlassButton>
      <GlassButton type="button" variant="secondary" onClick={onAskDelete}>
        Delete
      </GlassButton>
    </div>
  );
}
