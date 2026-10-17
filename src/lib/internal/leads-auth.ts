import { getInternalAuthUser } from "@/lib/internal/auth";
import { createClient } from "@/lib/supabase/server";

/**
 * Permission keys this application knows how to enforce.
 * A row in public.permissions does nothing until a call site checks that key.
 * This is not profiles.role and not profiles.internal_role.
 */
export const LEADS_PERMISSIONS = [
  "leads.read",
  "leads.write",
  "leads.claim",
  "leads.assign",
  "leads.import",
  "leads.export",
  "sources.manage",
  "sources.assign",
  "duplicates.review",
  "analytics.read",
  "analytics.team",
  "admin.users",
  "admin.roles",
  "admin.settings",
  "admin.audit",
] as const;

export type LeadsPermission = (typeof LEADS_PERMISSIONS)[number];

/**
 * Server-side SIGMA Leads authorization.
 * Calls public.leads_has_permission for the signed-in user.
 * Missing session, unknown key, and database errors fail closed.
 * There is no existing helper for this; board access stays on internal_role.
 */
export async function authorize(permission: LeadsPermission): Promise<boolean> {
  const user = await getInternalAuthUser();
  if (!user) return false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("leads_has_permission", {
      permission_key: permission,
    });
    if (error) {
      console.error("[leads-auth] permission check failed");
      return false;
    }
    return data === true;
  } catch {
    console.error("[leads-auth] permission check unavailable");
    return false;
  }
}
