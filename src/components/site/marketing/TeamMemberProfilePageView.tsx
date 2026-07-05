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
  depthStrength = "main",
  className = "",
}: {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
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
      data-glass-depth={depthStrength}
      className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.24)] motion-safe:hover:shadow-[0_28px_72px_rgba(2,8,20,0.55),0_0_52px_rgba(64,116,214,0.22),0_0_0_1px_rgba(195,224,255,0.09)_inset] sm:p-8 ${primaryGlass} ${className}`}
      style={{
        transform:
          "perspective(var(--g-perspective,1200px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
      }}
    >
      <DepthGlassLayers strength={depthStrength} />
      <div className="relative z-10 mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-[#93C5FD]">{number}</p>
          <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#8090a8]">{subtitle}</p> : null}
        </div>
      </div>
      <div className="relative z-10 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{children}</div>
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
  const heroRef = useRef<HTMLElement | null>(null);
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

        <section
          ref={heroRef}
          data-glass-depth="hero"
          className={`group relative overflow-hidden rounded-[30px] p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.26)] motion-safe:hover:shadow-[0_36px_94px_rgba(2,8,20,0.58),0_0_62px_rgba(68,124,224,0.28),0_0_0_1px_rgba(198,226,255,0.1)_inset] sm:p-8 lg:p-10 ${heroGlass}`}
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
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(127,169,255,0.22),transparent_48%)]" />
                <div className="pointer-events-none absolute left-4 top-4 font-mono text-[11px] tracking-[0.24em] text-[#9cb6ff]">
                  {profileIndex} / {totalProfiles}
                </div>
                <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/[0.14] bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#95a3ba]">
                  {member.profileStatus ?? "draft"}
                </div>
                <div className="relative mx-auto mt-3 aspect-square w-full max-w-[350px]">
                  <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(125,211,252,0.32)_0%,rgba(96,165,250,0.14)_42%,transparent_72%)] blur-xl" />
                  <div aria-hidden="true" className="pointer-events-none absolute -inset-1 rounded-full border border-[#7DD3FC]/45" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[2%] rounded-full border border-[#60A5FA]/50" />
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[8%] rounded-full border border-[#93C5FD]/24 bg-[linear-gradient(165deg,rgba(17,28,48,0.7),rgba(11,18,32,0.74))]" />
                  <div aria-hidden="true" className="pointer-events-none absolute -left-3 top-[16%] h-8 w-8 rounded-full border border-[#93C5FD]/45" />
                  <div aria-hidden="true" className="pointer-events-none absolute -right-2 top-[62%] h-5 w-5 rounded-full bg-[#60A5FA]/45 blur-[1px]" />
                  <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-[20%] h-24 w-24 rounded-full border border-[#7DD3FC]/20" />
                  <div className="absolute inset-[13%] overflow-hidden rounded-full border border-[#93C5FD]/20 bg-[#0a1325]">
                  {hasPortrait ? (
                    <Image
                      src={portrait!}
                      alt={portraitAlt}
                      fill
                      className={portraitFitClassName}
                      sizes="(min-width: 1024px) 360px, 80vw"
                      onError={() => setHasPortraitError(true)}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-6xl font-semibold uppercase tracking-[0.08em] text-[#c9d9ff]">
                      {initials}
                    </span>
                  )}
                  </div>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 bottom-4 h-px bg-gradient-to-r from-transparent via-[#93C5FD]/80 to-transparent" />
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

            <SectionFrame number="03" title="SERVICES" subtitle="Engagement Focus">
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

          <section
            data-glass-depth="soft"
            className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.22)] motion-safe:hover:shadow-[0_22px_56px_rgba(3,9,20,0.42),0_0_38px_rgba(68,116,208,0.16)] sm:p-8 ${primaryGlass}`}
            style={{
              transform:
                "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
            }}
          >
            <DepthGlassLayers strength="soft" />
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
            data-glass-depth="soft"
            className={`group relative overflow-hidden rounded-3xl p-6 motion-safe:transition-[box-shadow,border-color,transform] motion-safe:duration-300 motion-safe:hover:border-[rgba(147,197,253,0.22)] motion-safe:hover:shadow-[0_22px_56px_rgba(3,9,20,0.42),0_0_38px_rgba(68,116,208,0.16)] sm:p-8 ${primaryGlass}`}
            style={{
              transform:
                "perspective(var(--g-perspective,1350px)) rotateX(var(--g-tilt-y,0deg)) rotateY(var(--g-tilt-x,0deg)) translateY(var(--g-lift,0px)) scale(var(--g-scale,1))",
            }}
          >
            <DepthGlassLayers strength="soft" />
            <div className="relative z-10">
            <p className="font-mono text-[11px] tracking-[0.24em] text-[#8daeff]">09</p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-white">WORK WITH SIGMA</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#b3c0d6]">Continue through Sigma’s official channel for partnerships and strategic collaboration.</p>
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
                <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8da3d6]">← Previous Operator</span>
                <span className="mt-1 block text-base font-medium text-white">{previousMember.name}</span>
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
