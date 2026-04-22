"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function AboutSection() {
  const { t, isRtl } = useLanguage();
  const raw = t.about.title.trim();
  const words = raw.includes(" ") ? raw.split(/\s+/).filter(Boolean) : [raw];

  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-t border-cadet/10 bg-erie py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 sigma-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-persian/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 font-body text-xs font-medium uppercase tracking-[0.35em] text-persian"
        >
          {t.about.kicker}
        </motion.p>
        <h2
          className={`font-display text-3xl font-bold leading-tight tracking-[0] text-white md:text-5xl ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.3em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className={`mt-8 max-w-3xl font-body text-base font-light leading-relaxed text-cadet/95 md:text-lg ${
            isRtl ? "ml-auto text-right" : ""
          }`}
        >
          {t.about.description}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-12 h-px max-w-md bg-gradient-to-r from-persian via-uranian/50 to-transparent ${
            isRtl ? "ml-auto origin-right" : "origin-left"
          }`}
        />
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(33,37,41,0.9) 100%)",
        }}
      />
    </section>
  );
}
