import type { Metadata } from "next";
import { ServicePageStructuredData } from "@/components/seo/ServicePageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServiceDetailPageView } from "@/components/site/marketing/ServiceDetailPageView";
import { SEO_PAGES, buildPageMetadata } from "@/content/seo";

/** Pending FINAL taxonomy mapping — keep page live but stop indexing. */
const PENDING_TAXONOMY_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export const metadata: Metadata = {
  ...buildPageMetadata("serviceTraderNetwork"),
  robots: PENDING_TAXONOMY_ROBOTS,
};

export default function TraderNetworkServicePage() {
  const page = SEO_PAGES.serviceTraderNetwork;
  return (
    <>
      <ServicePageStructuredData path={page.path} title={page.title} description={page.description} />
      <InnerPageShell>
        <ServiceDetailPageView serviceKey="traderNetwork" />
      </InnerPageShell>
    </>
  );
}
