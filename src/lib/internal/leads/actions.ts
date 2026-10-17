"use server";

import { revalidatePath } from "next/cache";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { authorize } from "@/lib/internal/leads-auth";
import {
  EXACT_DUPLICATE_ERROR,
  findPossibleDuplicates,
  markKeptSeparate,
  placeholderLeadId,
  stagePendingCandidates,
} from "@/lib/internal/leads/duplicates";
import type {
  AttachIdentityInput,
  CreateLeadInput,
  CreateLeadResult,
  IdentityMutationResult,
  LeadsMutationResult,
  MergeIdentitySummary,
  MergeLeadPreview,
  MergePreview,
} from "@/lib/internal/leads/types";
import { isUuid, validateAttachIdentity, validateCreateLead, validateNoteBody } from "@/lib/internal/leads/validation";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

function denied(error = "You do not have permission to change this Lead."): LeadsMutationResult {
  return { ok: false, error, code: "forbidden" };
}

function failed(): LeadsMutationResult {
  return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
}

function isUniqueViolation(error: { code?: string }): boolean {
  return error.code === "23505";
}

async function recordActivity(
  leadId: string,
  userId: string,
  activityType: string,
  metadata: Record<string, string>,
): Promise<void> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("lead_activities").insert({
      lead_id: leadId,
      actor_user_id: userId,
      activity_type: activityType,
      metadata,
    });
    if (error) console.error("[leads] activity was not recorded");
  } catch {
    console.error("[leads] activity was not recorded");
  }
}

async function requireUser(): Promise<
  { ok: true; userId: string } | { ok: false; error: string; code: "forbidden" }
> {
  const user = await getInternalAuthUser();
  if (!user) return { ok: false, error: "Sign in to continue.", code: "forbidden" };
  return { ok: true, userId: user.id };
}

export async function claimLeadAction(leadId: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };

  const [canWrite, canClaim, canRead] = await Promise.all([
    authorize("leads.write"),
    authorize("leads.claim"),
    authorize("leads.read"),
  ]);
  if (!canRead || !canWrite || !canClaim) return denied("You cannot claim this Lead.");

  try {
    const supabase = await createClient();
    const { data: existing, error: readError } = await supabase
      .from("leads")
      .select("id, owner_user_id, merged_into_lead_id, archived_at")
      .eq("id", leadId)
      .maybeSingle();

    if (readError) {
      console.error("[leads] claim read failed");
      return failed();
    }
    if (!existing) return { ok: false, error: "Lead not found.", code: "not_found" };
    if (existing.merged_into_lead_id || existing.archived_at) {
      return { ok: false, error: "This lead cannot be claimed.", code: "validation" };
    }
    if (existing.owner_user_id === gate.userId) return { ok: true };
    if (existing.owner_user_id) {
      return {
        ok: false,
        error: "This Lead was already claimed by another team member.",
        code: "claimed",
      };
    }

    const { data, error } = await supabase
      .from("leads")
      .update({ owner_user_id: gate.userId })
      .eq("id", leadId)
      .is("owner_user_id", null)
      .select("id");

    if (error) {
      console.error("[leads] claim failed");
      if (error.code === "42501") return denied("You cannot claim this Lead.");
      return failed();
    }

    if (!data || data.length === 0) {
      return {
        ok: false,
        error: "This Lead was already claimed by another team member.",
        code: "claimed",
      };
    }

    await recordActivity(leadId, gate.userId, "lead_claimed", {
      previous_owner_id: "",
      new_owner_id: gate.userId,
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] claim unavailable");
    return failed();
  }
}

async function readActiveLead(
  leadId: string,
): Promise<{ active: true; ownerUserId: string | null } | LeadsMutationResult> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id, owner_user_id, merged_into_lead_id, archived_at")
    .eq("id", leadId)
    .maybeSingle();

  if (error) {
    console.error("[leads] lead state failed");
    return failed();
  }
  if (!data) return { ok: false, error: "Lead not found.", code: "not_found" };
  if (data.merged_into_lead_id) {
    return { ok: false, error: "A merged lead cannot be changed.", code: "validation" };
  }
  if (data.archived_at) {
    return { ok: false, error: "An archived lead cannot be changed.", code: "validation" };
  }
  return {
    active: true,
    ownerUserId: typeof data.owner_user_id === "string" ? data.owner_user_id : null,
  };
}

