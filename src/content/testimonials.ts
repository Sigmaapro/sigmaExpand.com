/**
 * Proof-layer testimonials (partner feedback band).
 */

export type ProofTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  logoSrc?: string;
  avatarSrc?: string;
};

export const proofTestimonials: ProofTestimonial[] = [
  {
    id: "t1",
    quote:
      "Sigma does not ship vanity campaigns. They wire acquisition to liquidity checkpoints and hold the line on reporting until the desk can act on it.",
    name: "Elena Marchetti",
    role: "Head of Growth",
    company: "Global CEX desk",
  },
  {
    id: "t2",
    quote:
      "We finally had one operating rhythm across KOLs, product milestones, and market events. The reduction in coordination tax alone was material.",
    name: "James Okonkwo",
    role: "VP Ecosystem",
    company: "Layer-1 foundation",
  },
  {
    id: "t3",
    quote:
      "Their team speaks execution: fewer decks, more playbooks, and telemetry that actually changes our weekly priorities.",
    name: "Sarah Chen",
    role: "CMO",
    company: "DeFi protocol",
  },
];
