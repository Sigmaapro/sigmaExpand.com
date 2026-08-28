"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./SkewedCarousel.css";

/**
 * Port of React Bits Pro Skewed Carousel.
 * Reference: https://pro.reactbits.dev/docs/components/skewed-carousel
 *
 * Geometry: each step away from the focused slide applies `rotation` on Y,
 * `inactiveScale`, and shared `perspective`. Drag, keyboard, dots, controls,
 * loop, and autoplay follow the documented public API.
 */

export type SkewedCarouselItem = {
  image?: string;
  title: string;
  alt?: string;
  href?: string;
};

export type SkewedCarouselProps = {
  items?: SkewedCarouselItem[];
  initialIndex?: number;
  cardWidth?: number;
  aspectRatio?: string;
  rotation?: number;
  inactiveScale?: number;
  /** Horizontal travel per step, as a fraction of `cardWidth`. */
  spacingRatio?: number;
  perspective?: number;
  borderRadius?: number;
  titleBlur?: number;
  speed?: number;
  showTitles?: boolean;
  showControls?: boolean;
  showDots?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  enableDrag?: boolean;
  enableKeyboard?: boolean;
  className?: string;
  ariaLabel?: string;
  onIndexChange?: (index: number) => void;
};

type DragState = {
  x: number;
  y: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  axis: "undecided" | "x" | "y";
  id: number;
};

