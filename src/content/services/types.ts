/**
 * Strict typed content model for the scalable Services architecture.
 * Foundation only — existing /services routes are untouched.
 */

export type ServiceSlug =
  | "crypto-exchange-marketing"
  | "crypto-marketing-agency"
  | "ib-affiliate-growth"
  | "kol-infrastructure"
  | "market-maker-introductions"
  | "regional-market-expansion"
  | "web3-growth-agency";

export type ServiceKey =
  | "cryptoExchangeMarketing"
  | "cryptoMarketingAgency"
  | "ibAffiliateGrowth"
  | "kolInfrastructure"
  | "marketMakerIntroductions"
  | "regionalMarketExpansion"
  | "web3GrowthAgency";

export type ServiceIconName =
  | "activity"
  | "shield"
  | "cpu"
  | "code2"
  | "network"
  | "globe"
  | "sparkles"
  | "layers";

export type ServiceVisualType =
  | "default"
  | "network"
  | "growth"
  | "infrastructure"
  | "regional"
  | "liquidity";

export type ServiceSeoBlock = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalPath?: string;
};

export type ServiceAudienceItem = {
  id: string;
  title: string;
  description: string;
  icon?: ServiceIconName;
};

export type ServiceProblemItem = {
  id: string;
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export type ServiceModuleItem = {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon?: ServiceIconName;
};

export type ServiceMetricItem = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

export type ServiceComparisonColumn = {
  id: string;
  label: string;
};

export type ServiceComparisonRow = {
  id: string;
  feature: string;
  cells: Record<string, string | boolean>;
};

export type ServiceComparisonTable = {
  id: string;
  title: string;
  description?: string;
  columns: ServiceComparisonColumn[];
  rows: ServiceComparisonRow[];
};

export type ServiceDataTableColumn = {
  id: string;
  label: string;
  align?: "start" | "center" | "end";
};

export type ServiceDataTableRow = {
  id: string;
  cells: Record<string, string>;
};

export type ServiceDataTable = {
  id: string;
  title: string;
  description?: string;
  columns: ServiceDataTableColumn[];
  rows: ServiceDataTableRow[];
};

export type ServiceRegionalSection = {
  id: string;
  regionLabel: string;
  title: string;
  description: string;
  bullets?: string[];
};

export type ServiceEngagementStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ServiceCtaBlock = {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type ServiceSchemaConfig = {
  serviceType: string;
  areaServed?: string;
  providerName?: string;
};

export type ServiceVisualConfig = {
  accent?: "persian" | "uranian" | "navy";
  showGrid?: boolean;
  heroDensity?: "compact" | "default" | "tall";
};

export type ServiceDefinition = {
  slug: ServiceSlug;
  key: ServiceKey;
  href: `/services/${ServiceSlug}`;
  order: number;
  enabled: boolean;
  icon: ServiceIconName;
  visualType: ServiceVisualType;
  title: string;
  shortLabel: string;
  eyebrow: string;
  lead: string;
  intro: string;
  keywords: string[];
  seo: ServiceSeoBlock;
  audiences: ServiceAudienceItem[];
  problems: ServiceProblemItem[];
  process: ServiceProcessStep[];
  modules: ServiceModuleItem[];
  metrics: ServiceMetricItem[];
  comparisons: ServiceComparisonTable[];
  tables: ServiceDataTable[];
  regionalSections: ServiceRegionalSection[];
  engagement: ServiceEngagementStep[];
  riskDisclosure?: string;
  faq: ServiceFaqItem[];
  cta: ServiceCtaBlock;
  relatedSlugs: ServiceSlug[];
  schema: ServiceSchemaConfig;
  visual: ServiceVisualConfig;
};

export type ServiceCatalog = readonly ServiceDefinition[];
