/**
 * Centralized SEO copy for Next.js Metadata API, sitemap parity, and JSON-LD.
 * Canonical path segments use `alternates.canonical` relative to root `metadataBase`
 * (`NEXT_PUBLIC_SITE_URL` → {@link getSiteUrl}); absolute URLs use {@link getCanonicalUrl}.
 */

import type { Metadata } from "next";
import { servicesPageMetaByLang } from "@/content/global/marketing/servicesContent";
import { buildLanguageAlternates } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

/** Default OG/Twitter image — Next.js `opengraph-image` route (see `app/opengraph-image.tsx`). */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

/** Consistent site authorship (name only — no URL in `authors` for SEO tools). */
export const SIGMA_SITE_AUTHORS: Pick<Metadata, "authors" | "creator" | "publisher"> = {
  authors: [{ name: "Sigma" }],
  creator: "Sigma",
  publisher: "Sigma",
};

export type SeoRouteKey =
  | "home"
  | "about"
  | "services"
  | "servicePlatformGrowth"
  | "serviceKolInfrastructure"
  | "serviceIbProgram"
  | "serviceTraderNetwork"
  | "serviceTokenLaunch"
  | "markets"
  | "products"
  | "riskDisclosure"
  | "contact"
  | "faq"
  | "privacy"
  | "team"
  | "terms"
  | "insights"
  | "marketsWana"
  | "marketsCis"
  | "marketsApac"
  | "marketsEurope"
  | "marketsLatam"

export type SeoPageDefinition = {
  /** URL pathname, e.g. `/about` */
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
};

