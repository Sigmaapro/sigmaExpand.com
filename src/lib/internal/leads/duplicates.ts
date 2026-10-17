import type { SupabaseClient } from "@supabase/supabase-js";
import { getInternalAuthUser } from "@/lib/internal/auth";
import { authorize } from "@/lib/internal/leads-auth";
import type { DuplicateMatch, ParsedLeadIdentity } from "@/lib/internal/leads/types";
import { createClient } from "@/lib/supabase/server";

export const EXACT_DUPLICATE_ERROR = "This identity already belongs to another Lead.";

const PLACEHOLDER_LEAD_ID = "00000000-0000-4000-8000-000000000000";

type Client = SupabaseClient;

export type IdentityProbe = ParsedLeadIdentity & {
  leadId: string;
  leadName: string;
};

type Bucket = {
  leadId: string;
  leadName: string;
  ownerUserId: string | null;
  platform: string;
  handle: string | null;
  evidence: Set<string>;
  confidence: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeHandle(value: string): string {
  return value
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9._]+/g, "");
}

export function normalizeUrl(value: string): string {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    const path = url.pathname.replace(/\/+$/, "").toLowerCase();
    return `${host}${path}`;
  } catch {
    return "";
  }
}

export function orderedPair(left: string, right: string): [string, string] | null {
  if (left === right) return null;
  return left < right ? [left, right] : [right, left];
}

function consider(
  buckets: Map<string, Bucket>,
  lead: { id: string; name: string; ownerUserId: string | null },
  hit: { platform: string; handle: string | null; evidence: string; confidence: number },
) {
  const current = buckets.get(lead.id) ?? {
    leadId: lead.id,
    leadName: lead.name,
    ownerUserId: lead.ownerUserId,
    platform: hit.platform,
    handle: hit.handle,
    evidence: new Set<string>(),
    confidence: 0,
  };
  current.evidence.add(hit.evidence);
  current.confidence = Math.min(1, Math.max(current.confidence, hit.confidence));
  if (hit.handle) current.handle = hit.handle;
  if (hit.platform && current.platform === "Lead") current.platform = hit.platform;
  buckets.set(lead.id, current);
}

function ownerText(ownerId: string | null, currentUserId: string | null, names: Map<string, string>): string {
  if (!ownerId) return "Unclaimed";
  if (ownerId === currentUserId) return "Mine";
  return names.get(ownerId) ?? "Team member";
}

export async function findPossibleDuplicates(
  probe: IdentityProbe,
): Promise<{ ok: true; matches: DuplicateMatch[] } | { ok: false }> {
  try {
    const supabase = await createClient();
    const user = await getInternalAuthUser();
    const handle = normalizeHandle(probe.handle ?? "");
    const profile = normalizeUrl(probe.profileUrl ?? "");
    const names = [normalizeName(probe.displayName ?? ""), normalizeName(probe.leadName)].filter(
      (value) => value.length >= 3,
    );

    if (handle.length < 2 && profile.length < 8 && names.length === 0) {
      return { ok: true, matches: [] };
    }

    const [identitiesResult, leadsResult] = await Promise.all([
      supabase
        .from("social_identities")
        .select(
          "lead_id, handle, profile_url, display_name, lead_sources ( name ), leads ( id, display_name, owner_user_id, merged_into_lead_id, archived_at )",
        )
        .neq("lead_id", probe.leadId)
        .limit(400),
      supabase
        .from("leads")
        .select("id, display_name, owner_user_id, merged_into_lead_id, archived_at")
        .neq("id", probe.leadId)
        .is("merged_into_lead_id", null)
        .is("archived_at", null)
        .limit(400),
    ]);

    if (identitiesResult.error || leadsResult.error) {
      console.error("[leads] duplicate search failed");
      return { ok: false };
    }

    const buckets = new Map<string, Bucket>();
    const leadRows = Array.isArray(leadsResult.data) ? leadsResult.data : [];
    const known = new Map<string, { id: string; name: string; ownerUserId: string | null }>();

    for (const row of leadRows) {
      const record = asRecord(row);
      const id = text(record?.id);
      const name = text(record?.display_name);
      if (!record || !id || !name) continue;
      known.set(id, {
        id,
        name,
        ownerUserId: text(record.owner_user_id),
      });
      const normalized = normalizeName(name);
      if (names.includes(normalized)) {
        consider(buckets, known.get(id)!, {
          platform: "Lead",
          handle: null,
          evidence: "matching normalized name",
          confidence: 0.6,
        });
      }
    }

    for (const row of Array.isArray(identitiesResult.data) ? identitiesResult.data : []) {
      const record = asRecord(row);
      if (!record) continue;
      const lead = asRecord(Array.isArray(record.leads) ? record.leads[0] : record.leads);
      const leadId = text(record.lead_id);
      if (!lead || !leadId || leadId === probe.leadId) continue;
      if (lead.merged_into_lead_id || lead.archived_at) continue;
      const leadName = text(lead.display_name) ?? "Lead";
      const subject = {
        id: leadId,
        name: leadName,
        ownerUserId: text(lead.owner_user_id),
      };
      known.set(leadId, subject);
      const source = asRecord(Array.isArray(record.lead_sources) ? record.lead_sources[0] : record.lead_sources);
      const platform = text(source?.name) ?? "Source";
      const rowHandle = text(record.handle);
      const shownHandle = rowHandle ? (rowHandle.startsWith("@") ? rowHandle : `@${rowHandle}`) : null;

      if (handle.length >= 2 && normalizeHandle(rowHandle ?? "") === handle) {
        consider(buckets, subject, {
          platform,
          handle: shownHandle,
          evidence: "matching handle",
          confidence: 0.8,
        });
      }
      if (profile.length >= 8 && normalizeUrl(text(record.profile_url) ?? "") === profile) {
        consider(buckets, subject, {
          platform,
          handle: shownHandle,
          evidence: "matching profile URL",
          confidence: 1,
        });
      }
      const identityName = normalizeName(text(record.display_name) ?? "");
      const leadNameKey = normalizeName(leadName);
      if (
        (identityName.length >= 3 && names.includes(identityName)) ||
        (leadNameKey.length >= 3 && names.includes(leadNameKey))
      ) {
        consider(buckets, subject, {
          platform,
          handle: shownHandle,
          evidence: "matching normalized name",
          confidence: 0.6,
        });
      }
    }

    const ownerIds = [...buckets.values()]
      .map((bucket) => bucket.ownerUserId)
      .filter((id): id is string => Boolean(id));
    const labels = await profileNames(supabase, ownerIds);

    const matches = [...buckets.values()]
      .sort((left, right) => right.confidence - left.confidence)
      .slice(0, 5)
      .map((bucket) => ({
        candidateId: null,
        leadId: bucket.leadId,
        leadName: bucket.leadName,
        ownerLabel: ownerText(bucket.ownerUserId, user?.id ?? null, labels),
        platform: bucket.platform,
        handle: bucket.handle,
        evidence: [...bucket.evidence],
        confidence: Math.round(bucket.confidence * 100) / 100,
      }));

    return { ok: true, matches };
  } catch {
    console.error("[leads] duplicate search unavailable");
    return { ok: false };
  }
}

