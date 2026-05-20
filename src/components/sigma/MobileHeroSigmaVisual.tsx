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

  const clusterY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const clusterScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 0.7, 0.45]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.35, 1], [1, 1.08, 1.16]);

  if (isDesktop) return null;

  const animateOrbit = !reduceMotion && !lowPower;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[max(4.5rem,env(safe-area-inset-top,0px)+3rem)] z-[1] flex h-[min(52svh,26rem)] max-h-[420px] w-full items-center justify-center overflow-x-clip sm:top-[5.5rem] sm:h-[min(48svh,28rem)] md:h-[min(52svh,32rem)]"
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full max-w-[min(100%,26rem)]"
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
          className="absolute left-1/2 top-[42%] h-[min(72vw,18rem)] w-[min(88vw,22rem)] -translate-x-1/2 -translate-y-1/2"
          style={reduceMotion ? undefined : { opacity: glowOpacity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_68%_58%_at_50%_48%,rgba(28,57,187,0.38)_0%,rgba(28,57,187,0.12)_42%,transparent_72%)]" />
          <div className="absolute inset-[8%] bg-[radial-gradient(ellipse_52%_48%_at_55%_42%,rgba(189,224,254,0.14)_0%,transparent_68%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,57,187,0.08)_0%,transparent_55%)] blur-2xl" />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-[42%] size-[min(58vw,14.5rem)] -translate-x-1/2 -translate-y-1/2 ${
            animateOrbit ? "sigma-mobile-orbit-spin" : ""
          }`}
          style={reduceMotion ? undefined : { scale: orbitScale }}
        >
          {SHARD_ANGLES.map((deg, i) => (
            <span
              key={deg}
              className="absolute left-1/2 top-1/2 block h-3 w-3 origin-center sm:h-3.5 sm:w-3.5"
              style={{
                transform: `rotate(${deg}deg) translateY(calc(-1 * (36% + ${(i % 4) * 3}%)))`,
              }}
            >
              <span
                className={`absolute left-1/2 top-0 block size-full -translate-x-1/2 rounded-[1px] border border-[#bde0fe]/35 bg-[linear-gradient(135deg,rgba(28,57,187,0.55)_0%,rgba(13,22,48,0.85)_100%)] shadow-[0_0_14px_rgba(28,57,187,0.35)] ${
                  i % 2 === 0 ? "rotate-45" : "-rotate-12"
                } ${i % 3 === 0 ? "scale-110" : "scale-90 opacity-80"}`}
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
          className="absolute left-1/2 top-[42%] h-[min(52vw,13rem)] w-[min(52vw,13rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.42] sm:opacity-[0.5]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sigma-mobile-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#bde0fe" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#1c39bb" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6ea8ff" stopOpacity="0.7" />
            </linearGradient>
            <filter id="sigma-mobile-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
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
              strokeWidth="2.25"
              strokeLinecap="round"
              filter="url(#sigma-mobile-glow)"
            />
          ))}
        </svg>

        <motion.div
          className="absolute left-1/2 top-[42%] size-[min(44vw,11rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1c39bb]/20 bg-[radial-gradient(circle_at_50%_42%,rgba(28,57,187,0.18)_0%,transparent_70%)]"
          animate={
            animateOrbit
              ? {
                  scale: [1, 1.04, 1],
                  opacity: [0.35, 0.5, 0.35],
                }
              : undefined
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
