import type { Metadata } from "next";
import { getAllInsightsPosts, getCategories } from "@/content/insights";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";
import { buildInsightsIndexMetadata } from "@/content/seo";
import { siteTranslations } from "@/content/siteTranslations";

/** SEO title (kept under 60 characters); visible H1 still uses `t.insights.pageTitle`. */
const insightsIndexMetadataTitle =
  "Sigma Insights — Web3 Growth & Crypto Marketing Briefs";
const insightsDescription = siteTranslations.EN.insights.pageSubtitle;

export const metadata: Metadata = buildInsightsIndexMetadata(
  insightsIndexMetadataTitle,
  insightsDescription,
);

export default function InsightsPage() {
  const posts = getAllInsightsPosts();
  const categories = getCategories();

  return <InsightsPageContent posts={posts} categories={categories} />;
}
