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

type DepthStrength = "hero" | "main" | "soft";

function DepthGlassLayers({ strength }: { strength: DepthStrength }) {
  const staticSheenClass =
    strength === "hero"
      ? "bg-[linear-gradient(150deg,rgba(255,255,255,0.06)_0%,rgba(147,197,253,0.1)_24%,transparent_56%)]"
      : strength === "main"
        ? "bg-[linear-gradient(150deg,rgba(255,255,255,0.045)_0%,rgba(147,197,253,0.075)_26%,transparent_58%)]"
        : "bg-[linear-gradient(150deg,rgba(255,255,255,0.035)_0%,rgba(147,197,253,0.06)_24%,transparent_56%)]";
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${staticSheenClass}`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--g-ref,0.06)]"
        style={{
          background:
            "radial-gradient(560px circle at var(--g-rx,50%) var(--g-ry,50%), rgba(241,248,255,0.12) 0%, rgba(147,197,253,0.08) 34%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--g-edge,0.1)]"
        style={{
          background:
            "radial-gradient(480px circle at var(--g-rx,50%) var(--g-ry,50%), rgba(147,197,253,0.18) 0%, rgba(147,197,253,0.07) 40%, transparent 78%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-[inherit] bg-gradient-to-r from-transparent via-[#93C5FD]/70 to-transparent"
      />
    </>
  );
}

function SectionFrame({
  number,
  title,
  subtitle,
  children,
  sectionId,
  depthStrength = "main",
  className = "",
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  sectionId?: string;
  depthStrength?: DepthStrength;
  className?: string;
}) {
  const primaryGlass =
    depthStrength === "hero"
      ? "border border-[rgba(147,197,253,0.22)] bg-[linear-gradient(155deg,rgba(6,10,20,0.36),rgba(12,22,42,0.48))] shadow-[0_30px_80px_rgba(2,6,18,0.56),0_0_46px_rgba(56,98,196,0.22),0_0_0_1px_rgba(176,210,255,0.08)_inset] backdrop-blur-[28px] [backdrop-filter:saturate(1.1)_blur(28px)]"
      : depthStrength === "soft"
        ? "border border-[rgba(147,197,253,0.14)] bg-[linear-gradient(155deg,rgba(8,12,22,0.44),rgba(12,20,38,0.42))] shadow-[0_18px_48px_rgba(2,8,20,0.4),0_0_28px_rgba(54,92,176,0.12),0_0_0_1px_rgba(170,198,255,0.06)_inset] backdrop-blur-[18px] [backdrop-filter:saturate(1.05)_blur(18px)]"
        : "border border-[rgba(147,197,253,0.16)] bg-[linear-gradient(155deg,rgba(7,11,21,0.4),rgba(12,22,42,0.46))] shadow-[0_24px_64px_rgba(2,8,22,0.48),0_0_36px_rgba(56,96,188,0.16),0_0_0_1px_rgba(170,198,255,0.07)_inset] backdrop-blur-[22px] [backdrop-filter:saturate(1.08)_blur(22px)]";
  return (
    <section
      id={sectionId}
      data-profile-section={sectionId}
      data-glass-depth={depthStrength}
      className={`group relative isolate overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.24)] motion-safe:hover:shadow-[0_28px_72px_rgba(2,8,20,0.55),0_0_52px_rgba(64,116,214,0.22),0_0_0_1px_rgba(195,224,255,0.09)_inset] sm:p-8 ${primaryGlass} ${className}`}
      style={{
        transform:
          "perspective(var(--g-perspective,1200px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
      }}
    >
      <DepthGlassLayers strength={depthStrength} />
      <div className="relative z-10 mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.08] pb-5">
        <div className="min-w-0 max-w-full">
          <p className="font-mono text-[10px] leading-[1.3] tracking-[0.2em] text-[#93C5FD] sm:text-[11px] lg:text-[12px] xl:text-[13px]">{number}</p>
          <h2 className="font-display mt-1 max-w-full text-[22px] font-semibold leading-[1.06] tracking-tight text-white sm:text-[24px] lg:text-[28px] xl:text-[30px]">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-[10px] uppercase leading-[1.3] tracking-[0.12em] text-[#8090a8] sm:text-[11px] lg:text-[12px]">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="relative z-10 pt-1 text-sm leading-[1.62] text-[#b6bcc4] md:text-[15px]">{children}</div>
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

function isMalePlaceholderImage(src?: string | null): boolean {
  return Boolean(src && src.includes("/images/team/placeholders/member-placeholder-male.jpg"));
}

function isFemalePlaceholderImage(src?: string | null): boolean {
  return Boolean(src && src.includes("/images/team/placeholders/member-placeholder-female.jpg"));
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

const PROFILE_SECTION_ITEMS = [
  { id: "profile-overview", label: "Overview", number: "01" },
  { id: "skills", label: "Skills", number: "02" },
  { id: "services", label: "Services", number: "03" },
  { id: "career", label: "Career", number: "04" },
  { id: "achievements", label: "Achievements", number: "05" },
  { id: "footprint", label: "Footprint", number: "06" },
  { id: "languages", label: "Languages", number: "07" },
  { id: "personal-note", label: "Personal Note", number: "08" },
  { id: "contact", label: "Contact", number: "09" },
] as const;

type ProfileSectionItem = (typeof PROFILE_SECTION_ITEMS)[number];

export function TeamMemberProfilePageView({ member, previousMember, nextMember }: Props) {
  const primaryGlass =
    "border border-[#9ab0d8]/20 bg-[linear-gradient(155deg,rgba(10,18,33,0.62),rgba(8,14,25,0.58))] shadow-[0_24px_65px_rgba(0,0,0,0.34),0_0_0_1px_rgba(162,189,255,0.08)_inset,0_0_36px_rgba(56,96,190,0.14)] backdrop-blur-[20px]";
  const secondaryGlass =
    "border border-[#93C5FD]/20 bg-[linear-gradient(155deg,rgba(9,14,25,0.58),rgba(8,13,23,0.54))] shadow-[0_14px_38px_rgba(0,0,0,0.28),0_0_0_1px_rgba(170,195,250,0.07)_inset,0_0_24px_rgba(56,94,176,0.12)] backdrop-blur-[16px]";
  const microSurface = "border border-white/[0.14] bg-[rgba(18,25,40,0.62)]";
  const heroGlass =
    "border border-[rgba(147,197,253,0.18)] bg-[linear-gradient(145deg,rgba(7,11,20,0.34),rgba(15,23,42,0.42))] shadow-[0_30px_90px_rgba(2,8,22,0.48),0_0_46px_rgba(58,103,196,0.18),inset_0_1px_0_rgba(210,228,255,0.16),inset_0_-1px_0_rgba(6,10,18,0.34)] backdrop-blur-[24px] [backdrop-filter:saturate(1.08)_blur(24px)]";
  const heroPanelGlass =
    "border border-[rgba(163,206,255,0.24)] bg-[linear-gradient(150deg,rgba(12,20,35,0.68),rgba(9,14,24,0.74))] shadow-[0_26px_70px_rgba(2,7,18,0.5),0_0_38px_rgba(63,110,204,0.18),inset_0_1px_0_rgba(207,225,255,0.12)] backdrop-blur-[20px]";
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroIntroVisible, setHeroIntroVisible] = useState(false);
  const [nameRevealVisible, setNameRevealVisible] = useState(false);
  const [portraitReady, setPortraitReady] = useState(false);
  const [portraitCanEnter, setPortraitCanEnter] = useState(false);
  const [portraitVisible, setPortraitVisible] = useState(false);
  const [orbitVisible, setOrbitVisible] = useState(false);
  const [glowVisible, setGlowVisible] = useState(false);
  const [availableSections, setAvailableSections] = useState<ProfileSectionItem[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<string>("profile-overview");
  const [featuredDeckIndex, setFeaturedDeckIndex] = useState(0);
  const [profileProgressPercent, setProfileProgressPercent] = useState(0);
  const [chapterMenuOpen, setChapterMenuOpen] = useState(false);
  const [chapterCardY, setChapterCardY] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const profileWrapperRef = useRef<HTMLDivElement | null>(null);
  const chapterCardRef = useRef<HTMLElement | null>(null);
  const hasPortrait = Boolean(portrait && !hasPortraitError);
  const portraitAlt = portrait && isPlaceholderImage(portrait) ? "" : member.name;
  const isMalePlaceholderPortrait = isMalePlaceholderImage(portrait);
  const isFemalePlaceholderPortrait = isFemalePlaceholderImage(portrait);
  const malePlaceholderPortraitFitClassName =
    "left-[2px] -top-[7px] object-contain object-center p-3 sm:p-2 scale-[1.14] translate-y-[4%] md:scale-[1.23] md:translate-y-[3%] motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transform-none";
  const femalePlaceholderPortraitFitClassName =
    "left-[2px] -top-[7px] object-contain object-center p-3 sm:p-2 scale-[1.14] translate-y-[4%] md:scale-[1.23] md:translate-y-[3%] motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transform-none";
  const defaultPortraitFitClassName =
    "object-contain object-center p-3 sm:p-2 scale-[1.14] translate-y-[4%] md:scale-[1.23] md:translate-y-[3%] motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transform-none";
  const portraitFitClassName = isMalePlaceholderPortrait
    ? malePlaceholderPortraitFitClassName
    : isFemalePlaceholderPortrait
      ? femalePlaceholderPortraitFitClassName
      : defaultPortraitFitClassName;
  const nameWords = member.name.trim().split(/\s+/).filter(Boolean);
  const locationLabel = member.location ? `${countryCodeToFlag(member.location.countryCode)} ${[member.location.city, member.location.country].filter(Boolean).join(", ")}` : null;
  const socialIconLinks = socialLinks.map((item) => {
    const iconKey = getSocialIconKey(item.label, item.href);
    return {
      ...item,
      iconKey,
      platformName: getSocialPlatformName(iconKey, item.label),
    };
  });
  const otherMembers = allMembers.filter((item) => getTeamMemberSlug(item) !== profileSlug);
  const activeSectionIndex = Math.max(0, availableSections.findIndex((item) => item.id === activeSectionId));
  const activeSection = availableSections[activeSectionIndex] ?? availableSections[0];
  const nextSection = activeSectionIndex >= 0 ? availableSections[activeSectionIndex + 1] : undefined;
  const deckTotal = otherMembers.length;
  const normalizedDeckIndex = deckTotal > 0 ? ((featuredDeckIndex % deckTotal) + deckTotal) % deckTotal : 0;
  const deckCenterMember = deckTotal > 0 ? otherMembers[normalizedDeckIndex]! : null;
  const deckTopMember = deckTotal > 0 ? otherMembers[(normalizedDeckIndex - 1 + deckTotal) % deckTotal]! : null;
  const deckBottomMember = deckTotal > 0 ? otherMembers[(normalizedDeckIndex + 1) % deckTotal]! : null;
  const deckVisibleMembers =
    deckTotal >= 3
      ? [
          { member: deckTopMember, tier: "quiet" as const },
          { member: deckCenterMember, tier: "featured" as const },
          { member: deckBottomMember, tier: "quiet" as const },
        ]
      : deckTotal === 2
        ? [
            { member: deckCenterMember, tier: "featured" as const },
            { member: otherMembers[(normalizedDeckIndex + 1) % deckTotal]!, tier: "quiet" as const },
          ]
        : deckTotal === 1
          ? [{ member: deckCenterMember, tier: "featured" as const }]
          : [];
  const deckFeaturedCountLabel = String(normalizedDeckIndex + 1).padStart(2, "0");
  const deckTotalLabel = String(Math.max(deckTotal, 0)).padStart(2, "0");
  const wheelCooldownRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const deckStep = (direction: 1 | -1) => {
    if (deckTotal <= 1) return;
    setFeaturedDeckIndex((current) => {
      const next = current + direction;
      return ((next % deckTotal) + deckTotal) % deckTotal;
    });
  };
  const scrollToSectionById = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const headerOffset = 96;
    const top = section.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };
  const scrollToProfileTop = () => {
    const headerOffset = 96;
    const top = (profileWrapperRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - headerOffset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

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
    let targetA = 0.08;
    let currentA = 0.08;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      currentA += (targetA - currentA) * 0.1;
      element.style.setProperty("--mx", currentX.toFixed(2));
      element.style.setProperty("--my", currentY.toFixed(2));
      element.style.setProperty("--ra", currentA.toFixed(3));
      element.style.setProperty("--rx", `${(50 + currentX * 2).toFixed(2)}%`);
      element.style.setProperty("--ry", `${(50 + currentY * 2).toFixed(2)}%`);
      rafId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, normalizedX)) * 8;
      targetY = Math.max(-1, Math.min(1, normalizedY)) * 8;
      targetA = 0.14;
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      targetA = 0.06;
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
      element.style.removeProperty("--ra");
      element.style.removeProperty("--rx");
      element.style.removeProperty("--ry");
    };
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReduced = reducedMotionQuery.matches;
    setPrefersReducedMotion(isReduced);
    setHeroIntroVisible(isReduced);
    setNameRevealVisible(isReduced);
    setPortraitVisible(isReduced || !hasPortrait);
    setPortraitCanEnter(isReduced || !hasPortrait);
    setOrbitVisible(isReduced);
    setGlowVisible(isReduced);
    setPortraitReady(!hasPortrait);

    if (isReduced) return;

    let rafId = 0;
    const timeouts: number[] = [];
    rafId = window.requestAnimationFrame(() => {
      setHeroIntroVisible(true);
    });
    timeouts.push(window.setTimeout(() => setNameRevealVisible(true), 100));
    timeouts.push(window.setTimeout(() => setPortraitCanEnter(true), 180));
    timeouts.push(window.setTimeout(() => setOrbitVisible(true), 320));
    timeouts.push(window.setTimeout(() => setGlowVisible(true), 450));

    return () => {
      window.cancelAnimationFrame(rafId);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [profileSlug, hasPortrait]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPortraitVisible(true);
      return;
    }
    if (!hasPortrait) {
      setPortraitVisible(true);
      return;
    }
    if (portraitCanEnter && portraitReady) {
      setPortraitVisible(true);
    }
  }, [prefersReducedMotion, hasPortrait, portraitCanEnter, portraitReady]);

  useEffect(() => {
    if (deckTotal === 0) {
      setFeaturedDeckIndex(0);
      return;
    }
    const nextSlugIndex = otherMembers.findIndex((item) => item.slug === nextMember.slug);
    setFeaturedDeckIndex(nextSlugIndex >= 0 ? nextSlugIndex : 0);
  }, [profileSlug, deckTotal, nextMember.slug, otherMembers]);

  useEffect(() => {
    const items = PROFILE_SECTION_ITEMS.filter((item) => Boolean(document.getElementById(item.id)));
    setAvailableSections(items);
    if (items.length > 0) {
      setActiveSectionId(items[0]!.id);
    }
    if (items.length === 0) return;
    const observedSections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (observedSections.length === 0) return;

    const headerOffset = 104;
    const pickActiveSection = () => {
      const readingLine = window.scrollY + headerOffset + Math.min(180, window.innerHeight * 0.25);
      let candidate = observedSections[0]!;
      for (const section of observedSections) {
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        if (sectionTop <= readingLine) {
          candidate = section;
        } else {
          break;
        }
      }
      setActiveSectionId((previous) => (previous === candidate.id ? previous : candidate.id));
    };

    const observer = new IntersectionObserver(
      () => {
        pickActiveSection();
      },
      {
        root: null,
        threshold: [0, 0.15, 0.4, 0.65],
        rootMargin: `-${headerOffset + 10}px 0px -48% 0px`,
      },
    );

    observedSections.forEach((section) => observer.observe(section));
    pickActiveSection();

    return () => observer.disconnect();
  }, [profileSlug]);

  useEffect(() => {
    const wrapper = profileWrapperRef.current;
    if (!wrapper) return;

    let rafId = 0;
    const safeTop = 112;
    const safeBottom = 140;
    const metrics = {
      wrapperTop: 0,
      wrapperHeight: 0,
      scrollableHeight: 1,
    };
    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const measure = () => {
      const rect = wrapper.getBoundingClientRect();
      metrics.wrapperTop = window.scrollY + rect.top;
      metrics.wrapperHeight = rect.height;
      metrics.scrollableHeight = Math.max(1, metrics.wrapperHeight - safeTop - safeBottom);
    };
    const update = () => {
      const ratio = clamp((window.scrollY + safeTop - metrics.wrapperTop) / metrics.scrollableHeight, 0, 1);
      const nextPercent = Math.round(ratio * 100);
      setProfileProgressPercent((previous) => (previous === nextPercent ? previous : nextPercent));
      rafId = 0;
    };
    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    measure();
    requestUpdate();
    const onResize = () => {
      measure();
      requestUpdate();
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            measure();
            requestUpdate();
          })
        : null;
    if (resizeObserver) {
      resizeObserver.observe(wrapper);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [profileSlug]);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1280) return;

    const wrapper = profileWrapperRef.current;
    const chapterCard = chapterCardRef.current;
    if (!wrapper || !chapterCard) return;

    const activeId = activeSectionId || availableSections[0]?.id;
    const activeSection = activeId ? document.getElementById(activeId) : null;
    const firstSection = availableSections[0] ? document.getElementById(availableSections[0].id) : null;
    if (!activeSection || !firstSection) return;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = activeSection.getBoundingClientRect();
    const firstRect = firstSection.getBoundingClientRect();
    const activeTop = activeRect.top - wrapperRect.top;
    const firstTop = firstRect.top - wrapperRect.top;
    const cardHeight = chapterCard.offsetHeight || 0;
    const safeBottom = 120;
    const minY = Math.max(0, firstTop - 16);
    const maxY = Math.max(minY, wrapperRect.height - cardHeight - safeBottom);
    const calculatedY = activeTop - 16;
    const nextY = clamp(calculatedY, minY, maxY);
    setChapterCardY((current) => (Math.abs(current - nextY) < 0.5 ? current : nextY));
  }, [activeSectionId, availableSections, profileSlug]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId = 0;
    const onResize = () => {
      if (window.innerWidth < 1280) return;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const wrapper = profileWrapperRef.current;
        const chapterCard = chapterCardRef.current;
        if (!wrapper || !chapterCard) return;
        const activeId = activeSectionId || availableSections[0]?.id;
        const activeSection = activeId ? document.getElementById(activeId) : null;
        const firstSection = availableSections[0] ? document.getElementById(availableSections[0].id) : null;
        if (!activeSection || !firstSection) return;

        const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
        const wrapperRect = wrapper.getBoundingClientRect();
        const activeRect = activeSection.getBoundingClientRect();
        const firstRect = firstSection.getBoundingClientRect();
        const activeTop = activeRect.top - wrapperRect.top;
        const firstTop = firstRect.top - wrapperRect.top;
        const cardHeight = chapterCard.offsetHeight || 0;
        const safeBottom = 120;
        const minY = Math.max(0, firstTop - 16);
        const maxY = Math.max(minY, wrapperRect.height - cardHeight - safeBottom);
        const calculatedY = activeTop - 16;
        const nextY = clamp(calculatedY, minY, maxY);
        setChapterCardY((current) => (Math.abs(current - nextY) < 0.5 ? current : nextY));
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeSectionId, availableSections]);

  useEffect(() => {
    if (!chapterMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setChapterMenuOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const root = chapterCardRef.current;
      if (!root) return;
      if (root.contains(event.target as Node)) return;
      setChapterMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [chapterMenuOpen]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-glass-depth]"));
    if (cards.length === 0) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const applyStaticState = () => {
      cards.forEach((card) => {
        const depth = card.dataset.glassDepth;
        const perspective = depth === "hero" ? "1200px" : depth === "soft" ? "1350px" : "1280px";
        card.style.setProperty("--g-perspective", perspective);
        card.style.setProperty("--g-tilt-x", "0deg");
        card.style.setProperty("--g-tilt-y", "0deg");
        card.style.setProperty("--g-lift", "0px");
        card.style.setProperty("--g-scale", "1");
        card.style.setProperty("--g-rx", "50%");
        card.style.setProperty("--g-ry", "50%");
        card.style.setProperty("--g-ref", depth === "hero" ? "0.08" : depth === "soft" ? "0.05" : "0.065");
        card.style.setProperty("--g-edge", depth === "hero" ? "0.12" : depth === "soft" ? "0.08" : "0.1");
      });
    };

    const interactiveEnabled =
      !reduceMotionQuery.matches && desktopQuery.matches && finePointerQuery.matches;
    if (!interactiveEnabled) {
      applyStaticState();
      return;
    }

    type DepthState = {
      element: HTMLElement;
      targetX: number;
      targetY: number;
      currentX: number;
      currentY: number;
      targetA: number;
      currentA: number;
      depth: DepthStrength;
      maxTilt: number;
      maxLift: number;
      maxScale: number;
      baseRef: number;
      baseEdge: number;
    };

    const states: DepthState[] = cards.map((card) => {
      const depth = (card.dataset.glassDepth as DepthStrength | undefined) ?? "main";
      const maxTilt = depth === "hero" ? 1.2 : depth === "soft" ? 0.45 : 0.85;
      const maxLift = depth === "hero" ? 2 : depth === "soft" ? 0.7 : 1.3;
      const maxScale = depth === "hero" ? 1.003 : depth === "soft" ? 1.001 : 1.002;
      const baseRef = depth === "hero" ? 0.08 : depth === "soft" ? 0.05 : 0.065;
      const baseEdge = depth === "hero" ? 0.12 : depth === "soft" ? 0.08 : 0.1;
      const perspective = depth === "hero" ? "1200px" : depth === "soft" ? "1350px" : "1280px";
      card.style.setProperty("--g-perspective", perspective);
      card.style.setProperty("--g-rx", "50%");
      card.style.setProperty("--g-ry", "50%");
      card.style.setProperty("--g-ref", String(baseRef));
      card.style.setProperty("--g-edge", String(baseEdge));
      return {
        element: card,
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0,
        targetA: baseRef,
        currentA: baseRef,
        depth,
        maxTilt,
        maxLift,
        maxScale,
        baseRef,
        baseEdge,
      };
    });

    const stateByElement = new Map<HTMLElement, DepthState>(states.map((item) => [item.element, item]));
    let rafId = 0;
    const animate = () => {
      states.forEach((state) => {
        state.currentX += (state.targetX - state.currentX) * 0.1;
        state.currentY += (state.targetY - state.currentY) * 0.1;
        state.currentA += (state.targetA - state.currentA) * 0.12;
        const lift = (Math.abs(state.currentX) + Math.abs(state.currentY)) * 0.5 * state.maxLift;
        const scale = 1 + (Math.abs(state.currentX) + Math.abs(state.currentY)) * 0.5 * (state.maxScale - 1);
        state.element.style.setProperty("--g-tilt-x", `${(state.currentX * state.maxTilt).toFixed(3)}deg`);
        state.element.style.setProperty("--g-tilt-y", `${(-state.currentY * state.maxTilt).toFixed(3)}deg`);
        state.element.style.setProperty("--g-lift", `${lift.toFixed(3)}px`);
        state.element.style.setProperty("--g-scale", scale.toFixed(4));
        state.element.style.setProperty("--g-ref", state.currentA.toFixed(3));
        state.element.style.setProperty("--g-edge", (state.baseEdge + (state.currentA - state.baseRef) * 0.7).toFixed(3));
      });
      rafId = window.requestAnimationFrame(animate);
    };

    const handlers = cards.map((card) => {
      const onPointerMove = (event: PointerEvent) => {
        const state = stateByElement.get(card);
        if (!state) return;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        state.targetX = Math.max(-1, Math.min(1, normalizedX));
        state.targetY = Math.max(-1, Math.min(1, normalizedY));
        state.targetA = Math.min(0.14, state.baseRef + 0.05);
        state.element.style.setProperty("--g-rx", `${((event.clientX - rect.left) / rect.width * 100).toFixed(2)}%`);
        state.element.style.setProperty("--g-ry", `${((event.clientY - rect.top) / rect.height * 100).toFixed(2)}%`);
      };
      const onPointerLeave = () => {
        const state = stateByElement.get(card);
        if (!state) return;
        state.targetX = 0;
        state.targetY = 0;
        state.targetA = state.baseRef;
        state.element.style.setProperty("--g-rx", "50%");
        state.element.style.setProperty("--g-ry", "50%");
      };
      card.addEventListener("pointermove", onPointerMove);
      card.addEventListener("pointerleave", onPointerLeave);
      return { card, onPointerMove, onPointerLeave };
    });

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      handlers.forEach(({ card, onPointerMove, onPointerLeave }) => {
        card.removeEventListener("pointermove", onPointerMove);
        card.removeEventListener("pointerleave", onPointerLeave);
      });
      applyStaticState();
    };
  }, []);

  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(32,73,180,0.18),transparent_40%),radial-gradient(circle_at_90%_15%,rgba(86,130,255,0.14),transparent_35%),linear-gradient(180deg,#05070e_0%,#070b14_45%,#05070e_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(171,189,237,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(171,189,237,0.3)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute left-1/2 top-0 h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[#1d4adb]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <div
          ref={profileWrapperRef}
          className="min-[1280px]:grid min-[1280px]:grid-cols-[minmax(0,1fr)_138px] min-[1280px]:gap-6 min-[1440px]:grid-cols-[136px_minmax(0,1fr)_138px] min-[1600px]:grid-cols-[168px_minmax(0,1fr)_152px] min-[1920px]:grid-cols-[176px_minmax(0,1fr)_164px]"
        >
          <aside
            className="hidden min-[1440px]:block"
            aria-label="Other team profiles"
          >
            <div className="sticky top-24">
              <div
                className="relative rounded-[22px] border border-[#8fbaff]/22 bg-[linear-gradient(168deg,rgba(7,12,24,0.66),rgba(9,17,33,0.58))] px-2.5 py-3 shadow-[0_16px_38px_rgba(3,8,20,0.4),0_0_18px_rgba(66,116,210,0.1),inset_0_1px_0_rgba(210,228,255,0.1)] backdrop-blur-[14px]"
                tabIndex={0}
                onWheel={(event) => {
                  if (deckTotal <= 1) return;
                  wheelAccumRef.current += event.deltaY;
                  if (Math.abs(wheelAccumRef.current) < 38) return;
                  const now = Date.now();
                  if (now - wheelCooldownRef.current < 180) {
                    event.preventDefault();
                    return;
                  }
                  event.preventDefault();
                  wheelCooldownRef.current = now;
                  const direction = wheelAccumRef.current > 0 ? 1 : -1;
                  wheelAccumRef.current = 0;
                  deckStep(direction);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    deckStep(1);
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    deckStep(-1);
                  }
                }}
                aria-label="Profile deck. Use mouse wheel or arrow keys to rotate."
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-0 h-10 bg-gradient-to-b from-[#070f1d] to-transparent" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-0 h-10 bg-gradient-to-t from-[#070f1d] to-transparent" />
                <div className="flex items-center justify-between px-1 pb-2 text-[10px] uppercase tracking-[0.12em] text-[#9cb0d3]">
                  <span>Deck</span>
                  <span>{deckFeaturedCountLabel} / {deckTotalLabel}</span>
                </div>
                <div className="space-y-2">
                  {deckVisibleMembers.map((entry, index) => {
                    const deckMember = entry.member;
                    if (!deckMember) return null;
                    const slug = getTeamMemberSlug(deckMember);
                    const imageSrc = deckMember.portrait ?? deckMember.imageSrc;
                    const isPlaceholder = isPlaceholderImage(imageSrc);
                    const rosterIndex = otherMembers.findIndex((item) => getTeamMemberSlug(item) === slug);
                    const isFeatured = entry.tier === "featured";
                    return (
                      <Link
                        key={`${slug}-${index}`}
                        href={`/team/${slug}`}
                        aria-label={`Open profile for ${deckMember.name}`}
                        className={`group relative block overflow-hidden rounded-2xl border px-2.5 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050912] motion-safe:transition-[transform,border-color,box-shadow,opacity] motion-safe:duration-200 ${
                          isFeatured
                            ? "border-[#9cc6ff]/34 bg-[linear-gradient(160deg,rgba(16,31,56,0.72),rgba(10,20,37,0.64))] opacity-100 shadow-[0_10px_24px_rgba(7,18,40,0.42),0_0_18px_rgba(96,165,250,0.14)] motion-safe:hover:-translate-y-[1px]"
                            : "border-[#84a3d9]/22 bg-[linear-gradient(160deg,rgba(13,23,42,0.52),rgba(9,17,31,0.5))] opacity-70 motion-safe:hover:opacity-90"
                        }`}
                      >
                        <div className={`relative mx-auto overflow-hidden rounded-xl border ${isFeatured ? "h-[72px] w-[72px] border-[#9ec7ff]/34" : "h-[54px] w-[54px] border-[#7f9bcf]/24"}`}>
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt=""
                              fill
                              sizes={isFeatured ? "72px" : "54px"}
                              className={isPlaceholder ? "object-contain p-1.5" : "object-cover"}
                            />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-xs font-semibold text-[#d2def7]">
                              {initialsFromName(deckMember.name)}
                            </span>
                          )}
                        </div>
                        <p className={`mt-2 font-mono uppercase tracking-[0.12em] text-[#95b4ec] ${isFeatured ? "text-[11px]" : "text-[10px]"}`}>
                          {String(Math.max(0, rosterIndex) + 1).padStart(2, "0")}
                        </p>
                        <p className={`mt-1 line-clamp-1 font-medium text-white ${isFeatured ? "text-[12px]" : "text-[11px]"}`}>{deckMember.name}</p>
                        <p className={`line-clamp-2 text-[#95a7c9] ${isFeatured ? "text-[10px]" : "text-[9px]"}`}>{deckMember.role ?? "Team Member"}</p>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => deckStep(-1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#84a6de]/26 bg-[#0d172a]/75 text-[#b5c9ec] motion-safe:transition-colors motion-safe:hover:border-[#7DD3FC]/56 motion-safe:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                    aria-label="Show previous profile"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => deckStep(1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#84a6de]/26 bg-[#0d172a]/75 text-[#b5c9ec] motion-safe:transition-colors motion-safe:hover:border-[#7DD3FC]/56 motion-safe:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                    aria-label="Show next profile"
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0 min-[1280px]:max-w-7xl">
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

        <section
          ref={heroRef}
          data-glass-depth="hero"
          className={`group relative overflow-hidden rounded-[30px] p-6 motion-safe:transition-[box-shadow,border-color,transform,opacity,filter] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.26)] motion-safe:hover:shadow-[0_36px_94px_rgba(2,8,20,0.58),0_0_62px_rgba(68,124,224,0.28),0_0_0_1px_rgba(198,226,255,0.1)_inset] sm:p-8 lg:p-10 ${heroGlass} ${
            heroIntroVisible ? "opacity-100 blur-0" : "opacity-0 blur-[3px]"
          }`}
          style={{
            transform:
              "perspective(var(--g-perspective,1200px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
          }}
        >
          <DepthGlassLayers strength="hero" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[var(--ra,0.08)]"
            style={{
              background:
                "radial-gradient(560px circle at var(--rx,50%) var(--ry,50%), rgba(198,225,255,0.16) 0%, rgba(147,197,253,0.1) 38%, transparent 76%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[30px] border border-[rgba(179,220,255,0.16)] opacity-[calc(var(--ra,0.08)*0.9)]"
            style={{
              background:
                "radial-gradient(320px circle at var(--rx,50%) var(--ry,50%), rgba(170,215,255,0.18), transparent 72%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-full w-[52%] bg-[radial-gradient(circle_at_75%_25%,rgba(86,130,255,0.18),transparent_56%)] motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -1px), calc(var(--my, 0) * -1px), 0)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 top-12 h-[320px] w-[320px] rounded-full border border-[#84a8ff]/20 motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -0.8px), calc(var(--my, 0) * -0.8px), 0)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-3 bottom-10 h-[150px] w-[150px] rounded-full border border-[#84a8ff]/25 motion-safe:transition-transform motion-safe:duration-300"
            style={{ transform: "translate3d(calc(var(--mx, 0) * -0.7px), calc(var(--my, 0) * -0.7px), 0)" }}
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(196,214,255,0.08),transparent_28%,transparent_100%)]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-5 top-4 font-display text-[72px] font-bold leading-none text-[#88a8ff]/[0.06] sm:text-[96px]"
            style={{ transform: "translate3d(calc(var(--mx, 0) * 0.45px), calc(var(--my, 0) * 0.45px), 0)" }}
          >
            {initials}
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)] lg:items-center">
            <div className="min-w-0">
              <p className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">SIGMA TEAM</p>
              <h1 className="font-display mt-4 break-words text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
                <span className="sr-only">{member.name}</span>
                <span aria-hidden="true" className="inline">
                  {(() => {
                    let charIndex = 0;
                    return nameWords.map((word, wordIndex) => (
                      <span key={`${word}-${wordIndex}`} className="inline-flex whitespace-nowrap">
                        {word.split("").map((character, letterIndex) => {
                          const delay = charIndex * 22;
                          charIndex += 1;
                          return (
                            <span
                              key={`${character}-${wordIndex}-${letterIndex}`}
                              className="inline-block motion-safe:transition-[opacity,transform,filter] motion-safe:duration-[560ms] motion-safe:ease-[cubic-bezier(0.2,0.82,0.25,1)]"
                              style={{
                                transitionDelay: `${delay}ms`,
                                opacity: nameRevealVisible ? 1 : 0,
                                transform: nameRevealVisible ? "translateY(0px)" : "translateY(10px)",
                                filter: nameRevealVisible ? "blur(0px)" : "blur(5px)",
                              }}
                            >
                              {character}
                            </span>
                          );
                        })}
                        {wordIndex < nameWords.length - 1 ? <span className="inline-block w-[0.35em]" /> : null}
                      </span>
                    ));
                  })()}
                </span>
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
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_30%,rgba(90,135,255,0.32),transparent_62%)] blur-xl motion-safe:transition-transform motion-safe:duration-300"
                style={{ transform: "translate3d(calc(var(--mx, 0) * -0.85px), calc(var(--my, 0) * -0.85px), 0)" }}
              />
              <div
                data-glass-depth="hero"
                className={`relative overflow-hidden rounded-[30px] px-4 pb-5 pt-16 motion-safe:transition-transform motion-safe:duration-300 ${heroPanelGlass}`}
                style={{
                  transform:
                    "perspective(var(--g-perspective,1200px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(calc(var(--g-lift,0px) + calc(var(--my, 0) * 0.55px))) scale(var(--g-scale,1)) translate3d(calc(var(--mx, 0) * 0.55px), calc(var(--my, 0) * 0.55px), 0)",
                }}
              >
                <DepthGlassLayers strength="hero" />
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(127,169,255,0.22),transparent_48%)] motion-safe:transition-opacity motion-safe:duration-500 ${
                    glowVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div className="pointer-events-none absolute left-4 top-4 font-mono text-[11px] tracking-[0.24em] text-[#9cb6ff]">
                  {profileIndex} / {totalProfiles}
                </div>
                <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/[0.14] bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#95a3ba]">
                  {member.profileStatus ?? "draft"}
                </div>
                <div className="relative mx-auto mt-3 aspect-square w-full max-w-[350px]">
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.32)_0%,rgba(96,165,250,0.14)_42%,transparent_72%)] blur-xl motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      glowVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -inset-1 rounded-full border border-[#7DD3FC]/45 motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      orbitVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-[2%] rounded-full border border-[#60A5FA]/50 motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      orbitVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[8%] rounded-full border border-[#93C5FD]/24 bg-[linear-gradient(165deg,rgba(17,28,48,0.7),rgba(11,18,32,0.74))]" />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -left-3 top-[16%] h-8 w-8 rounded-full border border-[#93C5FD]/45 motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      orbitVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute -right-2 top-[62%] h-5 w-5 rounded-full bg-[#60A5FA]/45 blur-[1px] motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      orbitVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute right-[6%] top-[20%] h-24 w-24 rounded-full border border-[#7DD3FC]/20 motion-safe:transition-[opacity,transform] motion-safe:duration-500 ${
                      orbitVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  />
                  <div className="absolute inset-[13%] overflow-hidden rounded-full border border-[#93C5FD]/20 bg-[#0a1325]">
                    <div
                      className={`absolute inset-0 motion-safe:transition-[opacity,transform,filter] motion-safe:duration-[980ms] motion-safe:ease-[cubic-bezier(0.22,0.84,0.23,1)] ${
                        portraitVisible
                          ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0"
                          : "translate-x-6 translate-y-2 scale-95 opacity-0 blur-[8px] sm:translate-x-7 md:translate-x-10 lg:translate-x-14"
                      }`}
                    >
                      {hasPortrait ? (
                        <Image
                          src={portrait!}
                          alt={portraitAlt}
                          fill
                          className={portraitFitClassName}
                          sizes="(min-width: 1024px) 360px, 80vw"
                          onError={() => setHasPortraitError(true)}
                          onLoad={() => setPortraitReady(true)}
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-display text-6xl font-semibold uppercase tracking-[0.08em] text-[#c9d9ff]">
                          {initials}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-[#93C5FD]/80 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 grid gap-6">
          <SectionFrame sectionId="profile-overview" number="01" title="PROFILE OVERVIEW" subtitle="Editorial Brief">
            {fullOverview ? (
              <p className="text-base leading-relaxed text-[#c0cad8]">{fullOverview}</p>
            ) : (
              <ProfileContentPlaceholder label="Profile details pending" lines={4} />
            )}
          </SectionFrame>

          <div className="grid gap-6 lg:grid-cols-2">
            <SectionFrame sectionId="skills" number="02" title="SKILLS" subtitle="Core Capabilities">
              {member.skills?.length ? (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {member.skills.map((item, index) => (
                    <article
                      key={item}
                      className={`group rounded-2xl p-3.5 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#7DD3FC]/55 motion-safe:hover:bg-[#8cafef]/10 ${secondaryGlass}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#93C5FD]">{String(index + 1).padStart(2, "0")}</span>
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]" />
                      </div>
                      <p className="mt-2 text-sm text-[#d4ddf0]">{item}</p>
                      <div aria-hidden="true" className="mt-2 h-px w-0 bg-gradient-to-r from-[#60A5FA]/85 to-transparent transition-all duration-200 group-hover:w-full" />
                    </article>
                  ))}
                </div>
              ) : (
                <ProfileContentPlaceholder label="Profile data pending" blocks={4} />
              )}
            </SectionFrame>

            <SectionFrame sectionId="services" number="03" title="SERVICES" subtitle="Engagement Focus">
              {member.services?.length ? (
                <div className="space-y-2.5">
                  {member.services.map((item, index) => (
                    <div
                      key={item}
                      className={`group flex items-center justify-between rounded-xl px-3.5 py-3 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#7DD3FC]/50 ${secondaryGlass}`}
                    >
                      <span className="flex items-center gap-2 text-sm text-[#d3ddef]">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC]" />
                        {item}
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[#93C5FD]">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <ProfileContentPlaceholder label="Profile data pending" lines={4} />
              )}
            </SectionFrame>
          </div>

          <SectionFrame sectionId="career" number="04" title="CAREER TIMELINE" subtitle="Trajectory">
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

          <SectionFrame sectionId="achievements" number="05" title="SELECTED ACHIEVEMENTS" subtitle="Verified Highlights">
            {hasAchievements ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {member.achievements!.map((item, index) => (
                  <article
                    key={`${item.title ?? "achievement"}-${index}`}
                    className={`relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 pr-11 ${
                      index === 0 ? "sm:col-span-2" : ""
                    } motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#93b2f8]/45 ${secondaryGlass}`}
                  >
                    <p
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-3 rounded-md border border-[#8ab0ff]/25 bg-[#8ab0ff]/10 px-1.5 py-0.5 font-mono text-[12px] leading-none tracking-[0.12em] text-[#8ab0ff]/80 sm:text-[13px]"
                    >
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

          <SectionFrame sectionId="footprint" number="06" title="GLOBAL FOOTPRINT" subtitle="Location / Languages / Markets">
            <div className="grid gap-3 md:grid-cols-3">
              <article className={`rounded-2xl p-4 ${secondaryGlass}`}>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#8da3d3]">Location</p>
                {locationLabel ? (
                  <p className="mt-2 text-sm text-[#d4dded]">{locationLabel}</p>
                ) : (
                  <ProfileContentPlaceholder label="Details to be added" lines={1} className="mt-2 p-3" />
                )}
              </article>
              <article id="languages" className={`rounded-2xl p-4 ${secondaryGlass}`}>
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

          <section
            id="personal-note"
            data-profile-section="personal-note"
            data-glass-depth="soft"
            className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.22)] motion-safe:hover:shadow-[0_22px_56px_rgba(3,9,20,0.42),0_0_38px_rgba(68,116,208,0.16)] sm:p-8 ${primaryGlass}`}
            style={{
              transform:
                "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
            }}
          >
            <DepthGlassLayers strength="soft" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <span className="absolute left-5 top-5 font-display text-[clamp(3rem,5vw,6rem)] leading-[0.84] text-[#9bb4ff]/[0.1]">
                &ldquo;
              </span>
            </div>
            <div className="relative z-10 min-w-0 max-w-full">
              <p className="font-mono text-[10px] leading-[1.3] tracking-[0.2em] text-[#88a8ff] sm:text-[11px] lg:text-[12px] xl:text-[13px]">07</p>
              <h2 className="font-display mt-1 max-w-full text-[22px] font-semibold leading-[1.06] text-white sm:text-[24px] lg:text-[28px] xl:text-[30px]">
                QUOTE / PERSONAL NOTE
              </h2>
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
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[#c8d7ff] motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#7DD3FC]/70 motion-safe:hover:bg-[#60A5FA]/14 motion-safe:hover:shadow-[0_0_20px_rgba(125,211,252,0.22)] motion-safe:hover:text-[#e5f3ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1323] ${microSurface}`}
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

          <section
            id="contact"
            data-profile-section="contact"
            data-glass-depth="soft"
            className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.22)] motion-safe:hover:shadow-[0_22px_56px_rgba(3,9,20,0.42),0_0_38px_rgba(68,116,208,0.16)] sm:p-8 ${primaryGlass}`}
            style={{
              transform:
                "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
            }}
          >
            <DepthGlassLayers strength="soft" />
            <div className="relative z-10 min-w-0 max-w-full">
            <p className="font-mono text-[10px] leading-[1.3] tracking-[0.2em] text-[#8daeff] sm:text-[11px] lg:text-[12px] xl:text-[13px]">09</p>
            <h2 className="font-display mt-1 max-w-full text-[22px] font-semibold leading-[1.06] text-white sm:text-[24px] lg:text-[28px] xl:text-[30px]">WORK WITH SIGMA</h2>
            <p className="mt-2 max-w-2xl text-sm leading-[1.62] text-[#b3c0d6] md:text-[15px]">Continue through Sigma’s official channel for partnerships and strategic collaboration.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-[#60A5FA]/75 bg-[#2563eb]/26 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white motion-safe:transition-all motion-safe:hover:bg-[#2563eb]/38 motion-safe:hover:shadow-[0_0_26px_rgba(96,165,250,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1324]"
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
            </div>
          </section>

          <footer
            data-glass-depth="soft"
            className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.22)] motion-safe:hover:shadow-[0_22px_56px_rgba(3,9,20,0.42),0_0_38px_rgba(68,116,208,0.16)] sm:p-8 ${primaryGlass}`}
            style={{
              transform:
                "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
            }}
          >
            <DepthGlassLayers strength="soft" />
            <div className="relative z-10 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/team/${previousMember.slug}`}
                data-glass-depth="soft"
                className={`group rounded-2xl px-4 py-4 text-left motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#87aaff]/45 motion-safe:hover:bg-[#87aaff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c] ${secondaryGlass}`}
                style={{
                  transform:
                    "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
                }}
              >
                <span className="block text-[10px] uppercase leading-[1.3] tracking-[0.12em] text-[#8da3d6] sm:text-[11px]">← Previous Operator</span>
                <span className="mt-1 block text-[15px] font-medium leading-[1.35] text-white sm:text-base">{previousMember.name}</span>
              </Link>
              <Link
                href={`/team/${nextMember.slug}`}
                data-glass-depth="soft"
                className={`group rounded-2xl px-4 py-4 text-left motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-[#87aaff]/45 motion-safe:hover:bg-[#87aaff]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c] sm:text-right ${secondaryGlass}`}
                style={{
                  transform:
                    "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
                }}
              >
                <span className="block text-[10px] uppercase leading-[1.3] tracking-[0.12em] text-[#8da3d6] sm:text-[11px]">Next Operator →</span>
                <span className="mt-1 block text-[15px] font-medium leading-[1.35] text-white sm:text-base">{nextMember.name}</span>
              </Link>
            </div>
          </footer>
          </div>
          </div>

          <aside
            className="relative hidden min-[1280px]:block"
            aria-label="Profile section progress"
          >
            <section
              ref={chapterCardRef}
              className="absolute right-0 top-0 ml-auto w-[132px] rounded-[20px] border border-[#8fbaff]/22 bg-[linear-gradient(165deg,rgba(7,12,24,0.66),rgba(10,18,34,0.6))] px-3 py-3.5 shadow-[0_14px_30px_rgba(3,8,20,0.36),0_0_18px_rgba(66,116,210,0.1),inset_0_1px_0_rgba(205,225,255,0.1)] backdrop-blur-[12px] min-[1440px]:w-[140px] min-[1600px]:w-[152px] min-[1728px]:w-[160px] min-[1920px]:w-[168px]"
              style={{
                transform: `translate3d(0, ${chapterCardY.toFixed(2)}px, 0)`,
                transition: prefersReducedMotion ? undefined : "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              aria-label="Profile section navigator"
            >
              <div className="flex items-start justify-between gap-2">
                <div aria-live="polite" aria-label={`Current section ${activeSection?.label ?? "Overview"}`}>
                  <p className="font-mono text-[20px] leading-[0.9] text-[#9cdbff] min-[1600px]:text-[22px]">
                    {activeSection?.number ?? "01"}
                  </p>
                  <p className="mt-2 text-[11px] uppercase leading-[1.2] tracking-[0.1em] text-[#d9e8ff] min-[1600px]:text-[12px]">
                    {(activeSection?.label ?? "Overview").toUpperCase()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setChapterMenuOpen((open) => !open)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#88aee4]/24 bg-[#111d34]/75 text-[#c8daf9] motion-safe:transition-colors motion-safe:hover:border-[#7DD3FC]/58 motion-safe:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
                  aria-expanded={chapterMenuOpen}
                  aria-label="Open chapter menu"
                >
                  ☰
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.11em] text-[#8ea4c8] min-[1600px]:text-[11px]">
                  <span>Progress</span>
                  <span className="font-mono text-[#d7e8ff]">{profileProgressPercent}%</span>
                </div>
                <div className="mt-1.5 h-[2px] rounded-full bg-[#6f8abc]/35">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#7DD3FC] via-[#60A5FA] to-[#3B82F6] shadow-[0_0_8px_rgba(96,165,250,0.45)]"
                    style={{ width: `${profileProgressPercent}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (nextSection) {
                    scrollToSectionById(nextSection.id);
                  } else {
                    scrollToProfileTop();
                  }
                }}
                className="mt-3 block w-full rounded-xl border border-[#87abdf]/24 bg-[#101a31]/72 px-2.5 py-2 text-left motion-safe:transition-colors motion-safe:hover:border-[#7DD3FC]/56 motion-safe:hover:bg-[#172540]/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
              >
                <p className="text-[10px] uppercase tracking-[0.11em] text-[#91a7cb]">
                  {nextSection ? "Next" : "Back to Top"}
                </p>
                <p className="mt-1 text-[11px] leading-[1.25] text-[#e0edff] min-[1600px]:text-[12px]">
                  {nextSection ? nextSection.label.toUpperCase() : "HERO"}
                </p>
              </button>

              {chapterMenuOpen ? (
                <div className="mt-2 space-y-1 rounded-xl border border-[#87a9dc]/20 bg-[#101b31]/92 p-1.5 shadow-[0_12px_24px_rgba(3,8,20,0.36)]">
                  {availableSections.map((section) => {
                    const isActive = section.id === activeSectionId;
                    return (
                      <button
                        key={section.id}
                        type="button"
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => {
                          scrollToSectionById(section.id);
                          setChapterMenuOpen(false);
                        }}
                        className={`block w-full rounded-lg px-2 py-1.5 text-left text-[10px] uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC] ${
                          isActive
                            ? "bg-[#264a81]/48 text-[#dcecff]"
                            : "text-[#9db1d0] motion-safe:transition-colors motion-safe:hover:bg-[#223a63]/48 motion-safe:hover:text-[#dcecff]"
                        }`}
                      >
                        <span className="font-mono">{section.number}</span> {section.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
