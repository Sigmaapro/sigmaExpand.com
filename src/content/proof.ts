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
    headline: "Execution that moves users, volume, and reach",
  },
  partnerFeedback: {
    sectionLabel: "PARTNER FEEDBACK",
    headline: "What partners say about working with Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "Notional trading volume",
      note: "Cumulative across supported venues",
    },
    {
      id: "users",
      value: "2.4M",
      label: "Users activated",
      note: "Wallet-verified cohorts",
    },
    {
      id: "reach",
      value: "190+",
      label: "Network reach",
      note: "Partner and community surfaces",
    },
    {
      id: "partners",
      value: "85",
      label: "Strategic partners",
      note: "Active distribution relationships",
    },
    {
      id: "markets",
      value: "40",
      label: "Markets covered",
      note: "Regions with live execution",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma does not ship vanity campaigns. They wire acquisition to liquidity checkpoints and hold the line on reporting until the desk can act on it.",
      name: "Elena Marchetti",
      role: "Head of Growth",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "We finally had one operating rhythm across KOLs, product milestones, and market events. The reduction in coordination tax alone was material.",
      name: "James Okonkwo",
      role: "VP Ecosystem",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "Their team speaks execution: fewer decks, more playbooks, and telemetry that actually changes our weekly priorities.",
      name: "Sarah Chen",
      role: "CMO",
      company: "DeFi protocol",
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
    headline: "نظر شرکا درباره همکاری با سیگما",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "حجم معاملاتی اسمی",
      note: "تجمیعی در تمام بسترهای پشتیبانی‌شده",
    },
    {
      id: "users",
      value: "2.4M",
      label: "کاربران فعال‌شده",
      note: "گروه‌های تاییدشده با کیف پول",
    },
    {
      id: "reach",
      value: "190+",
      label: "گستره شبکه",
      note: "سطوح شریک و جامعه",
    },
    {
      id: "partners",
      value: "85",
      label: "شرکای استراتژیک",
      note: "روابط فعال در توزیع",
    },
    {
      id: "markets",
      value: "40",
      label: "بازارهای تحت پوشش",
      note: "مناطق دارای اجرای زنده",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "سیگما کمپین نمایشی اجرا نمی‌کند. آن‌ها جذب کاربر را به نقاط کنترل نقدینگی متصل می‌کنند و گزارش‌دهی را تا لحظه قابل اقدام برای تیم معامله حفظ می‌کنند.",
      name: "Elena Marchetti",
      role: "مدیر رشد",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "برای اولین‌بار یک ریتم عملیاتی واحد بین KOLها، نقاط عطف محصول و رویدادهای بازار داشتیم. فقط کاهش هزینه هماهنگی هم تاثیرگذار بود.",
      name: "James Okonkwo",
      role: "معاون اکوسیستم",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "تیم آن‌ها زبان اجرا را می‌فهمد: دک کمتر، پلی‌بوک بیشتر، و تله‌متری‌ای که واقعاً اولویت‌های هفتگی ما را تغییر می‌دهد.",
      name: "Sarah Chen",
      role: "مدیر ارشد بازاریابی",
      company: "DeFi protocol",
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
    headline: "Ortakların Sigma ile çalışma deneyimi",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "Nominal işlem hacmi",
      note: "Desteklenen platformlarda kümülatif",
    },
    {
      id: "users",
      value: "2.4M",
      label: "Aktifleştirilen kullanıcı",
      note: "Cüzdan doğrulamalı kohortlar",
    },
    {
      id: "reach",
      value: "190+",
      label: "Ağ erişimi",
      note: "Partner ve topluluk yüzeyleri",
    },
    {
      id: "partners",
      value: "85",
      label: "Stratejik ortak",
      note: "Aktif dağıtım ilişkileri",
    },
    {
      id: "markets",
      value: "40",
      label: "Kapsanan pazar",
      note: "Canlı yürütmenin olduğu bölgeler",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma gösteriş kampanyaları yürütmüyor. Edinimi likidite kontrol noktalarına bağlıyor ve masa ekibi aksiyon alana kadar rapor çizgisini koruyor.",
      name: "Elena Marchetti",
      role: "Büyüme Direktörü",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "Sonunda KOL'lar, ürün kilometre taşları ve piyasa olayları arasında tek bir operasyon ritmimiz oldu. Sadece koordinasyon maliyetindeki düşüş bile çok değerliydi.",
      name: "James Okonkwo",
      role: "Ekosistem Başkan Yardımcısı",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "Ekipleri yürütme dilini konuşuyor: daha az sunum, daha çok playbook ve haftalık önceliklerimizi gerçekten değiştiren telemetri.",
      name: "Sarah Chen",
      role: "CMO",
      company: "DeFi protocol",
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
    headline: "合作伙伴如何评价与 Sigma 的协作",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "名义交易量",
      note: "覆盖支持平台的累计数据",
    },
    {
      id: "users",
      value: "2.4M",
      label: "激活用户",
      note: "钱包验证用户群",
    },
    {
      id: "reach",
      value: "190+",
      label: "网络覆盖",
      note: "合作伙伴与社区触点",
    },
    {
      id: "partners",
      value: "85",
      label: "战略合作伙伴",
      note: "活跃分发合作关系",
    },
    {
      id: "markets",
      value: "40",
      label: "覆盖市场",
      note: "已上线执行区域",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma 不做虚荣式营销。他们把获客与流动性检查点打通，并在交易台能够行动前始终保持报告纪律。",
      name: "Elena Marchetti",
      role: "增长负责人",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "我们终于在 KOL、产品里程碑和市场事件之间建立了统一节奏。仅协调成本的下降就非常显著。",
      name: "James Okonkwo",
      role: "生态副总裁",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "他们真正懂执行：更少的演示文稿、更多可落地方案，以及能改变我们每周优先级的遥测体系。",
      name: "Sarah Chen",
      role: "CMO",
      company: "DeFi protocol",
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
    headline: "Lo que dicen los socios sobre trabajar con Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "Volumen nocional de trading",
      note: "Acumulado en los venues compatibles",
    },
    {
      id: "users",
      value: "2.4M",
      label: "Usuarios activados",
      note: "Cohortes verificadas por wallet",
    },
    {
      id: "reach",
      value: "190+",
      label: "Alcance de red",
      note: "Superficies de socios y comunidad",
    },
    {
      id: "partners",
      value: "85",
      label: "Socios estratégicos",
      note: "Relaciones activas de distribución",
    },
    {
      id: "markets",
      value: "40",
      label: "Mercados cubiertos",
      note: "Regiones con ejecución en vivo",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma no lanza campañas de vanidad. Conectan adquisición con checkpoints de liquidez y mantienen la disciplina de reporting hasta que la mesa puede actuar.",
      name: "Elena Marchetti",
      role: "Head of Growth",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "Por fin tuvimos un ritmo operativo único entre KOLs, hitos de producto y eventos de mercado. Solo la reducción del costo de coordinación ya fue material.",
      name: "James Okonkwo",
      role: "VP Ecosystem",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "Su equipo habla de ejecución: menos presentaciones, más playbooks y telemetría que realmente cambia nuestras prioridades semanales.",
      name: "Sarah Chen",
      role: "CMO",
      company: "DeFi protocol",
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
    headline: "Что партнеры говорят о работе с Sigma",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "Номинальный торговый объем",
      note: "Суммарно по поддерживаемым площадкам",
    },
    {
      id: "users",
      value: "2.4M",
      label: "Активированные пользователи",
      note: "Когорты с wallet-верификацией",
    },
    {
      id: "reach",
      value: "190+",
      label: "Охват сети",
      note: "Партнерские и комьюнити-поверхности",
    },
    {
      id: "partners",
      value: "85",
      label: "Стратегические партнеры",
      note: "Активные отношения по дистрибуции",
    },
    {
      id: "markets",
      value: "40",
      label: "Покрытые рынки",
      note: "Регионы с live-исполнением",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "Sigma не делает кампании ради шума. Они связывают привлечение с чекпоинтами ликвидности и держат дисциплину отчетности, пока desk не может действовать.",
      name: "Elena Marchetti",
      role: "Руководитель роста",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "Наконец появился единый операционный ритм между KOL, продуктовыми вехами и рыночными событиями. Уже одно снижение координационных издержек было ощутимым.",
      name: "James Okonkwo",
      role: "VP Экосистемы",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "Их команда говорит на языке исполнения: меньше слайдов, больше playbook’ов и телеметрия, которая действительно меняет наши недельные приоритеты.",
      name: "Sarah Chen",
      role: "CMO",
      company: "DeFi protocol",
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
    headline: "ماذا يقول الشركاء عن العمل مع سيغما",
  },
  metrics: [
    {
      id: "volume",
      value: "$12B+",
      label: "حجم التداول الاسمي",
      note: "تراكمي عبر المنصات المدعومة",
    },
    {
      id: "users",
      value: "2.4M",
      label: "مستخدمون تم تنشيطهم",
      note: "مجموعات موثّقة عبر المحفظة",
    },
    {
      id: "reach",
      value: "190+",
      label: "نطاق الشبكة",
      note: "أسطح الشركاء والمجتمع",
    },
    {
      id: "partners",
      value: "85",
      label: "شركاء استراتيجيون",
      note: "علاقات توزيع نشطة",
    },
    {
      id: "markets",
      value: "40",
      label: "أسواق مغطاة",
      note: "مناطق بتنفيذ مباشر",
    },
  ],
  testimonials: [
    {
      id: "t1",
      quote:
        "سيغما لا تطلق حملات صورية. تربط الاكتساب بنقاط تحقق السيولة وتحافظ على انضباط التقارير حتى يمكن لمكتب التداول التصرّف.",
      name: "Elena Marchetti",
      role: "رئيسة النمو",
      company: "Global CEX desk",
    },
    {
      id: "t2",
      quote:
        "أخيراً صار لدينا إيقاع تشغيل واحد بين المؤثرين ومراحل المنتج وأحداث السوق. انخفاض تكلفة التنسيق وحده كان ملموساً.",
      name: "James Okonkwo",
      role: "نائب رئيس المنظومة",
      company: "Layer-1 foundation",
    },
    {
      id: "t3",
      quote:
        "فريقهم يتحدث بلغة التنفيذ: عروض أقل، أساليب تشغيل أكثر، وبيانات تشغيل تغيّر أسبوعياتنا فعلياً.",
      name: "Sarah Chen",
      role: "مديرة التسويق",
      company: "DeFi protocol",
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
