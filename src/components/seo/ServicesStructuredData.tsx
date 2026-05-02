import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

/** Service schema for the services marketing page. */
export function ServicesStructuredData() {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = getCanonicalUrl("/services");

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sigma Web3 growth infrastructure",
    description:
      "Liquidity programs, compliance-aware execution, technical integration, and Web3-native growth systems for protocols and exchanges.",
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
