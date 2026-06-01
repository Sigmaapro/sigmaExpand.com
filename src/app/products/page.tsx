import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ProductsPageView } from "@/components/site/marketing/ProductsPageView";
import { buildPageMetadata } from "@/content/seo";

export const metadata: Metadata = buildPageMetadata("products");

export default function ProductsPage() {
  return (
    <InnerPageShell>
      <ProductsPageView />
    </InnerPageShell>
  );
}
