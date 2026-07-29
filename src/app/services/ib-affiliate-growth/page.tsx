import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("ibAffiliateGrowth");

export default function IbAffiliateGrowthPage() {
  return <DocumentServicePage documentKey="ibAffiliateGrowth" />;
}
