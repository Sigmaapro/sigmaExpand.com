import type { SiteTranslations } from "@/content/types";

type Categories = SiteTranslations["insights"]["categories"];

/** Maps CMS insight category keys to localized nav labels (same keys as `InsightsListingClient`). */
export function getInsightCategoryLabel(category: string, c: Categories): string {
  if (category === "Growth") return c.growth;
  if (category === "Distribution") return c.distribution;
  if (category === "Liquidity") return c.liquidity;
  return category;
}
