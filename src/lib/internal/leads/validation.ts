import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import type {
  AttachIdentityInput,
  CreateLeadInput,
  LeadFieldErrors,
  LeadListFilters,
  LeadOwnerFilter,
  ParsedCreateLead,
  ParsedLeadIdentity,
} from "@/lib/internal/leads/types";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function optionalUuid(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || !isUuid(trimmed)) return null;
  return trimmed;
}

function optionalText(value: string, max: number): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export function parseLeadListFilters(
  raw: Record<string, string | string[] | undefined>,
): LeadListFilters {
  const ownerRaw = firstParam(raw.owner);
  const owner: LeadOwnerFilter =
    ownerRaw === "mine" || ownerRaw === "unclaimed" ? ownerRaw : "all";
  const pageRaw = Number.parseInt(firstParam(raw.page), 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.min(pageRaw, 10000) : 1;
  const q = firstParam(raw.q).trim().slice(0, 80);

  return {
    q,
    statusId: optionalUuid(firstParam(raw.status)),
    owner,
    sourceId: optionalUuid(firstParam(raw.source)),
    region: optionalText(firstParam(raw.region), 80),
    language: optionalText(firstParam(raw.language), 64),
    page,
    leadId: optionalUuid(firstParam(raw.lead)),
  };
}

export function activeFilterCount(filters: LeadListFilters): number {
  let count = 0;
  if (filters.statusId) count += 1;
  if (filters.owner !== "all") count += 1;
  if (filters.sourceId) count += 1;
  if (filters.region) count += 1;
  if (filters.language) count += 1;
  return count;
}

export function leadsListHref(filters: LeadListFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.statusId) params.set("status", filters.statusId);
  if (filters.owner !== "all") params.set("owner", filters.owner);
  if (filters.sourceId) params.set("source", filters.sourceId);
  if (filters.region) params.set("region", filters.region);
  if (filters.language) params.set("language", filters.language);
  if (filters.page > 1) params.set("page", String(filters.page));
  if (filters.leadId) params.set("lead", filters.leadId);
  const query = params.toString();
  return query ? `${INTERNAL_ROUTES.leads}?${query}` : INTERNAL_ROUTES.leads;
}

/** Literal ILIKE contains-pattern. `%`, `_`, and `\` in the query are escaped. */
export function ilikeContains(raw: string): string | null {
  const trimmed = raw.trim().slice(0, 80);
  if (!trimmed) return null;
  const escaped = trimmed.replace(/[\\%_]/g, (char) => `\\${char}`);
  return `%${escaped}%`;
}

function cleanLine(value: string, max: number): string {
  return value.trim().slice(0, max);
}

function optionalHttpUrl(value: string): { ok: true; url: string | null } | { ok: false } {
  const trimmed = value.trim();
  if (!trimmed) return { ok: true, url: null };
  if (trimmed.length > 500) return { ok: false };
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false };
    return { ok: true, url: url.toString() };
  } catch {
    return { ok: false };
  }
}

export function validateCreateLead(
  input: CreateLeadInput,
): { ok: true; value: ParsedCreateLead } | { ok: false; fields: LeadFieldErrors } {
  const fields: LeadFieldErrors = {};
  const displayName = cleanLine(input.displayName ?? "", 200);
  if (!displayName) fields.displayName = "Enter a display name.";
  else if (displayName.length > 200) fields.displayName = "Use 200 characters or fewer.";

  const language = cleanLine(input.language ?? "", 64);
  if ((input.language ?? "").trim().length > 64) fields.language = "Use 64 characters or fewer.";

  const region = cleanLine(input.region ?? "", 80);
  if ((input.region ?? "").trim().length > 80) fields.region = "Use 80 characters or fewer.";

  const statusId = (input.statusId ?? "").trim();
  if (!isUuid(statusId)) fields.statusId = "Choose a status.";

  const sourceId = (input.sourceId ?? "").trim();
  const externalId = cleanLine(input.externalId ?? "", 180);
  const handle = cleanLine(input.handle ?? "", 120);
  const bio = cleanLine(input.bio ?? "", 2000);
  const profile = optionalHttpUrl(input.profileUrl ?? "");

  if ((input.handle ?? "").trim().length > 120) fields.handle = "Use 120 characters or fewer.";
  if ((input.bio ?? "").trim().length > 2000) fields.bio = "Use 2000 characters or fewer.";
  if ((input.externalId ?? "").trim().length > 180) {
    fields.externalId = "Use 180 characters or fewer.";
  }
  if (!profile.ok) fields.profileUrl = "Use a full http or https profile URL.";

  const identityAttempted = Boolean(
    sourceId || externalId || handle || bio || (input.profileUrl ?? "").trim(),
  );

  let identity: ParsedCreateLead["identity"] = null;
  if (identityAttempted) {
    if (!isUuid(sourceId)) {
      fields.sourceId = "A source is required before an identity can be added.";
    }
    if (!externalId) fields.externalId = "Enter the identity’s external ID.";
    if (!fields.sourceId && !fields.externalId && !fields.handle && !fields.profileUrl && !fields.bio && profile.ok) {
      identity = {
        sourceId,
        externalId,
        handle: handle || null,
        profileUrl: profile.url,
        displayName: null,
        bio: bio || null,
      };
    }
  }

  if (Object.keys(fields).length > 0 || !displayName || !isUuid(statusId)) {
    return { ok: false, fields };
  }

  return {
    ok: true,
    value: {
      displayName,
      language: language || null,
      region: region || null,
      statusId,
      identity,
    },
  };
}

export function validateAttachIdentity(
  input: AttachIdentityInput,
): { ok: true; value: ParsedLeadIdentity } | { ok: false; fields: LeadFieldErrors } {
  const fields: LeadFieldErrors = {};
  const sourceId = (input.sourceId ?? "").trim();
  const externalId = cleanLine(input.externalId ?? "", 180);
  const handle = cleanLine(input.handle ?? "", 120);
  const identityName = cleanLine(input.displayName ?? "", 200);
  const bio = cleanLine(input.bio ?? "", 2000);
  const profile = optionalHttpUrl(input.profileUrl ?? "");

  if (!isUuid(sourceId)) fields.sourceId = "Choose a source.";
  if (!externalId) fields.externalId = "Enter the identity’s external ID.";
  if ((input.handle ?? "").trim().length > 120) fields.handle = "Use 120 characters or fewer.";
  if ((input.displayName ?? "").trim().length > 200) fields.displayName = "Use 200 characters or fewer.";
  if ((input.bio ?? "").trim().length > 2000) fields.bio = "Use 2000 characters or fewer.";
  if ((input.externalId ?? "").trim().length > 180) fields.externalId = "Use 180 characters or fewer.";
  const profileUrl = profile.ok ? profile.url : null;
  if (!profile.ok) fields.profileUrl = "Use a full http or https profile URL.";
  if (!isUuid(input.leadId)) fields.displayName = fields.displayName ?? "Choose a lead.";

  if (Object.keys(fields).length > 0) return { ok: false, fields };
  return {
    ok: true,
    value: {
      sourceId,
      externalId,
      handle: handle || null,
      profileUrl,
      displayName: identityName || null,
      bio: bio || null,
    },
  };
}

export function validateNoteBody(value: string): { ok: true; body: string } | { ok: false; error: string } {
  const body = value.trim();
  if (!body) return { ok: false, error: "Write a note before saving." };
  if (body.length > 4000) return { ok: false, error: "Use 4000 characters or fewer." };
  return { ok: true, body };
}
