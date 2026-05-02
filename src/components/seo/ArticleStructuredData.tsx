import type { InsightPost } from "@/content/insights";
import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  post: InsightPost;
};

export function ArticleStructuredData({ post }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const url = getCanonicalUrl(`/insights/${post.slug}`);
  const img = post.ogImage ?? post.coverImage;
  const imageUrl = img.startsWith("http") ? img : `${base}${img.startsWith("/") ? img : `/${img}`}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: [imageUrl],
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Sigma",
      logo: {
        "@type": "ImageObject",
        url: `${base}/icon.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    isPartOf: { "@type": "WebSite", "@id": `${base}/#website` },
    articleSection: post.category,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function BreadcrumbInsightStructuredData({ post }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: getCanonicalUrl("/insights"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: getCanonicalUrl(`/insights/${post.slug}`),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
