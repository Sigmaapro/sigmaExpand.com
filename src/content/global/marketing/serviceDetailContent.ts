import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type ServiceDetailKey =
  | "platformGrowth"
  | "kolInfrastructure"
  | "ibProgram"
  | "traderNetwork"
  | "tokenLaunch";

export type ServiceDetailContent = {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  support: string;
  highlights: string[];
  complianceNote?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

const EN_CONTENT: Record<ServiceDetailKey, ServiceDetailContent> = {
  platformGrowth: {
    eyebrow: "Service",
    title: "Exchange, Broker & Platform Growth",
    intro:
      "End-to-end growth for crypto exchanges, forex brokers, DEXs, prop firms, and fintech platforms.",
    body:
      "Sigma supports paid and organic user acquisition, KOL marketing, IB networks, community building, regional localization, VIP onboarding, and trading volume campaigns.",
    support:
      "Scale users, trading volume, and regional market share. KOL activation, IB networks, localized funnels, market-maker introductions, listing coordination, VIP onboarding, and product-feedback loops — engineered for CEX, DEX, forex brokers, prop firms, wallets, DeFi protocols, and fintech tools.",
    highlights: [
      "Crypto exchange marketing agency programs with operator-led execution",
      "Forex broker marketing systems connected to IB and KOL channels",
      "Crypto user acquisition frameworks tied to liquidity activation",
      "Regional localization and launch support across priority markets",
    ],
    primaryCtaLabel: "Scale Your Platform",
    primaryCtaHref: ROUTES.servicesPlatformGrowth,
    secondaryCtaLabel: "Request a Growth Diagnostic",
    secondaryCtaHref: ROUTES.contact,
  },
  kolInfrastructure: {
    eyebrow: "Service",
    title: "KOL Marketing & Creator Infrastructure",
    intro:
      "Sigma operates a selective network of crypto, forex, stock, and Web3 creators.",
    body:
      "Beyond placements, Sigma builds infrastructure for KOLs themselves — affiliate bots, websites, SEO for KOLs, premium platform deals, signal provider and data-tool partnerships, events, and full monetization stacks.",
    support:
      "Build your financial creator infrastructure. Affiliate stacks, Telegram bots, websites, SEO for KOLs, premium platform deals across crypto exchanges, forex brokers, prop firms, and data tools, plus signal provider, TradingView, Glassnode, and Santiment partnerships.",
    highlights: [
      "Crypto KOL agency execution with measurable regional distribution",
      "Creator infrastructure including bots, dashboards, and affiliate systems",
      "KOL affiliate system design tied to platform revenue objectives",
      "SEO for KOLs and content systems that compound over time",
    ],
    primaryCtaLabel: "Build Your Financial Creator Infrastructure",
    primaryCtaHref: ROUTES.servicesKolInfrastructure,
    secondaryCtaLabel: "Partner with Sigma",
    secondaryCtaHref: ROUTES.contact,
  },
  ibProgram: {
    eyebrow: "Service",
    title: "IB & Affiliate Program Design",
    intro:
      "Structured IB programs for crypto exchanges and forex brokers — custom commission architecture, partner onboarding, conversion playbooks, content and SEO, retention systems, and regional BD expansion.",
    body:
      "Sigma connects strategy and operations so IB and affiliate programs are built as growth infrastructure, not as isolated referral campaigns.",
    support:
      "Move from scattered referrals to a structured BD operation. Custom commission architecture, conversion playbooks, retention systems, and direct access to top-tier exchanges, brokers, and prop firms — built for forex IBs, crypto affiliates, regional BDs, and trading communities.",
    highlights: [
      "Crypto IB program architecture designed for compounding retention",
      "Forex IB network structuring for conversion and partner quality",
      "IB affiliate program playbooks tied to transparent telemetry",
      "Broker IB programs aligned with regional BD expansion",
    ],
    primaryCtaLabel: "Apply as a Sigma Partner",
    primaryCtaHref: ROUTES.servicesIbProgram,
    secondaryCtaLabel: "Partner with Sigma",
    secondaryCtaHref: ROUTES.contact,
  },
  traderNetwork: {
    eyebrow: "Service",
    title: "Trader, VIP & Whale Access Network",
    intro:
      "Better fees, better tools, better support — matched to the trader’s style.",
    body:
      "Sigma supports platform matching, VIP and whale onboarding, copy trading access, options, prop firm discovery, and pro-grade data terminal introductions.",
    support:
      "This service focuses on market access infrastructure and operator support. Sigma does not provide investment advice, does not custody user funds, and does not guarantee trading outcomes.",
    highlights: [
      "VIP onboarding crypto workflows for serious trading participants",
      "Whale onboarding support across vetted platform partners",
      "Trader platform matching and copy trading platform access guidance",
      "Better market access via structured partner and venue introductions",
    ],
    complianceNote:
      "Sigma is a growth infrastructure network. Sigma is not a broker, exchange, investment fund, fund manager, or licensed financial advisor. Sigma does not hold, custody, or trade user funds, and does not guarantee trading profits, withdrawals, or financial outcomes.",
    primaryCtaLabel: "Find Better Market Access",
    primaryCtaHref: ROUTES.servicesTraderNetwork,
    secondaryCtaLabel: "Partner with Sigma",
    secondaryCtaHref: ROUTES.contact,
  },
  tokenLaunch: {
    eyebrow: "Service",
    title: "Token Launch, Listing & Market-Making Introductions",
    intro:
      "Coordinated launch playbooks for token projects — KOL synchronization, community building, exchange listing support, market-maker introductions, and post-TGE retention.",
    body:
      "Sigma aligns launch distribution with operational cadence so listing and post-launch performance are supported by regional execution, not one-off campaign bursts.",
    support:
      "Layer-1 protocol launch programs can include 40+ distribution surfaces across six languages, KOL synchronization to product milestones, and market-maker coordination — with compliance-safe, non-guaranteed outcome framing.",
    highlights: [
      "Token launch marketing systems built for multi-region distribution",
      "Crypto exchange listing service support through operator coordination",
      "Market maker introduction workflows tied to launch readiness",
      "Post-TGE retention loops connected to community and liquidity telemetry",
    ],
    primaryCtaLabel: "Token Launch & Listing Services",
    primaryCtaHref: ROUTES.servicesTokenLaunch,
    secondaryCtaLabel: "Partner with Sigma",
    secondaryCtaHref: ROUTES.contact,
  },
};

function localizedFallback(
  en: ServiceDetailContent,
  overrides?: Partial<Record<Exclude<LangCode, "EN">, Partial<ServiceDetailContent>>>,
): Record<LangCode, ServiceDetailContent> {
  return {
    EN: en,
    TR: { ...en, ...(overrides?.TR ?? {}) },
    ZH: { ...en, ...(overrides?.ZH ?? {}) },
    FA: { ...en, ...(overrides?.FA ?? {}) },
    ES: { ...en, ...(overrides?.ES ?? {}) },
    RU: { ...en, ...(overrides?.RU ?? {}) },
    AR: { ...en, ...(overrides?.AR ?? {}) },
  };
}

const localized = {
  platformGrowth: localizedFallback(EN_CONTENT.platformGrowth, {
    TR: { eyebrow: "Hizmet", primaryCtaLabel: "Platformunuzu Ölçekleyin", secondaryCtaLabel: "Sigma ile Ortak Olun" },
    FA: { eyebrow: "خدمت", primaryCtaLabel: "پلتفرم خود را مقیاس دهید", secondaryCtaLabel: "همکاری با Sigma" },
    ZH: { eyebrow: "服务", primaryCtaLabel: "扩展您的平台", secondaryCtaLabel: "与 Sigma 合作" },
    ES: { eyebrow: "Servicio", primaryCtaLabel: "Escala tu plataforma", secondaryCtaLabel: "Asociarse con Sigma" },
    RU: { eyebrow: "Сервис", primaryCtaLabel: "Масштабируйте платформу", secondaryCtaLabel: "Стать партнёром Sigma" },
    AR: { eyebrow: "الخدمة", primaryCtaLabel: "وسّع منصتك", secondaryCtaLabel: "شارك مع Sigma" },
  }),
  kolInfrastructure: localizedFallback(EN_CONTENT.kolInfrastructure, {
    TR: { eyebrow: "Hizmet", primaryCtaLabel: "Finansal Creator Altyapınızı Kurun", secondaryCtaLabel: "Sigma ile Ortak Olun" },
    FA: { eyebrow: "خدمت", primaryCtaLabel: "زیرساخت مالی کریتور خود را بسازید", secondaryCtaLabel: "همکاری با Sigma" },
    ZH: { eyebrow: "服务", primaryCtaLabel: "构建您的金融创作者基础设施", secondaryCtaLabel: "与 Sigma 合作" },
    ES: { eyebrow: "Servicio", primaryCtaLabel: "Construye tu infraestructura de creadores financieros", secondaryCtaLabel: "Asociarse con Sigma" },
    RU: { eyebrow: "Сервис", primaryCtaLabel: "Постройте инфраструктуру финансового креатора", secondaryCtaLabel: "Стать партнёром Sigma" },
    AR: { eyebrow: "الخدمة", primaryCtaLabel: "ابنِ بنية صانع المحتوى المالي", secondaryCtaLabel: "شارك مع Sigma" },
  }),
  ibProgram: localizedFallback(EN_CONTENT.ibProgram, {
    TR: { eyebrow: "Hizmet", primaryCtaLabel: "Sigma Partneri Olarak Başvurun", secondaryCtaLabel: "Sigma ile Ortak Olun" },
    FA: { eyebrow: "خدمت", primaryCtaLabel: "به‌عنوان شریک Sigma درخواست دهید", secondaryCtaLabel: "همکاری با Sigma" },
    ZH: { eyebrow: "服务", primaryCtaLabel: "申请成为 Sigma 合作伙伴", secondaryCtaLabel: "与 Sigma 合作" },
    ES: { eyebrow: "Servicio", primaryCtaLabel: "Aplica como partner de Sigma", secondaryCtaLabel: "Asociarse con Sigma" },
    RU: { eyebrow: "Сервис", primaryCtaLabel: "Подать заявку как партнёр Sigma", secondaryCtaLabel: "Стать партнёром Sigma" },
    AR: { eyebrow: "الخدمة", primaryCtaLabel: "قدّم كشريك مع Sigma", secondaryCtaLabel: "شارك مع Sigma" },
  }),
  traderNetwork: localizedFallback(EN_CONTENT.traderNetwork, {
    TR: { eyebrow: "Hizmet", primaryCtaLabel: "Daha İyi Pazar Erişimi Bulun", secondaryCtaLabel: "Sigma ile Ortak Olun" },
    FA: { eyebrow: "خدمت", primaryCtaLabel: "به دسترسی بهتر بازار برسید", secondaryCtaLabel: "همکاری با Sigma" },
    ZH: { eyebrow: "服务", primaryCtaLabel: "获取更好的市场准入", secondaryCtaLabel: "与 Sigma 合作" },
    ES: { eyebrow: "Servicio", primaryCtaLabel: "Encuentra mejor acceso al mercado", secondaryCtaLabel: "Asociarse con Sigma" },
    RU: { eyebrow: "Сервис", primaryCtaLabel: "Получите лучший доступ к рынку", secondaryCtaLabel: "Стать партнёром Sigma" },
    AR: { eyebrow: "الخدمة", primaryCtaLabel: "احصل على وصول أفضل إلى السوق", secondaryCtaLabel: "شارك مع Sigma" },
  }),
  tokenLaunch: localizedFallback(EN_CONTENT.tokenLaunch, {
    TR: { eyebrow: "Hizmet", primaryCtaLabel: "Token Lansman ve Listeleme Hizmetleri", secondaryCtaLabel: "Sigma ile Ortak Olun" },
    FA: { eyebrow: "خدمت", primaryCtaLabel: "خدمات لانچ و لیستینگ توکن", secondaryCtaLabel: "همکاری با Sigma" },
    ZH: { eyebrow: "服务", primaryCtaLabel: "代币发行与上市服务", secondaryCtaLabel: "与 Sigma 合作" },
    ES: { eyebrow: "Servicio", primaryCtaLabel: "Servicios de lanzamiento y listing de token", secondaryCtaLabel: "Asociarse con Sigma" },
    RU: { eyebrow: "Сервис", primaryCtaLabel: "Сервисы запуска и листинга токена", secondaryCtaLabel: "Стать партнёром Sigma" },
    AR: { eyebrow: "الخدمة", primaryCtaLabel: "خدمات إطلاق وإدراج التوكن", secondaryCtaLabel: "شارك مع Sigma" },
  }),
} as const;

export function getServiceDetailContent(key: ServiceDetailKey, lang: LangCode): ServiceDetailContent {
  return localized[key][lang] ?? localized[key].EN;
}
