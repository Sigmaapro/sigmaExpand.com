import { NextResponse } from "next/server";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";
import { createClient } from "@/lib/supabase/server";

function safeInternalNext(next: string | null): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) {
    return INTERNAL_ROUTES.sigma;
  }
  if (!next.startsWith(INTERNAL_ROUTES.root)) {
    return INTERNAL_ROUTES.sigma;
  }
  return next;
}

/**
 * PKCE / invite-link callback. Password login does not require this route,
 * but it must remain reachable unauthenticated so Auth redirects can complete.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeInternalNext(searchParams.get("next"));

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch {
      return NextResponse.redirect(`${origin}${INTERNAL_ROUTES.login}`);
    }
  }

  return NextResponse.redirect(`${origin}${INTERNAL_ROUTES.login}`);
}