async function profileNames(supabase: Client, userIds: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return new Map();
  const { data, error } = await supabase.from("profiles").select("user_id, full_name").in("user_id", unique);
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

export function placeholderLeadId(): string {
  return PLACEHOLDER_LEAD_ID;
}

export async function stagePendingCandidates(
  currentLeadId: string,
  matches: DuplicateMatch[],
): Promise<DuplicateMatch[]> {
  const canReview = await authorize("duplicates.review");
  if (!canReview) return matches;

  const supabase = await createClient();
  const visible: DuplicateMatch[] = [];

  for (const match of matches) {
    const pair = orderedPair(currentLeadId, match.leadId);
    if (!pair) continue;
    const { data: existing, error } = await supabase
      .from("duplicate_candidates")
      .select("id, status")
      .eq("lead_low_id", pair[0])
      .eq("lead_high_id", pair[1])
      .maybeSingle();

    if (error) {
      console.error("[leads] duplicate candidate lookup failed");
      visible.push(match);
      continue;
    }

    if (existing?.status === "kept_separate" || existing?.status === "merged") continue;
    if (existing?.status === "pending" && typeof existing.id === "string") {
      visible.push({ ...match, candidateId: existing.id });
      continue;
    }

    const { error: insertError } = await supabase.from("duplicate_candidates").insert({
      lead_low_id: pair[0],
      lead_high_id: pair[1],
      confidence: match.confidence,
      reason: match.evidence[0] ?? "possible duplicate",
      evidence: {
        platform: match.platform,
        handle: match.handle,
        evidence: match.evidence,
      },
      status: "pending",
    });

    if (insertError && insertError.code !== "23505") {
      console.error("[leads] duplicate candidate was not stored");
      visible.push(match);
      continue;
    }

    const { data: stored } = await supabase
      .from("duplicate_candidates")
      .select("id, status")
      .eq("lead_low_id", pair[0])
      .eq("lead_high_id", pair[1])
      .maybeSingle();

    if (stored?.status === "kept_separate" || stored?.status === "merged") continue;
    visible.push({
      ...match,
      candidateId: typeof stored?.id === "string" ? stored.id : match.candidateId,
    });
  }

  return visible;
}

export async function markKeptSeparate(currentLeadId: string, matches: DuplicateMatch[]): Promise<void> {
  const user = await getInternalAuthUser();
  if (!user) return;
  const canReview = await authorize("duplicates.review");
  if (!canReview) return;

  const supabase = await createClient();
  const reviewedAt = new Date().toISOString();

  for (const match of matches) {
    const pair = orderedPair(currentLeadId, match.leadId);
    if (!pair) continue;
    const { data: existing, error } = await supabase
      .from("duplicate_candidates")
      .select("id, status")
      .eq("lead_low_id", pair[0])
      .eq("lead_high_id", pair[1])
      .maybeSingle();

    if (error) {
      console.error("[leads] duplicate decision lookup failed");
      continue;
    }

    if (existing?.status === "merged" || existing?.status === "kept_separate") continue;

    if (existing?.id) {
      const { error: updateError } = await supabase
        .from("duplicate_candidates")
        .update({
          status: "kept_separate",
          reviewed_by: user.id,
          reviewed_at: reviewedAt,
        })
        .eq("id", existing.id)
        .eq("status", "pending");
      if (updateError) console.error("[leads] duplicate decision was not saved");
      continue;
    }

    const { error: insertError } = await supabase.from("duplicate_candidates").insert({
      lead_low_id: pair[0],
      lead_high_id: pair[1],
      confidence: match.confidence,
      reason: match.evidence[0] ?? "possible duplicate",
      evidence: {
        platform: match.platform,
        handle: match.handle,
        evidence: match.evidence,
      },
      status: "kept_separate",
      reviewed_by: user.id,
      reviewed_at: reviewedAt,
    });
    if (insertError) console.error("[leads] duplicate decision was not saved");
  }
}
