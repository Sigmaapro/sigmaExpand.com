import type { Metadata } from "next";
import { AboutStructuredData } from "@/components/seo/AboutStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { AboutPageView } from "@/components/site/marketing/AboutPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("about");

export default function AboutPage() {
  return (
    <>
      <AboutStructuredData />
      <InnerPageShell>
        <AboutPageView />
      </InnerPageShell>
    </>
  );
}
