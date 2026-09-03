import type { Metadata } from "next";
import { DocumentServicePage, getDocumentServiceMetadata } from "@/components/services/DocumentServicePage";

/** Pending FINAL taxonomy mapping — keep page live but stop indexing. */
const PENDING_TAXONOMY_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export const metadata: Metadata = {
  ...getDocumentServiceMetadata("web3GrowthAgency"),
  robots: PENDING_TAXONOMY_ROBOTS,
};

export default function Web3GrowthAgencyPage() {
  return <DocumentServicePage documentKey="web3GrowthAgency" />;
}
