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
    sectionLabel: "Partner Feedback",
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
        "Sigma کمپین‌های نمایشی و بی‌اثر اجرا نمی‌کند. آن‌ها جذب کاربر را به نقاط واقعی نقدینگی وصل می‌کنند و گزارش‌دهی را تا جایی ادامه می‌دهند که تیم بتواند بر اساس آن تصمیم بگیرد.",
      name: "Partner",
      role: "Head of Growth، Global CEX Desk",
      company: "",
    },
    {
      id: "t2",
      quote:
        "بالاخره یک ریتم عملیاتی واحد بین KOLها، نقاط عطف محصول و رویدادهای بازار داشتیم.",
      name: "Partner",
      role: "VP Ecosystem، Layer-1 Foundation",
      company: "",
    },
    {
      id: "t3",
      quote:
        "تیم آن‌ها زبان اجرا را می‌فهمد: اسلاید کمتر، playbook بیشتر، و telemetryای که واقعاً اولویت‌های هفتگی ما را تغییر می‌دهد.",
      name: "Partner",
      role: "CMO، DeFi Protocol",
      company: "",
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
    sectionLabel: "Partner Geri Bildirimleri",
    headline: "Operatörler Sigma ile Çalışmak Hakkında Ne Diyor",
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
        "Sigma gösteriş kampanyaları üretmez. Kullanıcı kazanımını likidite kontrol noktalarına bağlar ve ekip aksiyon alana kadar raporlama disiplinini korur.",
      name: "Partner",
      role: "Head of Growth",
      company: "Global CEX Desk",
    },
    {
      id: "t2",
      quote:
        "KOL’ler, ürün kilometre taşları ve piyasa etkinlikleri arasında sonunda tek bir operasyon ritmi yakaladık.",
      name: "Partner",
      role: "VP Ecosystem",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Ekipleri uygulama dilini konuşuyor: daha az deck, daha fazla playbook ve haftalık önceliklerimizi gerçekten değiştiren telemetry.",
      name: "Partner",
      role: "CMO",
      company: "DeFi Protocol",
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
    sectionLabel: "合作伙伴反馈",
    headline: "运营者如何评价与 Sigma 合作",
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
        "Sigma 不做虚荣指标式的活动。他们把用户获取连接到流动性检查点，并持续推进报告机制，直到团队能够真正采取行动。",
      name: "Partner",
      role: "Global CEX Desk 增长负责人",
      company: "",
    },
    {
      id: "t2",
      quote:
        "我们终于在 KOL、产品里程碑和市场事件之间建立了统一运营节奏。",
      name: "Partner",
      role: "Layer-1 Foundation 生态副总裁",
      company: "",
    },
    {
      id: "t3",
      quote:
        "他们的团队讲的是执行语言：更少的方案堆叠，更多的 playbook，以及真正改变我们每周优先级的 telemetry。",
      name: "Partner",
      role: "DeFi Protocol CMO",
      company: "",
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
    sectionLabel: "Feedback de Partners",
    headline: "Qué Dicen los Operadores Sobre Trabajar con Sigma",
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
      name: "Partner",
      role: "Head of Growth",
      company: "Global CEX Desk",
    },
    {
      id: "t2",
      quote:
        "Por fin tuvimos un ritmo operativo único entre KOLs, hitos de producto y eventos de mercado.",
      name: "Partner",
      role: "VP Ecosystem",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Su equipo habla el lenguaje de la ejecución: menos decks, más playbooks y telemetry que realmente cambia nuestras prioridades semanales.",
      name: "Partner",
      role: "CMO",
      company: "DeFi Protocol",
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
    sectionLabel: "Отзывы партнёров",
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
        "Sigma не запускает кампании ради красивых метрик. Они связывают привлечение пользователей с контрольными точками ликвидности и держат отчётность на уровне, пока команда не может действовать на её основе.",
      name: "Partner",
      role: "Head of Growth",
      company: "Global CEX Desk",
    },
    {
      id: "t2",
      quote:
        "У нас наконец появился единый операционный ритм между KOL, продуктовыми вехами и рыночными событиями.",
      name: "Partner",
      role: "VP Ecosystem",
      company: "Layer-1 Foundation",
    },
    {
      id: "t3",
      quote:
        "Их команда говорит языком исполнения: меньше презентаций, больше playbook’ов и telemetry, которая реально меняет наши недельные приоритеты.",
      name: "Partner",
      role: "CMO",
      company: "DeFi Protocol",
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
        "Sigma لا تطلق حملات سطحية. إنهم يربطون اكتساب المستخدمين بنقاط سيولة قابلة للقياس ويحافظون على وضوح التقارير حتى يتمكن الفريق من اتخاذ قرارات فعلية.",
      name: "Partner",
      role: "رئيس النمو، Global CEX Desk",
      company: "",
    },
    {
      id: "t2",
      quote:
        "أخيراً أصبح لدينا إيقاع تشغيلي واحد بين KOLs، مراحل المنتج، وأحداث السوق.",
      name: "Partner",
      role: "نائب رئيس المنظومة، Layer-1 Foundation",
      company: "",
    },
    {
      id: "t3",
      quote:
        "فريقهم يتحدث بلغة التنفيذ: عروض أقل، playbooks أكثر، وقياسات تغيّر أولوياتنا الأسبوعية فعلاً.",
      name: "Partner",
      role: "CMO، DeFi Protocol",
      company: "",
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
