import type { Metadata } from "next";
import { LegalWebPageStructuredData } from "@/components/seo/LegalWebPageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TermsPageView } from "@/components/site/TermsPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("terms");

export default function TermsPage() {
  return (
    <InnerPageShell>
      <LegalWebPageStructuredData
        path="/terms"
        name="Terms of Use"
        description="Terms governing use of the Sigma website, content, and services. Not a substitute for engagement contracts, which govern partner relationships."
      />
      <TermsPageView />
    </InnerPageShell>
  );
}
