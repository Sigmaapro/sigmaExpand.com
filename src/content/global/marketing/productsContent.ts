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
  TR: {
    ...EN_CONTENT,
    kicker: "Sigma Yardımcı Ürünleri",
    title: "Sigma Yardımcı Ürünleri — Araçlar, Botlar, Paneller ve Analitik",
    intro:
      "Sigma, ağ için analitik paneller, affiliate servisleri, topluluk araçları, içerik sistemleri ve büyüme botları geliştirir.",
    positioning:
      "Bunlar genel SaaS ürünleri değildir. Sigma ağı içinde kampanyaları, affiliate süreçlerini ve raporlamayı güçlendiren operasyonel araçlardır.",
    primaryCtaLabel: "Sigma Araçlarını Keşfet",
    secondaryCtaLabel: "Sigma ile Ortak Olun",
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "Sigma 辅助产品",
    title: "Sigma 辅助产品 — 工具、机器人、看板与分析",
    intro:
      "Sigma 为网络构建并运营辅助产品：分析看板、联盟系统、社群工具、内容系统与增长机器人。",
    positioning:
      "这些并非通用 SaaS，而是 Sigma 网络内部用于提升战役、联盟与运营效率的支持型产品。",
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
    primaryCtaLabel: "استكشف أدوات Sigma",
    secondaryCtaLabel: "شارك مع Sigma",
  },
};
