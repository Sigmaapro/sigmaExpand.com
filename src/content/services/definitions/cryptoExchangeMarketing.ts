import type { ServiceDefinition, ServiceIconName } from "../types";
import {
  CEM_AUDIENCE,
  CEM_BROKERS,
  CEM_CHANNELS,
  CEM_COMPARISON,
  CEM_DEFINITION,
  CEM_ENGAGEMENT,
  CEM_FAQ,
  CEM_FINAL_CTA,
  CEM_FUNNEL,
  CEM_GROWTH_LOOP,
  CEM_HERO,
  CEM_META,
  CEM_METRICS,
  CEM_MODULES,
  CEM_PROBLEMS,
  CEM_QUALIFICATION,
  CEM_REGIONS,
  CEM_RISK,
  CEM_STAGES,
  CEM_VOLUME,
} from "../pilots/cryptoExchangeMarketing.content";

const slug = "crypto-exchange-marketing" as const;

const AUDIENCE_ICONS: ServiceIconName[] = ["sparkles", "globe", "network", "shield"];

const CLUSTER_ICONS: Record<string, ServiceIconName> = {
  acquire: "activity",
  distribute: "network",
  compound: "layers",
  localize: "globe",
};

const METRIC_VALUES = ["Verified", "Activated", "Attributed", "Retained", "Efficient"] as const;

export const CRYPTO_EXCHANGE_MARKETING_SERVICE: ServiceDefinition = {
  slug,
  key: "cryptoExchangeMarketing",
  href: "/services/crypto-exchange-marketing",
  order: 1,
  enabled: true,
  icon: "activity",
  visualType: "growth",
  title: CEM_HERO.title,
  shortLabel: "Exchange Marketing",
  eyebrow: "Platform growth",
  lead: CEM_HERO.subhead,
  intro: [
    ...CEM_HERO.body,
    ...CEM_DEFINITION.paragraphs,
    CEM_VOLUME.body,
    ...CEM_BROKERS.paragraphs,
    CEM_GROWTH_LOOP.closing,
  ].join("\n\n"),
  keywords: [
    CEM_META.primaryKeyword,
    "crypto exchange marketing agency",
    "exchange user acquisition",
    "exchange trading volume",
    "regional exchange marketing",
  ],
  seo: {
    title: CEM_META.title,
    description: CEM_META.description,
    ogTitle: CEM_META.title,
    ogDescription: CEM_META.description,
    twitterTitle: CEM_META.title,
    twitterDescription: CEM_META.description,
    canonicalPath: CEM_META.path,
  },
  audiences: CEM_AUDIENCE.items.map((item, index) => ({
    id: `audience-${index}`,
    title: item.title,
    description: item.description,
    icon: AUDIENCE_ICONS[index] ?? "activity",
  })),
  problems: CEM_PROBLEMS.items.map((item, index) => ({
    id: `problem-${index}`,
    title: item.title,
    description: item.description,
  })),
  process: CEM_GROWTH_LOOP.steps.map((step, index) => ({
    id: step.id,
    step: index + 1,
    title: step.title,
    description: step.description,
  })),
  modules: [
    ...CEM_MODULES.clusters.flatMap((cluster) =>
      cluster.modules.map((module, index) => ({
        id: `${cluster.id}-${index}`,
        title: module.title,
        description: module.description,
        icon: CLUSTER_ICONS[cluster.id] ?? "layers",
      })),
    ),
    ...CEM_FUNNEL.steps.map((step, index) => ({
      id: `funnel-${index}`,
      title: step.title,
      description: step.description,
      icon: "cpu" as const,
    })),
    ...CEM_CHANNELS.items.map((channel, index) => ({
      id: `channel-${index}`,
      title: channel.title,
      description: channel.description,
      icon: "sparkles" as const,
    })),
  ],
  metrics: CEM_METRICS.items.map((item, index) => ({
    id: `metric-${index}`,
    label: item.title,
    value: METRIC_VALUES[index] ?? "Measured",
    detail: item.description,
  })),
  comparisons: [
    {
      id: "sigma-vs-standard-agency",
      title: CEM_COMPARISON.heading,
      columns: [
        { id: "standard", label: CEM_COMPARISON.columns[1] },
        { id: "sigma", label: CEM_COMPARISON.columns[2] },
      ],
      rows: CEM_COMPARISON.rows.map((row) => ({
        id: row.dimension.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        feature: row.dimension,
        cells: {
          standard: row.standard,
          sigma: row.sigma,
        },
      })),
    },
  ],
  tables: [
    {
      id: "growth-stages",
      title: CEM_STAGES.heading,
      columns: [
        { id: "stage", label: CEM_STAGES.columns[0] },
        { id: "goal", label: CEM_STAGES.columns[1] },
        { id: "focus", label: CEM_STAGES.columns[2] },
      ],
      rows: CEM_STAGES.rows.map((row, index) => ({
        id: `stage-${index}`,
        cells: {
          stage: row.stage,
          goal: row.goal,
          focus: row.focus,
        },
      })),
    },
  ],
  regionalSections: [
    ...CEM_REGIONS.items.map((region, index) => ({
      id: `region-${index}`,
      regionLabel: region.title,
      title: region.title,
      description: region.description,
    })),
    {
      id: "region-network",
      regionLabel: "Regional execution",
      title: "Local network, not translated playbooks",
      description: CEM_REGIONS.closing,
    },
  ],
  engagement: CEM_ENGAGEMENT.steps.map((step, index) => ({
    id: `engagement-${index}`,
    step: index + 1,
    title: step.title,
    description: step.description,
  })),
  riskDisclosure: [CEM_RISK.body, CEM_QUALIFICATION.body, CEM_PROBLEMS.midDisclaimer].join("\n\n"),
  faq: CEM_FAQ.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  })),
  cta: {
    eyebrow: "Next step",
    title: CEM_FINAL_CTA.heading,
    description: CEM_FINAL_CTA.body,
    primaryLabel: CEM_FINAL_CTA.primaryCta,
    primaryHref: "/contact",
    secondaryLabel: CEM_FINAL_CTA.secondaryCta,
    secondaryHref: "/contact",
  },
  relatedSlugs: [
    "web3-growth-agency",
    "crypto-marketing-agency",
    "ib-affiliate-growth",
    "market-maker-introductions",
    "token-launch-listing",
  ],
  schema: {
    serviceType: "Crypto Exchange Marketing",
    areaServed: "Worldwide",
    providerName: "Sigma",
  },
  visual: {
    accent: "navy",
    showGrid: true,
    heroDensity: "default",
  },
};
