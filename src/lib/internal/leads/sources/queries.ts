import type { SupabaseClient } from "@supabase/supabase-js";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { authorize } from "@/lib/internal/leads-auth";
import { isUuid } from "@/lib/internal/leads/validation";
import { createClient } from "@/lib/supabase/server";
import {
  SOURCE_CAPABILITIES,
  type ProviderConnection,
  type SourceAdminAccess,
  type SourceAssignmentRecord,
  type SourceCapability,
  type SourceDirectoryResult,
  type SourceRecord,
  type TeamMemberOption,
} from "@/lib/internal/leads/sources/types";

type Client = SupabaseClient;

const CAPABILITY_SET = new Set<string>(SOURCE_CAPABILITIES);

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function capabilitiesOf(value: unknown): SourceCapability[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is SourceCapability => typeof item === "string" && CAPABILITY_SET.has(item));
}

/**
 * No provider connector exists in this phase.
 * A stored provider key does not mean the source is connected.
 */
export function providerConnection(): { state: ProviderConnection; label: string } {
  return { state: "not_connected", label: "Not connected" };
}

export async function getSourceAdminAccess(): Promise<SourceAdminAccess> {
  const [canManage, canAssign] = await Promise.all([
    authorize("sources.manage"),
    authorize("sources.assign"),
  ]);
  return { canManage, canAssign };
}

function memberLabel(
  userId: string,
  names: Map<string, string>,
  currentUserId: string,
  currentEmail: string | null,
): string {
  const named = names.get(userId);
  if (named) return named;
  if (userId === currentUserId && currentEmail) return currentEmail;
  return "Team member";
}

async function profileLabels(supabase: Client, userIds: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(userIds.filter((id) => isUuid(id)))];
  if (unique.length === 0) return new Map();

  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, full_name, email")
    .in("user_id", unique);

  if (error || !Array.isArray(data)) return new Map();

  const names = new Map<string, string>();
  for (const row of data) {
    const record = asRecord(row);
    const userId = text(record?.user_id);
    const fullName = text(record?.full_name);
    const email = text(record?.email);
    if (userId && (fullName || email)) names.set(userId, fullName || email || "Team member");
  }
  return names;
}

async function identityCount(supabase: Client, sourceId: string): Promise<number | null> {
  const { count, error } = await supabase
    .from("social_identities")
    .select("id", { count: "exact", head: true })
    .eq("source_id", sourceId);

  if (error) return null;
  return count ?? 0;
}

export async function listSourceDirectory(): Promise<SourceDirectoryResult> {
  if (!(await authorize("sources.manage"))) return { status: "forbidden" };

  const user = await getInternalAuthUser();
  if (!user) return { status: "forbidden" };

  try {
    const supabase = await createClient();
    const [sourcesResult, assignmentsResult, rolesResult] = await Promise.all([
      supabase
        .from("lead_sources")
        .select("id, key, name, provider_key, capabilities, is_active, archived_at, created_at")
        .order("name", { ascending: true }),
      supabase.from("source_assignments").select("source_id, user_id, created_at"),
      supabase.from("user_roles").select("user_id"),
    ]);

    if (sourcesResult.error || assignmentsResult.error || rolesResult.error) {
      console.error("[sources] directory failed");
      return { status: "error" };
    }

    const roleIds = [
      ...new Set(
        (assignmentsResult.data ?? [])
          .map((row) => text(asRecord(row)?.user_id))
          .concat((rolesResult.data ?? []).map((row) => text(asRecord(row)?.user_id)))
          .filter((id): id is string => Boolean(id)),
      ),
    ];
    const names = await profileLabels(supabase, roleIds);
    const connection = providerConnection();

    const assignmentsBySource = new Map<string, SourceAssignmentRecord[]>();
    for (const row of assignmentsResult.data ?? []) {
      const record = asRecord(row);
      const sourceId = text(record?.source_id);
      const userId = text(record?.user_id);
      const createdAt = text(record?.created_at);
      if (!sourceId || !userId || !createdAt) continue;
      const list = assignmentsBySource.get(sourceId) ?? [];
      list.push({
        userId,
        label: memberLabel(userId, names, user.id, user.email ?? null),
        createdAt,
      });
      assignmentsBySource.set(sourceId, list);
    }

    const sources: SourceRecord[] = [];
    for (const row of sourcesResult.data ?? []) {
      const record = asRecord(row);
      const id = text(record?.id);
      const key = text(record?.key);
      const name = text(record?.name);
      const createdAt = text(record?.created_at);
      if (!id || !key || !name || !createdAt || typeof record?.is_active !== "boolean") continue;
      const identities = await identityCount(supabase, id);
      const assignments = assignmentsBySource.get(id) ?? [];
      sources.push({
        id,
        key,
        name,
        providerKey: text(record.provider_key),
        capabilities: capabilitiesOf(record.capabilities),
        isActive: record.is_active,
        archivedAt: text(record.archived_at),
        createdAt,
        assignedCount: assignments.length,
        identityCount: identities ?? 0,
        keyLocked: identities === null || identities > 0,
        providerConnection: connection.state,
        providerLabel: connection.label,
        assignments,
      });
    }

    const memberIds = [...new Set((rolesResult.data ?? []).map((row) => text(asRecord(row)?.user_id)).filter((id): id is string => Boolean(id)))];
    const members: TeamMemberOption[] = memberIds
      .map((userId) => ({
        userId,
        label: memberLabel(userId, names, user.id, user.email ?? null),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return { status: "ok", data: { sources, members } };
  } catch {
    console.error("[sources] directory unavailable");
    return { status: "error" };
  }
}

export async function sourceHasIdentities(sourceId: string): Promise<boolean | null> {
  if (!isUuid(sourceId)) return null;
  try {
    const supabase = await createClient();
    const count = await identityCount(supabase, sourceId);
    if (count === null) return null;
    return count > 0;
  } catch {
    return null;
  }
}
