"use client";

import type { InsightContentBlock } from "@/content/insights";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeHeading, localeNav } from "@/lib/localeTypography";
import { ArticleCTA } from "./ArticleCTA";
import { InsightBlock } from "./InsightBlock";

export function ArticleBody({ content }: { content: InsightContentBlock[] }) {
  const { lang } = useLanguage();
  return (
    <div className="mx-auto max-w-2xl px-3 sm:px-4 md:px-0">
      {content.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const level = block.level ?? 2;
            if (level === 3) {
              return (
                <h3
                  key={i}
                  className={`font-display mt-8 text-base font-semibold uppercase tracking-[0.08em] text-[#e9ecef] text-balance sm:mt-10 sm:text-lg md:text-xl ${localeNav(lang)}`}
                >
                  {block.content}
                </h3>
              );
            }
            return (
              <h2
                key={i}
                className={`font-display mt-10 scroll-mt-28 text-xl font-semibold uppercase leading-tight tracking-tight text-[#f8f9fa] text-balance first:mt-0 sm:mt-14 sm:text-2xl sm:leading-tight md:text-[1.65rem] ${localeHeading(lang)}`}
              >
                {block.content}
              </h2>
            );
          }
          case "paragraph":
            return (
              <p
                key={i}
                className={`mt-5 text-[0.95rem] leading-[1.75] text-[#ced4da] text-pretty first:mt-0 sm:mt-6 sm:text-base md:text-[17px] ${localeBody(lang)}`}
              >
                {block.content}
              </p>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mt-6 list-none space-y-3 border-l-2 border-[#1c39bb]/50 ps-4 text-[#ced4da] sm:ps-6"
              >
                {block.items.map((item, j) => (
                  <li key={j} className="text-base leading-relaxed sm:text-[17px]">
                    <span className="me-2 text-[#bde0fe]">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "insight":
            return <InsightBlock key={i} content={block.content} />;
          case "cta":
            return (
              <ArticleCTA
                key={i}
                slot={block.slot}
                href={block.href}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
