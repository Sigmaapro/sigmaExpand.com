import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicesPageView } from "@/components/site/marketing/ServicesPageView";
import { servicesPageMetaByLang } from "@/content/global/marketing/servicesContent";

const m = servicesPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function ServicesPage() {
  return (
    <InnerPageShell>
      <ServicesPageView />
    </InnerPageShell>
  );
}
