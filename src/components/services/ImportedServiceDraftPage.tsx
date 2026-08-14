import Link from "next/link";
import type { ImportedServiceBlock, ImportedServiceDocument } from "@/content/services/importedFinalServiceDocuments";
import { LocalizedFinalServiceTitle, LocalizedServiceText } from "@/components/services/LocalizedServiceText";
import { useLanguage } from "@/context/LanguageContext";

function renderBlocks(blocks: readonly ImportedServiceBlock[]) {
  const nodes: React.ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index]!;

    if (block.type === "list") {
      const ordered = block.ordered;
      const items: string[] = [block.text];
      while (index + 1 < blocks.length) {
        const next = blocks[index + 1]!;
        if (next.type !== "list" || next.ordered !== ordered) break;
        index += 1;
        items.push(next.text);
      }
      const ListTag = ordered ? "ol" : "ul";
      nodes.push(
        <ListTag
          key={`list-${index}`}
          className={
            ordered
              ? "list-decimal space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]"
              : "list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]"
          }
        >
          {items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{item}</li>
          ))}
        </ListTag>,
      );
      index += 1;
      continue;
    }

    if (block.type === "heading") {
      if (block.level === 2) {
        nodes.push(
          <h2
            key={`h2-${index}`}
            className="scroll-mt-28 border-t border-white/[0.08] pt-10 font-display text-2xl font-semibold tracking-tight text-white text-balance md:pt-12 md:text-3xl"
          >
            {block.text}
          </h2>,
        );
      } else if (block.level === 3) {
        nodes.push(
          <h3
            key={`h3-${index}`}
            className="pt-2 font-display text-lg font-semibold tracking-tight text-white md:text-xl"
          >
            {block.text}
          </h3>,
        );
      } else {
        nodes.push(
          <h1
            key={`h1-${index}`}
            className="font-display text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl"
          >
            {block.text}
          </h1>,
        );
      }
      index += 1;
      continue;
    }

    if (block.type === "table") {
      nodes.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07090f]/55">
          <table className="min-w-full border-collapse text-left text-sm text-[#b6bcc4]">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.12em] text-[#d8dde3]">
              <tr>
                {block.headers.map((header, headerIndex) => (
                  <th key={`h-${headerIndex}`} className="border-b border-white/[0.08] px-4 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`r-${rowIndex}`} className="border-b border-white/[0.06] last:border-b-0">
                  {row.map((cell, cellIndex) => (
                    <td key={`c-${rowIndex}-${cellIndex}`} className="whitespace-pre-line px-4 py-3 align-top leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      index += 1;
      continue;
    }

    nodes.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
        {block.text}
      </p>,
    );
    index += 1;
  }

  return nodes;
}

/**
 * Temporary draft renderer for imported client DOCX content.
 * Simple readable layout only — not the final service-page design.
 * Implementation notes are intentionally not rendered.
 */
export function ImportedServiceDraftPage({ document }: { document: ImportedServiceDocument }) {
  const { language } = useLanguage();

  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <article className="mx-auto max-w-4xl">
          <header className="border-b border-white/[0.08] pb-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl">
              {language === "EN" ? document.title : <LocalizedFinalServiceTitle slug={document.finalSlug} />}
            </h1>
          </header>

          <div className="mt-10 space-y-5">{renderBlocks(document.blocks)}</div>

          {(document.primaryCta || document.secondaryCta) && (
            <section className="mt-12 space-y-3 border-t border-white/[0.08] pt-8" aria-labelledby="service-calls-to-action">
              <LocalizedServiceText id="service-calls-to-action" kind="callsToAction" className="sr-only" as="h2" />
              {document.primaryCta ? (
                <p className="text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                  <Link
                    href="/contact"
                    className="font-semibold text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-[#bde0fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
                  >
                    {language === "EN" ? document.primaryCta : <LocalizedServiceText kind="talkToSigma" />}
                  </Link>
                </p>
              ) : null}
              {document.secondaryCta ? (
                <p className="text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{document.secondaryCta}</p>
              ) : null}
            </section>
          )}
        </article>
      </div>
    </div>
  );
}
