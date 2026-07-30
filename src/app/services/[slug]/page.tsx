import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServicePlaceholderPageView } from "@/components/site/marketing/ServicePlaceholderPageView";
import {
  getFinalServiceBySlug,
  getFinalServiceSlugs,
  isFinalServiceSlug,
} from "@/content/services/finalServices";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";

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

  const title = service.title;
  const canonicalPath = service.href;

  return {
    title: { absolute: `${title} | Sigma` },
    description: title,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title,
      description: title,
      url: getCanonicalUrl(canonicalPath),
      siteName: "Sigma",
      locale: "en_US",
      type: "website",
      images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: title,
      images: [absoluteOgImage()],
    },
  };
}

export default async function FinalServicePlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isFinalServiceSlug(slug)) notFound();
  const service = getFinalServiceBySlug(slug);
  if (!service) notFound();

  return (
    <InnerPageShell>
      <ServicePlaceholderPageView service={service} />
    </InnerPageShell>
  );
}
