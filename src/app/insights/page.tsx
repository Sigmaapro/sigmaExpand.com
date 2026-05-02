import type { Metadata } from "next";
import { getAllInsightsPosts, getCategories } from "@/content/insights";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";
import { buildInsightsIndexMetadata } from "@/content/seo";
import { siteTranslations } from "@/content/siteTranslations";

const insightsTitle = siteTranslations.EN.insights.pageTitle;
const insightsDescription = siteTranslations.EN.insights.pageSubtitle;

export const metadata: Metadata = buildInsightsIndexMetadata(insightsTitle, insightsDescription);

export default function InsightsPage() {
  const posts = getAllInsightsPosts();
  const categories = getCategories();

  return <InsightsPageContent posts={posts} categories={categories} />;
}
