/**
 * CMS-ready content contracts for the SIGMA marketing site.
 * Visual layout lives in components; editors change data here (or future CMS).
 */

import type { SocialPlatformKey } from "./socials";

export type LangCode = "EN" | "TR" | "ZH" | "FA" | "ES" | "RU" | "AR";

/** Labels for homepage social grid (brand names may repeat across locales). */
export type SocialPlatformLabelsMap = Record<SocialPlatformKey, string>;

export type StayConnectedContent = {
  kicker: string;
  title: string;
  description: string;
  reachUsPrefix: string;
  socialLabels: SocialPlatformLabelsMap;
};

export type NavContent = {
  system: string;
  capabilities: string;
  network: string;
  metrics: string;
  sigmaPro: string;
  contact: string;
  navCta: string;
  /** External blog / insights — opens in new tab from navbar */
  insights: string;
  /** Short homepage CTA label used in Insights chrome */
  insightsAccessLabel: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  supporting: string;
  primaryCta: string;
  secondaryCta: string;
  primaryHref: string;
  secondaryHref: string;
  /** Remote or absolute URL for hero logo PNG/SVG */
  logoSrc: string;
  /** Scroll affordance label (legacy hero layout) */
  scrollHint: string;
};

export type PillarCard = { title: string; description: string };

export type WhatIsSigmaContent = {
  label: string;
  headline: string;
  description: string;
  pillars: PillarCard[];
};

/** Maps to lucide icons in `ServicesSection` (SigmaLanding). */
export type ServiceIconId = "activity" | "shield" | "cpu" | "code2";

export type ServiceCard = {
  title: string;
  description: string;
  /** Optional ribbon / category for CMS */
  tag?: string;
  /** Optional icon key; UI falls back to card order when omitted */
  icon?: ServiceIconId;
};

export type ServicesContent = {
  sectionLabel: string;
  headline: string;
  /** Optional subhead under headline (alternate layouts) */
  subtitle?: string;
  cards: ServiceCard[];
};

export type MetricStat = {
  label: string;
  target: number;
  suffix: string;
};

export type MetricsContent = {
  /** Small caps label above the metrics headline */
  kicker: string;
  /** Primary headline for the on-page metrics strip */
  title: string;
  stats: [MetricStat, MetricStat, MetricStat];
};

export type SigmaProContent = {
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  footnote: string;
};

export type TrustedByLogo = {
  src: string;
  alt: string;
  href?: string;
};

export type TrustedByContent = {
  sectionLabel: string;
  logos: TrustedByLogo[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logoSrc?: string;
  imageSrc?: string;
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterContent = {
  rights: string;
  statusPrefix: string;
  statusValue: string;
  /** Muted tagline on wide layouts */
  tagline: string;
  /** Landmark label when footer includes a link nav */
  navAriaLabel: string;
  links?: FooterLink[];
};

export type ContactContent = {
  kicker: string;
  title: string;
  description: string;
  emailCta: string;
  socialCta: string;
  /** Used when `NEXT_PUBLIC_SOCIAL_EMAIL` is not set */
  fallbackMailto: string;
};

export type CtaContent = {
  title: string;
  description: string;
  /** Optional CTAs for alternate layouts (e.g. legacy landing sections) */
  primaryCta?: string;
  secondaryCta?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export type NetworkSectionContent = {
  kicker: string;
  title: string;
  body: string;
};

export type SocialLabelKey =
  | "instagram"
  | "x"
  | "linkedin"
  | "telegram"
  | "discord"
  | "email"
  | "website";

export type ContactHubContent = {
  pageEyebrow: string;
  title: string;
  subtitle: string;
  backHome: string;
  empty: string;
  labels: Record<SocialLabelKey, string>;
  /** One-line footer (include year if desired) */
  footerLine: string;
};

export type LiveSupportPanelContent = {
  panelTitle: string;
  panelSubtitle: string;
  panelAriaLabel: string;
  closeAria: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
  submitSending: string;
  successBody: string;
  footerNote: string;
  validationError: string;
  invalidEmailError: string;
  sendError: string;
};

export type NavChromeStrings = {
  brandAria: string;
  openMenuAria: string;
  closeMenuAria: string;
  /** Mobile menu toggle (Sigma landing glass nav) */
  languageMenuAria: string;
};

export type UiStrings = {
  liveSupport: string;
  liveSupportPanel: LiveSupportPanelContent;
  navChrome: NavChromeStrings;
  /** Logo / brand image alt */
  logoAlt: string;
  /** Section deep-link CTA (replaces “More info”) */
  learnMore: string;
};

export type AboutContent = {
  kicker: string;
  title: string;
  description: string;
};

export type InsightsUiContent = {
  pageTitle: string;
  pageSubtitle: string;
  pageEyebrow: string;
  filterAllLabel: string;
  readLabel: string;
  relatedHeading: string;
  backToInsights: string;
  sigmaHome: string;
  chromeNavAriaLabel: string;
  categoryTablistAriaLabel: string;
  featuredLabel: string;
  emptyState: string;
  insightBadge: string;
  insightAriaLabel: string;
  articleCtaMidHeading: string;
  articleCtaMidSupporting: string;
  articleCtaMidButton: string;
  articleCtaEndHeading: string;
  articleCtaEndSupporting: string;
  articleCtaEndButton: string;
  categories: {
    growth: string;
    distribution: string;
    liquidity: string;
  };
};

/** Hero glass card carousel — labels only; slide copy uses insights / services / proof slices */
export type HeroCarouselContent = {
  carouselAriaLabel: string;
  ecosystemCtaLabel: string;
  proofCtaLabel: string;
  paginationDotLabels: readonly [string, string, string];
};

export type SiteTranslations = {
  nav: NavContent;
  insights: InsightsUiContent;
  hero: HeroContent;
  whatIsSigma: WhatIsSigmaContent;
  about: AboutContent;
  services: ServicesContent;
  metrics: MetricsContent;
  /** Network / mesh narrative (alternate landing layout) */
  network: NetworkSectionContent;
  sigmaPro: SigmaProContent;
  contact: ContactContent;
  /** Homepage bottom contact / social strip (`#contact`) */
  stayConnected: StayConnectedContent;
  /** Dedicated /contact hub page */
  contactHub: ContactHubContent;
  cta: CtaContent;
  ui: UiStrings;
  footer: FooterContent;
  trustedBy: TrustedByContent;
  testimonials: Testimonial[];
  heroCarousel: HeroCarouselContent;
};
