import type { Metadata } from "next";
import { LegalWebPageStructuredData } from "@/components/seo/LegalWebPageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { CookiesPageView } from "@/components/site/marketing/CookiesPageView";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";

const TITLE = "Cookie Policy | Sigma Growth Network";
const DESCRIPTION =
  "What cookies Sigma uses, why, and how to manage them. GDPR / KVKK / UAE PDPL compliant cookie usage.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/cookies",
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
    url: getCanonicalUrl("/cookies"),
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

export default function CookiesPage() {
  return (
    <InnerPageShell>
      <LegalWebPageStructuredData path="/cookies" name="Cookie Policy" description={DESCRIPTION} />
      <CookiesPageView />
    </InnerPageShell>
  );
}
