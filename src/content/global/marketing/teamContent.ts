import type { LangCode } from "@/content/types";
import type { PageMeta } from "@/content/pages/meta";

export type TeamMember = { name: string; role: string; bio: string };

export type TeamMarketingBody = {
  kicker: string;
  headline: string;
  intro: string;
  members: TeamMember[];
};

export const teamPageMetaByLang: Record<LangCode, PageMeta> = {
  EN: {
    title: "Team",
    description:
      "Meet the operators and specialists behind Sigma’s Web3 growth and infrastructure programs.",
  },
  TR: {
    title: "Ekip",
    description:
      "Sigma’nın Web3 büyüme ve altyapı programlarındaki operatörler ve uzmanlarla tanışın.",
  },
  FA: {
    title: "تیم",
    description:
      "با اپراتورها و متخصصان پشت برنامه‌های رشد و زیرساخت وب۳ سیگما آشنا شوید.",
  },
  ZH: {
    title: "团队",
    description: "认识 Sigma Web3 增长与基础设施项目背后的操盘手与专家。",
  },
  ES: {
    title: "Equipo",
    description:
      "Conoce a operadores y especialistas detrás de los programas de crecimiento e infraestructura Web3 de Sigma.",
  },
  RU: {
    title: "Команда",
    description:
      "Операторы и специалисты программ роста и инфраструктуры Web3 в Sigma.",
  },
  AR: {
    title: "الفريق",
    description:
      "تعرّف على المشغّلين والمتخصصين وراء برامج النمو والبنية التحتية لـ Web3 في سيغما.",
  },
};

const membersEN: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Head of Markets",
    bio: "Former desk lead focused on liquidity design and exchange partnerships across APAC and MENA.",
  },
  {
    name: "Jordan Kim",
    role: "Engineering Lead",
    bio: "Ships integrations and reliability improvements with teams transitioning from MVP to production scale.",
  },
  {
    name: "Sam Okonkwo",
    role: "Growth & Partnerships",
    bio: "Architects distribution programs spanning institutions, communities, and creator networks.",
  },
  {
    name: "Morgan Lee",
    role: "Strategy & Operations",
    bio: "Aligns roadmaps with measurable milestones and reporting stakeholders actually read.",
  },
];

