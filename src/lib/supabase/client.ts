import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

/**
 * Browser Supabase client. Session is stored in cookies by @supabase/ssr.
 * Do not persist tokens in localStorage or sessionStorage.
 */
export function createClient() {
  const { url, publishableKey } = getSupabasePublicEnv();
  return createBrowserClient(url, publishableKey);
}
