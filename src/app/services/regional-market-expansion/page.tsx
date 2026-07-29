import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("regionalMarketExpansion");

export default function RegionalMarketExpansionPage() {
  return <DocumentServicePage documentKey="regionalMarketExpansion" />;
}