export const teamPageContentByLang: Record<LangCode, TeamMarketingBody> = {
  EN: {
    kicker: "People",
    headline: "Built by operators",
    intro:
      "Sigma blends markets, engineering, and creative execution. Representatives below illustrate the roles we staff on client programs—exact roster varies by engagement.",
    members: membersEN,
  },
  TR: {
    kicker: "İnsanlar",
    headline: "Operatörlerle inşa edildi",
    intro:
      "Sigma piyasaları, mühendisliği ve yaratıcı yürütmeyi birleştirir. Aşağıdaki roller müşteri programlarında görev alan profilleri gösterir—kadro projeye göre değişir.",
    members: [
      {
        name: "Alex Rivera",
        role: "Piyasalar Başkanı",
        bio: "APAC ve MENA genelinde likidite tasarımı ve borsa ortaklıklarına odaklanmış eski masa lideri.",
      },
      {
        name: "Jordan Kim",
        role: "Mühendislik Lideri",
        bio: "MVP’den üretim ölçeğine geçen ekiplerle entegrasyon ve güvenilirlik iyileştirmeleri teslim eder.",
      },
      {
        name: "Sam Okonkwo",
        role: "Büyüme ve Ortaklıklar",
        bio: "Kurumlar, topluluklar ve içerik üretici ağlarını kapsayan dağıtım programları tasarlar.",
      },
      {
        name: "Morgan Lee",
        role: "Strateji ve Operasyon",
        bio: "Yol haritalarını ölçülebilir kilometre taşları ve okunan raporlama ile hizalar.",
      },
    ],
  },
  FA: {
    kicker: "افراد",
    headline: "ساخته‌شده توسط اپراتورها",
    intro:
      "سیگما بازار، مهندسی و اجرای خلاق را ترکیب می‌کند. نقش‌های زیر نمونه‌ای از جایگاه‌هایی است که در برنامه‌های مشتری پر می‌شود—ترکیب دقیق بسته به پروژه است.",
    members: [
      {
        name: "Alex Rivera",
        role: "رئیس بازارها",
        bio: "رهبر سابق میز با تمرکز بر طراحی نقدینگی و مشارکت صرافی‌ها در APAC و MENA.",
      },
      {
        name: "Jordan Kim",
        role: "رهبری مهندسی",
        bio: "یکپارچه‌سازی و بهبود قابلیت اطمینان را برای تیم‌هایی که از MVP به مقیاس تولید می‌روند تحویل می‌دهد.",
      },
      {
        name: "Sam Okonkwo",
        role: "رشد و مشارکت‌ها",
        bio: "برنامه‌های توزیع را برای نهادها، جوامع و شبکه خالقان طراحی می‌کند.",
      },
      {
        name: "Morgan Lee",
        role: "استراتژی و عملیات",
        bio: "نقشه راه را با نقاط عطف قابل اندازه‌گیری و گزارش‌های قابل استفاده هم‌راستا می‌کند.",
      },
    ],
  },
  ZH: {
    kicker: "团队",
    headline: "操盘手打造",
    intro:
      "Sigma 融合市场、工程与创意落地。以下角色展示我们在客户项目中配置的典型职能——具体名单随项目而定。",
    members: [
      {
        name: "Alex Rivera",
        role: "市场负责人",
        bio: "曾任交易台负责人，专注亚太与中东北非的流动性设计与交易所合作。",
      },
      {
        name: "Jordan Kim",
        role: "工程负责人",
        bio: "与从 MVP 迈向生产规模的团队一起交付集成与可靠性改进。",
      },
      {
        name: "Sam Okonkwo",
        role: "增长与合作",
        bio: "设计覆盖机构、社群与创作者网络的分发方案。",
      },
      {
        name: "Morgan Lee",
        role: "战略与运营",
        bio: "让路线图与可衡量里程碑及利益相关方真正会读的报告对齐。",
      },
    ],
  },
  ES: {
    kicker: "Personas",
    headline: "Construido por operadores",
    intro:
      "Sigma combina mercados, ingeniería y ejecución creativa. Los roles ilustran perfiles habituales—la plantilla exacta varía por proyecto.",
    members: [
      {
        name: "Alex Rivera",
        role: "Responsable de mercados",
        bio: "Ex líder de mesa enfocado en liquidez y alianzas con exchanges en APAC y MENA.",
      },
      {
        name: "Jordan Kim",
        role: "Liderazgo de ingeniería",
        bio: "Entrega integraciones y fiabilidad para equipos que pasan de MVP a escala productiva.",
      },
      {
        name: "Sam Okonkwo",
        role: "Crecimiento y partnerships",
        bio: "Diseña distribución entre instituciones, comunidades y redes de creadores.",
      },
      {
        name: "Morgan Lee",
        role: "Estrategia y operaciones",
        bio: "Alinea roadmaps con hitos medibles e informes que los stakeholders realmente leen.",
      },
    ],
  },
  RU: {
    kicker: "Люди",
    headline: "Создано операторами",
    intro:
      "Sigma сочетает рынки, инженерию и креативное исполнение. Ниже типовые роли — фактический состав зависит от проекта.",
    members: [
      {
        name: "Alex Rivera",
        role: "Руководитель рынков",
        bio: "Бывший лидер стола: ликвидность и партнёрства с биржами в APAC и MENA.",
      },
      {
        name: "Jordan Kim",
        role: "Инженерный лид",
        bio: "Поставляет интеграции и надёжность командам на пути от MVP к продакшен-масштабу.",
      },
      {
        name: "Sam Okonkwo",
        role: "Рост и партнёрства",
        bio: "Проектирует программы дистрибуции для институтов, сообществ и сетей криейторов.",
      },
      {
        name: "Morgan Lee",
        role: "Стратегия и операции",
        bio: "Сводит дорожные карты с измеримыми вехами и отчётностью, которую реально читают.",
      },
    ],
  },
  AR: {
    kicker: "الأشخاص",
    headline: "يُبنى على يد مشغّلين",
    intro:
      "تمزج سيغما الأسواق والهندسة والتنفيذ الإبداعي. الأدوار أدناه تمثل ملفات نعمل عليها في برامج العملاء — يختلف التشكيل حسب المشروع.",
    members: [
      {
        name: "Alex Rivera",
        role: "رئيس الأسواق",
        bio: "قائد سابق لمكتب يركز على تصميم السيولة وشراكات المنصات في آسيا والمحيط الهادئ والشرق الأوسط وشمال أفريقيا.",
      },
      {
        name: "Jordan Kim",
        role: "قائد الهندسة",
        bio: "يسلم التكاملات وتحسينات الموثوقية لفرق تنتقل من النموذج الأولي إلى الإنتاج.",
      },
      {
        name: "Sam Okonkwo",
        role: "النمو والشراكات",
        bio: "يصمم برامج توزيع تمتد بين المؤسسات والمجتمعات وشبكات صنّاع المحتوى.",
      },
      {
        name: "Morgan Lee",
        role: "الاستراتيجية والعمليات",
        bio: "يوائم الخرائط مع معالم قابلة للقياس وتقارير يقرؤها أصحاب المصلحة فعلياً.",
      },
    ],
  },
};
