import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type ProductsContent = {
  kicker: string;
  title: string;
  intro: string;
  positioning: string;
  sections: { title: string; body: string }[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const EN_CONTENT: ProductsContent = {
  kicker: "Sigma Helper Products",
  title: "Sigma Helper Products — Tools, Bots, Dashboards & Analytics",
  intro:
    "Sigma builds and operates supporting products for the network — analytics dashboards, affiliate services, community tools, content systems, and growth bots that compound campaign performance.",
  positioning:
    "These are not generic SaaS products. They are supporting products and tools inside the Sigma network, designed to make campaigns, affiliates, KOL operations, and reporting more effective.",
  sections: [
    {
      title: "Analytics Dashboards",
      body: "Execution-grade dashboards for acquisition, volume, retention, and partner performance across markets.",
    },
    {
      title: "Affiliate and IB Systems",
      body: "Partner onboarding flows, commission structures, and reporting layers for crypto and forex growth programs.",
    },
    {
      title: "Telegram Bots and Community Tools",
      body: "Community-first automation for routing, activation, and moderation in high-frequency operator environments.",
    },
    {
      title: "Creator Monetization Stacks",
      body: "KOL affiliate system tooling that connects creator distribution to measurable revenue loops.",
    },
    {
      title: "Content Systems",
      body: "Operational content pipelines that support regional localization, launch cadence, and partner enablement.",
    },
    {
      title: "Growth Bots and Reporting Layers",
      body: "Automation and telemetry loops that reduce friction between campaign execution and executive decision-making.",
    },
  ],
  primaryCtaLabel: "Explore Sigma Tools",
  primaryCtaHref: ROUTES.products,
  secondaryCtaLabel: "Partner with Sigma",
  secondaryCtaHref: ROUTES.contact,
};

export const productsContentByLang: Record<LangCode, ProductsContent> = {
  EN: EN_CONTENT,
  TR: EN_CONTENT,
  ZH: EN_CONTENT,
  FA: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
