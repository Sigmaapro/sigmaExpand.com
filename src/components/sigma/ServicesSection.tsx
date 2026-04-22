"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function ServicesSection() {
  const { t } = useLanguage();
  const cards = t.services.cards.map((c) => ({
    title: c.title,
    body: c.description,
  }));

  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-24 border-t border-cadet/10 bg-[#1a1d22] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-sigma-radial opacity-90" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-uranian/90">
            {t.services.sectionLabel}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[0] text-white md:text-5xl">
            {t.services.headline}
          </h2>
          {t.services.subtitle ? (
            <p className="mt-4 font-body text-sm font-light text-cadet/90 md:text-base">
              {t.services.subtitle}
            </p>
          ) : null}
        </div>

        <div
          className="grid gap-6 md:grid-cols-2"
          style={{ perspective: "1200px" }}
        >
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              whileHover={{
                scale: 1.02,
                rotateX: 4,
                rotateY: -3,
                transition: { duration: 0.35 },
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative border border-cadet/15 bg-erie/40 p-8 shadow-[0_0_0_1px_rgba(28,57,187,0)] transition-shadow hover:border-persian/35 hover:shadow-[0_0_48px_rgba(28,57,187,0.18)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-persian/5 via-transparent to-uranian/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="font-display text-xl font-bold text-white">
                  {c.title}
                </h3>
                <p className="mt-3 font-body text-sm font-light leading-relaxed text-cadet/90">
                  {c.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
