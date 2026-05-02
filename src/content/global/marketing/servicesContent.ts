import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type MarketingServiceSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export type ServicesMarketingBody = {
  kicker: string;
  headline: string;
  intro: string;
  sections: MarketingServiceSection[];
};

export const servicesPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "Services",
    description:
      "Explore Sigma’s core capabilities: liquidity programs, risk & compliance layers, technical integration, and Web3-native growth execution.",
  },
  TR: {
    title: "Hizmetler",
    description:
      "Likidite programları, risk ve uyum katmanları, teknik entegrasyon ve Web3 odaklı büyütme yürütmesini keşfedin.",
  },
  FA: {
    title: "خدمات",
    description:
      "قابلیت‌های اصلی سیگما: برنامه‌های نقدینگی، لایه‌های ریسک و انطباق، یکپارچه‌سازی فنی و اجرای رشد بومی وب۳.",
  },
  ZH: {
    title: "服务",
    description: "了解 Sigma 的核心能力：流动性计划、风险与合规、技术集成，以及 Web3 原生增长落地。",
  },
  ES: {
    title: "Servicios",
    description:
      "Explore capacidades centrales de Sigma: liquidez, riesgo y cumplimiento, integración técnica y ejecución de crecimiento Web3.",
  },
  RU: {
    title: "Услуги",
    description:
      "Возможности Sigma: ликвидность, риск и комплаенс, техническая интеграция и рост в экосистеме Web3.",
  },
};

const sectionsEN: MarketingServiceSection[] = [
  {
    id: "liquidity",
    eyebrow: "Markets",
    title: "Liquidity & market structure",
    description:
      "Design and operate liquidity programs that stay resilient across regimes—from launch-day bootstrapping to mature two-sided markets.",
    bullets: [
      "Inventory and incentive design aligned with real trading depth targets",
      "Partner coordination across makers, venues, and internal desks",
      "Playbooks for stress scenarios, listings, and coordinated campaigns",
    ],
  },
  {
    id: "risk",
    eyebrow: "Trust",
    title: "Risk, compliance, and monitoring",
    description:
      "Operational rigor that satisfies stakeholders without slowing product velocity.",
    bullets: [
      "Control frameworks mapped to your jurisdiction and counterparty mix",
      "Real-time monitoring hooks and escalation paths your team can own",
      "Documentation packages suitable for partners and institutional reviewers",
    ],
  },
  {
    id: "integration",
    eyebrow: "Engineering",
    title: "Technical integration & APIs",
    description:
      "Ship connectors, data pipelines, and reliability improvements alongside go-to-market motions.",
    bullets: [
      "API-first integration patterns with clear SLIs/SLOs where it matters",
      "Collaboration with your engineering team through staging and production cutovers",
      "Runbooks and observability so incidents are rare—and recoverable",
    ],
  },
  {
    id: "growth",
    eyebrow: "Distribution",
    title: "Web3-native growth & partnerships",
    description:
      "Distribution that respects community norms while hitting concrete acquisition and retention goals.",
    bullets: [
      "Campaign architecture spanning creators, communities, and institutional channels",
      "Creative and messaging systems that stay on-brand across locales",
      "Attribution and funnel instrumentation tied to your north-star metrics",
    ],
  },
];

