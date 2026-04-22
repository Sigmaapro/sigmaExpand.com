"use client";

import { motion, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
  /** When set, renders an anchor with the same motion + styles as the button */
  href?: string;
};

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  href,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onMove = (e: React.PointerEvent) => {
    const el = href ? anchorRef.current : buttonRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.11);
    y.set(dy * 0.11);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const primaryClasses =
    "border border-persian text-white shadow-[0_0_52px_rgba(28,57,187,0.55),0_0_120px_rgba(28,57,187,0.18)] hover:border-uranian/55 hover:shadow-[0_0_64px_rgba(189,224,254,0.22),0_0_100px_rgba(28,57,187,0.35)]";

  const ghostClasses =
    "border border-cadet/35 bg-transparent text-cadet hover:border-persian/45 hover:bg-persian/[0.08] hover:text-uranian";

  const motionClass = `relative inline-flex overflow-hidden px-8 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.07em] transition-colors no-underline ${
    variant === "primary" ? primaryClasses : ghostClasses
  } ${className}`;

  const inner = (
    <>
      {variant === "primary" ? (
        <>
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-persian via-[#2337c4] to-persian" />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(189,224,254,0.18),transparent_55%)] opacity-90" />
        </>
      ) : null}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        ref={anchorRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ x, y }}
        whileHover={variant === "primary" ? { scale: 1.035 } : { scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={motionClass}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      whileHover={variant === "primary" ? { scale: 1.035 } : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={motionClass}
    >
      {inner}
    </motion.button>
  );
}
