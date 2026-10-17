"use server";

import { revalidatePath } from "next/cache";
import { getAuthenticatedProfile } from "@/lib/internal/profile-query";
import { isBoardAdminRole } from "@/lib/internal/profile-row";
import { wallTimeToUtcIso } from "@/lib/internal/board-timezone";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";
import type {
  AnnouncementInput,
  AnnouncementPriority,
  AnnouncementStatus,
  BoardWriteResult,
  MeetingInput,
  MeetingStatus,
} from "@/lib/internal/board-types";

async function requireBoardAdmin(): Promise<
  { ok: true; userId: string } | { ok: false; error: string }
> {
  const result = await getAuthenticatedProfile();
  if (result.status === "unauthenticated") {
    return { ok: false, error: "Sign in to continue." };
  }
  if (result.status !== "ok") {
    return { ok: false, error: "Could not verify your profile." };
  }
  if (!isBoardAdminRole(result.profile.internal_role)) {
    return { ok: false, error: "You do not have permission to change the team board." };
  }
  return { ok: true, userId: result.user.id };
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asPriority(value: unknown): AnnouncementPriority | null {
  if (value === "high" || value === "normal" || value === "low") return value;
  return null;
}

function asAnnouncementStatus(value: unknown): AnnouncementStatus | null {
  if (value === "draft" || value === "published") return value;
  return null;
}

function asMeetingStatus(value: unknown): MeetingStatus | null {
  if (value === "scheduled" || value === "completed" || value === "cancelled") return value;
  return null;
}

function parseAnnouncementInput(input: AnnouncementInput): AnnouncementInput | null {
  const title = text(input.title);
  const body = text(input.body);
  const priority = asPriority(input.priority);
  const status = asAnnouncementStatus(input.status);
  if (!title || !body || !priority || !status) return null;
  if (title.length > 180 || body.length > 8000) return null;
  return { title, body, priority, status };
}

function parseMeetingInput(input: MeetingInput): MeetingInput | null {
  const title = text(input.title);
  const description = text(input.description);
  const date = text(input.date);
  const time = text(input.time);
  const timezone = text(input.timezone);
  const location_or_url = text(input.location_or_url);
  const status = asMeetingStatus(input.status);
  if (!title || !date || !time || !timezone || !status) return null;
  if (title.length > 180 || description.length > 4000 || location_or_url.length > 500) return null;
  return { title, description, date, time, timezone, location_or_url, status };
}

function failWrite(context: string): BoardWriteResult {
  console.error(`[internal-board] ${context}`);
  return { ok: false, error: "Could not save the team board." };
}

export async function createAnnouncementAction(input: AnnouncementInput): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  const parsed = parseAnnouncementInput(input);
  if (!parsed) return { ok: false, error: "Check the announcement fields and try again." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("board_announcements").insert({
      author_id: gate.userId,
      title: parsed.title,
      body: parsed.body,
      priority: parsed.priority,
      status: parsed.status,
    });
    if (error) return failWrite("announcement insert failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("announcement insert unavailable");
  }
}

export async function updateAnnouncementAction(
  id: string,
  input: AnnouncementInput,
): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  if (typeof id !== "string" || !id) return { ok: false, error: "Could not save the team board." };
  const parsed = parseAnnouncementInput(input);
  if (!parsed) return { ok: false, error: "Check the announcement fields and try again." };

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("board_announcements")
      .update({
        title: parsed.title,
        body: parsed.body,
        priority: parsed.priority,
        status: parsed.status,
      })
      .eq("id", id);
    if (error) return failWrite("announcement update failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("announcement update unavailable");
  }
}

export async function deleteAnnouncementAction(id: string): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  if (typeof id !== "string" || !id) return { ok: false, error: "Could not delete the announcement." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("board_announcements").delete().eq("id", id);
    if (error) return failWrite("announcement delete failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("announcement delete unavailable");
  }
}

export async function createMeetingAction(input: MeetingInput): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  const parsed = parseMeetingInput(input);
  if (!parsed) return { ok: false, error: "Check the meeting fields and try again." };
  const startsAt = wallTimeToUtcIso(parsed.date, parsed.time, parsed.timezone);
  if (!startsAt) return { ok: false, error: "Check the meeting date, time, and timezone." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("board_meetings").insert({
      author_id: gate.userId,
      title: parsed.title,
      description: parsed.description || null,
      starts_at: startsAt,
      timezone: parsed.timezone,
      location_or_url: parsed.location_or_url || null,
      status: parsed.status,
    });
    if (error) return failWrite("meeting insert failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("meeting insert unavailable");
  }
}

export async function updateMeetingAction(id: string, input: MeetingInput): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  if (typeof id !== "string" || !id) return { ok: false, error: "Could not save the team board." };
  const parsed = parseMeetingInput(input);
  if (!parsed) return { ok: false, error: "Check the meeting fields and try again." };
  const startsAt = wallTimeToUtcIso(parsed.date, parsed.time, parsed.timezone);
  if (!startsAt) return { ok: false, error: "Check the meeting date, time, and timezone." };

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("board_meetings")
      .update({
        title: parsed.title,
        description: parsed.description || null,
        starts_at: startsAt,
        timezone: parsed.timezone,
        location_or_url: parsed.location_or_url || null,
        status: parsed.status,
      })
      .eq("id", id);
    if (error) return failWrite("meeting update failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("meeting update unavailable");
  }
}

export async function deleteMeetingAction(id: string): Promise<BoardWriteResult> {
  const gate = await requireBoardAdmin();
  if (!gate.ok) return gate;
  if (typeof id !== "string" || !id) return { ok: false, error: "Could not delete the meeting." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("board_meetings").delete().eq("id", id);
    if (error) return failWrite("meeting delete failed");
    revalidatePath(INTERNAL_ROUTES.sigma);
    return { ok: true };
  } catch {
    return failWrite("meeting delete unavailable");
  }
}
