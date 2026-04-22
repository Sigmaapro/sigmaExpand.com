"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function Counter({
  value,
  suffix,
  decimals,
}: {
  value: number;
  suffix: string;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, value, {
      duration: 2.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => ctrl.stop();
  }, [inView, value]);

  const formatted =
    decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

export function MetricsSection() {
  const { t } = useLanguage();

  const stats = useMemo(
    () =>
      t.metrics.stats.map((s) => ({
        label: s.label,
        value: s.target,
        suffix: s.suffix,
        decimals: 0,
      })),
    [t.metrics.stats],
  );

  return (
    <section
      id="metrics"
      className="relative scroll-mt-24 border-t border-cadet/10 bg-[#181b20] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-sigma-radial opacity-70" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-uranian/90">
            {t.metrics.kicker}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[0] text-white md:text-5xl">
            {t.metrics.title}
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative border border-cadet/10 bg-erie/50 p-8"
            >
              <p className="font-body text-xs uppercase tracking-[0.2em] text-cadet/70">
                {s.label}
              </p>
              <p className="mt-4 font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals}
                />
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                className="mt-6 h-1 origin-left bg-gradient-to-r from-persian via-uranian to-transparent"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
