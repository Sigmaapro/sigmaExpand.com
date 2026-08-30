import type { InternalFeedItem, InternalFeedType } from "@/lib/internal/types";

const TYPE_LABEL: Record<InternalFeedType, string> = {
  event: "Event",
  news: "News",
  blog: "Blog",
  update: "Update",
};

function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function SigmaFeedItem({ item }: { item: InternalFeedItem }) {
  const meta: string[] = [TYPE_LABEL[item.type], formatDate(item.date)];
  if (item.type === "event") {
    meta.push(item.whenLabel);
    if (item.location) meta.push(item.location);
  } else if (item.author) {
    meta.push(item.author);
  }

  const inner = (
    <>
      <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#bde0fe]/75">
        {TYPE_LABEL[item.type]}
        {item.priority === "high" ? " · Now" : ""}
      </p>
      <h2 className="mt-2 font-display text-[1.2rem] font-medium leading-snug tracking-tight text-white">
        {item.title}
      </h2>
      <p className="mt-2 text-[15px] leading-[1.6] text-cadet">{item.excerpt}</p>
      <p className="mt-3 text-[12px] leading-relaxed text-cadet/70">{meta.slice(1).join(" · ")}</p>
    </>
  );

  const className =
    "relative block px-5 py-7 outline-none transition-colors duration-200 sm:px-8 lg:px-10 focus-visible:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#bde0fe]/30";

  if (item.href) {
    return (
      <article>
        <a href={item.href} className={`${className} hover:bg-white/[0.03]`}>
          {inner}
        </a>
      </article>
    );
  }

  return <article className={className}>{inner}</article>;
}
