// Homepage Crypto Agency / regional markets section — all locales live here.

import type { Localized } from "../_contentLocales";
import { getLocalized } from "../_contentLocales";
import type { LangCode } from "../types";

export type CryptoMarketTabKey = "wana" | "cis" | "apac" | "europe" | "latam";

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

export const cryptoAgency: Localized<CryptoAgencyLocale> = {
  en: {
    eyebrow: "Regional Crypto & Web3 Marketing · Native Teams · Local Execution",
    title: "Built for Where Your Next Users Actually Live",
    description:
      "Web3 growth does not happen at the global average. Sigma executes region by region with native KOL networks, regional BD support, and locally calibrated funnels across MENA/WANA, CIS, APAC, Europe, and LATAM.",
    cta: "Plan Your Regional Expansion",
    regionsAriaLabel: "Regions",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma operates across MENA and WANA with Arabic, Persian, and GCC-native KOL networks, regional BD support, broker IB infrastructure, and locally calibrated growth funnels.",
        bullets: [
          "Compliance-aware growth across UAE, KSA, Qatar, Kuwait, Bahrain, and Oman",
          "Arabic and Persian-native KOL and community networks",
          "Native Farsi KOL, broker IB infrastructure, and regional BD execution",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma supports CIS market expansion through Russian-language distribution, regional KOL networks, trading communities, futures and prop-trading audiences, and localized BD execution.",
        bullets: [
          "Russian-language creator and distribution infrastructure",
          "CIS trading communities across crypto and finance verticals",
          "Localized BD routing for exchange and broker expansion",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma supports APAC growth through Asia-Pacific KOL surfaces, regional community channels, and localized execution across Korean, Vietnamese, Thai, Indonesian, and broader Southeast Asian markets.",
        bullets: [
          "Regional KOL access across Korean, Vietnamese, Thai, and Indonesian audiences",
          "APAC community and distribution channels aligned to local behavior",
          "Bali-linked execution support for Southeast Asia campaigns",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma supports European and Turkey-linked expansion through MiCA-aware campaign planning, localized KOL and BD coordination, Telegram-first Turkish communities, FX-aware messaging, native Turkish creators, and region-specific growth infrastructure.",
        bullets: [
          "MiCA-aware campaigns across Germany, Spain, Italy, Poland, and broader EU corridors",
          "Balkans growth surfaces plus Turkey / Istanbul presence",
          "Telegram-first Turkish communities, FX-aware messaging, and native Turkish creators",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma supports LATAM and Spain-focused growth through Spanish and Portuguese funnels, stablecoin-first narratives, regional KOL access, trading communities, and localized acquisition infrastructure.",
        bullets: [
          "Spanish and Portuguese funnels for LATAM and Spain-linked expansion",
          "Stablecoin-first narratives aligned with local trading behavior",
          "Regional KOL and trading-community distribution systems",
        ],
      },
    ],
  },

  fa: {
    eyebrow: "مارکتینگ منطقه‌ای Crypto و Web3 · تیم‌های بومی · اجرای محلی",
    title: "برای جایی ساخته شده که کاربران بعدی شما واقعاً آنجا هستند",
    description:
      "رشد Web3 در میانگین جهانی رخ نمی‌دهد؛ منطقه‌به‌منطقه اتفاق می‌افتد. Sigma با شبکه‌های KOL بومی، BD منطقه‌ای و قیف‌های محلی در MENA/WANA، CIS، APAC، اروپا و LATAM اجرا می‌کند.",
    cta: "برنامه‌ریزی توسعه منطقه‌ای",
    regionsAriaLabel: "مناطق",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma در MENA و WANA با شبکه‌های KOL بومی عربی، فارسی و GCC، پشتیبانی BD منطقه‌ای، زیرساخت IB بروکرها و قیف‌های رشد محلی فعالیت می‌کند.",
        bullets: [
          "رشد هم‌راستا با الزامات بازارهای UAE، KSA، قطر، کویت، بحرین و عمان",
          "شبکه‌های KOL و کامیونیتی بومی عربی و فارسی",
          "KOL فارسی بومی، زیرساخت IB بروکر و اجرای BD منطقه‌ای",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma توسعه بازار CIS را با توزیع روسی‌زبان، شبکه‌های KOL منطقه‌ای، کامیونیتی‌های معاملاتی، مخاطبان futures و prop trading، و اجرای BD بومی پشتیبانی می‌کند.",
        bullets: [
          "زیرساخت توزیع و کریتور روسی‌زبان",
          "دسترسی به کامیونیتی‌های معاملاتی CIS در crypto و finance",
          "مسیر‌دهی BD محلی برای توسعه صرافی‌ها و بروکرها",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma رشد APAC را از طریق سطوح KOL آسیا-پاسیفیک، کانال‌های کامیونیتی منطقه‌ای، و اجرای بومی در بازارهای کره‌ای، ویتنامی، تایلندی، اندونزیایی و جنوب‌شرق آسیا پشتیبانی می‌کند.",
        bullets: [
          "دسترسی KOL منطقه‌ای در بازارهای کره، ویتنام، تایلند و اندونزی",
          "کانال‌های توزیع و کامیونیتی APAC متناسب با رفتار محلی",
          "پشتیبانی اجرایی Bali-linked برای کمپین‌های جنوب‌شرق آسیا",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma توسعه اروپا و Turkey را با برنامه‌ریزی کمپین MiCA-aware، هماهنگی KOL و BD بومی، کامیونیتی‌های Turkish Telegram-first، پیام‌رسانی FX-aware و شبکه کریتورهای بومی ترکی پشتیبانی می‌کند.",
        bullets: [
          "کمپین‌های MiCA-aware در Germany، Spain، Italy، Poland و مسیرهای گسترده EU",
          "سطوح رشد Balkans همراه با Turkey / Istanbul presence",
          "کامیونیتی‌های Turkish Telegram-first، پیام FX-aware و کریتورهای بومی ترکی",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma رشد LATAM و Spain را با قیف‌های اسپانیایی و پرتغالی، روایت stablecoin-first، دسترسی KOL منطقه‌ای، کامیونیتی‌های معاملاتی و زیرساخت جذب بومی پشتیبانی می‌کند.",
        bullets: [
          "قیف‌های اسپانیایی و پرتغالی برای توسعه LATAM و Spain",
          "روایت stablecoin-first متناسب با رفتار محلی معامله‌گران",
          "سیستم‌های توزیع KOL و کامیونیتی‌های معاملاتی منطقه",
        ],
      },
    ],
  },

  tr: {
    eyebrow: "Bölgesel Crypto ve Web3 Pazarlama · Yerel Ekipler · Saha İcrası",
    title: "Bir Sonraki Kullanıcılarınızın Gerçekten Yaşadığı Yerler İçin",
    description:
      "Web3 büyümesi küresel ortalamada değil, bölge bölge gerçekleşir. Sigma; MENA/WANA, CIS, APAC, Europe ve LATAM boyunca yerel KOL ağları, saha BD ve yerel kalibreli hunilerle çalışır.",
    cta: "Bölgesel Genişlemenizi Planlayın",
    regionsAriaLabel: "Bölgeler",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma; MENA ve WANA genelinde Arapça, Farsça ve GCC-yerel KOL ağları, bölgesel BD desteği, broker IB altyapısı ve yerel büyüme hunileriyle çalışır.",
        bullets: [
          "UAE, KSA, Katar, Kuveyt, Bahreyn ve Umman genelinde uyum odaklı büyüme",
          "Arapça ve Farsça yerel KOL ve topluluk ağları",
          "Yerel Farsça KOL, broker IB altyapısı ve bölgesel BD icrası",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma, CIS genişlemesini Rusça dağıtım, bölgesel KOL ağları, trading toplulukları, futures/prop-trading kitlesi ve yerelleştirilmiş BD icrası ile destekler.",
        bullets: [
          "Rusça creator ve dağıtım altyapısı",
          "Crypto ve finance odaklı CIS trading topluluklarına erişim",
          "Exchange ve broker büyümesi için yerelleştirilmiş BD yönlendirmesi",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma, APAC büyümesini Asia-Pacific KOL yüzeyleri, bölgesel topluluk kanalları ve Kore, Vietnam, Tayland, Endonezya ile geniş Güneydoğu Asya’da yerel icrayla destekler.",
        bullets: [
          "Kore, Vietnam, Tayland ve Endonezya kitlelerinde bölgesel KOL erişimi",
          "Yerel davranışlara uygun APAC topluluk ve dağıtım kanalları",
          "Güneydoğu Asya kampanyaları için Bali bağlantılı icra desteği",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma, Avrupa ve Türkiye bağlantılı genişlemeyi MiCA-aware kampanya planlama, yerel KOL/BD koordinasyonu, Telegram-first Türk toplulukları, FX-aware mesajlama ve yerel Türk creator ağları ile destekler.",
        bullets: [
          "Germany, Spain, Italy, Poland ve geniş AB koridorlarında MiCA-aware kampanyalar",
          "Balkans büyüme yüzeyleri + Turkey / Istanbul presence",
          "Telegram-first Türk toplulukları, FX-aware mesajlama ve yerel Türk creator ağları",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma, LATAM ve Spain odaklı büyümeyi İspanyolca/Portekizce huniler, stablecoin-first anlatılar, bölgesel KOL erişimi, trading toplulukları ve yerel edinim altyapısıyla destekler.",
        bullets: [
          "LATAM ve Spain bağlantılı genişleme için İspanyolca ve Portekizce huniler",
          "Yerel trading davranışına uygun stablecoin-first anlatılar",
          "Bölgesel KOL ve trading topluluk dağıtım sistemleri",
        ],
      },
    ],
  },

  zh: {
    eyebrow: "区域 Crypto 与 Web3 增长 · 本地团队 · 在地执行",
    title: "为下一批用户真正所在的市场而打造",
    description:
      "Web3 增长不是“全球平均”问题，而是区域问题。Sigma 在 MENA/WANA、CIS、APAC、Europe 与 LATAM 通过本地 KOL 网络、区域 BD 与本地化漏斗执行增长。",
    cta: "规划您的区域扩张",
    regionsAriaLabel: "地区",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma 在 MENA/WANA 通过阿语、波斯语与 GCC 本地 KOL 网络、区域 BD 支持、经纪商 IB 基础设施和本地化增长漏斗执行扩张。",
        bullets: [
          "覆盖 UAE、KSA、Qatar、Kuwait、Bahrain、Oman 的合规导向增长",
          "阿语与波斯语本地 KOL 与社区网络",
          "本地 Farsi KOL、broker IB 基础设施与区域 BD 执行",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma 通过俄语分发、区域 KOL 网络、交易社区、期货与 prop-trading 受众，以及本地化 BD 执行支持 CIS 市场扩张。",
        bullets: [
          "俄语创作者与分发基础设施",
          "覆盖 crypto 与 finance 场景的 CIS 交易社区",
          "面向交易所与经纪商扩张的本地化 BD 路由",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma 通过亚太 KOL 面、区域社区渠道与在韩国、越南、泰国、印尼及更广泛东南亚的本地执行支持 APAC 增长。",
        bullets: [
          "覆盖韩国、越南、泰国、印尼受众的区域 KOL 触达",
          "符合本地行为的 APAC 社区与分发渠道",
          "面向东南亚项目的 Bali-linked 执行支持",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma 通过 MiCA-aware 活动规划、本地 KOL/BD 协同、Turkey 相关执行、Telegram-first 土耳其社区、FX-aware 信息与土耳其本地创作者网络支持欧洲扩张。",
        bullets: [
          "面向 Germany、Spain、Italy、Poland 与更广 EU 走廊的 MiCA-aware 活动",
          "Balkans 增长面 + Turkey / Istanbul presence",
          "Telegram-first 土耳其社区、FX-aware 信息与本地土耳其创作者网络",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma 通过西语/葡语漏斗、stablecoin-first 叙事、区域 KOL 触达、交易社区与本地化获客基础设施支持 LATAM 与 Spain 相关增长。",
        bullets: [
          "面向 LATAM 与 Spain 相关扩张的西语与葡语漏斗",
          "匹配本地交易行为的 stablecoin-first 叙事",
          "区域 KOL 与交易社区分发体系",
        ],
      },
    ],
  },

  es: {
    eyebrow: "Marketing regional Crypto y Web3 · Equipos nativos · Ejecución local",
    title: "Diseñado para donde viven de verdad tus próximos usuarios",
    description:
      "El crecimiento Web3 no ocurre en el promedio global; ocurre región por región. Sigma ejecuta en MENA/WANA, CIS, APAC, Europe y LATAM con redes KOL nativas, BD regional y embudos locales.",
    cta: "Planifica tu expansión regional",
    regionsAriaLabel: "Regiones",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma opera en MENA/WANA con redes KOL nativas en árabe, persa y GCC, soporte BD regional, infraestructura IB para brokers y embudos de crecimiento localizados.",
        bullets: [
          "Crecimiento con enfoque de cumplimiento en UAE, KSA, Qatar, Kuwait, Bahrain y Oman",
          "Redes KOL y de comunidad nativas en árabe y persa",
          "KOL farsi nativos, infraestructura IB de broker y ejecución BD regional",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma impulsa la expansión CIS con distribución en ruso, redes KOL regionales, comunidades de trading, audiencias de futures/prop-trading y ejecución BD localizada.",
        bullets: [
          "Infraestructura de creadores y distribución en ruso",
          "Acceso a comunidades de trading CIS en verticales crypto y finance",
          "Ruteo BD localizado para expansión de exchanges y brokers",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma impulsa crecimiento APAC mediante superficies KOL Asia-Pacific, canales comunitarios regionales y ejecución localizada en Corea, Vietnam, Tailandia, Indonesia y el Sudeste Asiático.",
        bullets: [
          "Acceso KOL regional en audiencias de Corea, Vietnam, Tailandia e Indonesia",
          "Canales APAC de comunidad y distribución calibrados al comportamiento local",
          "Soporte de ejecución Bali-linked para campañas de Sudeste Asiático",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma apoya expansión europea y Turkey-linked con planificación MiCA-aware, coordinación local de KOL y BD, comunidades turcas Telegram-first, mensajería FX-aware y redes nativas de creadores turcos.",
        bullets: [
          "Campañas MiCA-aware en Germany, Spain, Italy, Poland y corredores EU ampliados",
          "Superficies Balkans + Turkey / Istanbul presence",
          "Comunidades turcas Telegram-first, mensajería FX-aware y creadores turcos nativos",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma impulsa crecimiento en LATAM y Spain con embudos en español y portugués, narrativas stablecoin-first, acceso KOL regional, comunidades de trading e infraestructura local de adquisición.",
        bullets: [
          "Embudos en español y portugués para expansión LATAM y Spain",
          "Narrativas stablecoin-first alineadas al comportamiento local de trading",
          "Sistemas de distribución con KOL regionales y comunidades de trading",
        ],
      },
    ],
  },

  ru: {
    eyebrow: "Региональный crypto и Web3-маркетинг · Локальные команды · Полевая реализация",
    title: "Создано для рынков, где реально живут ваши следующие пользователи",
    description:
      "Рост Web3 не происходит по глобальному среднему — он происходит регион за регионом. Sigma работает в MENA/WANA, CIS, APAC, Europe и LATAM через локальные KOL-сети, региональный BD и локальные воронки.",
    cta: "Спланировать региональную экспансию",
    regionsAriaLabel: "Регионы",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "Sigma работает в MENA/WANA с арабскими, персидскими и GCC-native KOL-сетями, региональной BD-поддержкой, брокерской IB-инфраструктурой и локальными growth-воронками.",
        bullets: [
          "Комплаенс-ориентированный рост в UAE, KSA, Qatar, Kuwait, Bahrain и Oman",
          "Арабские и персидские локальные KOL и community-сети",
          "Локальные Farsi KOL, broker IB-инфраструктура и региональное BD-исполнение",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "Sigma поддерживает экспансию в CIS через русскоязычную дистрибуцию, региональные KOL-сети, трейдерские сообщества, аудитории futures/prop-trading и локализованное BD-исполнение.",
        bullets: [
          "Русскоязычная creator- и distribution-инфраструктура",
          "Доступ к CIS трейдерским сообществам в crypto и finance сегментах",
          "Локализованный BD-routing для роста бирж и брокеров",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "Sigma поддерживает рост APAC через Asia-Pacific KOL-поверхности, региональные community-каналы и локальное исполнение в Корее, Вьетнаме, Таиланде, Индонезии и шире в ЮВА.",
        bullets: [
          "Региональный KOL-доступ к аудиториям Кореи, Вьетнама, Таиланда и Индонезии",
          "APAC community и distribution-каналы под локальное поведение",
          "Bali-linked execution support для кампаний в Юго-Восточной Азии",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "Sigma поддерживает европейскую и Turkey-linked экспансию через MiCA-aware планирование кампаний, локальную координацию KOL/BD, Telegram-first турецкие сообщества, FX-aware сообщения и сети локальных турецких creators.",
        bullets: [
          "MiCA-aware кампании по Germany, Spain, Italy, Poland и расширенным EU-коридорам",
          "Balkans поверхности роста + Turkey / Istanbul presence",
          "Telegram-first турецкие сообщества, FX-aware сообщения и локальные турецкие creators",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "Sigma поддерживает рост LATAM и Spain через испанские/португальские воронки, stablecoin-first нарративы, региональный KOL-доступ, трейдерские сообщества и локализованную acquisition-инфраструктуру.",
        bullets: [
          "Испанские и португальские воронки для LATAM и Spain-связанных направлений",
          "Stablecoin-first нарративы под локальное торговое поведение",
          "Региональные KOL и distribution-системы трейдерских сообществ",
        ],
      },
    ],
  },

  ar: {
    eyebrow: "تسويق إقليمي لـ Crypto وWeb3 · فرق محلية · تنفيذ ميداني",
    title: "مصمّم للأسواق التي يعيش فيها مستخدموك القادمون فعلياً",
    description:
      "نمو Web3 لا يحدث عند المتوسط العالمي، بل منطقةً بمنطقة. تعمل Sigma في MENA/WANA وCIS وAPAC وEurope وLATAM عبر شبكات KOL محلية، ودعم BD إقليمي، ومسارات جذب مُعايرة لكل سوق.",
    cta: "خطّط لتوسّعك الإقليمي",
    regionsAriaLabel: "المناطق",
    tabs: [
      {
        key: "wana",
        label: "MENA / WANA",
        flag: "🌍",
        href: "/markets/wana",
        panelTitle: "MENA / WANA",
        description:
          "تعمل Sigma عبر MENA/WANA بشبكات KOL عربية وفارسية وGCC-native، مع دعم BD إقليمي، وبنية IB للوسطاء، ومسارات نمو محلية.",
        bullets: [
          "نمو واعٍ بالامتثال عبر UAE وKSA وQatar وKuwait وBahrain وOman",
          "شبكات KOL ومجتمعات محلية بالعربية والفارسية",
          "KOL فارسي أصيل، وبنية broker IB، وتنفيذ BD إقليمي",
        ],
      },
      {
        key: "cis",
        label: "CIS",
        flag: "🧭",
        href: "/markets/cis",
        panelTitle: "CIS",
        description:
          "تدعم Sigma التوسع في CIS عبر توزيع باللغة الروسية، وشبكات KOL إقليمية، ومجتمعات تداول، وجماهير futures وprop-trading، وتنفيذ BD محلي.",
        bullets: [
          "بنية صناع محتوى وتوزيع باللغة الروسية",
          "الوصول إلى مجتمعات تداول CIS في قطاعات crypto وfinance",
          "توجيه BD محلي لتوسّع المنصات والوسطاء",
        ],
      },
      {
        key: "apac",
        label: "APAC",
        flag: "🌏",
        href: "/markets/apac",
        panelTitle: "APAC",
        description:
          "تدعم Sigma نمو APAC عبر أسطح KOL في آسيا-المحيط الهادئ، وقنوات مجتمعية إقليمية، وتنفيذ محلي في كوريا وفيتنام وتايلند وإندونيسيا وجنوب شرق آسيا.",
        bullets: [
          "وصول KOL إقليمي إلى جماهير كوريا وفيتنام وتايلند وإندونيسيا",
          "قنوات مجتمع وتوزيع APAC مُعايرة للسلوك المحلي",
          "دعم تنفيذ Bali-linked لحملات جنوب شرق آسيا",
        ],
      },
      {
        key: "europe",
        label: "Europe",
        flag: "🏛️",
        href: "/markets/europe",
        panelTitle: "Europe",
        description:
          "تدعم Sigma التوسع الأوروبي والمرتبط بـ Turkey عبر تخطيط حملات MiCA-aware، وتنسيق KOL وBD محلي، ومجتمعات تركية Telegram-first، ورسائل FX-aware، وشبكات صناع محتوى أتراك محليين.",
        bullets: [
          "حملات MiCA-aware عبر Germany وSpain وItaly وPoland وممرات EU الأوسع",
          "أسطح نمو Balkans مع Turkey / Istanbul presence",
          "مجتمعات تركية Telegram-first ورسائل FX-aware وصناع محتوى أتراك محليون",
        ],
      },
      {
        key: "latam",
        label: "LATAM",
        flag: "🌎",
        href: "/markets/latam",
        panelTitle: "LATAM",
        description:
          "تدعم Sigma نمو LATAM وSpain عبر مسارات إسبانية وبرتغالية، وسرديات stablecoin-first، ووصول KOL إقليمي، ومجتمعات تداول، وبنية اكتساب محلية.",
        bullets: [
          "مسارات إسبانية وبرتغالية لتوسّع LATAM والامتداد المرتبط بـ Spain",
          "سرديات stablecoin-first متوافقة مع سلوك التداول المحلي",
          "أنظمة توزيع عبر KOL إقليميين ومجتمعات تداول",
        ],
      },
    ],
  },
};

export function getCryptoAgency(lang: LangCode): CryptoAgencyLocale {
  return getLocalized(cryptoAgency, lang);
}
