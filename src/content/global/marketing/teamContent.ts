import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

const MALE_MEMBER_PLACEHOLDER = "/images/team/placeholders/member-placeholder-male.jpg";
const FEMALE_MEMBER_PLACEHOLDER = "/images/team/placeholders/member-placeholder-female.jpg";
const TEAM_PROFILE_MARKETS = ["Asia", "Americas", "Europe", "Africa"] as const;
const UK_MEMBER_IDS = new Set(["shahrzad-rostami", "shahan-behkam-rad", "babak-ravanbakhsh"]);

export type TeamMember = {
  id: string;
  slug?: string;
  name: string;
  role?: string;
  /** Optional operating title distinct from the Sigma team-card role. */
  currentPosition?: string;
  group: "core" | "innerCircle" | "contributors";
  eyebrow?: string;
  headline?: string;
  initials?: string;
  portrait?: string | null;
  coverImage?: string | null;
  imageSrc?: string | null;
  portraitObjectPosition?: string;
  portraitScale?: number;
  shortBio?: string;
  fullBio?: string;
  skills?: string[];
  services?: Array<
    | string
    | {
        title: string;
        description?: string;
      }
  >;
  careerHistory?: Array<{
    dateRange?: string;
    role?: string;
    organization?: string;
    description?: string;
  }>;
  achievements?: Array<{
    title?: string;
    description?: string;
    year?: string;
    link?: string;
    linkLabel?: string;
  }>;
  /** Optional override for the achievements section heading. */
  achievementsTitle?: string;
  /** Named people represented by a combined profile (e.g. Goli Brothers). */
  relatedPersons?: Array<{
    name: string;
    jobTitle?: string;
    linkedin?: string;
  }>;
  markets?: string[];
  /** Optional editorial note under the footprint section (network context, not a map). */
  footprintNote?: string;
  location?: {
    city?: string;
    country: string;
    countryCode: string;
  };
  languages?: string[];
  quote?: string;
  quotes?: string[];
  linkedin?: string;
  email?: string;
  website?: string;
  socialLinks?: Array<{ label: string; href: string }>;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  profileStatus?: "draft" | "active" | "archived";
  bio?: string;
};

/** Only `active` profiles are publicly indexable (sitemap + robots index). */
export function isTeamMemberPubliclyIndexable(member: TeamMember): boolean {
  return member.profileStatus === "active";
}

function withPlaceholderImage(member: TeamMember, placeholderSrc: string): TeamMember {
  if (member.portrait || member.imageSrc) return member;
  return { ...member, imageSrc: placeholderSrc };
}

function withMemberProfileDefaults(member: TeamMember): TeamMember {
  const isUk = UK_MEMBER_IDS.has(member.id);
  return {
    ...member,
    location: isUk
      ? {
          country: "United Kingdom",
          countryCode: "GB",
        }
      : {
          city: "Dubai",
          country: "United Arab Emirates",
          countryCode: "AE",
        },
    languages: ["English"],
    markets: [...TEAM_PROFILE_MARKETS],
  };
}

export type TeamMarketingBody = {
  kicker: string;
  headline: string;
  intro: string;
  boardKicker: string;
  boardTitle: string;
  sigmaLabel: string;
  coreLabel: string;
  innerCircleLabel: string;
  contributorsLabel: string;
  coreMembers: TeamMember[];
  innerCircleMembers: TeamMember[];
  contributorsMembers: TeamMember[];
  extendedNetwork: string;
  ndaLine: string;
  ctaLabel: string;
  ctaHref: string;
};

export const teamPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  FA: {
    title: "افراد پشت Sigma",
    description:
      "Sigma توسط تیمی اصلی از مشاوران رشد، BD، بازاریابی و توسعه بازار با تجربه عملی در اکوسیستم‌های بزرگ مالی هدایت می‌شود.",
  },
  ZH: {
    title: "Sigma 背后的人",
    description:
      "Sigma 由在交易所生态与金融平台拥有实战经验的增长、BD、营销与市场拓展顾问核心团队领导。",
  },
  ES: {
    title: "Las personas detrás de Sigma",
    description:
      "Sigma está liderada por un equipo núcleo de consultores de crecimiento, BD, marketing y expansión de mercado con experiencia práctica.",
  },
  RU: {
    title: "Люди за Sigma",
    description:
      "Sigma возглавляется ядром консультантов по росту, BD, маркетингу и рыночной экспансии с практическим отраслевым опытом.",
  },
  AR: {
    title: "الأشخاص وراء Sigma",
    description:
      "تقود Sigma نواة من مستشاري النمو وBD والتسويق وتوسّع الأسواق بخبرة عملية في المنظومات المالية الكبرى.",
  },
};

