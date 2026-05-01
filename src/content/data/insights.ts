// This file is safe to edit for content updates (no code knowledge needed)

/**
 * Sigma Insights — structured editorial model (CMS-ready).
 * Editors change this file (or a future CMS); layout lives in components.
 */

export type InsightContentBlock =
  | { type: "heading"; content: string; level?: 2 | 3 }
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[] }
  | { type: "insight"; content: string }
  | { type: "cta"; slot: "mid" | "end"; label: string; href: string };

export type InsightPost = {
  title: string;
  slug: string;
  category: string;
  intro: string;
  excerpt: string;
  coverImage: string;
  publishDate: string;
  author: string;
  readTime: string;
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  content: InsightContentBlock[];
  relatedSlugs: string[];
};

/** Alias for editorial naming */
export type InsightArticle = InsightPost;

const cover = (path: string) =>
  `https://images.unsplash.com/${path}?auto=format&fit=crop&w=1600&q=80`;

export const insightPosts: InsightPost[] = [
  {
    title: "How Web3 Growth Actually Scales",
    slug: "how-web3-growth-scales",
    excerpt:
      "When acquisition, narrative, and market execution share one operating clock, growth stops behaving like a campaign and starts compounding.",
    intro:
      "Scaling in Web3 is rarely a budget problem. It is a sequencing problem: the wrong signal at the wrong layer burns capital while the market moves on.",
    category: "Growth",
    author: "Sigma Growth Desk",
    readTime: "7 min",
    featured: true,
    publishDate: "2026-04-18",
    coverImage: cover("photo-1551288049-bebda4e38f71"),
    seoTitle: "How Web3 Growth Actually Scales | Sigma Insights",
    seoDescription:
      "Sigma’s framework for compounding Web3 growth through aligned acquisition, distribution, and liquidity systems.",
    ogImage: cover("photo-1551288049-bebda4e38f71"),
    relatedSlugs: [
      "from-acquisition-to-liquidity-activation",
      "distribution-architecture-web3-teams",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "Most teams measure growth as throughput: signups, deposits, impressions. Desks that win measure intent density-how quickly qualified demand converts into repeatable market behavior without collapsing when incentives rotate.",
      },
      {
        type: "heading",
        content: "The three layers that must stay aligned",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Acquisition surfaces that admit only cohorts with executable intent, not vanity reach.",
          "Distribution cadence that matches product and liquidity milestones instead of editorial calendars.",
          "Telemetry that answers what to do next Monday, not what looked impressive last quarter.",
        ],
      },
      {
        type: "insight",
        content:
          "Growth scales when every channel knows its role in the same story. Fragmented narratives create expensive noise; aligned narratives create leverage.",
      },
      {
        type: "cta",
        slot: "mid",
        label: "Get Access",
        href: "/#connect",
      },
      {
        type: "heading",
        content: "Operational implication",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "We run growth as infrastructure: fewer campaigns, more checkpoints. Each cohort is tied to a partner graph, a liquidity hypothesis, and a kill switch when quality drifts. That discipline is what separates durable throughput from one-off spikes.",
      },
      {
        type: "cta",
        slot: "end",
        label: "Work with Sigma",
        href: "/#contact",
      },
    ],
  },
  {
    title: "Why KOL Strategy Fails Without Distribution Logic",
    slug: "kol-strategy-distribution-logic",
    excerpt:
      "Influence without routing, timing, and accountability produces reach that decays the moment the retainer ends.",
    intro:
      "KOL programs fail when they are treated as media buys. In Web3, they must behave like nodes in a distribution system-with incentives, disclosure, and compounding loops.",
    category: "Distribution",
    author: "Sigma Network",
    readTime: "6 min",
    publishDate: "2026-04-12",
    coverImage: cover("photo-1526374965328-7f61d4dc18c5"),
    seoTitle: "KOL Strategy & Distribution Logic | Sigma Insights",
    seoDescription:
      "Why partner and KOL graphs need distribution architecture-not follower counts-to drive durable Web3 outcomes.",
    ogImage: cover("photo-1526374965328-7f61d4dc18c5"),
    relatedSlugs: [
      "distribution-architecture-web3-teams",
      "how-web3-growth-scales",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "The mistake is optimizing for impressions. The win is building a partner graph where each node reinforces the next: traders, builders, and media with aligned incentives and clear disclosure boundaries.",
      },
      {
        type: "heading",
        content: "Selection criteria that survive scrutiny",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Audience-product fit over follower count.",
          "Cadence that matches product milestones-not hype cycles.",
          "Measurement that tracks lift and retention, not screenshots of reach.",
        ],
      },
      {
        type: "heading",
        content: "Compounding loops",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "We design loops: activation -> proof -> story -> deeper partnership. Noise happens when loops are skipped for short-term spikes.",
      },
      {
        type: "insight",
        content:
          "Principle - A smaller, trusted graph outperforms a loud one. Sigma scales by depth first, reach second.",
      },
      {
        type: "cta",
        slot: "mid",
        label: "Get Access",
        href: "/#connect",
      },
      {
        type: "paragraph",
        content:
          "When the graph is right, distribution feels inevitable: the market hears one coherent narrative from multiple credible voices instead of conflicting incentives leaking into price.",
      },
      {
        type: "cta",
        slot: "end",
        label: "Work with Sigma",
        href: "/#contact",
      },
    ],
  },
  {
    title: "From User Acquisition to Liquidity Activation",
    slug: "from-acquisition-to-liquidity-activation",
    excerpt:
      "Growth only becomes infrastructure when user intent is translated into recurring market activity.",
    intro:
      "Most teams separate acquisition and market ops. Sigma treats them as one system with one operating clock.",
    category: "Growth",
    author: "Sigma Growth Desk",
    readTime: "8 min",
    publishDate: "2026-04-09",
    coverImage: cover("photo-1460925895917-afdab827c52f"),
    seoTitle: "From User Acquisition to Liquidity Activation | Sigma Insights",
    seoDescription:
      "How Sigma turns acquisition programs into durable liquidity outcomes.",
    ogImage: cover("photo-1460925895917-afdab827c52f"),
    relatedSlugs: [
      "liquidity-depth-distribution",
      "how-web3-growth-scales",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "Acquisition is not finished when a user signs up. It is finished when behavior becomes repeatable in markets, wallets, and communities.",
      },
      {
        type: "heading",
        content: "Bridge design",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Map channels to high-intent cohorts, not top-of-funnel vanity.",
          "Connect incentives to milestone behavior rather than one-click actions.",
          "Instrument conversion lag between registration and meaningful execution.",
        ],
      },
      {
        type: "insight",
        content:
          "Acquisition costs fall when activation loops are operationalized, not outsourced.",
      },
      {
        type: "cta",
        slot: "mid",
        label: "Get Access",
        href: "/#connect",
      },
      {
        type: "paragraph",
        content:
          "The handoff between growth and liquidity must be designed as a product surface, not as a Slack message between teams.",
      },
      {
        type: "cta",
        slot: "end",
        label: "Work with Sigma",
        href: "/#contact",
      },
    ],
  },
  {
    title: "Liquidity Depth Is a Distribution Problem",
    slug: "liquidity-depth-distribution",
    excerpt:
      "Why routing alone is insufficient when markets need conviction, not just quotes.",
    intro:
      "Exchanges and protocols often treat depth as a static metric. In practice, it is a function of who shows up, when, and under what incentives.",
    category: "Liquidity",
    author: "Sigma Strategy",
    readTime: "7 min",
    publishDate: "2026-03-18",
    coverImage: cover("photo-1451187580459-43490279c0fa"),
    seoTitle: "Liquidity Depth Is a Distribution Problem | Sigma Insights",
    seoDescription:
      "A strategic view on liquidity, routing, and incentive design for Web3 markets.",
    ogImage: cover("photo-1451187580459-43490279c0fa"),
    relatedSlugs: [
      "from-acquisition-to-liquidity-activation",
      "kol-strategy-distribution-logic",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "Most growth playbooks start with traffic. Sigma starts with alignment: matching supply, demand, and narrative so depth compounds instead of evaporates after campaigns end.",
      },
      {
        type: "heading",
        content: "Three failure modes",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "\"Liquidity without distribution logic is just temporary noise with better charts.\" - Sigma Intelligence",
      },
      {
        type: "list",
        items: [
          "Incentives that attract mercenary volume instead of repeat flow.",
          "Routing optimizations that ignore participant trust and timing.",
          "Reporting that tracks impressions while missing executable outcomes.",
        ],
      },
      {
        type: "insight",
        content:
          "Depth follows distribution. If your surfaces do not reward the right actors at the right cadence, liquidity will always look fine on slides and fragile in production.",
      },
      {
        type: "cta",
        slot: "mid",
        label: "Get Access",
        href: "/#connect",
      },
      {
        type: "heading",
        content: "What we optimize instead",
        level: 2,
      },
      {
        type: "paragraph",
        content:
          "We map the path from first touch to repeated execution: which cohorts convert, where friction returns, and which partners amplify rather than dilute the story.",
      },
      {
        type: "heading",
        content: "Operational implication",
        level: 3,
      },
      {
        type: "paragraph",
        content:
          "Treat liquidity as a living system: measure refill rate, not a single snapshot. Build playbooks that tighten as markets move, not decks that celebrate a single week.",
      },
      {
        type: "cta",
        slot: "end",
        label: "Work with Sigma",
        href: "/#contact",
      },
    ],
  },
  {
    title: "Distribution Architecture for Web3 Teams",
    slug: "distribution-architecture-web3-teams",
    excerpt:
      "Why fragmented channels fail and what an execution-first distribution layer looks like.",
    intro:
      "Distribution is a system design problem. The strongest teams align message, timing, and operator accountability across every surface.",
    category: "Distribution",
    author: "Sigma Distribution",
    readTime: "6 min",
    publishDate: "2026-03-05",
    coverImage: cover("photo-1518186285589-2f7649de83e0"),
    seoTitle: "Distribution Architecture for Web3 Teams | Sigma Insights",
    seoDescription:
      "Execution-first distribution systems for exchanges, protocols, and growth operators.",
    ogImage: cover("photo-1518186285589-2f7649de83e0"),
    relatedSlugs: [
      "kol-strategy-distribution-logic",
      "liquidity-depth-distribution",
    ],
    content: [
      {
        type: "paragraph",
        content:
          "A channel list is not a distribution strategy. Sigma builds operating layers where each channel has a role, a KPI, and an owner.",
      },
      {
        type: "heading",
        content: "Minimum viable distribution stack",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Narrative backbone shared across paid, owned, and partner channels.",
          "Cadence planning synced to liquidity and product milestones.",
          "Escalation paths for underperforming surfaces in real time.",
        ],
      },
      {
        type: "paragraph",
        content:
          "\"Scale comes from coherence, not volume.\" - Sigma Operations",
      },
      {
        type: "cta",
        slot: "mid",
        label: "Get Access",
        href: "/#connect",
      },
      {
        type: "cta",
        slot: "end",
        label: "Work with Sigma",
        href: "/#contact",
      },
    ],
  },
];

export function getAllInsightsPosts(): InsightPost[] {
  return [...insightPosts].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
  );
}

export function getInsightBySlug(slug: string): InsightPost | undefined {
  return insightPosts.find((p) => p.slug === slug);
}

export function getInsightSlugs(): string[] {
  return insightPosts.map((p) => p.slug);
}

export function getCategories(): string[] {
  const set = new Set<string>();
  for (const p of insightPosts) set.add(p.category);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(
  post: InsightPost,
  limit = 3,
): InsightPost[] {
  const out: InsightPost[] = [];
  for (const slug of post.relatedSlugs) {
    const p = getInsightBySlug(slug);
    if (p && p.slug !== post.slug) out.push(p);
    if (out.length >= limit) break;
  }
  if (out.length < limit) {
    for (const p of getAllInsightsPosts()) {
      if (p.slug === post.slug) continue;
      if (out.some((x) => x.slug === p.slug)) continue;
      out.push(p);
      if (out.length >= limit) break;
    }
  }
  return out.slice(0, limit);
}
