import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { authorize } from "@/lib/internal/leads-auth";
import { activityDetail, activityLabel } from "@/lib/internal/leads/format";
import type {
  DuplicateMatch,
  LeadActivity,
  LeadAssignee,
  LeadDetail,
  LeadDetailResult,
  LeadIdentity,
  LeadListFilters,
  LeadListItem,
  LeadNote,
  LeadsAccess,
  LeadsFacets,
  LeadsListResult,
  LeadSourceOption,
  LeadStatusOption,
} from "@/lib/internal/leads/types";
import { LEADS_PAGE_SIZE } from "@/lib/internal/leads/types";
import { ilikeContains, isUuid } from "@/lib/internal/leads/validation";
import { createClient } from "@/lib/supabase/server";

const LIST_SELECT = `
  id,
  display_name,
  language,
  region,
  discovered_at,
  owner_user_id,
  lead_statuses ( id, key, label ),
  social_identities (
    id,
    handle,
    display_name,
    is_active,
    lead_sources ( name )
  )
`;

const SEARCH_LIMIT = 200;
const SOURCE_MATCH_LIMIT = 1000;

type Client = SupabaseClient;

export const getLeadsAccess = cache(async (): Promise<LeadsAccess> => {
  const [canRead, canWrite, canClaim, canAssign, canManageSources, canReviewDuplicates] = await Promise.all([
    authorize("leads.read"),
    authorize("leads.write"),
    authorize("leads.claim"),
    authorize("leads.assign"),
    authorize("sources.manage"),
    authorize("duplicates.review"),
  ]);
  return { canRead, canWrite, canClaim, canAssign, canManageSources, canReviewDuplicates };
});

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asRecords(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => asRecord(item))
      .filter((item): item is Record<string, unknown> => Boolean(item));
  }
  const one = asRecord(value);
  return one ? [one] : [];
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function ownerLabel(
  ownerId: string | null,
  currentUserId: string,
  names: Map<string, string>,
): string {
  if (!ownerId) return "Unclaimed";
  if (ownerId === currentUserId) return "Mine";
  return names.get(ownerId) ?? "Team member";
}

function personLabel(
  userId: string | null,
  currentUserId: string,
  names: Map<string, string>,
): string {
  if (!userId) return "SIGMA";
  if (userId === currentUserId) return "You";
  return names.get(userId) ?? "Team member";
}

async function profileNames(supabase: Client, userIds: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(userIds.filter((id) => isUuid(id)))];
  if (unique.length === 0) return new Map();

  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, full_name")
    .in("user_id", unique);

  if (error || !Array.isArray(data)) return new Map();

  const names = new Map<string, string>();
  for (const row of data) {
    const record = asRecord(row);
    const userId = text(record?.user_id);
    const fullName = text(record?.full_name);
    if (userId && fullName) names.set(userId, fullName);
  }
  return names;
}

function identityHandle(handle: string | null, displayName: string | null): string {
  if (handle) return handle.startsWith("@") ? handle : `@${handle}`;
  if (displayName) return displayName;
  return "Identity";
}

function summarizeIdentities(rows: Record<string, unknown>[]): {
  label: string;
  count: number;
  sourceLabel: string;
} {
  const identities = rows.map((row) => {
    const source = asRecord(Array.isArray(row.lead_sources) ? row.lead_sources[0] : row.lead_sources);
    return {
      handle: text(row.handle),
      displayName: text(row.display_name),
      isActive: row.is_active !== false,
      sourceName: text(source?.name),
    };
  });

  if (identities.length === 0) {
    return { label: "No identity", count: 0, sourceLabel: "—" };
  }

  const primary = identities.find((item) => item.isActive) ?? identities[0];
  const label = identityHandle(primary.handle, primary.displayName);
  const sources = [...new Set(identities.map((item) => item.sourceName).filter(Boolean))] as string[];

  return {
    label: identities.length > 1 ? `${label} · ${identities.length}` : label,
    count: identities.length,
    sourceLabel: sources.length > 0 ? sources.join(" · ") : "No source configured",
  };
}