export async function releaseLeadAction(leadId: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };
  if (!(await authorize("leads.assign"))) return denied("You cannot release this Lead.");

  try {
    const state = await readActiveLead(leadId);
    if (!("active" in state)) return state;
    if (!state.ownerUserId) return { ok: true };

    const writable = await assertLeadWritable(leadId);
    if (!writable.ok) return writable;

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .update({ owner_user_id: null })
      .eq("id", leadId)
      .eq("owner_user_id", state.ownerUserId)
      .is("merged_into_lead_id", null)
      .is("archived_at", null)
      .select("id");

    if (error) {
      console.error("[leads] release failed");
      if (error.code === "42501") return denied("You cannot release this Lead.");
      return failed();
    }
    if (!data || data.length === 0) return failed();

    await recordActivity(leadId, gate.userId, "owner_released", {
      previous_owner_id: state.ownerUserId,
      new_owner_id: "",
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] release unavailable");
    return failed();
  }
}

export async function assignLeadAction(leadId: string, assigneeId: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };
  if (!isUuid(assigneeId)) return { ok: false, error: "Choose a team member.", code: "validation" };
  if (!(await authorize("leads.assign"))) return denied("You cannot assign this Lead.");

  try {
    const state = await readActiveLead(leadId);
    if (!("active" in state)) return state;
    if (state.ownerUserId === assigneeId) return { ok: true };

    const supabase = await createClient();
    const { data: candidates, error: directoryError } = await supabase.rpc("leads_assignment_candidates");
    if (directoryError) return denied("You cannot assign this Lead.");
    const allowed = (Array.isArray(candidates) ? candidates : []).some((row) => {
      if (!row || typeof row !== "object") return false;
      return (row as { user_id?: unknown }).user_id === assigneeId;
    });
    if (!allowed) return { ok: false, error: "Choose a team member with Leads access.", code: "validation" };

    const writable = await assertLeadWritable(leadId);
    if (!writable.ok) return writable;

    let update = supabase
      .from("leads")
      .update({ owner_user_id: assigneeId })
      .eq("id", leadId)
      .is("merged_into_lead_id", null)
      .is("archived_at", null);
    update = state.ownerUserId ? update.eq("owner_user_id", state.ownerUserId) : update.is("owner_user_id", null);
    const { data, error } = await update.select("id");

    if (error) {
      console.error("[leads] assign failed");
      if (error.code === "42501") return denied("You cannot assign this Lead.");
      return failed();
    }
    if (!data || data.length === 0) return failed();

    await recordActivity(leadId, gate.userId, "owner_changed", {
      previous_owner_id: state.ownerUserId ?? "",
      new_owner_id: assigneeId,
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] assign unavailable");
    return failed();
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  statusId: string,
): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };
  if (!isUuid(statusId)) {
    return { ok: false, error: "Choose a status.", code: "validation" };
  }

  if (!(await authorize("leads.write"))) return denied();

  try {
    const supabase = await createClient();
    const { data: allowed, error: allowError } = await supabase.rpc("leads_can_write_lead", {
      target_lead_id: leadId,
    });
    if (allowError || allowed !== true) return denied();

    const { data: current, error: currentError } = await supabase
      .from("leads")
      .select("status_id, merged_into_lead_id, archived_at, lead_statuses ( key, label )")
      .eq("id", leadId)
      .maybeSingle();

    if (currentError) {
      console.error("[leads] status read failed");
      return failed();
    }
    if (!current || typeof current.status_id !== "string") {
      return { ok: false, error: "Lead not found.", code: "not_found" };
    }
    if (current.merged_into_lead_id) {
      return { ok: false, error: "A merged lead cannot change status.", code: "validation" };
    }
    if (current.archived_at) {
      return { ok: false, error: "An archived lead cannot change status.", code: "validation" };
    }
    if (current.status_id === statusId) return { ok: true };

    const { data: nextStatus, error: statusError } = await supabase
      .from("lead_statuses")
      .select("id, key, label")
      .eq("id", statusId)
      .is("archived_at", null)
      .maybeSingle();

    if (statusError) {
      console.error("[leads] status lookup failed");
      return failed();
    }
    if (!nextStatus || typeof nextStatus.label !== "string") {
      return { ok: false, error: "Choose a status.", code: "validation" };
    }

    const currentStatus = Array.isArray(current.lead_statuses)
      ? current.lead_statuses[0]
      : current.lead_statuses;
    const fromLabel =
      currentStatus && typeof currentStatus.label === "string" ? currentStatus.label : "Previous";
    const fromKey = currentStatus && typeof currentStatus.key === "string" ? currentStatus.key : "";

    const { data, error } = await supabase
      .from("leads")
      .update({ status_id: statusId })
      .eq("id", leadId)
      .eq("status_id", current.status_id)
      .select("id");

    if (error) {
      console.error("[leads] status update failed");
      if (error.code === "42501") return denied();
      return failed();
    }
    if (!data || data.length === 0) return denied();

    await recordActivity(leadId, gate.userId, "lead_status_changed", {
      from_status: fromLabel,
      to_status: nextStatus.label,
      from_status_key: fromKey,
      to_status_key: typeof nextStatus.key === "string" ? nextStatus.key : "",
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] status update unavailable");
    return failed();
  }
}

