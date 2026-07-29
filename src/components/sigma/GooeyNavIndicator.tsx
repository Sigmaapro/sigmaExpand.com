"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Rect = { left: number; top: number; width: number; height: number };

/**
 * Gooey Nav motion only — active indicator movement + smooth gooey transition + hover interpolation.
 * Does not replace Fluid Glass appearance; no particles/blobs.
 * Colors: #1D89BB / #1D3ABB / #4F1DBB
 */
export function GooeyNavIndicator({
  containerRef,
  activeSelector,
  activeKey,
  enabled = true,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  /** CSS selector for the active primary nav item */
  activeSelector: string;
  /** Remeasure when the active section id changes */
  activeKey?: string | null;
  enabled?: boolean;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const filterRef = useRef<HTMLSpanElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const hoverRectRef = useRef<Rect | null>(null);
  const activeRectRef = useRef<Rect | null>(null);
  const rafRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const active = root.querySelector(activeSelector) as HTMLElement | null;
    if (!active) {
      activeRectRef.current = null;
      setRect(null);
      return;
    }
    const rootBox = root.getBoundingClientRect();
    const box = active.getBoundingClientRect();
    const next: Rect = {
      left: box.left - rootBox.left,
      top: box.top - rootBox.top,
      width: box.width,
      height: box.height,
    };
    activeRectRef.current = next;
    const hover = hoverRectRef.current;
    if (hover) {
      setRect(lerpRect(next, hover, 0.22));
    } else {
      setRect(next);
    }
  }, [activeSelector, containerRef]);

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    measure();
    const root = containerRef.current;
    if (!root) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(root);

    const onMove = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-gooey-nav-item]",
      ) as HTMLElement | null;
      if (!target || !root.contains(target)) {
        hoverRectRef.current = null;
        measure();
        return;
      }
      const rootBox = root.getBoundingClientRect();
      const box = target.getBoundingClientRect();
      hoverRectRef.current = {
        left: box.left - rootBox.left,
        top: box.top - rootBox.top,
        width: box.width,
        height: box.height,
      };
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const base = activeRectRef.current;
        if (!base || !hoverRectRef.current) {
          measure();
          return;
        }
        setRect(lerpRect(base, hoverRectRef.current, 0.28));
      });
    };

    const onLeave = () => {
      hoverRectRef.current = null;
      measure();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, enabled, measure, reduceMotion]);

  useEffect(() => {
    if (!enabled || reduceMotion) return;
    measure();
  }, [activeKey, activeSelector, enabled, measure, reduceMotion]);

  if (!enabled || reduceMotion || !rect) return null;

  return (
    <span
      ref={filterRef}
      aria-hidden
      className="sigma-gooey-nav-effect pointer-events-none absolute z-0"
      style={{
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}

function lerpRect(a: Rect, b: Rect, t: number): Rect {
  return {
    left: a.left + (b.left - a.left) * t,
    top: a.top + (b.top - a.top) * t,
    width: a.width + (b.width - a.width) * t,
    height: a.height + (b.height - a.height) * t,
  };
}
