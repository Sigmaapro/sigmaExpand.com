"use client";

import { useCemSceneProgress } from "@/components/services/pilots/CemMotionProvider";
import { mapRange } from "@/components/services/pilots/cemMotion";
import { sceneStepIndex } from "@/components/services/pilots/cemSceneIndex";
import {
  CEM_REGIONS,
  CEM_STAGES,
} from "@/content/services/pilots/cryptoExchangeMarketing.content";

/**
 * Scene 05 — Horizontal Stage Conveyor
 * Vertical scroll drives horizontal progression; no node diagrams.
 */
export function CemSceneStages() {
  const { setRef, progress, reduceMotion } = useCemSceneProgress("stages");
  const p = reduceMotion ? 1 : progress;
  const rows = CEM_STAGES.rows;
  const index = sceneStepIndex(p, rows.length, 0.08, 0.82);
  const row = rows[index]!;
  const translate = reduceMotion ? 0 : -(index * 88);

  return (
    <>
      <section
        ref={setRef}
        className="cem-scene cem-scene--stages cem-pin"
        aria-labelledby="cem-stages-title"
        data-bg="signals"
        data-scene="stages"
        data-active={index}
      >
        <div className="cem-pin__sticky cem-stages">
          <p className="cem-scene-tag" aria-hidden>
            <span>05</span> Expansion
          </p>
          <h2 id="cem-stages-title" className="cem-stages__heading">
            {CEM_STAGES.heading}
          </h2>

          {reduceMotion ? (
            <div className="cem-stages__stack">
              {rows.map((r) => (
                <article key={r.stage} className="cem-stages__card cem-stages__card--active">
                  <p className="cem-stages__label">{CEM_STAGES.columns[0]}</p>
                  <h3>{r.stage}</h3>
                  <p className="cem-stages__meta">
                    <span>{CEM_STAGES.columns[1]}</span>
                    {r.goal}
                  </p>
                  <p className="cem-stages__meta">
                    <span>{CEM_STAGES.columns[2]}</span>
                    {r.focus}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <>
              <div className="cem-stages__rail" aria-hidden>
                <div
                  className="cem-stages__rail-fill"
                  style={{
                    transform: `scaleX(${mapRange(p, 0.08, 0.82, 0.08, 1)})`,
                  }}
                />
              </div>

              <div className="cem-stages__viewport">
                <div
                  className="cem-stages__track"
                  style={{ transform: `translate3d(${translate}%, 0, 0)` }}
                >
                  {rows.map((r, i) => {
                    const dist = Math.abs(i - index);
                    return (
                      <article
                        key={r.stage}
                        className={
                          i === index
                            ? "cem-stages__card cem-stages__card--active"
                            : "cem-stages__card"
                        }
                        style={{ opacity: dist === 0 ? 1 : dist === 1 ? 0.45 : 0.2 }}
                        aria-hidden={i !== index}
                      >
                        <p className="cem-stages__label">{CEM_STAGES.columns[0]}</p>
                        <h3>{r.stage}</h3>
                        <p className="cem-stages__meta">
                          <span>{CEM_STAGES.columns[1]}</span>
                          {r.goal}
                        </p>
                        <p className="cem-stages__meta">
                          <span>{CEM_STAGES.columns[2]}</span>
                          {r.focus}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <p className="cem-stages__progress" aria-hidden>
                {String(index + 1).padStart(2, "0")} / {String(rows.length).padStart(2, "0")} —{" "}
                {row.stage}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="cem-stages__regions cem-stages__regions--exit" aria-labelledby="cem-regions-title">
        <h3 id="cem-regions-title" className="cem-stages__regions-title">
          {CEM_REGIONS.heading}
        </h3>
        <p className="cem-stages__regions-intro">{CEM_REGIONS.intro}</p>
        <ul className="cem-stages__region-list">
          {CEM_REGIONS.items.map((item) => (
            <li key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </li>
          ))}
        </ul>
        <p className="cem-stages__regions-close">{CEM_REGIONS.closing}</p>
      </section>

      {!reduceMotion ? (
        <div className="sr-only">
          <table>
            <thead>
              <tr>
                {CEM_STAGES.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.stage}>
                  <th>{r.stage}</th>
                  <td>{r.goal}</td>
                  <td>{r.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