export async function addLeadNoteAction(leadId: string, body: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };

  const parsed = validateNoteBody(body);
  if (!parsed.ok) return { ok: false, error: parsed.error, code: "validation" };
  if (!(await authorize("leads.write"))) return denied();

  try {
    const state = await readActiveLead(leadId);
    if (!("active" in state)) return state;

    const supabase = await createClient();
    const { data: allowed, error: allowError } = await supabase.rpc("leads_can_write_lead", {
      target_lead_id: leadId,
    });
    if (allowError || allowed !== true) return denied();

    const { error } = await supabase.from("lead_notes").insert({
      lead_id: leadId,
      author_user_id: gate.userId,
      body: parsed.body,
    });

    if (error) {
      console.error("[leads] note insert failed");
      if (error.code === "42501") return denied();
      return failed();
    }

    await recordActivity(leadId, gate.userId, "note_added", {});
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] note insert unavailable");
    return failed();
  }
}

export async function updateLeadNoteAction(
  leadId: string,
  noteId: string,
  body: string,
): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId) || !isUuid(noteId)) {
    return { ok: false, error: "Note not found.", code: "not_found" };
  }

  const parsed = validateNoteBody(body);
  if (!parsed.ok) return { ok: false, error: parsed.error, code: "validation" };
  if (!(await authorize("leads.write"))) return denied();

  try {
    const state = await readActiveLead(leadId);
    if (!("active" in state)) return state;

    const supabase = await createClient();
    const { data: allowed, error: allowError } = await supabase.rpc("leads_can_write_lead", {
      target_lead_id: leadId,
    });
    if (allowError || allowed !== true) return denied();

    const { data: currentNote, error: noteReadError } = await supabase
      .from("lead_notes")
      .select("body")
      .eq("id", noteId)
      .eq("lead_id", leadId)
      .eq("author_user_id", gate.userId)
      .maybeSingle();
    if (noteReadError) {
      console.error("[leads] note read failed");
      return failed();
    }
    if (!currentNote) return { ok: false, error: "You can only edit your own notes.", code: "forbidden" };
    if (currentNote.body === parsed.body) return { ok: true };

    const { data, error } = await supabase
      .from("lead_notes")
      .update({ body: parsed.body })
      .eq("id", noteId)
      .eq("lead_id", leadId)
      .eq("author_user_id", gate.userId)
      .select("id");

    if (error) {
      console.error("[leads] note update failed");
      if (error.code === "42501") return denied("You can only edit your own notes.");
      return failed();
    }
    if (!data || data.length === 0) {
      return { ok: false, error: "You can only edit your own notes.", code: "forbidden" };
    }

    await recordActivity(leadId, gate.userId, "note_updated", {});
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] note update unavailable");
    return failed();
  }
}

