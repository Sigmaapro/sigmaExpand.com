import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Code2,
  Globe2,
  Layers,
  Network,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { ServicePageStructuredData } from "@/components/seo/ServicePageStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { ServiceBreadcrumbs } from "@/components/services/ServiceBreadcrumbs";
import { LocalizedServiceText } from "@/components/services/LocalizedServiceText";
import { getCanonicalUrl, absoluteOgImage } from "@/content/seo";
import {
  SERVICE_DOCUMENTS,
  type ServiceDocument,
  type ServiceDocumentBlock,
} from "@/content/services/serviceDocuments";

export type DocumentServiceKey = keyof typeof SERVICE_DOCUMENTS;

const DOCUMENT_SERVICE_PATHS: Record<DocumentServiceKey, string> = {
  cryptoMarketingAgency: "/services/crypto-marketing-agency",
  ibAffiliateGrowth: "/services/ib-affiliate-growth",
  kolInfrastructure: "/services/kol-infrastructure",
  marketMakerIntroductions: "/services/market-maker-introductions",
  regionalMarketExpansion: "/services/regional-market-expansion",
  web3GrowthAgency: "/services/web3-growth-agency",
};

const DOCUMENT_SERVICE_ICONS: Record<DocumentServiceKey, LucideIcon> = {
  cryptoMarketingAgency: Sparkles,
  ibAffiliateGrowth: Network,
  kolInfrastructure: Code2,
  marketMakerIntroductions: Layers,
  regionalMarketExpansion: Globe2,
  web3GrowthAgency: Shield,
};

function groupBlocks(blocks: readonly ServiceDocumentBlock[]) {
  const groups: { title: string; blocks: ServiceDocumentBlock[] }[] = [];
  let current = { title: "Overview", blocks: [] as ServiceDocumentBlock[] };

  for (const block of blocks) {
    if (block.type === "heading" && block.level === 2) {
      if (current.blocks.length > 0) groups.push(current);
      current = { title: block.text, blocks: [] };
    } else {
      current.blocks.push(block);
    }
  }

  if (current.blocks.length > 0) groups.push(current);
  return groups;
}

function DocumentGroup({ group }: { group: { title: string; blocks: ServiceDocumentBlock[] } }) {
  const content: React.ReactNode[] = [];

  for (let index = 0; index < group.blocks.length; index += 1) {
    const block = group.blocks[index];
    if (block.type === "list") {
      const items: string[] = [block.text];
      while (index + 1 < group.blocks.length && group.blocks[index + 1]?.type === "list") {
        index += 1;
        items.push(group.blocks[index].text);
      }
      content.push(
        <ul key={`list-${index}`} className="list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>,
      );
    } else if (block.type === "heading") {
      content.push(
        <h3 key={`heading-${index}`} className="pt-3 font-display text-lg font-semibold tracking-tight text-white md:text-xl">
          {block.text}
        </h3>,
      );
    } else {
      content.push(
        <p key={`paragraph-${index}`} className="text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
          {block.text}
        </p>,
      );
    }
  }

  return (
    <section className="scroll-mt-28 border-t border-white/[0.08] py-10 first:border-t-0 first:pt-0 md:py-12">
      <header className="max-w-3xl">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c39bb] sm:text-[11px]">
          <LocalizedServiceText kind="serviceDetail" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white text-balance md:text-3xl">
          {group.title}
        </h2>
      </header>
      <div className="mt-7 max-w-4xl space-y-4">{content}</div>
    </section>
  );
}

