import type { ServiceV2Content } from "@/content/services/v2/types";
import { ServiceV2Eyebrow, ServiceV2LinkCta, v2Type } from "./ServiceV2Primitives";

export function ServiceV2Hero({ content }: { content: ServiceV2Content["hero"] }) {
  const { title, titleHighlight } = content;
  const highlightIndex = titleHighlight ? title.lastIndexOf(titleHighlight) : -1;
  const before = highlightIndex >= 0 ? title.slice(0, highlightIndex) : title;
  const highlight = highlightIndex >= 0 ? titleHighlight : null;

  return (
    <section id="hero" className="relative z-[1] overflow-hidden" aria-labelledby="hero-heading">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(92%_88%_at_12%_18%,rgba(5,7,14,0.94),rgba(5,7,14,0.62)_40%,rgba(5,7,14,0.22)_68%,transparent_84%)] max-md:bg-[linear-gradient(180deg,rgba(5,7,14,0.9)_0%,rgba(5,7,14,0.78)_58%,rgba(5,7,14,0.5)_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] bg-[radial-gradient(90%_85%_at_82%_46%,rgba(5,7,14,0.86),rgba(5,7,14,0.28)_58%,transparent_78%)] md:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1720px] gap-12 px-4 pb-16 pt-28 sm:px-5 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,0.85fr)] md:items-end md:gap-16 md:px-6 md:pb-24 md:pt-32 lg:px-10 lg:pb-28">
        <div className="relative min-w-0">
          <div
            className="pointer-events-none absolute -inset-x-4 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_18%_22%,rgba(5,7,14,0.92)_0%,rgba(5,7,14,0.55)_46%,transparent_74%)] sm:-inset-x-8"
            aria-hidden="true"
          />
          <ServiceV2Eyebrow>{content.eyebrow}</ServiceV2Eyebrow>
          <h1 id="hero-heading" className={`mt-5 max-w-[18ch] ${v2Type.h1}`}>
            {before}
            {highlight ? <em className="not-italic text-[#dcecff]">{highlight}</em> : null}
          </h1>
          <p className={`mt-6 ${v2Type.lead}`}>{content.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ServiceV2LinkCta href={content.primaryCta.href} label={content.primaryCta.label} />
            {content.secondaryCta ? (
              <ServiceV2LinkCta
                href={content.secondaryCta.href}
                label={content.secondaryCta.label}
                variant="ghost"
              />
            ) : null}
          </div>
          <ul className="mt-8 flex flex-col gap-2.5">
            {content.microTrust.map((item) => (
              <li key={item} className={`${v2Type.meta} text-[#c5d4ee]`}>
                {item}
              </li>
            ))}
          </ul>
          <p className={`mt-6 ${v2Type.muted}`}>{content.trustLine}</p>
        </div>

        <aside
          className="relative border-t border-white/22 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0"
          aria-label={content.walkAwayTitle}
        >
          <div
            className="pointer-events-none absolute -inset-y-6 -left-4 -right-2 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,rgba(5,7,14,0.88)_0%,rgba(5,7,14,0.42)_52%,transparent_76%)]"
            aria-hidden="true"
          />
          <p className={v2Type.meta}>{content.walkAwayTitle}</p>
          <ol className="mt-5 space-y-4">
            {content.walkAway.map((item, index) => (
              <li key={item} className={`flex gap-4 ${v2Type.body}`}>
                <span className={`${v2Type.meta} mt-0.5 shrink-0`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
