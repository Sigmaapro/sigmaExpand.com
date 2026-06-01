import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type MarketsIndexRegion = {
  title: string;
  body: string;
  keywordFocus: string;
};

export type MarketsIndexContent = {
  kicker: string;
  title: string;
  intro: string;
  regions: MarketsIndexRegion[];
  ctaLabel: string;
  ctaHref: string;
};

const EN_CONTENT: MarketsIndexContent = {
  kicker: "Regional Crypto Marketing",
  title: "Built for Where Your Next Users Actually Live",
  intro:
    "Web3 growth does not happen at the global average — it happens region by region. Sigma operates with native KOLs, on-the-ground BD, and locally calibrated funnels across the highest-velocity financial markets — with team presence in Dubai, Istanbul, Bali, Canada, and across MENA, GCC, Turkey, LATAM, CIS, East Asia, Europe, and Persian-speaking communities.",
  regions: [
    {
      title: "GCC / Dubai HQ",
      body: "Compliance-aware growth across UAE, KSA, Qatar, Kuwait, Bahrain, and Oman.",
      keywordFocus: "crypto marketing agency GCC · Dubai crypto agency",
    },
    {
      title: "MENA / WANA",
      body: "Arabic, Persian, and Turkish-native KOL networks.",
      keywordFocus: "MENA crypto marketing · Arabic crypto KOL",
    },
    {
      title: "Turkey / Istanbul presence",
      body: "Telegram-first communities, FX-aware messaging, native Turkish creators.",
      keywordFocus: "Turkey crypto KOL agency · Istanbul crypto marketing",
    },
    {
      title: "Persian-Speaking Markets",
      body: "Native Farsi KOLs, broker IB programs, and community infrastructure.",
      keywordFocus: "Persian crypto KOL agency · Farsi crypto marketing",
    },
    {
      title: "LATAM",
      body: "Portuguese and Spanish funnels with stablecoin-first narratives.",
      keywordFocus: "LATAM crypto marketing · Spanish crypto KOL",
    },
    {
      title: "CIS",
      body: "Russian-language distribution, futures and prop trading audiences.",
      keywordFocus: "CIS crypto agency · Russian crypto marketing",
    },
    {
      title: "East & SE Asia / Bali presence",
      body: "Korean, Vietnamese, Thai, and Indonesian growth surfaces.",
      keywordFocus: "Asia crypto KOL · Bali crypto agency",
    },
    {
      title: "Europe",
      body: "MiCA-aware campaigns across DE, ES, IT, PL, and the Balkans.",
      keywordFocus: "MiCA crypto marketing · EU crypto agency",
    },
    {
      title: "North America / Canada presence",
      body: "Compliance-first, institutional crypto outreach.",
      keywordFocus: "Canada crypto marketing agency",
    },
    {
      title: "Global Corridors",
      body: "Coordinated multi-region token launches and platform expansions.",
      keywordFocus: "global crypto launch agency",
    },
  ],
  ctaLabel: "Plan Your Regional Expansion",
  ctaHref: ROUTES.contact,
};

export const marketsIndexContentByLang: Record<LangCode, MarketsIndexContent> = {
  EN: EN_CONTENT,
  TR: EN_CONTENT,
  ZH: EN_CONTENT,
  FA: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
