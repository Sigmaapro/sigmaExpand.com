import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ServicesStructuredData } from "@/components/seo/ServicesStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicesPageView } from "@/components/site/marketing/ServicesPageView";
import { getSeoImageAlts } from "@/content/global/seoImageAlts";
import { buildPageMetadata } from "@/content/seo";
import { langFromUnknown } from "@/lib/i18n";

export const metadata: Metadata = buildPageMetadata("services");

export default async function ServicesPage() {
  const cookieStore = await cookies();
  const lang = langFromUnknown(cookieStore.get("sigma-lang")?.value) ?? "EN";
  const alts = getSeoImageAlts(lang);
  return (
    <>
      <ServicesStructuredData />
      <img
        src="/images/seo/services-1.jpg"
        alt={alts.services.servicesDashboard}
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/services-2.jpg"
        alt={alts.services.liquidityExchange}
        style={{ display: "none" }}
      />
      <InnerPageShell>
        <ServicesPageView />
      </InnerPageShell>
    </>
  );
}
