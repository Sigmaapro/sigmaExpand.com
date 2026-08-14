import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type ProductsContent = {
  kicker: string;
  title: string;
  intro: string;
  positioning: string;
  sections: { title: string; body: string }[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const EN_CONTENT: ProductsContent = {
  kicker: "Sigma Helper Products",
  title: "Sigma Helper Products — Tools, Bots, Dashboards & Analytics",
  intro:
    "Sigma builds and operates supporting products for the network — analytics dashboards, affiliate services, community tools, content systems, and growth bots that compound campaign performance.",
  positioning:
    "These are not generic SaaS products. They are supporting products and tools inside the Sigma network, designed to make campaigns, affiliates, KOL operations, and reporting more effective.",
  sections: [
    {
      title: "Analytics Dashboards",
      body: "Execution-grade dashboards for acquisition, volume, retention, and partner performance across markets.",
    },
    {
      title: "Affiliate and IB Systems",
      body: "Partner onboarding flows, commission structures, and reporting layers for crypto and forex growth programs.",
    },
    {
      title: "Telegram Bots and Community Tools",
      body: "Community-first automation for routing, activation, and moderation in high-frequency operator environments.",
    },
    {
      title: "Creator Monetization Stacks",
      body: "KOL affiliate system tooling that connects creator distribution to measurable revenue loops.",
    },
    {
      title: "Content Systems",
      body: "Operational content pipelines that support regional localization, launch cadence, and partner enablement.",
    },
    {
      title: "Growth Bots and Reporting Layers",
      body: "Automation and telemetry loops that reduce friction between campaign execution and executive decision-making.",
    },
  ],
  primaryCtaLabel: "Explore Sigma Tools",
  primaryCtaHref: ROUTES.products,
  secondaryCtaLabel: "Partner with Sigma",
  secondaryCtaHref: ROUTES.contact,
};

export const productsContentByLang: Record<LangCode, ProductsContent> = {
  EN: EN_CONTENT,
  ZH: {
    ...EN_CONTENT,
    kicker: "Sigma 辅助产品",
    title: "Sigma 辅助产品 — 工具、机器人、看板与分析",
    intro:
      "Sigma 为网络构建并运营辅助产品：分析看板、联盟系统、社群工具、内容系统与增长机器人。",
    positioning:
      "这些并非通用 SaaS，而是 Sigma 网络内部用于提升战役、联盟与运营效率的支持型产品。",
    sections: [
      { title: "分析看板", body: "面向执行的看板，用于跟踪各市场的获客、交易量、留存和合作伙伴表现。" },
      { title: "联盟与 IB 系统", body: "为加密和外汇增长项目提供合作伙伴入驻、佣金结构和报告层。" },
      { title: "Telegram 机器人与社群工具", body: "面向社群的自动化工具，用于高频运营环境中的路由、激活和管理。" },
      { title: "创作者变现系统", body: "将创作者分发能力连接到可衡量收入循环的 KOL 联盟工具。" },
      { title: "内容系统", body: "支持区域本地化、发布节奏和合作伙伴赋能的运营内容流程。" },
      { title: "增长机器人与报告层", body: "减少战役执行与管理层决策之间摩擦的自动化和数据闭环。" },
    ],
    primaryCtaLabel: "探索 Sigma 工具",
    secondaryCtaLabel: "与 Sigma 合作",
  },
  FA: {
    ...EN_CONTENT,
    kicker: "محصولات کمکی Sigma",
    title: "محصولات کمکی Sigma — ابزارها، بات‌ها، داشبوردها و تحلیل",
    intro:
      "Sigma برای شبکه خود محصولات پشتیبان شامل داشبوردهای تحلیلی، سرویس‌های افیلیت، ابزارهای کامیونیتی و بات‌های رشد می‌سازد.",
    positioning:
      "این‌ها SaaS عمومی نیستند؛ ابزارهای عملیاتی داخل شبکه Sigma هستند که کمپین، افیلیت و گزارش‌گیری را مؤثرتر می‌کنند.",
    sections: [
      { title: "داشبوردهای تحلیلی", body: "داشبوردهای اجرایی برای جذب، حجم، نگهداشت و عملکرد شرکا در بازارهای مختلف." },
      { title: "سیستم‌های افیلیت و IB", body: "فرآیندهای ورود شریک، ساختار کمیسیون و لایه‌های گزارش‌گیری برای برنامه‌های رشد کریپتو و فارکس." },
      { title: "بات‌های تلگرام و ابزارهای کامیونیتی", body: "اتوماسیون کامیونیتی برای مسیریابی، فعال‌سازی و مدیریت در محیط‌های عملیاتی پرتکرار." },
      { title: "زیرساخت درآمدزایی کریتورها", body: "ابزارهای افیلیت KOL که توزیع کریتور را به چرخه‌های درآمدی قابل‌اندازه‌گیری متصل می‌کنند." },
      { title: "سیستم‌های محتوا", body: "خطوط عملیاتی تولید محتوا برای بومی‌سازی منطقه‌ای، تقویم لانچ و توانمندسازی شرکا." },
      { title: "بات‌های رشد و لایه‌های گزارش‌گیری", body: "حلقه‌های اتوماسیون و داده که فاصله بین اجرای کمپین و تصمیم‌گیری مدیریتی را کم می‌کنند." },
    ],
    primaryCtaLabel: "کاوش ابزارهای Sigma",
    secondaryCtaLabel: "همکاری با Sigma",
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Productos Auxiliares de Sigma",
    title: "Productos Auxiliares de Sigma — Herramientas, Bots, Dashboards y Analítica",
    intro:
      "Sigma construye y opera productos de apoyo para la red: dashboards, sistemas de afiliados, herramientas de comunidad y bots de crecimiento.",
    positioning:
      "No son SaaS genéricos. Son productos operativos dentro de la red Sigma para mejorar campañas, afiliados y reporting.",
    sections: [
      { title: "Dashboards de analítica", body: "Dashboards orientados a la ejecución para adquisición, volumen, retención y rendimiento de partners por mercado." },
      { title: "Sistemas de afiliados e IB", body: "Flujos de alta de partners, estructuras de comisión y capas de reporting para programas de crecimiento crypto y forex." },
      { title: "Bots de Telegram y herramientas de comunidad", body: "Automatización centrada en la comunidad para routing, activación y moderación en entornos operativos de alta frecuencia." },
      { title: "Sistemas de monetización para creadores", body: "Herramientas de afiliación KOL que conectan la distribución de creadores con ciclos de ingresos medibles." },
      { title: "Sistemas de contenido", body: "Pipelines operativos de contenido para localización regional, ritmo de lanzamientos y habilitación de partners." },
      { title: "Bots de crecimiento y capas de reporting", body: "Bucles de automatización y telemetría que reducen la fricción entre la ejecución de campañas y las decisiones ejecutivas." },
    ],
    primaryCtaLabel: "Explorar herramientas de Sigma",
    secondaryCtaLabel: "Asociarse con Sigma",
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Вспомогательные продукты Sigma",
    title: "Вспомогательные продукты Sigma — инструменты, боты, дашборды и аналитика",
    intro:
      "Sigma разрабатывает и использует поддерживающие продукты: аналитические дашборды, affiliate-системы, community-инструменты и growth-боты.",
    positioning:
      "Это не универсальные SaaS-продукты, а прикладные инструменты внутри сети Sigma для усиления кампаний, affiliate-операций и отчётности.",
    sections: [
      { title: "Аналитические дашборды", body: "Дашборды для исполнения задач по привлечению, объёму, удержанию и эффективности партнёров на разных рынках." },
      { title: "Affiliate- и IB-системы", body: "Онбординг партнёров, комиссионные структуры и отчётность для крипто- и forex-программ роста." },
      { title: "Telegram-боты и community-инструменты", body: "Автоматизация для маршрутизации, активации и модерации сообществ в средах с высокой операционной нагрузкой." },
      { title: "Системы монетизации создателей", body: "Инструменты KOL-аффилиатных программ, связывающие дистрибуцию создателей с измеримыми доходными циклами." },
      { title: "Контент-системы", body: "Операционные контент-процессы для региональной локализации, ритма запусков и поддержки партнёров." },
      { title: "Growth-боты и отчётные слои", body: "Автоматизация и телеметрия, сокращающие разрыв между исполнением кампании и управленческими решениями." },
    ],
    primaryCtaLabel: "Изучить инструменты Sigma",
    secondaryCtaLabel: "Стать партнёром Sigma",
  },
  AR: {
    ...EN_CONTENT,
    kicker: "منتجات Sigma المساندة",
    title: "منتجات Sigma المساندة — أدوات، بوتات، لوحات وتحليلات",
    intro:
      "تطوّر Sigma منتجات داعمة للشبكة: لوحات تحليلية، أنظمة affiliate، أدوات مجتمعية وبوتات نمو.",
    positioning:
      "هذه ليست منتجات SaaS عامة، بل أدوات تشغيلية داخل شبكة Sigma لتحسين الحملات، الشراكات التابعة والتقارير.",
    sections: [
      { title: "لوحات التحليلات", body: "لوحات تنفيذية لاكتساب المستخدمين والحجم والاحتفاظ وأداء الشركاء عبر الأسواق." },
      { title: "أنظمة الشراكة التابعة وIB", body: "تدفقات انضمام الشركاء وهياكل العمولات وطبقات التقارير لبرامج نمو العملات الرقمية والفوركس." },
      { title: "بوتات Telegram وأدوات المجتمع", body: "أتمتة تركز على المجتمع للتوجيه والتفعيل والإشراف في بيئات التشغيل عالية التردد." },
      { title: "أنظمة تحقيق الدخل للمبدعين", body: "أدوات لنظام KOL التابع تربط توزيع المبدعين بدورات إيرادات قابلة للقياس." },
      { title: "أنظمة المحتوى", body: "مسارات محتوى تشغيلية تدعم التوطين الإقليمي وإيقاع الإطلاق وتمكين الشركاء." },
      { title: "بوتات النمو وطبقات التقارير", body: "حلقات أتمتة وقياس تقلل الاحتكاك بين تنفيذ الحملات واتخاذ القرار التنفيذي." },
    ],
    primaryCtaLabel: "استكشف أدوات Sigma",
    secondaryCtaLabel: "شارك مع Sigma",
  },
};
