import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  path: string;
  name: string;
  description: string;
};

export function LegalWebPageStructuredData({ path, name, description }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = getCanonicalUrl(path);
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description,
    isPartOf: { "@type": "WebSite", "@id": `${base}/#website` },
    publisher: { "@type": "Organization", "@id": `${base}/#organization` },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
