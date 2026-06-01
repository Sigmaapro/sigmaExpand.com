import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

export type AboutCoreMember = {
  name: string;
  role: string;
  bio: string;
};

export type AboutPageBody = {
  kicker: string;
  headline: string;
  subhead: string;
  bodyLine: string;
  identity: [string, string, string];
  whySigmaExists: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  founderNote: {
    eyebrow: string;
    title: string;
    quote: string;
    attribution: string;
  };
  coreTeam: {
    eyebrow: string;
    title: string;
    intro: string;
    members: AboutCoreMember[];
    extendedNetwork: string;
    ndaLine: string;
    ctaLabel: string;
    ctaHref: string;
  };
  industryPov: {
    eyebrow: string;
    title: string;
    intro: string;
    principles: string[];
  };
  insideNetwork: {
    eyebrow: string;
    title: string;
    body: string;
    operatingPoints: { title: string; body: string }[];
  };
  vision: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  recognition: {
    eyebrow: string;
    title: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  transparency: {
    eyebrow: string;
    title: string;
    body: string;
  };
  invitation: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

export const aboutPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  TR: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  FA: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  ZH: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  ES: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  RU: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
  AR: {
    title: "About Sigma | The Operators Behind a Global Web3 Growth Network",
    description:
      "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  },
};

const EN_CONTENT: AboutPageBody = {
  kicker: "Who We Are",
  headline: "We Did Not Learn This Market From a Deck. We Built Inside It.",
  subhead:
    "Sigma is led by operators who grew exchanges, ran KOL portfolios, and built IB programs from inside the industry — before turning that experience into infrastructure.",
  bodyLine:
    "This page is about the people, the principles, and the path that brought Sigma into existence — not what we sell.",
  identity: ["Strategic.", "Trusted.", "Scalable."],
  whySigmaExists: {
    eyebrow: "Why Sigma Exists",
    title: "The Gap We Kept Seeing From the Inside",
    paragraphs: [
      "Most growth networks in crypto and finance were built by marketers looking at this industry from outside. We were already inside it.",
      "We watched exchanges spend millions on user acquisition while their IB programs ran in a different room. We watched brokers pay for KOL campaigns that hit the wrong audience in the wrong language. We watched token projects launch into 40 countries with one English deck and a Notion page. We watched creators build huge audiences they could not monetize. We watched IBs grind referrals without infrastructure, dashboards, or partner support.",
      "Marketing, product, KOLs, IBs, distribution, liquidity — all running on different clocks. Growth was leaking everywhere in between, and nobody was building the layer that connects them.",
      "Sigma exists to be that layer.",
    ],
  },
  story: {
    eyebrow: "Our Story",
    title: "How Sigma Was Built",
    paragraphs: [
      "The earliest version of Sigma was a group chat. Operators across crypto exchanges, broker desks, KOL networks, and BD teams — people who had worked on growth programs at LBank, BingX, MEXC, and during the Binance-era expansion, alongside multiple other crypto and finance platforms — comparing notes on what was actually working in different regions.",
      "What started as informal coordination became structural. We realized the same playbooks, the same KOL relationships, the same IB frameworks, the same regional intelligence — could be operated as infrastructure, not as one-off favors.",
      "We began running joint campaigns. Then joint launches. Then we noticed a pattern: every venue that plugged into the shared network grew faster than the ones that kept running alone. Not because the campaigns were more clever, but because acquisition, distribution, and liquidity were finally running on the same operating clock.",
      "That was the moment Sigma became a network, not a circle.",
      "Today, Sigma is a global infrastructure layer connecting platforms, creators, partners, and traders across crypto, forex, stocks, and Web3 — with operators on the ground in Dubai, Istanbul, Bali, Canada, and across MENA, GCC, Turkey, LATAM, CIS, and Persian-speaking markets.",
    ],
  },
  founderNote: {
    eyebrow: "From the Founder",
    title: "A Note from Omid Modaber",
    quote:
      "Sigma is the network I wished existed when I started inside this industry. Every operator I knew was solving the same problems alone — finding the right KOLs, structuring the right IB deals, breaking into the right regions, building the right campaigns. Everyone had pieces of the answer. Nobody had the system.\n\nSigma is the system. It is the infrastructure I would want to plug into if I were running an exchange today, growing a KOL channel, scaling an IB business, or entering a new market.\n\nWe are not here to be loud. We are here to be useful. Long after the bull market noise fades, the operators who built quietly — with structure, trust, and real performance — are the ones who compound. That is the brand we are building.",
    attribution: "Omid Modaber, Founder, Sigma",
  },
  coreTeam: {
    eyebrow: "The Core Team",
    title: "Who Builds Sigma",
    intro: "Sigma is led by five core partners, each running a domain of the network.",
    members: [
      {
        name: "Omid Modaber",
        role: "Strategic Growth Consultant",
        bio: "Sets the long-term direction of Sigma. Focused on strategy, exchange partnerships, regional expansion, and the operating principles the network runs on.",
      },
      {
        name: "Arad Moaf",
        role: "Strategic Growth Consultant",
        bio: "Owns how Sigma enters and grows in new regions. Builds the relationships and execution frameworks that make Sigma operate locally — not just globally.",
      },
      {
        name: "Novin Ghasemi",
        role: "Strategic Growth Consultant",
        bio: "Runs the engine room. Translates strategy into campaigns, partnerships, and growth motions across the network’s platforms and creators.",
      },
      {
        name: "Hosein Rostami",
        role: "Strategic Growth Consultant",
        bio: "Connects the moving parts. Ensures that what is promised on the strategy side is actually executable on the operations side — across teams, regions, and partners.",
      },
      {
        name: "Mostafa Moradi",
        role: "Strategic Growth Consultant",
        bio: "Owns Sigma’s community side. Builds and maintains the human layer that turns campaigns into long-term loyalty and creators into compounding networks.",
      },
    ],
    extendedNetwork:
      "Beyond the five core partners, Sigma operates with regional community managers, KOL managers, BD specialists, content collaborators, localization leads, and partner operators in every priority market.",
    ndaLine:
      "Several Sigma team members hold senior roles inside operating financial platforms. Specific platform affiliations are protected under NDA.",
    ctaLabel: "Full Team Page",
    ctaHref: ROUTES.team,
  },
  industryPov: {
    eyebrow: "Industry POV",
    title: "The Principles Behind Every Decision We Make",
    intro:
      "These are the convictions Sigma was built on. They explain not just what we do, but what we refuse to do.",
    principles: [
      "We believe growth is a system, not a campaign. Any agency can run a campaign. Almost none can build the operating system around it. We build the system first — campaigns are outputs, not strategies.",
      "We believe operators beat marketers in this industry. The financial industry is too technical, too risk-aware, and too compliance-bound for outside marketers to fake. The people running growth should have lived inside the product.",
      "We believe distribution is the most underbuilt layer in Web3. Everyone builds product. Almost no one builds the network that gets that product to the right region, the right language, the right creator, the right user — in the right order. That is the gap we fill.",
      "We believe trust outlasts every market cycle. Bull markets reward hype. Bear markets reward trust. We are building for both — which means no guaranteed-profit promises, no fake numbers, no shortcuts that cost partners later.",
      "We believe regional execution beats global average. “Web3 is global” is true at the airport. On the ground, every market has its own KOLs, its own language, its own payment behavior, its own compliance constraints. We grow region by region.",
      "We believe in long compounding over short impressions. We measure success in quarters and years, not weeks. Vanity metrics do not appear in Sigma reports.",
    ],
  },
  insideNetwork: {
    eyebrow: "Inside the Network",
    title: "How We Run",
    body:
      "Sigma is not built like a traditional agency. There is no creative department, no account managers, no client-services layer between operators and partners.",
    operatingPoints: [
      {
        title: "One operating rhythm.",
        body: "Every partner engagement runs on a weekly telemetry cadence. Strategy, execution, and reporting happen on the same clock — not in different rooms.",
      },
      {
        title: "Senior-led delivery.",
        body: "The person you meet at kickoff is the person delivering the work three months later. We do not hand off to junior teams after the contract closes.",
      },
      {
        title: "Cross-domain teams.",
        body: "Every Sigma engagement includes operators from BD, KOL, community, and analytics — not handed off between silos. Growth problems are cross-functional; the team should be too.",
      },
      {
        title: "Regional autonomy with central intelligence.",
        body: "Local operators run local execution. Central Sigma intelligence shares what is working across regions — so playbooks compound instead of being reinvented.",
      },
    ],
  },
  vision: {
    eyebrow: "Vision",
    title: "The Sigma We’re Building",
    paragraphs: [
      "Inside one year, Sigma will be the recognized financial growth network across MENA, GCC, Turkey, Europe, LATAM, CIS, and Persian-speaking communities — with named regional operators and live execution in every priority market.",
      "Inside three years, Sigma will be the default growth infrastructure layer for Finance and Web3 globally — with proprietary growth tools, an institutional KOL and BD network, helper products serving every layer of the financial value chain, and a brand position alongside the most trusted names in crypto growth.",
      "But the more honest version of the vision is this: we want to be the network that operators inside the industry recommend to each other when nobody is watching. Public credibility is built; private credibility is earned.",
      "We are building for private credibility first.",
    ],
  },
  recognition: {
    eyebrow: "The Network That Trusts Sigma",
    title: "Who We Work With",
    body:
      "Sigma’s team has contributed to growth, BD, and KOL operations across major global exchange ecosystems, multiple crypto and finance platforms, and a network of token projects, brokers, prop firms, and Web3 protocols. Specific platform names and engagement details are protected under NDA. Verified case studies and references are available to qualified partners on request.",
    ctaLabel: "Request References & Case Studies",
    ctaHref: ROUTES.contact,
  },
  transparency: {
    eyebrow: "Transparency",
    title: "For the Avoidance of Doubt",
    body:
      "Sigma is a growth network. Sigma is not a broker, exchange, investment fund, fund manager, or licensed financial advisor. Sigma does not hold, custody, or trade user funds. Sigma does not guarantee profits, withdrawals, or financial outcomes. Users are responsible for their own financial decisions and regulatory compliance.",
  },
  invitation: {
    eyebrow: "If You’re Reading This",
    title: "Two Kinds of People Should Get In Touch",
    body:
      "If you operate a platform, run a KOL channel, lead an IB business, or trade at serious volume — and you have read this page and felt that we are speaking the same language — get in touch. That alignment usually predicts a good partnership.\n\nIf you came to this page looking for guaranteed returns, magic signals, or a shortcut to overnight growth — we are not the network for you, and we will save us both some time by saying so here.",
    primaryCtaLabel: "Partner with Sigma",
    primaryCtaHref: ROUTES.contact,
    secondaryCtaLabel: "Apply as KOL / IB",
    secondaryCtaHref: ROUTES.contact,
  },
};

export const aboutPageContentByLang: Record<LangCode, AboutPageBody> = {
  EN: EN_CONTENT,
  TR: EN_CONTENT,
  FA: EN_CONTENT,
  ZH: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
