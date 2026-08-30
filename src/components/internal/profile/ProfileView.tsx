import Link from "next/link";
import { GlassButton, GlassChip, GlassDivider, GlassSurface } from "@/components/internal/glass/Glass";
import { groupLabel } from "@/lib/internal/profile-mapper";
import type { EditableProfile } from "@/lib/internal/types";

function socialEntries(profile: EditableProfile): Array<{ label: string; href: string }> {
  const items: Array<{ label: string; href: string }> = [];
  if (profile.linkedin.trim()) items.push({ label: "LinkedIn", href: profile.linkedin.trim() });
  if (profile.x.trim()) items.push({ label: "X", href: profile.x.trim() });
  if (profile.telegram.trim()) items.push({ label: "Telegram", href: profile.telegram.trim() });
  if (profile.instagram.trim()) items.push({ label: "Instagram", href: profile.instagram.trim() });
  if (profile.website.trim()) items.push({ label: "Website", href: profile.website.trim() });
  if (profile.email.trim()) items.push({ label: "Email", href: `mailto:${profile.email.trim()}` });
  for (const extra of profile.otherSocials) {
    if (extra.href.trim() && extra.label.trim()) {
      items.push({ label: extra.label.trim(), href: extra.href.trim() });
    }
  }
  return items;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-[10px] uppercase tracking-[0.26em] text-[#bde0fe]/75">{title}</h2>
      {children}
    </section>
  );
}

export function ProfileView({
  profile,
  imagePreview,
  onEdit,
}: {
  profile: EditableProfile;
  imagePreview: string | null;
  onEdit: () => void;
}) {
  const photo = imagePreview || profile.imageSrc;
  const location = [profile.locationCity, profile.locationCountry].filter(Boolean).join(", ");
  const socials = socialEntries(profile);
  const statusLabel = profile.profileStatus ?? "draft";

  return (
    <article className="internal-profile-enter space-y-4 sm:space-y-5">
      <GlassSurface className="rounded-2xl sm:rounded-[1.75rem]">
        <div className="grid gap-4 px-4 py-5 sm:gap-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(15rem,0.92fr)_1.2fr] lg:gap-12 lg:px-12 lg:py-11">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
              <div
                aria-hidden="true"
                className="absolute -inset-1.5 rounded-full bg-[radial-gradient(circle,rgba(189,224,254,0.18)_0%,transparent_68%)] sm:-inset-2"
              />
              <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={`${profile.displayName} portrait`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-xl tracking-[0.12em] text-white sm:text-2xl">
                    {profile.initials}
                  </div>
                )}
              </div>
            </div>

            <p className="mt-3.5 font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80 sm:mt-5 sm:tracking-[0.32em]">
              Profile
            </p>
            <h1 className="mt-1.5 w-full break-words font-display text-[1.7rem] font-medium leading-[1.05] tracking-tight text-white sm:mt-2.5 sm:text-[2.35rem]">
              {profile.displayName}
            </h1>
            {profile.role ? (
              <p className="mt-2 max-w-md text-[14px] leading-snug text-cadet sm:mt-2.5 sm:text-[15px]">
                {profile.role}
              </p>
            ) : null}

            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:mt-4 sm:gap-2 lg:justify-start">
              <GlassChip>{groupLabel(profile.group)}</GlassChip>
              <GlassChip className="capitalize">{statusLabel}</GlassChip>
              {location ? <GlassChip>{location}</GlassChip> : null}
            </div>

            <div className="mx-auto mt-3 flex w-[86%] max-w-[20.5rem] flex-col items-stretch gap-1.5 sm:mx-0 sm:mt-6 sm:w-full sm:max-w-xs lg:max-w-none">
              <GlassButton
                type="button"
                className="internal-profile-action h-12 min-h-12 w-full px-4 text-[10px] tracking-[0.12em] sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
                onClick={onEdit}
              >
                Edit profile
              </GlassButton>
              <Link
                href={profile.publicHref}
                target="_blank"
                rel="noreferrer"
                className="glass-button glass-button-secondary internal-profile-action h-12 min-h-12 w-full px-4 text-[10px] tracking-[0.12em] sm:px-5 sm:text-[11px] sm:tracking-[0.18em]"
              >
                View public profile
              </Link>
            </div>
          </div>

          <div className="min-w-0 space-y-4 sm:space-y-7 lg:border-l lg:border-white/[0.08] lg:pl-12">
            <GlassDivider className="lg:hidden" />

            {profile.shortBio ? (
              <Section title="About">
                <p className="max-w-2xl text-[15px] leading-[1.55] text-white/90">{profile.shortBio}</p>
              </Section>
            ) : null}

            {profile.status ? (
              <Section title="Quote">
                <p className="max-w-2xl text-[16px] leading-relaxed text-white/90">“{profile.status}”</p>
              </Section>
            ) : null}

            {profile.expertise.length > 0 ? (
              <Section title="Expertise">
                <ul className="flex flex-wrap gap-2">
                  {profile.expertise.map((item) => (
                    <li key={item}>
                      <GlassChip>{item}</GlassChip>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {profile.languages.length > 0 ? (
              <Section title="Languages">
                <ul className="flex flex-wrap gap-2">
                  {profile.languages.map((item) => (
                    <li key={item}>
                      <GlassChip>{item}</GlassChip>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {socials.length > 0 ? (
              <Section title="Social">
                <ul className="space-y-2">
                  {socials.map((item) => (
                    <li key={`${item.label}-${item.href}`}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[14px] text-white underline decoration-white/20 underline-offset-4 transition-colors hover:decoration-[#bde0fe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bde0fe]/40"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {profile.attachments.length > 0 ? (
              <Section title="Files">
                <ul className="space-y-1 text-[14px] text-cadet">
                  {profile.attachments.map((file) => (
                    <li key={file.id}>
                      {file.name} · local only
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            <p className="pt-1 text-[12px] leading-relaxed text-cadet/70">
              Showing your saved team profile. Changes are not published to the public SIGMA website.
            </p>
          </div>
        </div>
      </GlassSurface>
    </article>
  );
}
