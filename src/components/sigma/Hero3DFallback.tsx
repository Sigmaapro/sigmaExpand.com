"use client";

import { motion, useMotionValueEvent } from "framer-motion";
import { useScrollBridge } from "@/context/ScrollBridge";
import { useEffect, useMemo, useState } from "react";
import {
  scrollToExplodeAmount,
  sigmaExplodeOffsetsSvg,
} from "@/lib/sigmaLogoSpec";

const PATHS = [
  "M 100 36 L 54 164",
  "M 100 36 L 146 164",
  "M 62 108 L 138 108",
] as const;

/**
 * 2D Σ — identical paths to WebGL spec; scroll drives explode/reassemble,
 * idle breathing when nearly assembled, light pointer parallax when exploded.
 */
export function Hero3DFallback() {
  const { heroScrollProgress } = useScrollBridge();
  const [scrollP, setScrollP] = useState(0);
  const [phase, setPhase] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useMotionValueEvent(heroScrollProgress, "change", (v: number) => {
    setScrollP(v);
  });

  useEffect(() => {
    let id = 0;
    const loop = () => {
      setPhase((p) => p + 0.017);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const explode = scrollToExplodeAmount(scrollP);
  const idleW = Math.max(0, 1 - explode * 5.5);

  const offsets = useMemo(
    () => sigmaExplodeOffsetsSvg(explode, 18),
    [explode],
  );

  return (
    <div
      className="relative mx-auto flex h-[min(48vh,460px)] w-full max-w-[min(100%,400px)] items-center justify-center [perspective:960px] md:h-[min(62vh,580px)] md:max-w-[min(100%,460px)]"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPointer({
          x: (e.clientX - r.left) / r.width - 0.5,
          y: (e.clientY - r.top) / r.height - 0.5,
        });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        animate={{
          rotateX: explode * 4 + pointer.y * -5.5 * explode,
          rotateY: explode * -5 + pointer.x * 7 * explode,
          scale: 1 - explode * 0.05,
        }}
        transition={{ type: "spring", stiffness: 90, damping: 22 }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="h-44 w-44 md:h-[17rem] md:w-[17rem]"
          aria-hidden
        >
          <defs>
            <linearGradient id="sigma-metal-a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0b0d12" />
              <stop offset="40%" stopColor="#141a22" />
              <stop offset="100%" stopColor="#1c39bb" />
            </linearGradient>
            <linearGradient id="sigma-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#bde0fe" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#1c39bb" stopOpacity="1" />
              <stop offset="100%" stopColor="#1c39bb" stopOpacity="0.55" />
            </linearGradient>
            <filter id="sigma-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {PATHS.map((path, i) => {
            const o = offsets[i] ?? { dx: 0, dy: 0 };
            const idleX = Math.sin(phase * 0.62 + i * 1.45) * 1.05 * idleW;
            const idleY = Math.cos(phase * 0.5 + i * 1.08) * 0.95 * idleW;
            const idleR = Math.sin(phase * 0.38 + i * 1.15) * 0.55 * idleW;
            const px = pointer.x * 10 * explode;
            const py = pointer.y * 8 * explode;

            return (
              <motion.g
                key={i}
                animate={{
                  x: o.dx + idleX + px * (1 + i * 0.15),
                  y: o.dy + idleY + py * (1 + i * 0.12),
                  rotate:
                    idleR + explode * (i === 0 ? -2.2 : i === 1 ? 2.2 : 0),
                }}
                transition={{ type: "spring", stiffness: 110, damping: 24 }}
              >
                <path
                  d={path}
                  fill="none"
                  stroke="url(#sigma-edge)"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  filter="url(#sigma-glow)"
                />
                <path
                  d={path}
                  fill="none"
                  stroke="url(#sigma-metal-a)"
                  strokeWidth="1.1"
                  strokeLinecap="square"
                  opacity={0.38}
                />
              </motion.g>
            );
          })}
        </motion.svg>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-erie/75 via-transparent to-transparent" />
    </div>
  );
}
