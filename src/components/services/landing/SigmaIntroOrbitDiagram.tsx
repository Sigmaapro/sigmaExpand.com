"use client";

import Image from "next/image";

/**
 * OCD-aligned Σ orbit: 8 equal icons on a perfect circle, equal spokes, centered mark.
 */
const ICON_COUNT = 8;
const VIEW = 640;
const CX = VIEW / 2;
const CY = VIEW / 2;
const RING_R = 148;
const ICON_R = 258;
/** Drawn icon art is ~44×44; scale up for readability (logo stays separate). */
const ICON_ART = 44;
const ICON_BOX = 72;
const ICON_SCALE = ICON_BOX / ICON_ART;

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY + radius * Math.sin(rad),
  };
}

/** Quadratic spoke from ring edge toward icon — identical bend on every spoke. */
function spokePath(angleDeg: number) {
  const inner = polar(angleDeg, RING_R + 6);
  const outer = polar(angleDeg, ICON_R - ICON_BOX / 2 - 4);
  const mid = polar(angleDeg, (RING_R + ICON_R) / 2);
  const tangent = ((angleDeg + 90) * Math.PI) / 180;
  const bend = 14;
  const c = {
    x: mid.x + Math.cos(tangent) * bend,
    y: mid.y + Math.sin(tangent) * bend,
  };
  return `M ${inner.x.toFixed(2)} ${inner.y.toFixed(2)} Q ${c.x.toFixed(2)} ${c.y.toFixed(2)} ${outer.x.toFixed(2)} ${outer.y.toFixed(2)}`;
}

function IconTeam() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="14" r="5" fill="#1D89BB" stroke="#1D89BB" />
      <path d="M10 34c1.5-6 5.5-9 12-9s10.5 3 12 9" stroke="#e8eef5" />
      <circle cx="10" cy="16" r="3.5" stroke="#e8eef5" />
      <circle cx="34" cy="16" r="3.5" stroke="#e8eef5" />
      <path d="M4 34c1-4 3.5-6 7-6" stroke="#e8eef5" />
      <path d="M40 34c-1-4-3.5-6-7-6" stroke="#e8eef5" />
    </g>
  );
}

function IconGrowth() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 32V22" stroke="#e8eef5" />
      <path d="M18 32V16" stroke="#e8eef5" />
      <path d="M28 32V20" stroke="#e8eef5" />
      <path d="M8 18l10-8 8 5 10-10" stroke="#1D89BB" />
      <path d="M30 8h8v8" stroke="#1D89BB" />
    </g>
  );
}

function IconHexNetwork() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 6l12 7v14l-12 7-12-7V13z" stroke="#e8eef5" />
      <circle cx="22" cy="22" r="5" fill="#1D89BB" stroke="#1D89BB" />
      <circle cx="22" cy="6" r="2" fill="#e8eef5" stroke="#e8eef5" />
      <circle cx="34" cy="13" r="2" fill="#e8eef5" stroke="#e8eef5" />
      <circle cx="34" cy="31" r="2" fill="#e8eef5" stroke="#e8eef5" />
      <circle cx="22" cy="38" r="2" fill="#e8eef5" stroke="#e8eef5" />
      <circle cx="10" cy="31" r="2" fill="#e8eef5" stroke="#e8eef5" />
      <circle cx="10" cy="13" r="2" fill="#e8eef5" stroke="#e8eef5" />
    </g>
  );
}

function IconMegaphone() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 20h8l14-8v24L16 28H8a4 4 0 0 1-4-4v0a4 4 0 0 1 4-4z" stroke="#e8eef5" />
      <path d="M12 28v4a3 3 0 0 0 3 3h2" stroke="#e8eef5" />
      <path d="M34 16c3 2 5 5 5 8s-2 6-5 8" stroke="#1D89BB" />
      <path d="M36 12c5 3 8 7 8 12s-3 9-8 12" stroke="#1D89BB" />
    </g>
  );
}

