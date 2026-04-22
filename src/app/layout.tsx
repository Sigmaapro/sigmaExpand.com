import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ProductionAnalytics } from "@/components/ProductionAnalytics";
import { SITE_DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { getSiteUrl } from "@/lib/site-url";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sigma — Web3 Growth Infrastructure",
    template: "%s | Sigma",
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: "Sigma",
  keywords: [
    "Sigma",
    "Web3",
    "crypto",
    "growth",
    "liquidity",
    "exchange",
    "protocol",
    "distribution",
    "market infrastructure",
  ],
  authors: [{ name: "Sigma", url: siteUrl }],
  creator: "Sigma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sigma",
    title: "Sigma — Web3 Growth Infrastructure",
    description: SITE_DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma — Web3 Growth Infrastructure",
    description: SITE_DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0c12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`min-h-screen bg-erie ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-erie font-body text-cadet antialiased">
        <Providers>{children}</Providers>
        <ProductionAnalytics />
      </body>
    </html>
  );
}