function parseListItem(
  value: unknown,
  currentUserId: string,
  names: Map<string, string>,
): LeadListItem | null {
  const row = asRecord(value);
  if (!row || typeof row.id !== "string" || typeof row.display_name !== "string") return null;
  if (typeof row.discovered_at !== "string") return null;

  const status = asRecord(Array.isArray(row.lead_statuses) ? row.lead_statuses[0] : row.lead_statuses);
  const summary = summarizeIdentities(asRecords(row.social_identities));
  const ownerId = typeof row.owner_user_id === "string" ? row.owner_user_id : null;

  return {
    id: row.id,
    displayName: row.display_name,
    ownerLabel: ownerLabel(ownerId, currentUserId, names),
    unclaimed: ownerId === null,
    statusLabel: text(status?.label) ?? "Status",
    statusKey: text(status?.key) ?? "",
    sourceLabel: summary.sourceLabel,
    identityLabel: summary.label,
    identityCount: summary.count,
    region: text(row.region),
    language: text(row.language),
    discoveredAt: row.discovered_at,
    lastActivityAt: null,
  };
}

async function latestActivityAt(supabase: Client, leadIds: string[]): Promise<Map<string, string>> {
  const latest = new Map<string, string>();
  if (leadIds.length === 0) return latest;

  const { data, error } = await supabase
    .from("lead_activities")
    .select("lead_id, created_at")
    .in("lead_id", leadIds)
    .order("created_at", { ascending: false });

  if (error || !Array.isArray(data)) {
    console.error("[leads] last activity failed");
    return latest;
  }

  for (const row of data) {
    const record = asRecord(row);
    const leadId = text(record?.lead_id);
    const createdAt = text(record?.created_at);
    if (!leadId || !createdAt || latest.has(leadId)) continue;
    latest.set(leadId, createdAt);
  }
  return latest;
}

async function searchLeadIds(supabase: Client, query: string): Promise<string[] | null> {
  const pattern = ilikeContains(query);
  if (!pattern) return [];

  const [byLead, byHandle, byName, byBio] = await Promise.all([
    supabase.from("leads").select("id").ilike("display_name", pattern).limit(SEARCH_LIMIT),
    supabase.from("social_identities").select("lead_id").ilike("handle", pattern).limit(SEARCH_LIMIT),
    supabase
      .from("social_identities")
      .select("lead_id")
      .ilike("display_name", pattern)
      .limit(SEARCH_LIMIT),
    supabase.from("social_identities").select("lead_id").ilike("bio", pattern).limit(SEARCH_LIMIT),
  ]);

  if (byLead.error || byHandle.error || byName.error || byBio.error) {
    console.error("[leads] search failed");
    return null;
  }

  const ids = new Set<string>();
  for (const row of byLead.data ?? []) {
    const record = asRecord(row);
    if (typeof record?.id === "string") ids.add(record.id);
  }
  for (const batch of [byHandle.data, byName.data, byBio.data]) {
    for (const row of batch ?? []) {
      const record = asRecord(row);
      if (typeof record?.lead_id === "string") ids.add(record.lead_id);
    }
  }
  return [...ids];
}

async function sourceLeadIds(supabase: Client, sourceId: string): Promise<string[] | null> {
  const { data, error } = await supabase
    .from("social_identities")
    .select("lead_id")
    .eq("source_id", sourceId)
    .limit(SOURCE_MATCH_LIMIT);

  if (error) {
    console.error("[leads] source filter failed");
    return null;
  }

  const ids = new Set<string>();
  for (const row of data ?? []) {
    const record = asRecord(row);
    if (typeof record?.lead_id === "string") ids.add(record.lead_id);
  }
  return [...ids];
}

async function resolveScope(
  supabase: Client,
  filters: LeadListFilters,
): Promise<{ ok: true; ids: string[] | null } | { ok: false }> {
  let ids: string[] | null = null;

  if (filters.q) {
    const matched = await searchLeadIds(supabase, filters.q);
    if (!matched) return { ok: false };
    ids = matched;
  }

  if (filters.sourceId) {
    const matched = await sourceLeadIds(supabase, filters.sourceId);
    if (!matched) return { ok: false };
    ids = ids ? ids.filter((id) => matched.includes(id)) : matched;
  }

  return { ok: true, ids };
}

