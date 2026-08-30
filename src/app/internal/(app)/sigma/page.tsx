import type { Metadata } from "next";
import { SigmaFeed } from "@/components/internal/feed/SigmaFeed";
import { getInternalFeed } from "@/content/internal/feed.demo";

export const metadata: Metadata = {
  title: { absolute: "SIGMA" },
  robots: { index: false, follow: false },
};

export default function InternalSigmaPage() {
  const items = getInternalFeed();
  return <SigmaFeed items={items} />;
}
