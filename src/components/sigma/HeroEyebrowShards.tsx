"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

/** Abstract wireframe shard — matches Hero WebGL fragment language, not a logo. */
function WireframeShardSvg({ mirror }: { mirror?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-full w-full"
      fill="none"
      aria-hidden
      style={{ transform: mirror ? "scaleX(-1)" : undefined }}
    >
      <g
        stroke="rgba(189, 224, 254, 0.4)"
        strokeWidth="0.85"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M24 5.5 39.5 16.2 34.2 36.5 13.8 36.5 8.5 16.2Z"
          fill="rgba(28, 57, 187, 0.07)"
        />
        <path d="M24 5.5 24 28.5" />
        <path d="M8.5 16.2 34.2 36.5" />
        <path d="M39.5 16.2 13.8 36.5" />
        <path d="M8.5 16.2 39.5 16.2" />
        <path d="M16.2 16.2 24 28.5 31.8 16.2" opacity="0.55" />
        <path d="M20.5 10.5 28.2 21.5 19.5 31.8" opacity="0.4" />
      </g>
    </svg>
  );
}

type HeroEyebrowShardProps = {
  side: "left" | "right";
  /** 0 → 1 as user scrolls through the hero */
  scrollProgress: MotionValue<number>;
  /** Normalized pointer −1…1 relative to hero center */
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

export function HeroEyebrowShard({
  side,
  scrollProgress,
  pointerX,
  pointerY,
}: HeroEyebrowShardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const isLeft = side === "left";

  const parallaxX = useTransform(pointerX, (px) => px * (isLeft ? -5 : 5));
  const parallaxY = useTransform([scrollProgress, pointerY], ([sp, py]) => {
    return (sp as number) * (isLeft ? -14 : -18) + (py as number) * (isLeft ? 3 : -3);
  });

  return (
    <motion.div
      className={`pointer-events-none hidden h-9 w-9 shrink-0 opacity-[0.52] md:block lg:h-10 lg:w-10 lg:opacity-[0.6] ${
        isLeft ? "-rotate-12" : "rotate-[14deg]"
      }`}
      style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY }}
      animate={
        reduceMotion
          ? false
          : {
              rotate: isLeft ? [-10, -18, -10] : [12, 20, 12],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: isLeft ? 11 : 13,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      aria-hidden
    >
      <div className="h-full w-full drop-shadow-[0_0_12px_rgba(28,57,187,0.2)]">
        <WireframeShardSvg mirror={!isLeft} />
      </div>
    </motion.div>
  );
}
