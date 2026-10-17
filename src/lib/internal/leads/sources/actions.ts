"use server";

import { revalidatePath } from "next/cache";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { authorize } from "@/lib/internal/leads-auth";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { isUuid } from "@/lib/internal/leads/validation";
import { sourceHasIdentities } from "@/lib/internal/leads/sources/queries";
import type { SourceInput, SourceMutationResult } from "@/lib/internal/leads/sources/types";
import { validateAssignmentIds, validateSourceInput } from "@/lib/internal/leads/sources/validation";
import { createClient } from "@/lib/supabase/server";

function denied(error: string): SourceMutationResult {
  return { ok: false, error, code: "forbidden" };
}

function failed(error = "Could not save this source. Try again."): SourceMutationResult {
  return { ok: false, error, code: "error" };
}

function isUniqueViolation(error: { code?: string }): boolean {
  return error.code === "23505";
}

function isCheckViolation(error: { code?: string }): boolean {
  return error.code === "23514";
}

function refreshSources() {
  revalidatePath(INTERNAL_ROUTES.adminSources);
  revalidatePath(INTERNAL_ROUTES.leads);
}

async function requireManager(): Promise<SourceMutationResult | null> {
  const user = await getInternalAuthUser();
  if (!user) return denied("Sign in to continue.");
  if (!(await authorize("sources.manage"))) return denied("You cannot manage sources.");
  return null;
}

async function requireAssigner(): Promise<SourceMutationResult | null> {
  const user = await getInternalAuthUser();
  if (!user) return denied("Sign in to continue.");
  if (!(await authorize("sources.assign"))) return denied("You cannot assign sources.");
  return null;
}

export async function createSourceAction(input: SourceInput): Promise<SourceMutationResult> {
  const blocked = await requireManager();
  if (blocked) return blocked;

  const parsed = validateSourceInput(input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Check the source fields and try again.",
      code: "validation",
      fields: parsed.fields,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("lead_sources").insert({
      name: parsed.value.name,
      key: parsed.value.key,
      provider_key: parsed.value.providerKey,
      capabilities: parsed.value.capabilities,
      is_active: parsed.value.isActive,
      config: {},
    });

    if (error) {
      console.error("[sources] create failed");
      if (isUniqueViolation(error)) {
        return {
          ok: false,
          error: "A source with this key already exists.",
          code: "duplicate",
          fields: { key: "A source with this key already exists." },
        };
      }
      if (error.code === "42501") return denied("You cannot manage sources.");
      if (isCheckViolation(error)) {
        return {
          ok: false,
          error: "Check the source fields and try again.",
          code: "validation",
        };
      }
      return failed();
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] create unavailable");
    return failed();
  }
}

export async function updateSourceAction(sourceId: string, input: SourceInput): Promise<SourceMutationResult> {
  const blocked = await requireManager();
  if (blocked) return blocked;
  if (!isUuid(sourceId)) return failed("Choose a source.");

  const parsed = validateSourceInput(input);
  if (!parsed.ok) {
    return {
      ok: false,
      error: "Check the source fields and try again.",
      code: "validation",
      fields: parsed.fields,
    };
  }

  try {
    const supabase = await createClient();
    const { data: existing, error: readError } = await supabase
      .from("lead_sources")
      .select("id, key, archived_at")
      .eq("id", sourceId)
      .maybeSingle();

    if (readError) {
      console.error("[sources] update read failed");
      return failed();
    }
    if (!existing) return failed("This source is no longer available.");

    if (existing.archived_at && parsed.value.isActive) {
      return {
        ok: false,
        error: "Restore the source before activating it.",
        code: "validation",
        fields: { isActive: "Restore the source before activating it." },
      };
    }

    if (existing.key !== parsed.value.key) {
      const hasIdentities = await sourceHasIdentities(sourceId);
      if (hasIdentities === null) return failed();
      if (hasIdentities) {
        return {
          ok: false,
          error: "This source key is in use by social identities.",
          code: "validation",
          fields: { key: "This source key is in use by social identities." },
        };
      }
    }

    const { error } = await supabase
      .from("lead_sources")
      .update({
        name: parsed.value.name,
        key: parsed.value.key,
        provider_key: parsed.value.providerKey,
        capabilities: parsed.value.capabilities,
        is_active: existing.archived_at ? false : parsed.value.isActive,
      })
      .eq("id", sourceId);

    if (error) {
      console.error("[sources] update failed");
      if (isUniqueViolation(error)) {
        return {
          ok: false,
          error: "A source with this key already exists.",
          code: "duplicate",
          fields: { key: "A source with this key already exists." },
        };
      }
      if (error.code === "42501") return denied("You cannot manage sources.");
      if (isCheckViolation(error)) {
        return {
          ok: false,
          error: "Archived sources stay inactive.",
          code: "validation",
          fields: { isActive: "Archived sources stay inactive." },
        };
      }
      return failed();
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] update unavailable");
    return failed();
  }
}