async function loadFacets(supabase: Client): Promise<LeadsFacets | null> {
  const [statuses, sources, places] = await Promise.all([
    supabase
      .from("lead_statuses")
      .select("id, key, label, sort_order")
      .is("archived_at", null)
      .order("sort_order", { ascending: true }),
    supabase
      .from("lead_sources")
      .select("id, key, name")
      .eq("is_active", true)
      .is("archived_at", null)
      .order("name", { ascending: true }),
    supabase
      .from("leads")
      .select("language, region")
      .is("merged_into_lead_id", null)
      .limit(1000),
  ]);

  if (statuses.error || sources.error || places.error) {
    console.error("[leads] facets failed");
    return null;
  }

  const statusOptions: LeadStatusOption[] = [];
  for (const row of statuses.data ?? []) {
    const record = asRecord(row);
    if (!record || typeof record.id !== "string" || typeof record.key !== "string") continue;
    if (typeof record.label !== "string") continue;
    statusOptions.push({ id: record.id, key: record.key, label: record.label });
  }

  const sourceOptions: LeadSourceOption[] = [];
  for (const row of sources.data ?? []) {
    const record = asRecord(row);
    if (!record || typeof record.id !== "string" || typeof record.key !== "string") continue;
    if (typeof record.name !== "string") continue;
    sourceOptions.push({ id: record.id, key: record.key, name: record.name });
  }

  const regions = new Set<string>();
  const languages = new Set<string>();
  for (const row of places.data ?? []) {
    const record = asRecord(row);
    const region = text(record?.region);
    const language = text(record?.language);
    if (region) regions.add(region);
    if (language) languages.add(language);
  }

  return {
    statuses: statusOptions,
    sources: sourceOptions,
    regions: [...regions].sort((a, b) => a.localeCompare(b)),
    languages: [...languages].sort((a, b) => a.localeCompare(b)),
  };
}

function emptyPayload(facets: LeadsFacets): LeadsListResult {
  return {
    status: "ok",
    data: {
      items: [],
      total: 0,
      unclaimedCount: 0,
      page: 1,
      pageSize: LEADS_PAGE_SIZE,
      facets,
    },
  };
}

export async function listLeads(filters: LeadListFilters): Promise<LeadsListResult> {
  try {
    const user = await getInternalAuthUser();
    if (!user) return { status: "forbidden" };

    const access = await getLeadsAccess();
    if (!access.canRead) return { status: "forbidden" };

    const supabase = await createClient();
    const facets = await loadFacets(supabase);
    if (!facets) return { status: "error" };

    const scope = await resolveScope(supabase, filters);
    if (!scope.ok) return { status: "error" };
    if (scope.ids && scope.ids.length === 0) return emptyPayload(facets);

    let rowsQuery = supabase
      .from("leads")
      .select(LIST_SELECT, { count: "exact" })
      .is("merged_into_lead_id", null)
      .is("archived_at", null);

    let unclaimedQuery = supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .is("merged_into_lead_id", null)
      .is("archived_at", null)
      .is("owner_user_id", null);

    if (scope.ids) {
      rowsQuery = rowsQuery.in("id", scope.ids);
      unclaimedQuery = unclaimedQuery.in("id", scope.ids);
    }
    if (filters.statusId) {
      rowsQuery = rowsQuery.eq("status_id", filters.statusId);
      unclaimedQuery = unclaimedQuery.eq("status_id", filters.statusId);
    }
    if (filters.region) {
      rowsQuery = rowsQuery.eq("region", filters.region);
      unclaimedQuery = unclaimedQuery.eq("region", filters.region);
    }
    if (filters.language) {
      rowsQuery = rowsQuery.eq("language", filters.language);
      unclaimedQuery = unclaimedQuery.eq("language", filters.language);
    }
    if (filters.owner === "mine") rowsQuery = rowsQuery.eq("owner_user_id", user.id);
    if (filters.owner === "unclaimed") rowsQuery = rowsQuery.is("owner_user_id", null);

    const from = (filters.page - 1) * LEADS_PAGE_SIZE;
    const to = from + LEADS_PAGE_SIZE - 1;

    const [pageResult, unclaimedResult] = await Promise.all([
      rowsQuery.order("discovered_at", { ascending: false }).order("id", { ascending: false }).range(from, to),
      unclaimedQuery,
    ]);

    if (pageResult.error || unclaimedResult.error) {
      console.error("[leads] list failed");
      return { status: "error" };
    }

    const rawRows = Array.isArray(pageResult.data) ? pageResult.data : [];
    const ownerIds = rawRows
      .map((row) => {
        const record = asRecord(row);
        return typeof record?.owner_user_id === "string" ? record.owner_user_id : null;
      })
      .filter((id): id is string => Boolean(id));
    const names = await profileNames(supabase, ownerIds);
    const activityAt = await latestActivityAt(
      supabase,
      rawRows
        .map((row) => {
          const record = asRecord(row);
          return typeof record?.id === "string" ? record.id : "";
        })
        .filter((id) => isUuid(id)),
    );
    const items = rawRows
      .map((row) => {
        const item = parseListItem(row, user.id, names);
        if (!item) return null;
        return { ...item, lastActivityAt: activityAt.get(item.id) ?? null };
      })
      .filter((item): item is LeadListItem => Boolean(item));

    return {
      status: "ok",
      data: {
        items,
        total: pageResult.count ?? items.length,
        unclaimedCount: unclaimedResult.count ?? 0,
        page: filters.page,
        pageSize: LEADS_PAGE_SIZE,
        facets,
      },
    };
  } catch {
    console.error("[leads] list unavailable");
    return { status: "error" };
  }
}

