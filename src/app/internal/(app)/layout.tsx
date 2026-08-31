import { InternalAppShell } from "@/components/internal/InternalAppShell";
import { requireInternalUser } from "@/lib/internal/auth";

/**
 * Auth is started immediately (middleware already gated the request) but is
 * not awaited before `{children}`. Sigma/Messages can paint without waiting
 * on a second getUser(). Profile still loads its own row; getUser is cached
 * per request. Do not mark this layout force-dynamic — that blocked prefetch.
 */
export default function InternalAppLayout({ children }: { children: React.ReactNode }) {
  const userPromise = requireInternalUser();

  return <InternalAppShell userPromise={userPromise}>{children}</InternalAppShell>;
}
