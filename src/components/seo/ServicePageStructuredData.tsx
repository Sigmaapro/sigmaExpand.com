import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

export function ServicePageStructuredData({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}) {
  const base = getSiteUrl().replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    url: getCanonicalUrl(path),
    serviceType: title,
    provider: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Sigma",
      url: `${base}/`,
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
