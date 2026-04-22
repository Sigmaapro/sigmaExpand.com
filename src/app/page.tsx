import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SITE_DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { getSiteUrl } from "@/lib/site-url";

// Isolate the heavy client tree in its own async chunk (more stable Webpack dev/HMR).
const SigmaLanding = dynamic(() => import("@/components/sigma/SigmaLanding"), {
  loading: () => (
    <div
      className="min-h-screen bg-erie font-body text-cadet antialiased"
      style={{ backgroundColor: "#212529", minHeight: "100vh" }}
      aria-busy="true"
      aria-label="Loading"
    />
  ),
});

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
