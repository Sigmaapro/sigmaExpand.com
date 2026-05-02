"use client";

import { MarketingFooter } from "@/components/site/MarketingFooter";
import { MarketingHeader } from "@/components/site/MarketingHeader";

export function InnerPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-erie bg-sigma-mesh font-body text-cadet">
      <MarketingHeader />
      <main className="relative z-10 flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
