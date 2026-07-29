"use client";

import { CemGrowthLoopRing } from "@/components/services/pilots/CemGrowthLoopRing";
import { useCemSceneProgress } from "@/components/services/pilots/CemMotionProvider";
import { sceneStepIndex } from "@/components/services/pilots/cemSceneIndex";
import { CEM_GROWTH_LOOP } from "@/content/services/pilots/cryptoExchangeMarketing.content";

/**
 * Scene 03 — System Rebuild (circular Growth Loop — only scene allowed this model)
 */
export function CemSceneLoop() {
  const { setRef, progress, reduceMotion } = useCemSceneProgress("rebuild");
  const p = reduceMotion ? 1 : progress;
  const steps = CEM_GROWTH_LOOP.steps;
  const active = sceneStepIndex(p, steps.length, 0.05, 0.88);
  const complete = reduceMotion || p > 0.9;
  const step = steps[active]!;

  return (
    <section
      ref={setRef}
      className="cem-scene cem-scene--loop cem-pin"
      aria-labelledby="cem-loop-title"
      data-bg="rebuild"
      data-scene="rebuild"
      data-active={active}
      data-complete={complete ? "true" : "false"}
    >
      <div className="cem-pin__sticky cem-rebuild">
        <p className="cem-scene-tag" aria-hidden>
          <span>03</span> System rebuild
        </p>
        <h2 id="cem-loop-title" className="cem-rebuild__heading">
          {CEM_GROWTH_LOOP.heading}
        </h2>
        <p className="cem-rebuild__intro">{CEM_GROWTH_LOOP.intro}</p>

        <div className="cem-rebuild__stage cem-rebuild__stage--ring">
          <div className="cem-rebuild__visual" aria-hidden>
            <CemGrowthLoopRing
              t={p}
              activeIndex={active}
              complete={complete}
              className="cem-rebuild__svg"
            />
          </div>

          {reduceMotion ? (
            <ol className="cem-rebuild__all">
              {steps.map((s) => (
                <li key={s.id}>
                  <strong>{s.title}</strong>
                  <span>{s.description}</span>
                </li>
              ))}
              <li className="cem-rebuild__closing-item">{CEM_GROWTH_LOOP.closing}</li>
            </ol>
          ) : (
            <div className="cem-rebuild__copy" aria-live="polite">
              <p className="cem-rebuild__step-index" aria-hidden>
                {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </p>
              <h3 className="cem-rebuild__step-title">{step.title}</h3>
              <p className="cem-rebuild__step-body">{step.description}</p>
              {complete ? (
                <p className="cem-rebuild__closing">{CEM_GROWTH_LOOP.closing}</p>
              ) : null}
            </div>
          )}
        </div>

        {!reduceMotion ? (
          <ol className="sr-only">
            {steps.map((s) => (
              <li key={s.id}>
                {s.title}: {s.description}
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
