import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

export function AboutStructuredData() {
  const origin = getSiteUrl().replace(/\/$/, "");
  const url = getCanonicalUrl("/about");

  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url,
    mainEntity: {
      "@type": "Organization",
      name: "Sigma",
      alternateName: ["Sigma Team", "Sigma Network"],
      url: origin,
      logo: `${origin}/logo.svg`,
      description:
        "Global financial growth infrastructure network founded by operators with experience inside major crypto exchanges, broker desks, and creator networks.",
      founder: {
        "@type": "Person",
        name: "Omid Modaber",
        jobTitle: "Founder",
        worksFor: { "@type": "Organization", name: "Sigma" },
      },
      employee: [
        { "@type": "Person", name: "Arad Moaf", jobTitle: "Core Partner, Market Expansion" },
        { "@type": "Person", name: "Novin Ghasemi", jobTitle: "Core Partner, Growth & Partnerships" },
        { "@type": "Person", name: "Hosein Rostami", jobTitle: "Core Partner, Strategic Operations" },
        { "@type": "Person", name: "Mostafa Moradi", jobTitle: "Core Partner, Community & Growth" },
      ],
      foundingLocation: { "@type": "Place", name: "Dubai, UAE" },
      location: [
        { "@type": "Place", name: "Dubai, UAE" },
        { "@type": "Place", name: "Istanbul, Turkey" },
        { "@type": "Place", name: "Bali, Indonesia" },
        { "@type": "Place", name: "Canada" },
      ],
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
