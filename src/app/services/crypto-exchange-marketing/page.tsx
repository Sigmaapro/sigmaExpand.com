import type { Metadata } from "next";
import { CryptoExchangeMarketingExperience } from "@/components/services/pilots/CryptoExchangeMarketingExperience";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { CEM_META } from "@/content/services/pilots/cryptoExchangeMarketing.content";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";

export const metadata: Metadata = {
  title: { absolute: CEM_META.title },
  description: CEM_META.description,
  alternates: {
    canonical: CEM_META.path,
  },
  openGraph: {
    title: CEM_META.title,
    description: CEM_META.description,
    url: getCanonicalUrl(CEM_META.path),
    siteName: "Sigma",
    locale: "en_US",
    type: "website",
    images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: CEM_META.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: CEM_META.title,
    description: CEM_META.description,
    images: [absoluteOgImage()],
  },
};

/**
 * Bypass MarketingPageShell overflow-hidden so sticky cinematic pins work.
 */
export default function CryptoExchangeMarketingPage() {
  return (
    <InnerPageShell>
      <div className="relative isolate min-h-0 flex-1">
        <div className="relative z-10 mx-auto w-full max-w-none px-0 py-0">
          <CryptoExchangeMarketingExperience />
        </div>
      </div>
    </InnerPageShell>
  );
}
