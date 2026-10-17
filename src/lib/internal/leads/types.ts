export const LEADS_PAGE_SIZE = 25;

export type LeadOwnerFilter = "all" | "mine" | "unclaimed";

export type LeadListFilters = {
  q: string;
  statusId: string | null;
  owner: LeadOwnerFilter;
  sourceId: string | null;
  region: string | null;
  language: string | null;
  page: number;
  leadId: string | null;
};

export type LeadsAccess = {
  canRead: boolean;
  canWrite: boolean;
  canClaim: boolean;
  canAssign: boolean;
  canManageSources: boolean;
  canReviewDuplicates: boolean;
};

export type LeadStatusOption = {
  id: string;
  key: string;
  label: string;
};

export type LeadSourceOption = {
  id: string;
  key: string;
  name: string;
};

export type LeadsFacets = {
  statuses: LeadStatusOption[];
  sources: LeadSourceOption[];
  regions: string[];
  languages: string[];
};

export type LeadListItem = {
  id: string;
  displayName: string;
  ownerLabel: string;
  unclaimed: boolean;
  statusLabel: string;
  statusKey: string;
  sourceLabel: string;
  identityLabel: string;
  identityCount: number;
  region: string | null;
  language: string | null;
  discoveredAt: string;
  lastActivityAt: string | null;
};

export type LeadAssignee = {
  userId: string;
  label: string;
};

export type LeadsListPayload = {
  items: LeadListItem[];
  total: number;
  unclaimedCount: number;
  page: number;
  pageSize: number;
  facets: LeadsFacets;
};

export type LeadsListResult =
  | { status: "ok"; data: LeadsListPayload }
  | { status: "forbidden" }
  | { status: "error" };

export type LeadIdentity = {
  id: string;
  sourceId: string;
  sourceName: string;
  handle: string | null;
  displayName: string | null;
  profileUrl: string | null;
  bio: string | null;
  externalId: string;
  isActive: boolean;
  lastSyncedAt: string | null;
  canChangeActive: boolean;
};

export type LeadNote = {
  id: string;
  body: string;
  authorLabel: string;
  mine: boolean;
  createdAt: string;
  updatedAt: string;
  edited: boolean;
};

export type LeadActivity = {
  id: string;
  type: string;
  label: string;
  detail: string | null;
  actorLabel: string;
  createdAt: string;
};

export type DuplicateMatch = {
  candidateId: string | null;
  leadId: string;
  leadName: string;
  ownerLabel: string;
  platform: string;
  handle: string | null;
  evidence: string[];
  confidence: number | null;
};

export type LeadDetail = {
  id: string;
  displayName: string;
  language: string | null;
  region: string | null;
  discoveredAt: string;
  createdAt: string;
  lastActivityAt: string | null;
  ownerUserId: string | null;
  ownerLabel: string;
  unclaimed: boolean;
  canWrite: boolean;
  merged: boolean;
  archivedAt: string | null;
  sourceCount: number;
  status: LeadStatusOption & { isTerminal: boolean };
  identities: LeadIdentity[];
  notes: LeadNote[];
  activities: LeadActivity[];
  duplicates: DuplicateMatch[];
};

export type LeadDetailResult =
  | { status: "ready"; detail: LeadDetail }
  | { status: "not_found" }
  | { status: "forbidden" }
  | { status: "error" };

export type CreateLeadInput = {
  displayName: string;
  language: string;
  region: string;
  statusId: string;
  sourceId: string;
  externalId: string;
  handle: string;
  profileUrl: string;
  bio: string;
  acknowledgeSeparate?: boolean;
};

export type ParsedLeadIdentity = {
  sourceId: string;
  externalId: string;
  handle: string | null;
  profileUrl: string | null;
  displayName: string | null;
  bio: string | null;
};

export type AttachIdentityInput = {
  leadId: string;
  sourceId: string;
  externalId: string;
  handle: string;
  profileUrl: string;
  displayName: string;
  bio: string;
  acknowledgeSeparate: boolean;
};

export type ParsedCreateLead = {
  displayName: string;
  language: string | null;
  region: string | null;
  statusId: string;
  identity: ParsedLeadIdentity | null;
};

export type LeadFieldErrors = Partial<
  Record<
    | "displayName"
    | "language"
    | "region"
    | "statusId"
    | "sourceId"
    | "externalId"
    | "handle"
    | "profileUrl"
    | "bio"
    | "body",
    string
  >
>;

export type MergeIdentitySummary = {
  platform: string;
  handle: string | null;
  externalId: string;
};

export type MergeLeadPreview = {
  id: string;
  displayName: string;
  identities: MergeIdentitySummary[];
  noteCount: number;
  activityCount: number;
  merged: boolean;
  archived: boolean;
};

export type MergePreview = {
  low: MergeLeadPreview;
  high: MergeLeadPreview;
  conflicts: MergeIdentitySummary[];
};

export type LeadsMutationResult =
  | { ok: true; survivorId?: string }
  | { ok: false; error: string; code: "forbidden" | "not_found" | "claimed" | "validation" | "error" };

export type CreateLeadResult =
  | { ok: true; leadId: string; warning?: string }
  | {
      ok: false;
      error: string;
      code: "forbidden" | "duplicate" | "validation" | "possible_duplicate" | "error";
      fields?: LeadFieldErrors;
      matches?: DuplicateMatch[];
    };

export type IdentityMutationResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code: "forbidden" | "not_found" | "duplicate" | "validation" | "possible_duplicate" | "error";
      fields?: LeadFieldErrors;
      matches?: DuplicateMatch[];
    };
