"use client";

import { CEM_GROWTH_LOOP } from "@/content/services/pilots/cryptoExchangeMarketing.content";
import { clamp01, segmentProgress } from "@/components/services/pilots/cemMotion";

type CemGrowthLoopRingProps = {
  /** Local scene progress 0–1 */
  t: number;
  /** Active step index while rebuilding */
  activeIndex: number;
  complete: boolean;
  className?: string;
};

/**
 * Scene 03 ONLY — circular Growth Loop.
 * Do not reuse this composition in other scenes.
 */
export function CemGrowthLoopRing({
  t,
  activeIndex,
  complete,
  className = "",
}: CemGrowthLoopRingProps) {
  const steps = CEM_GROWTH_LOOP.steps;
  const cx = 200;
  const cy = 200;
  const r = 118;
  const clarify = complete ? segmentProgress(t, 0.92, 1) : 0;

  return (
    <svg
      className={`cem-loop-ring ${className}`.trim()}
      viewBox="0 0 400 400"
      focusable="false"
      aria-hidden
    >
      <defs>
        <linearGradient id="cem-loop-ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D89BB" />
          <stop offset="50%" stopColor="#1D3ABB" />
          <stop offset="100%" stopColor="#4F1DBB" />
        </linearGradient>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="url(#cem-loop-ring-grad)"
        strokeWidth="2"
        strokeDasharray={`${2 * Math.PI * r}`}
        strokeDashoffset={`${2 * Math.PI * r * (1 - (complete ? 1 : clamp01((activeIndex + 1) / steps.length)))}`}
        opacity={0.85 + clarify * 0.15}
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />

      <circle
        cx={cx}
        cy={cy}
        r={36}
        fill="rgba(4,12,28,0.9)"
        stroke={complete ? "#1D89BB" : "rgba(255,255,255,0.2)"}
        strokeWidth="1.25"
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#ffffff"
        style={{
          fontFamily: "var(--font-display), Helvetica, Arial, sans-serif",
          fontSize: "9px",
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        GROWTH
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="rgba(189,224,254,0.7)"
        style={{
          fontFamily: "var(--font-display), Helvetica, Arial, sans-serif",
          fontSize: "8px",
          letterSpacing: "0.16em",
        }}
      >
        LOOP
      </text>

      {steps.map((step, i) => {
        const angle = (-90 + (360 / steps.length) * i) * (Math.PI / 180);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const on = complete || i <= activeIndex;
        const active = !complete && i === activeIndex;
        const labelR = r + 36;
        const lx = cx + Math.cos(angle) * labelR;
        const ly = cy + Math.sin(angle) * labelR;

        return (
          <g key={step.id}>
            <circle
              cx={x}
              cy={y}
              r={active ? 11 : on ? 9 : 6}
              fill={on ? "rgba(29,58,187,0.85)" : "#061022"}
              stroke={active ? "#1D89BB" : on ? "#1D3ABB" : "rgba(255,255,255,0.25)"}
              strokeWidth={active ? 2 : 1.25}
              opacity={on ? 1 : 0.45}
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={on ? "#ffffff" : "rgba(255,255,255,0.35)"}
              style={{
                fontFamily: "var(--font-display), Helvetica, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
              }}
            >
              {step.title.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