export const servicesPageContentByLang: Record<LangCode, ServicesMarketingBody> = {
  EN: {
    kicker: "Capabilities",
    headline: "Everything you need to scale with confidence",
    intro:
      "Each engagement combines strategy, execution, and instrumentation. Below is how we typically structure work—your roadmap is tailored during onboarding.",
    sections: sectionsEN,
  },
  TR: {
    kicker: "Yetenekler",
    headline: "Güvenle ölçeklemek için gereken her şey",
    intro:
      "Her çalışma strateji, yürütme ve ölçüm içerir. Aşağıda tipik yapımız—yol haritanız başlangıçta birlikte netleşir.",
    sections: [
      {
        id: "liquidity",
        eyebrow: "Piyasalar",
        title: "Likidite ve piyasa yapısı",
        description:
          "İlk günden olgun iki taraflı piyasalara kadar rejimler arasında dayanıklı likidite programları tasarlar ve işletiriz.",
        bullets: [
          "Gerçek derinlik hedefleriyle uyumlu envanter ve teşvik tasarımı",
          "Maker, mecra ve dahili masa koordinasyonu",
          "Stres, listeleme ve kampanya senaryoları için playbook’lar",
        ],
      },
      {
        id: "risk",
        eyebrow: "Güven",
        title: "Risk, uyumluluk ve izleme",
        description:
          "Ürün hızını düşürmeden paydaş beklentilerini karşılayan operasyonel disiplin.",
        bullets: [
          "Yargı ve karşı taraf karışımınıza göre kontrol çerçeveleri",
          "Ekibinizin sahiplenebileceği gerçek zamanlı izleme ve eskalasyon",
          "Ortaklar ve kurumsal incelemeler için dokümantasyon paketleri",
        ],
      },
      {
        id: "integration",
        eyebrow: "Mühendislik",
        title: "Teknik entegrasyon ve API’ler",
        description:
          "Go-to-market hareketleriyle birlikte bağlayıcılar, veri hatları ve güvenilirlik iyileştirmeleri teslim edilir.",
        bullets: [
          "Önemli yerlerde net SLI/SLO ile API öncelikli entegrasyon",
          "Staging ve prod geçişlerinde mühendislik işbirliği",
          "Olayların seyrek ve telafi edilebilir olduğu runbook ve gözlemlenebilirlik",
        ],
      },
      {
        id: "growth",
        eyebrow: "Dağıtım",
        title: "Web3 odaklı büyüme ve ortaklıklar",
        description:
          "Topluluk normlarına saygılıyken somut edinim ve tutma hedeflerine odaklanan dağıtım.",
        bullets: [
          "İçerik üreticileri, topluluklar ve kurumsal kanalları kapsayan kampanya mimarisi",
          "Yerelleştirmede markada kalan mesaj sistemleri",
          "Kuzey yıldızı metriklerinize bağlı huni ölçümü",
        ],
      },
    ],
  },
  FA: {
    kicker: "قابلیت‌ها",
    headline: "آنچه برای مقیاس با اطمینان نیاز دارید",
    intro:
      "هر همکاری ترکیبی از استراتژی، اجرا و ابزارسازی است. زیر ساختار معمول کار است—نقشه راه در شروع هم‌راستا می‌شود.",
    sections: [
      {
        id: "liquidity",
        eyebrow: "بازارها",
        title: "نقدینگی و ساختار بازار",
        description:
          "طراحی و بهره‌برداری از برنامه‌های نقدینگی که از روز اول تا بازار دوطرفه پایدار بمانند.",
        bullets: [
          "طراحی موجودی و مشوق‌ها همسو با عمق معاملات واقعی",
          "هماهنگی میان مارکت‌میکرها، عرصه‌ها و میزهای داخلی",
          "پلی‌بوک برای سناریوهای استرس، لیستینگ و کمپین‌های هماهنگ",
        ],
      },
      {
        id: "risk",
        eyebrow: "اعتماد",
        title: "ریسک، انطباق و پایش",
        description:
          "انضباط عملیاتی که ذینفعان را راضی کند بدون کند کردن محصول.",
        bullets: [
          "چارچوب کنترل متناسب با حوزه قضایی و ترکیب طرف مقابل",
          "قلاب‌های پایش بلادرنگ و مسیرهای تشدید قابل مالکیت توسط شما",
          "بسته‌های مستندسازی برای طرف‌ها و بازبینان نهادی",
        ],
      },
      {
        id: "integration",
        eyebrow: "مهندسی",
        title: "یکپارچه‌سازی فنی و API",
        description:
          "اتصال‌ها، خطوط داده و بهبود قابلیت اطمینان در کنار حرکت بازار.",
        bullets: [
          "الگوهای API‌محور با SLI/SLO شفاف جایی که اهمیت دارد",
          "همکاری با تیم مهندسی در استیجینگ و برش به تولید",
          "راهنمای عملیات و مشاهده‌پذیری برای حوادث نادر و قابل بازیابی",
        ],
      },
      {
        id: "growth",
        eyebrow: "توزیع",
        title: "رشد بومی وب۳ و مشارکت‌ها",
        description:
          "توزیعی که به هنجارهای جامعه احترام گذارد و به اهداف جذب و نگهداشت برسد.",
        bullets: [
          "معماری کمپین برای خالقان، جوامع و کانال‌های نهادی",
          "سیستم پیام و خلاقیت هم‌برند در هر منطقه",
          "سنجش قیف و انتساب به متریک‌های محوری شما",
        ],
      },
    ],
  },
  ZH: {
    kicker: "能力",
    headline: "自信扩展所需的一切",
    intro:
      "每次合作都融合策略、执行与度量。以下是我们的典型结构——具体路线在接入期共同定制。",
    sections: [
      {
        id: "liquidity",
        eyebrow: "市场",
        title: "流动性与市场结构",
        description: "设计并运营跨周期稳健的流动性计划——从启动期引导到成熟双边市场。",
        bullets: ["与真实深度目标一致的库存与激励设计", "覆盖做市商、场所与内部桌的协同", "压力、上架与联合战役的场景手册"],
      },
      {
        id: "risk",
        eyebrow: "信任",
        title: "风险、合规与监控",
        description: "在不拖慢产品节奏的前提下满足利益相关方期望的运营纪律。",
        bullets: ["按司法辖区与对手方结构映射的控制框架", "团队可掌握的实时监控与升级路径", "适合合作方与机构审阅的文档包"],
      },
      {
        id: "integration",
        eyebrow: "工程",
        title: "技术集成与 API",
        description: "与市场动作并行交付连接器、数据管线与可靠性改进。",
        bullets: ["在关键处设定清晰 SLI/SLO 的 API 优先集成模式", "贯穿预发与生产的工程协作", "降低事故概率并支持恢复的运维手册与可观测性"],
      },
      {
        id: "growth",
        eyebrow: "分发",
        title: "Web3 原生增长与合作",
        description: "尊重社区规范同时达成可量化获客与留存的分发体系。",
        bullets: ["覆盖创作者、社群与机构渠道的战役架构", "跨地域保持一致品牌的创意与信息系统", "与北极星指标对齐的归因与漏斗度量"],
      },
    ],
  },
  ES: {
    kicker: "Capacidades",
    headline: "Todo lo necesario para escalar con confianza",
    intro:
      "Cada proyecto combina estrategia, ejecución e instrumentación. Así estructuramos el trabajo—tu hoja de ruta se adapta en onboarding.",
    sections: [
      {
        id: "liquidity",
        eyebrow: "Mercados",
        title: "Liquidez y estructura de mercado",
        description:
          "Diseño y operación de programas de liquidez resilientes desde el lanzamiento hasta mercados bilaterales maduros.",
        bullets: [
          "Diseño de inventario e incentivos alineados a profundidad real",
          "Coordinación entre makers, venues y mesas internas",
          "Playbooks para estrés, listings y campañas coordinadas",
        ],
      },
      {
        id: "risk",
        eyebrow: "Confianza",
        title: "Riesgo, cumplimiento y monitorización",
        description: "Rigor operativo sin frenar la velocidad del producto.",
        bullets: [
          "Marcos de control según jurisdicción y contrapartes",
          "Monitorización en tiempo real y rutas de escalado propiedad del equipo",
          "Paquetes de documentación para socios e instituciones",
        ],
      },
      {
        id: "integration",
        eyebrow: "Ingeniería",
        title: "Integración técnica y APIs",
        description:
          "Conectores, datos y fiabilidad junto al go-to-market.",
        bullets: [
          "Patrones API-first con SLI/SLO donde importa",
          "Colaboración en staging y cortes a producción",
          "Runbooks y observabilidad para incidentes raros y recuperables",
        ],
      },
      {
        id: "growth",
        eyebrow: "Distribución",
        title: "Crecimiento Web3 y partnerships",
        description:
          "Distribución que respeta la comunidad y cumple métricas de adquisición y retención.",
        bullets: [
          "Arquitectura de campañas: creadores, comunidades e instituciones",
          "Sistemas creativos y de mensaje coherentes por mercado",
          "Atribución e instrumentación del embudo alineadas a tus métricas norte",
        ],
      },
    ],
  },
  RU: {
    kicker: "Возможности",
    headline: "Всё для уверенного масштабирования",
    intro:
      "Каждый проект сочетает стратегию, исполнение и инструментирование. Ниже типовая структура — дорожная карта уточняется при онбординге.",
    sections: [
      {
        id: "liquidity",
        eyebrow: "Рынки",
        title: "Ликвидность и структура рынка",
        description:
          "Проектирование и запуск программ ликвидности, устойчивых в разных режимах — от старта до зрелых двусторонних рынков.",
        bullets: [
          "Инвентарь и стимулы под реальные цели по глубине",
          "Координация мейкеров, площадок и внутренних столов",
          "Плейбуки для стресса, листингов и согласованных кампаний",
        ],
      },
      {
        id: "risk",
        eyebrow: "Доверие",
        title: "Риск, комплаенс и мониторинг",
        description: "Операционная дисциплина без замедления продукта.",
        bullets: [
          "Контрольные контуры под вашу юрисдикцию и контрагентов",
          "Мониторинг в реальном времени и эскалации под вашу команду",
          "Документация для партнёров и институциональных проверок",
        ],
      },
      {
        id: "integration",
        eyebrow: "Инженерия",
        title: "Техническая интеграция и API",
        description:
          "Коннекторы, данные и надёжность параллельно go-to-market.",
        bullets: [
          "API-first интеграции с SLI/SLO там, где критично",
          "Совместная работа со staging и продакшн-катами",
          "Runbooks и наблюдаемость — редкие и восстановимые инциденты",
        ],
      },
      {
        id: "growth",
        eyebrow: "Дистрибуция",
        title: "Рост и партнёрства в Web3",
        description:
          "Дистрибуция с уважением к сообществу и измеримыми целями по привлечению и удержанию.",
        bullets: [
          "Архитектура кампаний: криейторы, сообщества, институциональные каналы",
          "Креатив и сообщения в едином бренде по локалям",
          "Атрибуция и воронка, привязанные к вашим north-star метрикам",
        ],
      },
    ],
  },
};
