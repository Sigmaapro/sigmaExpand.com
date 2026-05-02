import type { PageMeta } from "./meta";

export const faqPageMeta: PageMeta = {
  title: "FAQ",
  description:
    "Answers to common questions about Sigma’s engagement model, timelines, regions, and how we work with protocols and exchanges.",
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqPageContent = {
  kicker: "Help",
  headline: "Frequently asked questions",
  intro:
    "If you don’t see your question here, reach out via the contact page—we respond to serious inquiries quickly.",
  items: [
    {
      question: "What kinds of teams do you work with?",
      answer:
        "We primarily partner with crypto exchanges, infrastructure protocols, and growth-stage Web3 products that need liquidity, distribution, or technical execution at scale. If your roadmap touches markets or institutional stakeholders, we’re likely a fit.",
    },
    {
      question: "How do engagements typically start?",
      answer:
        "Most projects begin with a focused discovery phase: goals, constraints, jurisdictions, and success metrics. From there we propose a phased plan with clear milestones rather than open-ended retainers.",
    },
    {
      question: "Do you work globally?",
      answer:
        "Yes. We coordinate across time zones and tailor compliance and operational detail to the regions you operate in. Specific regulatory advice may require your counsel—we collaborate closely with your legal team.",
    },
    {
      question: "What should we prepare before the first call?",
      answer:
        "Product context, target markets, current metrics (even rough), and any hard deadlines such as listings or launches. The more concrete the goals, the faster we can recommend a path.",
    },
    {
      question: "How do we measure success?",
      answer:
        "We align on quantitative targets up front—liquidity depth, volume bands, acquisition costs, retention, or technical reliability—plus qualitative checkpoints with your stakeholders.",
    },
  ] satisfies FaqItem[],
};
