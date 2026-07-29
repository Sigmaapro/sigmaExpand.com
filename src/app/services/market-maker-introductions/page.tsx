import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

export const metadata: Metadata = getDocumentServiceMetadata("marketMakerIntroductions");

export default function MarketMakerIntroductionsPage() {
  return <DocumentServicePage documentKey="marketMakerIntroductions" />;
}