export function getCanonicalUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") return base;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function absoluteOgImage(path: string = DEFAULT_OG_IMAGE_PATH): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const SEO_PAGES: Record<SeoRouteKey, SeoPageDefinition> = {
  home: {
    path: "/",
    title: "Sigma | Finance & Web3 Growth Partner",
    description:
      "Sigma is a global financial growth infrastructure network — user acquisition, KOL marketing, IB programs, and liquidity for crypto exchanges, forex brokers, and Web3 platforms.",
    keywords: [
      "finance and web3 growth partner",
      "financial growth infrastructure",
      "crypto exchange growth",
      "forex broker marketing",
      "crypto KOL agency",
      "crypto IB program",
      "crypto exchange marketing agency",
      "crypto user acquisition",
      "liquidity activation",
      "web3 growth agency",
      "operator-led crypto marketing",
    ],
    ogTitle: "Sigma — Growth Infrastructure for Crypto, Forex, Stocks & Web3",
    ogDescription:
      "1,500+ KOLs across crypto, forex & Web3. 40+ markets. $7B+ supported volume. Built by operators inside exchanges, not agencies outside them.",
    twitterTitle: "Sigma — Growth Infrastructure for Crypto, Forex, Stocks & Web3",
    twitterDescription:
      "1,500+ KOLs across crypto, forex & Web3. 40+ markets. $7B+ supported volume. Built by operators inside exchanges, not agencies outside them.",
  },
  about: {
    path: "/about",
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
    keywords: [
      "Sigma Team",
      "Sigma founder",
      "who is Sigma",
      "Sigma Modaber",
      "Sigma operators",
      "how Sigma started",
      "operator-led crypto marketing",
      "trust-based crypto agency",
      "long-term Web3 partnership",
    ],
    ogTitle: "About Sigma — Built From Inside the Industry",
    ogDescription:
      "Founded by Omid Modaber and core operators with experience inside LBank, BingX, MEXC, and Binance-era growth programs.",
    twitterTitle: "About Sigma — Built From Inside the Industry",
    twitterDescription:
      "Founded by Omid Modaber and core operators with experience inside LBank, BingX, MEXC, and Binance-era growth programs.",
  },
  services: {
    path: "/services",
    title: "Web3 Growth & Crypto Marketing Services",
    description:
      "Explore Sigma’s Web3 growth services: crypto marketing, liquidity solutions, exchange expansion, and user acquisition systems.",
    keywords: [
      "web3 growth services",
      "crypto marketing services",
      "liquidity solutions",
      "exchange growth",
      "user acquisition web3",
      "defi marketing",
      "sigma services",
    ],
    ogTitle: "Web3 Growth & Crypto Marketing Services | Sigma",
    ogDescription:
      "Explore Sigma’s Web3 growth services: crypto marketing, liquidity solutions, exchange expansion, and user acquisition systems.",
    twitterTitle: "Web3 Growth & Crypto Marketing Services | Sigma",
    twitterDescription:
      "Explore Sigma’s Web3 growth services: crypto marketing, liquidity solutions, exchange expansion, and user acquisition systems.",
  },
  servicePlatformGrowth: {
    path: "/services/platform-growth",
    title: "Exchange, Broker & Platform Growth | Crypto Exchange Marketing Agency",
    description:
      "End-to-end growth for crypto exchanges, forex brokers, DEXs, prop firms, and fintech platforms — user acquisition, KOL activation, IB networks, localization, VIP onboarding, and liquidity activation.",
    keywords: [
      "crypto exchange marketing agency",
      "crypto exchange growth",
      "forex broker marketing",
      "crypto user acquisition",
      "liquidity activation",
    ],
    ogTitle: "Exchange, Broker & Platform Growth | Sigma",
    ogDescription:
      "Operator-led growth systems for exchanges, brokers, and platforms across crypto, forex, and Web3.",
    twitterTitle: "Exchange, Broker & Platform Growth | Sigma",
    twitterDescription:
      "Operator-led growth systems for exchanges, brokers, and platforms across crypto, forex, and Web3.",
  },
  serviceKolInfrastructure: {
    path: "/services/kol-infrastructure",
    title: "KOL Marketing & Creator Infrastructure | Crypto KOL Agency",
    description:
      "Selective crypto, forex, stock, and Web3 creator network with affiliate bots, websites, SEO for KOLs, premium platform deals, and creator monetization infrastructure.",
    keywords: [
      "crypto KOL agency",
      "crypto KOL marketing",
      "KOL affiliate system",
      "creator infrastructure",
      "SEO for KOLs",
    ],
    ogTitle: "KOL Marketing & Creator Infrastructure | Sigma",
    ogDescription:
      "Infrastructure-first KOL systems for creator economics, distribution quality, and long-term compounding.",
    twitterTitle: "KOL Marketing & Creator Infrastructure | Sigma",
    twitterDescription:
      "Infrastructure-first KOL systems for creator economics, distribution quality, and long-term compounding.",
  },
  serviceIbProgram: {
    path: "/services/ib-program",
    title: "IB & Affiliate Program Design | Crypto IB Program",
    description:
      "Structured IB programs for crypto exchanges and forex brokers — commission architecture, partner onboarding, conversion playbooks, retention systems, and regional BD expansion.",
    keywords: [
      "crypto IB program",
      "forex IB network",
      "IB affiliate program",
      "broker IB programs",
      "crypto affiliate program",
    ],
    ogTitle: "IB & Affiliate Program Design | Sigma",
    ogDescription:
      "Move from scattered referrals to a structured BD and affiliate operating system.",
    twitterTitle: "IB & Affiliate Program Design | Sigma",
    twitterDescription:
      "Move from scattered referrals to a structured BD and affiliate operating system.",
  },
  serviceTraderNetwork: {
    path: "/services/trader-network",
    title: "Trader, VIP & Whale Access Network | Better Market Access",
    description:
      "Platform matching, VIP onboarding crypto workflows, whale onboarding support, copy trading access, options pathways, and data terminal introductions for serious traders.",
    keywords: [
      "VIP onboarding crypto",
      "whale onboarding",
      "copy trading platform",
      "better market access",
      "trader platform matching",
    ],
    ogTitle: "Trader, VIP & Whale Access Network | Sigma",
    ogDescription:
      "Operator-supported access infrastructure for high-seriousness trading participants.",
    twitterTitle: "Trader, VIP & Whale Access Network | Sigma",
    twitterDescription:
      "Operator-supported access infrastructure for high-seriousness trading participants.",
  },
  serviceTokenLaunch: {
    path: "/services/token-launch",
    title: "Token Launch, Listing & Market-Making Introductions | Sigma",
    description:
      "Coordinated token launch distribution, exchange listing support, KOL synchronization, market maker introductions, and post-TGE retention systems.",
    keywords: [
      "token launch marketing",
      "crypto exchange listing service",
      "market maker introduction",
      "token launch distribution",
      "post-TGE retention",
    ],
    ogTitle: "Token Launch, Listing & Market-Making Introductions | Sigma",
    ogDescription:
      "Launch playbooks aligned to regional distribution, listing readiness, and post-TGE retention.",
    twitterTitle: "Token Launch, Listing & Market-Making Introductions | Sigma",
    twitterDescription:
      "Launch playbooks aligned to regional distribution, listing readiness, and post-TGE retention.",
  },
  markets: {
    path: "/markets",
    title: "Sigma Markets | Regional Crypto & Web3 Growth Network",
    description:
      "Explore Sigma’s regional growth network across MENA/WANA, CIS, APAC, Europe, and LATAM — built for crypto exchanges, brokers, KOLs, IBs, and Web3 platforms.",
    keywords: [
      "regional crypto marketing",
      "MENA crypto marketing",
      "APAC crypto marketing",
      "CIS crypto agency",
      "MiCA crypto marketing",
      "LATAM crypto marketing",
      "regional Web3 growth",
    ],
    ogTitle: "Sigma Markets | Regional Crypto & Web3 Growth Network",
    ogDescription:
      "Regional growth execution across MENA/WANA, CIS, APAC, Europe, and LATAM with native KOL networks and localized BD support.",
    twitterTitle: "Sigma Markets | Regional Crypto & Web3 Growth Network",
    twitterDescription:
      "Regional growth execution across MENA/WANA, CIS, APAC, Europe, and LATAM with native KOL networks and localized BD support.",
  },
  marketsWana: {
    path: "/markets/wana",
    title: "MENA / WANA Crypto Marketing | Sigma",
    description:
      "Sigma operates across MENA and WANA with Arabic, Persian, and GCC-native KOL networks, regional BD support, broker IB infrastructure, and locally calibrated growth funnels for exchanges, brokers, protocols, and financial platforms.",
    keywords: [
      "MENA crypto marketing",
      "Arabic crypto KOL",
      "crypto marketing agency GCC",
      "Dubai crypto agency",
      "Persian crypto KOL agency",
      "Farsi crypto marketing",
    ],
    ogTitle: "MENA / WANA Crypto Marketing | Sigma",
    ogDescription:
      "Arabic, Persian, and GCC-native regional growth infrastructure across MENA and WANA.",
    twitterTitle: "MENA / WANA Crypto Marketing | Sigma",
    twitterDescription:
      "Regional crypto and Web3 growth execution across MENA and WANA.",
  },
  marketsCis: {
    path: "/markets/cis",
    title: "CIS Crypto Marketing | Sigma",
    description:
      "Sigma supports CIS market expansion through Russian-language distribution, regional KOL networks, trading communities, futures and prop-trading audiences, and localized BD execution.",
    keywords: [
      "CIS crypto agency",
      "Russian crypto marketing",
      "Russian-language crypto distribution",
      "CIS crypto marketing",
    ],
    ogTitle: "CIS Crypto Marketing | Sigma",
    ogDescription:
      "Russian-language distribution and regional BD execution for CIS crypto and finance markets.",
    twitterTitle: "CIS Crypto Marketing | Sigma",
    twitterDescription:
      "Localized CIS growth systems with Russian-language distribution and trading-community access.",
  },
  marketsApac: {
    path: "/markets/apac",
    title: "APAC Crypto Marketing | Sigma",
    description:
      "Sigma supports APAC growth through Asia-Pacific KOL surfaces, regional community channels, and localized execution across Korean, Vietnamese, Thai, Indonesian, and broader Southeast Asian crypto and Web3 markets.",
    keywords: [
      "APAC crypto marketing",
      "Asia crypto KOL",
      "Bali crypto agency",
      "Asia-Pacific Web3 growth",
      "Southeast Asia crypto marketing",
    ],
    ogTitle: "APAC Crypto Marketing | Sigma",
    ogDescription:
      "Asia-Pacific growth execution with localized KOL distribution and regional community infrastructure.",
    twitterTitle: "APAC Crypto Marketing | Sigma",
    twitterDescription:
      "Regional APAC growth systems for crypto and Web3 platforms.",
  },
  marketsEurope: {
    path: "/markets/europe",
    title: "Europe Crypto Marketing | Sigma",
    description:
      "Sigma supports European and Turkey-linked expansion through MiCA-aware campaign planning, localized KOL and BD coordination, Telegram-first Turkish communities, FX-aware messaging, native Turkish creators, and region-specific growth infrastructure across Germany, Spain, Italy, Poland, the Balkans, Turkey, and broader European markets.",
    keywords: [
      "MiCA crypto marketing",
      "EU crypto agency",
      "Europe crypto marketing",
      "Balkans crypto marketing",
      "Turkey crypto KOL agency",
      "Istanbul crypto marketing",
      "European Web3 growth",
    ],
    ogTitle: "Europe Crypto Marketing | Sigma",
    ogDescription:
      "MiCA-aware European growth execution across EU, Balkan, and Turkey-linked markets.",
    twitterTitle: "Europe Crypto Marketing | Sigma",
    twitterDescription:
      "Localized KOL and BD infrastructure for European and Turkey-linked crypto and Web3 expansion.",
  },
  marketsLatam: {
    path: "/markets/latam",
    title: "LATAM Crypto Marketing | Sigma",
    description:
      "Sigma supports LATAM and Spain-focused growth through Spanish and Portuguese funnels, stablecoin-first narratives, regional KOL access, trading communities, and localized acquisition infrastructure.",
    keywords: [
      "LATAM crypto marketing",
      "Spanish crypto KOL",
      "Spain crypto marketing",
      "Latin America crypto agency",
      "Portuguese crypto marketing",
    ],
    ogTitle: "LATAM Crypto Marketing | Sigma",
    ogDescription:
      "Spanish and Portuguese growth funnels with stablecoin-first regional narratives.",
    twitterTitle: "LATAM Crypto Marketing | Sigma",
    twitterDescription:
      "Localized LATAM and Spain-linked crypto and Web3 growth execution.",
  },
  products: {
    path: "/products",
    title: "Sigma Helper Products — Tools, Bots, Dashboards & Analytics",
    description:
      "Crypto growth tools inside the Sigma network: analytics dashboards, affiliate systems, Telegram bots, creator monetization stacks, and reporting layers.",
    keywords: [
      "crypto growth tools",
      "affiliate dashboards",
      "Telegram bots",
      "analytics dashboards",
      "growth bots",
      "creator monetization tools",
      "KOL affiliate system",
    ],
    ogTitle: "Sigma Helper Products — Tools, Bots, Dashboards & Analytics",
    ogDescription:
      "Supporting product infrastructure for campaigns, affiliates, KOL operations, and execution telemetry.",
    twitterTitle: "Sigma Helper Products — Tools, Bots, Dashboards & Analytics",
    twitterDescription:
      "Supporting product infrastructure for campaigns, affiliates, KOL operations, and execution telemetry.",
  },
  riskDisclosure: {
    path: "/risk-disclosure",
    title: "Risk & Transparency Disclosure | Sigma",
    description:
      "Crypto risk disclosure and transparency statement covering Sigma’s role, regulatory boundaries, and non-custodial, non-advisory positioning.",
    keywords: [
      "crypto risk disclosure",
      "financial risk disclosure",
      "crypto regulation",
      "KYC AML",
      "MiCA compliance",
      "regulatory crypto marketing",
    ],
    ogTitle: "Risk & Transparency Disclosure | Sigma",
    ogDescription:
      "What Sigma is and what Sigma is not — including non-broker, non-custodial, and non-advisory boundaries.",
    twitterTitle: "Risk & Transparency Disclosure | Sigma",
    twitterDescription:
      "What Sigma is and what Sigma is not — including non-broker, non-custodial, and non-advisory boundaries.",
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Reach Sigma for partnerships, integrations, and strategic Web3 growth engagements—secure channels and fast routing for serious inquiries.",
    keywords: ["contact Sigma", "Web3 partnership", "crypto growth inquiry", "business development"],
    ogTitle: "Contact Sigma",
    ogDescription:
      "Reach Sigma for partnerships, integrations, and strategic Web3 growth engagements.",
    twitterTitle: "Contact Sigma",
    twitterDescription:
      "Partnerships, integrations, and strategic Web3 growth inquiries.",
  },
  faq: {
    path: "/faq",
    title: "Sigma — Common Questions",
    description:
      "What is Sigma, how crypto KOL and IB models work, where Sigma operates, and why Sigma never guarantees profits.",
    keywords: [
      "what is Sigma",
      "what is a web3 growth agency",
      "is Sigma a crypto marketing agency",
      "how crypto IB programs work",
      "how crypto KOL agency works",
      "does Sigma guarantee profits",
    ],
    ogTitle: "Sigma — Common Questions",
    ogDescription:
      "Answers about Sigma’s growth infrastructure model, regions, KOL and IB systems, and compliance-safe positioning.",
    twitterTitle: "Sigma — Common Questions",
    twitterDescription:
      "Answers about Sigma’s growth infrastructure model, regions, KOL and IB systems, and compliance-safe positioning.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy",
    description:
      "Sigma privacy notice: how we handle personal data, communications, and regional considerations for Web3 marketing engagements.",
    keywords: ["Sigma privacy", "data protection", "privacy notice"],
    ogTitle: "Privacy Notice | Sigma",
    ogDescription:
      "How Sigma handles personal data and communications in connection with Web3 marketing services.",
    twitterTitle: "Privacy Notice | Sigma",
    twitterDescription:
      "Privacy practices for Sigma marketing and communications.",
  },
  team: {
    path: "/team",
    title: "The People Behind Sigma",
    description:
      "Meet Omid Modaber, Arad Moaf, Novin Ghasemi, Hosein Rostami, and Mostafa Moradi — the core Sigma team operating global growth infrastructure.",
    keywords: [
      "Sigma Team",
      "Sigma founder",
      "Omid Modaber",
      "Arad Moaf",
      "Novin Ghasemi",
      "Hosein Rostami",
      "Mostafa Moradi",
      "Sigma core team",
      "Sigma partners",
    ],
    ogTitle: "The People Behind Sigma",
    ogDescription:
      "Core partners and operators behind Sigma’s finance and Web3 growth infrastructure network.",
    twitterTitle: "The People Behind Sigma",
    twitterDescription:
      "Core partners and operators behind Sigma’s finance and Web3 growth infrastructure network.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Use",
    description:
      "Terms governing use of Sigma’s website and marketing materials—please read before engaging.",
    keywords: ["Sigma terms", "terms of use", "website terms"],
    ogTitle: "Terms of Use | Sigma",
    ogDescription:
      "Terms governing use of Sigma’s website and related marketing materials.",
    twitterTitle: "Terms of Use | Sigma",
    twitterDescription:
      "Website and marketing terms for Sigma.",
  },
  insights: {
    path: "/insights",
    title: "Insights",
    description:
      "Market intelligence, execution breakdowns, and growth systems for Web3—from Sigma’s editorial desk.",
    keywords: ["Sigma Insights", "Web3 intelligence", "crypto growth analysis", "market commentary"],
    ogTitle: "Sigma Insights | Web3 Growth Intelligence",
    ogDescription:
      "Editorial briefings on Web3 growth, liquidity, and distribution—from Sigma.",
    twitterTitle: "Sigma Insights",
    twitterDescription:
      "Market intelligence and growth systems for Web3.",
  },
};

