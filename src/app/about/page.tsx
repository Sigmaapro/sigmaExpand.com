import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { aboutPageContent, aboutPageMeta } from "@/content/pages/about";

export const metadata: Metadata = {
  title: aboutPageMeta.title,
  description: aboutPageMeta.description,
};

export default function AboutPage() {
  const c = aboutPageContent;
  return (
    <InnerPageShell>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <header className="text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {c.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.headline}
          </h1>
        </header>

        <section className="mt-14">
          <h2 className="font-display text-lg font-semibold text-white">{c.story.title}</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-white">{c.mission.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.mission.body}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-lg font-semibold text-white">{c.positioning.title}</h2>
          <ul className="mt-5 list-disc space-y-3 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
            {c.positioning.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      </article>
    </InnerPageShell>
  );
}
