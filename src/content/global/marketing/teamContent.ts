import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";
import { ROUTES } from "@/content/global/routes";

export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  group: "core" | "innerCircle" | "contributors";
  initials?: string;
  imageSrc?: string | null;
  bio?: string;
};

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
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  FA: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  ZH: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  ES: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  RU: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
  AR: {
    title: "The People Behind Sigma",
    description:
      "Sigma is led by a core team of growth, BD, marketing, and market-expansion consultants with hands-on experience across major exchange ecosystems and financial platforms.",
  },
};

function buildCoreMembers(roleLabel: string): TeamMember[] {
  return [
    {
      id: "omid-modaber",
      name: "Omid Modaber",
      role: roleLabel,
      group: "core",
      initials: "OM",
      imageSrc: null,
      bio: "Sets the long-term direction of Sigma. Focused on strategy, exchange partnerships, regional expansion, and the operating principles the network runs on.",
    },
    {
      id: "novin-ghasemi",
      name: "Novin Ghasemi",
      role: roleLabel,
      group: "core",
      initials: "NG",
      imageSrc: null,
      bio: "Runs the engine room. Translates strategy into campaigns, partnerships, and growth motions across the network’s platforms and creators.",
    },
    {
      id: "arad-moaf",
      name: "Arad Moaf",
      role: roleLabel,
      group: "core",
      initials: "AM",
      imageSrc: null,
      bio: "Owns how Sigma enters and grows in new regions. Builds the relationships and execution frameworks that make Sigma operate locally — not just globally.",
    },
    {
      id: "hosein-rostami",
      name: "Hosein Rostami",
      role: roleLabel,
      group: "core",
      initials: "HR",
      imageSrc: null,
      bio: "Connects the moving parts. Ensures that what is promised on the strategy side is actually executable on the operations side — across teams, regions, and partners.",
    },
    {
      id: "mostafa-moradi",
      name: "Mostafa Moradi",
      role: roleLabel,
      group: "core",
      initials: "MM",
      imageSrc: null,
      bio: "Owns Sigma’s community side. Builds and maintains the human layer that turns campaigns into long-term loyalty and creators into compounding networks.",
    },
  ];
}

function buildInnerCircleMembers(roleLabel: string): TeamMember[] {
  return [
    { id: "ashkan-nobakht", name: "Ashkan Nobakht", role: roleLabel, group: "innerCircle", initials: "AN", imageSrc: null },
    { id: "mahdyar-mehmandoost", name: "Mahdyar Mehmandoost", role: roleLabel, group: "innerCircle", initials: "MM", imageSrc: null },
    { id: "hamed-ghasemi", name: "Hamed Ghasemi", role: roleLabel, group: "innerCircle", initials: "HG", imageSrc: null },
    { id: "hayyam-modir-rosta", name: "Hayyam Modir Rosta", role: roleLabel, group: "innerCircle", initials: "HM", imageSrc: null },
  ];
}

function buildContributorsMembers(roleLabel: string): TeamMember[] {
  return [{ id: "babak-ravanbakhsh", name: "Babak Ravanbakhsh", role: roleLabel, group: "contributors", initials: "BR", imageSrc: null }];
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
    boardKicker: "Sigma Ekip Panosu",
    boardTitle: "Ağ Yapısı",
    coreLabel: "Çekirdek Ekip",
    innerCircleLabel: "İç Çember",
    contributorsLabel: "Katkıda Bulunanlar",
    coreMembers: buildCoreMembers("Stratejik Büyüme Danışmanı"),
    innerCircleMembers: buildInnerCircleMembers("İç Çember Partneri"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX Tasarımcısı"),
  },
  FA: {
    ...EN_CONTENT,
    kicker: "تیم اصلی",
    boardKicker: "برد تیم Sigma",
    boardTitle: "ساختار شبکه",
    coreLabel: "هسته اصلی",
    innerCircleLabel: "حلقه داخلی",
    contributorsLabel: "مشارکت‌کنندگان",
    coreMembers: buildCoreMembers("مشاور رشد استراتژیک"),
    innerCircleMembers: buildInnerCircleMembers("شریک حلقه داخلی"),
    contributorsMembers: buildContributorsMembers("وایب کدینگ / طراح UI/UX"),
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "核心团队",
    boardKicker: "Sigma 团队板",
    boardTitle: "网络结构",
    coreLabel: "核心团队",
    innerCircleLabel: "内圈",
    contributorsLabel: "贡献者",
    coreMembers: buildCoreMembers("战略增长顾问"),
    innerCircleMembers: buildInnerCircleMembers("内圈合作伙伴"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX 设计师"),
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Equipo Principal",
    boardKicker: "Board del Equipo Sigma",
    boardTitle: "Estructura de Red",
    coreLabel: "Equipo Principal",
    innerCircleLabel: "Círculo Interno",
    contributorsLabel: "Contributors",
    coreMembers: buildCoreMembers("Consultor de Crecimiento Estratégico"),
    innerCircleMembers: buildInnerCircleMembers("Partner del Círculo Interno"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / Diseñador UI/UX"),
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Основная команда",
    boardKicker: "Схема команды Sigma",
    boardTitle: "Структура сети",
    coreLabel: "Основная команда",
    innerCircleLabel: "Внутренний круг",
    contributorsLabel: "Контрибьюторы",
    coreMembers: buildCoreMembers("Стратегический консультант по росту"),
    innerCircleMembers: buildInnerCircleMembers("Партнёр внутреннего круга"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / UI/UX-дизайнер"),
  },
  AR: {
    ...EN_CONTENT,
    kicker: "الفريق الأساسي",
    boardKicker: "لوحة فريق Sigma",
    boardTitle: "هيكل الشبكة",
    coreLabel: "الفريق الأساسي",
    innerCircleLabel: "الدائرة الداخلية",
    contributorsLabel: "المساهمون",
    coreMembers: buildCoreMembers("مستشار نمو استراتيجي"),
    innerCircleMembers: buildInnerCircleMembers("شريك في الدائرة الداخلية"),
    contributorsMembers: buildContributorsMembers("Vibe Coding / مصمم UI/UX"),
  },
};