export async function createLeadAction(input: CreateLeadInput): Promise<CreateLeadResult> {
  const user = await getInternalAuthUser();
  if (!user) {
    return { ok: false, error: "Sign in to continue.", code: "forbidden" };
  }

  const [canWrite, canClaim, canAssign] = await Promise.all([
    authorize("leads.write"),
    authorize("leads.claim"),
    authorize("leads.assign"),
  ]);
  if (!canWrite || (!canClaim && !canAssign)) {
    return { ok: false, error: "You cannot add a Lead.", code: "forbidden" };
  }

  const parsed = validateCreateLead(input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Check the lead fields and try again.",
      code: "validation",
      fields: parsed.fields,
    };
  }

  try {
    const supabase = await createClient();
    const { data: status, error: statusError } = await supabase
      .from("lead_statuses")
      .select("id")
      .eq("id", parsed.value.statusId)
      .is("archived_at", null)
      .maybeSingle();

    if (statusError) {
      console.error("[leads] create status lookup failed");
      return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
    }
    if (!status) {
      return {
        ok: false,
        error: "Choose a status.",
        code: "validation",
        fields: { statusId: "Choose a status." },
      };
    }

    if (parsed.value.identity) {
      const identityGate = await assertIdentityAvailable(parsed.value.identity.sourceId, parsed.value.identity.externalId);
      if (!identityGate.ok) return identityGate;
      if (!input.acknowledgeSeparate) {
        const possible = await findPossibleDuplicates({
          ...parsed.value.identity,
          leadId: placeholderLeadId(),
          leadName: parsed.value.displayName,
        });
        if (!possible.ok) {
          return { ok: false, error: "Could not check for duplicates. Try again.", code: "error" };
        }
        if (possible.matches.length > 0) {
          return {
            ok: false,
            error: "Possible duplicate",
            code: "possible_duplicate",
            matches: possible.matches,
          };
        }
      }
    }

    const ownerUserId = canClaim ? user.id : null;
    // The id is generated here so the insert does not use RETURNING.
    // PostgREST applies the SELECT policy to INSERT...RETURNING, and
    // leads_can_read_lead() cannot see the new row inside that statement.
    const leadId = crypto.randomUUID();
    const { error: createError } = await supabase.from("leads").insert({
      id: leadId,
      display_name: parsed.value.displayName,
      status_id: parsed.value.statusId,
      owner_user_id: ownerUserId,
      language: parsed.value.language,
      region: parsed.value.region,
      created_by: user.id,
    });

    if (createError) {
      console.error("[leads] create failed");
      if (createError.code === "42501") {
        return { ok: false, error: "You cannot add a Lead.", code: "forbidden" };
      }
      return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
    }

    await recordActivity(leadId, user.id, "lead_created", {});

    if (!parsed.value.identity) {
      revalidatePath(INTERNAL_ROUTES.leads);
      return { ok: true, leadId };
    }

    const { error: identityError } = await supabase.from("social_identities").insert({
      lead_id: leadId,
      source_id: parsed.value.identity.sourceId,
      external_id: parsed.value.identity.externalId,
      handle: parsed.value.identity.handle,
      profile_url: parsed.value.identity.profileUrl,
      display_name: parsed.value.identity.displayName,
      bio: parsed.value.identity.bio,
    });

    revalidatePath(INTERNAL_ROUTES.leads);

    if (!identityError) {
      const source = await sourceLabel(parsed.value.identity.sourceId);
      await recordActivity(leadId, user.id, "identity_attached", {
        source,
        handle: shownHandle(parsed.value.identity.handle),
      });
      if (input.acknowledgeSeparate) {
        const possible = await findPossibleDuplicates({
          ...parsed.value.identity,
          leadId,
          leadName: parsed.value.displayName,
        });
        if (possible.ok) await markKeptSeparate(leadId, possible.matches);
      }
      return { ok: true, leadId };
    }

    console.error("[leads] identity attach failed");
    if (isUniqueViolation(identityError)) {
      return {
        ok: true,
        leadId,
        warning: `${EXACT_DUPLICATE_ERROR} The lead was saved without it.`,
      };
    }

    return {
      ok: true,
      leadId,
      warning: "The lead was saved, but the identity could not be attached.",
    };
  } catch {
    console.error("[leads] create unavailable");
    return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
  }
}

