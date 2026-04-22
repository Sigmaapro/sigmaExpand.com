"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function CustomCursor() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.4 });

  useEffect(() => {
    if (reduced || pathname !== "/") return;
    const root = document.documentElement;
    root.classList.add("sigma-cursor-active");
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      root.classList.remove("sigma-cursor-active");
      window.removeEventListener("pointermove", onMove);
    };
  }, [pathname, reduced, x, y]);

  if (reduced || pathname !== "/") return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference md:block"
      style={{ x: sx, y: sy }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm"
        style={{
          width: "var(--cursor-size)",
          height: "var(--cursor-size)",
          boxShadow: "0 0 32px rgba(189, 224, 254, 0.35)",
        }}
      />
    </motion.div>
  );
}
