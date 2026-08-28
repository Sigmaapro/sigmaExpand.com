import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CryptoExchangeServiceDraftPage } from "@/components/services/CryptoExchangeServiceDraftPage";
import { ImportedServiceDraftPage } from "@/components/services/ImportedServiceDraftPage";
import { ServiceV2Page } from "@/components/services/v2/ServiceV2Page";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicePlaceholderPageView } from "@/components/site/marketing/ServicePlaceholderPageView";
import {
  getFinalServiceBySlug,
  getFinalServiceSlugs,
  isFinalServiceSlug,
} from "@/content/services/finalServices";
import { getImportedFinalServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { getServiceV2Content } from "@/content/services/v2";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";

const CRYPTO_EXCHANGE_SLUG = "crypto-exchange-growth-market-development";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getFinalServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getFinalServiceBySlug(slug);
  if (!service) return {};

  const v2 = getServiceV2Content(slug);
  const imported = v2 ? undefined : getImportedFinalServiceDocument(slug);
  const title = v2?.meta.title ?? imported?.metaTitle ?? `${service.title} | Sigma`;
  const description = v2?.meta.description ?? imported?.metaDescription ?? service.title;
  const canonicalPath = service.href;
  const keywords = imported
    ? [imported.primaryKeyword, ...imported.secondaryKeywords]
    : undefined;
  const indexable = Boolean(v2);

  const robots = {
    index: indexable,
    follow: true,
    googleBot: {
      index: indexable,
      follow: true,
    },
  };

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots,
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(canonicalPath),
      siteName: "Sigma",
      locale: "en_US",
      type: "website",
      images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: v2?.title ?? imported?.title ?? service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteOgImage()],
    },
  };
}

export default async function FinalServicePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isFinalServiceSlug(slug)) notFound();
  const service = getFinalServiceBySlug(slug);
  if (!service) notFound();

  const v2 = getServiceV2Content(slug);
  if (v2) {
    return (
      <InnerPageShell>
        <ServiceV2Page content={v2} />
      </InnerPageShell>
    );
  }

  const imported = getImportedFinalServiceDocument(slug);
  if (imported) {
    if (slug === CRYPTO_EXCHANGE_SLUG) {
      return (
        <InnerPageShell>
          <CryptoExchangeServiceDraftPage document={imported} />
        </InnerPageShell>
      );
    }
    return (
      <InnerPageShell>
        <ImportedServiceDraftPage document={imported} />
      </InnerPageShell>
    );
  }

  return (
    <InnerPageShell>
      <ServicePlaceholderPageView service={service} />
    </InnerPageShell>
  );
}
