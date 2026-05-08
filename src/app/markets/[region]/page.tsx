import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { MarketRegionPageView } from "@/components/site/marketing/MarketRegionPageView";
import { getCryptoAgency } from "@/content/sections/cryptoAgency";
import { SEO_PAGES, buildPageMetadata, type SeoRouteKey } from "@/content/seo";
import type { LangCode } from "@/content/types";
import { langFromUnknown } from "@/lib/i18n";

const REGION_TO_SEO: Record<string, SeoRouteKey> = {
  uae: "marketsUae",
  turkey: "marketsTurkey",
  iran: "marketsIran",
  china: "marketsChina",
  global: "marketsGlobal",
};

type Props = {
  params: Promise<{ region: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export function generateStaticParams() {
  return Object.keys(REGION_TO_SEO).map((region) => ({ region }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { region } = await params;
  const { lang: langParam } = await searchParams;
  const lang = (langFromUnknown(langParam) ?? "EN") as LangCode;
  const key = REGION_TO_SEO[region];
  if (!key) return {};
  const base = buildPageMetadata(key);
  const tab = getCryptoAgency(lang).tabs.find((item) => item.href === `/markets/${region}`);
  if (!tab) return base;
  return {
    ...base,
    title: tab.label,
    description: tab.description,
    openGraph: {
      ...base.openGraph,
      title: tab.label,
      description: tab.description,
    },
    twitter: {
      ...base.twitter,
      title: tab.label,
      description: tab.description,
    },
  };
}

function headingFromTitle(title: string) {
  const i = title.indexOf("|");
  return i === -1 ? title.trim() : title.slice(0, i).trim();
}

export default async function MarketRegionPage({ params, searchParams }: Props) {
  const { region } = await params;
  const { lang: langParam } = await searchParams;
  const lang = (langFromUnknown(langParam) ?? "EN") as LangCode;
  const key = REGION_TO_SEO[region];
  if (!key) notFound();
  const seo = SEO_PAGES[key]!;
  const crypto = getCryptoAgency(lang);
  const tab = crypto.tabs.find((item) => item.href === `/markets/${region}`);
  const heading = tab?.label ?? headingFromTitle(seo.title);
  const description = tab?.description ?? seo.description;

  return (
    <InnerPageShell>
      <MarketRegionPageView heading={heading} description={description} marketsLabel={crypto.eyebrow} />
    </InnerPageShell>
  );
}
