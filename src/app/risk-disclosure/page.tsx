import type { Metadata } from "next";
import { LegalWebPageStructuredData } from "@/components/seo/LegalWebPageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { RiskDisclosurePageView } from "@/components/site/marketing/RiskDisclosurePageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("riskDisclosure");

export default function RiskDisclosurePage() {
  return (
    <InnerPageShell>
      <LegalWebPageStructuredData
        path="/risk-disclosure"
        name="Risk Disclosure"
        description="Sigma is a growth network — not a broker, exchange, or fund. Read what we do, what we don't, and what risks come with crypto, forex, and leveraged markets."
      />
      <RiskDisclosurePageView />
    </InnerPageShell>
  );
}