async function assertIdentityAvailable(
  sourceId: string,
  externalId: string,
): Promise<{ ok: true } | CreateLeadResult> {
  const supabase = await createClient();
  const { data: source, error: sourceError } = await supabase
    .from("lead_sources")
    .select("id, is_active, archived_at")
    .eq("id", sourceId)
    .maybeSingle();

  if (sourceError) {
    console.error("[leads] source lookup failed");
    return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
  }
  if (!source || source.is_active !== true || source.archived_at) {
    return {
      ok: false,
      error: "Choose a source.",
      code: "validation",
      fields: { sourceId: "Choose a source." },
    };
  }

  const canManage = await authorize("sources.manage");
  if (!canManage) {
    const user = await getInternalAuthUser();
    if (!user) return { ok: false, error: "Sign in to continue.", code: "forbidden" };
    const { data: assignment, error: assignmentError } = await supabase
      .from("source_assignments")
      .select("source_id")
      .eq("source_id", sourceId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (assignmentError) {
      console.error("[leads] source assignment lookup failed");
      return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
    }
    if (!assignment) {
      return {
        ok: false,
        error: "You can only attach identities for sources assigned to you.",
        code: "forbidden",
      };
    }
  }

  const { data: existing, error: existingError } = await supabase
    .from("social_identities")
    .select("id")
    .eq("source_id", sourceId)
    .eq("external_id", externalId)
    .maybeSingle();

  if (existingError) {
    console.error("[leads] identity lookup failed");
    return { ok: false, error: "Could not save this Lead. Try again.", code: "error" };
  }
  if (existing) {
    return {
      ok: false,
      error: EXACT_DUPLICATE_ERROR,
      code: "duplicate",
    };
  }

  return { ok: true };
}

function shownHandle(handle: string | null): string {
  if (!handle) return "";
  return handle.startsWith("@") ? handle : `@${handle}`;
}

async function sourceLabel(sourceId: string): Promise<string> {
  const supabase = await createClient();
  const { data } = await supabase.from("lead_sources").select("name").eq("id", sourceId).maybeSingle();
  return typeof data?.name === "string" && data.name.trim() ? data.name.trim() : "Source";
}

async function assertLeadWritable(leadId: string): Promise<LeadsMutationResult | { ok: true }> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("leads_can_write_lead", { target_lead_id: leadId });
  if (error) {
    console.error("[leads] write check failed");
    return failed();
  }
  if (data !== true) return denied();
  return { ok: true };
}

