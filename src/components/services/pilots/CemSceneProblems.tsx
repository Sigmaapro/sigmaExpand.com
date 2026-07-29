"use client";

import {
  CemDiagnosticField,
  type DiagnosticChannel,
} from "@/components/services/pilots/CemDiagnosticField";
import { useCemSceneProgress } from "@/components/services/pilots/CemMotionProvider";
import { sceneStepIndex } from "@/components/services/pilots/cemSceneIndex";
import { CEM_PROBLEMS } from "@/content/services/pilots/cryptoExchangeMarketing.content";

/**
 * Channel labels derived from approved problem titles (not new claims).
 */
const DIAG_CHANNELS: DiagnosticChannel[] = [
  { label: "Acquisition / Onboarding", statusIdle: "OK" },
  { label: "KOL Activation", statusIdle: "OK" },
  { label: "IB & Affiliate", statusIdle: "OK" },
  { label: "Trading Volume", statusIdle: "OK" },
  { label: "Regional Messaging", statusIdle: "OK" },
];

/**
 * Scene 02 — Diagnostic Scanner
 * One dominant problem; visual fault state stays in sync with copy.
 */
export function CemSceneProblems() {
  const { setRef, progress, reduceMotion } = useCemSceneProgress("problems");
  const p = reduceMotion ? 1 : progress;
  const problems = CEM_PROBLEMS.items;
  const activeProblem = sceneStepIndex(p, problems.length);
  const faultCount = reduceMotion ? problems.length : activeProblem + 1;
  const current = problems[activeProblem]!;

  return (
    <section
      ref={setRef}
      className="cem-scene cem-scene--problems cem-pin"
      aria-labelledby="cem-problems-title"
      data-bg="problems"
      data-scene="problems"
      data-active={activeProblem}
    >
      <div className="cem-pin__sticky cem-diag">
        <p className="cem-scene-tag" aria-hidden>
          <span>02</span> Problems
        </p>
        <h2 id="cem-problems-title" className="cem-diag__heading">
          {CEM_PROBLEMS.heading}
        </h2>
        <p className="cem-diag__intro">{CEM_PROBLEMS.intro}</p>

        {reduceMotion ? (
          <ul className="cem-diag__all">
            {problems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cem-diag__layout cem-diag__layout--scan">
            <CemDiagnosticField
              channels={DIAG_CHANNELS}
              activeIndex={activeProblem}
              faultCount={faultCount}
            />

            <div className="cem-diag__panel" aria-live="polite">
              <p className="cem-diag__index" aria-hidden>
                {String(activeProblem + 1).padStart(2, "0")} /{" "}
                {String(problems.length).padStart(2, "0")}
              </p>
              <p className="cem-diag__channel" aria-hidden>
                {DIAG_CHANNELS[activeProblem]?.label}
              </p>
              <h3 className="cem-diag__problem-title">{current.title}</h3>
              <p className="cem-diag__problem-body">{current.description}</p>
              <div className="cem-diag__progress" aria-hidden>
                {problems.map((_, i) => (
                  <span
                    key={i}
                    className={
                      i === activeProblem
                        ? "cem-diag__pip cem-diag__pip--on"
                        : i < faultCount
                          ? "cem-diag__pip cem-diag__pip--done"
                          : "cem-diag__pip"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {!reduceMotion ? (
          <ul className="sr-only">
            {problems.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong> — {item.description}
              </li>
            ))}
          </ul>
        ) : null}

        <aside className="cem-diag__notice">
          <p>{CEM_PROBLEMS.midDisclaimer}</p>
        </aside>
      </div>
    </section>
  );
}