function DocumentTables({ tables }: { tables: ServiceDocument["tables"] }) {
  if (tables.length === 0) return null;

  return (
    <section className="border-t border-white/[0.08] py-10 md:py-12">
      <header className="max-w-3xl">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1c39bb] sm:text-[11px]">
          <LocalizedServiceText kind="reference" />
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
          <LocalizedServiceText as="span" kind="detailsAtAGlance" />
        </h2>
      </header>
      <div className="mt-8 space-y-6">
        {tables.map((table, tableIndex) => (
          <div key={`table-${tableIndex}`} className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07090f]/55">
            <table className="min-w-full border-collapse text-left text-sm text-[#b6bcc4]">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-[#d8dde3]">
                <tr>{table.headers.map((header) => <th key={header} className="border-b border-white/[0.08] px-4 py-3 font-semibold">{header}</th>)}</tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={`row-${rowIndex}`} className="border-b border-white/[0.06] last:border-b-0">
                    {row.map((cell, cellIndex) => <td key={`cell-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top leading-relaxed">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}

export function getDocumentServiceMetadata(key: DocumentServiceKey): Metadata {
  const document = SERVICE_DOCUMENTS[key];
  const path = DOCUMENT_SERVICE_PATHS[key];
  return {
    title: { absolute: document.metaTitle },
    description: document.metaDescription,
    keywords: [document.primaryKeyword, ...document.secondaryKeywords],
    alternates: { canonical: path },
    openGraph: {
      title: document.metaTitle,
      description: document.metaDescription,
      url: getCanonicalUrl(path),
      siteName: "Sigma",
      type: "website",
      images: [{ url: absoluteOgImage(), width: 1200, height: 630, alt: document.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: document.metaTitle,
      description: document.metaDescription,
      images: [absoluteOgImage()],
    },
  };
}

export function DocumentServicePage({ documentKey }: { documentKey: DocumentServiceKey }) {
  const document = SERVICE_DOCUMENTS[documentKey];
  const Icon = DOCUMENT_SERVICE_ICONS[documentKey] ?? Activity;
  const groups = groupBlocks(document.blocks);

  return (
    <>
      <ServicePageStructuredData path={DOCUMENT_SERVICE_PATHS[documentKey]} title={document.title} description={document.metaDescription} />
      <InnerPageShell>
        <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
          <div className="relative z-10 mx-auto max-w-[1720px] px-0 py-0">
            <article className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
            <div className="mb-8 md:mb-10">
              <ServiceBreadcrumbs currentLabel={document.title} />
            </div>

            <header className="relative overflow-hidden rounded-[1.75rem] border border-[rgba(147,197,253,0.14)] bg-[linear-gradient(155deg,rgba(7,11,21,0.55),rgba(12,22,42,0.48))] px-6 py-10 text-center shadow-[0_24px_64px_rgba(2,8,22,0.4),inset_0_1px_0_rgba(210,228,255,0.08)] backdrop-blur-xl sm:px-10 md:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(28,57,187,0.18),transparent_65%)]" aria-hidden="true" />
              <div className="relative mx-auto max-w-3xl">
                <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-[#1c39bb]/35 bg-[#1c39bb]/15 text-[#bde0fe] sm:size-14">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD]">{document.primaryKeyword}</p>
                <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl lg:text-[2.75rem]">{document.title}</h1>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base">{document.lead}</p>
              </div>
            </header>

            <div className="mt-8 space-y-0">
              {groups.map((group, index) => <DocumentGroup key={`${group.title}-${index}`} group={group} />)}
              <DocumentTables tables={document.tables} />
            </div>

            <section className="relative mt-14 overflow-hidden rounded-[1.75rem] border border-[rgba(147,197,253,0.14)] bg-[linear-gradient(155deg,rgba(8,20,55,0.55),rgba(5,12,30,0.4))] px-6 py-10 text-center shadow-[0_24px_64px_rgba(2,8,22,0.35)] backdrop-blur-xl sm:px-10 sm:py-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(28,57,187,0.2),transparent_65%)]" aria-hidden="true" />
              <div className="relative mx-auto max-w-2xl">
                <LocalizedServiceText kind="nextStep" className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-[#93C5FD]" />
                <LocalizedServiceText as="h2" kind="buildGrowthInfrastructure" className="mt-3 font-display text-2xl font-semibold tracking-tight text-white md:text-3xl" />
                <LocalizedServiceText as="p" kind="shareProductMarketsConstraints" className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]" />
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                  <Link href="/contact" className="sigma-framer-liquid-button inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55">
                    {document.primaryCta ?? <LocalizedServiceText kind="talkToSigma" />}
                  </Link>
                  <Link href="/services" className="sigma-framer-liquid-button inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#1c39bb]/45 hover:bg-[#1c39bb]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55">
                    <LocalizedServiceText kind="exploreAllServices" />
                  </Link>
                </div>
              </div>
            </section>
            </article>
          </div>
        </div>
      </InnerPageShell>
    </>
  );
}
