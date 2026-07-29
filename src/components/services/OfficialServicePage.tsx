import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageStructuredData } from "@/components/seo/ServicePageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { getCanonicalUrl, absoluteOgImage } from "@/content/seo";
import { getServiceBySlug, type ServiceSlug } from "@/content/services";
import { ServicePageTemplate } from "./ServicePageTemplate";

export function getOfficialServiceMetadata(slug: ServiceSlug): Metadata {
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: { absolute: service.seo.title },
    description: service.seo.description,
    alternates: { canonical: service.href },
    openGraph: {
      title: service.seo.ogTitle ?? service.seo.title,
      description: service.seo.ogDescription ?? service.seo.description,
      url: getCanonicalUrl(service.href),
      siteName: "Sigma",
      type: "website",
      images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.twitterTitle ?? service.seo.title,
      description: service.seo.twitterDescription ?? service.seo.description,
      images: [absoluteOgImage()],
    },
  };
}

export function OfficialServicePage({ slug }: { slug: ServiceSlug }) {
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <ServicePageStructuredData
        path={service.href}
        title={service.title}
        description={service.seo.description}
      />
      <InnerPageShell>
        <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
          <div className="relative z-10 mx-auto max-w-[1720px] px-0 py-0">
            <ServicePageTemplate service={service} />
          </div>
        </div>
      </InnerPageShell>
    </>
  );
}
