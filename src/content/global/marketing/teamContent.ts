import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

export type TeamMember = { name: string; role: string; bio: string };

export type TeamMarketingBody = {
  kicker: string;
  headline: string;
  intro: string;
  members: TeamMember[];
  extendedNetwork: string;
  ndaLine: string;
  ctaLabel: string;
  ctaHref: string;
};

export const teamPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  TR: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  FA: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  ZH: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  ES: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  RU: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  AR: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
};

const EN_CONTENT: TeamMarketingBody = {
  kicker: "The Core Team",
  headline: "The People Behind Sigma",
  intro:
    "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  members: [
    {
      name: "Omid Modaber",
      role: "Strategic Growth Consultant",
      bio: "Sets the long-term direction of Sigma. Focused on strategy, exchange partnerships, regional expansion, and the operating principles the network runs on.",
    },
    {
      name: "Arad Moaf",
      role: "Strategic Growth Consultant",
      bio: "Owns how Sigma enters and grows in new regions. Builds the relationships and execution frameworks that make Sigma operate locally — not just globally.",
    },
    {
      name: "Novin Ghasemi",
      role: "Strategic Growth Consultant",
      bio: "Runs the engine room. Translates strategy into campaigns, partnerships, and growth motions across the network’s platforms and creators.",
    },
    {
      name: "Hosein Rostami",
      role: "Strategic Growth Consultant",
      bio: "Connects the moving parts. Ensures that what is promised on the strategy side is actually executable on the operations side — across teams, regions, and partners.",
    },
    {
      name: "Mostafa Moradi",
      role: "Strategic Growth Consultant",
      bio: "Owns Sigma’s community side. Builds and maintains the human layer that turns campaigns into long-term loyalty and creators into compounding networks.",
    },
  ],
  extendedNetwork:
    "Beyond the five core partners, Sigma operates with regional community managers, KOL managers, BD specialists, content collaborators, localization leads, and partner operators in every priority market.",
  ndaLine:
    "Several Sigma team members hold senior roles inside operating financial platforms. Specific platform affiliations are protected under NDA.",
  ctaLabel: "Partner with Sigma",
  ctaHref: ROUTES.contact,
};

export const teamPageContentByLang: Record<LangCode, TeamMarketingBody> = {
  EN: EN_CONTENT,
  TR: EN_CONTENT,
  FA: EN_CONTENT,
  ZH: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
