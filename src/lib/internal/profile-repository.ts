import type { TeamMember } from "@/content/global/marketing/teamContent";

/**
 * Phase 1 sessionStorage overlay is retired.
 * Profile persistence is public.profiles via saveInternalProfileAction.
 *
 * Public /team/[slug] still reads the static catalog only.
 */
export function mergeTeamMemberWithLocalOverlay(canonical: TeamMember): TeamMember {
  return canonical;
}