function buildCoreMembers(roleLabel: string): TeamMember[] {
  return [
    {
      ...withMemberProfileDefaults({
        id: "omid-modaber",
        name: "Omid Modaber",
        role: "Founder & Strategic Growth Consultant",
        currentPosition: "Business Development Team Manager — LBank",
        group: "core",
        initials: "OM",
        imageSrc: "/images/team/omid-modaber.jpg",
        portrait: "/images/team/omid-modaber.jpg",
        portraitObjectPosition: "center 18%",
        profileStatus: "active",
        headline:
          "Founder of Sigma and Web3 business development leader managing a 30+ person team and a network of 1,000+ KOLs, IBs, influencers, marketing partners, communities, and social channels across MENA, LATAM, and global financial markets.",
        shortBio:
          "Omid Modaber is the Founder and Strategic Growth Consultant at Sigma and a Web3 business development leader with experience across crypto exchanges, financial platforms, KOL and IB ecosystems, and market analysis since 2017. He also serves as a Business Development Team Manager at LBank, leading a team of more than 30 business development and marketing professionals and working across a network of 1,000+ KOLs, IBs, influencers, marketing partners, communities, and social channels. His regional experience spans MENA, the GCC, Persian-speaking markets, LATAM, Europe, and wider international Web3 ecosystems.",
        bio: "Omid Modaber is the Founder and Strategic Growth Consultant at Sigma and a Web3 business development leader with experience across crypto exchanges, financial platforms, KOL and IB ecosystems, and market analysis since 2017. He also serves as a Business Development Team Manager at LBank, leading a team of more than 30 business development and marketing professionals and working across a network of 1,000+ KOLs, IBs, influencers, marketing partners, communities, and social channels. His regional experience spans MENA, the GCC, Persian-speaking markets, LATAM, Europe, and wider international Web3 ecosystems.",
        fullBio:
          "Omid Modaber is the Founder of Sigma and a strategic growth consultant specialising in the operating systems behind Web3 and financial-platform expansion. His work covers exchange partnerships, KOL and IB ecosystems, creator and influencer networks, regional market entry, user acquisition, affiliate structures, business-development leadership, and performance-oriented commercial strategy.\n\nSince entering the cryptocurrency industry in 2017, Omid has progressed from trading, market research, fundamental analysis, and on-chain data analysis into business development and regional growth leadership. His professional background includes roles with LBank, BingX, ePlanet Brokers, Xiroco, MaxDigital Corporation, Max Holding, and other crypto and financial ventures.\n\nAcross these roles, he has designed affiliate and introducing-broker structures, built and managed business-development teams, developed strategic relationships with KOLs, creators, trading communities, and financial-industry decision-makers, and supported high-volume exchange growth across MENA, the GCC, Persian-speaking markets, LATAM, Europe, and other international markets.\n\nOmid currently leads and develops a distributed team of 30+ business development and marketing professionals. He works across a network of more than 1,000 KOLs, IBs, influencers, marketing partners, communities, and social channels, while maintaining an extensive network of high-impact operators and decision-makers across the financial and Web3 industries.\n\nDuring his time with BingX, Omid supported creator and artist sponsorship initiatives, including activity involving Persian hip-hop artist Gdaal, and contributed to regional business-development efforts around the period in which BingX launched its partnership with Chelsea FC. At LBank, he works within an international business-development organisation as the exchange expands its global visibility through major partnerships, including its official regional sponsorship of the Argentina National Team through the Argentine Football Association (AFA).\n\nOmid founded Sigma after identifying a recurring gap across the industry: exchanges, brokers, creators, affiliates, communities, traders, and liquidity partners were often operating independently rather than through a coordinated growth system. At Sigma, he helps set the organisation's long-term direction while focusing on strategic partnerships, network development, regional expansion, and the operating principles behind its financial and Web3 growth infrastructure.\n\nHis background in Bitcoin, market structure, sentiment, fundamental research, and on-chain data gives him a data-aware approach to business development. He has also trained and mentored hundreds of people across cryptocurrency trading, blockchain, Web3, market analysis, business development, and partner growth. His work prioritises long-term relationships, regional execution, transparent reporting, and sustainable commercial systems rather than short-lived campaigns or vanity metrics.",
        skills: [
          "Web3 and crypto business development",
          "Exchange partnerships and strategic alliances",
          "KOL, IB, influencer, creator, and social-channel ecosystem management",
          "Regional market expansion across MENA, the GCC, Persian-speaking markets, and LATAM",
          "Business development and marketing team leadership",
          "Partnership negotiation and commercial deal structuring",
          "Affiliate programme, commission, and incentive architecture",
          "Sports, entertainment, artist, and creator partnership activation",
          "User acquisition, trading activation, and community growth",
          "Go-to-market strategy, localisation, and regional execution",
          "Talent development, training, and mentorship",
          "Market research, competitive intelligence, sentiment, and on-chain analysis",
        ],
        services: [
          "Exchange growth strategy",
          "Strategic partnership development",
          "KOL, IB, influencer, creator, and social-channel network infrastructure",
          "IB, affiliate, commission, and incentive programme development",
          "Regional market expansion across MENA, the GCC, Persian-speaking markets, and LATAM",
          "Business development and marketing team structuring",
          "Commercial scheme, campaign, and partner-performance design",
          "Sports, entertainment, artist, and creator partnership activation",
          "VIP, trading-community, and social-channel partnerships",
          "Localised go-to-market strategy and growth operations",
          "BD talent training, enablement, and mentorship",
          "Performance reporting, market intelligence, and partner optimisation",
        ],
        careerHistory: [
          {
            dateRange: "Current",
            role: "Founder & Strategic Growth Consultant",
            organization: "Sigma",
            description:
              "Sets Sigma's strategic direction and contributes to exchange and broker partnerships, regional expansion, KOL and IB infrastructure, network development, and commercial growth systems.",
          },
          {
            dateRange: "2024-Present",
            role: "Business Development Team Manager",
            organization: "LBank",
            description:
              "Leads and develops a distributed team of more than 30 business development and marketing professionals and works across a network of 1,000+ KOLs, IBs, influencers, marketing partners, communities, and social channels. Oversees partner acquisition, commercial negotiations, campaign structures, performance management, regional expansion, and trading-volume growth across MENA, the GCC, Persian-speaking markets, LATAM, and other international markets.",
          },
          {
            dateRange: "2023",
            role: "MENA Business Development Manager",
            organization: "BingX",
            description:
              "Managed KOL and stakeholder relationships, competitive analysis, regional growth, and market activation across MENA and adjacent markets. Supported creator and artist sponsorship initiatives, including activity involving Gdaal, and contributed to business-development efforts around the launch period of BingX's Chelsea FC partnership.",
          },
          {
            dateRange: "2023",
            role: "Business Development & IB Manager",
            organization: "ePlanet Brokers",
            description:
              "Worked on introducing-broker development, commercial scheme design, team building, partner acquisition, and regional broker growth.",
          },
          {
            dateRange: "2022-2023",
            role: "DeFi & Web3 Business Development Manager",
            organization: "Xiroco",
            description:
              "Contributed to the business plan, business model, KOL strategy, community development, research, and launch preparation for a Web3 and NFT marketplace venture.",
          },
          {
            dateRange: "2021-2022",
            role: "Lead Fundamental & On-Chain Analyst",
            organization: "MaxDigital Corporation",
            description:
              "Led cryptocurrency market research, fundamental analysis, on-chain analysis, Bitcoin reporting, trading research, and coordination of an analytical team.",
          },
          {
            dateRange: "2021",
            role: "Cryptocurrency Business Consultant",
            organization: "Max Holding",
            description:
              "Provided research and commercial insight related to blockchain, digital assets, cryptocurrency markets, and potential business opportunities.",
          },
          {
            dateRange: "2020-2021",
            role: "Founder & Trader",
            organization: "Reliance Crew",
            description:
              "Built an independent trading and research initiative focused on cryptocurrency markets, market education, and trading analysis.",
          },
          {
            dateRange: "2020",
            role: "Blockchain & Trading Instructor",
            organization: "Kharazmi Brokerage",
            description:
              "Delivered educational content relating to blockchain technology, cryptocurrency markets, market analysis, and trading fundamentals.",
          },
          {
            dateRange: "2019-2020",
            role: "Project Specialist & Market Analyst",
            organization: "MRBRS",
            description:
              "Worked on market research, project evaluation, early-stage business analysis, and cryptocurrency and forex market studies.",
          },
          {
            dateRange: "2017-Present",
            role: "Independent Crypto and Forex Market Analyst",
            description:
              "Produces personal market research and analysis relating to Bitcoin, cryptocurrency, market structure, technical analysis, sentiment, and on-chain data.",
          },
        ],
        achievements: [
          {
            description:
              "Leads and develops a distributed team of 30+ business development and marketing professionals, combining partner acquisition, market development, campaign execution, and performance management.",
          },
          {
            description:
              "Works across a network of more than 1,000 KOLs, IBs, influencers, marketing partners, communities, and social channels in financial, crypto, and Web3 markets.",
          },
          {
            description:
              "Built an extensive professional network of high-impact decision-makers, operators, creators, traders, investors, marketers, and builders across the financial and Web3 industries.",
          },
          {
            description:
              "Supported high-volume exchange growth operations involving partner onboarding, affiliate development, user activation, and cross-regional expansion across MENA, the GCC, Persian-speaking markets, LATAM, and wider international ecosystems.",
          },
          {
            description:
              "Contributed to regional exchange operations associated with more than USD 10 million in daily trading volume.",
          },
          {
            description:
              "Supported and coordinated artist and creator sponsorship activity at BingX, including work involving Persian hip-hop artist Gdaal, and participated in regional business-development activity around the launch of BingX's Chelsea FC partnership.",
          },
          {
            description:
              "Currently contributes to LBank's international business-development organisation as the exchange strengthens mainstream visibility through global brand partnerships, including its official regional sponsorship of the Argentina National Team through AFA.",
          },
          {
            description:
              "Founded Sigma and developed its direction as a coordinated growth network connecting exchanges, brokers, KOLs, IBs, communities, traders, marketing partners, and Web3 platforms.",
          },
          {
            description:
              "Trained and mentored hundreds of people across cryptocurrency trading, blockchain, Web3, market analysis, business development, and partner growth.",
          },
          {
            description:
              "Developed the initial business plan and business model for Xiroco, helped organise a ten-person technical and research team, and contributed to bringing the product to launch within approximately six months.",
          },
          {
            description:
              "Helped build The Blockchain Nation, a crypto-focused Clubhouse community with more than 65,000 members, and published more than 100 public Bitcoin and cryptocurrency market-analysis ideas.",
          },
        ],
        footprintNote:
          "Extended network: 1,000+ KOLs, IBs, influencers, marketing partners, communities, and social channels across international crypto, finance, and Web3 ecosystems",
        linkedin: "https://www.linkedin.com/in/omidmd/",
        socialLinks: [
          { label: "Linktree", href: "https://linktr.ee/OmidMD" },
          { label: "X", href: "https://x.com/OmidMD" },
          { label: "Instagram", href: "https://www.instagram.com/crypto_md/" },
          { label: "TradingView", href: "https://www.tradingview.com/u/OmidMD/" },
          { label: "Telegram", href: "https://t.me/omidmd" },
        ],
        quote: "We are not here to be loud. We are here to be useful.",
        seoTitle: "Omid Modaber | Founder & Strategic Growth Consultant at Sigma",
        metaDescription:
          "Meet Omid Modaber, Founder of Sigma and Web3 growth strategist leading global BD, KOL, IB, influencer, and market-expansion networks across MENA and LATAM.",
      }),
      location: {
        city: "Dubai",
        country: "United Arab Emirates",
        countryCode: "AE",
      },
      languages: [
        "Persian — Native",
        "English — Professional proficiency",
      ],
      markets: ["MENA", "the GCC", "Persian-speaking markets", "LATAM", "Europe"],
    },
    {
      ...withMemberProfileDefaults(
        withPlaceholderImage(
          {
            id: "novin-ghasemi",
            slug: "novin-ghasemi-nik",
            name: "Novin Ghasemi Nik",
            role: "Business Development Manager | Growth Strategist | Web3 Partnerships",
            group: "core",
            initials: "NG",
            imageSrc: null,
            profileStatus: "active",
            headline:
              "Business Development Manager, Growth Strategist, and Web3 Partnerships lead focused on exchange growth, affiliate networks, and cross-border market expansion.",
            shortBio:
              "With over 5 years of experience in Business Development, Partnerships, and Growth Strategy across Finance and Web3, Novin helps exchanges, brokers, fintech companies, and blockchain projects expand into new markets and build sustainable growth.",
            bio: "Business Development Manager and Growth Strategist specializing in Web3 partnerships, exchange growth, and cross-border market expansion.",
            fullBio:
              "With over 5 years of experience in Business Development, Partnerships, and Growth Strategy across the Finance and Web3 industries, I specialize in helping exchanges, brokers, fintech companies, and blockchain projects expand into new markets and build sustainable growth.\n\nThroughout my career, I have developed strategic partnerships with exchanges, brokers, KOLs, IB networks, institutional clients, and fintech companies across the Middle East, Europe, LATAM, Africa, and Asia.\n\nCurrently, I serve as a Business Development Manager at LBank Exchange, where I focus on global partnership development, affiliate growth, institutional collaboration, and market expansion.\n\nBeyond corporate business development, I have successfully launched and managed multiple entrepreneurial ventures within the crypto and fintech ecosystem, giving me a practical understanding of both startup execution and enterprise growth.\n\nI believe sustainable growth comes from building long-term relationships, understanding local markets, and creating partnership ecosystems that generate value for every stakeholder involved.",
            skills: [
              "Business Development",
              "Strategic Partnerships",
              "Crypto Exchanges",
              "Web3 Ecosystem",
              "Forex & CFD Industry",
              "Institutional Relations",
              "KOL Marketing",
              "Affiliate Programs",
              "IB Networks",
              "Market Expansion",
              "B2B Sales",
              "Growth Strategy",
              "Partnership Management",
              "Revenue Growth",
              "Cross-border Business",
              "Go-to-Market Strategy",
              "Community Growth",
              "Partnership Negotiation",
            ],
            services: [
              "Global Partnership Development",
              "Affiliate & IB Network Growth",
              "Institutional Collaboration",
              "Exchange Market Expansion",
              "Web3 Go-to-Market Strategy",
              "Cross-border Business Development",
            ],
            careerHistory: [
              {
                dateRange: "Current",
                role: "Business Development Manager",
                organization: "LBank Exchange",
                description:
                  "Global partnership development, affiliate growth, institutional collaboration, and market expansion.",
              },
            ],
            achievements: [
              {
                title: "Investment Fundamentals",
                year: "02 February 2024",
                description:
                  "Recipient: Novin Ghasemi Nik · Certificate ID: 18958-170-687-8508",
                link: "/team/certificates/novin-investment-fundamentals.pdf",
                linkLabel: "View certificate (PDF)",
              },
            ],
            seoTitle: "Novin Ghasemi Nik | Business Development Manager & Web3 Growth Strategist",
            metaDescription:
              "Novin Ghasemi Nik is a Business Development Manager and Growth Strategist specializing in Web3 partnerships, crypto exchange growth, affiliate networks, and cross-border market expansion across MENA, Europe, LATAM, Africa, CIS, and Asia.",
          },
          MALE_MEMBER_PLACEHOLDER,
        ),
      ),
      languages: ["Persian — Native", "English — Professional"],
      markets: ["Middle East (MENA)", "Europe", "LATAM", "Africa", "CIS", "Asia"],
    },
    withMemberProfileDefaults({
      id: "arad-moaf",
      name: "Arad Moaf",
      role: "Crypto Business Development, Growth & Strategic Partnerships",
      group: "core",
      initials: "AM",
      imageSrc: "/images/team/arad-moaf.jpg",
      portrait: "/images/team/arad-moaf.jpg",
      portraitObjectPosition: "72% 22%",
      profileStatus: "active",
      shortBio:
        "Arad Moaf is a crypto business development and growth professional with more than 10 years of specialized experience in the cryptocurrency and digital asset industry. Throughout his career, he has worked across major exchange ecosystems including KuCoin, BingX, LBank, XT, Toobit, and WEEX, building deep experience in exchange growth, strategic partnerships, KOL management, affiliate development, trader acquisition, and regional market expansion.",
      bio: "Arad Moaf is a crypto business development and growth professional with more than 10 years of specialized experience in the cryptocurrency and digital asset industry.",
      fullBio:
        "Arad has built his career at the intersection of crypto trading, exchange growth, community building, strategic partnerships, and business development.\n\nThrough Rastad and his broader crypto network, he has been involved in building and managing communities with more than 600,000 subscribers and members, while directly and indirectly contributing to the acquisition, activation, and management of more than 400,000 exchange users.\n\nHe has managed and worked with a network of more than 200 crypto KOLs, traders, affiliates, educators, and community leaders, giving him extensive hands-on experience in understanding how crypto users behave, how trading communities grow, and how exchanges can convert distribution into sustainable trading volume and revenue.\n\nOver the years, Arad has worked both as a top-performing KOL and as a senior business development professional, giving him a rare dual perspective: understanding the market from the side of the trader and community, while also understanding the commercial, operational, and strategic priorities of an exchange.\n\nOne of Arad's strongest areas of expertise is building and managing crypto-native distribution networks.\n\nHe has managed relationships with more than 200 KOLs and strategic partners, ranging from large trading communities and professional educators to high-volume traders and affiliate businesses.\n\nThrough these networks and the broader Rastad ecosystem, he has helped build access to:\n\n600,000+ community members and subscribers\n\n200+ KOLs and strategic partners\n\n400,000+ direct and indirect exchange users\n\nLarge-scale trading and affiliate communities across Persian-speaking and regional markets\n\nHis experience goes beyond simple influencer management. He has been involved in designing the commercial structures behind KOL partnerships, including commission models, trading-volume targets, acquisition incentives, sponsorships, exclusive partnerships, VIP structures, and performance-based campaigns.\n\nArad specializes in building growth systems designed specifically for cryptocurrency exchanges and trading platforms.\n\nHis approach combines distribution, community access, trader behavior, incentive design, affiliate economics, and exchange operations to create scalable acquisition channels.\n\nRather than focusing only on registrations or marketing reach, his primary focus is on acquiring active, revenue-generating traders and building long-term partner ecosystems around them.",
      skills: [
        "Business Development",
        "Strategic Partnerships",
        "KOL & Affiliate Management",
        "Regional Growth",
        "User Acquisition",
        "High-Volume Trader Acquisition",
        "Trading Campaign Development",
        "VIP & Partner Programs",
        "Community Growth",
        "Exchange Market Expansion",
        "Commercial Negotiation",
        "Revenue & Volume Growth Strategy",
      ],
      services: [
        "KOL and affiliate acquisition",
        "Exchange user growth",
        "Active trader conversion",
        "Trading-volume growth",
        "Futures and derivatives campaigns",
        "VIP trader acquisition",
        "Regional market penetration",
        "Partner incentive structures",
        "Referral and commission systems",
        "Trading competitions and tournaments",
        "Retention and reactivation campaigns",
        "Strategic exchange partnerships",
      ],
      careerHistory: [
        {
          organization: "KuCoin, BingX, LBank, XT, Toobit, and WEEX",
          description:
            "Worked across major exchange ecosystems including KuCoin, BingX, LBank, XT, Toobit, and WEEX, building deep experience in exchange growth, strategic partnerships, KOL management, affiliate development, trader acquisition, and regional market expansion.",
        },
      ],
      markets: ["Persian-speaking markets", "Regional markets"],
      seoTitle: "Arad Moaf | Crypto Business Development, Growth & Strategic Partnerships | Sigma",
      metaDescription:
        "Arad Moaf is a crypto business development and growth professional with more than 10 years of specialized experience across KuCoin, BingX, LBank, XT, Toobit, and WEEX.",
    }),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "hosein-rostami",
          name: "Hosein Rostami",
          role: roleLabel,
          group: "core",
          initials: "HR",
          imageSrc: null,
          bio: "Connects the moving parts. Ensures that what is promised on the strategy side is actually executable on the operations side — across teams, regions, and partners.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "mostafa-moradi",
          name: "Mostafa Moradi",
          role: roleLabel,
          group: "core",
          initials: "MM",
          imageSrc: null,
          bio: "Owns Sigma’s community side. Builds and maintains the human layer that turns campaigns into long-term loyalty and creators into compounding networks.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
  ];
}

