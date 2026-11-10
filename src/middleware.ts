import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Next.js 15.5 uses `middleware.ts` (the `proxy.ts` convention is Next.js 16+).
 * Matcher stays off public marketing routes except `/`, which only forwards a
 * request header so the homepage FAQ JSON-LD can render in the document head.
 * That request does not refresh a session or redirect.
 */
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-sigma-home-faq", "1");
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  return updateSession(request);
}

export const config = {
  matcher: ["/", "/internal", "/internal/:path*"],
};
