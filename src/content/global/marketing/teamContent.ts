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
  location?: string;
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
  return {
    ...member,
    location: UK_MEMBER_IDS.has(member.id) ? "UK" : "Dubai",
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
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "ashkan-nobakht",
          name: "Ashkan Nobakht",
          role: roleLabel,
          group: "innerCircle",
          initials: "AN",
          imageSrc: null,
          headline: "Growth Marketing Strategist at Sigma",
          shortBio:
            "Ashkan started as a curious Web3 researcher seven years ago and gradually moved into marketing management. He combines Web2 marketing systems, growth patterns, and global strategy with the Web3 business landscape to help accelerate adoption.",
          fullBio:
            "Ashkan started as a curious Web3 researcher seven years ago and gradually moved into marketing management. He combines Web2 marketing systems, growth patterns, and global strategy with the Web3 business landscape to help accelerate adoption.",
          skills: [
            "Marketing Management",
            "Strategic Foresight",
            "Growth Marketing Strategy",
            "Performance Marketing",
          ],
          careerHistory: [
            { dateRange: "Current", role: "Business Development", organization: "LBank" },
            { dateRange: "Current", role: "Business Development", organization: "Cryptic" },
            { dateRange: "Former", role: "Head of Partnerships", organization: "walllet.com" },
          ],
          socialLinks: [
            { label: "X", href: "https://x.com/0naxes?s=11" },
            { label: "Instagram", href: "https://www.instagram.com/nobakhthastam?utm_source=qr" },
          ],
          metaDescription: "Profile of Ashkan Nobakht, Growth Marketing Strategist and Inner Circle Partner at Sigma.",
        },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
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
        { id: "babak-ravanbakhsh", name: "Babak Ravanbakhsh", role: roleLabel, group: "contributors", initials: "BR", imageSrc: null },
        MALE_MEMBER_PLACEHOLDER,
      ),
    ),
    withMemberProfileDefaults(
      withPlaceholderImage(
        {
          id: "shahan-behkam-rad",
          name: "Shahan Behkam Rad",
          role: "SEO, GEO & Digital Marketing Consultant",
          group: "contributors",
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
