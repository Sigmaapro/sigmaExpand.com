import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { MarketRegionPageView } from "@/components/site/marketing/MarketRegionPageView";
import { SEO_PAGES, buildPageMetadata, type SeoRouteKey } from "@/content/seo";

const REGION_TO_SEO: Record<string, SeoRouteKey> = {
  uae: "marketsUae",
  turkey: "marketsTurkey",
  iran: "marketsIran",
  china: "marketsChina",
  global: "marketsGlobal",
};

type Props = { params: Promise<{ region: string }> };

export function generateStaticParams() {
  return Object.keys(REGION_TO_SEO).map((region) => ({ region }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const key = REGION_TO_SEO[region];
  if (!key) return {};
  return buildPageMetadata(key);
}

function headingFromTitle(title: string) {
  const i = title.indexOf("|");
  return i === -1 ? title.trim() : title.slice(0, i).trim();
}

export default async function MarketRegionPage({ params }: Props) {
  const { region } = await params;
  const key = REGION_TO_SEO[region];
  if (!key) notFound();
  const seo = SEO_PAGES[key];
  return (
    <InnerPageShell>
      <MarketRegionPageView heading={headingFromTitle(seo.title)} description={seo.description} />
    </InnerPageShell>
  );
}
