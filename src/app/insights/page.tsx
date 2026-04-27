import type { Metadata } from "next";
import { getAllInsightsPosts, getCategories } from "@/content/insights";
import { InsightsPageContent } from "@/components/insights/InsightsPageContent";
import { siteTranslations } from "@/content/siteTranslations";
import { getSiteUrl } from "@/lib/site-url";

const insightsTitle = siteTranslations.EN.insights.pageTitle;
const insightsDescription = siteTranslations.EN.insights.pageSubtitle;

export const metadata: Metadata = {
  title: insightsTitle,
  description: insightsDescription,
  alternates: {
    canonical: `${getSiteUrl()}/insights`,
  },
  openGraph: {
    title: `${insightsTitle} | Sigma`,
    description: insightsDescription,
    url: `${getSiteUrl()}/insights`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${insightsTitle} | Sigma`,
    description: insightsDescription,
  },
};

export default function InsightsPage() {
  const posts = getAllInsightsPosts();
  const categories = getCategories();

  return <InsightsPageContent posts={posts} categories={categories} />;
}
