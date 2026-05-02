import type { Metadata } from "next";
import { SITE_DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { getSiteUrl } from "@/lib/site-url";
import SigmaLanding from "@/components/sigma/SigmaLanding";

/**
 * Static import avoids flaky Webpack dev runtime: `__webpack_modules__[moduleId] is not a function`
 * when the async chunk for `dynamic()` fails to initialize after HMR/edits.
 */

export const metadata: Metadata = {
  title: { absolute: "Sigma — Web3 Growth Infrastructure" },
  description: SITE_DEFAULT_DESCRIPTION,
  alternates: {
    canonical: getSiteUrl(),
  },
  openGraph: {
    title: "Sigma — Web3 Growth Infrastructure",
    description: SITE_DEFAULT_DESCRIPTION,
    url: getSiteUrl(),
  },
  twitter: {
    title: "Sigma — Web3 Growth Infrastructure",
    description: SITE_DEFAULT_DESCRIPTION,
  },
};

export default function Home() {
  return <SigmaLanding />;
}
