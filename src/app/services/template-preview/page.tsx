import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { MarketingPageShell } from "@/components/site/marketing/MarketingPageShell";
import { ServicePageTemplate } from "@/components/services";
import type { ServiceDefinition } from "@/content/services";

export const metadata: Metadata = {
  title: "Services template preview (internal)",
  description: "Internal preview for the reusable ServicePageTemplate. Not for indexing.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const PREVIEW_SERVICE: ServiceDefinition = {
  slug: "crypto-marketing-agency",
  key: "cryptoMarketingAgency",
  href: "/services/crypto-marketing-agency",
  order: 0,
  enabled: true,
  icon: "sparkles",
  visualType: "default",
  title: "Service Template Preview",
  shortLabel: "Template Preview",
  eyebrow: "Internal preview",
  lead:
    "Generic mock content for validating the reusable ServicePageTemplate layout, tables, FAQ, and CTA blocks.",
  intro:
    "This page is an internal, noindex preview. It renders every major section of the foundation template with placeholder copy so the design system can be reviewed before real Word content is imported.",
  keywords: ["internal", "preview", "services template"],
  seo: {
    title: "Services template preview (internal)",
    description: "Internal preview route for ServicePageTemplate.",
    canonicalPath: "/services/template-preview",
  },
  audiences: [
    {
      id: "preview-a",
      title: "Product & growth leads",
      description: "Need a durable operating system rather than isolated campaigns.",
      icon: "activity",
    },
    {
      id: "preview-b",
      title: "Partner networks",
      description: "Require clear economics, onboarding, and quality controls.",
      icon: "network",
    },
  ],
  problems: [
    {
      id: "p1",
      title: "Fragmented channels",
      description: "Creators, affiliates, and paid surfaces run without shared cadence.",
    },
    {
      id: "p2",
      title: "Weak instrumentation",
      description: "Activity is hard to connect to users, volume, or retention.",
    },
  ],
  process: [
    {
      id: "s1",
      step: 1,
      title: "Diagnose",
      description: "Map constraints, metrics, and current distribution reality.",
    },
    {
      id: "s2",
      step: 2,
      title: "Architect",
      description: "Design surfaces, ownership, and first-wave markets.",
    },
    {
      id: "s3",
      step: 3,
      title: "Activate",
      description: "Launch with telemetry and weekly operating reviews.",
    },
  ],
  modules: [
    {
      id: "m1",
      title: "Distribution module",
      description: "Partner and creator surfaces aligned to product milestones.",
      bullets: ["Quality gates", "Regional sequencing"],
      icon: "layers",
    },
    {
      id: "m2",
      title: "Conversion module",
      description: "Localized funnels and retention loops.",
      bullets: ["Onboarding workflows", "Retention instrumentation"],
      icon: "cpu",
    },
  ],
  metrics: [
    { id: "met1", label: "Readiness", value: "Day-one", detail: "Systems before spend ramps." },
    { id: "met2", label: "Coverage", value: "Multi-market", detail: "Sequenced expansion." },
    { id: "met3", label: "Reporting", value: "Weekly", detail: "Operator reviews." },
  ],
  comparisons: [
    {
      id: "cmp1",
      title: "Campaign vs infrastructure",
      columns: [
        { id: "a", label: "Campaign" },
        { id: "b", label: "Infrastructure" },
      ],
      rows: [
        {
          id: "r1",
          feature: "Horizon",
          cells: { a: "Burst", b: "Compounding" },
        },
        {
          id: "r2",
          feature: "Reuse",
          cells: { a: "Rebuild", b: "Playbooks" },
        },
      ],
    },
  ],
  tables: [
    {
      id: "tbl1",
      title: "Example delivery surfaces",
      columns: [
        { id: "surface", label: "Surface" },
        { id: "cadence", label: "Cadence" },
        { id: "signal", label: "Signal" },
      ],
      rows: [
        {
          id: "row1",
          cells: { surface: "Creator activation", cadence: "Weekly", signal: "Qualified traffic" },
        },
        {
          id: "row2",
          cells: { surface: "Affiliate network", cadence: "Ongoing", signal: "Retained partners" },
        },
      ],
    },
  ],
  regionalSections: [
    {
      id: "reg1",
      regionLabel: "Priority markets",
      title: "Sequenced expansion",
      description: "Enter markets by readiness: audience quality, partner density, and capacity.",
      bullets: ["Shortlist criteria", "Localized messaging"],
    },
  ],
  engagement: [
    {
      id: "e1",
      step: 1,
      title: "Intake",
      description: "Align on goals and constraints.",
    },
    {
      id: "e2",
      step: 2,
      title: "Blueprint",
      description: "Agree surfaces, owners, and metrics.",
    },
  ],
  riskDisclosure:
    "This is an internal preview page with mock content. Sigma provides growth infrastructure and does not guarantee trading or financial outcomes.",
  faq: [
    {
      id: "f1",
      question: "Is this page public SEO content?",
      answer: "No. This route is marked noindex and exists only for internal template review.",
    },
    {
      id: "f2",
      question: "Can this preview be deleted later?",
      answer: "Yes. Remove src/app/services/template-preview when the foundation is validated.",
    },
  ],
  cta: {
    eyebrow: "Preview CTA",
    title: "Template foundation is ready for content import",
    description: "Later phases will replace mock copy with approved service content.",
    primaryLabel: "Back to services",
    primaryHref: "/services",
    secondaryLabel: "Contact",
    secondaryHref: "/contact",
  },
  relatedSlugs: ["kol-infrastructure", "ib-affiliate-growth", "web3-growth-agency"],
  schema: {
    serviceType: "Internal preview",
    areaServed: "Worldwide",
    providerName: "Sigma",
  },
  visual: {
    accent: "persian",
    showGrid: true,
    heroDensity: "default",
  },
};

export default function ServicesTemplatePreviewPage() {
  return (
    <InnerPageShell>
      <MarketingPageShell contentClassName="mx-auto max-w-[1720px] px-0 py-0 sm:px-0 md:py-0 lg:px-0">
        <div className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100">
          Internal template preview · noindex
        </div>
        <ServicePageTemplate service={PREVIEW_SERVICE} />
      </MarketingPageShell>
    </InnerPageShell>
  );
}
