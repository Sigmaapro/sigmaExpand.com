import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

const contactTitle = "Connect";
const contactDescription =
  "Official channels, social profiles, and contact — Sigma Web3 growth infrastructure.";

export const metadata: Metadata = {
  title: contactTitle,
  description: contactDescription,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
  },
  openGraph: {
    title: `${contactTitle} | Sigma`,
    description: contactDescription,
    url: `${getSiteUrl()}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${contactTitle} | Sigma`,
    description: contactDescription,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
