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
      <InnerPageShell>
        <ServicesPageView />
      </InnerPageShell>
    </>
  );
}
