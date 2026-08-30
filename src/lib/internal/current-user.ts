import {
  getAllTeamMembers,
  getTeamMemberSlug,
  type TeamMember,
} from "@/content/global/marketing/teamContent";

/**
 * Catalog lookup used only as a compatibility fallback for fields
 * public.profiles does not store (group, initials).
 *
 * NOT authentication. NOT authorization.
 * Profile ownership is auth.getUser().id === public.profiles.user_id.
 */
export function findTeamMemberByIdOrSlug(idOrSlug: string): TeamMember | null {
  const normalized = idOrSlug.trim().toLowerCase();
  if (!normalized) return null;

  return (
    getAllTeamMembers().find((member) => {
      if (member.id.toLowerCase() === normalized) return true;
      return getTeamMemberSlug(member).toLowerCase() === normalized;
    }) ?? null
  );
}

/**
 * @deprecated Phase 2: /internal/profile loads public.profiles by auth.uid().
 * This env var is not an identity and is not used to grant access.
 */
export function resolveTemporaryDisplayMemberId(): string | null {
  return process.env.NEXT_PUBLIC_INTERNAL_DEV_USER_ID?.trim() || null;
}

/** @deprecated Not an auth subject. */
export function resolveCurrentUserId(): string | null {
  return resolveTemporaryDisplayMemberId();
}

/**
 * @deprecated Phase 2: do not use as the profile data source.
 */
export function getTemporaryDisplayTeamMember(): TeamMember | null {
  const id = resolveTemporaryDisplayMemberId();
  if (!id) return null;
  return findTeamMemberByIdOrSlug(id);
}

/** @deprecated Display fallback only. Not an authenticated identity. */
export function getCurrentTeamMember(): TeamMember | null {
  return getTemporaryDisplayTeamMember();
}

/** @deprecated Not authorization. Session + profiles.user_id is the boundary. */
export function isOwnProfile(_memberId: string): boolean {
  return false;
}