const DEFAULT_ITEMS: SkewedCarouselItem[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Slide ${i + 1}`,
}));

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

function parseAspect(ratio: string): number {
  const parts = ratio.split("/").map((p) => Number(p.trim()));
  const w = parts[0];
  const h = parts[1];
  if (!w || !h) return 4 / 3;
  return h / w;
}

function shortestDelta(from: number, to: number, count: number, loop: boolean) {
  if (!loop || count < 2) return to - from;
  let d = ((to - from) % count) + count;
  d %= count;
  if (d > count / 2) d -= count;
  return d;
}

function wrapDelta(d: number, count: number, loop: boolean) {
  if (!loop || count < 1) return d;
  let v = ((d % count) + count) % count;
  if (v > count / 2) v -= count;
  return v;
}

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function SkewedCarousel({
  items = DEFAULT_ITEMS,
  initialIndex = 3,
  cardWidth = 200,
  aspectRatio = "3 / 4",
  rotation = 60,
  inactiveScale = 0.85,
  spacingRatio = 0.58,
  perspective = 800,
  borderRadius = 8,
  titleBlur = 2,
  speed = 1,
  showTitles = true,
  showControls = true,
  showDots = true,
  loop = false,
  autoplay = false,
  autoplayDelay = 3000,
  enableDrag = true,
  enableKeyboard = true,
  className = "",
  ariaLabel,
  onIndexChange,
}: SkewedCarouselProps) {
  const data = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const count = data.length;
  const aspect = parseAspect(aspectRatio);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const posRef = useRef(0);
  const focusRef = useRef(0);
  const rafRef = useRef(0);
  const scaleRef = useRef(1);
  const dragRef = useRef<DragState | null>(null);
  const reducedRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onChangeRef = useRef(onIndexChange);
  onChangeRef.current = onIndexChange;

  const [active, setActive] = useState(() =>
    count ? clamp(initialIndex, 0, count - 1) : 0,
  );

  const layout = useCallback(
    (pos: number) => {
      const n = count;
      if (!n) return;
      const spacing = cardWidth * spacingRatio;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = wrapDelta(i - pos, n, loop);
        const abs = Math.abs(d);
        const shown = abs <= 3.25;
        const scFit = scaleRef.current;
        const scItem = abs < 0.001 ? 1 : inactiveScale;
        const tx = d * spacing;
        const ry = d * rotation;
        const opacity = shown ? (abs > 2.4 ? clamp(1 - (abs - 2.4) * 1.2, 0, 1) : 1) : 0;
        el.style.transform = `translate(-50%, -50%) scale(${scFit}) translateX(${tx.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg) scale(${scItem})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round(80 - abs * 10));
        el.style.pointerEvents = shown && opacity > 0.2 ? "auto" : "none";
        el.style.filter = abs < 0.5 ? "none" : `brightness(${clamp(1 - abs * 0.12, 0.7, 1)})`;
        el.classList.toggle("is-active", Math.round(pos) === i || (loop && ((Math.round(pos) % n) + n) % n === i));
      }
    },
    [cardWidth, count, inactiveScale, loop, rotation, spacingRatio],
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      cancelAnimationFrame(rafRef.current);
      const start = posRef.current;
      const dist = target - start;
      const duration = animate && !reducedRef.current ? Math.max(0, 700 / Math.max(speed, 0.001)) : 0;
      if (duration <= 0) {
        posRef.current = target;
        layout(target);
        return;
      }
      const t0 = performance.now();
      const ease = (t: number) => 1 - (1 - t) ** 3;
      const step = (now: number) => {
        const t = clamp((now - t0) / duration, 0, 1);
        posRef.current = start + dist * ease(t);
        layout(posRef.current);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [layout, speed],
  );

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx);
    },
    [],
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      if (!count) return;
      const idx = loop ? ((rawIndex % count) + count) % count : clamp(rawIndex, 0, count - 1);
      const delta = shortestDelta(posRef.current, idx, count, loop);
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [count, loop, notify, tweenTo],
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = count ? clamp(initialIndex, 0, count - 1) : 0;
    posRef.current = start;
    focusRef.current = start;
    setActive(start);
    layout(start);
  }, [count, initialIndex, layout]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      const needed = cardWidth + 56;
      scaleRef.current = clamp(w / needed, 0.82, 1);
      const height = cardWidth * scaleRef.current * aspect + 28;
      if (stageRef.current) stageRef.current.style.height = `${height}px`;
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [aspect, cardWidth, layout]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  useEffect(() => {
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(() => {
        if (!hovered && !focused) navigateBy(1);
      }, Math.max(autoplayDelay, 600));
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener("mouseenter", onEnter);
    root?.addEventListener("mouseleave", onLeave);
    root?.addEventListener("focusin", onFocusIn);
    root?.addEventListener("focusout", onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener("mouseenter", onEnter);
      root?.removeEventListener("mouseleave", onLeave);
      root?.removeEventListener("focusin", onFocusIn);
      root?.removeEventListener("focusout", onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if (!enableDrag || count < 2) return;
      cancelAnimationFrame(rafRef.current);
      dragRef.current = {
        x: event.clientX,
        y: event.clientY,
        startPos: posRef.current,
        lastX: event.clientX,
        lastT: performance.now(),
        v: 0,
        moved: false,
        axis: "undecided",
        id: event.pointerId,
      };
    },
    [count, enableDrag],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (drag.axis === "undecided") {
        if (Math.hypot(dx, dy) < 8) return;
        drag.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (drag.axis === "y") {
          dragRef.current = null;
          return;
        }
        drag.moved = true;
        stageRef.current?.setPointerCapture(drag.id);
      }
      if (drag.axis !== "x") return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (event.clientX - drag.lastX) / dt;
      drag.lastX = event.clientX;
      drag.lastT = now;
      const stepPx = Math.max(cardWidth * scaleRef.current * 0.55, 40);
      posRef.current = drag.startPos - dx / stepPx;
      if (!loop) posRef.current = clamp(posRef.current, 0, Math.max(count - 1, 0));
      layout(posRef.current);
    },
    [cardWidth, count, layout, loop],
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) return;
    const stepPx = Math.max(cardWidth * scaleRef.current * 0.55, 40);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [cardWidth, setFocus]);

  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent) => {
      if (!enableKeyboard) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateBy(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateBy(1);
      }
    },
    [enableKeyboard, navigateBy],
  );

  const preventDragClick = useCallback((event: { preventDefault: () => void; stopPropagation: () => void }) => {
    if (!dragRef.current?.moved && dragRef.current !== null) return;
    // After pointerup, dragRef is cleared; keep a one-frame latch via data attr.
    const stage = stageRef.current;
    if (stage?.dataset.scDragged === "1") {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const mark = () => {
      if (dragRef.current?.moved) stage.dataset.scDragged = "1";
    };
    const clear = () => {
      window.setTimeout(() => {
        if (stage.dataset.scDragged === "1") delete stage.dataset.scDragged;
      }, 50);
    };
    stage.addEventListener("pointerup", mark);
    stage.addEventListener("pointercancel", clear);
    stage.addEventListener("click", clear, true);
    return () => {
      stage.removeEventListener("pointerup", mark);
      stage.removeEventListener("pointercancel", clear);
      stage.removeEventListener("click", clear, true);
    };
  }, []);

  const atStart = !loop && active <= 0;
  const atEnd = !loop && active >= count - 1;
  const caption = data[active]?.title ?? "";
  const slideWidth = cardWidth;
  const slideHeight = cardWidth * aspect;

  return (
    <div
      ref={rootRef}
      className={`skewed-carousel ${className}`.trim()}
      tabIndex={enableKeyboard ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className="skewed-carousel__stage"
        style={{ perspective: `${perspective}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div className="skewed-carousel__world">
          {data.map((item, index) => {
            const href = item.href;
            const face = (
              <>
                <div className="skewed-carousel__media">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element -- data URIs and mixed remote surfaces
                    <img src={item.image} alt="" draggable={false} />
                  ) : (
                    <div className="skewed-carousel__media" style={{ background: "#05070D" }} />
                  )}
                </div>
                <span className="skewed-carousel__glass" aria-hidden />
                <p className="skewed-carousel__face-title">{item.title}</p>
              </>
            );

            return (
              <article
                key={`${item.title}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="skewed-carousel__slide"
                style={{
                  width: slideWidth,
                  height: slideHeight,
                  borderRadius,
                }}
                aria-roledescription="slide"
                aria-label={`${item.title}, ${index + 1} of ${count}`}
                aria-hidden={active !== index}
              >
                {href ? (
                  isExternalHref(href) ? (
                    <a
                      href={href}
                      className="skewed-carousel__link"
                      aria-label={item.title}
                      tabIndex={active === index ? 0 : -1}
                      onClick={preventDragClick}
                    >
                      {face}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="skewed-carousel__link"
                      aria-label={item.title}
                      tabIndex={active === index ? 0 : -1}
                      onClick={preventDragClick}
                    >
                      {face}
                    </Link>
                  )
                ) : (
                  <div className="skewed-carousel__link">{face}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {showTitles ? (
        <p
          className={`skewed-carousel__caption${dragRef.current?.moved ? " is-blurred" : ""}`}
          style={{ filter: active === focusRef.current ? undefined : `blur(${titleBlur}px)` }}
        >
          {caption}
        </p>
      ) : null}

      {showControls || showDots ? (
        <div className="skewed-carousel__controls">
          {showControls ? (
            <button
              type="button"
              className="skewed-carousel__nav"
              aria-label="Previous slide"
              disabled={atStart}
              onClick={() => navigateBy(-1)}
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}

          {showDots ? (
            <div className="skewed-carousel__dots" role="tablist" aria-label="Slides">
              {data.map((item, index) => (
                <button
                  key={`${item.title}-dot-${index}`}
                  type="button"
                  role="tab"
                  className={`skewed-carousel__dot${index === active ? " is-active" : ""}`}
                  aria-label={`Go to ${item.title}`}
                  aria-selected={index === active}
                  onClick={() => setFocus(index, true)}
                />
              ))}
            </div>
          ) : null}

          {showControls ? (
            <button
              type="button"
              className="skewed-carousel__nav"
              aria-label="Next slide"
              disabled={atEnd}
              onClick={() => navigateBy(1)}
            >
              <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
