import { GlassDivider, GlassSurface } from "@/components/internal/glass/Glass";
import { SigmaFeedItem } from "@/components/internal/feed/SigmaFeedItem";
import type { InternalFeedItem } from "@/lib/internal/types";

export function SigmaFeed({ items }: { items: InternalFeedItem[] }) {
  return (
    <section aria-label="Internal SIGMA feed" className="space-y-6">
      <header className="px-5 pt-2 sm:px-1">
        <p className="font-display text-[10px] uppercase tracking-[0.32em] text-[#bde0fe]/80">
          Internal / Team space
        </p>
        <h1 className="mt-3 font-display text-[2.15rem] font-medium leading-none tracking-[0.08em] text-white sm:text-[2.45rem]">
          SIGMA
        </h1>
        <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-cadet">
          Events, news, notes, and updates for the people inside Sigma.
        </p>
      </header>

      <GlassSurface className="rounded-none sm:rounded-[1.75rem]">
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