export async function attachIdentityAction(input: AttachIdentityInput): Promise<IdentityMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  const parsed = validateAttachIdentity(input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Check the identity fields and try again.",
      code: "validation",
      fields: parsed.fields,
    };
  }

  const identityGate = await assertIdentityAvailable(parsed.value.sourceId, parsed.value.externalId);
  if (!identityGate.ok) return identityGate;

  try {
    const supabase = await createClient();
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("id, display_name, merged_into_lead_id, archived_at")
      .eq("id", input.leadId)
      .maybeSingle();

    if (leadError) {
      console.error("[leads] identity lead lookup failed");
      return { ok: false, error: "Could not save this identity. Try again.", code: "error" };
    }
    if (!lead || typeof lead.display_name !== "string") {
      return { ok: false, error: "Lead not found.", code: "not_found" };
    }
    if (lead.merged_into_lead_id || lead.archived_at) {
      return {
        ok: false,
        error: "This lead cannot take a new identity.",
        code: "validation",
      };
    }

    const writable = await assertLeadWritable(input.leadId);
    if (!writable.ok) {
      return {
        ok: false,
        error: writable.error,
        code: writable.code === "not_found" ? "not_found" : writable.code === "forbidden" ? "forbidden" : "error",
      };
    }

    const possible = await findPossibleDuplicates({
      ...parsed.value,
      leadId: input.leadId,
      leadName: lead.display_name,
    });
    if (!possible.ok) {
      return { ok: false, error: "Could not check for duplicates. Try again.", code: "error" };
    }
    const matches = await stagePendingCandidates(input.leadId, possible.matches);
    if (matches.length > 0 && !input.acknowledgeSeparate) {
      return {
        ok: false,
        error: "Possible duplicate",
        code: "possible_duplicate",
        matches,
      };
    }

    const { error } = await supabase.from("social_identities").insert({
      lead_id: input.leadId,
      source_id: parsed.value.sourceId,
      external_id: parsed.value.externalId,
      handle: parsed.value.handle,
      profile_url: parsed.value.profileUrl,
      display_name: parsed.value.displayName,
      bio: parsed.value.bio,
    });

    if (error) {
      console.error("[leads] identity attach failed");
      if (isUniqueViolation(error)) {
        return { ok: false, error: EXACT_DUPLICATE_ERROR, code: "duplicate" };
      }
      if (error.code === "42501") {
        return { ok: false, error: "You cannot add an identity to this Lead.", code: "forbidden" };
      }
      return { ok: false, error: "Could not save this identity. Try again.", code: "error" };
    }

    const source = await sourceLabel(parsed.value.sourceId);
    await recordActivity(input.leadId, gate.userId, "identity_attached", {
      source,
      handle: shownHandle(parsed.value.handle),
    });
    if (input.acknowledgeSeparate) await markKeptSeparate(input.leadId, matches);
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] identity attach unavailable");
    return { ok: false, error: "Could not save this identity. Try again.", code: "error" };
  }
}

