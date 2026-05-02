import type { Metadata } from "next";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { teamPageContent, teamPageMeta } from "@/content/pages/team";

export const metadata: Metadata = {
  title: teamPageMeta.title,
  description: teamPageMeta.description,
};

export default function TeamPage() {
  const c = teamPageContent;
  return (
    <InnerPageShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">
            {c.kicker}
          </p>
          <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {c.headline}
          </h1>
          <p className="mx-auto mt-5 text-sm leading-relaxed text-[#b6bcc4] md:text-base">
            {c.intro}
          </p>
        </header>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {c.members.map((m) => (
            <li
              key={m.name}
              className="rounded-2xl border border-white/[0.08] bg-[#07090f]/60 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
            >
              <h2 className="font-display text-lg font-semibold text-white">{m.name}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#1c39bb]">
                {m.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#b6bcc4]">{m.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </InnerPageShell>
  );
}
