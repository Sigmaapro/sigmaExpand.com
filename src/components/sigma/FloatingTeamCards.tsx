"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  getTeamMemberSlug,
  teamPageContentByLang,
  type TeamMember,
} from "@/content/global/marketing/teamContent";
import { pickLang } from "@/content/global/marketing/helpers";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/useMedia";
import { localeHeading, localeMeta } from "@/lib/localeTypography";

/**
 * Bubble-field presets (hydration-safe — no Math.random in render).
 * Depth: near (0.85–1), mid (0.55–0.75), far (0.25–0.45).
 * endTop is near/above section top so cards travel the full height, then loop.
 */
const FLOAT_PRESETS = [
  /* Left-bottom / left flank */
  { left: 3, drift: -22, rotate: -2.4, scale: 0.72, opacity: 0.32, duration: 42, delay: -4, endTop: -8, z: 0 },
  { left: 8, drift: 18, rotate: 2.0, scale: 1.02, opacity: 0.94, duration: 29, delay: -12, endTop: -14, z: 3 },
  { left: 11, drift: -28, rotate: -1.6, scale: 0.88, opacity: 0.64, duration: 36, delay: -20, endTop: -6, z: 2 },
  { left: 16, drift: 26, rotate: 2.8, scale: 0.76, opacity: 0.38, duration: 46, delay: -28, endTop: -10, z: 0 },
  { left: 20, drift: -16, rotate: -2.2, scale: 0.98, opacity: 0.9, duration: 31, delay: -8, endTop: -16, z: 3 },
  /* Mid-left */
  { left: 26, drift: 14, rotate: 1.4, scale: 0.84, opacity: 0.58, duration: 39, delay: -16, endTop: -5, z: 1 },
  { left: 32, drift: -24, rotate: -2.8, scale: 0.7, opacity: 0.28, duration: 44, delay: -24, endTop: -12, z: 0 },
  /* Center */
  { left: 40, drift: 20, rotate: 1.8, scale: 0.9, opacity: 0.68, duration: 34, delay: -2, endTop: -9, z: 2 },
  { left: 48, drift: -18, rotate: -1.2, scale: 0.74, opacity: 0.36, duration: 48, delay: -18, endTop: -4, z: 0 },
  { left: 52, drift: 30, rotate: 2.6, scale: 1.04, opacity: 0.96, duration: 27, delay: -10, endTop: -15, z: 3 },
  /* Mid-right / right flank */
  { left: 60, drift: -20, rotate: -2.0, scale: 0.86, opacity: 0.62, duration: 37, delay: -22, endTop: -7, z: 1 },
  { left: 66, drift: 24, rotate: 3.0, scale: 1.0, opacity: 0.92, duration: 30, delay: -6, endTop: -13, z: 3 },
  { left: 70, drift: -32, rotate: -1.8, scale: 0.78, opacity: 0.42, duration: 43, delay: -14, endTop: -8, z: 0 },
  { left: 74, drift: 16, rotate: 2.2, scale: 0.92, opacity: 0.72, duration: 35, delay: -26, endTop: -11, z: 2 },
  { left: 78, drift: -14, rotate: -2.6, scale: 1.03, opacity: 0.95, duration: 28, delay: -1, endTop: -17, z: 3 },
  { left: 82, drift: 28, rotate: 1.6, scale: 0.82, opacity: 0.58, duration: 40, delay: -19, endTop: -6, z: 1 },
  /* Right-bottom / edge spill */
  { left: 88, drift: -26, rotate: -3.0, scale: 0.96, opacity: 0.88, duration: 32, delay: -9, endTop: -14, z: 3 },
  { left: 92, drift: 12, rotate: 2.4, scale: 0.68, opacity: 0.3, duration: 45, delay: -27, endTop: -5, z: 0 },
  { left: 96, drift: -18, rotate: -1.4, scale: 0.86, opacity: 0.66, duration: 38, delay: -15, endTop: -10, z: 2 },
  { left: 99, drift: 22, rotate: 1.8, scale: 0.74, opacity: 0.4, duration: 41, delay: -23, endTop: -8, z: 0 },
  /* Extra left/right fillers */
  { left: 5, drift: 34, rotate: 2.5, scale: 0.9, opacity: 0.7, duration: 33, delay: -30, endTop: -12, z: 2 },
  { left: 85, drift: -30, rotate: -2.1, scale: 0.8, opacity: 0.45, duration: 47, delay: -11, endTop: -9, z: 0 },
] as const;

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SG";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

function isPlaceholderImage(src?: string | null): boolean {
  return Boolean(src && src.includes("/images/team/placeholders/member-placeholder-"));
}

