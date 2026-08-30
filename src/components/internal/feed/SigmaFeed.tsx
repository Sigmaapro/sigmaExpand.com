import { GlassDivider, GlassSurface } from "@/components/internal/glass/Glass";
import { SigmaFeedItem } from "@/components/internal/feed/SigmaFeedItem";
import type { InternalFeedItem } from "@/lib/internal/types";

export function SigmaFeed({ items }: { items: InternalFeedItem[] }) {
  return (
    <section aria-label="Internal SIGMA feed" className="space-y-4 sm:space-y-6">
      <header className="px-0 pt-1 sm:px-1 sm:pt-2">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80 sm:tracking-[0.32em]">
          Internal / Team space
        </p>
        <h1 className="mt-2 font-display text-[1.85rem] font-medium leading-none tracking-[0.08em] text-white sm:mt-3 sm:text-[2.45rem]">
          SIGMA
        </h1>
        <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-cadet sm:mt-4 sm:text-[15px]">
          Events, news, notes, and updates for the people inside Sigma.
        </p>
      </header>

      <GlassSurface className="rounded-2xl sm:rounded-[1.75rem]">
        <div>
          {items.map((item, index) => (
            <div key={item.id}>
              {index > 0 ? <GlassDivider /> : null}
              <SigmaFeedItem item={item} />
            </div>
          ))}
        </div>
      </GlassSurface>
    </section>
  );
}
