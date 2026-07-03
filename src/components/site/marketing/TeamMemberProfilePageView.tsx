"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGlobe, FaInstagram, FaLinkedinIn, FaLink, FaXTwitter } from "react-icons/fa6";
import { getAllTeamMembers, getTeamMemberSlug, type TeamMember } from "@/content/global/marketing/teamContent";
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

function SectionFrame({
  number,
  title,
  subtitle,
  children,
  className = "",
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const primaryGlass =
    "border border-[#9ab0d8]/20 bg-[linear-gradient(155deg,rgba(10,18,33,0.62),rgba(8,14,25,0.58))] shadow-[0_24px_65px_rgba(0,0,0,0.34),0_0_0_1px_rgba(162,189,255,0.08)_inset,0_0_36px_rgba(56,96,190,0.14)] backdrop-blur-[20px]";
  return (
    <section
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${primaryGlass} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(198,214,255,0.06),transparent_35%,transparent_100%)]" />
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#88a8ff]">{number}</p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#8090a8]">{subtitle}</p> : null}
        </div>
      </div>
      <div className="text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{children}</div>
    </section>
  );
}

function safeUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  return null;
}

function isPlaceholderImage(src?: string | null): boolean {
  return Boolean(src && src.includes("/images/team/placeholders/member-placeholder-"));
}

