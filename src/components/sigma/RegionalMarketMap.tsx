"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo } from "react";
import type { CryptoMarketTab, CryptoMarketTabKey } from "@/content/sections/cryptoAgency";
import type { LangCode } from "@/content/types";
import { isLatinAcronymLabel, localeNav } from "@/lib/localeTypography";

/**
 * Positions over the CodePen dotted world map (viewBox 0 0 845.2 458).
 * Existing region keys only — decorative placement, not claims.
 * No inner card chrome — dots float inside the parent glass panel.
 */
const MAP_VB = { w: 845.2, h: 458 } as const;

const NODE_LAYOUT: Record<
  CryptoMarketTabKey,
  { x: number; y: number; halo: number; labelY: number }
> = {
  europe: { x: 478, y: 138, halo: 48, labelY: 178 },
  wana: { x: 545, y: 205, halo: 56, labelY: 248 },
  cis: { x: 600, y: 112, halo: 52, labelY: 152 },
  apac: { x: 720, y: 220, halo: 64, labelY: 268 },
  latam: { x: 255, y: 305, halo: 58, labelY: 348 },
};

const ARC_PAIRS: [CryptoMarketTabKey, CryptoMarketTabKey][] = [
  ["europe", "wana"],
  ["europe", "cis"],
  ["wana", "cis"],
  ["wana", "apac"],
  ["cis", "apac"],
  ["europe", "latam"],
  ["wana", "latam"],
];

type Props = {
  tabs: CryptoMarketTab[];
  activeKey: CryptoMarketTabKey;
  onSelectKey: (key: CryptoMarketTabKey) => void;
  regionsAriaLabel: string;
  lang: LangCode;
};

