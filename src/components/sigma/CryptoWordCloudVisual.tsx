"use client";

import { motion, useReducedMotion } from "framer-motion";

type CloudWord = {
  label: string;
  fontSize: number;
  x: number;
  y: number;
  rotate: number;
  weight: 500 | 600 | 700;
  opacity: number;
  delay: number;
  duration: number;
};

/**
 * Classic typography word cloud — horizontal, hand-composed cluster.
 * No rings, orbits, logos, icons, or links.
 */
const WORDS: CloudWord[] = [
  // Dense main cluster (not a radial emblem)
  { label: "BTC", fontSize: 52, x: 34, y: 48, rotate: 0, weight: 700, opacity: 0.98, delay: 0, duration: 9 },
  { label: "ETH", fontSize: 44, x: 58, y: 58, rotate: 0, weight: 700, opacity: 0.95, delay: 0.2, duration: 9.4 },
  { label: "USDT", fontSize: 36, x: 62, y: 34, rotate: -8, weight: 700, opacity: 0.92, delay: 0.35, duration: 9.1 },
  { label: "BNB", fontSize: 30, x: 44, y: 30, rotate: 0, weight: 700, opacity: 0.9, delay: 0.45, duration: 9.6 },
  { label: "SOL", fontSize: 28, x: 78, y: 50, rotate: 90, weight: 700, opacity: 0.88, delay: 0.5, duration: 9.8 },

  // Mid pack woven through the cluster
  { label: "USDC", fontSize: 22, x: 22, y: 34, rotate: 8, weight: 600, opacity: 0.78, delay: 0.3, duration: 10.2 },
  { label: "XRP", fontSize: 24, x: 18, y: 58, rotate: 0, weight: 600, opacity: 0.8, delay: 0.55, duration: 10 },
  { label: "DOGE", fontSize: 20, x: 48, y: 72, rotate: -8, weight: 600, opacity: 0.74, delay: 0.4, duration: 10.5 },
  { label: "ADA", fontSize: 20, x: 70, y: 72, rotate: 0, weight: 600, opacity: 0.72, delay: 0.7, duration: 10.8 },
  { label: "TRX", fontSize: 18, x: 86, y: 34, rotate: 8, weight: 600, opacity: 0.7, delay: 0.65, duration: 10.4 },

  // Sparse outer scatter — uneven, not a ring
  { label: "LINK", fontSize: 15, x: 30, y: 18, rotate: 0, weight: 500, opacity: 0.58, delay: 0.85, duration: 11.2 },
  { label: "TON", fontSize: 14, x: 10, y: 44, rotate: -12, weight: 500, opacity: 0.54, delay: 0.6, duration: 11.5 },
  { label: "DOT", fontSize: 13, x: 52, y: 16, rotate: 8, weight: 500, opacity: 0.5, delay: 0.95, duration: 11.8 },
  { label: "AVAX", fontSize: 13, x: 92, y: 62, rotate: 0, weight: 500, opacity: 0.52, delay: 0.25, duration: 11.4 },
  { label: "MATIC", fontSize: 12, x: 8, y: 72, rotate: 0, weight: 500, opacity: 0.48, delay: 1.05, duration: 12 },
  { label: "LTC", fontSize: 14, x: 40, y: 86, rotate: 0, weight: 500, opacity: 0.5, delay: 0.15, duration: 11.6 },
  { label: "NEAR", fontSize: 12, x: 82, y: 82, rotate: 8, weight: 500, opacity: 0.46, delay: 1.1, duration: 12.2 },
  { label: "ARB", fontSize: 12, x: 14, y: 22, rotate: 90, weight: 500, opacity: 0.46, delay: 0.8, duration: 12.4 },
  { label: "OP", fontSize: 13, x: 94, y: 44, rotate: -8, weight: 500, opacity: 0.48, delay: 0.9, duration: 11.1 },
  { label: "ATOM", fontSize: 12, x: 58, y: 88, rotate: 0, weight: 500, opacity: 0.44, delay: 0.5, duration: 12.6 },
];

export function CryptoWordCloudVisual() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      className="pointer-events-none relative mx-auto h-[280px] w-full max-w-[520px] select-none"
      aria-hidden="true"
    >
      {WORDS.map((word) => (
        <span
          key={word.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${word.x}%`, top: `${word.y}%` }}
        >
          <motion.span
            className="inline-block whitespace-nowrap font-display uppercase leading-none tracking-[0.03em] text-[#f3f5f7]"
            style={{
              fontSize: `${word.fontSize}px`,
              fontWeight: word.weight,
              opacity: word.opacity,
              textShadow: "0 0 14px rgba(255,255,255,0.05)",
            }}
            initial={{ rotate: word.rotate }}
            animate={
              reduceMotion
                ? { rotate: word.rotate, opacity: word.opacity, x: 0, y: 0 }
                : {
                    y: [0, -2, 1, 0],
                    x: [0, 0.8, -0.6, 0],
                    rotate: [
                      word.rotate,
                      word.rotate + 0.7,
                      word.rotate - 0.5,
                      word.rotate,
                    ],
                    opacity: [
                      word.opacity,
                      Math.min(1, word.opacity + 0.05),
                      Math.max(0.3, word.opacity - 0.03),
                      word.opacity,
                    ],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: word.duration,
                    delay: word.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          >
            {word.label}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
