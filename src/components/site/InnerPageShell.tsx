"use client";

import { MarketingFooter } from "@/components/site/MarketingFooter";
import { MarketingHeader } from "@/components/site/MarketingHeader";
import { PartnerIntentModalHost } from "@/components/partner/PartnerIntentModal";
import { useLanguage } from "@/context/LanguageContext";
import { rtlScriptSurfaceClass } from "@/lib/localeTypography";

export function InnerPageShell({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  return (
    <div className="flex min-h-screen flex-col bg-erie bg-sigma-mesh font-body text-cadet">
      <MarketingHeader />
      <main className={`relative z-10 flex-1 ${rtlScriptSurfaceClass(language)}`}>
        {children}
      </main>
      <MarketingFooter />
      <PartnerIntentModalHost />
    </div>
  );
}
