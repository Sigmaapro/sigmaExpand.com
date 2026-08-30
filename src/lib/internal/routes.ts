/**
 * Internal team-app routes.
 * Kept out of public `ROUTES` so marketing nav never links here.
 */
export const INTERNAL_ROUTES = {
  root: "/internal",
  login: "/internal/login",
  authCallback: "/internal/auth/callback",
  sigma: "/internal/sigma",
  profile: "/internal/profile",
  messages: "/internal/messages",
} as const;

/** Unauthenticated visitors may reach these `/internal` paths. */
export function isPublicInternalAuthPath(pathname: string): boolean {
  return (
    pathname === INTERNAL_ROUTES.login ||
    pathname === INTERNAL_ROUTES.authCallback ||
    pathname.startsWith(`${INTERNAL_ROUTES.authCallback}/`)
  );
}

export type InternalNavId = "profile" | "sigma" | "messages";

export const INTERNAL_NAV: ReadonlyArray<{
  id: InternalNavId;
  href: string;
  label: string;
}> = [
  { id: "profile", href: INTERNAL_ROUTES.profile, label: "Profile" },
  { id: "sigma", href: INTERNAL_ROUTES.sigma, label: "SIGMA" },
  { id: "messages", href: INTERNAL_ROUTES.messages, label: "Messages" },
];

export function internalNavIdFromPath(pathname: string): InternalNavId {
  if (pathname.startsWith(INTERNAL_ROUTES.profile)) return "profile";
  if (pathname.startsWith(INTERNAL_ROUTES.messages)) return "messages";
  return "sigma";
}

export function publicTeamProfileHref(slug: string): string {
  return `/team/${slug}`;
}
