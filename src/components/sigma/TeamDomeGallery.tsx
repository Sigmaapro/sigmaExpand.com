"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
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

const DomeGallery = dynamic(() => import("@/components/react-bits/DomeGallery"), {
  ssr: false,
});

function memberPortrait(member: TeamMember): string | null {
  return member.portrait ?? member.imageSrc ?? null;
}

/**
 * Homepage “People behind Sigma” visual: Dome Gallery on all viewports.
 * Mobile uses lighter segments / radius / rotate speed — same component identity.
 * Static absolute backdrop only for prefers-reduced-motion.
 */
export function TeamDomeGallery() {
  const { language } = useLanguage();
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const isMobile = useIsMobile(768);
  const [isCoarsePointer, setIsCoarsePointer] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false,
  );
  const members = getTeamMembersByLang(language);
  const domeInteractive = !isMobile && !isCoarsePointer;

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsCoarsePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  if (reduceMotion) {
    return (
      <div className="sigma-team-dome-layer pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,rgba(3,8,20,0.55)_0%,rgba(3,8,20,0.22)_48%,transparent_72%)]"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-45">
          <div className="grid grid-cols-4 gap-2 px-6 sm:grid-cols-6 sm:gap-3 md:grid-cols-8">
            {images.slice(0, 16).map((img) => (
              <div key={img.src} className="relative aspect-square w-14 overflow-hidden rounded-xl sm:w-16 md:w-20">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                  style={{ objectPosition: img.objectPosition }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sigma-team-dome-layer pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_55%_50%_at_50%_48%,rgba(3,8,20,0.55)_0%,rgba(3,8,20,0.22)_48%,transparent_72%)]"
        aria-hidden
      />
      <div className={`absolute inset-0 z-0 ${domeInteractive ? "pointer-events-auto" : "pointer-events-none"}`}>
        <DomeGallery
          images={images}
          fit={isMobile ? 0.92 : 0.75}
          segments={isMobile ? 18 : 28}
          dragDampening={isMobile ? 3.4 : 2.8}
          maxVerticalRotationDeg={isMobile ? 8 : 10}
          minRadius={isMobile ? 260 : 420}
          maxRadius={isMobile ? 620 : 920}
          overlayBlurColor="#030b1d"
          imageBorderRadius="22px"
          grayscale={false}
          shuffleSeed={DOME_TEAM_SHUFFLE_SEED}
          autoRotate
          autoRotateSpeed={isMobile ? 0.04 : 0.06}
          interactive={domeInteractive}
          onItemActivate={domeInteractive ? onItemActivate : undefined}
        />
      </div>
    </div>
  );
}
