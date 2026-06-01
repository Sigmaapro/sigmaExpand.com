// Homepage Crypto Agency / regional markets section — all locales live here.

import type { Localized } from "../_contentLocales";
import { getLocalized } from "../_contentLocales";
import type { LangCode } from "../types";

export type CryptoMarketTabKey =
  | "gcc"
  | "eurasia"
  | "wana"
  | "east-asia"
  | "latam"
  | "balkans"
  | "global";

export type CryptoMarketTab = {
  key: CryptoMarketTabKey;
  label: string;
  flag: string;
  href: string;
  panelTitle: string;
  description: string;
  bullets: [string, string, string];
};

export type CryptoAgencyLocale = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  regionsAriaLabel: string;
  tabs: CryptoMarketTab[];
};

/** Localized bundle for the Crypto Agency section (header + regional tabs). */
export const cryptoAgency: Localized<CryptoAgencyLocale> = {
  en: {
    eyebrow: "Regional Crypto & Web3 Marketing · Native Teams · Physical Presence",
    title: "Built for Where Your Next Users Actually Live",
    description:
      "Web3 growth doesn't happen at the global average — it happens region by region. Sigma operates with native KOLs, on-the-ground BD, and locally calibrated funnels across the highest-velocity financial markets — with team presence in Dubai, Istanbul, Bali, Canada, and across MENA, GCC, Turkey, LATAM, CIS, East Asia, Europe, and Persian-speaking communities.",
    cta: "Plan Your Regional Expansion",
    regionsAriaLabel: "Regions",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (Dubai HQ)",
        description:
          "Compliance-aware growth across UAE, KSA, Qatar, Kuwait, Bahrain, and Oman — built for institutional crypto hubs and regulated corridors.",
        bullets: [
          "Compliance-aware campaigns across Gulf Cooperation Council markets",
          "KOL and community programs tuned for Gulf audiences",
          "Exchange, liquidity, and BD coordination across regional venues",
        ],
      },
      {
        key: "eurasia",
        label: "Eurasia",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "Europe & Eurasia",
        description:
          "MiCA-aware campaigns across DE, ES, IT, PL, and the Balkans — plus high-velocity execution across Eurasian crypto and trading corridors.",
        bullets: [
          "MiCA-aware messaging and partner coordination across EU markets",
          "Localized distribution across Eurasian trading communities",
          "Listings-aligned narratives and liquidity milestones",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Arabic, Persian, and Turkish-native KOL networks with on-the-ground BD across West Asia and North Africa.",
        bullets: [
          "Arabic, Persian, and Turkish-native creator and community networks",
          "Regional BD and partner coordination across MENA corridors",
          "Market-entry funnels built for trust and scalable acquisition",
        ],
      },
      {
        key: "east-asia",
        label: "East Asia",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "East & Southeast Asia",
        description:
          "Korean, Vietnamese, Thai, and Indonesian growth surfaces — with Bali team presence for regional execution.",
        bullets: [
          "Localized positioning for East and Southeast Asian ecosystems",
          "Creator and community networks across regional distribution surfaces",
          "Institutional-grade collateral aligned to regional partner norms",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "Latin America",
        description:
          "Portuguese and Spanish funnels with stablecoin-first narratives across Latin American Web3 and trading communities.",
        bullets: [
          "Portuguese and Spanish campaigns for regional crypto audiences",
          "Creator networks tuned for LATAM distribution and retention",
          "Market activation aligned with liquidity and partner milestones",
        ],
      },
      {
        key: "balkans",
        label: "Balkans",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "Persian-Speaking Markets",
        description:
          "Native Farsi KOLs, broker IB programs, and community infrastructure across Persian-speaking trading communities.",
        bullets: [
          "Native Farsi KOL and community programs",
          "Broker and IB program coordination for regional partners",
          "High-trust distribution built for sustained retention",
        ],
      },
      {
        key: "global",
        label: "Global",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Global Corridors",
        description:
          "Coordinated multi-region token launches and platform expansions — one operating rhythm across time zones.",
        bullets: [
          "Unified campaign architecture across core global corridors",
          "Cross-market reporting with actionable funnel telemetry",
          "Always-on iteration loops tied to acquisition and volume KPIs",
        ],
      },
    ],
  },

  fa: {
    eyebrow:
      "مارکتینگ منطقه‌ای Crypto و Web3 · تیم‌های بومی · حضور فیزیکی",
    title: "برای جایی ساخته شده که کاربران بعدی شما واقعاً آنجا هستند",
    description:
      "رشد Web3 در میانگین جهانی رخ نمی‌دهد — منطقه‌به‌منطقه اتفاق می‌افتد. Sigma با KOLهای بومی، BD میدانی و قیف‌های کالیبره‌شده محلی در پرسرعت‌ترین بازارهای مالی فعالیت می‌کند — با حضور تیم در دبی، استانبول، بالی، کانادا و در MENA، GCC، ترکیه، LATAM، CIS، شرق آسیا، اروپا و جوامع فارسی‌زبان.",
    cta: "برنامه‌ریزی توسعه منطقه‌ای",
    regionsAriaLabel: "مناطق",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (دبی — دفتر مرکزی)",
        description:
          "رشد آگاه از انطباق در امارات، عربستان، قطر، کویت، بحرین و عمان — برای هاب‌های crypto نهادی و کریدورهای تنظیم‌شده.",
        bullets: [
          "کمپین‌های آگاه از انطباق در بازارهای شورای همکاری خلیج",
          "برنامه‌های KOL و جامعه متناسب با مخاطبان خلیج",
          "هماهنگی صرافی، نقدینگی و BD در مکان‌های منطقه‌ای",
        ],
      },
      {
        key: "eurasia",
        label: "اوراسیا",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "اروپا و اوراسیا",
        description:
          "کمپین‌های آگاه از MiCA در DE، ES، IT، PL و بالکان — به‌علاوه اجرای پرسرعت در کریدورهای crypto و معاملاتی اوراسیا.",
        bullets: [
          "پیام‌رسانی و هماهنگی شریک آگاه از MiCA در بازارهای اتحادیه اروپا",
          "توزیع بومی در جوامع معاملاتی اوراسیایی",
          "روایت‌های هم‌راستا با لیستینگ و نقاط عطف نقدینگی",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "شبکه‌های KOL بومی عربی، فارسی و ترکی با BD میدانی در غرب آسیا و شمال آفریقا.",
        bullets: [
          "شبکه‌های خالق و جامعه بومی عربی، فارسی و ترکی",
          "هماهنگی BD و شریک در کریدورهای MENA",
          "قیف‌های ورود به بازار برای اعتماد و جذب مقیاس‌پذیر",
        ],
      },
      {
        key: "east-asia",
        label: "شرق آسیا",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "شرق و جنوب‌شرق آسیا",
        description:
          "سطح‌های رشد کره‌ای، ویتنامی، تایلندی و اندونزیایی — با حضور تیم در بالی برای اجرای منطقه‌ای.",
        bullets: [
          "جایگاه‌یابی بومی برای اکوسیستم‌های شرق و جنوب‌شرق آسیا",
          "شبکه‌های خالق و جامعه در سطح‌های توزیع منطقه‌ای",
          "محتوای درجه نهادی هم‌راستا با هنجارهای شریک منطقه",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "آمریکای لاتین",
        description:
          "قیف‌های پرتغالی و اسپانیایی با روایت stablecoin-first در جوامع Web3 و معاملاتی آمریکای لاتین.",
        bullets: [
          "کمپین‌های پرتغالی و اسپانیایی برای مخاطبان crypto منطقه",
          "شبکه‌های خالق متناسب با توزیع و نگهداشت LATAM",
          "فعال‌سازی بازار هم‌راستا با نقدینگی و نقاط عطف شریک",
        ],
      },
      {
        key: "balkans",
        label: "بالکان",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "بازارهای فارسی‌زبان",
        description:
          "KOLهای بومی فارسی، برنامه‌های IB بروکر و زیرساخت جامعه در جوامع معاملاتی فارسی‌زبان.",
        bullets: [
          "برنامه‌های KOL و جامعه بومی فارسی",
          "هماهنگی برنامه بروکر و IB برای شرکای منطقه",
          "توزیع با اعتماد بالا برای نگهداشت پایدار",
        ],
      },
      {
        key: "global",
        label: "جهانی",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "کریدورهای جهانی",
        description:
          "راه‌اندازی توکن و توسعه پلتفرم چندمنطقه‌ای هماهنگ — یک ریتم عملیاتی در مناطق زمانی.",
        bullets: [
          "معماری کمپین یکپارچه در کریدورهای اصلی جهانی",
          "گزارش چندبازاری با تله‌متری قیف قابل اقدام",
          "حلقه‌های تکرار همیشه‌فعال متصل به KPI جذب و حجم",
        ],
      },
    ],
  },

  tr: {
    eyebrow:
      "Bölgesel Kripto ve Web3 Pazarlama · Yerel Ekipler · Fiziksel Varlık",
    title: "Bir Sonraki Kullanıcılarınızın Gerçekten Yaşadığı Yerler İçin",
    description:
      "Web3 büyümesi küresel ortalamada değil — bölge bölge gerçekleşir. Sigma, en yüksek hızlı finansal pazarlarda yerel KOL’lar, saha BD’si ve yerel kalibreli hunilerle çalışır — Dubai, İstanbul, Bali, Kanada ve MENA, GCC, Türkiye, LATAM, BDT, Doğu Asya, Avrupa ile Farsça konuşan topluluklarda ekip varlığıyla.",
    cta: "Bölgesel Genişlemenizi Planlayın",
    regionsAriaLabel: "Bölgeler",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (Dubai HQ)",
        description:
          "BAE, Suudi Arabistan, Katar, Kuveyt, Bahreyn ve Umman’da uyum bilinci büyüme — kurumsal kripto merkezleri ve düzenlenmiş koridorlar için.",
        bullets: [
          "Körfez İş Birliği pazarlarında uyum bilinci kampanyalar",
          "Körfez kitleleri için ayarlanmış KOL ve topluluk programları",
          "Bölgesel mecralarda borsa, likidite ve BD koordinasyonu",
        ],
      },
      {
        key: "eurasia",
        label: "Avrasya",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "Avrupa ve Avrasya",
        description:
          "DE, ES, IT, PL ve Balkanlar genelinde MiCA bilinci kampanyalar — artı Avrasya kripto ve işlem koridorlarında yüksek hızlı icra.",
        bullets: [
          "AB pazarlarında MiCA bilinci mesajlaşma ve ortak koordinasyonu",
          "Avrasya işlem topluluklarında yerelleştirilmiş dağıtım",
          "Listelemeye uygun anlatılar ve likidite kilometre taşları",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Batı Asya ve Kuzey Afrika genelinde Arapça, Farsça ve Türkçe yerel KOL ağları ve saha BD.",
        bullets: [
          "Arapça, Farsça ve Türkçe yerel içerik üretici ve topluluk ağları",
          "MENA koridorlarında bölgesel BD ve ortak koordinasyonu",
          "Güven ve ölçeklenebilir edinim için pazar girişi hunileri",
        ],
      },
      {
        key: "east-asia",
        label: "Doğu Asya",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "Doğu ve Güneydoğu Asya",
        description:
          "Korece, Vietnamca, Tayca ve Endonezce büyüme yüzeyleri — bölgesel icra için Bali ekip varlığı.",
        bullets: [
          "Doğu ve Güneydoğu Asya ekosistemleri için yerelleştirilmiş konumlandırma",
          "Bölgesel dağıtım yüzeylerinde içerik üretici ve topluluk ağları",
          "Bölgesel ortak normlarına uygun kurumsal düzeyde materyaller",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "Latin Amerika",
        description:
          "Latin Amerika Web3 ve işlem topluluklarında stablecoin öncelikli anlatılarla İspanyolca ve Portekizce huniler.",
        bullets: [
          "Bölgesel kripto kitleleri için Portekizce ve İspanyolca kampanyalar",
          "LATAM dağıtımı ve elde tutma için ayarlanmış içerik üretici ağları",
          "Likidite ve ortak kilometre taşlarıyla uyumlu pazar aktivasyonu",
        ],
      },
      {
        key: "balkans",
        label: "Balkanlar",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "Farsça Konuşan Piyasalar",
        description:
          "Farsça yerel KOL’lar, broker IB programları ve Farsça işlem topluluklarında topluluk altyapısı.",
        bullets: [
          "Yerel Farsça KOL ve topluluk programları",
          "Bölgesel ortaklar için broker ve IB program koordinasyonu",
          "Sürdürülebilir elde tutma için yüksek güvenli dağıtım",
        ],
      },
      {
        key: "global",
        label: "Küresel",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Küresel Koridorlar",
        description:
          "Koordineli çok bölgeli token lansmanları ve platform genişlemeleri — zaman dilimleri arasında tek operasyon ritmi.",
        bullets: [
          "Temel küresel koridorlarda birleşik kampanya mimarisi",
          "Eyleme dönüştürülebilir huni telemetrisi ile çapraz pazar raporlama",
          "Edinim ve hacim KPI’larına bağlı sürekli iterasyon döngüleri",
        ],
      },
    ],
  },

  zh: {
    eyebrow: "区域 Crypto 与 Web3 营销 · 本地团队 · 实地布局",
    title: "为下一批用户真正所在的市场而打造",
    description:
      "Web3 增长不会发生在“全球平均”上——它发生在各个区域。Sigma 以本地 KOL、一线 BD 与本地化漏斗，覆盖高增速金融市场；团队在迪拜、伊斯坦布尔、巴厘岛、加拿大以及 MENA、GCC、土耳其、LATAM、独联体、东亚、欧洲与波斯语社群均有布局。",
    cta: "规划您的区域扩张",
    regionsAriaLabel: "地区",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC（迪拜总部）",
        description:
          "在阿联酋、沙特、卡塔尔、科威特、巴林和阿曼开展合规导向增长——面向机构级 crypto 枢纽与受监管走廊。",
        bullets: [
          "覆盖海湾合作委员会市场的合规导向 campaign",
          "面向海湾受众调校的 KOL 与社区计划",
          "区域场所的交易所、流动性与 BD 协同",
        ],
      },
      {
        key: "eurasia",
        label: "欧亚",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "欧洲与欧亚",
        description:
          "在 DE、ES、IT、PL 与巴尔干开展 MiCA 导向 campaign，并在欧亚 crypto 与交易走廊高速执行。",
        bullets: [
          "欧盟市场的 MiCA 导向信息与伙伴协同",
          "欧亚交易社群的本地化分发",
          "与上新对齐的叙事及流动性里程碑",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "西亚与北非的阿拉伯语、波斯语与土耳其语原生 KOL 网络，配合一线 BD。",
        bullets: [
          "阿拉伯语、波斯语与土耳其语原生创作者与社区网络",
          "MENA 走廊的区域 BD 与伙伴协同",
          "为信任与可扩展获客打造的市场进入漏斗",
        ],
      },
      {
        key: "east-asia",
        label: "东亚",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "东亚与东南亚",
        description:
          "韩语、越南语、泰语与印尼语增长触点——巴厘岛团队支撑区域执行。",
        bullets: [
          "面向东亚与东南亚生态的本地化定位",
          "区域分发面上的创作者与社区网络",
          "契合区域伙伴规范机构级物料",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "拉丁美洲",
        description:
          "面向拉美 Web3 与交易社群的西语与葡语漏斗，stablecoin 优先叙事。",
        bullets: [
          "面向区域 crypto 受众的西语与葡语 campaign",
          "适配 LATAM 分发与留存的创作者网络",
          "与流动性及伙伴里程碑对齐的市场激活",
        ],
      },
      {
        key: "balkans",
        label: "巴尔干",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "波斯语市场",
        description:
          "波斯语原生 KOL、经纪商 IB 计划，以及波斯语交易社群的社区基础设施。",
        bullets: [
          "波斯语原生 KOL 与社区计划",
          "面向区域伙伴的经纪商与 IB 计划协同",
          "高信任分发，支撑可持续留存",
        ],
      },
      {
        key: "global",
        label: "全球",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "全球走廊",
        description:
          "协调多区域 token 发行与平台扩张——跨时区统一运营节奏。",
        bullets: [
          "核心全球走廊的统一 campaign 架构",
          "跨市场报告与可行动的漏斗遥测",
          "与获客与成交量 KPI 绑定的持续迭代闭环",
        ],
      },
    ],
  },

  es: {
    eyebrow:
      "Marketing regional Crypto y Web3 · Equipos nativos · Presencia física",
    title: "Diseñado para donde viven de verdad sus próximos usuarios",
    description:
      "El crecimiento Web3 no ocurre en el promedio global — ocurre región a región. Sigma opera con KOL nativos, BD en terreno y embudos calibrados localmente en los mercados financieros de mayor velocidad, con presencia de equipo en Dubái, Estambul, Bali, Canadá y en MENA, GCC, Turquía, LATAM, CEI, Asia Oriental, Europa y comunidades de habla persa.",
    cta: "Planifique su expansión regional",
    regionsAriaLabel: "Regiones",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (Dubái — sede)",
        description:
          "Crecimiento con enfoque en cumplimiento en EAU, Arabia Saudita, Catar, Kuwait, Baréin y Omán — para hubs cripto institucionales y corredores regulados.",
        bullets: [
          "Campañas conscientes del cumplimiento en mercados del CCG",
          "Programas KOL y comunitarios ajustados a audiencias del Golfo",
          "Coordinación de exchange, liquidez y BD en sedes regionales",
        ],
      },
      {
        key: "eurasia",
        label: "Eurasia",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "Europa y Eurasia",
        description:
          "Campañas conscientes de MiCA en DE, ES, IT, PL y los Balcanes — más ejecución de alta velocidad en corredores cripto y de trading de Eurasia.",
        bullets: [
          "Mensajes y coordinación de socios MiCA en mercados de la UE",
          "Distribución localizada en comunidades de trading de Eurasia",
          "Narrativas alineadas a listings e hitos de liquidez",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Redes KOL nativas en árabe, persa y turco con BD en terreno en Asia Occidental y Norte de África.",
        bullets: [
          "Redes de creadores y comunidad nativas en árabe, persa y turco",
          "Coordinación regional de BD y socios en corredores MENA",
          "Embudos de entrada al mercado para confianza y adquisición escalable",
        ],
      },
      {
        key: "east-asia",
        label: "Asia Oriental",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "Asia Oriental y Sudoriental",
        description:
          "Superficies de crecimiento en coreano, vietnamita, tailandés e indonesio — con presencia de equipo en Bali para ejecución regional.",
        bullets: [
          "Posicionamiento localizado para ecosistemas de Asia Oriental y Sudoriental",
          "Redes de creadores y comunidad en canales de distribución regionales",
          "Material de nivel institucional alineado a normas de socios regionales",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "América Latina",
        description:
          "Embudos en portugués y español con narrativas stablecoin-first en comunidades Web3 y de trading de Latinoamérica.",
        bullets: [
          "Campañas en portugués y español para audiencias cripto regionales",
          "Redes de creadores ajustadas a distribución y retención en LATAM",
          "Activación de mercado alineada con liquidez e hitos de socios",
        ],
      },
      {
        key: "balkans",
        label: "Balcanes",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "Mercados de habla persa",
        description:
          "KOL nativos en farsi, programas IB de brokers e infraestructura comunitaria en comunidades de trading persoparlantes.",
        bullets: [
          "Programas KOL y comunitarios nativos en farsi",
          "Coordinación de programas broker e IB para socios regionales",
          "Distribución de alta confianza para retención sostenida",
        ],
      },
      {
        key: "global",
        label: "Global",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Corredores globales",
        description:
          "Lanzamientos de tokens y expansiones de plataforma multiregión coordinados — un ritmo operativo en todas las zonas horarias.",
        bullets: [
          "Arquitectura de campaña unificada en corredores globales clave",
          "Reporting cross-market con telemetría de embudo accionable",
          "Bucles de iteración continuos ligados a KPI de adquisición y volumen",
        ],
      },
    ],
  },

  ru: {
    eyebrow:
      "Региональный crypto- и Web3-маркетинг · Локальные команды · Физическое присутствие",
    title: "Создано для рынков, где живут ваши следующие пользователи",
    description:
      "Рост Web3 не происходит «в среднем по миру» — он происходит регион за регионом. Sigma работает с локальными KOL, полевым BD и локально откалиброванными воронками на самых динамичных финансовых рынках — с присутствием команд в Дубае, Стамбуле, на Бали, в Канаде, а также в MENA, GCC, Турции, LATAM, СНГ, Восточной Азии, Европе и персоязычных сообществах.",
    cta: "Спланировать региональную экспансию",
    regionsAriaLabel: "Регионы",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (Дубай — штаб-квартира)",
        description:
          "Рост с учётом комплаенса в ОАЭ, Саудовской Аравии, Катаре, Кувейте, Бахрейне и Омане — для институциональных crypto-хабов и регулируемых коридоров.",
        bullets: [
          "Кампании с учётом комплаенса на рынках Совета сотрудничества арабских государств Персидского залива",
          "KOL и комьюнити-программы для аудиторий Персидского залива",
          "Координация бирж, ликвидности и BD на региональных площадках",
        ],
      },
      {
        key: "eurasia",
        label: "Евразия",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "Европа и Евразия",
        description:
          "Кампании с учётом MiCA в DE, ES, IT, PL и на Балканах — плюс высокоскоростное исполнение на евразийских crypto- и торговых коридорах.",
        bullets: [
          "Сообщения и координация партнёров с учётом MiCA на рынках ЕС",
          "Локализованная дистрибуция в евразийских трейдерских сообществах",
          "Нарративы, согласованные с листингом и вехами ликвидности",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Арабоязычные, персоязычные и туркоязычные KOL-сети с полевым BD в Западной Азии и Северной Африке.",
        bullets: [
          "Арабоязычные, персоязычные и туркоязычные сети креаторов и сообществ",
          "Региональная координация BD и партнёров в коридорах MENA",
          "Воронки выхода на рынок для доверия и масштабируемого привлечения",
        ],
      },
      {
        key: "east-asia",
        label: "Восточная Азия",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "Восточная и Юго-Восточная Азия",
        description:
          "Поверхности роста на корейском, вьетнамском, тайском и индонезийском — с командой на Бали для регионального исполнения.",
        bullets: [
          "Локализованное позиционирование для экосистем Восточной и Юго-Восточной Азии",
          "Сети креаторов и сообществ на региональных каналах дистрибуции",
          "Материалы институционального уровня под региональные нормы партнёров",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "Латинская Америка",
        description:
          "Испано- и португалоязычные воронки с stablecoin-first нарративами в Web3- и трейдерских сообществах Латинской Америки.",
        bullets: [
          "Кампании на португальском и испанском для региональной crypto-аудитории",
          "Сети креаторов под дистрибуцию и удержание в LATAM",
          "Активация рынка в согласовании с ликвидностью и вехами партнёров",
        ],
      },
      {
        key: "balkans",
        label: "Балканы",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "Персоязычные рынки",
        description:
          "Персоязычные KOL, IB-программы брокеров и комьюнити-инфраструктура в персоязычных трейдерских сообществах.",
        bullets: [
          "Персоязычные KOL и комьюнити-программы",
          "Координация брокерских и IB-программ для региональных партнёров",
          "Дистрибуция с высоким доверием для устойчивого удержания",
        ],
      },
      {
        key: "global",
        label: "Глобально",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Глобальные коридоры",
        description:
          "Скоординированные мультирегиональные запуски токенов и расширения платформ — единый операционный ритм в часовых поясах.",
        bullets: [
          "Единая архитектура кампаний по ключевым глобальным коридорам",
          "Кросс-рыночная отчётность с actionable телеметрией воронки",
          "Постоянные итерации, привязанные к KPI привлечения и объёма",
        ],
      },
    ],
  },

  ar: {
    eyebrow:
      "تسويق إقليمي للعملات المشفرة وWeb3 · فرق محلية · حضور ميداني",
    title: "مصمَّم للأسواق التي يعيش فيها مستخدموك القادمون فعلياً",
    description:
      "نمو Web3 لا يحدث عند المتوسط العالمي — بل إقليماً إقليماً. تعمل Sigma مع KOL محليين وBD ميداني ومسارات جذب مُعايرة محلياً في أسرع الأسواق المالية — مع فرق في دبي وإسطنبول وبالي وكندا وعبر MENA وGCC وتركيا وLATAM ورابطة الدول المستقلة وشرق آسيا وأوروبا والمجتمعات الناطقة بالفارسية.",
    cta: "خطّط لتوسّعك الإقليمي",
    regionsAriaLabel: "المناطق",
    tabs: [
      {
        key: "gcc",
        label: "GCC",
        flag: "🏛️",
        href: "/markets/gcc",
        panelTitle: "GCC (دبي — المقر)",
        description:
          "نمو واعٍ بالامتثال في الإمارات والسعودية وقطر والكويت والبحرين وعُمان — لمراكز crypto المؤسسية والممرات المنظَّمة.",
        bullets: [
          "حملات واعية بالامتثال في أسواق مجلس التعاون الخليجي",
          "برامج KOL ومجتمعات مخصّصة لجمهور الخليج",
          "تنسيق البورصة والسيولة وBD عبر المراكز الإقليمية",
        ],
      },
      {
        key: "eurasia",
        label: "أوراسيا",
        flag: "🌍",
        href: "/markets/eurasia",
        panelTitle: "أوروبا وأوراسيا",
        description:
          "حملات واعية بـ MiCA عبر DE وES وIT وPL والبلقان — مع تنفيذ عالٍ السرعة في ممرات crypto والتداول الأوراسية.",
        bullets: [
          "رسائل وتنسيق شركاء واعٍ بـ MiCA في أسواق الاتحاد الأوروبي",
          "توزيع محلي في مجتمعات التداول الأوراسية",
          "سرديات متوافقة مع الإدراج ومعالم السيولة",
        ],
      },
      {
        key: "wana",
        label: "WANA",
        flag: "🌏",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "شبكات KOL عربية وفارسية وتركية أصلية مع BD ميداني في غرب آسيا وشمال أفريقيا.",
        bullets: [
          "شبكات مبدعين ومجتمعات أصلية بالعربية والفارسية والتركية",
          "تنسيق BD وشركاء إقليمي عبر ممرات MENA",
          "مسارات دخول سوق لبناء الثقة واكتساب قابل للتوسع",
        ],
      },
      {
        key: "east-asia",
        label: "شرق آسيا",
        flag: "🌏",
        href: "/markets/east-asia",
        panelTitle: "شرق وجنوب شرق آسيا",
        description:
          "أسطح نمو بالكورية والفيتنامية والتايلاندية والإندونيسية — مع حضور فريق في بالي للتنفيذ الإقليمي.",
        bullets: [
          "تموضع محلي لأنظمة شرق وجنوب شرق آسيا",
          "شبكات مبدعين ومجتمعات عبر قنوات التوزيع الإقليمية",
          "مواد بمستوى مؤسسي متوافقة مع معايير الشركاء الإقليمية",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "أمريكا اللاتينية",
        description:
          "مسارات بالبرتغالية والإسبانية بسرديات stablecoin-first في مجتمعات Web3 والتداول في أمريكا اللاتينية.",
        bullets: [
          "حملات بالبرتغالية والإسبانية لجماهير crypto إقليمية",
          "شبكات مبدعين ملائمة لتوزيع LATAM والاحتفاظ",
          "تفعيل سوق متوافق مع معالم السيولة والشركاء",
        ],
      },
      {
        key: "balkans",
        label: "البلقان",
        flag: "🏛️",
        href: "/markets/balkans",
        panelTitle: "الأسواق الناطقة بالفارسية",
        description:
          "KOL فارسية أصلية، برامج IB للوسطاء، وبنية مجتمعية في مجتمعات التداول الناطقة بالفارسية.",
        bullets: [
          "برامج KOL ومجتمع فارسية أصلية",
          "تنسيق برامج الوسيط وIB للشركاء الإقليميين",
          "توزيع عالي الثقة لاحتفاظ مستدام",
        ],
      },
      {
        key: "global",
        label: "عالمي",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "ممرات عالمية",
        description:
          "إطلاقات رموز وتوسعات منصات متعددة المناطق منسّقة — إيقاع تشغيل واحد عبر المناطق الزمنية.",
        bullets: [
          "هندسة حملة موحدة عبر الممرات العالمية الأساسية",
          "تقارير بين الأسواق مع قياس قمع قابل للتنفيذ",
          "حلقات تكرار مستمرة مرتبطة بمؤشرات الاكتساب والحجم",
        ],
      },
    ],
  },
};

export function getCryptoAgency(lang: LangCode): CryptoAgencyLocale {
  return getLocalized(cryptoAgency, lang);
}
