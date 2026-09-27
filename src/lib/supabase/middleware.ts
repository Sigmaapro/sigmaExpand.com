import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { INTERNAL_ROUTES, isPublicInternalAuthPath } from "@/lib/internal/routes";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

function copyAuthCookies(from: NextResponse, to: NextResponse): NextResponse {
  from.cookies.getAll().forEach(({ name, value }) => {
    to.cookies.set(name, value);
  });
  for (const header of ["Cache-Control", "Expires", "Pragma"] as const) {
    const value = from.headers.get(header);
    if (value) to.headers.set(header, value);
  }
  return to;
}

/** Forward request headers so the root layout can emit the SIGMA Team manifest. Auth gating is unchanged. */
function nextPreservingRequest(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  if (!requestHeaders.has("x-sigma-internal-app")) {
    requestHeaders.set("x-sigma-internal-app", "1");
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function redirectWithAuthCookies(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string,
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = "";
  return copyAuthCookies(supabaseResponse, NextResponse.redirect(url));
}

/**
 * Refresh the Supabase session and gate `/internal/*`.
 * Public marketing routes are never matched by the root middleware matcher.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  let supabaseResponse = nextPreservingRequest(request);
  const pathname = request.nextUrl.pathname;
  const isAuthPath = isPublicInternalAuthPath(pathname);

  let env: ReturnType<typeof getSupabasePublicEnv>;
  try {
    env = getSupabasePublicEnv();
  } catch {
    if (isAuthPath) return supabaseResponse;
    return redirectWithAuthCookies(request, supabaseResponse, INTERNAL_ROUTES.login);
  }

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, cacheHeaders) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = nextPreservingRequest(request);
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(cacheHeaders).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isAuthPath) {
    return redirectWithAuthCookies(request, supabaseResponse, INTERNAL_ROUTES.login);
  }

  // Recovery must stay on these screens. A signed-in recovery session is not
  // the app session, and bouncing it to SIGMA drops the reset.
  if (
    pathname === INTERNAL_ROUTES.resetPassword ||
    pathname === INTERNAL_ROUTES.forgotPassword
  ) {
    return supabaseResponse;
  }

  if (user && pathname === INTERNAL_ROUTES.login) {
    if (loginHasRecoveryLink(request)) {
      return supabaseResponse;
    }
    if (request.cookies.get("sigma-internal-recovery")?.value === "1") {
      return redirectWithAuthCookies(request, supabaseResponse, INTERNAL_ROUTES.resetPassword);
    }
    return redirectWithAuthCookies(request, supabaseResponse, INTERNAL_ROUTES.sigma);
  }

  return supabaseResponse;
}

function loginHasRecoveryLink(request: NextRequest): boolean {
  const params = request.nextUrl.searchParams;
  const type = params.get("type");
  return (
    params.has("code") ||
    params.has("token_hash") ||
    params.has("error") ||
    params.has("error_code") ||
    type === "recovery" ||
    type === "invite"
  );
}
