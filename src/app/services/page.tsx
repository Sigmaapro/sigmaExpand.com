import type { Metadata } from "next";
import { ServicesStructuredData } from "@/components/seo/ServicesStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicesPageView } from "@/components/site/marketing/ServicesPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("services");

export default function ServicesPage() {
  return (
    <>
      <ServicesStructuredData />
      <img
        src="/images/seo/services-1.jpg"
        alt="crypto marketing services dashboard"
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/services-2.jpg"
        alt="web3 liquidity and exchange growth"
        style={{ display: "none" }}
      />
      <InnerPageShell>
        <ServicesPageView />
      </InnerPageShell>
    </>
  );
}
