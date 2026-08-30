"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { InternalBottomNav } from "@/components/internal/InternalBottomNav";
import { InternalTopBar } from "@/components/internal/InternalTopBar";

export function InternalAppShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string | null;
}) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="relative z-20 flex min-h-dvh flex-col text-cadet">
      <a
        href="#internal-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#05070e] focus:px-3 focus:py-2 focus:text-sm focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bde0fe]/50"
      >
        Skip to content
      </a>

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
