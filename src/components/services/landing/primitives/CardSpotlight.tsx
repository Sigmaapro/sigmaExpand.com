"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent, type ReactNode } from "react";

type CardSpotlightProps = {
  children: ReactNode;
  className?: string;
  radius?: number;
  /** Spotlight fill — SIGMA blue default */
  color?: string;
};

/**
 * Aceternity Card Spotlight — adapted (SIGMA palette, reduced-motion safe).
 * Source pattern: https://ui.aceternity.com/components/card-spotlight
 */
export function CardSpotlight({
  children,
  className = "",
  radius = 280,
  color = "rgba(29, 137, 187, 0.18)",
}: CardSpotlightProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [reduceMotion],
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07090f]/75 p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1D89BB]/30 motion-reduce:transform-none sm:p-7 ${className}`}
    >
      {!reduceMotion ? (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: active ? 1 : 0,
            background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 65%)`,
          }}
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
