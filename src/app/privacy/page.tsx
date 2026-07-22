import type { Metadata } from "next";
import { LegalWebPageStructuredData } from "@/components/seo/LegalWebPageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { PrivacyPageView } from "@/components/site/marketing/PrivacyPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <InnerPageShell>
      <LegalWebPageStructuredData
        path="/privacy"
        name="Privacy Policy"
        description="How Sigma collects, uses, stores, and shares information about partners, KOLs, IBs, traders, and visitors. GDPR, KVKK, and UAE PDPL compliant."
      />
      <PrivacyPageView />
    </InnerPageShell>
  );
}
