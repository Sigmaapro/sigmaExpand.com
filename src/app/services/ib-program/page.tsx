import type { Metadata } from "next";
import { ServicePageStructuredData } from "@/components/seo/ServicePageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServiceDetailPageView } from "@/components/site/marketing/ServiceDetailPageView";
import { SEO_PAGES, buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("serviceIbProgram");

export default function IbProgramServicePage() {
  const page = SEO_PAGES.serviceIbProgram;
  return (
    <>
      <ServicePageStructuredData path={page.path} title={page.title} description={page.description} />
      <InnerPageShell>
        <ServiceDetailPageView serviceKey="ibProgram" />
      </InnerPageShell>
    </>
  );
}
