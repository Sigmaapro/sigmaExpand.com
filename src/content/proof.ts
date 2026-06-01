import type { LangCode } from "./types";

export type ProofClientLogo = {
  id: string;
  /** Screen reader / SEO */
  alt: string;
  /** Monochrome-friendly wordmark when `imageSrc` is omitted */
  wordmark: string;
  /** Optional logo URL (local `/…` or configured remote) */
  imageSrc?: string;
  href?: string;
};

export type ProofMetric = {
  id: string;
  value: string;
  label: string;
  note?: string;
};

export type ProofTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  logoSrc?: string;
  avatarSrc?: string;
};

/** Partner / client marks — swap `imageSrc` for real assets when available */
export const clientLogos: ProofClientLogo[] = [
  {
    id: "vertex",
    alt: "Vertex Digital Markets",
    wordmark: "VERTEX",
    href: undefined,
  },
  {
    id: "helio",
    alt: "Helios Liquidity Labs",
    wordmark: "HELIOS",
  },
  {
    id: "nexus",
    alt: "Nexus Chain Foundation",
    wordmark: "NEXUS",
  },
  {
    id: "atlas",
    alt: "Atlas Prime Trading",
    wordmark: "ATLAS",
  },
  {
    id: "meridian",
    alt: "Meridian Markets Group",
    wordmark: "MERIDIAN",
  },
  {
    id: "quant",
    alt: "Quant Harbor Research",
    wordmark: "QUANT",
  },
];

export type ProofContent = {
  trustedBy: {
    sectionLabel: string;
    headline: string;
  };
  proofInNumbers: {
    sectionLabel: string;
    headline: string;
  };
  partnerFeedback: {
    sectionLabel: string;
    headline: string;
  };
  metrics: ProofMetric[];
  testimonials: ProofTestimonial[];
};

const EN: ProofContent = {
  trustedBy: {
    sectionLabel: "TRUSTED BY",
    headline: "Built with teams shaping Web3",
  },
  proofInNumbers: {
    sectionLabel: "PROOF IN NUMBERS",
    headline: "Execution That Moves Users, Volume, and Reach",
  },
  partnerFeedback: {
    sectionLabel: "PARTNER FEEDBACK",
    headline: "What Operators Say About Working With Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "Notional monthly volume",
      note: "Cumulative across supported network activity",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "Users activated",
      note: "Wallet-verified cohorts",
    },
    {
      id: "reach",
      value: "190+",
      label: "Network surfaces",
      note: "Distribution touchpoints across regions",
    },
    {
      id: "partners",
      value: "85",
      label: "Strategic partners",
      note: "Active relationships with exchanges, brokers, protocols",
    },
    {
      id: "markets",
      value: "40+",
      label: "Markets covered",
      note: "Regions with live execution",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma doesn't ship vanity campaigns. They wire acquisition to liquidity checkpoints and hold the line on reporting until the desk can act on it.",
      name: "Partner",
      role: "Head of Growth",
      company: "Global CEX Desk",
    },
    {
      id: "t2",
      quote:
        "We finally had one operating rhythm across KOLs, product milestones, and market events.",
      name: "Partner",
      role: "VP Ecosystem",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Their team speaks execution: fewer decks, more playbooks, telemetry that actually changes our weekly priorities.",
      name: "Partner",
      role: "CMO",
      company: "DeFi Protocol",
    },
  ],
};

