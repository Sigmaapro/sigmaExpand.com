import type { Metadata } from "next";
import { ServicePageStructuredData } from "@/components/seo/ServicePageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServiceDetailPageView } from "@/components/site/marketing/ServiceDetailPageView";
import { SEO_PAGES, buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("serviceKolInfrastructure");

export default function KolInfrastructureServicePage() {
  const page = SEO_PAGES.serviceKolInfrastructure;
  return (
    <>
      <ServicePageStructuredData path={page.path} title={page.title} description={page.description} />
      <InnerPageShell>
        <ServiceDetailPageView serviceKey="kolInfrastructure" />
      </InnerPageShell>
    </>
  );
}
