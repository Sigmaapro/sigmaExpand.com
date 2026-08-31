"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { InternalBottomNav } from "@/components/internal/InternalBottomNav";
import { InternalTopBar } from "@/components/internal/InternalTopBar";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

const PREFETCH_HREFS = [
  INTERNAL_ROUTES.profile,
  INTERNAL_ROUTES.sigma,
  INTERNAL_ROUTES.messages,
] as const;

function AuthEmailCapture({
  userPromise,
  onEmail,
}: {
  userPromise: Promise<User>;
  onEmail: (email: string | null) => void;
}) {
  const user = use(userPromise);
  useEffect(() => {
    onEmail(user.email ?? null);
  }, [onEmail, user.email]);
  return null;
}

export function InternalAppShell({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise: Promise<User>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  useEffect(() => {
    for (const href of PREFETCH_HREFS) {
      router.prefetch(href);
    }
  }, [router]);

  return (
    <div className="relative z-20 flex min-h-dvh flex-col text-cadet">
      <a
        href="#internal-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#05070e] focus:px-3 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bde0fe]/50"
      >
        Skip to content
      </a>

      <Suspense fallback={null}>
        <AuthEmailCapture userPromise={userPromise} onEmail={setEmail} />
      </Suspense>
      <InternalTopBar email={email} />

      <main
        id="internal-main"
        ref={mainRef}
        tabIndex={-1}
        className="internal-page relative z-20 mx-auto w-full max-w-[1180px] flex-1 px-[var(--internal-page-gutter)] pb-[var(--internal-dock-clearance)] pt-3 outline-none sm:pt-6 lg:pt-20"
      >
        {children}
      </main>

      <InternalBottomNav />
    </div>
  );
}
