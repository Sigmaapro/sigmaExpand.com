import type { MetadataRoute } from "next";
import { getAllInsightsPosts } from "@/content/insights";
import { SUPPORTED_LANGS } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

const MARKET_REGIONS = ["uae", "turkey", "iran", "china", "global"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const posts = getAllInsightsPosts();
  const withLang = (path: string, lang: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalizedPath}?lang=${lang}`;
  };

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const localizedStaticRoutes = ["/", "/services", "/insights", "/about", "/contact", "/faq", "/privacy", "/team"];
  const localized: MetadataRoute.Sitemap = localizedStaticRoutes.flatMap((path) =>
    SUPPORTED_LANGS.map((lang) => ({
      url: withLang(path, lang),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 0.95 : 0.6,
    })),
  );

  const markets: MetadataRoute.Sitemap = MARKET_REGIONS.map((region) => ({
    url: `${base}/markets/${region}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${base}/ar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/ar/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.72,
    },
    {
      url: `${base}/ar/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${base}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.35,
    },
    {
      url: `${base}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.35,
    },
    ...markets,
    ...articles,
    ...localized,
  ];
}
