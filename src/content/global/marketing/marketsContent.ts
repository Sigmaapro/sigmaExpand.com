import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type MarketsIndexRegion = {
  title: string;
  body: string;
  keywordFocus: string;
};

export type MarketsIndexContent = {
  kicker: string;
  title: string;
  intro: string;
  regions: MarketsIndexRegion[];
  ctaLabel: string;
  ctaHref: string;
};

const EN_CONTENT: MarketsIndexContent = {
  kicker: "Regional Crypto Marketing",
  title: "Built for Where Your Next Users Actually Live",
  intro:
    "Web3 growth does not happen at the global average — it happens region by region. Sigma operates with native KOLs, on-the-ground BD, and locally calibrated funnels across the highest-velocity financial markets — with team presence in Dubai, Istanbul, Bali, Canada, and across MENA, GCC, Turkey, LATAM, CIS, East Asia, Europe, and Persian-speaking communities.",
  regions: [
    {
      title: "GCC / Dubai HQ",
      body: "Compliance-aware growth across UAE, KSA, Qatar, Kuwait, Bahrain, and Oman.",
      keywordFocus: "crypto marketing agency GCC · Dubai crypto agency",
    },
    {
      title: "MENA / WANA",
      body: "Arabic, Persian, and Turkish-native KOL networks.",
      keywordFocus: "MENA crypto marketing · Arabic crypto KOL",
    },
    {
      title: "Turkey / Istanbul presence",
      body: "Telegram-first communities, FX-aware messaging, native Turkish creators.",
      keywordFocus: "Turkey crypto KOL agency · Istanbul crypto marketing",
    },
    {
      title: "Persian-Speaking Markets",
      body: "Native Farsi KOLs, broker IB programs, and community infrastructure.",
      keywordFocus: "Persian crypto KOL agency · Farsi crypto marketing",
    },
    {
      title: "LATAM",
      body: "Portuguese and Spanish funnels with stablecoin-first narratives.",
      keywordFocus: "LATAM crypto marketing · Spanish crypto KOL",
    },
    {
      title: "CIS",
      body: "Russian-language distribution, futures and prop trading audiences.",
      keywordFocus: "CIS crypto agency · Russian crypto marketing",
    },
    {
      title: "East & SE Asia / Bali presence",
      body: "Korean, Vietnamese, Thai, and Indonesian growth surfaces.",
      keywordFocus: "Asia crypto KOL · Bali crypto agency",
    },
    {
      title: "Europe",
      body: "MiCA-aware campaigns across DE, ES, IT, PL, and the Balkans.",
      keywordFocus: "MiCA crypto marketing · EU crypto agency",
    },
    {
      title: "North America / Canada presence",
      body: "Compliance-first, institutional crypto outreach.",
      keywordFocus: "Canada crypto marketing agency",
    },
    {
      title: "Global Corridors",
      body: "Coordinated multi-region token launches and platform expansions.",
      keywordFocus: "global crypto launch agency",
    },
  ],
  ctaLabel: "Plan Your Regional Expansion",
  ctaHref: ROUTES.contact,
};

export const marketsIndexContentByLang: Record<LangCode, MarketsIndexContent> = {
  EN: EN_CONTENT,
  TR: {
    ...EN_CONTENT,
    kicker: "Bölgesel Kripto Pazarlama",
    title: "Bir Sonraki Kullanıcılarınızın Gerçekten Yaşadığı Yerler İçin",
    intro:
      "Web3 büyümesi küresel ortalamada değil, bölge bölge gerçekleşir. Sigma; yerel KOL, saha BD ve bölgesel hunilerle yüksek hızdaki finans pazarlarında çalışır.",
    ctaLabel: "Bölgesel Genişlemenizi Planlayın",
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "区域加密营销",
    title: "为下一批用户真正所在的市场而打造",
    intro:
      "Web3 增长并非发生在全球平均值，而是按区域发生。Sigma 通过本地 KOL、在地 BD 和区域化漏斗在高增长金融市场执行。",
    ctaLabel: "规划您的区域扩张",
  },
  FA: {
    ...EN_CONTENT,
    kicker: "مارکتینگ منطقه‌ای کریپتو",
    title: "برای جایی ساخته شده که کاربران بعدی شما واقعاً آنجا هستند",
    intro:
      "رشد Web3 در میانگین جهانی رخ نمی‌دهد؛ منطقه‌به‌منطقه اتفاق می‌افتد. Sigma با KOLهای بومی، BD میدانی و قیف‌های محلی در بازارهای پرسرعت مالی فعالیت می‌کند.",
    ctaLabel: "برنامه‌ریزی توسعه منطقه‌ای",
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Marketing Cripto Regional",
    title: "Diseñado para donde viven de verdad tus próximos usuarios",
    intro:
      "El crecimiento Web3 no ocurre en el promedio global; ocurre región por región. Sigma ejecuta con KOL nativos, BD en terreno y embudos locales.",
    ctaLabel: "Planifica tu expansión regional",
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Региональный криптомаркетинг",
    title: "Сделано для рынков, где реально живут ваши следующие пользователи",
    intro:
      "Рост Web3 не происходит по «среднему миру» — он происходит регион за регионом. Sigma работает через локальные KOL, полевой BD и локальные воронки.",
    ctaLabel: "Спланировать региональную экспансию",
  },
  AR: {
    ...EN_CONTENT,
    kicker: "تسويق إقليمي للعملات المشفرة",
    title: "مصمّم للأسواق التي يعيش فيها مستخدموك القادمون فعلياً",
    intro:
      "نمو Web3 لا يحدث عند المتوسط العالمي، بل منطقةً بمنطقة. تعمل Sigma عبر KOL محليين وBD ميداني ومسارات جذب مُعايرة لكل سوق.",
    ctaLabel: "خطّط لتوسّعك الإقليمي",
  },
};
