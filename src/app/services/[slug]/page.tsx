import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CryptoExchangeServiceDraftPage } from "@/components/services/CryptoExchangeServiceDraftPage";
import { ImportedServiceDraftPage } from "@/components/services/ImportedServiceDraftPage";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicePlaceholderPageView } from "@/components/site/marketing/ServicePlaceholderPageView";
import {
  getFinalServiceBySlug,
  getFinalServiceSlugs,
  isFinalServiceSlug,
} from "@/content/services/finalServices";
import {
  getImportedFinalServiceDocument,
  isImportedFinalServiceSlug,
} from "@/content/services/importedFinalServiceDocuments";
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

  const imported = getImportedFinalServiceDocument(slug);
  const title = imported?.metaTitle ?? `${service.title} | Sigma`;
  const description = imported?.metaDescription ?? service.title;
  const canonicalPath = service.href;
  const keywords = imported
    ? [imported.primaryKeyword, ...imported.secondaryKeywords]
    : undefined;

  const robots = isImportedFinalServiceSlug(slug)
    ? {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
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
      images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: imported?.title ?? service.title }],
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
