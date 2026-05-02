import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { AboutPageView } from "@/components/site/marketing/AboutPageView";
import { aboutPageMetaByLang } from "@/content/global/marketing/aboutContent";

const m = aboutPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function AboutPage() {
  return (
    <InnerPageShell>
      <AboutPageView />
    </InnerPageShell>
  );
}
