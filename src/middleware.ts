import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js 15.5 uses `middleware.ts` (the `proxy.ts` convention is Next.js 16+).
 * Matcher is intentionally limited to `/internal` so public marketing routes
 * never enter session refresh or auth redirects.
 */
export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/internal", "/internal/:path*"],
};