function buildInnerCircleMembers(roleLabel: string): TeamMember[] {
  return [
    {
      ...withMemberProfileDefaults(
        withPlaceholderImage(
          {
            id: "ashkan-nobakht",
            name: "Ashkan Nobakht",
            role: "Growth Marketing Strategist",
            group: "innerCircle",
            initials: "AN",
            imageSrc: "/images/team/ashkan-nobakht.jpg",
            headline:
              "Growth Marketing Strategist and Crypto Business Development operator combining Web2 marketing systems, global growth patterns, and Web3 adoption strategy.",
            shortBio:
              "Ashkan Nobakht, known professionally as NAXES, started as a curious Web3 researcher seven years ago and gradually moved into marketing management and crypto business development. He combines Web2 marketing systems, growth patterns, and global strategy with the Web3 business landscape to help accelerate adoption.",
            fullBio:
              "Ashkan Nobakht, known professionally as NAXES, began his career by teaching mathematics, physics, and English after graduating from high school. He later worked as an accountant in a traditional institution, but quickly realized that the role did not align with his ambitions or long-term interests. This pushed him to explore new opportunities and eventually led him into cryptocurrency trading.\n\nAs he developed a deeper understanding of blockchain technology and the vision behind Web3, Ashkan became interested in contributing to the industry's growth rather than simply participating as a trader. With a long-standing passion for business development, expansion strategies, and marketing, he found a natural connection between growth strategy and the fast-moving crypto ecosystem.\n\nThat direction shaped his career and led him to work with local cryptocurrency exchanges, crypto media companies, and global organizations such as LBANK. Today, Ashkan focuses on bringing proven Web2 growth and marketing strategies into the Web3 industry, helping projects connect traditional marketing principles with the unique dynamics of decentralized markets.\n\nHis work sits at the intersection of marketing management, brand strategy, business development, negotiation, B2B growth, and performance marketing. At Sigma, he contributes to growth strategy, crypto business development, and market expansion initiatives.",
            skills: [
              "Marketing Management",
              "Strategic Foresight",
              "Growth Marketing Strategy",
              "Performance Marketing",
              "Brand Management",
              "Storytelling",
              "Branding Strategy",
              "Business Development",
              "Negotiation",
              "B2B Marketing",
            ],
            services: [
              "Crypto Growth Marketing Strategy",
              "Web3 Business Development",
              "B2B Marketing Strategy",
              "Brand Growth Strategy",
              "Performance Marketing Planning",
              "Partnership Development",
              "Market Expansion Strategy",
              "Web3 Adoption Strategy",
            ],
            careerHistory: [
              { dateRange: "Current", role: "Business Development", organization: "LBANK" },
              { dateRange: "Current", role: "Business Development", organization: "Cryptic" },
              { dateRange: "Former", role: "Head of Partnerships", organization: "walllet.com" },
            ],
            socialLinks: [
              { label: "X", href: "https://x.com/0naxes?s=11" },
              { label: "Instagram", href: "https://www.instagram.com/nobakhthastam?utm_source=qr" },
              { label: "Telegram", href: "https://t.me/Nobakht_ashkan" },
            ],
            profileStatus: "active",
            seoTitle: "Ashkan Nobakht | Growth Marketing Strategist & Web3 Business Development",
            metaDescription: "Profile of Ashkan Nobakht, Growth Marketing Strategist and Inner Circle Partner at Sigma.",
          },
          MALE_MEMBER_PLACEHOLDER,
        ),
      ),
      location: {
        city: "Dubai",
        country: "United Arab Emirates",
        countryCode: "AE",
      },
    },
    {
      ...withMemberProfileDefaults({
        id: "goli-brothers",
        slug: "goli-brothers",
        name: "Goli Brothers",
        role: "Co-Founders | Chainura & Delaxio",
        group: "innerCircle",
        initials: "GB",
        imageSrc: "/team/goli-brothers.webp",
        portrait: "/team/goli-brothers.webp",
        ogImage: "/team/goli-brothers.webp",
        portraitObjectPosition: "center 42%",
        profileStatus: "active",
        relatedPersons: [
          { name: "Shahriyar Goli", jobTitle: "Co-Founder" },
          { name: "Maziar Goli", jobTitle: "Co-Founder" },
        ],
        headline:
          "Co-Founders of Chainura and Delaxio — crypto growth specialists focused on business development, KOL ecosystems, community expansion, and exchange growth.",
        shortBio:
          "Goli Brothers (Shahriyar & Maziar) are crypto growth specialists focused on business development, KOL ecosystems, community expansion, and exchange growth across the MENA region.",
        bio: "Co-Founders of Chainura and Delaxio. Crypto growth specialists in business development, KOL ecosystems, and exchange expansion.",
        fullBio:
          "Goli Brothers (Shahriyar & Maziar) are crypto growth specialists focused on business development, KOL ecosystems, community expansion, and exchange growth. Over the past few years, they have worked with leading cryptocurrency exchanges across the MENA region, helping scale trading volume, user acquisition, affiliate networks, and strategic partnerships. Their work combines operational execution with long-term growth strategy for exchanges and Web3 projects.\n\nTheir experience includes managing large KOL networks, designing affiliate infrastructures, leading regional marketing initiatives, and supporting exchange expansion through data-driven community growth. In parallel, they founded Chainura, a growth infrastructure company for crypto exchanges, and are currently developing Delaxio, an AI-powered cryptocurrency exchange focused on intelligent trading tools and next-generation user experience.",
        skills: [
          "Business Development",
          "Exchange Growth Strategy",
          "KOL & Affiliate Management",
          "Community Building",
          "Strategic Partnerships",
          "Go-to-Market Strategy",
          "Trading Campaigns",
          "Product Consulting",
        ],
        services: [
          "Chainura — Growth infrastructure for cryptocurrency exchanges, providing KOL management, affiliate programs, community operations, and business development services.",
          "Delaxio — An AI-powered cryptocurrency exchange integrating intelligent trading assistance, copy trading, portfolio analytics, and community-driven features.",
        ],
        careerHistory: [
          {
            role: "Co-Founders",
            organization: "Chainura",
            description:
              "Growth infrastructure for cryptocurrency exchanges, providing KOL management, affiliate programs, community operations, and business development services.",
          },
          {
            role: "Co-Founders",
            organization: "Delaxio",
            description:
              "An AI-powered cryptocurrency exchange integrating intelligent trading assistance, copy trading, portfolio analytics, and community-driven features.",
          },
          {
            role: "Business Development & KOL Growth",
            organization: "LBank",
          },
          {
            role: "Business Development Management",
            organization: "Toobit",
          },
          {
            role: "Partnership Development",
            organization: "Ourbit",
          },
        ],
        // LinkedIn URLs pending — empty hrefs are not rendered by the profile UI.
        socialLinks: [
          { label: "Shahriyar Goli — LinkedIn", href: "" },
          { label: "Maziar Goli — LinkedIn", href: "" },
        ],
        seoTitle: "Goli Brothers | Co-Founders of Chainura & Delaxio",
        metaDescription:
          "Goli Brothers (Shahriyar Goli & Maziar Goli) are crypto growth specialists and Co-Founders of Chainura and Delaxio, with experience in business development, KOL ecosystems, affiliate networks, and exchange growth across MENA.",
      }),
      markets: ["Middle East (MENA)", "Asia", "Europe"],
      languages: ["English"],
    },
    {
      ...withMemberProfileDefaults(
        withPlaceholderImage(
          {
            id: "mahdyar-mehmandoost",
            name: "Mahdiyar Mehmandoust",
            role: "Crypto & Web3 Product Manager",
            group: "innerCircle",
            initials: "MM",
            imageSrc: "/images/team/mahdiyar-mehmandoust.jpg",
            portraitObjectPosition: "center 72%",
            portraitScale: 1.12,
            headline:
              "Crypto & Web3 product manager, NFT and market strategist, and community builder leading West Asia KOL community operations at LBank.",
            shortBio:
              "Mahdiyar Mehmandoust is a Crypto & Web3 product manager, market strategist, and community builder. With an MBA from the University of Tehran and an engineering background, he has built crypto departments, led product development, advised blockchain ventures, and helped grow Web3 communities across multiple regions. Today, he leads West Asia KOL community management at LBank exchange.",
            fullBio:
              "Mahdiyar Mehmandoust works at the intersection of business strategy, product development, and emerging technology.\n\nHis path began early with multiple awards in high school robotics competitions and a top rank in the national university entrance exam. Instead of following the conventional academic path immediately, he entered the job market to learn by building.\n\nHis crypto career started in 2019 as a fundamental researcher at Ethlance, where he studied crypto projects from the inside out. He later joined ALPHA Currency Exchange and founded its crypto department from scratch, growing it into a full team and leading OTC trading and sales operations.\n\nAt Max Digital, he worked as a Crypto Market Research Analyst, specializing in tokenomics, project growth, and user sentiment. In parallel, at Max Holding, he served as a Blockchain Strategy & Data Analyst, advising startups and venture-focused businesses on Web3 and blockchain strategy.\n\nMahdiyar combines an MBA in Business and Managerial Economics from the University of Tehran with a background in Biomedical Engineering. His work has included investment strategy, product leadership, quality assurance, NFT adoption, crypto payment gateways, and real estate tokenization.\n\nAs Product Delivery & QA Lead at Xiroco, he managed projects from planning to launch and oversaw both manual and automated quality assurance. At Khooneh Metri, he led a tokenized home-buying product from idea to public showcase at the Tehran International Exhibition in 2024.\n\nToday, Mahdiyar is the West Asia Community Manager Leader at LBank exchange, where he manages and supports KOL communities across multiple regions, executes public and private campaigns, onboards new KOLs, and builds operational tools for community verification and access management.\n\nHis profile combines product thinking, market strategy, community execution, and a builder mindset focused on turning complex Web3 ideas into working systems.",
            skills: [
              "Crypto & Web3 Product Management",
              "Community Marketing",
              "Community Relations Management",
              "Customer Relationship Management",
              "NFT Strategy",
              "Market Strategy",
              "Fundamental Analysis",
              "Tokenomics",
              "KOL Management",
              "Campaign Management",
              "Product Delivery",
              "Quality Assurance",
              "Blockchain Strategy",
              "Real Estate Tokenization",
              "Web3 Startup Advisory",
            ],
            services: [
              "Web3 Product Strategy",
              "Crypto Community Management",
              "KOL Community Operations",
              "NFT Market Strategy",
              "Tokenomics Research",
              "Blockchain Startup Advisory",
              "Product Delivery & QA",
              "Real Estate Tokenization Strategy",
              "Campaign Operations",
              "CRM and Partner Management",
            ],
            careerHistory: [
              {
                dateRange: "November 2024 - Present",
                role: "West Asia Community Manager Leader",
                organization: "LBank",
                description:
                  "Manages and supports diverse KOL communities across multiple regions; executes public and private campaigns to drive engagement and trading volume; onboards, interviews, and maintains relationships with new and existing KOLs; coordinates upfront payment requests for BD and KOL partners; developed a Telegram bot for user ID verification, KOL community membership checks, and minimum balance validation.",
              },
              {
                dateRange: "February 2024 - November 2024",
                role: "Product Development Manager",
                organization: "Khooneh Metri",
                description:
                  "Led product development from idea to launch for a real estate platform; helped launch a tokenized home-buying project with a market-leading construction company; showcased the platform at the Tehran International Exhibition 2024; managed tight deadlines and limited resources while aligning cross-functional teams.",
              },
              {
                dateRange: "May 2022 - February 2024",
                role: "Product Delivery & QA Lead",
                organization: "Xiroco",
                description:
                  "Dubai. Oversaw quality assurance through manual and automated testing; managed projects from planning to launch; aligned development, design, and business teams; improved workflows across product delivery.",
              },
              {
                dateRange: "November 2021 - August 2023",
                role: "Crypto Market Research Analyst",
                organization: "Max Digital",
                description:
                  "Conducted fundamental analysis on cryptocurrencies with focus on tokenomics, project growth, and user sentiment; evaluated crypto assets using blockchain research and market analysis.",
              },
              {
                dateRange: "November 2021 - August 2023",
                role: "Blockchain Strategy & Data Analyst",
                organization: "Max Holding",
                description:
                  "Guided startups in using Web3 and blockchain technologies; supported venture-focused decision-making and strategic planning for blockchain initiatives.",
              },
              {
                dateRange: "August 2020 - October 2021",
                role: "OTC Trading & Sales Lead",
                organization: "ALPHA Currency Exchange",
                description:
                  "Founded the exchange's crypto department from the ground up, grew it into a full team, and led OTC trading and sales operations.",
              },
              {
                dateRange: "July 2019 - July 2020",
                role: "Fundamental Researcher, Crypto Market",
                organization: "Ethlance",
              },
              {
                dateRange: "October 2018 - July 2020",
                role: "Teaching Assistant",
                organization: "IAU, Tehran Medical Branch",
                description:
                  "Conducted weekly Introduction to Programming classes, supported students during office hours, tracked progress, graded assignments, and collaborated with course professors.",
              },
            ],
            achievements: [
              { title: "Won multiple awards in robotics competitions during high school" },
              { title: "Earned a top rank in the national university entrance exam" },
              { title: "Founded and scaled the crypto department of ALPHA Currency Exchange" },
              { title: "Raised investor funding for product ventures" },
              { title: "Launched a tokenized real estate investment project with a market-leading construction company" },
              { title: "Led a real estate platform from idea to showcase at Tehran International Exhibition 2024" },
              { title: "Built a custom Telegram bot for user and KOL community verification at LBank" },
              { title: "Managed KOL communities across multiple regions" },
              { title: "Provided strategic guidance to blockchain startups and venture-focused businesses" },
              { title: "Donated project source code to charities" },
              { title: "Helped charitable organizations adopt NFTs and crypto payment gateways" },
              { title: "Combined an MBA from the University of Tehran with a Biomedical Engineering background" },
            ],
            linkedin: "https://www.linkedin.com/in/mahdiyar-mehmandoust",
            profileStatus: "active",
            seoTitle: "Mahdiyar Mehmandoust | Crypto & Web3 Product Manager & Community Builder",
            metaDescription:
              "Mahdiyar Mehmandoust is a Crypto & Web3 product manager, market strategist, and community builder with an MBA from the University of Tehran. From founding a crypto department at a currency exchange to launching a tokenized real estate project, he builds products and communities side by side — today leading West Asia KOL communities at LBank.",
          },
          MALE_MEMBER_PLACEHOLDER,
        ),
      ),
      location: {
        country: "Indonesia",
        countryCode: "ID",
      },
      languages: ["English"],
    },
    withMemberProfileDefaults(
      withPlaceholderImage(
        { id: "hamed-ghasemi", name: "Hamed Ghasemi", role: roleLabel, group: "innerCircle", initials: "HG", imageSrc: null },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    {
      ...withMemberProfileDefaults(
        withPlaceholderImage(
          {
            id: "hayyam-modir-rosta",
            name: "Hayyan Modir Rosta",
            role: roleLabel,
            group: "innerCircle",
            initials: "HM",
            imageSrc: null,
            profileStatus: "active",
            shortBio:
              "Hayyan builds products for people who participate in financial markets. He co-founded and ran a Telegram-native crypto exchange, and has spent seven years across exchanges, payments and prop trading on the side of the business where users actually arrive.",
            bio: "Hayyan builds products for people who participate in financial markets. He co-founded and ran a Telegram-native crypto exchange, and has spent seven years across exchanges, payments and prop trading on the side of the business where users actually arrive.",
            fullBio:
              "Hayyan builds products for people who participate in financial markets — and then runs them.\n\nHe co-founded SwapNet, a Telegram-native crypto exchange, and led it as CEO for roughly two years after launch. The product reached around 200,000 users on a simple bet: a familiar chat interface removes most of the friction of buying and swapping crypto. A separate automated product he built reached around 130,000.\n\nAcross seven years in the sector — crypto exchanges, payment platforms, proprietary trading — his work sits on the line between product and growth, because on a trading platform that line barely exists. The onboarding flow is the campaign. The fee structure is the positioning. Simplifying a transaction that used to take six steps does more for acquisition than the campaign promoting it.\n\nAt Sigma he works on exchange and broker growth, KOL and influencer distribution, and the partnership structures that connect them.",
            skills: [
              "Product building — zero to launch",
              "Telegram-native and automated products",
              "Crypto exchange operations",
              "Onboarding, activation and KYC flows",
              "Fee structure and pricing",
              "Growth strategy and user acquisition",
              "KOL and influencer distribution",
              "Exchange and platform partnerships",
              "Business development",
              "Attribution and funnel analytics",
              "Team building and operations",
            ],
            services: [
              {
                title: "Exchange & broker growth",
                description:
                  "acquisition, activation and retention for live trading platforms, working from the product side as well as the campaign side.",
              },
              {
                title: "KOL & influencer distribution",
                description:
                  "sourcing, structuring and managing creator partnerships in crypto and financial markets, including bringing larger platforms into campaigns as partners.",
              },
              {
                title: "Product & onboarding advisory",
                description:
                  "reviewing signup, KYC and first-transaction flows where drop-off is a product problem rather than a traffic problem.",
              },
              {
                title: "Regional market entry",
                description:
                  "client acquisition across Gulf and wider MENA markets, in Persian, Arabic and English.",
              },
            ],
            careerHistory: [
              {
                dateRange: "2026",
                role: "Founder & Board Member",
                organization: "Hayyan.io",
                description: "AI infrastructure and generative AI platform",
              },
              {
                dateRange: "2025 – 2026",
                role: "Business Development Manager",
                organization: "Harmonea",
                description: "private events for financial professionals, Dubai",
              },
              {
                dateRange: "2024 – 2026",
                role: "Business Development Manager",
                organization: "LBank (via Sigma)",
                description: "KOL onboarding and partnerships",
              },
              {
                dateRange: "[2024] – 2026",
                role: "Co-Founder & CEO, then Board Member",
                organization: "SwapNet",
                description: "Telegram-native crypto exchange",
              },
              {
                dateRange: "2023 – 2026",
                role: "Marketing Manager",
                description: "international crypto exchanges (under NDA)",
              },
              {
                dateRange: "2022 – 2023",
                role: "Marketing Manager",
                organization: "ViraMiner",
              },
              {
                dateRange: "2018 – 2022",
                role: "Marketing and business development",
                organization: "Fillip Marketing Agency (Dubai), Shaparak.Blue, Noor Marketing",
              },
            ],
            achievementsTitle: "VERIFIED HIGHLIGHTS",
            achievements: [
              { title: "Co-founded and led a Telegram-native crypto exchange to approximately 200,000 users" },
              { title: "Built an automated crypto product reaching approximately 130,000 users" },
              { title: "Roughly two years operating an exchange as CEO, post-launch" },
              { title: "35% increase in active users through acquisition and product work at a crypto exchange" },
              { title: "25% improvement in marketing ROI by rebuilding campaign measurement and reallocating spend" },
              { title: "13% reduction in onboarding activation time through signup and verification redesign" },
              { title: "Managed 10+ influencer and KOL partnerships as a recurring acquisition channel" },
            ],
            quotes: [
              "The best growth work on a trading platform usually looks like product work. If people are dropping off at verification, no campaign fixes that.",
              "I don't work around financial markets — I build products for the people in them.",
              "Most crypto products ask users to learn a new interface first. The ones that grow meet people where they already are.",
            ],
            linkedin: "https://www.linkedin.com/in/hayyanmodirrousta",
            email: "Hayyanmodiri1@gmail.com",
            seoTitle: "Hayyan Modir Rosta | Inner Circle Partner at Sigma",
            metaDescription:
              "Hayyan builds products for people who participate in financial markets. He co-founded and ran a Telegram-native crypto exchange, and has spent seven years across exchanges, payments and prop trading on the side of the business where users actually arrive.",
          },
          MALE_MEMBER_PLACEHOLDER,
        ),
      ),
      location: {
        city: "Dubai",
        country: "United Arab Emirates",
        countryCode: "AE",
      },
      languages: ["English", "Persian", "Arabic"],
      markets: ["MENA", "Gulf", "Asia", "Europe"],
    },
    withMemberProfileDefaults(
      withPlaceholderImage(
        { id: "shahrzad-rostami", name: "Shahrzad Rostami", role: roleLabel, group: "innerCircle", initials: "SR", imageSrc: null },
        FEMALE_MEMBER_PLACEHOLDER,
      ),
    ),
  ];
}

function buildContributorsMembers(roleLabel: string): TeamMember[] {
  return [
    withMemberProfileDefaults({
      id: "babak-ravanbakhsh",
      name: "Babak Ravanbakhsh",
      role: "Creative Designer & Web Developer",
      group: "contributors",
      initials: "BR",
      imageSrc: "/images/team/babak-ravanbakhsh.jpg",
      portrait: "/images/team/babak-ravanbakhsh.jpg",
      portraitObjectPosition: "center 22%",
      headline:
        "Creative Designer & Web Developer building distinctive digital experiences, interactive websites, visual systems, and user-focused products.",
      shortBio:
        "Babak Ravanbakhsh, professionally known as Madbak, is a creative designer and web developer focused on building distinctive digital experiences, interactive websites, visual systems, and user-focused products. His work combines creative direction, modern web technologies, and strong visual storytelling.",
      fullBio:
        "Babak Ravanbakhsh, professionally known as Madbak, is a multidisciplinary creative designer and web developer specialising in digital products, interactive websites, user interfaces, visual identities, and creative web experiences.\n\nHis work combines graphic design, UI/UX design, brand identity, front-end development, visual content creation, and modern digital production. He focuses on designing and building real-world digital products that are visually distinctive, functional, responsive, and aligned with business goals.\n\nBabak works across the full creative and development process, from concept development, visual direction, wireframing, and interface design to front-end implementation, interaction design, responsive optimisation, and deployment.\n\nHe works with technologies and tools including React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js, Figma, Cursor, GitHub, Claude, Gemini, and Vercel.\n\nHis design approach is bold, minimal, brutalist, cinematic, interactive, and typography-focused. He is particularly interested in non-generic digital experiences, scroll-based interactions, motion design, three-dimensional elements, strong visual systems, and high-end creative direction.\n\nBabak has worked on commercial websites, multilingual digital platforms, brand systems, visual projects, and interactive web experiences. His goal is to create digital products that combine strong creative identity with usability, performance, scalability, and clear business value.",
      skills: [
        "Creative Direction",
        "Web Design",
        "Front-End Development",
        "UI/UX Design",
        "Brand Identity Design",
        "Graphic Design",
        "Motion Design",
        "Creative Coding",
        "Prompt Engineering",
        "AI-Assisted Design & Development",
      ],
      services: [
        "Interactive Website Design & Development",
        "Responsive Website Design",
        "Multilingual Website Design",
        "UI/UX Design Systems",
        "Scroll-Based Web Experiences",
        "Three-Dimensional Web Experiences",
        "Brand Identity & Visual Systems",
        "Visual Content Production",
        "Video Editing & Motion Content",
        "Digital Product Concept Development",
      ],
      careerHistory: [
        { role: "Freelance Creative Designer & Web Developer", organization: "Freelance" },
        { role: "Creative Designer & Web Developer", organization: "Shahan Digital" },
        { role: "Creative Designer & Web Developer", organization: "Shahan Behkamrad" },
        { role: "Creative Designer & Web Developer", organization: "Sigma Website Project" },
      ],
      achievements: [
        { title: "Designed and developed a multilingual website supporting seven languages" },
        { title: "Created responsive interfaces for both left-to-right and right-to-left languages" },
        { title: "Designed and developed interactive websites using Next.js, Framer Motion, GSAP, and Three.js" },
        { title: "Built digital projects from initial concept and visual direction through development and deployment" },
        { title: "Developed multilingual, responsive, and SEO-ready website structures" },
        { title: "Created bold, minimal, brutalist, and cinematic visual experiences" },
        { title: "Designed user interfaces and visual systems for commercial digital projects" },
        { title: "Integrated creative design with modern front-end technologies" },
        { title: "Worked on real-world websites and digital products for businesses and professional teams" },
        { title: "Established the Madbak creative identity across web design, visual design, and digital production" },
      ],
      linkedin: "https://www.linkedin.com/in/babak-ravanbakhsh-16535a327/",
      website: "https://madbak.art",
      profileStatus: "active",
      seoTitle: "Babak Ravanbakhsh | Creative Designer & Web Developer",
      metaDescription:
        "Babak Ravanbakhsh, professionally known as Madbak, is a creative designer and web developer focused on distinctive digital experiences, interactive websites, visual systems, and user-focused products at Sigma.",
      socialLinks: [
        { label: "Instagram", href: "https://www.instagram.com/madbak98/" },
        { label: "X", href: "https://x.com/Lilosama98" },
        { label: "GitHub", href: "https://github.com/madbak98" },
      ],
    }),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "shahan-behkam-rad",
          name: "Shahan BehkamRad",
          role: "SEO Specialist & Digital Marketing Strategist",
          group: "contributors",
          imageSrc: "/images/team/shahan-behkamrad.jpg",
          headline:
            "Entrepreneur & Founder of Shahan | SEO Specialist & Digital Marketing Strategist | Business Growth Consultant",
          shortBio:
            "Shahan Behkamrad is an entrepreneur, SEO specialist, and digital growth consultant. He builds the kind of systems that market leaders quietly rely on. Over more than a decade in fiercely competitive markets, he has designed SEO and AI-powered growth systems for brands on an international scale. His systems never chase traffic. They engineer demand.",
          fullBio:
            "Shahan Behkamrad is an entrepreneur, SEO specialist, and digital marketing strategist, the founder of Shahan, and an officially certified digital marketing instructor working with brands across international markets.\n\nFor more than ten years, he has operated inside high-pressure, high-competition industries, designing growth systems built on advanced SEO, data-driven content architecture, performance advertising, and artificial intelligence. His systems are not built only to collect visits. They shape how a market perceives a brand, capture the moment a customer starts searching, and turn that intent into revenue that compounds over time.\n\nShahan does not treat digital marketing as a task to execute. In his view, it is business infrastructure: the layer where positioning, psychology, data, and strategy meet. This philosophy defines how he consults and teaches. Working closely with founders, executives, and teams, he helps businesses move away from isolated campaigns and toward intelligent marketing systems that keep working long after any single campaign ends.\n\nHis reputation is built on measurable evidence: organic traffic growth, first-page rankings across competitive keywords, visibility inside AI-generated search results, and natural authority earned without shortcuts or purchased links.\n\nSince 2017, he has collaborated directly with more than 65 international companies on cross-border SEO and digital marketing projects across the Middle East, Eastern Europe, Central Asia, and the United Kingdom. As a certified instructor, he has trained hundreds of professionals and entrepreneurs. ",
          skills: [
            "Search Authority Systems",
            "Advanced SEO",
            "Technical SEO",
            "AI Search Visibility",
            "Strategic Marketing",
            "Data-Driven Content Architecture",
            "Performance Advertising",
            "Email Marketing",
            "Business Growth Consulting",
            "Digital Marketing Training",
          ],
          services: [
            "SEO Strategy & Search Growth Systems",
            "Technical SEO Audits & Optimization",
            "AI Search Visibility Strategy",
            "Data-Driven Content Architecture",
            "Digital Marketing Strategy",
            "Performance Advertising Systems",
            "Email Marketing Automation",
            "Brand Positioning & Growth Consulting",
            "International Market Expansion Strategy",
            "Digital Marketing Training & Mentorship",
          ],
          careerHistory: [
            {
              dateRange: "2017 to Present",
              role: "Entrepreneur & Founder",
              organization: "Shahan",
              description:
                "Built a digital growth practice from the ground up and scaled it into a multi-country operation. Collaborated with more than 65 international companies on SEO and digital marketing projects across Iran, Northern Cyprus, Russia, Uzbekistan, Tajikistan, and London.",
            },
            {
              dateRange: "2023 to Present",
              role: "SEO & Digital Strategy Lead",
              organization: "International Financial Markets",
              description:
                "Leads data-driven search strategies for a global financial brand, covering technical SEO, content optimization, keyword intelligence, performance analytics, and email marketing systems.",
            },
            {
              dateRange: "2022 to Present",
              role: "Founder",
              organization: "International Education Consulting",
              description:
                "Established a consulting practice representing more than 72 private universities, guiding international students through admission and academic pathway consulting.",
            },
            {
              dateRange: "2022 to Present",
              role: "Officially Certified Trainer & Instructor",
              description:
                "Trains professionals, entrepreneurs, and business teams in SEO, SEM, branding, advertising, and business consulting.",
            },
            {
              dateRange: "2022 to 2023",
              role: "Marketing & Advertising Lead",
              organization: "International Real Estate",
              description:
                "Designed and executed large-scale advertising campaigns for an international property sales project in Cyprus.",
            },
            {
              dateRange: "2023",
              role: "Digital Marketing Consultant",
              organization: "Industrial Exports",
              description:
                "Built website and digital marketing infrastructure for a petrochemical export project, supported by market research for Middle Eastern export markets.",
            },
          ],
          achievements: [
            { title: "Took organic traffic from near invisibility to tens of thousands of daily users within a single year." },
            { title: "Achieved first-position Google rankings across thousands of competitive commercial keywords." },
            { title: "Secured consistent visibility inside Google's AI-generated search results." },
            { title: "Earned hundreds of natural referring domains without link buying or shortcuts." },
            { title: "Grew his company from a startup into a multi-country operation in under two years." },
            { title: "Collaborated with more than 65 international companies on SEO and digital marketing projects." },
            { title: "Trained hundreds of professionals and entrepreneurs as a certified instructor." },
            { title: "Built SEO and digital growth systems across international markets." },
            { title: "Developed performance-focused content, advertising, and email marketing systems for competitive industries." },
          ],
          linkedin: "https://www.linkedin.com/in/shahanbehkamrad",
          website: "https://shahandigital.com",
          socialLinks: [
            { label: "Links Hub", href: "https://linktr.ee/shahanbehkamrad" },
            { label: "Instagram", href: "https://www.instagram.com/shahan_behkamrad" },
            { label: "Team Page", href: "https://shahandigital.com/teams/shahan-behkamrad/" },
            { label: "Crunchbase", href: "https://www.crunchbase.com/person/shahan-behkamrad" },
            { label: "YouTube", href: "https://www.youtube.com/@ShahanBehkamrad" },
            { label: "INTCH", href: "https://intch.org/p/shahanbehkamrad" },
          ],
          profileStatus: "active",
          seoTitle: "Shahan Behkamrad | Entrepreneur, SEO Specialist & Digital Growth Consultant",
          metaDescription:
            "Shahan Behkamrad is an entrepreneur, SEO specialist, and digital growth consultant with 10+ years of experience and 65+ international projects. He builds SEO and AI-powered growth systems that engineer demand and compound revenue.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
  ];
}

const EN_CONTENT: TeamMarketingBody = {
  kicker: "The Core Team",
  headline: "The People Behind Sigma",
  intro:
    "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  boardKicker: "Sigma Team Board",
  boardTitle: "Network Structure",
  sigmaLabel: "Sigma",
  coreLabel: "Core",
  innerCircleLabel: "Inner Circle",
  contributorsLabel: "Contributors",
  coreMembers: buildCoreMembers("Strategic Growth Consultant"),
  innerCircleMembers: buildInnerCircleMembers("Inner Circle Partner"),
  contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX Designer"),
  extendedNetwork:
    "Beyond the five core partners, Sigma operates with regional community managers, KOL managers, BD specialists, content collaborators, localization leads, and partner operators in every priority market.",
  ndaLine:
    "Several Sigma team members hold senior roles inside operating financial platforms. Specific platform affiliations are protected under NDA.",
  ctaLabel: "Partner with Sigma",
  ctaHref: ROUTES.contact,
};

export const teamPageContentByLang: Record<LangCode, TeamMarketingBody> = {
  EN: EN_CONTENT,
  FA: {
    ...EN_CONTENT,
    kicker: "تیم اصلی",
    headline: "افراد پشت Sigma",
    intro:
      "Sigma توسط تیمی اصلی از مشاوران رشد، BD، مارکتینگ و توسعه بازار با تجربه عملی در اکوسیستم‌های بزرگ صرافی و پلتفرم‌های مالی هدایت می‌شود.",
    boardKicker: "برد تیم Sigma",
    boardTitle: "ساختار شبکه",
    coreLabel: "هسته اصلی",
    innerCircleLabel: "حلقه داخلی",
    contributorsLabel: "مشارکت‌کنندگان",
    coreMembers: buildCoreMembers("مشاور رشد استراتژیک"),
    innerCircleMembers: buildInnerCircleMembers("شریک حلقه داخلی"),
    contributorsMembers: buildContributorsMembers("وایب کدینگ / طراح UI/UX"),
    extendedNetwork:
      "فراتر از پنج شریک اصلی، Sigma در هر بازار اولویت‌دار با مدیران کامیونیتی منطقه‌ای، مدیران KOL، متخصصان BD، همکاران محتوا، لیدهای بومی‌سازی و اپراتورهای شریک فعالیت می‌کند.",
    ndaLine:
      "برخی اعضای تیم Sigma در پلتفرم‌های مالی فعال، نقش‌های ارشد دارند. جزئیات وابستگی پلتفرمی تحت NDA محافظت می‌شود.",
    ctaLabel: "همکاری با Sigma",
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "核心团队",
    headline: "Sigma 背后的人",
    intro:
      "Sigma 由具备交易所生态和金融平台一线经验的增长、BD、营销与市场拓展顾问核心团队领导。",
    boardKicker: "Sigma 团队板",
    boardTitle: "网络结构",
    coreLabel: "核心团队",
    innerCircleLabel: "内圈",
    contributorsLabel: "贡献者",
    coreMembers: buildCoreMembers("战略增长顾问"),
    innerCircleMembers: buildInnerCircleMembers("内圈合作伙伴"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX 设计师"),
    extendedNetwork:
      "除五位核心合伙人外，Sigma 在各重点市场还协同区域社群经理、KOL 经理、BD 专家、内容协作者、本地化负责人和合作方运营者。",
    ndaLine:
      "Sigma 部分成员在金融平台担任高级岗位。具体平台关联信息受 NDA 保护。",
    ctaLabel: "与 Sigma 合作",
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Equipo Principal",
    headline: "Las personas detrás de Sigma",
    intro:
      "Sigma está liderada por un equipo núcleo de consultores de crecimiento, BD, marketing y expansión de mercado con experiencia práctica en grandes ecosistemas de exchanges y plataformas financieras.",
    boardKicker: "Board del Equipo Sigma",
    boardTitle: "Estructura de Red",
    coreLabel: "Equipo Principal",
    innerCircleLabel: "Círculo Interno",
    contributorsLabel: "Colaboradores",
    coreMembers: buildCoreMembers("Consultor de Crecimiento Estratégico"),
    innerCircleMembers: buildInnerCircleMembers("Partner del Círculo Interno"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / Diseñador UI/UX"),
    extendedNetwork:
      "Además de los cinco socios núcleo, Sigma opera con managers regionales de comunidad, managers KOL, especialistas BD, colaboradores de contenido, líderes de localización y operadores partner en cada mercado prioritario.",
    ndaLine:
      "Varios miembros de Sigma ocupan roles senior dentro de plataformas financieras activas. Los detalles de afiliación están protegidos por NDA.",
    ctaLabel: "Asociarse con Sigma",
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Основная команда",
    headline: "Люди за Sigma",
    intro:
      "Sigma возглавляется ядром консультантов по росту, BD, маркетингу и рыночной экспансии с практическим опытом в крупнейших биржевых экосистемах и финансовых платформах.",
    boardKicker: "Схема команды Sigma",
    boardTitle: "Структура сети",
    coreLabel: "Основная команда",
    innerCircleLabel: "Внутренний круг",
    contributorsLabel: "Контрибьюторы",
    coreMembers: buildCoreMembers("Стратегический консультант по росту"),
    innerCircleMembers: buildInnerCircleMembers("Партнёр внутреннего круга"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX-дизайнер"),
    extendedNetwork:
      "Помимо пяти ключевых партнёров, Sigma работает с региональными community-менеджерами, KOL-менеджерами, BD-специалистами, контент-партнёрами, лидерами локализации и операторами партнёров на каждом приоритетном рынке.",
    ndaLine:
      "Некоторые участники команды Sigma занимают senior-роли в действующих финансовых платформах. Конкретные аффилиации защищены NDA.",
    ctaLabel: "Стать партнёром Sigma",
  },
  AR: {
    ...EN_CONTENT,
    kicker: "الفريق الأساسي",
    headline: "الأشخاص وراء Sigma",
    intro:
      "تقود Sigma نواة من مستشاري النمو وBD والتسويق وتوسّع الأسواق بخبرة عملية داخل منظومات البورصات الكبرى والمنصات المالية.",
    boardKicker: "لوحة فريق Sigma",
    boardTitle: "هيكل الشبكة",
    coreLabel: "الفريق الأساسي",
    innerCircleLabel: "الدائرة الداخلية",
    contributorsLabel: "المساهمون",
    coreMembers: buildCoreMembers("مستشار نمو استراتيجي"),
    innerCircleMembers: buildInnerCircleMembers("شريك في الدائرة الداخلية"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / مصمم UI/UX"),
    extendedNetwork:
      "إلى جانب الشركاء الخمسة الأساسيين، تعمل Sigma مع مديري مجتمعات إقليميين، ومديري KOL، ومتخصصي BD، ومتعاوني المحتوى، وقادة التوطين، ومشغلي الشركاء في كل سوق ذي أولوية.",
    ndaLine:
      "يشغل عدد من أعضاء فريق Sigma أدواراً عليا داخل منصات مالية عاملة. تفاصيل الانتماء المنصّي محمية باتفاقيات NDA.",
    ctaLabel: "شارك مع Sigma",
  },
};

/** Shared eyebrow for the individual team-profile professional disclaimer. */
export const TEAM_PROFILE_DISCLAIMER_LABEL = "PROFILE DISCLAIMER";

/**
 * Shared professional/legal disclaimer shown on every individual team profile.
 * Client-approved copy — do not rewrite, shorten, or paraphrase.
 */
export const TEAM_PROFILE_DISCLAIMER =
  "This profile is provided for professional and informational purposes only. It does not constitute investment advice, a financial recommendation, an offer, or a solicitation to purchase or sell any virtual asset or financial product. Historical figures are provided for professional background and do not guarantee future results. Third-party company, artist, organisation and sports-related names are referenced solely for factual identification. Such references do not imply personal sponsorship, endorsement or participation in the negotiation of the relevant partnerships unless expressly stated.";

export function getTeamMemberSlug(member: TeamMember): string {
  return member.slug?.trim() || member.id;
}

export function getTeamMembersByLang(lang: LangCode): TeamMember[] {
  const content = teamPageContentByLang[lang] ?? teamPageContentByLang.EN;
  return [...content.coreMembers, ...content.innerCircleMembers, ...content.contributorsMembers];
}

export function getAllTeamMembers(): TeamMember[] {
  return getTeamMembersByLang("EN");
}

export function getTeamMemberBySlug(slug: string, lang: LangCode = "EN"): TeamMember | null {
  const normalized = slug.trim().toLowerCase();
  if (!normalized) return null;

  return (
    getTeamMembersByLang(lang).find((member) => {
      const memberSlug = getTeamMemberSlug(member).toLowerCase();
      return memberSlug === normalized;
    }) ?? null
  );
}
