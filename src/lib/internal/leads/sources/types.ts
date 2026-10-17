export const SOURCE_CAPABILITIES = [
  "search_profiles",
  "search_keywords",
  "search_hashtags",
  "fetch_profile",
  "fetch_recent_posts",
  "fetch_recent_reels",
  "fetch_metrics",
] as const;

export type SourceCapability = (typeof SOURCE_CAPABILITIES)[number];

export const SOURCE_CAPABILITY_LABELS: Record<SourceCapability, string> = {
  search_profiles: "Search profiles",
  search_keywords: "Search keywords",
  search_hashtags: "Search hashtags",
  fetch_profile: "Fetch profile",
  fetch_recent_posts: "Fetch posts",
  fetch_recent_reels: "Fetch reels",
  fetch_metrics: "Fetch metrics",
};

/**
 * Reserved for a future provider connection.
 * This phase never reports connected or unsupported.
 */
export type ProviderConnection = "not_connected" | "connected" | "unsupported";

export type SourceFieldErrors = Partial<
  Record<"name" | "key" | "providerKey" | "capabilities" | "isActive", string>
>;

export type SourceInput = {
  name: string;
  key: string;
  providerKey: string;
  capabilities: string[];
  isActive: boolean;
};

export type SourceAssignmentRecord = {
  userId: string;
  label: string;
  createdAt: string;
};

export type SourceRecord = {
  id: string;
  name: string;
  key: string;
  providerKey: string | null;
  capabilities: SourceCapability[];
  isActive: boolean;
  archivedAt: string | null;
  createdAt: string;
  assignedCount: number;
  identityCount: number;
  keyLocked: boolean;
  providerConnection: ProviderConnection;
  providerLabel: string;
  assignments: SourceAssignmentRecord[];
};

export type TeamMemberOption = {
  userId: string;
  label: string;
};

export type SourceAdminAccess = {
  canManage: boolean;
  canAssign: boolean;
};

export type SourceDirectory = {
  sources: SourceRecord[];
  members: TeamMemberOption[];
};

export type SourceDirectoryResult =
  | { status: "ok"; data: SourceDirectory }
  | { status: "forbidden" }
  | { status: "error" };

export type SourceMutationResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      code: "forbidden" | "validation" | "duplicate" | "error";
      fields?: SourceFieldErrors;
    };
