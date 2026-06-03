import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type RiskDisclosureContent = {
  kicker: string;
  title: string;
  headline: string;
  paragraphs: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const EN_CONTENT: RiskDisclosureContent = {
  kicker: "Risk & Transparency",
  title: "Risk & Transparency Disclosure",
  headline: "What Sigma Is — and What Sigma Is Not",
  paragraphs: [
    "Sigma is a growth infrastructure network. Sigma is not a broker, exchange, investment fund, fund manager, or licensed financial advisor. Sigma does not hold, custody, or trade user funds, and does not guarantee trading profits, withdrawals, or financial outcomes.",
    "Sigma may earn revenue through partnership, referral, affiliate, campaign, consulting, or service agreements with platforms in its network. Some outbound links may be affiliate or partner links, disclosed where appropriate.",
    "Trading in crypto, forex, futures, derivatives, and leveraged markets carries substantial risk and is not suitable for all participants. Users are responsible for their own financial decisions, platform choices, regulatory compliance, and risk management.",
  ],
  primaryCtaLabel: "Partner with Sigma",
  primaryCtaHref: ROUTES.contact,
  secondaryCtaLabel: "Return to FAQ",
  secondaryCtaHref: ROUTES.faq,
};

export const riskDisclosureContentByLang: Record<LangCode, RiskDisclosureContent> = {
  EN: EN_CONTENT,
  TR: {
    ...EN_CONTENT,
    kicker: "Risk ve Şeffaflık",
    title: "Risk ve Şeffaflık Beyanı",
    headline: "Sigma Nedir — Sigma Ne Değildir",
    primaryCtaLabel: "Sigma ile Ortak Olun",
    secondaryCtaLabel: "SSS'ye Dön",
  },
  ZH: {
    ...EN_CONTENT,
    kicker: "风险与透明",
    title: "风险与透明度披露",
    headline: "Sigma 是什么 —— Sigma 不是什么",
    primaryCtaLabel: "与 Sigma 合作",
    secondaryCtaLabel: "返回 FAQ",
  },
  FA: {
    ...EN_CONTENT,
    kicker: "ریسک و شفافیت",
    title: "بیانیه ریسک و شفافیت",
    headline: "Sigma چیست — Sigma چیست نیست",
    primaryCtaLabel: "همکاری با Sigma",
    secondaryCtaLabel: "بازگشت به سوالات پرتکرار",
  },
  ES: {
    ...EN_CONTENT,
    kicker: "Riesgo y Transparencia",
    title: "Divulgación de Riesgo y Transparencia",
    headline: "Qué es Sigma — y qué no es Sigma",
    primaryCtaLabel: "Asociarse con Sigma",
    secondaryCtaLabel: "Volver al FAQ",
  },
  RU: {
    ...EN_CONTENT,
    kicker: "Риск и прозрачность",
    title: "Раскрытие рисков и прозрачности",
    headline: "Что такое Sigma — и чем Sigma не является",
    primaryCtaLabel: "Стать партнёром Sigma",
    secondaryCtaLabel: "Вернуться к FAQ",
  },
  AR: {
    ...EN_CONTENT,
    kicker: "المخاطر والشفافية",
    title: "إفصاح المخاطر والشفافية",
    headline: "ما هي Sigma — وما ليست عليه Sigma",
    primaryCtaLabel: "شارك مع Sigma",
    secondaryCtaLabel: "العودة إلى الأسئلة الشائعة",
  },
};