function GlassTeamCard({
  member,
  language,
  compact,
  size = "md",
}: {
  member: TeamMember;
  language: ReturnType<typeof useLanguage>["language"];
  compact?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const initials = member.initials ?? initialsFromName(member.name);
  const portrait = member.portrait ?? member.imageSrc;
  const [hasImageError, setHasImageError] = useState(false);
  const hasImage = Boolean(portrait && !hasImageError);
  const altText = portrait && isPlaceholderImage(portrait) ? "" : member.name;
  const href = `/team/${getTeamMemberSlug(member)}`;

  const widthClass = compact
    ? "w-[15.5rem] shrink-0 p-3.5 sm:w-[16.5rem] sm:p-4"
    : size === "sm"
      ? "w-[11.5rem] p-3"
      : size === "lg"
        ? "w-[16.25rem] p-4"
        : "w-[14.25rem] p-3.5";

  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-2xl border border-[rgba(147,197,253,0.18)] bg-[linear-gradient(155deg,rgba(7,11,21,0.62),rgba(12,22,42,0.72))] shadow-[0_18px_48px_rgba(2,8,22,0.42),inset_0_1px_0_rgba(210,228,255,0.12)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030b1d] hover:border-[rgba(189,224,254,0.36)] hover:shadow-[0_22px_56px_rgba(2,8,22,0.5),0_0_36px_rgba(28,57,187,0.22),inset_0_1px_0_rgba(210,228,255,0.16)] hover:scale-[1.03] ${widthClass}`}
      aria-label={`Open profile for ${member.name}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(189,224,254,0.08),transparent_55%)]" />
      <div className="relative z-[1] flex items-start gap-3">
        <div
          className={`relative shrink-0 overflow-hidden rounded-xl border border-[rgba(147,197,253,0.22)] bg-[#121b32] ${
            size === "sm" ? "h-10 w-10" : size === "lg" ? "h-14 w-14" : "h-12 w-12"
          }`}
        >
          {hasImage ? (
            <Image
              src={portrait!}
              alt={altText}
              fill
              className="object-cover"
              sizes="56px"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <span
              className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.08em] text-[#d0e0ff]"
              aria-hidden
            >
              {initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 text-start">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`truncate font-display font-semibold leading-snug text-white ${
                size === "sm" ? "text-xs" : "text-sm sm:text-[15px]"
              } ${localeHeading(language)}`}
            >
              {member.name}
            </h3>
            <ArrowUpRight
              className="mt-0.5 size-3.5 shrink-0 text-[#bde0fe]/55 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#bde0fe]/85"
              aria-hidden
            />
          </div>
          {member.role ? (
            <p
              className={`mt-1 line-clamp-2 uppercase leading-snug tracking-[0.12em] text-[#9aa5b3] ${
                size === "sm" ? "text-[9px]" : "text-[10px] sm:text-[11px]"
              } ${localeMeta(language)}`}
            >
              {member.role}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function cardSizeFromScale(scale: number): "sm" | "md" | "lg" {
  if (scale < 0.8) return "sm";
  if (scale > 0.98) return "lg";
  return "md";
}

function FloatingCard({
  member,
  preset,
  language,
}: {
  member: TeamMember;
  preset: (typeof FLOAT_PRESETS)[number];
  language: ReturnType<typeof useLanguage>["language"];
}) {
  const depthClass =
    preset.opacity <= 0.45
      ? "sigma-team-float-far"
      : preset.opacity <= 0.75
        ? "sigma-team-float-mid"
        : "sigma-team-float-near";

  return (
    <div
      className={`sigma-team-float-item pointer-events-auto absolute will-change-[top,transform,opacity] ${depthClass}`}
      style={
        {
          left: `${preset.left}%`,
          zIndex: preset.z,
          "--team-float-duration": `${preset.duration}s`,
          "--team-float-delay": `${preset.delay}s`,
          "--team-float-drift": `${preset.drift}px`,
          "--team-float-rotate": `${preset.rotate}deg`,
          "--team-float-scale": preset.scale,
          "--team-float-opacity": preset.opacity,
          "--team-float-end-top": `${preset.endTop}%`,
        } as CSSProperties
      }
    >
      <GlassTeamCard
        member={member}
        language={language}
        size={cardSizeFromScale(preset.scale)}
      />
    </div>
  );
}

export function FloatingTeamCards() {
  const { language } = useLanguage();
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile(768);
  const content = pickLang(teamPageContentByLang, language);
  const members = [...content.coreMembers, ...content.innerCircleMembers];

  if (members.length === 0) return null;

  /** Reuse real members across presets for a denser field (decorative duplicates). */
  const floatInstances = FLOAT_PRESETS.map((preset, index) => {
    const member = members[index % members.length]!;
    return {
      preset,
      member,
      instanceKey: `${member.id}-float-${index}`,
    };
  });

  const useStatic = reduceMotion || isMobile;

  if (useStatic) {
    return (
      <div className="relative z-20 mx-auto mt-10 w-full max-w-6xl px-1 sm:mt-12 sm:px-0">
        <div
          className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:thin] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          role="list"
        >
          {members.map((member) => (
            <div key={member.id} className="min-w-0" role="listitem">
              <GlassTeamCard member={member} language={language} compact />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div className="sigma-team-float-stage absolute inset-0">
        {floatInstances.map(({ member, preset, instanceKey }) => (
          <FloatingCard
            key={instanceKey}
            member={member}
            preset={preset}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}
