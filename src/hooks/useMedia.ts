"use client";

import { useEffect, useState } from "react";

function readMatch(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    readMatch(`(max-width: ${breakpoint - 1}px)`),
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/** True when viewport is at least `minWidth` (default 768). */
export function useMinWidth(minWidth = 768) {
  const [matches, setMatches] = useState(() => readMatch(`(min-width: ${minWidth}px)`));

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);

  return matches;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    readMatch("(prefers-reduced-motion: reduce)"),
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
