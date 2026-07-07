import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

const MALE_MEMBER_PLACEHOLDER = "/images/team/placeholders/member-placeholder-male.jpg";
const FEMALE_MEMBER_PLACEHOLDER = "/images/team/placeholders/member-placeholder-female.jpg";
const TEAM_PROFILE_MARKETS = ["Asia", "Americas", "Europe", "Africa"] as const;
const UK_MEMBER_IDS = new Set(["omid-modaber", "shahrzad-rostami", "shahan-behkam-rad", "babak-ravanbakhsh"]);

export type TeamMember = {
  id: string;
  slug?: string;
  name: string;
  role?: string;
  group: "core" | "innerCircle" | "contributors";
  eyebrow?: string;
  headline?: string;
  initials?: string;
  portrait?: string | null;
  coverImage?: string | null;
  imageSrc?: string | null;
  shortBio?: string;
  fullBio?: string;
  skills?: string[];
  services?: string[];
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
  }>;
  markets?: string[];
  location?: {
    city?: string;
    country: string;
    countryCode: string;
  };
  languages?: string[];
  quote?: string;
  linkedin?: string;
  website?: string;
  socialLinks?: Array<{ label: string; href: string }>;
  seoTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  profileStatus?: "draft" | "active" | "archived";
  bio?: string;
};

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
  TR: {
    title: "Sigma'nın Arkasındaki İnsanlar",
    description:
      "Sigma, büyük borsa ekosistemleri ve finansal platformlarda deneyimli çekirdek bir büyüme, BD ve pazarlama ekibi tarafından yönetilir.",
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
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "omid-modaber",
          name: "Omid Modaber",
          role: roleLabel,
          group: "core",
          initials: "OM",
          imageSrc: null,
          bio: "Sets the long-term direction of Sigma. Focused on strategy, exchange partnerships, regional expansion, and the operating principles the network runs on.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "novin-ghasemi",
          name: "Novin Ghasemi",
          role: roleLabel,
          group: "core",
          initials: "NG",
          imageSrc: null,
          bio: "Runs the engine room. Translates strategy into campaigns, partnerships, and growth motions across the network’s platforms and creators.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "arad-moaf",
          name: "Arad Moaf",
          role: roleLabel,
          group: "core",
          initials: "AM",
          imageSrc: null,
          bio: "Owns how Sigma enters and grows in new regions. Builds the relationships and execution frameworks that make Sigma operate locally — not just globally.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
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
    withMemberProfileDefaults(
      withPlaceholderImage(
        { id: "mahdyar-mehmandoost", name: "Mahdyar Mehmandoost", role: roleLabel, group: "innerCircle", initials: "MM", imageSrc: null },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        { id: "hamed-ghasemi", name: "Hamed Ghasemi", role: roleLabel, group: "innerCircle", initials: "HG", imageSrc: null },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        { id: "hayyam-modir-rosta", name: "Hayyam Modir Rosta", role: roleLabel, group: "innerCircle", initials: "HM", imageSrc: null },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
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
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "babak-ravanbakhsh",
          name: "Babak Ravanbakhsh",
          role: "Creative Designer & Web Developer",
          group: "contributors",
          initials: "BR",
          imageSrc: null,
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
          socialLinks: [
            { label: "Instagram", href: "https://www.instagram.com/madbak98/" },
            { label: "X", href: "https://x.com/Lilosama98" },
            { label: "GitHub", href: "https://github.com/madbak98" },
          ],
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
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
            "Shahan Behkamrad is an entrepreneur, SEO specialist, and digital marketing strategist, the founder of Shahan, and an officially certified digital marketing instructor working with brands across international markets.\n\nFor more than ten years, he has operated inside high-pressure, high-competition industries, designing growth systems built on advanced SEO, data-driven content architecture, performance advertising, and artificial intelligence. His systems are not built only to collect visits. They shape how a market perceives a brand, capture the moment a customer starts searching, and turn that intent into revenue that compounds over time.\n\nShahan does not treat digital marketing as a task to execute. In his view, it is business infrastructure: the layer where positioning, psychology, data, and strategy meet. This philosophy defines how he consults and teaches. Working closely with founders, executives, and teams, he helps businesses move away from isolated campaigns and toward intelligent marketing systems that keep working long after any single campaign ends.\n\nHis reputation is built on measurable evidence: organic traffic growth, first-page rankings across competitive keywords, visibility inside AI-generated search results, and natural authority earned without shortcuts or purchased links.\n\nSince 2017, he has collaborated directly with more than 65 international companies on cross-border SEO and digital marketing projects across the Middle East, Eastern Europe, Central Asia, and the United Kingdom. As a certified instructor, he has trained hundreds of professionals and entrepreneurs. He is also an official member of the Istanbul Chamber of Commerce.",
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
                "Built a digital growth practice from the ground up and scaled it into a multi-country operation. Collaborated with more than 65 international companies on SEO and digital marketing projects across Iran, Turkiye, Northern Cyprus, Russia, Uzbekistan, Tajikistan, and London.",
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
                "Established a consulting practice representing more than 72 private universities in Turkiye, guiding international students through admission and academic pathway consulting.",
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
            { title: "Became an official member of the Istanbul Chamber of Commerce." },
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
  TR: {
    ...EN_CONTENT,
    kicker: "Çekirdek Ekip",
    headline: "Sigma'nın Arkasındaki İnsanlar",
    intro:
      "Sigma; büyük borsa ekosistemleri ve finansal platformlarda saha deneyimi olan büyüme, BD, pazarlama ve pazar genişleme danışmanlarından oluşan bir çekirdek ekip tarafından yönetilir.",
    boardKicker: "Sigma Ekip Panosu",
    boardTitle: "Ağ Yapısı",
    coreLabel: "Çekirdek Ekip",
    innerCircleLabel: "İç Çember",
    contributorsLabel: "Katkıda Bulunanlar",
    coreMembers: buildCoreMembers("Stratejik Büyüme Danışmanı"),
    innerCircleMembers: buildInnerCircleMembers("İç Çember Partneri"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX Tasarımcısı"),
    extendedNetwork:
      "Beş çekirdek ortağın ötesinde Sigma, her öncelikli pazarda bölgesel topluluk yöneticileri, KOL yöneticileri, BD uzmanları, içerik iş ortakları, lokalizasyon liderleri ve partner operatörlerle çalışır.",
    ndaLine:
      "Sigma ekibindeki bazı üyeler aktif finansal platformlarda kıdemli rollerde görev alır. Platform ilişki detayları NDA kapsamında korunur.",
    ctaLabel: "Sigma ile Ortak Olun",
  },
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
