"use client";

import { useCemSceneProgress } from "@/components/services/pilots/CemMotionProvider";
import { sceneStepIndex } from "@/components/services/pilots/cemSceneIndex";
import { CEM_MODULES } from "@/content/services/pilots/cryptoExchangeMarketing.content";

type ModuleItem = { title: string; description: string; cluster: string };

const ALL_MODULES: ModuleItem[] = CEM_MODULES.clusters.flatMap((c) =>
  c.modules.map((m) => ({
    title: m.title,
    description: m.description,
    cluster: c.label,
  })),
);

/**
 * Scene 04 — Architectural Module Matrix / System Rail
 * Fixed positions, no radial overlap, detail panel isolated.
 */
export function CemSceneModules() {
  const { setRef, progress, reduceMotion } = useCemSceneProgress("modules");
  const p = reduceMotion ? 1 : progress;
  const active = sceneStepIndex(p, ALL_MODULES.length, 0.04, 0.9);
  const current = ALL_MODULES[active]!;

  return (
    <section
      ref={setRef}
      className="cem-scene cem-scene--modules cem-pin"
      aria-labelledby="cem-modules-title"
      data-bg="infra"
      data-scene="modules"
      data-active={active}
    >
      <div className="cem-pin__sticky cem-matrix">
        <p className="cem-scene-tag" aria-hidden>
          <span>04</span> Modules connect
        </p>
        <h2 id="cem-modules-title" className="cem-matrix__heading">
          {CEM_MODULES.heading}
        </h2>

        {reduceMotion ? (
          <ul className="cem-matrix__all">
            <li className="cem-matrix__spine-item">Growth Infrastructure</li>
            {ALL_MODULES.map((mod) => (
              <li key={mod.title}>
                <strong>{mod.title}</strong>
                <span>{mod.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="cem-matrix__layout">
            <div className="cem-matrix__spine" aria-hidden>
              <span className="cem-matrix__spine-core">Growth</span>
              <span className="cem-matrix__spine-core">Infrastructure</span>
              <span className="cem-matrix__spine-line" />
            </div>

            <ul className="cem-matrix__rails" aria-hidden>
              {ALL_MODULES.map((mod, i) => {
                const on = i <= active;
                const focus = i === active;
                return (
                  <li
                    key={mod.title}
                    className={
                      focus
                        ? "cem-matrix__mod cem-matrix__mod--active"
                        : on
                          ? "cem-matrix__mod cem-matrix__mod--on"
                          : "cem-matrix__mod"
                    }
                  >
                    <span className="cem-matrix__connector" />
                    <span className="cem-matrix__mod-idx">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="cem-matrix__mod-title">{mod.title}</span>
                    <span className="cem-matrix__mod-cluster">{mod.cluster}</span>
                  </li>
                );
              })}
            </ul>

            <aside className="cem-matrix__detail" aria-live="polite">
              <p className="cem-matrix__detail-idx" aria-hidden>
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(ALL_MODULES.length).padStart(2, "0")}
              </p>
              <p className="cem-matrix__detail-cluster">{current.cluster}</p>
              <h3>{current.title}</h3>
              <p>{current.description}</p>
            </aside>
          </div>
        )}

        {!reduceMotion ? (
          <ul className="sr-only">
            {ALL_MODULES.map((mod) => (
              <li key={mod.title}>
                <strong>{mod.title}</strong> — {mod.description}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
