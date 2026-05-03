// Homepage Crypto Agency / regional markets section — all locales live here.

import type { Localized } from "../_contentLocales";
import { getLocalized } from "../_contentLocales";
import type { LangCode } from "../types";

export type CryptoMarketTabKey = "uae" | "turkey" | "iran" | "china" | "global";

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
    eyebrow: "Markets",
    title: "Crypto Agency Marketing",
    description:
      "Regional growth across UAE, Turkey, Iran, Greater China, and global corridors—built for Web3 acquisition, distribution, and liquidity.",
    cta: "Learn More",
    regionsAriaLabel: "Regions",
    tabs: [
      {
        key: "uae",
        label: "UAE",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "UAE Market Expansion",
        description:
          "Strategic Web3 growth across Dubai and Abu Dhabi. Local partnerships and regulated pathways help you scale with credibility in Gulf crypto hubs.",
        bullets: [
          "KOL and community programs tuned for Gulf audiences",
          "Exchange and liquidity coordination across regional venues",
          "Compliance-aware campaigns for institutional onboarding",
        ],
      },
      {
        key: "turkey",
        label: "Turkey",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "Turkey Market Expansion",
        description:
          "High-velocity execution across Turkish crypto markets with localized narratives, listings-aligned storytelling, and trader-focused activation.",
        bullets: [
          "Localized messaging and distribution across Turkish communities",
          "Exchange-listed narratives and liquidity-aligned milestones",
          "Community-led growth loops with measurable engagement",
        ],
      },
      {
        key: "iran",
        label: "Iran",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "Iran Regional Outreach",
        description:
          "Persian-language programs and partner-led distribution for crypto-native audiences, focused on trust, clarity, and sustained engagement.",
        bullets: [
          "Persian-language creative and publishing workflows",
          "Partner coordination for cross-platform presence",
          "Retention-focused community structures and education layers",
        ],
      },
      {
        key: "china",
        label: "China",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "Greater China Execution",
        description:
          "Carefully localized positioning for Greater China ecosystems—aligned with regional sentiment, partner norms, and credible institutional narratives.",
        bullets: [
          "Ecosystem-aligned messaging for regional audiences",
          "Structured partner coordination across distribution surfaces",
          "Institutional-grade collateral and timeline-ready milestones",
        ],
      },
      {
        key: "global",
        label: "Global",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Global Crypto Agency Marketing",
        description:
          "One cohesive playbook for multi-region launches—bridging liquidity depth, user acquisition, and narrative continuity across time zones.",
        bullets: [
          "Unified campaign architecture across core corridors",
          "Cross-market reporting with actionable funnel telemetry",
          "Always-on iteration loops tied to liquidity and growth KPIs",
        ],
      },
    ],
  },

  fa: {
    eyebrow: "بازارها",
    title: "آژانس مارکتینگ کریپتو",
    description:
      "ما محصولات Web3 را از طریق جذب کاربر، توزیع و نقدینگی رشد می‌دهیم.",
    cta: "بیشتر بدانید",
    regionsAriaLabel: "مناطق",
    tabs: [
      {
        key: "uae",
        label: "امارات",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "گسترش بازار امارات",
        description:
          "رشد استراتژیک Web3 در دبی و ابوظبی. همکاری‌های محلی و مسیرهای منظم به شما کمک می‌کند با اعتبار در هاب‌های رمز ارزی خلیج مقیاس پیدا کنید.",
        bullets: [
          "برنامه‌های KOL و جامعه برای مخاطبان خلیج",
          "هماهنگی صرافی و نقدینگی در سطح منطقه",
          "کمپین‌های آگاه از انطباق برای ورود نهادی",
        ],
      },
      {
        key: "turkey",
        label: "ترکیه",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "گسترش بازار ترکیه",
        description:
          "اجرای پرسرعت در بازارهای رمز ارزی ترکیه با روایت‌های بومی، داستان‌سرایی هم‌راستا با لیستینگ و فعال‌سازی متمرکز بر معامله‌گر.",
        bullets: [
          "پیام‌رسانی و توزیع بومی در جوامع ترکیه",
          "روایت‌های هم‌راستا با لیست صرافی و نقاط عطف نقدینگی",
          "حلقه‌های رشد جامعه‌محور با تعامل قابل اندازه‌گیری",
        ],
      },
      {
        key: "iran",
        label: "ایران",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "دسترسی منطقه‌ای ایران",
        description:
          "برنامه‌های فارسی‌زبان و توزیع با همکار برای مخاطبان بومی رمز ارز با تمرکز بر اعتماد، شفافیت و تعامل پایدار.",
        bullets: [
          "گردش کار خلاق و انتشار فارسی‌زبان",
          "هماهنگی همکار برای حضور چندسکویی",
          "ساختار جامعه و لایه‌های آموزشی با تمرکز بر نگهداشت",
        ],
      },
      {
        key: "china",
        label: "چین",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "اجرای چین بزرگ‌تر",
        description:
          "جایگاه‌یابی بومی‌شده برای اکوسیستم چین بزرگ‌تر — هم‌راستا با احساسات منطقه‌ای، هنجارهای همکار و روایت‌های نهادی معتبر.",
        bullets: [
          "پیام‌رسانی هم‌راستا با اکوسیستم برای مخاطبان منطقه",
          "هماهنگی ساخت‌یافته همکار در سطح‌های توزیع",
          "محتوای درجه نهادی و نقاط عطف آماده زمان‌بندی",
        ],
      },
      {
        key: "global",
        label: "جهانی",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "مارکتینگ آژانس رمز ارزی جهانی",
        description:
          "یک نقشه راه یکپارچه برای راه‌اندازی چندمنطقه‌ای — پیوند عمق نقدینگی، جذب کاربر و پیوستگی روایت در مناطق زمانی.",
        bullets: [
          "معماری کمپین یکپارچه در راهروهای اصلی",
          "گزارش بین‌بازاری با پایش قیف قابل اقدام",
          "حلقه‌های تکرار همیشگی گره خورده به KPI نقدینگی و رشد",
        ],
      },
    ],
  },

  tr: {
    eyebrow: "Piyasalar",
    title: "Kripto Pazarlama Ajansı",
    description:
      "Web3 ürünlerini kullanıcı kazanımı, dağıtım ve likidite ile büyütüyoruz.",
    cta: "Daha fazla bilgi",
    regionsAriaLabel: "Bölgeler",
    tabs: [
      {
        key: "uae",
        label: "BAE",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "BAE Piyasası Genişlemesi",
        description:
          "Dubai ve Abu Dhabi genelinde stratejik Web3 büyümesi. Yerel ortaklıklar ve düzenlemelere uygun yollar, Körfez kripto merkezlerinde güvenilir ölçek sağlar.",
        bullets: [
          "Körfez kitleleri için ayarlanmış KOL ve topluluk programları",
          "Bölgesel mecralarda borsa ve likidite koordinasyonu",
          "Kurumsal onboarding için uyum bilinci kampanyaları",
        ],
      },
      {
        key: "turkey",
        label: "Türkiye",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "Türkiye Piyasası Genişlemesi",
        description:
          "Yerelleştirilmiş anlatılar, listelemeye uygun hikâye ve trader odaklı aktivasyonla Türkiye kripto piyasalarında yüksek hızlı icra.",
        bullets: [
          "Türk topluluklarında yerelleştirilmiş mesaj ve dağıtım",
          "Listelenmiş anlatılar ve likiditeyle uyumlu kilometre taşları",
          "Ölçülebilir etkileşimle topluluk odaklı büyüme döngüleri",
        ],
      },
      {
        key: "iran",
        label: "İran",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "İran Bölgesel Erişimi",
        description:
          "Kripto yerli kitleler için Farsça programlar ve ortak öncülü dağıtım—güven, netlik ve sürdürülebilir katılım odaklı.",
        bullets: [
          "Farsça içerik ve yayın iş akışları",
          "Çok platformlu varlık için ortak koordinasyonu",
          "Tutuma odaklı topluluk yapıları ve eğitim katmanları",
        ],
      },
      {
        key: "china",
        label: "Çin",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "Geniş Çin Uygulaması",
        description:
          "Geniş Çin ekosistemleri için özenle yerelleştirilmiş konumlandırma—bölgesel duyarlılık, ortak normları ve kurumsal anlatılarla uyumlu.",
        bullets: [
          "Bölgesel kitleler için ekosistemle uyumlu mesajlaşma",
          "Dağıtım yüzeylerinde yapılandırılmış ortak koordinasyonu",
          "Kurumsal düzeyde materyaller ve zaman çizelgesine hazır kilometre taşları",
        ],
      },
      {
        key: "global",
        label: "Küresel",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Küresel Kripto Ajans Pazarlama",
        description:
          "Çok bölgeli lansmanlar için tek uyumlu oyun kitabı—likidite derinliği, kullanıcı edinimi ve anlatı sürekliliğini zaman dilimleri arasında köprüler.",
        bullets: [
          "Çekirdek koridorlar boyunca birleşik kampanya mimarisi",
          "Eyleme dönüştürülebilir huni telemetrisi ile çapraz pazar raporlaması",
          "Likidite ve büyüme KPI’larına bağlı her zaman açık iterasyon döngüleri",
        ],
      },
    ],
  },

  zh: {
    eyebrow: "市场",
    title: "加密营销机构",
    description: "我们通过用户获取、分发和流动性扩展 Web3 项目。",
    cta: "了解更多",
    regionsAriaLabel: "地区",
    tabs: [
      {
        key: "uae",
        label: "阿联酋",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "阿联酋市场拓展",
        description:
          "迪拜与阿布扎比的战略 Web3 增长。本地合作与合规路径帮助您在海湾加密枢纽可信扩张。",
        bullets: [
          "面向海湾受众的 KOL 与社区计划",
          "区域内交易所与流动性协同",
          "面向机构入驻的合规导向 campaign",
        ],
      },
      {
        key: "turkey",
        label: "土耳其",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "土耳其市场拓展",
        description:
          "以本地化叙事、与上新对齐的故事以及交易者导向激活，在土耳其加密市场高速执行。",
        bullets: [
          "土耳其社群中的本地化传播与分发",
          "与上新叙事及流动性里程碑对齐",
          "可衡量互动的社群增长闭环",
        ],
      },
      {
        key: "iran",
        label: "伊朗",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "伊朗区域触达",
        description:
          "面向加密原生受众的波斯语项目与合作伙伴分发网络，强调信任、清晰与持续参与。",
        bullets: [
          "波斯语创意与发布流程",
          "跨平台合作的伙伴协同",
          "以留存为目标的社群结构与教育层",
        ],
      },
      {
        key: "china",
        label: "中国",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "大中华区执行",
        description:
          "为大中华生态精心本地化定位——契合区域情绪、伙伴规范与可信的机构叙事。",
        bullets: [
          "面向区域受众的生态一致信息",
          "跨分发渠道的结构化伙伴协同",
          "机构级物料与可交付时间表里程碑",
        ],
      },
      {
        key: "global",
        label: "全球",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "全球加密机构营销",
        description:
          "多区域上线的统一打法——连接流动性深度、用户获取与跨时区的叙事连续性。",
        bullets: [
          "核心走廊的统一战役架构",
          "跨市场可行动漏斗遥测报告",
          "与流动性及增长 KPI 绑定的持续迭代闭环",
        ],
      },
    ],
  },

  es: {
    eyebrow: "Mercados",
    title: "Agencia de Marketing Cripto",
    description:
      "Escalamos productos Web3 mediante adquisición, distribución y liquidez.",
    cta: "Aprender más",
    regionsAriaLabel: "Regiones",
    tabs: [
      {
        key: "uae",
        label: "EAU",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "Expansión de mercado en EAU",
        description:
          "Crecimiento Web3 estratégico en Dubái y Abu Dabi. Socios locales y rutas reguladas escalan con credibilidad en los hubs cripto del Golfo.",
        bullets: [
          "Programas KOL y comunitarios para audiencias del Golfo",
          "Coordinación de exchange y liquidez entre sedes regionales",
          "Campañas conscientes del cumplimiento para onboarding institucional",
        ],
      },
      {
        key: "turkey",
        label: "Turquía",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "Expansión de mercado en Turquía",
        description:
          "Ejecución de alta velocidad en mercados cripto turcos con narrativas localizadas, storytelling alineado a listings y activación centrada en traders.",
        bullets: [
          "Mensajes y distribución localizados en comunidades turcas",
          "Narrativas listadas en exchange e hitos alineados con liquidez",
          "Bucles de crecimiento comunitario con engagement medible",
        ],
      },
      {
        key: "iran",
        label: "Irán",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "Alcance regional en Irán",
        description:
          "Programas en persa y distribución liderada por socios para audiencias nativas cripto, con foco en confianza, claridad y compromiso sostenido.",
        bullets: [
          "Flujos creativos y editoriales en persa",
          "Coordinación de socios para presencia multiplataforma",
          "Estructuras comunitarias y capas educativas orientadas a retención",
        ],
      },
      {
        key: "china",
        label: "China",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "Ejecución en Gran China",
        description:
          "Posicionamiento localizado con cuidado para ecosistemas de Gran China—alineado al sentimiento regional, normas de socios e narrativas institucionales creíbles.",
        bullets: [
          "Mensajes alineados al ecosistema para audiencias regionales",
          "Coordinación estructurada de socios en superficies de distribución",
          "Material de nivel institucional e hitos listos para roadmap",
        ],
      },
      {
        key: "global",
        label: "Global",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Marketing global de agencia cripto",
        description:
          "Un playbook cohesivo para lanzamientos multiregión—profundidad de liquidez, adquisición de usuarios y continuidad narrativa entre zonas horarias.",
        bullets: [
          "Arquitectura de campaña unificada en corredores clave",
          "Reporting cross-market con telemetría de embudo accionable",
          "Bucles de iteración siempre activos ligados a KPI de liquidez y crecimiento",
        ],
      },
    ],
  },

  ru: {
    eyebrow: "Рынки",
    title: "Крипто маркетинговое агентство",
    description:
      "Мы масштабируем Web3-продукты через привлечение, дистрибуцию и ликвидность.",
    cta: "Подробнее",
    regionsAriaLabel: "Регионы",
    tabs: [
      {
        key: "uae",
        label: "ОАЭ",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "Расширение на рынке ОАЭ",
        description:
          "Стратегический рост Web3 в Дубае и Абу-Даби. Локальные партнёрства и регулируемые маршруты помогают масштабироваться с доверием в крипто-хабах Персидского залива.",
        bullets: [
          "KOL и комьюнити-программы для аудиторий Персидского залива",
          "Координация бирж и ликвидности по региональным площадкам",
          "Кампании с учётом комплаенса для институционального онбординга",
        ],
      },
      {
        key: "turkey",
        label: "Турция",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "Расширение на рынке Турции",
        description:
          "Высокоскоростное исполнение на турецких крипторынках с локализованными нарративами, историями под листинг и активацией вокруг трейдеров.",
        bullets: [
          "Локализованные сообщения и дистрибуция в турецких сообществах",
          "Нарративы листинга и вехи, согласованные с ликвидностью",
          "Ростовые петли сообщества с измеримым вовлечением",
        ],
      },
      {
        key: "iran",
        label: "Иран",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "Региональный охват Ирана",
        description:
          "Персоязычные программы и партнёрская дистрибуция для крипто-нативной аудитории — доверие, ясность и устойчивое вовлечение.",
        bullets: [
          "Персоязычные креативные и редакционные процессы",
          "Координация партнёров для присутствия на платформах",
          "Структуры сообщества и образовательные слои с фокусом на удержание",
        ],
      },
      {
        key: "china",
        label: "Китай",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "Исполнение в Большом Китае",
        description:
          "Тщательно локализованное позиционирование для экосистем Большого Китая — в линии с региональным настроением, нормами партнёров и учрежденческими нарративами.",
        bullets: [
          "Сообщения, согласованные с экосистемой для региональной аудитории",
          "Структурированная координация партнёров по каналам дистрибуции",
          "Институциональные материалы и готовые к таймлайну вехи",
        ],
      },
      {
        key: "global",
        label: "Глобально",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "Глобальный крипто-маркетинг агентства",
        description:
          "Единый playbook для мультирегиональных запусков — глубина ликвидности, привлечение пользователей и непрерывность нарратива между часовыми поясами.",
        bullets: [
          "Единая архитектура кампаний по ключевым коридорам",
          "Кросс-рыночная отчётность с actionable телеметрией воронки",
          "Постоянные итерации, привязанные к KPI ликвидности и роста",
        ],
      },
    ],
  },

  ar: {
    eyebrow: "الأسواق",
    title: "وكالة تسويق العملات المشفرة",
    description:
      "نوسّع منتجات Web3 عبر اكتساب المستخدمين والتوزيع وأنظمة السيولة.",
    cta: "اعرف المزيد",
    regionsAriaLabel: "المناطق",
    tabs: [
      {
        key: "uae",
        label: "الإمارات",
        flag: "🇦🇪",
        href: "/markets/uae",
        panelTitle: "توسعة سوق الإمارات",
        description:
          "نمو Web3 استراتيجي في دبي وأبوظبي. شراكات محلية ومسارات منظمة تساعدكم على التوسع بمصداقية في مراكز العملات المشفرة الخليجية.",
        bullets: [
          "برامج KOL ومجتمعات مخصصة لجمهور الخليج",
          "تنسيق بين المنصات والسيولة عبر المراكز الإقليمية",
          "حملات تراعي الامتثال لاستقطاب المؤسسات",
        ],
      },
      {
        key: "turkey",
        label: "تركيا",
        flag: "🇹🇷",
        href: "/markets/turkey",
        panelTitle: "توسعة سوق تركيا",
        description:
          "تنفيذ عالي السرعة في أسواق العملات المشفرة التركية بسرديات محلية وقصص متوافقة مع الإدراج وتفعيل يركز على المتداولين.",
        bullets: [
          "رسائل وتوزيع محليان في المجتمعات التركية",
          "سرديات متوافقة مع الإدراج ومعالم سيولة",
          "حلقات نمو مجتمعية بمشاركة قابلة للقياس",
        ],
      },
      {
        key: "iran",
        label: "إيران",
        flag: "🇮🇷",
        href: "/markets/iran",
        panelTitle: "الوصول الإقليمي في إيران",
        description:
          "برامج بالفارسية وتوزيع يقوده الشركاء لجمهور العملات المشفرة مع التركيز على الثقة والوضوح والمشاركة المستدامة.",
        bullets: [
          "سير عمل إبداعي ونشر بالفارسية",
          "تنسيق الشركاء للحضور متعدد المنصات",
          "هياكل مجتمعية وطبقات تعليم تركز على الاحتفاظ",
        ],
      },
      {
        key: "china",
        label: "الصين",
        flag: "🇨🇳",
        href: "/markets/china",
        panelTitle: "التنفيذ في الصين الكبرى",
        description:
          "موقع محلي بدقة لأنظمة الصين الكبرى — متوافق مع المشاعر الإقليمية ومعايير الشركاء وسرديات مؤسسية موثوقة.",
        bullets: [
          "رسائل متوافقة مع النظام البيئي للجماهير الإقليمية",
          "تنسيق منظم للشركاء عبر قنوات التوزيع",
          "مواد على مستوى مؤسسي ومعالم جاهزة للجدول الزمني",
        ],
      },
      {
        key: "global",
        label: "عالمي",
        flag: "🌐",
        href: "/markets/global",
        panelTitle: "تسويق وكالة العملات المشفرة عالمياً",
        description:
          "خطة موحدة لإطلاق متعدد المناطق — تربط عمق السيولة واكتساب المستخدم واستمرارية السرد عبر المناطق الزمنية.",
        bullets: [
          "هندسة حملة موحدة عبر الممرات الأساسية",
          "تقارير بين الأسواق مع قياس قمع قابل للتنفيذ",
          "حلقات تكرار مستمرة مرتبطة بمؤشرات السيولة والنمو",
        ],
      },
    ],
  },
};

export function getCryptoAgency(lang: LangCode): CryptoAgencyLocale {
  return getLocalized(cryptoAgency, lang);
}
