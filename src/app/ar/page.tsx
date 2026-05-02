import type { Metadata } from "next";
import SigmaLanding from "@/components/sigma/SigmaLanding";
import { buildArabicHomeMetadata } from "@/content/seo";

export const metadata: Metadata = buildArabicHomeMetadata();

export default function ArabicHomePage() {
  return <SigmaLanding />;
}
