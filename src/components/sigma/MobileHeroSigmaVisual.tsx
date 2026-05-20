"use client";

import { useEffect, useState, type RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SIGMA_STROKES } from "@/lib/sigmaLogoSpec";
import { useMinWidth, usePrefersReducedMotion } from "@/hooks/useMedia";

const SHARD_ANGLES = [0, 42, 84, 126, 168, 210, 252, 294, 336, 18, 72, 138];

type Props = {
  containerRef: RefObject<HTMLElement | null>;
};

/**
 * Lightweight hero fallback below lg — echoes desktop Σ shard energy without Three.js.
 */
export function MobileHeroSigmaVisual({ containerRef }: Props) {
  const isDesktop = useMinWidth(1024);
  const reduceMotionFramer = useReducedMotion() ?? false;
  const reduceMotionCss = usePrefersReducedMotion();
  const reduceMotion = reduceMotionFramer || reduceMotionCss;
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = typeof nav.deviceMemory === "number" ? nav.deviceMemory : 8;
    const cores =
      typeof navigator.hardwareConcurrency === "number"
        ? navigator.hardwareConcurrency
        : 8;
    setLowPower(memory <= 4 || cores <= 6);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const clusterY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const clusterScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.82, 0.58]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1.1, 1.2]);

  if (isDesktop) return null;

  const animateOrbit = !reduceMotion && !lowPower;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden lg:hidden"
      aria-hidden
    >
      <motion.div
        className="relative h-[min(100%,22rem)] w-full max-w-[min(100%,22rem)]"
        style={
          reduceMotion
            ? undefined
            : {
                y: clusterY,
                scale: clusterScale,
              }
        }
      >
        <motion.div
          className="absolute left-1/2 top-1/2 h-[min(88vw,20rem)] w-[min(96vw,24rem)] -translate-x-1/2 -translate-y-1/2"
          style={reduceMotion ? { opacity: 1 } : { opacity: glowOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_62%_at_50%_48%,rgba(28,57,187,0.58)_0%,rgba(28,57,187,0.22)_45%,transparent_74%)]" />
          <div className="absolute inset-[4%] bg-[radial-gradient(ellipse_58%_52%_at_52%_44%,rgba(189,224,254,0.28)_0%,transparent_68%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,57,187,0.16)_0%,transparent_58%)] blur-2xl" />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-1/2 size-[min(68vw,17rem)] -translate-x-1/2 -translate-y-1/2 ${
            animateOrbit ? "sigma-mobile-orbit-spin" : ""
          }`}
          style={reduceMotion ? undefined : { scale: orbitScale }}
        >
          {SHARD_ANGLES.map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 block h-3.5 w-3.5 origin-center sm:h-4 sm:w-4"
              style={{
                transform: `rotate(${deg}deg) translateY(calc(-1 * (38% + ${(i % 4) * 3}%)))`,
              }}
            >
              <span
                className={`absolute left-1/2 top-0 block size-full -translate-x-1/2 rounded-[1px] border border-[#bde0fe]/50 bg-[linear-gradient(135deg,rgba(28,57,187,0.72)_0%,rgba(13,22,48,0.92)_100%)] shadow-[0_0_18px_rgba(28,57,187,0.45)] ${
                  i % 2 === 0 ? "rotate-45" : "-rotate-12"
                } ${i % 3 === 0 ? "scale-110" : "scale-95 opacity-90"}`}
                style={{
                  clipPath:
                    i % 2 === 0
                      ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                      : "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }}
              />
            </span>
          ))}
        </motion.div>

        <svg
          viewBox="0 0 200 200"
          className="absolute left-1/2 top-1/2 h-[min(62vw,15.5rem)] w-[min(62vw,15.5rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.72] drop-shadow-[0_0_28px_rgba(28,57,187,0.55)] sm:opacity-[0.78]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sigma-mobile-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bde0fe" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#4a6fd6" stopOpacity="1" />
              <stop offset="100%" stopColor="#bde0fe" stopOpacity="0.85" />
            </linearGradient>
            <filter id="sigma-mobile-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {SIGMA_STROKES.map((s) => (
            <line
              key={s.id}
              x1={s.ax}
              y1={s.ay}
              x2={s.bx}
              y2={s.by}
              stroke="url(#sigma-mobile-stroke)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#sigma-mobile-glow)"
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 size-[min(50vw,12.5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1c39bb]/35 bg-[radial-gradient(circle_at_50%_42%,rgba(28,57,187,0.28)_0%,transparent_72%)] shadow-[0_0_40px_rgba(28,57,187,0.35)]"
          animate={
            animateOrbit
              ? {
                  scale: [1, 1.06, 1],
                  opacity: [0.45, 0.65, 0.45],
                }
              : { opacity: 0.5 }
          }
          transition={
            animateOrbit
              ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        />
      </motion.div>
    </div>
  );
}
