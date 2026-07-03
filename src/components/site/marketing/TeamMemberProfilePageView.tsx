import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/content/global/marketing/teamContent";

type Props = {
  member: TeamMember;
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
    <section className="rounded-2xl border border-white/[0.08] bg-[#07090f]/65 p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{children}</div>
    </section>
  );
}

export function TeamMemberProfilePageView({ member }: Props) {
  const initials = member.initials ?? initialsFromName(member.name);
  const role = member.role ?? "Team Member";
  const groupLabel = getGroupLabel(member.group);
  const socialLinks = [
    ...(member.linkedin ? [{ label: "LinkedIn", href: member.linkedin }] : []),
    ...(member.socialLinks ?? []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-10">
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
            {member.shortBio ? <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#b6bcc4] md:text-base">{member.shortBio}</p> : null}
          </div>

          <div className="mx-auto w-full max-w-[220px]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.12] bg-[#101523]">
              {member.imageSrc ? (
                <Image src={member.imageSrc} alt={member.name} fill className="object-cover" sizes="220px" />
              ) : (
                <span className="flex h-full w-full items-center justify-center font-display text-4xl font-semibold uppercase tracking-[0.08em] text-[#c9d9ff]">
                  {initials}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-5">
        {member.fullBio ? <Section title="Full Bio">{member.fullBio}</Section> : null}
        {!member.fullBio && member.bio ? <Section title="Profile">{member.bio}</Section> : null}

        {member.expertise?.length ? (
          <Section title="Expertise">
            <ul className="list-disc space-y-2 pl-5">
              {member.expertise.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {member.careerHistory?.length ? (
          <Section title="Career History">
            <ul className="list-disc space-y-2 pl-5">
              {member.careerHistory.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {member.achievements?.length ? (
          <Section title="Achievements">
            <ul className="list-disc space-y-2 pl-5">
              {member.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {member.location ? <Section title="Location">{member.location}</Section> : null}

        {member.languages?.length ? (
          <Section title="Languages">
            <ul className="list-disc space-y-2 pl-5">
              {member.languages.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Section>
        ) : null}

        {socialLinks.length ? (
          <Section title="Links">
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9bb4ff] underline-offset-2 transition-colors hover:text-[#bfd0ff] hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
      </div>
    </div>
  );
}
