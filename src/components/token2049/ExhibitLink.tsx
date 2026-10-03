"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMedia";
import { scrollExhibition } from "@/components/token2049/PageTone";

const MotionLink = motion.create(Link);

export function ExhibitLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  function onMove(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.4);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const shared = {
    className,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    style: { x: sx, y: sy },
  };

  if (href.startsWith("#")) {
    return (
      <motion.a
        href={href}
        {...shared}
        onClick={(event) => {
          event.preventDefault();
          scrollExhibition(href);
          window.history.pushState(null, "", href);
        }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} {...shared}>
      {children}
    </MotionLink>
  );
}
