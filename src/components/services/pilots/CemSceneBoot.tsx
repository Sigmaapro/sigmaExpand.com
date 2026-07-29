"use client";

import { CemBlueprintSurface } from "@/components/services/pilots/CemBlueprintSurface";
import { CemCtaActions } from "@/components/services/pilots/CemCtaActions";
import { useCemSceneProgress } from "@/components/services/pilots/CemMotionProvider";
import { segmentProgress } from "@/components/services/pilots/cemMotion";
import {
  CEM_DEFINITION,
  CEM_HERO,
} from "@/content/services/pilots/cryptoExchangeMarketing.content";

/**
 * Scene 01 — Editorial Blueprint Surface
 * Sticky hero stays lean; body + definition follow as intentional transition.
 */
export function CemSceneBoot() {
  const { setRef, progress, reduceMotion, ready } = useCemSceneProgress("boot");
  const p = reduceMotion ? 1 : Math.max(progress, ready ? 0.32 : 1);

  const titleLines = splitTitle(CEM_HERO.title);
  const titlePhase = reduceMotion ? 1 : Math.max(0.95, segmentProgress(p, 0, 0.28));
  const leadPhase = reduceMotion ? 1 : Math.max(0.92, segmentProgress(p, 0.08, 0.4));
  const ctaPhase = reduceMotion ? 1 : Math.max(0.95, segmentProgress(p, 0.2, 0.5));

  return (
    <>
      <section
        ref={setRef}
        className="cem-scene cem-scene--boot cem-pin"
        aria-labelledby="cem-boot-title"
        data-bg="boot"
        data-scene="boot"
      >
        <div className="cem-pin__sticky cem-boot">
          <p className="cem-scene-tag" aria-hidden>
            <span>01</span> System boot
          </p>

          <div className="cem-boot__stage">
            <div className="cem-boot__copy">
              <p
                className="cem-kicker"
                style={{
                  opacity: titlePhase,
                  transform: `translateY(${(1 - titlePhase) * 6}px)`,
                }}
              >
                Growth infrastructure
              </p>

              <h1 id="cem-boot-title" className="cem-boot__title">
                {titleLines.map((line, i) => {
                  const lineT = reduceMotion
                    ? 1
                    : Math.max(0.92, Math.min(1, titlePhase * titleLines.length - i));
                  return (
                    <span
                      key={line}
                      className="cem-boot__title-line"
                      style={{
                        opacity: lineT,
                        transform: `translateY(${(1 - lineT) * 0.35}rem)`,
                      }}
                    >
                      {line}
                    </span>
                  );
                })}
              </h1>

              <p
                className="cem-boot__lead"
                style={{
                  opacity: leadPhase,
                  transform: `translateY(${(1 - leadPhase) * 8}px)`,
                }}
              >
                {CEM_HERO.subhead}
              </p>

              <div
                className="cem-boot__cta"
                style={{
                  opacity: ctaPhase,
                  transform: `translateY(${(1 - ctaPhase) * 6}px)`,
                }}
              >
                <CemCtaActions
                  primaryLabel={CEM_HERO.primaryCta}
                  secondaryLabel={CEM_HERO.secondaryCta}
                  partnerLabel={CEM_HERO.partnerCta}
                />
              </div>
            </div>

            <CemBlueprintSurface t={p} className="cem-boot__blueprint" />
          </div>
        </div>
      </section>

      {/* Intentional exit — approved body + definition, not clipped into sticky */}
      <section className="cem-boot-exit" aria-label={CEM_DEFINITION.heading}>
        <div className="cem-boot-exit__inner">
          <div className="cem-boot-exit__body">
            {CEM_HERO.body.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <div className="cem-boot-exit__def">
            <h2 className="cem-boot-exit__def-title">{CEM_DEFINITION.heading}</h2>
            <p>{CEM_DEFINITION.paragraphs[0]}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function splitTitle(title: string): string[] {
  const parts = [
    "Crypto Exchange Marketing for",
    "User Acquisition, Volume Growth",
    "and Regional Expansion",
  ];
  if (parts.join(" ") === title) return parts;
  return [title];
}
