"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import {
  DOME_TEAM_SHUFFLE_SEED,
  type DomeGalleryImage,
} from "@/components/react-bits/DomeGallery";
import {
  getTeamMemberSlug,
  getTeamMembersByLang,
  type TeamMember,
} from "@/content/global/marketing/teamContent";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/useMedia";
import { SigmaBorderGlow } from "@/components/sigma/SigmaBorderGlow";

const DomeGallery = dynamic(() => import("@/components/react-bits/DomeGallery"), {
  ssr: false,
});

function memberPortrait(member: TeamMember): string | null {
  return member.portrait ?? member.imageSrc ?? null;
}

function isPlaceholderImage(src?: string | null): boolean {
  return Boolean(src && src.includes("/images/team/placeholders/member-placeholder-"));
}

function StaticTeamPhotoGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul
      className="sigma-team-dome-static relative z-20 mx-auto mt-10 grid w-full max-w-5xl grid-cols-3 gap-3 px-1 sm:mt-12 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6"
      role="list"
    >
      {members.map((member) => {
        const src = memberPortrait(member);
        const href = `/team/${getTeamMemberSlug(member)}`;
        const alt = src && isPlaceholderImage(src) ? "" : member.name;

        return (
          <li key={member.id} role="listitem" className="min-w-0">
            <SigmaBorderGlow borderRadius={16}>
              <Link
                href={href}
                className="group block overflow-hidden rounded-2xl border border-[rgba(147,197,253,0.16)] bg-[#0a1224]/70 shadow-[0_12px_32px_rgba(2,8,22,0.35)] outline-none transition-[transform,border-color,box-shadow] duration-300 hover:border-[rgba(189,224,254,0.34)] hover:shadow-[0_16px_40px_rgba(2,8,22,0.45)] focus-visible:ring-2 focus-visible:ring-[#82a5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030b1d]"
                aria-label={`Open profile for ${member.name}`}
              >
                <div className="relative aspect-square overflow-hidden">
                  {src ? (
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{
                        objectPosition: member.portraitObjectPosition ?? "center center",
                      }}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-[#121b32] text-sm font-semibold text-[#d0e0ff]">
                      {member.initials ?? member.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(4,10,22,0.55)_100%)]"
                    aria-hidden
                  />
                </div>
                <span className="sr-only">{member.name}</span>
              </Link>
            </SigmaBorderGlow>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Homepage “People behind Sigma” visual: Dome Gallery (desktop) or static photo grid
 * (mobile / reduced-motion). Central copy stays in AboutSection above this layer.
 */
export function TeamDomeGallery() {
  const { language } = useLanguage();
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile(768);
  const members = getTeamMembersByLang(language);

  const images = useMemo(() => {
    const list: DomeGalleryImage[] = [];
    for (const member of members) {
      const src = memberPortrait(member);
      if (!src) continue;
      list.push({
        src,
        alt: member.name,
        href: `/team/${getTeamMemberSlug(member)}`,
        objectPosition: member.portraitObjectPosition ?? "center center",
      });
    }
    return list;
  }, [members]);

  const onItemActivate = useCallback(
    (item: DomeGalleryImage) => {
      if (!item.href) return;
      router.push(item.href);
    },
    [router],
  );

  if (members.length === 0) return null;

  if (reduceMotion || isMobile) {
    return <StaticTeamPhotoGrid members={members} />;
  }

  return (
    <div className="sigma-team-dome-layer pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Soft dim so the glass copy panel stays readable over photos */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,rgba(3,8,20,0.55)_0%,rgba(3,8,20,0.22)_48%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-auto absolute inset-0 z-0">
        <DomeGallery
          images={images}
          fit={0.75}
          segments={28}
          dragDampening={2.8}
          maxVerticalRotationDeg={10}
          minRadius={420}
          maxRadius={920}
          overlayBlurColor="#030b1d"
          imageBorderRadius="22px"
          grayscale={false}
          shuffleSeed={DOME_TEAM_SHUFFLE_SEED}
          autoRotate
          autoRotateSpeed={0.06}
          onItemActivate={onItemActivate}
        />
      </div>
    </div>
  );
}
