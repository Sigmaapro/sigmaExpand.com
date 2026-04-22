"use client";

import { motion } from "framer-motion";

const SEEDS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 47) % 100}%`,
  top: `${(i * 61) % 100}%`,
  delay: (i % 7) * 0.4,
  duration: 14 + (i % 5) * 2,
  size: 2 + (i % 3),
}));

export function FloatingParticles({
  reduced,
  atmosphere,
}: {
  reduced: boolean;
  /** Very low contrast — keeps motion, reads as depth not sparkle. */
  atmosphere?: boolean;
}) {
  if (reduced) return null;

  const quiet = atmosphere === true;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${quiet ? "opacity-[0.11]" : "opacity-40"}`}
    >
      {SEEDS.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute ${quiet ? "bg-uranian/18" : "bg-uranian/30"}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -24, 0],
            x: [0, 12, 0],
            opacity: [0.15, 0.45, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
