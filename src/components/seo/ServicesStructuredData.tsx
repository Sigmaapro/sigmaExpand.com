import { getCanonicalUrl } from "@/content/seo";
import type { LangCode } from "@/content/types";
import { servicesPageMetaByLang } from "@/content/global/marketing/servicesContent";
import { getSiteUrl } from "@/lib/site-url";

/** Service schema for the services marketing page. */
export function ServicesStructuredData({ lang = "EN" }: { lang?: LangCode }) {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = getCanonicalUrl(lang === "AR" ? "/ar/services" : "/services");
  const meta = servicesPageMetaByLang[lang];

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: meta.title,
    description: meta.description,
    url,
    serviceType: "Web3 growth and marketing infrastructure",
    provider: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Sigma",
      url: base,
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
