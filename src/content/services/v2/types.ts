import type { FinalServiceSlug } from "@/content/services/finalServices";

export type ServiceV2Cta = {
  label: string;
  href: string;
};

export type ServiceV2TextItem = {
  body: string;
};

export type ServiceV2NamedItem = {
  title: string;
  body: string;
};

export type ServiceV2FaqItem = {
  question: string;
  answer: string;
};

export type ServiceV2Step = {
  title: string;
  body: string;
};

export type ServiceV2Artefact = {
  id: string;
  body: string;
};

export type ServiceV2Module = {
  id: string;
  title: string;
  body: string;
  solves: string;
};

export type ServiceV2DecisionColumn = {
  title: string;
  body: string;
};

export type ServiceV2Visual = {
  label: string;
  caption: string;
  variant: "system";
};

export type ServiceV2Content = {
  slug: FinalServiceSlug;
  title: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight?: string;
    lead: string;
    primaryCta: ServiceV2Cta;
    secondaryCta?: ServiceV2Cta;
    walkAwayTitle: string;
    walkAway: string[];
    microTrust: string[];
    trustLine: string;
  };
  audience?: {
    eyebrow: string;
    title: string;
    fit: string[];
    notFit: string;
  };
  method?: {
    eyebrow: string;
    name: string;
    body: string;
    jobs: Array<{ id: string; body: string }>;
  };
  definition?: {
    eyebrow: string;
    title: string;
    body: string;
    notes: string[];
  };
  artefacts?: {
    eyebrow: string;
    title: string;
    lead: string;
    items: ServiceV2Artefact[];
    convert: {
      kicker: string;
      title: string;
      body: string;
      cta: ServiceV2Cta;
      proof: string[];
    };
  };
  systemVisual?: ServiceV2Visual;
  problem?: {
    eyebrow: string;
    title: string;
    body: string;
    familiarTitle: string;
    familiar: string[];
    insteadTitle: string;
    instead: string[];
    cta: ServiceV2Cta;
  };
  habits?: {
    eyebrow: string;
    title: string;
    items: ServiceV2NamedItem[];
  };
  modules?: {
    eyebrow: string;
    title: string;
    items: ServiceV2Module[];
  };
  process?: {
    eyebrow: string;
    title: string;
    steps: ServiceV2Step[];
  };
  engagement?: {
    eyebrow: string;
    title: string;
    body: string;
    chips: string[];
    entry: string;
  };
  decision?: {
    eyebrow: string;
    title: string;
    criteria: string[];
    options: ServiceV2DecisionColumn[];
  };
  objections?: {
    eyebrow: string;
    title: string;
    items: ServiceV2FaqItem[];
  };
  faq?: {
    eyebrow: string;
    title: string;
    items: ServiceV2FaqItem[];
  };
  risk?: {
    eyebrow: string;
    title: string;
    serviceNoticeTitle: string;
    serviceNotice: string;
    generalDisclaimerTitle: string;
    generalDisclaimer: string;
  };
  differentiation?: {
    eyebrow: string;
    title: string;
    body: string;
  };
  afterMessage?: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: string[];
  };
  finalCta?: {
    eyebrow: string;
    title: string;
    body: string;
    intents: string[];
    primaryCta: ServiceV2Cta;
    reassure: string;
  };
  relatedServices?: {
    eyebrow: string;
    title: string;
    lead: string;
    slugs: FinalServiceSlug[];
    allServicesLabel: string;
    allServicesHref: string;
  };
};