export function RegionalMarketMap({
  tabs,
  activeKey,
  onSelectKey,
  regionsAriaLabel,
  lang,
}: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const spotlight = `wm-spot-${uid}`;
  const arcGlow = `wm-arc-${uid}`;

  const active = NODE_LAYOUT[activeKey];

  const byKey = useMemo(() => {
    const map = new Map<CryptoMarketTabKey, CryptoMarketTab>();
    for (const tab of tabs) map.set(tab.key, tab);
    return map;
  }, [tabs]);

  return (
    <div
      className="relative isolate min-h-[240px] w-full bg-transparent sm:min-h-[290px] lg:min-h-full"
      role="group"
      aria-label={regionsAriaLabel}
    >
      {/* Transparent map stage — no border / fill / frame (parent glass owns the panel) */}
      <div className="relative mx-auto aspect-[845/458] w-full max-w-3xl overflow-visible bg-transparent lg:max-w-none">
        {/* Soft depth only — radial, not a rectangle */}
        <div
          className="pointer-events-none absolute inset-[8%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(28,57,187,0.22)_0%,transparent_70%)] blur-2xl"
          aria-hidden
        />

        {/* Very soft blueprint hint — radial-masked so edges never form a hard box */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(189,224,254,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(189,224,254,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 72% 68% at 50% 46%, #000 30%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 72% 68% at 50% 46%, #000 30%, transparent 78%)",
          }}
          aria-hidden
        />

        <motion.div
          className="absolute inset-0 origin-center bg-transparent"
          animate={
            reduceMotion
              ? { scale: 1, x: 0, y: 0 }
              : {
                  scale: 1.03,
                  x: `${((MAP_VB.w / 2 - active.x) / MAP_VB.w) * 4}%`,
                  y: `${((MAP_VB.h / 2 - active.y) / MAP_VB.h) * 3}%`,
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {/* Dotted map — transparent asset, no wrapper chrome */}
          <div className="absolute inset-0 bg-transparent" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG; avoids next/image SVG config */}
            <img
              src="/images/home/world-dotted-map.svg"
              alt=""
              className="h-full w-full bg-transparent object-contain opacity-[0.7] mix-blend-screen"
              draggable={false}
            />
          </div>

          <svg
            viewBox={`0 0 ${MAP_VB.w} ${MAP_VB.h}`}
            className="absolute inset-0 h-full w-full bg-transparent"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <radialGradient id={spotlight} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(56,189,248,0.36)" />
                <stop offset="40%" stopColor="rgba(28,57,187,0.16)" />
                <stop offset="100%" stopColor="rgba(28,57,187,0)" />
              </radialGradient>
              <filter id={arcGlow} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <ellipse
              cx={active.x}
              cy={active.y}
              rx={active.halo * 1.5}
              ry={active.halo}
              fill={`url(#${spotlight})`}
            />

            <g fill="none" strokeLinecap="round" filter={`url(#${arcGlow})`}>
              {ARC_PAIRS.map(([a, b]) => {
                const from = NODE_LAYOUT[a];
                const to = NODE_LAYOUT[b];
                const hot = a === activeKey || b === activeKey;
                const mx = (from.x + to.x) / 2;
                const my = Math.min(from.y, to.y) - 28;
                return (
                  <path
                    key={`${a}-${b}`}
                    d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
                    stroke={
                      hot ? "rgba(56,189,248,0.45)" : "rgba(125,170,255,0.14)"
                    }
                    strokeWidth={hot ? 1.6 : 1}
                    strokeDasharray={hot ? undefined : "2 6"}
                    className={
                      reduceMotion
                        ? undefined
                        : "transition-[stroke,stroke-width] duration-300"
                    }
                  />
                );
              })}
            </g>

            {tabs.map((tab) => {
              const pos = NODE_LAYOUT[tab.key];
              const isActive = tab.key === activeKey;
              return (
                <g key={`node-${tab.key}`}>
                  {isActive ? (
                    <>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="22"
                        fill="none"
                        stroke="rgba(56,189,248,0.25)"
                        strokeWidth="1"
                      />
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="14"
                        fill="none"
                        stroke="rgba(56,189,248,0.55)"
                        strokeWidth="1.35"
                      />
                    </>
                  ) : null}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 7 : 4.6}
                    fill={
                      isActive
                        ? "rgba(56,189,248,0.95)"
                        : "rgba(125,170,255,0.55)"
                    }
                    className={
                      reduceMotion
                        ? undefined
                        : "transition-[r,fill] duration-300"
                    }
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isActive ? 2.6 : 1.8}
                    fill={isActive ? "#1c39bb" : "rgba(28,57,187,0.95)"}
                  />
                </g>
              );
            })}
          </svg>

          {tabs.map((tab) => {
            const pos = NODE_LAYOUT[tab.key];
            const isActive = tab.key === activeKey;
            const resolved = byKey.get(tab.key) ?? tab;
            return (
              <button
                key={`hit-${tab.key}`}
                type="button"
                data-latin-label={
                  isLatinAcronymLabel(resolved.label) ? true : undefined
                }
                aria-pressed={isActive}
                aria-label={resolved.label}
                onClick={() => onSelectKey(tab.key)}
                className={`absolute z-10 flex min-h-11 min-w-[4.75rem] -translate-x-1/2 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]/55 ${localeNav(lang)}`}
                style={{
                  left: `${(pos.x / MAP_VB.w) * 100}%`,
                  top: `${(pos.labelY / MAP_VB.h) * 100}%`,
                }}
              >
                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-200 sm:px-3 sm:text-[10px] ${
                    isActive
                      ? "border-[#38bdf8]/50 bg-[#0f1c38]/9 text-white shadow-[0_0_28px_rgba(56,189,248,0.35),inset_0_1px_0_rgba(189,224,254,0.2)]"
                      : "border-white/[0.12] bg-[#070d16]/85 text-[#c8d2de] shadow-[0_6px_18px_rgba(0,0,0,0.35)] hover:border-[#38bdf8]/28 hover:bg-[#0c1522]/9"
                  }`}
                >
                  {resolved.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
