import { InternalAppShell } from "@/components/internal/InternalAppShell";
import { requireInternalUser } from "@/lib/internal/auth";

export const dynamic = "force-dynamic";

export default async function InternalAppLayout({ children }: { children: React.ReactNode }) {
  const user = await requireInternalUser();

  return (
    <InternalAppShell email={user.email ?? null}>{children}</InternalAppShell>
  );
}