function IconGlobe() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="12" stroke="#e8eef5" />
      <path
        d="M8 20h24M20 8c3.5 3.5 5.5 7.5 5.5 12S23.5 28.5 20 32c-3.5-3.5-5.5-7.5-5.5-12S16.5 11.5 20 8z"
        stroke="#e8eef5"
      />
      <path d="M28 30l4 8 4-3-5-7" fill="#1D89BB" stroke="#1D89BB" />
    </g>
  );
}

function IconCommunity() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="28" r="4" stroke="#e8eef5" />
      <circle cx="22" cy="26" r="4.5" stroke="#e8eef5" />
      <circle cx="32" cy="28" r="4" stroke="#e8eef5" />
      <path
        d="M4 38c1-4 4-6 8-6M16 36c1.2-3.5 4-5.5 6-5.5s4.8 2 6 5.5M32 32c4 0 7 2 8 6"
        stroke="#e8eef5"
      />
      <rect x="14" y="8" width="16" height="11" rx="5.5" fill="#1D89BB" stroke="#1D89BB" />
      <circle cx="18.5" cy="13.5" r="1.2" fill="#05070e" stroke="none" />
      <circle cx="22" cy="13.5" r="1.2" fill="#05070e" stroke="none" />
      <circle cx="25.5" cy="13.5" r="1.2" fill="#05070e" stroke="none" />
    </g>
  );
}

function IconIdCard() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="12" width="28" height="20" rx="3" stroke="#e8eef5" />
      <circle cx="14" cy="22" r="3.5" stroke="#e8eef5" />
      <path d="M20 19h10M20 24h8" stroke="#e8eef5" />
      <circle cx="32" cy="14" r="6" fill="#1D89BB" stroke="#1D89BB" />
      <path
        d="M32 11.5l1.1 2.2 2.4.4-1.7 1.7.4 2.4L32 17.2l-2.2 1.1.4-2.4-1.7-1.7 2.4-.4z"
        fill="#e8eef5"
        stroke="none"
      />
    </g>
  );
}

function IconVerified() {
  return (
    <g fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 10h16v18H14z" stroke="#e8eef5" />
      <path d="M14 10l8-4 8 4" stroke="#e8eef5" />
      <circle cx="22" cy="18" r="4" stroke="#e8eef5" />
      <path d="M16 30c1.5-3.5 4-5 6-5s4.5 1.5 6 5" stroke="#e8eef5" />
      <circle cx="32" cy="28" r="6" fill="#1D89BB" stroke="#1D89BB" />
      <path d="M29 28l2 2 4-4" stroke="#e8eef5" />
    </g>
  );
}

const ICONS = [
  IconTeam,
  IconGrowth,
  IconHexNetwork,
  IconMegaphone,
  IconGlobe,
  IconCommunity,
  IconIdCard,
  IconVerified,
] as const;

export function SigmaIntroOrbitDiagram({ className = "" }: { className?: string }) {
  const angles = Array.from({ length: ICON_COUNT }, (_, i) => -90 + i * (360 / ICON_COUNT));

  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[34rem] ${className}`.trim()}
      aria-hidden
    >
      <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="h-full w-full" role="img">
        <defs>
          <radialGradient id="sigma-orbit-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(29,137,187,0.22)" />
            <stop offset="55%" stopColor="rgba(29,58,187,0.08)" />
            <stop offset="100%" stopColor="rgba(5,7,14,0)" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={280} fill="url(#sigma-orbit-glow)" />

        <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="rgba(29,137,187,0.55)" strokeWidth="1.25" />

        {angles.map((angle) => (
          <path
            key={`spoke-${angle}`}
            d={spokePath(angle)}
            fill="none"
            stroke="rgba(85,176,247,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {angles.map((angle, index) => {
          const { x, y } = polar(angle, ICON_R);
          const Icon = ICONS[index]!;
          const half = ICON_ART / 2;
          return (
            <g
              key={`icon-${angle}`}
              transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${ICON_SCALE.toFixed(3)}) translate(${-half} ${-half})`}
            >
              <Icon />
            </g>
          );
        })}
      </svg>

      {/* Metallic Σ mark — size unchanged; only orbit icons grew */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/images/services/sigma-mark.png"
          alt=""
          width={630}
          height={500}
          className="h-auto w-[34%] object-contain"
          priority
        />
      </div>
    </div>
  );
}
