import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/global/marketing/teamContent";
import { ProfileContentPlaceholder } from "@/components/site/marketing/ProfileContentPlaceholder";

type Props = {
  member: TeamMember;
  previousMember: { name: string; slug: string };
  nextMember: { name: string; slug: string };
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SG";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

function getGroupLabel(group: TeamMember["group"]): string {
  if (group === "core") return "Core Team";
  if (group === "innerCircle") return "Inner Circle";
  return "Contributors";
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-5 sm:p-6 lg:p-7">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{children}</div>
    </section>
  );
}

function safeUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return null;
}

export function TeamMemberProfilePageView({ member, previousMember, nextMember }: Props) {
  const initials = member.initials ?? initialsFromName(member.name);
  const role = member.role ?? "Team Member";
  const groupLabel = getGroupLabel(member.group);
  const portrait = member.portrait ?? member.imageSrc;
  const shortIntro = member.shortBio ?? member.bio;
  const fullOverview = member.fullBio;
  const linkedin = safeUrl(member.linkedin);
  const website = safeUrl(member.website);
  const socialLinks = [
    ...(linkedin ? [{ label: "LinkedIn", href: linkedin }] : []),
    ...(website ? [{ label: "Website", href: website }] : []),
    ...((member.socialLinks ?? []).filter((item) => /^https?:\/\//.test(item.href))),
  ];
  const quote = member.quote?.trim();
  const hasTimeline = (member.careerHistory?.length ?? 0) > 0;
  const hasAchievements = (member.achievements?.length ?? 0) > 0;
  const hasMarkets = (member.markets?.length ?? 0) > 0;
  const hasLanguages = (member.languages?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-10">
      {/* Section A — Hero with breadcrumb */}
      <nav className="mb-6 text-xs text-[#9aa4af]" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-[#5f6a77]">
            &gt;
          </li>
          <li>
            <Link href="/team" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white">
              Team
            </Link>
          </li>
          <li aria-hidden className="text-[#5f6a77]">
            &gt;
          </li>
          <li className="text-white" aria-current="page">
            {member.name}
          </li>
        </ol>
      </nav>

      <section className="rounded-3xl border border-white/[0.1] bg-[#070b14]/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-8 lg:p-10">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1c39bb]">Sigma Team</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{member.name}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-[#93a2b7]">{role}</p>
            <p className="mt-2 inline-flex rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#c7cfda]">
              {groupLabel}
            </p>
            {shortIntro ? (
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base">{shortIntro}</p>
            ) : (
              <ProfileContentPlaceholder label="Details to be added" lines={3} className="mt-5 max-w-3xl" />
            )}
          </div>

          <div className="mx-auto w-full max-w-[220px]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.12] bg-[#101523]">
              {portrait ? (
                <Image src={portrait} alt={member.name} fill className="object-cover" sizes="220px" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-[#c9d9ff]">
                  {initials}
                </span>
              )}
            </div>
            <div className="mt-3 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#7f8a97]">
              Profile status: {member.profileStatus ?? "draft"}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-5">
        {/* Section B — Profile Overview */}
        <Section title="Profile Overview">
          {fullOverview ? (
            <p>{fullOverview}</p>
          ) : (
            <ProfileContentPlaceholder label="Profile details pending" lines={4} />
          )}
        </Section>

        {/* Section C — Expertise */}
        <Section title="Expertise">
          {member.expertise?.length ? (
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((item) => (
                <span key={item} className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs text-[#c8d0db]">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <ProfileContentPlaceholder label="Profile data pending" pills={8} />
          )}
        </Section>

        {/* Section D — Career Timeline */}
        <Section title="Career Timeline">
          {hasTimeline ? (
            <ol className="relative space-y-4 border-l border-white/[0.12] pl-5">
              {member.careerHistory!.map((entry, index) => (
                <li key={`${entry.role ?? "role"}-${entry.organization ?? "org"}-${index}`} className="relative">
                  <span aria-hidden className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#9bb4ff]" />
                  {entry.dateRange ? <p className="text-xs uppercase tracking-[0.12em] text-[#8e98a8]">{entry.dateRange}</p> : null}
                  {(entry.role || entry.organization) ? (
                    <p className="text-sm font-medium text-white">
                      {[entry.role, entry.organization].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                  {entry.description ? <p className="mt-1 text-sm text-[#b6bcc4]">{entry.description}</p> : null}
                </li>
              ))}
            </ol>
          ) : (
            <ProfileContentPlaceholder label="Details to be added" blocks={3} />
          )}
        </Section>

        {/* Section E — Selected Achievements */}
        <Section title="Selected Achievements">
          {hasAchievements ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {member.achievements!.map((item, index) => (
                <article key={`${item.title ?? "achievement"}-${index}`} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                  {item.year ? <p className="text-xs uppercase tracking-[0.12em] text-[#8e98a8]">{item.year}</p> : null}
                  {item.title ? <h3 className="mt-1 text-sm font-semibold text-white">{item.title}</h3> : null}
                  {item.description ? <p className="mt-1 text-sm text-[#b6bcc4]">{item.description}</p> : null}
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[#9bb4ff]">
                      View detail
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <ProfileContentPlaceholder label="Profile data pending" blocks={4} />
          )}
        </Section>

        {/* Section F — Markets and Languages */}
        <div className="grid gap-5 lg:grid-cols-2">
          <Section title="Markets / Regions">
            {hasMarkets ? (
              <div className="flex flex-wrap gap-2">
                {member.markets!.map((item) => (
                  <span key={item} className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs text-[#c8d0db]">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <ProfileContentPlaceholder label="Details to be added" pills={5} />
            )}
          </Section>
          <Section title="Languages">
            {hasLanguages ? (
              <div className="flex flex-wrap gap-2">
                {member.languages!.map((item) => (
                  <span key={item} className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs text-[#c8d0db]">
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <ProfileContentPlaceholder label="Profile data pending" pills={4} />
            )}
          </Section>
        </div>

        {/* Section G — Quote / Personal Note */}
        <Section title="Quote / Personal Note">
          {quote ? (
            <blockquote className="border-l-2 border-[#6f8ee6] pl-4 text-[#d3d9e2]">
              &ldquo;{quote}&rdquo;
            </blockquote>
          ) : (
            <ProfileContentPlaceholder label="Profile details pending" lines={2} />
          )}
        </Section>

        {/* Section H — Social and Professional Links */}
        <Section title="Social and Professional Links">
          {socialLinks.length ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {socialLinks.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-sm text-[#c8d7ff] transition-colors hover:bg-white/[0.06]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {["LinkedIn", "Website", "Social Link", "Social Link"].map((label, index) => (
                <button
                  key={`${label}-${index}`}
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="cursor-not-allowed rounded-lg border border-dashed border-white/[0.14] bg-white/[0.02] px-3 py-2 text-sm text-[#788292]"
                >
                  {label} (pending)
                </button>
              ))}
            </div>
          )}
        </Section>

        {/* Section I — Sigma CTA */}
        <section className="rounded-2xl border border-[#1c39bb]/30 bg-[#0a1226]/65 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-white">Work with Sigma</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-[#1c39bb]/55 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30"
            >
              Partner with Sigma
            </Link>
            <Link
              href="/team"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/[0.08]"
            >
              Back to Team
            </Link>
          </div>
        </section>

        {/* Section J — Member Navigation */}
        <section className="rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-5 sm:p-6">
          <h2 className="font-display text-lg font-semibold text-white">Member Navigation</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/team/${previousMember.slug}`}
              className="rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-sm text-[#b6bcc4] transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c]"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-[#8f98a3]">Previous</span>
              <span className="mt-1 block font-medium text-white">{previousMember.name}</span>
            </Link>
            <Link
              href={`/team/${nextMember.slug}`}
              className="rounded-xl border border-white/[0.1] bg-white/[0.02] px-4 py-3 text-sm text-[#b6bcc4] transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c]"
            >
              <span className="block text-xs uppercase tracking-[0.12em] text-[#8f98a3]">Next</span>
              <span className="mt-1 block font-medium text-white">{nextMember.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
