"use client";

import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useScroll, type MotionValue } from "framer-motion";

type ScrollBridgeValue = {
  heroScrollProgress: MotionValue<number>;
  heroRef: React.RefObject<HTMLElement | null>;
};

const ScrollBridgeContext = createContext<ScrollBridgeValue | null>(null);

/**
 * Framer `useScroll({ target })` throws if `target.current` is still null when the
 * hook runs ("Target ref is defined but not hydrated"). Refs are not set until after
 * children commit, so we must not pass `target` until `heroRef.current` is populated
 * (detected in `useLayoutEffect`, with a short rAF loop for async layout edge cases).
 */
const MAX_TARGET_ATTACH_FRAMES = 180;

export function ScrollBridgeProvider({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroTargetReady, setHeroTargetReady] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    let raf = 0;
    let frames = 0;

    const tryAttach = () => {
      if (cancelled) return;
      if (heroRef.current) {
        setHeroTargetReady(true);
        return;
      }
      frames += 1;
      if (frames < MAX_TARGET_ATTACH_FRAMES) {
        raf = requestAnimationFrame(tryAttach);
      }
    };

    tryAttach();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  const { scrollYProgress: heroScrollProgress } = useScroll(
    heroTargetReady
      ? {
          target: heroRef,
          offset: ["start start", "end start"],
        }
      : {},
  );

  return (
    <ScrollBridgeContext.Provider value={{ heroRef, heroScrollProgress }}>
      {children}
    </ScrollBridgeContext.Provider>
  );
}

export function useScrollBridge() {
  const ctx = useContext(ScrollBridgeContext);
  if (!ctx) {
    throw new Error("useScrollBridge must be used within ScrollBridgeProvider");
  }
  return ctx;
}
