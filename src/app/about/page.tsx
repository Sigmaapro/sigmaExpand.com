import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { AboutPageView } from "@/components/site/marketing/AboutPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("about");

export default function AboutPage() {
  return (
    <InnerPageShell>
      <AboutPageView />
    </InnerPageShell>
  );
}
