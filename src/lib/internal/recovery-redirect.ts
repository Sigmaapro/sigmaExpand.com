import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);
const PRODUCTION_HOSTS = new Set(["sigmaa.pro", "www.sigmaa.pro"]);

function firstHeaderValue(value: string | null | undefined): string {
  return (value ?? "").split(",")[0]?.trim() ?? "";
}

function hostnameOf(host: string): string {
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end > 0 ? host.slice(1, end).toLowerCase() : host.toLowerCase();
  }
  return (host.split(":")[0] ?? "").toLowerCase();
}

/**
 * Absolute URL Supabase will redirect to after the recovery email is verified.
 * Local requests stay on that host so the PKCE cookie matches the browser.
 * Production requests always return to https://sigmaa.pro.
 * Any other host falls back to production so a spoofed Host cannot choose the redirect.
 */
export function recoveryRedirectUrl(input: {
  host: string | null | undefined;
  forwardedHost?: string | null | undefined;
}): string {
  const host = firstHeaderValue(input.forwardedHost) || firstHeaderValue(input.host);
  const hostname = hostnameOf(host);
  const path = INTERNAL_ROUTES.resetPassword;

  if (LOCAL_HOSTS.has(hostname) && host) {
    return `http://${host}${path}`;
  }

  if (PRODUCTION_HOSTS.has(hostname)) {
    return `${PRODUCTION_SITE_ORIGIN}${path}`;
  }

  return `${PRODUCTION_SITE_ORIGIN}${path}`;
}