export async function setIdentityActiveAction(
  leadId: string,
  identityId: string,
  isActive: boolean,
): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId) || !isUuid(identityId)) {
    return { ok: false, error: "Identity not found.", code: "not_found" };
  }

  try {
    const state = await readActiveLead(leadId);
    if (!("active" in state)) return state;

    const writable = await assertLeadWritable(leadId);
    if (!writable.ok) return writable;

    const supabase = await createClient();
    const { data: identity, error: readError } = await supabase
      .from("social_identities")
      .select("id, source_id, handle, is_active, lead_sources ( name )")
      .eq("id", identityId)
      .eq("lead_id", leadId)
      .maybeSingle();

    if (readError) {
      console.error("[leads] identity read failed");
      return failed();
    }
    if (!identity) return { ok: false, error: "Identity not found.", code: "not_found" };
    if (identity.is_active === isActive) return { ok: true };

    const canManage = await authorize("sources.manage");
    if (!canManage) {
      const { data: assignment, error: assignmentError } = await supabase
        .from("source_assignments")
        .select("source_id")
        .eq("source_id", identity.source_id)
        .eq("user_id", gate.userId)
        .maybeSingle();
      if (assignmentError) {
        console.error("[leads] identity assignment lookup failed");
        return failed();
      }
      if (!assignment) return denied("You cannot change this identity.");
    }

    const { error } = await supabase
      .from("social_identities")
      .update({ is_active: isActive })
      .eq("id", identityId)
      .eq("lead_id", leadId);

    if (error) {
      console.error("[leads] identity update failed");
      if (error.code === "42501") return denied("You cannot change this identity.");
      return failed();
    }

    const source = asRecord(Array.isArray(identity.lead_sources) ? identity.lead_sources[0] : identity.lead_sources);
    await recordActivity(leadId, gate.userId, "identity_updated", {
      source: typeof source?.name === "string" ? source.name : "Source",
      handle: shownHandle(typeof identity.handle === "string" ? identity.handle : null),
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] identity update unavailable");
    return failed();
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

export async function archiveLeadAction(leadId: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(leadId)) return { ok: false, error: "Lead not found.", code: "not_found" };

  try {
    const writable = await assertLeadWritable(leadId);
    if (!writable.ok) return writable;

    const supabase = await createClient();
    const { data: lead, error: readError } = await supabase
      .from("leads")
      .select("id, archived_at, status_id, lead_statuses ( key, label )")
      .eq("id", leadId)
      .maybeSingle();

    if (readError) {
      console.error("[leads] archive read failed");
      return failed();
    }
    if (!lead) return { ok: false, error: "Lead not found.", code: "not_found" };
    if (lead.archived_at) return { ok: true };

    const { data: mergedRow, error: mergedError } = await supabase
      .from("leads")
      .select("merged_into_lead_id")
      .eq("id", leadId)
      .maybeSingle();
    if (mergedError) {
      console.error("[leads] archive state failed");
      return failed();
    }
    if (mergedRow?.merged_into_lead_id) {
      return { ok: false, error: "A merged lead is not archived.", code: "validation" };
    }

    const currentStatus = asRecord(Array.isArray(lead.lead_statuses) ? lead.lead_statuses[0] : lead.lead_statuses);
    const { data: archivedStatus } = await supabase
      .from("lead_statuses")
      .select("id, label")
      .eq("key", "archived")
      .is("archived_at", null)
      .maybeSingle();

    const nextStatusId = typeof archivedStatus?.id === "string" ? archivedStatus.id : lead.status_id;
    const { error } = await supabase
      .from("leads")
      .update({
        archived_at: new Date().toISOString(),
        status_id: nextStatusId,
      })
      .eq("id", leadId)
      .is("archived_at", null);

    if (error) {
      console.error("[leads] archive failed");
      if (error.code === "42501") return denied("You cannot archive this Lead.");
      return failed();
    }

    await recordActivity(leadId, gate.userId, "lead_archived", {
      from_status: typeof currentStatus?.label === "string" ? currentStatus.label : "",
      to_status: typeof archivedStatus?.label === "string" ? archivedStatus.label : "Archived",
    });
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] archive unavailable");
    return failed();
  }
}

export async function keepDuplicateSeparateAction(candidateId: string): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(candidateId)) return { ok: false, error: "Duplicate review not found.", code: "not_found" };
  if (!(await authorize("duplicates.review"))) return denied("You cannot review duplicates.");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("duplicate_candidates")
      .update({
        status: "kept_separate",
        reviewed_by: gate.userId,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", candidateId)
      .eq("status", "pending")
      .select("id");

    if (error) {
      console.error("[leads] keep separate failed");
      if (error.code === "42501") return denied("You cannot review duplicates.");
      return failed();
    }
    if (!data || data.length === 0) {
      return { ok: false, error: "This duplicate review is no longer pending.", code: "not_found" };
    }
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true };
  } catch {
    console.error("[leads] keep separate unavailable");
    return failed();
  }
}

function countValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return 0;
}

function identitySummaries(value: unknown): MergeIdentitySummary[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    const externalId = typeof row.external_id === "string" ? row.external_id.trim() : "";
    if (!externalId) return [];
    const handle = typeof row.handle === "string" && row.handle.trim() ? row.handle.trim() : null;
    const platform = typeof row.platform === "string" && row.platform.trim() ? row.platform.trim() : "Source";
    return [{ platform, handle, externalId }];
  });
}

function leadPreview(value: unknown): MergeLeadPreview | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.id !== "string" || typeof row.display_name !== "string") return null;
  return {
    id: row.id,
    displayName: row.display_name,
    identities: identitySummaries(row.identities),
    noteCount: countValue(row.note_count),
    activityCount: countValue(row.activity_count),
    merged: row.merged === true,
    archived: row.archived === true,
  };
}

