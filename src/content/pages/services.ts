import type { PageMeta } from "./meta";

export const servicesPageMeta: PageMeta = {
  title: "Services",
  description:
    "Explore Sigma’s core capabilities: liquidity programs, risk & compliance layers, technical integration, and Web3-native growth execution.",
};

export type ServicesPageSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export const servicesPageContent = {
  kicker: "Capabilities",
  headline: "Everything you need to scale with confidence",
  intro:
    "Each engagement combines strategy, execution, and instrumentation. Below is how we typically structure work—your roadmap is tailored during onboarding.",
  sections: [
    {
      id: "liquidity",
      eyebrow: "Markets",
      title: "Liquidity & market structure",
      description:
        "Design and operate liquidity programs that stay resilient across regimes—from launch-day bootstrapping to mature two-sided markets.",
      bullets: [
        "Inventory and incentive design aligned with real trading depth targets",
        "Partner coordination across makers, venues, and internal desks",
        "Playbooks for stress scenarios, listings, and coordinated campaigns",
      ],
    },
    {
      id: "risk",
      eyebrow: "Trust",
      title: "Risk, compliance, and monitoring",
      description:
        "Operational rigor that satisfies stakeholders without slowing product velocity.",
      bullets: [
        "Control frameworks mapped to your jurisdiction and counterparty mix",
        "Real-time monitoring hooks and escalation paths your team can own",
        "Documentation packages suitable for partners and institutional reviewers",
      ],
    },
    {
      id: "integration",
      eyebrow: "Engineering",
      title: "Technical integration & APIs",
      description:
        "Ship connectors, data pipelines, and reliability improvements alongside go-to-market motions.",
      bullets: [
        "API-first integration patterns with clear SLIs/SLOs where it matters",
        "Collaboration with your engineering team through staging and production cutovers",
        "Runbooks and observability so incidents are rare—and recoverable",
      ],
    },
    {
      id: "growth",
      eyebrow: "Distribution",
      title: "Web3-native growth & partnerships",
      description:
        "Distribution that respects community norms while hitting concrete acquisition and retention goals.",
      bullets: [
        "Campaign architecture spanning creators, communities, and institutional channels",
        "Creative and messaging systems that stay on-brand across locales",
        "Attribution and funnel instrumentation tied to your north-star metrics",
      ],
    },
  ] satisfies ServicesPageSection[],
};
