import { ROUTES } from "@/content/global/routes";
import type { LangCode } from "@/content/types";

export type RiskDisclosureContent = {
  kicker: string;
  title: string;
  headline: string;
  updatedLabel: string;
  updatedDate: string;
  sections: Array<{
    title: string;
    body: string;
    items?: string[];
  }>;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

const EN_CONTENT: RiskDisclosureContent = {
  kicker: "Risk Disclosure",
  title: "What Sigma is — and the risks the markets we work in carry.",
  headline:
    "Sigma is a growth infrastructure network. We are not a broker, exchange, investment fund, fund manager, or licensed financial advisor. We do not hold, custody, or trade user funds. Markets we work alongside — crypto, forex, derivatives, prop trading, and leveraged products — carry real risk of partial or total loss. Past performance figures cited anywhere on this site reflect aggregated network activity and are not projections. Users and partners are responsible for their own financial decisions, regulatory compliance, and risk management.",
  updatedLabel: "Last updated",
  updatedDate: "2026-01-XX",
  sections: [
    {
      title: "What Sigma is",
      body: "Sigma is a growth network. We work with crypto exchanges, forex brokers, prop firms, Web3 protocols, KOLs, IBs, and trading communities to help them grow users, volume, distribution, and regional reach. Our services include strategic consulting, campaign execution, KOL coordination, IB program design, community building, content production, market expansion, and the supporting tools that compound this work.",
    },
    {
      title: "What Sigma is not",
      body: "Sigma is not:",
      items: [
        "A broker, broker-dealer, or introducing broker",
        "A cryptocurrency exchange or trading venue",
        "An investment fund, hedge fund, or fund manager",
        "A licensed financial advisor, registered investment advisor, or wealth manager",
        "A custodian, depositary, or holder of client assets",
        "A signal provider or trading recommendation service",
        "A guarantor of financial outcomes for any partner, trader, or end user",
      ],
    },
    {
      title: "Market risk warning",
      body: "The markets Sigma works alongside — including but not limited to spot crypto, perpetual futures, options, derivatives, foreign exchange, leveraged products, prop trading, and decentralized finance — carry substantial risk of loss. Participants in these markets can lose part or all of their capital. Leveraged products in particular can result in losses exceeding the initial deposit.",
    },
    {
      title: "No guarantees",
      body: "Sigma does not guarantee:",
      items: [
        "Trading profits or returns of any kind",
        "Specific user acquisition, FTD, or volume outcomes for any partner",
        "Withdrawal reliability or solvency of third-party platforms in our network",
        "Specific exchange listings, market-maker arrangements, or partnership outcomes",
        "Search rankings, KOL campaign performance, or community growth metrics",
        "Compliance outcomes — those depend on partner licensing and operational adherence",
      ],
    },
    {
      title: "Metrics cited on this site",
      body: "Figures published on this website — including the $7B+ monthly notional volume, 2.4M+ users activated, 1,500+ network of creators and partners, and 40+ markets covered — reflect aggregated activity across the Sigma network and partner engagements. Not all of this volume or activity is directly executed by Sigma personnel; much of it represents activity supported by Sigma's network, infrastructure, or coordination.",
    },
    {
      title: "User responsibility",
      body: "Anyone reading this site, engaging with Sigma, or trading on platforms in our network is solely responsible for:",
      items: [
        "Their own financial decisions and the consequences of those decisions",
        "Tax obligations in their jurisdiction",
        "Regulatory compliance under the laws applicable to them",
        "Verifying the licensing status of any platform they use",
        "Conducting their own due diligence on tokens, exchanges, brokers, and protocols",
        "Managing their own risk including position sizing, leverage, and exposure",
      ],
    },
    {
      title: "Eligibility and restricted jurisdictions",
      body: "Sigma's services are intended for adult professionals (18+) operating in or with the financial industry. We do not knowingly engage with minors, do not market services to minors, and do not work with partners whose products are targeted at minors. Sigma does not provide services where doing so would breach sanctions, export controls, or regional regulations. Where Sigma's services would conflict with applicable law in a region, we either decline the engagement or route work through compliant partners in that jurisdiction.",
    },
    {
      title: "Changes to this disclosure",
      body: "This disclosure may be updated to reflect changes in our services, regulatory environment, or industry standards. Significant changes are communicated to active partners.",
    },
  ],
  primaryCtaLabel: "Partner with Sigma",
  primaryCtaHref: ROUTES.contact,
  secondaryCtaLabel: "Read Terms of Use",
  secondaryCtaHref: ROUTES.terms,
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
