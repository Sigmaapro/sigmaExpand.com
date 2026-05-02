import type { PageMeta } from "./meta";

export const teamPageMeta: PageMeta = {
  title: "Team",
  description:
    "Meet the operators and specialists behind Sigma’s Web3 growth and infrastructure programs.",
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
};

export const teamPageContent = {
  kicker: "People",
  headline: "Built by operators",
  intro:
    "Sigma blends markets, engineering, and creative execution. Representatives below illustrate the roles we staff on client programs—exact roster varies by engagement.",
  members: [
    {
      name: "Alex Rivera",
      role: "Head of Markets",
      bio: "Former desk lead focused on liquidity design and exchange partnerships across APAC and MENA.",
    },
    {
      name: "Jordan Kim",
      role: "Engineering Lead",
      bio: "Ships integrations and reliability improvements with teams transitioning from MVP to production scale.",
    },
    {
      name: "Sam Okonkwo",
      role: "Growth & Partnerships",
      bio: "Architects distribution programs spanning institutions, communities, and creator networks.",
    },
    {
      name: "Morgan Lee",
      role: "Strategy & Operations",
      bio: "Aligns roadmaps with measurable milestones and reporting stakeholders actually read.",
    },
  ] satisfies TeamMember[],
};
