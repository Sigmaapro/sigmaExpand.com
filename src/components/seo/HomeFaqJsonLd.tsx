/**
 * Homepage FAQPage JSON-LD only.
 * The Organization / WebSite / WebPage graph in the root layout is left unchanged.
 */
export const HOME_FAQ_JSON_LD = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://sigmaa.pro/#faq",
  "isPartOf": { "@id": "https://sigmaa.pro/#webpage" },
  "mainEntity": [
    { "@type": "Question", "name": "What is a crypto marketing agency?", "acceptedAnswer": { "@type": "Answer", "text": "A crypto marketing agency helps crypto, blockchain and Web3 companies grow through channels such as KOL campaigns, PR, SEO, paid media, community and partner programs. Sigma works as a crypto marketing agency and a growth network for exchanges, brokers, KOLs and Web3 projects." } },
    { "@type": "Question", "name": "How is Sigma different from a traditional crypto marketing agency?", "acceptedAnswer": { "@type": "Answer", "text": "Most crypto marketing agencies focus on one channel. Sigma connects user acquisition, KOL infrastructure, partner programs, PR, SEO, localization and strategic partnerships into one growth system, built by operators who have grown exchanges and run BD desks." } },
    { "@type": "Question", "name": "Who does Sigma work with?", "acceptedAnswer": { "@type": "Answer", "text": "Crypto exchanges, forex and multi-asset brokers, token projects, Web3 platforms, KOLs and financial creators." } },
    { "@type": "Question", "name": "Does Sigma work with forex brokers as well as crypto exchanges?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Sigma supports forex and multi-asset brokers with partner programs, KOL campaigns, localization and market entry, including brokers adding crypto products." } },
    { "@type": "Question", "name": "Which markets does Sigma cover?", "acceptedAnswer": { "@type": "Answer", "text": "Sigma runs campaigns across MENA and the GCC, Europe, CIS, APAC and LATAM, with local-language KOLs, partners and communities." } },
    { "@type": "Question", "name": "How much does a crypto marketing agency cost?", "acceptedAnswer": { "@type": "Answer", "text": "It depends on the markets, channels, timeline and how much paid media is included. Sigma prepares every plan and quote after a short scoping call, with costs shown line by line." } },
    { "@type": "Question", "name": "Does Sigma guarantee results?", "acceptedAnswer": { "@type": "Answer", "text": "No. Sigma does not guarantee users, trading volume, listings or token prices, and does not provide financial advice or manage user funds. We set clear goals, track them and report on them openly." } },
    { "@type": "Question", "name": "How do I start working with Sigma?", "acceptedAnswer": { "@type": "Answer", "text": "Request a growth consultation and share your company type, target markets, goals and timeline. The Sigma team will come back with a scoped plan." } },
    { "@type": "Question", "name": "Is Sigma a crypto marketing agency or a growth partner?", "acceptedAnswer": { "@type": "Answer", "text": "Both. Sigma is a crypto marketing agency and a finance and Web3 growth partner. Unlike a typical marketing agency or crypto agency that runs one channel, Sigma works as a Web3 growth agency and financial growth infrastructure: it connects acquisition, KOLs, partners, PR and SEO into one system." } },
    { "@type": "Question", "name": "What does operator-led crypto marketing mean?", "acceptedAnswer": { "@type": "Answer", "text": "It means the Sigma crypto marketing team has run growth from the inside: scaling exchanges, managing broker partnerships, running BD desks and building trading communities. Plans are built around what drives users and trading activity in practice, not around vanity metrics." } },
    { "@type": "Question", "name": "How does Sigma support crypto exchange growth?", "acceptedAnswer": { "@type": "Answer", "text": "As a crypto exchange marketing agency and growth partner, Sigma supports crypto user acquisition, KOL and partner programs, VIP trader onboarding, localization and market entry. Every channel is tracked from sign-up to first deposit and first trade, so exchanges can see what works in each market." } },
    { "@type": "Question", "name": "Is Sigma a crypto KOL agency?", "acceptedAnswer": { "@type": "Answer", "text": "KOL marketing is one of Sigma's core services. Sigma works as a crypto KOL agency with a network of vetted, local-language creators across MENA, Europe, CIS, APAC and LATAM, with tracking for each KOL and clear disclosure of paid content." } },
    { "@type": "Question", "name": "What does Sigma offer for forex broker marketing?", "acceptedAnswer": { "@type": "Answer", "text": "Sigma's forex broker marketing covers partner programs, KOL and creator campaigns, localization and regional market entry, plus support for brokers adding crypto products. Campaigns are planned around each market's promotion rules." } },
    { "@type": "Question", "name": "What is liquidity activation?", "acceptedAnswer": { "@type": "Answer", "text": "Liquidity activation means bringing real, active traders to a platform through user acquisition, partner programs and VIP onboarding, so that trading activity grows from genuine users. It is not market making or wash trading, and Sigma does not guarantee trading volume." } }
  ]
}`;

export function HomeFaqJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: HOME_FAQ_JSON_LD }}
    />
  );
}