const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
};

/** Scalable hreflang alternates across all supported locales. */
export type MarketingHrefRoute = "home" | "services" | "insights";

export function marketingHreflangLanguages(
  route: MarketingHrefRoute,
): NonNullable<Metadata["alternates"]>["languages"] {
  const path = route === "home" ? "/" : route === "services" ? "/services" : "/insights";
  return buildLanguageAlternates(path);
}

/** Arabic landing SEO — manual copy (not machine-translated). */
export function buildArabicHomeMetadata(): Metadata {
  const title =
    "سيغما | نمو Web3 وسيولة وتسويق منصات العملات المشفرة";
  const description =
    "بنية تحتية استراتيجية للنمو لمنصات التداول والبروتوكولات ومنتجات Web3 — اكتساس، توزيع، وأنظمة سيولة.";
  const canonicalAbsolute = getCanonicalUrl("/ar");
  const ogAbs = absoluteOgImage();

  return {
    ...SIGMA_SITE_AUTHORS,
    title: { absolute: title },
    description,
    keywords: SEO_PAGES.home.keywords,
    alternates: {
      canonical: "/ar",
      languages: marketingHreflangLanguages("home"),
    },
    robots: ROBOTS,
    openGraph: {
      title,
      description,
      url: canonicalAbsolute,
      siteName: "Sigma",
      locale: "ar_SA",
      type: "website",
      images: [{ url: ogAbs, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogAbs],
    },
  };
}

export function buildArabicServicesMetadata(): Metadata {
  const p = servicesPageMetaByLang.AR;
  const canonicalAbsolute = getCanonicalUrl("/ar/services");
  const ogAbs = absoluteOgImage();

  return {
    ...SIGMA_SITE_AUTHORS,
    title: p.title,
    description: p.description,
    keywords: SEO_PAGES.services.keywords,
    alternates: {
      canonical: "/ar/services",
      languages: marketingHreflangLanguages("services"),
    },
    robots: ROBOTS,
    openGraph: {
      title: p.title,
      description: p.description,
      url: canonicalAbsolute,
      siteName: "Sigma",
      locale: "ar_SA",
      type: "website",
      images: [{ url: ogAbs, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: [ogAbs],
    },
  };
}

export function buildArabicInsightsIndexMetadata(): Metadata {
  const title =
    "رؤى سيغما — نمو Web3 وتسويق العملات المشفرة";
  const description =
    "ذكاء السوق، تحليل التنفيذ، وأنظمة النمو لـ Web3 — من مكتب سيغما التحريري.";
  const canonicalAbsolute = getCanonicalUrl("/ar/insights");
  const ogAbs = absoluteOgImage();

  return {
    ...SIGMA_SITE_AUTHORS,
    title,
    description,
    keywords: SEO_PAGES.insights.keywords,
    alternates: {
      canonical: "/ar/insights",
      languages: marketingHreflangLanguages("insights"),
    },
    robots: ROBOTS,
    openGraph: {
      title: `${title} | Sigma`,
      description,
      url: canonicalAbsolute,
      siteName: "Sigma",
      locale: "ar_SA",
      type: "website",
      images: [{ url: ogAbs, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sigma`,
      description,
      images: [ogAbs],
    },
  };
}

/**
 * Full Metadata for static routes defined in {@link SEO_PAGES}.
 * Home uses `title.absolute` so root template does not append `| Sigma` twice.
 */
export function buildPageMetadata(key: SeoRouteKey, ogImagePath: string = DEFAULT_OG_IMAGE_PATH): Metadata {
  const p = SEO_PAGES[key];
  const canonicalPath = p.path === "/" ? "/" : p.path;
  const canonicalAbsolute = getCanonicalUrl(p.path);
  const ogAbs = absoluteOgImage(ogImagePath);

  const base: Metadata = {
    ...SIGMA_SITE_AUTHORS,
    description: p.description,
    keywords: p.keywords,
    alternates: {
      canonical: canonicalPath,
      languages: buildLanguageAlternates(canonicalPath),
    },
    robots: ROBOTS,
    openGraph: {
      title: p.ogTitle,
      description: p.ogDescription,
      url: canonicalAbsolute,
      siteName: "Sigma",
      locale: "en_US",
      type: "website",
      images: [{ url: ogAbs, width: 1200, height: 630, alt: p.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.twitterTitle,
      description: p.twitterDescription,
      images: [ogAbs],
    },
  };

  if (p.path === "/") {
    return {
      ...base,
      title: { absolute: p.title },
      openGraph: {
        ...base.openGraph,
        title: p.ogTitle,
      },
      twitter: {
        ...base.twitter,
        title: p.twitterTitle,
      },
    };
  }

  return {
    ...base,
    title: p.title,
  };
}

/** Insights listing uses site translations title length — optional override */
export function buildInsightsIndexMetadata(
  title: string,
  description: string,
): Metadata {
  const canonicalAbsolute = getCanonicalUrl("/insights");
  const ogAbs = absoluteOgImage();
  return {
    ...SIGMA_SITE_AUTHORS,
    title,
    description,
    keywords: SEO_PAGES.insights.keywords,
    alternates: {
      canonical: "/insights",
      languages: buildLanguageAlternates("/insights"),
    },
    robots: ROBOTS,
    openGraph: {
      title: `${title} | Sigma`,
      description,
      url: canonicalAbsolute,
      siteName: "Sigma",
      locale: "en_US",
      type: "website",
      images: [{ url: ogAbs, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sigma`,
      description,
      images: [ogAbs],
    },
  };
}