const FA: ProofContent = {
  trustedBy: {
    sectionLabel: "مورد اعتماد",
    headline: "ساخته‌شده در کنار تیم‌هایی که Web3 را شکل می‌دهند",
  },
  proofInNumbers: {
    sectionLabel: "اثبات در اعداد",
    headline: "اجرایی که کاربران، حجم و گستره را حرکت می‌دهد",
  },
  partnerFeedback: {
    sectionLabel: "بازخورد شرکا",
    headline: "اپراتورها درباره همکاری با Sigma چه می‌گویند",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "حجم ماهانه اسمی",
      note: "تجمیعی در فعالیت شبکه پشتیبانی‌شده",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "کاربران فعال‌شده",
      note: "گروه‌های تأییدشده با کیف پول",
    },
    {
      id: "reach",
      value: "190+",
      label: "سطوح شبکه",
      note: "نقاط تماس توزیع در مناطق",
    },
    {
      id: "partners",
      value: "85",
      label: "شرکای استراتژیک",
      note: "روابط فعال با صرافی‌ها، بروکرها و پروتکل‌ها",
    },
    {
      id: "markets",
      value: "40+",
      label: "بازارهای تحت پوشش",
      note: "مناطق دارای اجرای زنده",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma کمپین نمایشی اجرا نمی‌کند. جذب کاربر را به نقاط کنترل نقدینگی وصل می‌کند و تا زمانی که میز بتواند اقدام کند، خط گزارش‌دهی را حفظ می‌کند.",
      name: "شریک",
      role: "مدیر رشد",
      company: "میز CEX جهانی",
    },
    {
      id: "t2",
      quote:
        "بالاخره یک ریتم عملیاتی واحد بین KOLها، نقاط عطف محصول و رویدادهای بازار داشتیم.",
      name: "شریک",
      role: "معاون اکوسیستم",
      company: "بنیاد Layer-1",
    },
    {
      id: "t3",
      quote:
        "تیم‌شان زبان اجرا را می‌فهمد: دک کمتر، playbook بیشتر، تله‌متری که واقعاً اولویت‌های هفتگی ما را تغییر می‌دهد.",
      name: "شریک",
      role: "مدیر ارشد بازاریابی",
      company: "پروتکل DeFi",
    },
  ],
};

const TR: ProofContent = {
  trustedBy: {
    sectionLabel: "GÜVENENLER",
    headline: "Web3'ü şekillendiren ekiplerle birlikte inşa edildi",
  },
  proofInNumbers: {
    sectionLabel: "SAYILARLA KANIT",
    headline: "Kullanıcıları, hacmi ve erişimi hareket ettiren yürütme",
  },
  partnerFeedback: {
    sectionLabel: "ORTAK GERİ BİLDİRİMİ",
    headline: "Operatörler Sigma ile Çalışma Hakkında Ne Diyor",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "Aylık nominal hacim",
      note: "Desteklenen ağ aktivitesinde kümülatif",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "Aktifleştirilen kullanıcı",
      note: "Cüzdan doğrulamalı kohortlar",
    },
    {
      id: "reach",
      value: "190+",
      label: "Ağ yüzeyleri",
      note: "Bölgeler genelinde dağıtım temas noktaları",
    },
    {
      id: "partners",
      value: "85",
      label: "Stratejik ortak",
      note: "Borsa, broker ve protokollerle aktif ilişkiler",
    },
    {
      id: "markets",
      value: "40+",
      label: "Kapsanan pazar",
      note: "Canlı yürütmenin olduğu bölgeler",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma gösteriş kampanyaları yürütmüyor. Edinimi likidite kontrol noktalarına bağlıyor ve masa ekibi aksiyon alana kadar rapor disiplinini koruyor.",
      name: "Ortak",
      role: "Büyüme Direktörü",
      company: "Global CEX Masası",
    },
    {
      id: "t2",
      quote:
        "Sonunda KOL'lar, ürün kilometre taşları ve piyasa olayları arasında tek bir operasyon ritmimiz oldu.",
      name: "Ortak",
      role: "Ekosistem Başkan Yardımcısı",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Ekipleri yürütme dilini konuşuyor: daha az sunum, daha çok playbook, haftalık önceliklerimizi gerçekten değiştiren telemetri.",
      name: "Ortak",
      role: "CMO",
      company: "DeFi Protokolü",
    },
  ],
};

