import type { MetadataRoute } from "next";
import { getAllInsightsPosts } from "@/content/insights";
import { getFinalServices } from "@/content/services/finalServices";
import {
  getAllTeamMembers,
  getTeamMemberSlug,
  isTeamMemberPubliclyIndexable,
} from "@/content/global/marketing/teamContent";
import { getSiteUrl } from "@/lib/site-url";

const MARKET_REGIONS = ["wana", "cis", "apac", "europe", "latam"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const posts = getAllInsightsPosts();

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/insights/${p.slug}`,
    lastModified: new Date(p.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const markets: MetadataRoute.Sitemap = MARKET_REGIONS.map((region) => ({
    url: `${base}/markets/${region}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const services: MetadataRoute.Sitemap = getFinalServices().map((service) => ({
    url: `${base}${service.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const seenTeamSlugs = new Set<string>();
  const teamProfiles: MetadataRoute.Sitemap = [];
  for (const member of getAllTeamMembers()) {
    if (!isTeamMemberPubliclyIndexable(member)) continue;
    const slug = getTeamMemberSlug(member);
    if (seenTeamSlugs.has(slug)) continue;
    seenTeamSlugs.add(slug);
    teamProfiles.push({
      url: `${base}/team/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }

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
      url: `${base}/markets`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.68,
    },
    {
      url: `${base}/products`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.62,
    },
    {
      url: `${base}/risk-disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.58,
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
    ...services,
    ...teamProfiles,
    ...articles,
  ];
}
