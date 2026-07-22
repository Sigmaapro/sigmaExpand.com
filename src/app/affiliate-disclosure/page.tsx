import type { Metadata } from "next";
import { LegalWebPageStructuredData } from "@/components/seo/LegalWebPageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { AffiliateDisclosurePageView } from "@/components/site/marketing/AffiliateDisclosurePageView";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";

const TITLE = "Affiliate Disclosure | How Sigma Gets Paid";
const DESCRIPTION =
  "Sigma earns through service fees, performance arrangements, referrals, affiliate links, and partnership commercials. Full disclosure of how money moves in our network.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/affiliate-disclosure",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: getCanonicalUrl("/affiliate-disclosure"),
    siteName: "Sigma",
    locale: "en_US",
    type: "website",
    images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absoluteOgImage()],
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <InnerPageShell>
      <LegalWebPageStructuredData path="/affiliate-disclosure" name="Affiliate Disclosure" description={DESCRIPTION} />
      <AffiliateDisclosurePageView />
    </InnerPageShell>
  );
}
