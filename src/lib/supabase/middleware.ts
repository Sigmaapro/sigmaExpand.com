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
  let supabaseResponse = NextResponse.next({ request });
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
        supabaseResponse = NextResponse.next({ request });
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

  if (user && pathname === INTERNAL_ROUTES.login) {
    return redirectWithAuthCookies(request, supabaseResponse, INTERNAL_ROUTES.sigma);
  }

  return supabaseResponse;
}
