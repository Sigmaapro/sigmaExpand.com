import { isUuid } from "@/lib/internal/leads/validation";
import {
  SOURCE_CAPABILITIES,
  type SourceCapability,
  type SourceFieldErrors,
  type SourceInput,
} from "@/lib/internal/leads/sources/types";

const KEY_PATTERN = /^[a-z][a-z0-9_]*$/;
const CAPABILITY_SET = new Set<string>(SOURCE_CAPABILITIES);

export type ParsedSourceInput = {
  name: string;
  key: string;
  providerKey: string | null;
  capabilities: SourceCapability[];
  isActive: boolean;
};

function cleanLine(value: string, max: number): string {
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

export function validateSourceInput(
  input: SourceInput,
): { ok: true; value: ParsedSourceInput } | { ok: false; fields: SourceFieldErrors } {
  const fields: SourceFieldErrors = {};
  const name = cleanLine(input.name ?? "", 80);
  if (!name) fields.name = "Enter a source name.";
  else if ((input.name ?? "").trim().length > 80) fields.name = "Use 80 characters or fewer.";

  const key = (input.key ?? "").trim().toLowerCase();
  if (!key) fields.key = "Enter a source key.";
  else if (!KEY_PATTERN.test(key) || key.length > 64) {
    fields.key = "Use a lowercase key: letters, numbers, and underscores.";
  }

  const providerRaw = (input.providerKey ?? "").trim().toLowerCase();
  let providerKey: string | null = null;
  if (providerRaw) {
    if (!KEY_PATTERN.test(providerRaw) || providerRaw.length > 64) {
      fields.providerKey = "Use a lowercase provider key, or leave it blank.";
    } else {
      providerKey = providerRaw;
    }
  }

  const requested = Array.isArray(input.capabilities) ? input.capabilities : [];
  const capabilities: SourceCapability[] = [];
  for (const item of requested) {
    if (typeof item !== "string" || !CAPABILITY_SET.has(item)) {
      fields.capabilities = "Choose capabilities from the source list.";
      break;
    }
    const capability = item as SourceCapability;
    if (!capabilities.includes(capability)) capabilities.push(capability);
  }

  if (typeof input.isActive !== "boolean") fields.isActive = "Choose whether this source is active.";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: {
      name,
      key,
      providerKey,
      capabilities,
      isActive: input.isActive,
    },
  };
}

export function validateAssignmentIds(
  sourceId: string,
  userId: string,
): { ok: true; sourceId: string; userId: string } | { ok: false; error: string } {
  if (!isUuid(sourceId) || !isUuid(userId)) {
    return { ok: false, error: "Choose a source and a team member." };
  }
  return { ok: true, sourceId, userId };
}
