/**
 * Centralized SEO copy for Next.js Metadata API, sitemap parity, and JSON-LD.
 * Canonical URLs always derive from `NEXT_PUBLIC_SITE_URL` via `getSiteUrl()`.
 */

import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Default OG/Twitter image — Next.js `opengraph-image` route (see `app/opengraph-image.tsx`). */
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export type SeoRouteKey =
  | "home"
  | "about"
  | "services"
  | "contact"
  | "faq"
  | "privacy"
  | "team"
  | "terms"
  | "insights"
  | "marketsUae"
  | "marketsTurkey"
  | "marketsIran"
  | "marketsChina"
  | "marketsGlobal";

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
    title: "Sigma — Web3 Growth Infrastructure",
    description:
      "Strategic growth infrastructure for exchanges, protocols, and Web3 platforms — acquisition, distribution, and liquidity systems.",
    keywords: [
      "Sigma",
      "Web3 growth",
      "crypto marketing",
      "liquidity",
      "exchange growth",
      "protocol distribution",
      "market infrastructure",
    ],
    ogTitle: "Sigma — Web3 Growth Infrastructure",
    ogDescription:
      "Strategic growth infrastructure for exchanges, protocols, and Web3 platforms — acquisition, distribution, and liquidity systems.",
    twitterTitle: "Sigma — Web3 Growth Infrastructure",
    twitterDescription:
      "Strategic growth infrastructure for exchanges, protocols, and Web3 platforms — acquisition, distribution, and liquidity systems.",
  },
  about: {
    path: "/about",
    title: "About Sigma",
    description:
      "Sigma builds Web3 growth infrastructure—liquidity, distribution, and execution for protocols and exchanges worldwide.",
    keywords: ["Sigma", "about", "Web3 infrastructure", "crypto growth company", "exchange partnerships"],
    ogTitle: "About Sigma | Web3 Growth Infrastructure",
    ogDescription:
      "Learn how Sigma delivers liquidity, distribution, and execution systems for protocols and exchanges.",
    twitterTitle: "About Sigma",
    twitterDescription:
      "Sigma builds Web3 growth infrastructure—liquidity, distribution, and execution for protocols and exchanges worldwide.",
  },
  services: {
    path: "/services",
    title: "Services",
    description:
      "Explore Sigma’s core capabilities: liquidity programs, risk and compliance layers, technical integration, and Web3-native growth execution.",
    keywords: ["Sigma services", "Web3 liquidity", "crypto marketing services", "exchange integration", "growth execution"],
    ogTitle: "Sigma Services | Liquidity & Growth Execution",
    ogDescription:
      "Liquidity programs, compliance-aware execution, technical integration, and Web3 growth systems—in one strategic stack.",
    twitterTitle: "Sigma Services",
    twitterDescription:
      "Liquidity, integration, and Web3 growth execution for protocols and exchanges.",
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
    title: "FAQ",
    description:
      "Answers about Sigma’s engagement model, timelines, regions, and how we work with protocols and exchanges.",
    keywords: ["Sigma FAQ", "Web3 engagement", "crypto services questions"],
    ogTitle: "FAQ | Sigma",
    ogDescription:
      "Common questions about Sigma’s model, timelines, regions, and collaboration with protocols and exchanges.",
    twitterTitle: "Sigma FAQ",
    twitterDescription:
      "Engagement model, timelines, and how Sigma works with protocols and exchanges.",
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
    title: "Team",
    description:
      "Meet the operators behind Sigma—execution-focused teams spanning markets, liquidity, and technical integration.",
    keywords: ["Sigma team", "Web3 operators", "crypto marketing team"],
    ogTitle: "Team | Sigma",
    ogDescription:
      "Operators focused on markets, liquidity, and technical integration for Web3 growth.",
    twitterTitle: "Sigma Team",
    twitterDescription:
      "Operators behind Sigma’s Web3 growth infrastructure.",
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
  marketsUae: {
    path: "/markets/uae",
    title: "UAE Crypto Agency Marketing | Sigma",
    description:
      "Sigma’s UAE-focused Web3 marketing: Dubai and Abu Dhabi ecosystems, regional partnerships, and institutional-grade execution.",
    keywords: ["UAE crypto marketing", "Dubai Web3", "Sigma UAE", "Middle East crypto growth"],
    ogTitle: "UAE Crypto Agency Marketing | Sigma",
    ogDescription:
      "Regional Web3 marketing and expansion across UAE crypto hubs.",
    twitterTitle: "UAE Crypto Marketing | Sigma",
    twitterDescription:
      "Web3 agency marketing for UAE markets.",
  },
  marketsTurkey: {
    path: "/markets/turkey",
    title: "Turkey Crypto Agency Marketing | Sigma",
    description:
      "Turkey market programs for crypto exchanges and protocols—localized narratives, listings-aligned milestones, and community activation.",
    keywords: ["Turkey crypto marketing", "Sigma Turkey", "Web3 Turkey"],
    ogTitle: "Turkey Crypto Agency Marketing | Sigma",
    ogDescription:
      "Localized Web3 growth execution for Turkish crypto markets.",
    twitterTitle: "Turkey Crypto Marketing | Sigma",
    twitterDescription:
      "Crypto agency marketing for Turkey.",
  },
  marketsIran: {
    path: "/markets/iran",
    title: "Iran Regional Crypto Marketing | Sigma",
    description:
      "Persian-language outreach and partner-led distribution for crypto-native audiences—structured programs with clear compliance boundaries.",
    keywords: ["Persian crypto marketing", "regional Web3", "Sigma Iran"],
    ogTitle: "Iran Regional Crypto Marketing | Sigma",
    ogDescription:
      "Structured Persian-language programs for crypto audiences.",
    twitterTitle: "Iran Crypto Marketing | Sigma",
    twitterDescription:
      "Regional Web3 marketing programs.",
  },
  marketsChina: {
    path: "/markets/china",
    title: "Greater China Crypto Marketing | Sigma",
    description:
      "Greater China execution for Web3 teams—ecosystem-aligned messaging, partner coordination, and institutional narratives.",
    keywords: ["China crypto marketing", "Greater China Web3", "Sigma"],
    ogTitle: "Greater China Crypto Marketing | Sigma",
    ogDescription:
      "Web3 marketing execution aligned with Greater China ecosystems.",
    twitterTitle: "Greater China Crypto Marketing | Sigma",
    twitterDescription:
      "Web3 growth execution for Greater China.",
  },
  marketsGlobal: {
    path: "/markets/global",
    title: "Global Crypto Agency Marketing | Sigma",
    description:
      "Multi-region launches with unified liquidity, user acquisition, and narrative continuity across key crypto corridors.",
    keywords: ["global crypto marketing", "Web3 agency", "multi-region launch", "Sigma"],
    ogTitle: "Global Crypto Agency Marketing | Sigma",
    ogDescription:
      "Unified playbook for multi-region Web3 growth and marketing.",
    twitterTitle: "Global Crypto Marketing | Sigma",
    twitterDescription:
      "Multi-region Web3 agency marketing.",
  },
};

const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
};

/**
 * Full Metadata for static routes defined in {@link SEO_PAGES}.
 * Home uses `title.absolute` so root template does not append `| Sigma` twice.
 */
export function buildPageMetadata(key: SeoRouteKey, ogImagePath: string = DEFAULT_OG_IMAGE_PATH): Metadata {
  const p = SEO_PAGES[key];
  const canonical = getCanonicalUrl(p.path);
  const ogAbs = absoluteOgImage(ogImagePath);

  const base: Metadata = {
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical },
    robots: ROBOTS,
    openGraph: {
      title: p.ogTitle,
      description: p.ogDescription,
      url: canonical,
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
  const canonical = getCanonicalUrl("/insights");
  const ogAbs = absoluteOgImage();
  return {
    title,
    description,
    keywords: SEO_PAGES.insights.keywords,
    alternates: { canonical },
    robots: ROBOTS,
    openGraph: {
      title: `${title} | Sigma`,
      description,
      url: canonical,
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
