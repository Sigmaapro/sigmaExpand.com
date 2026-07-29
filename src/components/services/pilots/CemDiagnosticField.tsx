"use client";

import { clamp01 } from "@/components/services/pilots/cemMotion";

export type DiagnosticChannel = {
  /** Short label derived from approved problem title — not new claims */
  label: string;
  statusIdle: string;
};

type CemDiagnosticFieldProps = {
  channels: DiagnosticChannel[];
  /** Active fault index 0..n-1 */
  activeIndex: number;
  /** How many faults have accumulated (1..n) */
  faultCount: number;
  className?: string;
};

/**
 * Scene 02 visual — diagnostic scanner / system health monitor.
 * No growth-loop nodes. One active fault; prior faults remain degraded.
 */
export function CemDiagnosticField({
  channels,
  activeIndex,
  faultCount,
  className = "",
}: CemDiagnosticFieldProps) {
  const scanY = 8 + (activeIndex / Math.max(channels.length - 1, 1)) * 84;
  const damage = clamp01(faultCount / channels.length);

  return (
    <div
      className={`cem-scan ${className}`.trim()}
      aria-hidden
      style={{ ["--cem-scan-damage" as string]: damage }}
    >
      <div className="cem-scan__chrome">
        <span>SYS HEALTH</span>
        <span className={damage > 0.7 ? "cem-scan__badge cem-scan__badge--crit" : "cem-scan__badge"}>
          {damage > 0.7 ? "CRITICAL" : damage > 0.35 ? "DEGRADED" : "SCAN"}
        </span>
      </div>

      <div className="cem-scan__field">
        <div className="cem-scan__beam" style={{ top: `${scanY}%` }} />

        <ul className="cem-scan__channels">
          {channels.map((ch, i) => {
            const failed = i < faultCount;
            const active = i === activeIndex;
            return (
              <li
                key={ch.label}
                className={
                  active
                    ? "cem-scan__channel cem-scan__channel--active"
                    : failed
                      ? "cem-scan__channel cem-scan__channel--fault"
                      : "cem-scan__channel"
                }
              >
                <span className="cem-scan__idx">{String(i + 1).padStart(2, "0")}</span>
                <span className="cem-scan__label">{ch.label}</span>
                <span className="cem-scan__meter" aria-hidden>
                  <span
                    className="cem-scan__meter-fill"
                    style={{
                      transform: `scaleX(${failed ? (active ? 0.22 : 0.35) : 0.92})`,
                    }}
                  />
                </span>
                <span className="cem-scan__status">
                  {active ? "FAULT" : failed ? "FAIL" : ch.statusIdle}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="cem-scan__interrupt" style={{ opacity: 0.25 + damage * 0.75 }}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="cem-scan__footer">
        <span>INTEGRITY</span>
        <div className="cem-scan__integrity">
          <span style={{ width: `${Math.max(8, (1 - damage) * 100)}%` }} />
        </div>
      </div>
    </div>
  );
}
