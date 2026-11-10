const ORIGIN = "https://sigmaa.pro";
const LOGO_URL = `${ORIGIN}/logo.svg`;

/** Homepage Organization, WebSite, and WebPage graph. FAQPage stays a separate block. */
export function getHomePageJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: "Sigma",
        legalName: "Sigma",
        alternateName: [
          "Sigmaa",
          "SigmaPRO",
          "Sigma Crypto",
          "Sigma Crypto Marketing",
          "Sigma Crypto Marketing Agency",
          "Sigma Web3",
          "Sigma Growth Network",
          "Sigma Finance and Web3 Growth Partner",
        ],
        brand: {
          "@type": "Brand",
          "@id": `${ORIGIN}/#brand`,
          name: "Sigma",
          alternateName: ["Sigmaa", "SigmaPRO"],
          slogan: "More than a crypto marketing agency.",
          logo: { "@id": `${ORIGIN}/#logo` },
        },
        url: `${ORIGIN}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${ORIGIN}/#logo`,
          url: LOGO_URL,
          caption: "Sigma crypto marketing agency logo",
        },
        image: { "@id": `${ORIGIN}/#logo` },
        description:
          "Sigma is a crypto marketing agency and finance and Web3 growth partner for crypto exchanges, forex brokers, KOLs and Web3 projects. As a Web3 growth agency and financial growth infrastructure, Sigma delivers operator-led crypto marketing: crypto exchange growth, crypto user acquisition, liquidity activation, forex broker marketing, crypto KOL agency services, partner programs, PR, SEO and localization.",
        slogan: "More than a crypto marketing agency.",
        keywords:
          "Sigma, Sigmaa, Sigma crypto, Sigma crypto marketing, Sigma crypto marketing agency, crypto marketing agency, crypto marketing, crypto agency, marketing agency, finance and Web3 growth partner, financial growth infrastructure, crypto exchange growth, crypto exchange marketing agency, crypto user acquisition, liquidity activation, forex broker marketing, crypto KOL agency, Web3 growth agency, operator-led crypto marketing",
        email: "BD@sigmaa.pro",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "business development",
            email: "BD@sigmaa.pro",
            url: `${ORIGIN}/contact`,
            availableLanguage: ["English", "Arabic", "Persian", "Russian", "Spanish"],
          },
        ],
        sameAs: ["https://x.com/sigmaapro"],
        areaServed: [
          { "@type": "Place", name: "Middle East and North Africa" },
          { "@type": "Place", name: "Gulf Cooperation Council" },
          { "@type": "Place", name: "Europe" },
          { "@type": "Place", name: "Commonwealth of Independent States" },
          { "@type": "Place", name: "Asia-Pacific" },
          { "@type": "Place", name: "Latin America" },
        ],
        audience: {
          "@type": "BusinessAudience",
          audienceType:
            "Crypto exchanges, forex and multi-asset brokers, token projects, Web3 platforms, KOLs and financial creators",
        },
        knowsAbout: [
          "Crypto marketing",
          "Crypto marketing agency services",
          "Crypto agency services",
          "Marketing agency services for Web3",
          "Finance and Web3 growth partnership",
          "Financial growth infrastructure",
          "Operator-led crypto marketing",
          "Web3 growth agency services",
          "Crypto exchange growth",
          "Crypto exchange marketing",
          "Crypto user acquisition",
          "Liquidity activation",
          "Forex broker marketing",
          "Crypto KOL agency services",
          "KOL and influencer marketing",
          "Affiliate and partner programs",
          "Crypto PR and media relations",
          "Web3 SEO and AI search optimization",
          "Exchange listing readiness",
          "Web3 community management",
          "Web3 localization and market expansion",
          "Web3 business development",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Sigma crypto marketing agency services",
          itemListElement: [
            offer("Web3 Business Development & Strategic Partnerships", "/services/web3-business-development-strategic-partnerships"),
            offer("KOL & Influencer Marketing", "/services/kol-influencer-marketing"),
            offer("Crypto Exchange Growth & Market Development", "/services/crypto-exchange-growth-market-development"),
            offer("Web3 Growth Strategy & Market Expansion", "/services/web3-growth-strategy-market-expansion"),
            offer("Affiliate & Partner Program Management", "/services/affiliate-partner-program-management"),
            offer("Web3 Marketing Strategy & Campaign Management", "/services/web3-marketing-strategy-campaign-management"),
            offer("Community Management", "/services/community-management"),
            offer("Web3 Content & Social Media Marketing", "/services/web3-content-social-media-marketing"),
            offer("Web3 Branding & Personal Brand Development", "/services/web3-branding-personal-brand-development"),
            offer("PR & Media Relations", "/services/pr-media-relations"),
            offer("Web3 Market Research & Competitive Intelligence", "/services/web3-market-research-competitive-intelligence"),
            offer("Exchange Listing Readiness & Partner Introductions", "/services/exchange-listing-readiness-partner-introductions"),
            offer("Web3 CRM, Automation & Product Solutions", "/services/web3-crm-automation-product-solutions"),
            offer("Web3 Ecosystem Strategy & Advisory", "/services/web3-ecosystem-strategy-advisory"),
          ],
        },
        subjectOf: { "@id": "https://blog.sigmaa.pro/#website" },
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: "Sigma",
        alternateName: ["Sigmaa", "Sigma Crypto Marketing Agency", "Sigma Crypto Marketing"],
        inLanguage: "en",
        publisher: { "@id": `${ORIGIN}/#organization` },
      },
      {
        "@type": "WebSite",
        "@id": "https://blog.sigmaa.pro/#website",
        url: "https://blog.sigmaa.pro/",
        name: "Sigma Blog",
        alternateName: "Sigma Insights",
        inLanguage: "en",
        publisher: { "@id": `${ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${ORIGIN}/#webpage`,
        url: `${ORIGIN}/`,
        name: "Sigma | Crypto Marketing Agency & Web3 Growth Network",
        description:
          "Sigma is a crypto marketing agency and finance and Web3 growth partner for exchanges, brokers, KOLs and Web3 projects.",
        keywords:
          "Sigma, Sigmaa, Sigma crypto, Sigma crypto marketing, Sigma crypto marketing agency, crypto marketing agency, crypto marketing, crypto agency, marketing agency, finance and Web3 growth partner, financial growth infrastructure, crypto exchange growth, crypto exchange marketing agency, crypto user acquisition, liquidity activation, forex broker marketing, crypto KOL agency, Web3 growth agency, operator-led crypto marketing",
        inLanguage: "en",
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${ORIGIN}/#organization` },
        mainEntity: { "@id": `${ORIGIN}/#organization` },
        primaryImageOfPage: { "@id": `${ORIGIN}/#logo` },
        hasPart: { "@id": `${ORIGIN}/#faq` },
      },
    ],
  };
}

function offer(name: string, path: string) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      url: `${ORIGIN}${path}`,
      provider: { "@id": `${ORIGIN}/#organization` },
    },
  };
}