function parseMergePreview(value: unknown): MergePreview | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  const low = leadPreview(row.low);
  const high = leadPreview(row.high);
  if (!low || !high) return null;
  return { low, high, conflicts: identitySummaries(row.conflicts) };
}

function mergeFailure(error: { code?: string; message?: string }): Extract<LeadsMutationResult, { ok: false }> {
  const message = error.message ?? "";
  if (message.includes("already exists on the surviving Lead")) {
    return {
      ok: false,
      error: "Merge cannot continue because this identity already exists on the surviving Lead.",
      code: "validation",
    };
  }
  if (message.includes("already exists on another Lead")) {
    return {
      ok: false,
      error: "Merge cannot continue because this identity already exists on another Lead.",
      code: "validation",
    };
  }
  if (message.includes("no longer pending") || error.code === "P0002") {
    return { ok: false, error: "This duplicate review is no longer pending.", code: "not_found" };
  }
  if (message.includes("Choose the lead")) {
    return { ok: false, error: "Choose the lead that should remain.", code: "validation" };
  }
  if (message.includes("cycle")) {
    return {
      ok: false,
      error: "These leads cannot be merged because it would create a merge cycle.",
      code: "validation",
    };
  }
  if (message.includes("cannot be merged again")) {
    return { ok: false, error: "A merged lead cannot be merged again.", code: "validation" };
  }
  if (message.includes("Only active leads")) {
    return { ok: false, error: "Only active leads can be merged.", code: "validation" };
  }
  if (error.code === "42501" || message.includes("not permitted")) {
    return { ok: false, error: "You cannot merge these leads.", code: "forbidden" };
  }
  if (error.code === "PGRST202") {
    return { ok: false, error: "Merge is not available yet.", code: "error" };
  }
  return { ok: false, error: "Could not merge these leads. Try again.", code: "error" };
}

export async function loadMergePreviewAction(
  candidateId: string,
): Promise<{ ok: true; preview: MergePreview } | { ok: false; error: string }> {
  const gate = await requireUser();
  if (!gate.ok) return { ok: false, error: gate.error };
  if (!isUuid(candidateId)) return { ok: false, error: "Duplicate review not found." };
  if (!(await authorize("duplicates.review"))) return { ok: false, error: "You cannot review duplicates." };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("leads_merge_preview", { p_candidate_id: candidateId });
    if (error) {
      console.error("[leads] merge preview failed");
      return { ok: false, error: mergeFailure(error).error };
    }
    const preview = parseMergePreview(data);
    if (!preview) return { ok: false, error: "Could not load this duplicate review." };
    return { ok: true, preview };
  } catch {
    console.error("[leads] merge preview unavailable");
    return { ok: false, error: "Could not load this duplicate review." };
  }
}

export async function mergeLeadsAction(
  candidateId: string,
  survivorLeadId: string,
): Promise<LeadsMutationResult> {
  const gate = await requireUser();
  if (!gate.ok) return gate;
  if (!isUuid(candidateId) || !isUuid(survivorLeadId)) {
    return { ok: false, error: "Choose the lead that should remain.", code: "validation" };
  }
  if (!(await authorize("duplicates.review"))) return denied("You cannot review duplicates.");

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("leads_merge_pair", {
      p_candidate_id: candidateId,
      p_survivor_id: survivorLeadId,
    });

    if (error) {
      console.error("[leads] merge failed");
      return mergeFailure(error);
    }

    const survivorId =
      data && typeof data === "object" && typeof (data as { survivor_id?: unknown }).survivor_id === "string"
        ? (data as { survivor_id: string }).survivor_id
        : survivorLeadId;
    revalidatePath(INTERNAL_ROUTES.leads);
    return { ok: true, survivorId };
  } catch {
    console.error("[leads] merge unavailable");
    return { ok: false, error: "Could not merge these leads. Try again.", code: "error" };
  }
}