export async function archiveSourceAction(sourceId: string): Promise<SourceMutationResult> {
  const blocked = await requireManager();
  if (blocked) return blocked;
  if (!isUuid(sourceId)) return failed("Choose a source.");

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("lead_sources")
      .update({
        is_active: false,
        archived_at: new Date().toISOString(),
      })
      .eq("id", sourceId)
      .is("archived_at", null);

    if (error) {
      console.error("[sources] archive failed");
      if (error.code === "42501") return denied("You cannot manage sources.");
      return failed("Could not archive this source. Try again.");
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] archive unavailable");
    return failed("Could not archive this source. Try again.");
  }
}

export async function restoreSourceAction(sourceId: string): Promise<SourceMutationResult> {
  const blocked = await requireManager();
  if (blocked) return blocked;
  if (!isUuid(sourceId)) return failed("Choose a source.");

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("lead_sources")
      .update({
        is_active: true,
        archived_at: null,
      })
      .eq("id", sourceId)
      .not("archived_at", "is", null);

    if (error) {
      console.error("[sources] restore failed");
      if (error.code === "42501") return denied("You cannot manage sources.");
      return failed("Could not restore this source. Try again.");
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] restore unavailable");
    return failed("Could not restore this source. Try again.");
  }
}

export async function assignSourceMemberAction(
  sourceId: string,
  userId: string,
): Promise<SourceMutationResult> {
  const blocked = await requireAssigner();
  if (blocked) return blocked;

  const ids = validateAssignmentIds(sourceId, userId);
  if (!ids.ok) return { ok: false, error: ids.error, code: "validation" };

  try {
    const supabase = await createClient();
    const { data: memberRows, error: memberError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("user_id", ids.userId)
      .limit(1);

    if (memberError) {
      console.error("[sources] member lookup failed");
      return failed("Could not assign this member. Try again.");
    }
    if (!memberRows || memberRows.length === 0) {
      return {
        ok: false,
        error: "That team member is not available.",
        code: "validation",
      };
    }

    const { data: source, error: sourceError } = await supabase
      .from("lead_sources")
      .select("id, archived_at")
      .eq("id", ids.sourceId)
      .maybeSingle();

    if (sourceError) {
      console.error("[sources] assignment source lookup failed");
      return failed("Could not assign this member. Try again.");
    }
    if (!source || source.archived_at) {
      return {
        ok: false,
        error: "Archived sources cannot take new assignments.",
        code: "validation",
      };
    }

    const { error } = await supabase.from("source_assignments").insert({
      source_id: ids.sourceId,
      user_id: ids.userId,
    });

    if (error) {
      console.error("[sources] assignment failed");
      if (isUniqueViolation(error)) {
        return {
          ok: false,
          error: "This member is already assigned.",
          code: "duplicate",
        };
      }
      if (error.code === "42501") return denied("You cannot assign sources.");
      return failed("Could not assign this member. Try again.");
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] assignment unavailable");
    return failed("Could not assign this member. Try again.");
  }
}

export async function removeSourceMemberAction(
  sourceId: string,
  userId: string,
): Promise<SourceMutationResult> {
  const blocked = await requireAssigner();
  if (blocked) return blocked;

  const ids = validateAssignmentIds(sourceId, userId);
  if (!ids.ok) return { ok: false, error: ids.error, code: "validation" };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("source_assignments")
      .delete()
      .eq("source_id", ids.sourceId)
      .eq("user_id", ids.userId)
      .select("user_id");

    if (error) {
      console.error("[sources] assignment removal failed");
      if (error.code === "42501") return denied("You cannot assign sources.");
      return failed("Could not remove this assignment. Try again.");
    }
    if (!data || data.length === 0) {
      return {
        ok: false,
        error: "That assignment is already gone.",
        code: "error",
      };
    }

    refreshSources();
    return { ok: true };
  } catch {
    console.error("[sources] assignment removal unavailable");
    return failed("Could not remove this assignment. Try again.");
  }
}
