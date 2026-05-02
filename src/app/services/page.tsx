import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { servicesPageContent, servicesPageMeta } from "@/content/pages/services";

export const metadata: Metadata = {
  title: servicesPageMeta.title,
  description: servicesPageMeta.description,
};

export default function ServicesPage() {
  const c = servicesPageContent;
  return (
    <InnerPageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {c.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.headline}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#b6bcc4] md:text-base">
            {c.intro}
          </p>
        </header>

        <div className="mt-14 space-y-12">
          {c.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-28 rounded-2xl border border-white/[0.08] bg-[#07090f]/60 p-6 sm:p-8"
            >
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1c39bb]">
                {s.eyebrow}
              </p>
              <h2 className="font-display mt-2 text-xl font-semibold text-white md:text-2xl">
                {s.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                {s.description}
              </p>
              <ul className="mt-6 list-disc space-y-2.5 ps-5 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">
                {s.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </InnerPageShell>
  );
}