function countryCodeToFlag(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

type SocialIconKey = "x" | "instagram" | "linkedin" | "website" | "generic";

function getSocialIconKey(label: string, href: string): SocialIconKey {
  const normalizedLabel = label.toLowerCase();
  const normalizedHref = href.toLowerCase();
  if (normalizedLabel === "x" || normalizedHref.includes("x.com") || normalizedHref.includes("twitter.com")) return "x";
  if (normalizedLabel.includes("instagram") || normalizedHref.includes("instagram.com")) return "instagram";
  if (normalizedLabel.includes("linkedin") || normalizedHref.includes("linkedin.com")) return "linkedin";
  if (normalizedLabel.includes("website")) return "website";
  return "generic";
}

function getSocialPlatformName(key: SocialIconKey, fallbackLabel: string): string {
  if (key === "x") return "X";
  if (key === "instagram") return "Instagram";
  if (key === "linkedin") return "LinkedIn";
  if (key === "website") return "Website";
  return fallbackLabel;
}

const SOCIAL_ICON_MAP: Record<SocialIconKey, React.ComponentType<{ className?: string }>> = {
  x: FaXTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  website: FaGlobe,
  generic: FaLink,
};

export function TeamMemberProfilePageView({ member, previousMember, nextMember }: Props) {
  const primaryGlass =
    "border border-[#9ab0d8]/20 bg-[linear-gradient(155deg,rgba(10,18,33,0.62),rgba(8,14,25,0.58))] shadow-[0_24px_65px_rgba(0,0,0,0.34),0_0_0_1px_rgba(162,189,255,0.08)_inset,0_0_36px_rgba(56,96,190,0.14)] backdrop-blur-[20px]";
  const secondaryGlass =
    "border border-[#8ea4cd]/16 bg-[linear-gradient(155deg,rgba(9,14,25,0.56),rgba(8,13,23,0.52))] shadow-[0_14px_38px_rgba(0,0,0,0.28),0_0_0_1px_rgba(170,195,250,0.06)_inset,0_0_24px_rgba(56,94,176,0.1)] backdrop-blur-[16px]";
  const microSurface = "border border-white/[0.14] bg-[rgba(18,25,40,0.62)]";
  const allMembers = getAllTeamMembers();
  const initials = member.initials ?? initialsFromName(member.name);
  const role = member.role ?? "Team Member";
  const headline = member.headline;
  const groupLabel = getGroupLabel(member.group);
  const profileSlug = getTeamMemberSlug(member);
  const memberIndex = allMembers.findIndex((item) => getTeamMemberSlug(item) === profileSlug);
  const profileIndex = memberIndex >= 0 ? String(memberIndex + 1).padStart(2, "0") : "00";
  const totalProfiles = String(allMembers.length).padStart(2, "0");
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
  const [hasPortraitError, setHasPortraitError] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const hasPortrait = Boolean(portrait && !hasPortraitError);
  const portraitAlt = portrait && isPlaceholderImage(portrait) ? "" : member.name;
  const locationLabel = member.location ? `${countryCodeToFlag(member.location.countryCode)} ${[member.location.city, member.location.country].filter(Boolean).join(", ")}` : null;
  const socialIconLinks = socialLinks.map((item) => {
    const iconKey = getSocialIconKey(item.label, item.href);
    return {
      ...item,
      iconKey,
      platformName: getSocialPlatformName(iconKey, item.label),
    };
  });

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduceMotionQuery.matches || !desktopQuery.matches || !finePointerQuery.matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      element.style.setProperty("--mx", currentX.toFixed(2));
      element.style.setProperty("--my", currentY.toFixed(2));
      rafId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, normalizedX)) * 8;
      targetY = Math.max(-1, Math.min(1, normalizedY)) * 8;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    rafId = window.requestAnimationFrame(animate);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(rafId);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      element.style.removeProperty("--mx");
      element.style.removeProperty("--my");
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(32,73,180,0.18),transparent_40%),radial-gradient(circle_at_90%_15%,rgba(86,130,255,0.14),transparent_35%),linear-gradient(180deg,#05070e_0%,#070b14_45%,#05070e_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(171,189,237,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(171,189,237,0.3)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute left-1/2 top-0 h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[#1d4adb]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <nav className="mb-8 text-xs text-[#9aa4af]" aria-label="Breadcrumb">
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

        <section ref={heroRef} className={`relative overflow-hidden rounded-[30px] p-6 sm:p-8 lg:p-10 ${primaryGlass}`}>
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-[52%] bg-[radial-gradient(circle_at_75%_25%,rgba(86,130,255,0.18),transparent_56%)] motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -1px), calc(var(--my, 0) * -1px), 0)" }}
          />
          <div
            className="pointer-events-none absolute -right-12 top-12 h-[320px] w-[320px] rounded-full border border-[#84a8ff]/20 motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -0.8px), calc(var(--my, 0) * -0.8px), 0)" }}
          />
          <div
            className="pointer-events-none absolute -right-3 bottom-10 h-[150px] w-[150px] rounded-full border border-[#84a8ff]/25 motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -0.7px), calc(var(--my, 0) * -0.7px), 0)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(196,214,255,0.08),transparent_28%,transparent_100%)]" />
          <div
            className="pointer-events-none absolute left-5 top-4 font-display text-[72px] font-bold leading-none text-[#88a8ff]/[0.06] sm:text-[96px]"
            style={{ transform: "translate3d(calc(var(--mx, 0) * 0.45px), calc(var(--my, 0) * 0.45px), 0)" }}
          >
            {initials}
          </div>

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:items-center">
            <div className="min-w-0">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#86a8ff]">SIGMA TEAM</p>
              <h1 className="font-display mt-4 break-words text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {member.name}
              </h1>
              <p className="mt-4 break-words text-sm uppercase tracking-[0.2em] text-[#9db2de]">{role}</p>
              {headline ? <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#d9e3ff]">{headline}</p> : null}
              {shortIntro ? (
                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#b6c2d8] sm:text-base">{shortIntro}</p>
              ) : (
                <ProfileContentPlaceholder label="Details to be added" lines={3} className="mt-5 max-w-2xl" />
              )}

              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-[#86a8ff]/35 bg-[#86a8ff]/18 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#d3deff]">
                  {groupLabel}
                </span>
                {locationLabel ? (
                  <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#c2ccda] ${microSurface}`}>
                    {locationLabel}
                  </span>
                ) : null}
                {hasLanguages ? (
                  member.languages!.map((language) => (
                    <span
                      key={language}
                      className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#abb6c9] ${microSurface}`}
                    >
                      {language}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-dashed border-white/[0.16] bg-[rgba(16,22,35,0.62)] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-[#7f8aa0]">
                    Language data pending
                  </span>
                )}
              </div>

              {socialLinks.length ? (
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {socialIconLinks.map((item) => {
                    const Icon = SOCIAL_ICON_MAP[item.iconKey];
                    return (
                    <li key={`${item.label}-${item.href}`}>
                      <div className="group relative">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open ${member.name} on ${item.platformName}`}
                          title={item.platformName}
                          className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-[#d0dcff] motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#86a8ff]/65 motion-safe:hover:bg-[#86a8ff]/12 motion-safe:hover:shadow-[0_0_18px_rgba(92,136,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09111f] ${microSurface}`}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                        <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-white/[0.14] bg-[rgba(9,13,22,0.92)] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[#b8c6df] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                          {item.platformName}
                        </span>
                      </div>
                    </li>
                  )})}
                </ul>
              ) : null}
            </div>

            <div className="relative mx-auto w-full max-w-[420px]">
              <div
                className="pointer-events-none absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_30%,rgba(90,135,255,0.32),transparent_62%)] blur-xl motion-safe:transition-transform motion-safe:duration-300"
                style={{ transform: "translate3d(calc(var(--mx, 0) * -0.85px), calc(var(--my, 0) * -0.85px), 0)" }}
              />
              <div
                className={`relative overflow-hidden rounded-[30px] px-4 pb-4 pt-16 ${primaryGlass} motion-safe:transition-transform motion-safe:duration-300`}
                style={{
                  transform:
                    "translate3d(calc(var(--mx, 0) * 0.55px), calc(var(--my, 0) * 0.55px), 0) rotateX(calc(var(--my, 0) * -0.03deg)) rotateY(calc(var(--mx, 0) * 0.03deg))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(127,169,255,0.22),transparent_48%)]" />
                <div className="pointer-events-none absolute left-4 top-4 font-mono text-[11px] tracking-[0.24em] text-[#9cb6ff]">
                  {profileIndex} / {totalProfiles}
                </div>
                <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/[0.14] bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#95a3ba]">
                  {member.profileStatus ?? "draft"}
                </div>
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px]">
                  {hasPortrait ? (
                    <Image
                      src={portrait!}
                      alt={portraitAlt}
                      fill
                      className="object-contain object-center motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-reduce:transform-none"
                      sizes="(min-width: 1024px) 360px, 80vw"
                      onError={() => setHasPortraitError(true)}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-6xl font-semibold uppercase tracking-[0.08em] text-[#c9d9ff]">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="pointer-events-none absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-[#9bb4ff]/70 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6">
          <SectionFrame number="01" title="PROFILE OVERVIEW" subtitle="Editorial Brief">
            {fullOverview ? (
              <div className="grid gap-5 md:grid-cols-[92px_minmax(0,1fr)] md:items-start">
                <p className="font-display text-6xl font-semibold leading-none text-[#88a8ff]/30 md:text-7xl">01</p>
                <p className="text-base leading-relaxed text-[#c0cad8]">{fullOverview}</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-[92px_minmax(0,1fr)] md:items-start">
                <p className="font-display text-6xl font-semibold leading-none text-[#88a8ff]/30 md:text-7xl">01</p>
                <ProfileContentPlaceholder label="Profile details pending" lines={4} />
              </div>
            )}
          </SectionFrame>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionFrame number="02" title="SKILLS" subtitle="Core Capabilities">
              {member.skills?.length ? (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {member.skills.map((item, index) => (
                    <article
                      key={item}
                      className={`rounded-2xl p-3.5 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#8cafef]/45 motion-safe:hover:bg-[#8cafef]/10 ${secondaryGlass}`}
                    >
                      <p className="text-[11px] uppercase tracking-[0.16em] text-[#8da5df]">{String(index + 1).padStart(2, "0")}</p>
                      <p className="mt-2 text-sm text-[#d4ddf0]">{item}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <ProfileContentPlaceholder label="Profile data pending" blocks={4} />
              )}
            </SectionFrame>

            <SectionFrame number="03" title="SERVICES" subtitle="Engagement Focus">
              {member.services?.length ? (
                <div className="space-y-2.5">
                  {member.services.map((item, index) => (
                    <div
                      key={item}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-3 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#9fc1ff]/45 ${secondaryGlass}`}
                    >
                      <span className="text-sm text-[#d3ddef]">{item}</span>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[#96aff0]">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ProfileContentPlaceholder label="Profile data pending" lines={4} />
              )}
            </SectionFrame>
          </div>

          <SectionFrame number="04" title="CAREER TIMELINE" subtitle="Trajectory">
            {hasTimeline ? (
              <ol className="relative space-y-5 pl-6 before:absolute before:bottom-0 before:left-[9px] before:top-1 before:w-px before:bg-gradient-to-b before:from-[#7da4ff] before:to-white/10">
                {member.careerHistory!.map((entry, index) => (
                  <li key={`${entry.role ?? "role"}-${entry.organization ?? "org"}-${index}`} className="relative">
                    <span aria-hidden className="absolute -left-[22px] top-1.5 h-3.5 w-3.5 rounded-full border border-[#84a8ff]/60 bg-[#0c172f]" />
                    {entry.dateRange ? <p className="text-[11px] uppercase tracking-[0.14em] text-[#8ca2d3]">{entry.dateRange}</p> : null}
                    {(entry.role || entry.organization) ? (
                      <p className="mt-1 text-base font-medium text-white">{[entry.role, entry.organization].filter(Boolean).join(" · ")}</p>
                    ) : null}
                    {entry.description ? <p className="mt-1 text-sm text-[#b6c0d0]">{entry.description}</p> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <ProfileContentPlaceholder label="Details to be added" blocks={3} />
            )}
          </SectionFrame>

          <SectionFrame number="05" title="SELECTED ACHIEVEMENTS" subtitle="Verified Highlights">
            {hasAchievements ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {member.achievements!.map((item, index) => (
                  <article
                    key={`${item.title ?? "achievement"}-${index}`}
                    className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 ${
                      index === 0 ? "sm:col-span-2" : ""
                    } motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#93b2f8]/45 ${secondaryGlass}`}
                  >
                    <p className="pointer-events-none absolute -right-3 top-1 font-display text-5xl text-[#8ab0ff]/[0.08]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    {item.year ? <p className="text-[11px] uppercase tracking-[0.14em] text-[#8aa0d1]">{item.year}</p> : null}
                    {item.title ? <h3 className="mt-1 text-base font-semibold text-white">{item.title}</h3> : null}
                    {item.description ? <p className="mt-2 text-sm text-[#b6c1d3]">{item.description}</p> : null}
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex rounded-full border border-white/[0.18] px-3 py-1 text-xs text-[#b8cbf5] motion-safe:transition-colors motion-safe:hover:border-[#8dadf4]/55 motion-safe:hover:bg-[#8dadf4]/10"
                      >
                        View detail
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <ProfileContentPlaceholder label="Profile data pending" blocks={4} />
            )}
          </SectionFrame>

          <SectionFrame number="06" title="GLOBAL FOOTPRINT" subtitle="Location / Languages / Markets">
            <div className="grid gap-3 md:grid-cols-3">
              <article className={`rounded-2xl p-4 ${secondaryGlass}`}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8da3d3]">Location</p>
                {locationLabel ? (
                  <p className="mt-2 text-sm text-[#d4dded]">{locationLabel}</p>
                ) : (
                  <ProfileContentPlaceholder label="Details to be added" lines={1} className="mt-2 p-3" />
                )}
              </article>
              <article className={`rounded-2xl p-4 ${secondaryGlass}`}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8da3d3]">Languages</p>
                {hasLanguages ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.languages!.map((item) => (
                      <span key={item} className={`rounded-full px-2.5 py-1 text-xs text-[#cad4e8] ${microSurface}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ProfileContentPlaceholder label="Profile data pending" pills={3} className="mt-2 p-3" />
                )}
              </article>
              <article className={`rounded-2xl p-4 ${secondaryGlass}`}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8da3d3]">Markets / Regions</p>
                {hasMarkets ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {member.markets!.map((item) => (
                      <span key={item} className={`rounded-full px-2.5 py-1 text-xs text-[#cad4e8] ${microSurface}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ProfileContentPlaceholder label="Details to be added" pills={4} className="mt-2 p-3" />
                )}
              </article>
            </div>
          </SectionFrame>

          <section className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 ${primaryGlass}`}>
            <span className="pointer-events-none absolute left-5 top-2 font-display text-7xl text-[#9bb4ff]/[0.12]">&ldquo;</span>
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.22em] text-[#88a8ff]">07</p>
              <h2 className="font-display mt-1 text-2xl font-semibold text-white">QUOTE / PERSONAL NOTE</h2>
              {quote ? (
                <blockquote className="mt-4 max-w-4xl border-l border-[#7da2ff]/50 pl-5 text-base leading-relaxed text-[#d2dcf0]">
                  &ldquo;{quote}&rdquo;
                </blockquote>
              ) : (
                <ProfileContentPlaceholder label="Profile details pending" lines={2} className="mt-4" />
              )}
            </div>
          </section>

          <SectionFrame number="08" title="SOCIAL & PROFESSIONAL LINKS" subtitle="Verified Channels">
            {socialLinks.length ? (
              <ul className="flex flex-wrap gap-2.5">
                {socialIconLinks.map((item) => {
                  const Icon = SOCIAL_ICON_MAP[item.iconKey];
                  return (
                  <li key={`${item.label}-${item.href}`}>
                    <div className="group relative">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${member.name} on ${item.platformName}`}
                        title={item.platformName}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#c8d7ff] motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#86a8ff]/65 motion-safe:hover:bg-[#86a8ff]/12 motion-safe:hover:shadow-[0_0_20px_rgba(92,136,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1323] ${microSurface}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md border border-white/[0.14] bg-[rgba(9,13,22,0.92)] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[#b8c6df] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        {item.platformName}
                      </span>
                    </div>
                  </li>
                )})}
              </ul>
            ) : (
              <ProfileContentPlaceholder label="Profile data pending" pills={3} />
            )}
          </SectionFrame>

          <section className={`rounded-3xl p-6 sm:p-8 ${primaryGlass}`}>
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#8daeff]">09</p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-white">WORK WITH SIGMA</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#b3c0d6]">Continue through Sigma’s official channel for partnerships and strategic collaboration.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#2e57d6]/65 bg-[#1f46c7]/20 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white motion-safe:transition-colors motion-safe:hover:bg-[#1f46c7]/34 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#88a7ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1324]"
              >
                Partner with Sigma
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.18] bg-[rgba(18,25,40,0.62)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white motion-safe:transition-colors motion-safe:hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#88a7ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1324]"
              >
                Back to Team
              </Link>
            </div>
          </section>

          <footer className={`rounded-3xl p-6 sm:p-8 ${primaryGlass}`}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={`/team/${previousMember.slug}`}
                className={`group rounded-2xl px-4 py-4 text-left motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#87aaff]/45 motion-safe:hover:bg-[#87aaff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c] ${secondaryGlass}`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8da3d6]">← Previous Operator</span>
                <span className="mt-1 block text-base font-medium text-white">{previousMember.name}</span>
              </Link>
              <Link
                href={`/team/${nextMember.slug}`}
                className={`group rounded-2xl px-4 py-4 text-left motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#87aaff]/45 motion-safe:hover:bg-[#87aaff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c] sm:text-right ${secondaryGlass}`}
              >
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8da3d6]">Next Operator →</span>
                <span className="mt-1 block text-base font-medium text-white">{nextMember.name}</span>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
