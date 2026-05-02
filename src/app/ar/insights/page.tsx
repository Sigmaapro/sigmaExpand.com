import type { Metadata } from "next";
import { getAllInsightsPosts, getCategories } from "@/content/insights";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";
import { buildArabicInsightsIndexMetadata } from "@/content/seo";

export const metadata: Metadata = buildArabicInsightsIndexMetadata();

export default function ArabicInsightsPage() {
  const posts = getAllInsightsPosts();
  const categories = getCategories();

  return <InsightsPageContent posts={posts} categories={categories} />;
}
