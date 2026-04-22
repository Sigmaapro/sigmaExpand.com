"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export function CTASection() {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section
      id="connect"
      className="relative scroll-mt-24 border-t border-cadet/10 bg-erie py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 sigma-grid opacity-25" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-persian/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="font-display text-4xl font-bold leading-tight tracking-[0] text-white md:text-6xl"
        >
          {c.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl font-body text-sm font-light tracking-[0.2em] text-cadet md:text-base"
        >
          {c.description}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 h-px max-w-lg origin-center bg-gradient-to-r from-transparent via-uranian/70 to-transparent"
        />

        {c.primaryCta && c.secondaryCta ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              variant="primary"
              href={c.primaryHref ?? "#capabilities"}
            >
              {c.primaryCta}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href={c.secondaryHref ?? "#contact"}
            >
              {c.secondaryCta}
            </MagneticButton>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
