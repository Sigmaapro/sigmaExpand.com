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
  TR: EN_CONTENT,
  ZH: EN_CONTENT,
  FA: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
