import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Noto_Sans_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ProductionAnalytics } from "@/components/ProductionAnalytics";
import { GlobalStructuredData } from "@/components/seo/GlobalStructuredData";
import { SEO_PAGES } from "@/content/seo";
import type { LangCode } from "@/content/types";
import { buildLanguageAlternates, HTML_LANG_BY_CODE, isRtlLang, langFromUnknown } from "@/lib/i18n";
import { SITE_DEFAULT_DESCRIPTION } from "@/lib/site-seo";
import { getSiteUrl, PRODUCTION_SITE_ORIGIN } from "@/lib/site-url";

/** Stable publisher URL for meta tags + authors (production host; SEO extensions expect this). */
const PUBLISHER_SITE_URL = `${PRODUCTION_SITE_ORIGIN}/`;

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

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-fa",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Resolved from `NEXT_PUBLIC_SITE_URL` when safe; never preview `*.vercel.app` deployment hosts. */
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sigma | Web3 Growth, Liquidity & Crypto Exchange Marketing",
    template: "%s | Sigma",
  },
  description: SITE_DEFAULT_DESCRIPTION,
  applicationName: "Sigma",
  keywords: SEO_PAGES.home.keywords,
  /** Default locale hint for crawlers (URLs are not localized per-path). Per-path canonicals live on each route’s metadata. */
  alternates: {
    languages: buildLanguageAlternates("/"),
  },
  authors: [{ name: "Sigma" }],
  creator: "Sigma",
  publisher: "Sigma",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sigma",
    title: "Sigma | Web3 Growth, Liquidity & Crypto Exchange Marketing",
    description: SITE_DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Sigma | Web3 Growth, Liquidity & Crypto Marketing",
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
  const cookieStore = cookies();
  const initialLang = (langFromUnknown(cookieStore.get("sigma-lang")?.value) ?? "EN") as LangCode;
  const htmlDir = isRtlLang(initialLang) ? "rtl" : "ltr";
  const htmlLang = HTML_LANG_BY_CODE[initialLang];

  return (
    <html
      lang={htmlLang}
      dir={htmlDir}
      suppressHydrationWarning
      className={`min-h-screen bg-erie ${spaceGrotesk.variable} ${inter.variable} ${notoSansArabic.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=new URLSearchParams(window.location.search);var l=(p.get("lang")||"").toUpperCase();if(!l)return;var map={EN:"en",FA:"fa",AR:"ar",TR:"tr",RU:"ru",ZH:"zh-CN",ES:"es"};if(!map[l])return;document.documentElement.lang=map[l];document.documentElement.dir=(l==="FA"||l==="AR")?"rtl":"ltr";}catch(e){}})();`,
          }}
        />
        <GlobalStructuredData />
        <meta name="publisher" content="Sigma" />
        <meta property="article:publisher" content={PUBLISHER_SITE_URL} />
        <meta name="author" content="Sigma" />
      </head>
      <body className="min-h-screen bg-erie font-body text-cadet antialiased">
        <Providers initialLang={initialLang}>{children}</Providers>
        <ProductionAnalytics />
      </body>
    </html>
  );
}
