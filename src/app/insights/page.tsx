import type { Metadata } from "next";
import {
  getAllInsightsPosts,
  getCategories,
  insightsListingCopy,
} from "@/content/insights";
import { InsightsListingClient } from "@/components/insights/InsightsListingClient";
import { getSiteUrl } from "@/lib/site-url";

const insightsTitle = "Insights";
const insightsDescription =
  "Briefings on liquidity, distribution, and growth infrastructure for Web3 institutions.";

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
  const copy = insightsListingCopy;

  return (
    <>
      <section className="relative border-b border-white/[0.06] px-3 pb-10 pt-8 sm:px-6 sm:pb-16 sm:pt-14 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-[#1c39bb] sm:text-[11px]">
            INSIGHTS
          </p>
          <h1 className="font-display mt-3 text-[clamp(1.75rem,7vw,2.5rem)] font-semibold uppercase leading-[1.08] tracking-tight text-[#f8f9fa] text-balance sm:mt-4 sm:text-5xl md:text-6xl">
            {copy.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#adb5bd] text-pretty sm:mt-5 sm:text-base md:text-lg">
            {copy.pageSubtitle}
          </p>
        </div>
      </section>
      <InsightsListingClient
        posts={posts}
        categories={categories}
        copy={copy}
      />
    </>
  );
}