const ZH: ProofContent = {
  trustedBy: {
    sectionLabel: "合作伙伴",
    headline: "与塑造 Web3 的团队共同构建",
  },
  proofInNumbers: {
    sectionLabel: "数据证明",
    headline: "推动用户、交易量与覆盖面的执行能力",
  },
  partnerFeedback: {
    sectionLabel: "合作反馈",
    headline: "运营方如何评价与 Sigma 的合作",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "月度名义交易量",
      note: "支持网络活动的累计数据",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "激活用户",
      note: "钱包验证用户群",
    },
    {
      id: "reach",
      value: "190+",
      label: "网络触点",
      note: "跨区域的分发触达面",
    },
    {
      id: "partners",
      value: "85",
      label: "战略合作伙伴",
      note: "与交易所、经纪商、协议的活跃关系",
    },
    {
      id: "markets",
      value: "40+",
      label: "覆盖市场",
      note: "已上线执行区域",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma 不做虚荣式营销。他们将获客与流动性检查点打通，并在交易台能够行动前始终保持报告纪律。",
      name: "合作伙伴",
      role: "增长负责人",
      company: "全球 CEX 交易台",
    },
    {
      id: "t2",
      quote:
        "我们终于在 KOL、产品里程碑和市场事件之间建立了统一运营节奏。",
      name: "合作伙伴",
      role: "生态副总裁",
      company: "Layer-1 基金会",
    },
    {
      id: "t3",
      quote:
        "他们真正懂执行：更少演示、更多 playbook，以及能改变我们每周优先级的遥测体系。",
      name: "合作伙伴",
      role: "CMO",
      company: "DeFi 协议",
    },
  ],
};

const ES: ProofContent = {
  trustedBy: {
    sectionLabel: "CONFIADO POR",
    headline: "Construido con equipos que están dando forma a Web3",
  },
  proofInNumbers: {
    sectionLabel: "PRUEBA EN NÚMEROS",
    headline: "Ejecución que mueve usuarios, volumen y alcance",
  },
  partnerFeedback: {
    sectionLabel: "OPINIÓN DE SOCIOS",
    headline: "Qué dicen los operadores sobre trabajar con Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "Volumen nocional mensual",
      note: "Acumulado en la actividad de red respaldada",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "Usuarios activados",
      note: "Cohortes verificadas por wallet",
    },
    {
      id: "reach",
      value: "190+",
      label: "Superficies de red",
      note: "Puntos de distribución por región",
    },
    {
      id: "partners",
      value: "85",
      label: "Socios estratégicos",
      note: "Relaciones activas con exchanges, brokers y protocolos",
    },
    {
      id: "markets",
      value: "40+",
      label: "Mercados cubiertos",
      note: "Regiones con ejecución en vivo",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma no lanza campañas de vanidad. Conectan adquisición con checkpoints de liquidez y mantienen la disciplina de reporting hasta que la mesa puede actuar.",
      name: "Socio",
      role: "Director de Growth",
      company: "Mesa CEX global",
    },
    {
      id: "t2",
      quote:
        "Por fin tuvimos un ritmo operativo único entre KOLs, hitos de producto y eventos de mercado.",
      name: "Socio",
      role: "VP de Ecosistema",
      company: "Fundación Layer-1",
    },
    {
      id: "t3",
      quote:
        "Su equipo habla de ejecución: menos presentaciones, más playbooks, telemetría que cambia nuestras prioridades semanales.",
      name: "Socio",
      role: "CMO",
      company: "Protocolo DeFi",
    },
  ],
};

