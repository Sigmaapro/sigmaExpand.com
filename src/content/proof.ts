/**
 * Homepage proof layer — CMS-ready structured content.
 * Replace values here or wire to a headless CMS; layout lives in `ProofLayer`.
 */

export type { ProofMetric } from "./metrics";
export type { ProofTestimonial } from "./testimonials";
export { proofMetrics as metrics } from "./metrics";
export { proofTestimonials as testimonials } from "./testimonials";

export type ProofClientLogo = {
  id: string;
  /** Screen reader / SEO */
  alt: string;
  /** Monochrome-friendly wordmark when `imageSrc` is omitted */
  wordmark: string;
  /** Optional logo URL (local `/…` or configured remote) */
  imageSrc?: string;
  href?: string;
};

export const proofTrustedByCopy = {
  sectionLabel: "TRUSTED BY",
  headline: "Built with teams shaping Web3",
} as const;

/** Partner / client marks — swap `imageSrc` for real assets when available */
export const clientLogos: ProofClientLogo[] = [
  {
    id: "vertex",
    alt: "Vertex Digital Markets",
    wordmark: "VERTEX",
    href: undefined,
  },
  {
    id: "helio",
    alt: "Helios Liquidity Labs",
    wordmark: "HELIOS",
  },
  {
    id: "nexus",
    alt: "Nexus Chain Foundation",
    wordmark: "NEXUS",
  },
  {
    id: "atlas",
    alt: "Atlas Prime Trading",
    wordmark: "ATLAS",
  },
  {
    id: "meridian",
    alt: "Meridian Markets Group",
    wordmark: "MERIDIAN",
  },
  {
    id: "quant",
    alt: "Quant Harbor Research",
    wordmark: "QUANT",
  },
];

export const proofInNumbersCopy = {
  sectionLabel: "PROOF IN NUMBERS",
  headline: "Execution that moves users, volume, and reach",
} as const;

export const partnerFeedbackCopy = {
  sectionLabel: "PARTNER FEEDBACK",
  headline: "What partners say about working with Sigma",
} as const;
