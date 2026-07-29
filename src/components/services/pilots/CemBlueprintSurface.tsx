"use client";

import { segmentProgress } from "@/components/services/pilots/cemMotion";

type CemBlueprintSurfaceProps = {
  t: number;
  className?: string;
};

/**
 * Scene 01 visual — editorial blueprint surface.
 * Abstract infrastructure geometry only; no growth-loop nodes or body copy.
 */
export function CemBlueprintSurface({ t, className = "" }: CemBlueprintSurfaceProps) {
  const wake = segmentProgress(t, 0, 0.35);
  const grid = segmentProgress(t, 0.1, 0.55);
  const trace = segmentProgress(t, 0.25, 0.75);
  const lock = segmentProgress(t, 0.55, 0.95);

  return (
    <div className={`cem-blueprint ${className}`.trim()} aria-hidden>
      <svg className="cem-blueprint__svg" viewBox="0 0 420 480" focusable="false">
        <defs>
          <linearGradient id="cem-bp-trace" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D89BB" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#1D3ABB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4F1DBB" stopOpacity="0.55" />
          </linearGradient>
          <pattern id="cem-bp-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="rgba(29,137,187,0.14)"
              strokeWidth="0.75"
              opacity={0.35 + grid * 0.65}
            />
          </pattern>
        </defs>

        <rect x="24" y="24" width="372" height="432" fill="url(#cem-bp-grid)" opacity={0.4 + wake * 0.6} />
        <rect
          x="24"
          y="24"
          width="372"
          height="432"
          fill="none"
          stroke="rgba(29,137,187,0.35)"
          strokeWidth="1"
          opacity={wake}
        />

        {/* Coordinate ticks */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={`tick-${i}`} opacity={0.35 + grid * 0.5}>
            <line
              x1={24 + i * 62}
              y1="24"
              x2={24 + i * 62}
              y2="34"
              stroke="rgba(189,224,254,0.45)"
              strokeWidth="1"
            />
            <line
              x1="24"
              y1={24 + i * 72}
              x2="34"
              y2={24 + i * 72}
              stroke="rgba(189,224,254,0.45)"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Layered infrastructure planes */}
        <path
          d="M72 120 H220 V210 H340 V320 H160 V400"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinejoin="round"
          opacity={wake}
        />
        <path
          d="M72 120 H220 V210 H340 V320 H160 V400"
          fill="none"
          stroke="url(#cem-bp-trace)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeDasharray="520"
          strokeDashoffset={520 - 520 * trace}
        />

        {/* Structural blocks */}
        <rect
          x="78"
          y="132"
          width="56"
          height="40"
          fill="rgba(4,12,28,0.85)"
          stroke="#1D89BB"
          strokeWidth="1.25"
          opacity={0.3 + lock * 0.7}
        />
        <rect
          x="236"
          y="224"
          width="72"
          height="48"
          fill="rgba(4,12,28,0.85)"
          stroke="#1D3ABB"
          strokeWidth="1.25"
          opacity={0.25 + lock * 0.75}
        />
        <rect
          x="172"
          y="336"
          width="64"
          height="40"
          fill="rgba(4,12,28,0.85)"
          stroke="#4F1DBB"
          strokeWidth="1.25"
          opacity={0.2 + lock * 0.8}
        />

        {/* Micro annotation marks (non-copy) */}
        <circle cx="72" cy="120" r="3.5" fill="#1D89BB" opacity={trace} />
        <circle cx="220" cy="210" r="3.5" fill="#1D3ABB" opacity={trace} />
        <circle cx="340" cy="320" r="3.5" fill="#4F1DBB" opacity={lock} />
        <circle cx="160" cy="400" r="3.5" fill="#1D89BB" opacity={lock} />

        <text
          x="86"
          y="108"
          fill="rgba(189,224,254,0.55)"
          style={{ fontFamily: "var(--font-display), Helvetica, Arial, sans-serif", fontSize: "9px", letterSpacing: "0.18em" }}
          opacity={grid}
        >
          SYS / BOOT
        </text>
        <text
          x="248"
          y="214"
          fill="rgba(189,224,254,0.45)"
          style={{ fontFamily: "var(--font-display), Helvetica, Arial, sans-serif", fontSize: "9px", letterSpacing: "0.16em" }}
          opacity={trace}
        >
          SIGNAL
        </text>
        <text
          x="178"
          y="326"
          fill="rgba(189,224,254,0.4)"
          style={{ fontFamily: "var(--font-display), Helvetica, Arial, sans-serif", fontSize: "9px", letterSpacing: "0.16em" }}
          opacity={lock}
        >
          LOCK
        </text>
      </svg>
    </div>
  );
}
