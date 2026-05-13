import type { Metadata } from "next";
import Image from "next/image";
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
      <Image
        src="/images/seo/services-1.jpg"
        alt={alts.services.servicesDashboard}
        width={1200}
        height={630}
        className="hidden"
        sizes="1px"
      />
      <Image
        src="/images/seo/services-2.jpg"
        alt={alts.services.liquidityExchange}
        width={1200}
        height={630}
        className="hidden"
        sizes="1px"
      />
      <InnerPageShell>
        <ServicesPageView />
      </InnerPageShell>
    </>
  );
}
