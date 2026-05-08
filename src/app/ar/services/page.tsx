import type { Metadata } from "next";
import { ServicesStructuredData } from "@/components/seo/ServicesStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicesPageView } from "@/components/site/marketing/ServicesPageView";
import { buildArabicServicesMetadata } from "@/content/seo";

export const metadata: Metadata = buildArabicServicesMetadata();

export default function ArabicServicesPage() {
  return (
    <>
      <ServicesStructuredData lang="AR" />
      <InnerPageShell>
        <ServicesPageView />
      </InnerPageShell>
    </>
  );
}