const RU: ProofContent = {
  trustedBy: {
    sectionLabel: "НАМ ДОВЕРЯЮТ",
    headline: "Создано вместе с командами, формирующими Web3",
  },
  proofInNumbers: {
    sectionLabel: "ДОКАЗАТЕЛЬСТВО В ЦИФРАХ",
    headline: "Исполнение, которое двигает пользователей, объём и охват",
  },
  partnerFeedback: {
    sectionLabel: "ОТЗЫВЫ ПАРТНЕРОВ",
    headline: "Что операторы говорят о работе с Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "Месячный номинальный объём",
      note: "Суммарно по активности поддерживаемой сети",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "Активированные пользователи",
      note: "Когорты с wallet-верификацией",
    },
    {
      id: "reach",
      value: "190+",
      label: "Поверхности сети",
      note: "Точки дистрибуции по регионам",
    },
    {
      id: "partners",
      value: "85",
      label: "Стратегические партнёры",
      note: "Активные отношения с биржами, брокерами и протоколами",
    },
    {
      id: "markets",
      value: "40+",
      label: "Покрытые рынки",
      note: "Регионы с live-исполнением",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma не делает кампании ради шума. Они связывают привлечение с чекпоинтами ликвидности и держат дисциплину отчётности, пока desk не может действовать.",
      name: "Партнёр",
      role: "Руководитель роста",
      company: "Глобальный CEX desk",
    },
    {
      id: "t2",
      quote:
        "Наконец появился единый операционный ритм между KOL, продуктовыми вехами и рыночными событиями.",
      name: "Партнёр",
      role: "VP Экосистемы",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Их команда говорит на языке исполнения: меньше слайдов, больше playbook’ов, телеметрия, которая меняет наши недельные приоритеты.",
      name: "Партнёр",
      role: "CMO",
      company: "DeFi-протокол",
    },
  ],
};

const AR: ProofContent = {
  trustedBy: {
    sectionLabel: "يثقون بنا",
    headline: "نُبنى جنباً إلى جنب مع فرق تشكّل مستقبل Web3",
  },
  proofInNumbers: {
    sectionLabel: "أدلة بالأرقام",
    headline: "تنفيذ يحرك المستخدمين والحجم والوصول",
  },
  partnerFeedback: {
    sectionLabel: "آراء الشركاء",
    headline: "ماذا يقول المشغّلون عن العمل مع Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$7B+",
      label: "حجم اسمي شهري",
      note: "تراكمي عبر نشاط الشبكة المدعوم",
    },
    {
      id: "users",
      value: "2.4M+",
      label: "مستخدمون تم تنشيطهم",
      note: "مجموعات موثّقة عبر المحفظة",
    },
    {
      id: "reach",
      value: "190+",
      label: "أسطح الشبكة",
      note: "نقاط توزيع عبر المناطق",
    },
    {
      id: "partners",
      value: "85",
      label: "شركاء استراتيجيون",
      note: "علاقات نشطة مع بورصات ووسطاء وبروتوكولات",
    },
    {
      id: "markets",
      value: "40+",
      label: "أسواق مغطاة",
      note: "مناطق بتنفيذ مباشر",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma لا تطلق حملات صورية. تربط الاكتساب بنقاط تحقق السيولة وتحافظ على انضباط التقارير حتى يمكن لمكتب التداول التصرّف.",
      name: "شريك",
      role: "رئيس النمو",
      company: "مكتب CEX عالمي",
    },
    {
      id: "t2",
      quote:
        "أخيراً صار لدينا إيقاع تشغيل واحد بين المؤثرين ومراحل المنتج وأحداث السوق.",
      name: "شريك",
      role: "نائب رئيس المنظومة",
      company: "مؤسسة Layer-1",
    },
    {
      id: "t3",
      quote:
        "فريقهم يتحدث بلغة التنفيذ: عروض أقل، playbooks أكثر، وبيانات تشغيل تغيّر أولوياتنا الأسبوعية فعلياً.",
      name: "شريك",
      role: "مديرة التسويق",
      company: "بروتوكول DeFi",
    },
  ],
};

export const proofByLang: Record<LangCode, ProofContent> = {
  EN,
  FA,
  TR,
  ZH,
  ES,
  RU,
  AR,
};
