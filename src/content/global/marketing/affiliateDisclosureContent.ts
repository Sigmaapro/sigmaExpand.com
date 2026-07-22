import type { LangCode } from "@/content/types";

export type LegalSection = {
  title: string;
  body: string;
  items?: string[];
};

export type AffiliateDisclosureContent = {
  kicker: string;
  headline: string;
  summary: string;
  sections: LegalSection[];
};

const EN_CONTENT: AffiliateDisclosureContent = {
  kicker: "Affiliate Disclosure",
  headline: "How Sigma earns — disclosed plainly.",
  summary:
    "Sigma earns revenue in five ways: direct service fees from partners, performance-based arrangements tied to growth metrics, commission and rebate shares from IB and affiliate structures, referral and introduction fees from network partners, and occasional equity or token allocations on long-cycle Web3 partnerships. Some outbound links on this site and in Sigma communications are affiliate or partner links. This page explains exactly when that's the case, what we earn from, and what we'd never accept payment for.",
  sections: [
    {
      title: "How we get paid",
      body: "Five revenue categories:",
      items: [
        "Service fees. Most engagement revenue. Retainers, project fees, diagnostic fees, and consulting fees paid directly by partners for defined scope of work.",
        "Performance arrangements. Variable revenue tied to outcomes we co-own — FTDs, trading volume, user retention, IB program revenue, listing flow. Aligns Sigma's interests with the partner's actual business results.",
        "Commission and rebate share. Common in IB and affiliate partnerships. Sigma takes part of the IB or affiliate commission flow, agreed in writing upfront. Operates inside the partner's existing structure rather than as an extra layer.",
        "Referral and introduction fees. Where Sigma introduces a partner to a platform, market maker, IB network, or service provider in our broader network, we may earn an introduction or success fee from the receiving party. Disclosed to the introducing partner before introductions are made.",
        "Equity or token allocation. Occasionally, for long-cycle Web3 partnerships where Sigma genuinely shares the multi-year view. Never as a replacement for cash on the core work — always as a complement.",
      ],
    },
    {
      title: "Affiliate and referral links",
      body: "Some links on this website, in our content, in Sigma communications, and in our partners' campaigns are affiliate or partner links. When someone follows one of those links and engages with the platform on the other end, Sigma may earn a referral fee, commission, or rebate from that platform.",
      items: [
        "Crypto exchange comparisons and recommendations",
        "Forex broker introductions",
        "Prop firm comparisons",
        "Trading tool recommendations (TradingView, Glassnode, Santiment, etc.)",
        "Data terminal partnerships",
        "Wallet and custody platform recommendations",
        "Educational platform partnerships",
      ],
    },
    {
      title: "What we would never accept payment for",
      body: "The line is firm:",
      items: [
        "We don't accept payment to promote platforms we wouldn't recommend on the merits",
        "We don't accept payment to remove negative information or honest assessments",
        "We don't accept \"pay to be considered\" for partnership inclusion",
        "We don't accept payment from token projects to inflate metrics, sponsor positive coverage disguised as editorial, or run campaigns that misrepresent project risk",
        "We don't accept payment to promote services to audiences who can't legally use them (sanctions, jurisdiction, age, licensing)",
      ],
    },
    {
      title: "Disclosure within content",
      body: "Where Sigma publishes content that includes affiliate links, sponsored elements, or specific platform recommendations:",
      items: [
        "Affiliate links are disclosed in-line or at the start of the content",
        "Sponsored content (paid for placement by a platform) is labeled clearly as sponsored",
        "Editorial content (independent assessment) is labeled as such, even when it mentions partners",
      ],
    },
    {
      title: "KOL and creator disclosure",
      body: "KOLs and creators in the Sigma network are required to disclose:",
      items: [
        "Paid sponsorships from platforms they promote",
        "Affiliate relationships that earn them revenue when audiences engage",
        "Personal positions in tokens or assets they discuss (where material)",
      ],
    },
    {
      title: "What this disclosure does not constitute",
      body: "This disclosure isn't legal advice and doesn't substitute for it. It exists to give partners, traders, KOLs, and visitors a clear view of how Sigma earns and what that does — and doesn't — influence. If you have specific questions about how a particular link, recommendation, or partnership earns Sigma revenue, ask.",
    },
  ],
};

export const affiliateDisclosureContentByLang: Record<LangCode, AffiliateDisclosureContent> = {
  EN: EN_CONTENT,
  TR: EN_CONTENT,
  FA: EN_CONTENT,
  ZH: EN_CONTENT,
  ES: EN_CONTENT,
  RU: EN_CONTENT,
  AR: EN_CONTENT,
};
