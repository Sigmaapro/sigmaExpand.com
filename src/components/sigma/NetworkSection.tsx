"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const NODES = [
  { x: 18, y: 42 },
  { x: 38, y: 22 },
  { x: 52, y: 58 },
  { x: 72, y: 30 },
  { x: 84, y: 62 },
  { x: 30, y: 72 },
  { x: 62, y: 18 },
];

const LINKS: [number, number][] = [
  [0, 1],
  [1, 3],
  [3, 4],
  [2, 4],
  [0, 5],
  [2, 5],
  [1, 6],
  [3, 6],
];

export function NetworkSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section
      id="network"
      className="relative scroll-mt-24 border-t border-cadet/10 bg-erie py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 sigma-grid opacity-30" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center md:gap-20 md:px-10">
        <div className={isRtl ? "text-right" : ""}>
          <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-persian">
            {t.network.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[0] text-white md:text-5xl">
            {t.network.title}
          </h2>
          <p className="mt-5 font-body text-sm font-light leading-relaxed text-cadet/90 md:text-base">
            {t.network.body}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[5/4] w-full border border-cadet/15 bg-[#16191d]"
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            aria-hidden
          >
            {LINKS.map(([a, b], i) => {
              const A = NODES[a];
              const B = NODES[b];
              if (!A || !B) return null;
              return (
                <motion.line
                  key={i}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke="url(#net-grad)"
                  strokeWidth="0.35"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.55 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.06 }}
                />
              );
            })}
            <defs>
              <linearGradient id="net-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1c39bb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#bde0fe" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {NODES.map((n, i) => (
              <motion.rect
                key={i}
                x={n.x - 1.6}
                y={n.y - 1.6}
                width="3.2"
                height="3.2"
                fill="#1c39bb"
                stroke="#bde0fe"
                strokeWidth="0.4"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.04 }}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(28,57,187,0.14),transparent_58%)]" />
        </motion.div>
      </div>
    </section>
  );
}