function parseIdentity(value: Record<string, unknown>): LeadIdentity | null {
  if (typeof value.id !== "string" || typeof value.external_id !== "string") return null;
  if (typeof value.source_id !== "string") return null;
  const source = asRecord(Array.isArray(value.lead_sources) ? value.lead_sources[0] : value.lead_sources);
  return {
    id: value.id,
    sourceId: value.source_id,
    sourceName: text(source?.name) ?? "Source",
    handle: text(value.handle),
    displayName: text(value.display_name),
    profileUrl: text(value.profile_url),
    bio: text(value.bio),
    externalId: value.external_id,
    isActive: value.is_active !== false,
    lastSyncedAt: typeof value.last_synced_at === "string" ? value.last_synced_at : null,
    canChangeActive: false,
  };
}

function asConfidence(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function evidenceLines(value: unknown): string[] {
  const record = asRecord(value);
  if (!Array.isArray(record?.evidence)) return [];
  return record.evidence.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function wasEdited(createdAt: string, updatedAt: string): boolean {
  const created = new Date(createdAt).getTime();
  const updated = new Date(updatedAt).getTime();
  if (Number.isNaN(created) || Number.isNaN(updated)) return false;
  return updated - created > 1000;
}

export async function getLeadDetail(leadId: string): Promise<LeadDetailResult> {
  try {
    const user = await getInternalAuthUser();
    if (!user) return { status: "forbidden" };

    const access = await getLeadsAccess();
    if (!access.canRead) return { status: "forbidden" };
    if (!isUuid(leadId)) return { status: "not_found" };

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .select(
        `
          id,
          display_name,
          language,
          region,
          discovered_at,
          created_at,
          owner_user_id,
          merged_into_lead_id,
          archived_at,
          lead_statuses ( id, key, label, is_terminal )
        `,
      )
      .eq("id", leadId)
      .maybeSingle();

    if (error) {
      console.error("[leads] detail failed");
      return { status: "error" };
    }

    const lead = asRecord(data);
    if (!lead || typeof lead.id !== "string" || typeof lead.display_name !== "string") {
      return { status: "not_found" };
    }
    if (typeof lead.discovered_at !== "string" || typeof lead.created_at !== "string") {
      return { status: "error" };
    }

    const status = asRecord(
      Array.isArray(lead.lead_statuses) ? lead.lead_statuses[0] : lead.lead_statuses,
    );
    if (!status || typeof status.id !== "string" || typeof status.label !== "string") {
      return { status: "error" };
    }

    const duplicateQuery = access.canReviewDuplicates
      ? supabase
          .from("duplicate_candidates")
          .select("id, lead_low_id, lead_high_id, confidence, evidence, status")
          .eq("status", "pending")
          .or(`lead_low_id.eq.${leadId},lead_high_id.eq.${leadId}`)
      : Promise.resolve({ data: [], error: null });

    const [identitiesResult, notesResult, activitiesResult, writeResult, duplicatesResult] = await Promise.all([
      supabase
        .from("social_identities")
        .select(
          "id, source_id, external_id, handle, profile_url, display_name, bio, is_active, last_synced_at, lead_sources ( name )",
        )
        .eq("lead_id", leadId)
        .order("discovered_at", { ascending: true }),
      supabase
        .from("lead_notes")
        .select("id, body, author_user_id, created_at, updated_at")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false })
        .limit(40),
      supabase
        .from("lead_activities")
        .select("id, activity_type, metadata, actor_user_id, created_at")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false })
        .limit(40),
      supabase.rpc("leads_can_write_lead", { target_lead_id: leadId }),
      duplicateQuery,
    ]);

    if (identitiesResult.error || notesResult.error || activitiesResult.error || duplicatesResult.error) {
      console.error("[leads] detail relations failed");
      return { status: "error" };
    }

    const noteRows = asRecords(notesResult.data);
    const activityRows = asRecords(activitiesResult.data);
    const duplicateRows = asRecords(duplicatesResult.data);
    const otherLeadIds = duplicateRows
      .map((row) => {
        const low = typeof row.lead_low_id === "string" ? row.lead_low_id : "";
        const high = typeof row.lead_high_id === "string" ? row.lead_high_id : "";
        if (low === leadId) return high;
        if (high === leadId) return low;
        return "";
      })
      .filter((id) => isUuid(id));
    const otherLeadsResult =
      otherLeadIds.length === 0
        ? { data: [], error: null }
        : await supabase.from("leads").select("id, display_name, owner_user_id").in("id", otherLeadIds);
    if (otherLeadsResult.error) {
      console.error("[leads] duplicate leads failed");
      return { status: "error" };
    }
    const otherLeads = new Map<string, { name: string; ownerId: string | null }>();
    for (const row of asRecords(otherLeadsResult.data)) {
      if (typeof row.id !== "string" || typeof row.display_name !== "string") continue;
      otherLeads.set(row.id, {
        name: row.display_name,
        ownerId: typeof row.owner_user_id === "string" ? row.owner_user_id : null,
      });
    }

    const ownerId = typeof lead.owner_user_id === "string" ? lead.owner_user_id : null;
    const relatedUserIds = [
      ownerId,
      ...noteRows.map((row) => (typeof row.author_user_id === "string" ? row.author_user_id : null)),
      ...activityRows.map((row) => (typeof row.actor_user_id === "string" ? row.actor_user_id : null)),
      ...[...otherLeads.values()].map((item) => item.ownerId),
    ].filter((id): id is string => Boolean(id));
    const names = await profileNames(supabase, relatedUserIds);

    let identities = asRecords(identitiesResult.data)
      .map((row) => parseIdentity(row))
      .filter((item): item is LeadIdentity => Boolean(item));
    const sourceIds = [...new Set(identities.map((item) => item.sourceId))];
    if (access.canManageSources) {
      identities = identities.map((item) => ({ ...item, canChangeActive: true }));
    } else if (sourceIds.length > 0) {
      const { data: assignments, error: assignmentError } = await supabase
        .from("source_assignments")
        .select("source_id")
        .eq("user_id", user.id)
        .in("source_id", sourceIds);
      if (assignmentError) {
        console.error("[leads] identity assignment lookup failed");
        return { status: "error" };
      }
      const allowed = new Set(
        asRecords(assignments)
          .map((row) => (typeof row.source_id === "string" ? row.source_id : ""))
          .filter(Boolean),
      );
      identities = identities.map((item) => ({ ...item, canChangeActive: allowed.has(item.sourceId) }));
    }

    const notes: LeadNote[] = [];
    for (const row of noteRows) {
      if (typeof row.id !== "string" || typeof row.body !== "string") continue;
      if (typeof row.created_at !== "string" || typeof row.updated_at !== "string") continue;
      const authorId = typeof row.author_user_id === "string" ? row.author_user_id : null;
      notes.push({
        id: row.id,
        body: row.body,
        authorLabel: personLabel(authorId, user.id, names),
        mine: authorId === user.id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        edited: wasEdited(row.created_at, row.updated_at),
      });
    }

    const activities: LeadActivity[] = [];
    for (const row of activityRows) {
      if (typeof row.id !== "string" || typeof row.activity_type !== "string") continue;
      if (typeof row.created_at !== "string") continue;
      const metadata = asRecord(row.metadata) ?? {};
      const actorId = typeof row.actor_user_id === "string" ? row.actor_user_id : null;
      activities.push({
        id: row.id,
        type: row.activity_type,
        label: activityLabel(row.activity_type, metadata),
        detail: activityDetail(row.activity_type, metadata),
        actorLabel: personLabel(actorId, user.id, names),
        createdAt: row.created_at,
      });
    }

    const duplicates: DuplicateMatch[] = [];
    for (const row of duplicateRows) {
      if (typeof row.id !== "string") continue;
      const low = typeof row.lead_low_id === "string" ? row.lead_low_id : "";
      const high = typeof row.lead_high_id === "string" ? row.lead_high_id : "";
      const otherId = low === leadId ? high : high === leadId ? low : "";
      const other = otherLeads.get(otherId);
      if (!other) continue;
      const evidenceRecord = asRecord(row.evidence);
      duplicates.push({
        candidateId: row.id,
        leadId: otherId,
        leadName: other.name,
        ownerLabel: ownerLabel(other.ownerId, user.id, names),
        platform: text(evidenceRecord?.platform) ?? "Source",
        handle: text(evidenceRecord?.handle),
        evidence: evidenceLines(row.evidence),
        confidence: asConfidence(row.confidence),
      });
    }

    const sourceCount = new Set(identities.map((item) => item.sourceId)).size;

    const detail: LeadDetail = {
      id: lead.id,
      displayName: lead.display_name,
      language: text(lead.language),
      region: text(lead.region),
      discoveredAt: lead.discovered_at,
      createdAt: lead.created_at,
      lastActivityAt: activities[0]?.createdAt ?? lead.created_at,
      ownerUserId: ownerId,
      ownerLabel: ownerLabel(ownerId, user.id, names),
      unclaimed: ownerId === null,
      canWrite: writeResult.error ? false : writeResult.data === true,
      merged: typeof lead.merged_into_lead_id === "string",
      archivedAt: typeof lead.archived_at === "string" ? lead.archived_at : null,
      sourceCount,
      status: {
        id: status.id,
        key: text(status.key) ?? "",
        label: status.label,
        isTerminal: status.is_terminal === true,
      },
      identities,
      notes,
      activities,
      duplicates,
    };

    return { status: "ready", detail };
  } catch {
    console.error("[leads] detail unavailable");
    return { status: "error" };
  }
}

export async function listAssignableMembers(): Promise<
  { status: "ok"; members: LeadAssignee[] } | { status: "forbidden" } | { status: "unavailable" }
> {
  if (!(await authorize("leads.assign"))) return { status: "forbidden" };
  const user = await getInternalAuthUser();
  if (!user) return { status: "forbidden" };

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("leads_assignment_candidates");
    if (error) {
      console.error("[leads] assignment directory unavailable");
      return { status: "unavailable" };
    }

    const userIds = (Array.isArray(data) ? data : [])
      .map((row) => {
        const record = asRecord(row);
        return text(record?.user_id);
      })
      .filter((id): id is string => Boolean(id && isUuid(id)));
    const names = await profileNames(supabase, userIds);
    const members = userIds
      .map((userId) => ({
        userId,
        label: userId === user.id ? "You" : (names.get(userId) ?? "Team member"),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return { status: "ok", members };
  } catch {
    console.error("[leads] assignment directory unavailable");
    return { status: "unavailable" };
  }
}
