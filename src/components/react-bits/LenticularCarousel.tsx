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
import "./LenticularCarousel.css";

/**
 * Port of React Bits Pro Lenticular Carousel.
 * Reference: https://pro.reactbits.dev/docs/components/lenticular-carousel
 *
 * Cards turn over like a lenticular print: `strips` lens ribs rake across
 * the slide with `sweep`, `refraction`, ridge glint, and foil on the revealed
 * face. Hover turns the lens; touch falls back to focus. Drag/keyboard/dots
 * match the documented public API.
 */

export type LenticularCarouselItem = {
  image?: string;
  alt?: string;
  label?: string;
  href?: string;
  meta?: string;
};

export type LenticularCarouselProps = {
  items?: LenticularCarouselItem[];
  initialIndex?: number;
  cardWidth?: number;
  aspectRatio?: string;
  gap?: number;
  borderRadius?: number;
  strips?: number;
  sweep?: number;
  refraction?: number;
  ridge?: number;
  foil?: number;
  foilScale?: number;
  scrim?: number;
  tilt?: number;
  travel?: number;
  lift?: number;
  perspective?: number;
  inactiveScale?: number;
  inactiveDim?: number;
  speed?: number;
  trigger?: "hover" | "focus";
  showLabels?: boolean;
  labelColor?: string;
  showControls?: boolean;
  showDots?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  enableDrag?: boolean;
  enableKeyboard?: boolean;
  dpr?: number;
  paused?: boolean;
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

const DEFAULT_ITEMS: LenticularCarouselItem[] = Array.from({ length: 8 }, (_, i) => ({
  label: `Slide ${i + 1}`,
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

function isCoarsePointer() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

export function LenticularCarousel({
  items = DEFAULT_ITEMS,
  initialIndex = 2,
  cardWidth = 260,
  aspectRatio = "3 / 4",
  gap = 26,
  borderRadius = 14,
  strips = 56,
  sweep = 0.6,
  refraction = 0.32,
  ridge = 0.5,
  foil = 0.5,
  foilScale = 8,
  scrim = 0.85,
  tilt = 14,
  travel = 0.64,
  lift = 40,
  perspective = 1200,
  inactiveScale = 0.9,
  inactiveDim = 0.55,
  speed = 1,
  trigger = "hover",
  showLabels = true,
  labelColor = "#ffffff",
  showControls = true,
  showDots = true,
  loop = false,
  autoplay = false,
  autoplayDelay = 3200,
  enableDrag = true,
  enableKeyboard = true,
  dpr = 2,
  paused = false,
  className = "",
  ariaLabel,
  onIndexChange,
}: LenticularCarouselProps) {
  const data = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const count = data.length;
  const aspect = parseAspect(aspectRatio);

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const turnRef = useRef(0);
  const foilPhaseRef = useRef(0);
  const posRef = useRef(0);
  const focusRef = useRef(0);
  const rafRef = useRef(0);
  const foilRafRef = useRef(0);
  const scaleRef = useRef(1);
  const dragRef = useRef<DragState | null>(null);
  const reducedRef = useRef(false);
  const coarseRef = useRef(false);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onChangeRef = useRef(onIndexChange);
  onChangeRef.current = onIndexChange;

  const [active, setActive] = useState(() =>
    count ? clamp(initialIndex, 0, count - 1) : 0,
  );

  const paintLens = useCallback(
    (index: number, turn: number, phase: number) => {
      const canvas = canvasRefs.current[index];
      const card = cardRefs.current[index];
      if (!canvas || !card) return;
      const rect = card.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const pixelRatio = clamp(window.devicePixelRatio || 1, 1, dpr);
      const w = Math.round(rect.width * pixelRatio);
      const h = Math.round(rect.height * pixelRatio);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const n = Math.max(8, Math.round(strips));
      const stripW = w / n;
      const rake = sweep;
      for (let i = 0; i < n; i++) {
        const lag = (i / n) * rake;
        const local = clamp((turn - lag) / Math.max(1 - rake, 0.08), 0, 1);
        const x = i * stripW;
        const ridgeLit = 0.5 + 0.5 * Math.sin(i * 0.55 + turn * 4.2 + phase);
        ctx.fillStyle = `rgba(189, 224, 254, ${(0.045 + 0.07 * ridgeLit) * ridge * (0.35 + local * 0.65)})`;
        ctx.fillRect(x, 0, Math.max(1, stripW * 0.18), h);
        ctx.fillStyle = `rgba(5, 7, 13, ${0.08 * ridge})`;
        ctx.fillRect(x + stripW - Math.max(1, stripW * 0.12), 0, Math.max(1, stripW * 0.12), h);
      }

      if (foil > 0 && turn > 0.04) {
        ctx.save();
        ctx.globalAlpha = foil * turn * 0.38;
        const bands = Math.max(2, foilScale);
        const grad = ctx.createLinearGradient(phase * w * 0.15, 0, w, h);
        const stops = bands;
        for (let i = 0; i <= stops; i++) {
          const t = i / stops;
          const mix = (Math.sin((t + phase * 0.12) * Math.PI * 2) + 1) / 2;
          const color =
            mix < 0.5
              ? `rgba(29, 137, 187, ${0.55 - mix * 0.25})`
              : `rgba(79, 29, 187, ${0.28 + mix * 0.2})`;
          grad.addColorStop(t, color);
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
    },
    [dpr, foil, foilScale, ridge, strips, sweep],
  );

  const applyTurn = useCallback(
    (index: number, turn: number) => {
      const card = cardRefs.current[index];
      if (!card) return;
      const front = card.querySelector<HTMLElement>("[data-face='front']");
      const back = card.querySelector<HTMLElement>("[data-face='back']");
      const par = refraction * 12;
      if (front) {
        front.style.opacity = String(1 - turn * 0.92);
        front.style.transform = `translateX(${(-par * turn).toFixed(2)}px)`;
      }
      if (back) {
        back.style.opacity = String(turn);
        back.style.transform = `translateX(${(par * (1 - turn)).toFixed(2)}px)`;
      }
      paintLens(index, turn, foilPhaseRef.current);
    },
    [paintLens, refraction],
  );

  const layout = useCallback(
    (pos: number) => {
      const n = count;
      if (!n) return;
      const width = cardWidth;
      const spacing = (width + gap) * scaleRef.current;
      const focused = ((Math.round(pos) % n) + n) % n;

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const d = wrapDelta(i - pos, n, loop);
        const abs = Math.abs(d);
        const shown = abs <= 2.6;
        const sc = (abs < 0.04 ? 1 : inactiveScale) * scaleRef.current;
        const tx = d * spacing;
        const isFocus = i === focused;
        const turn = isFocus ? turnRef.current : 0;
        const ry = isFocus ? -tilt * turn : 0;
        const z = isFocus ? lift * turn : 0;
        const dim = abs < 0.04 ? 1 : inactiveDim;
        el.style.transform = `translate(-50%, -50%) translateX(${tx.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg) scale(${sc})`;
        el.style.opacity = shown ? "1" : "0";
        el.style.filter = `brightness(${dim})`;
        el.style.zIndex = String(Math.round(80 - abs * 10));
        el.style.pointerEvents = shown ? "auto" : "none";
        el.classList.toggle("is-active", isFocus);
        applyTurn(i, turn);
      }
    },
    [applyTurn, cardWidth, count, gap, inactiveDim, inactiveScale, lift, loop, tilt],
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      cancelAnimationFrame(rafRef.current);
      const start = posRef.current;
      const dist = target - start;
      const duration = animate && !reducedRef.current ? Math.max(0, 720 / Math.max(speed, 0.001)) : 0;
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

  const notify = useCallback((idx: number) => {
    setActive(idx);
    onChangeRef.current?.(idx);
  }, []);

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      if (!count) return;
      const idx = loop ? ((rawIndex % count) + count) % count : clamp(rawIndex, 0, count - 1);
      const delta = shortestDelta(posRef.current, idx, count, loop);
      turnRef.current = trigger === "focus" || coarseRef.current ? 1 : 0;
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [count, loop, notify, trigger, tweenTo],
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    coarseRef.current = isCoarsePointer();
    const start = count ? clamp(initialIndex, 0, count - 1) : 0;
    posRef.current = start;
    focusRef.current = start;
    turnRef.current = trigger === "focus" || coarseRef.current ? 1 : 0;
    setActive(start);
    layout(start);
  }, [count, initialIndex, layout, trigger]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      const needed = cardWidth + gap * 2 + 48;
      scaleRef.current = clamp(w / needed, 0.62, 1);
      const height = cardWidth * scaleRef.current * aspect + lift * 0.35;
      if (stageRef.current) stageRef.current.style.height = `${height}px`;
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [aspect, cardWidth, gap, layout, lift]);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    cancelAnimationFrame(foilRafRef.current);
  }, []);

  useEffect(() => {
    if (paused || reducedRef.current || foil <= 0) return;
    const tick = () => {
      foilPhaseRef.current += 0.012;
      paintLens(focusRef.current, turnRef.current, foilPhaseRef.current);
      foilRafRef.current = requestAnimationFrame(tick);
    };
    foilRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(foilRafRef.current);
  }, [foil, paintLens, paused]);

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

  const setTurnFromClientX = useCallback(
    (clientX: number, card: HTMLElement) => {
      if (reducedRef.current) {
        turnRef.current = 1;
        layout(posRef.current);
        return;
      }
      const rect = card.getBoundingClientRect();
      const span = Math.max(rect.width * travel, 1);
      const x = clientX - rect.left;
      turnRef.current = clamp(x / span, 0, 1);
      layout(posRef.current);
    },
    [layout, travel],
  );

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
      const card = cardRefs.current[focusRef.current];
      const useHover = trigger === "hover" && !coarseRef.current;
      if (!drag && useHover && card && event.target instanceof Node && card.contains(event.target)) {
        setTurnFromClientX(event.clientX, card);
      }
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
        if (stageRef.current) stageRef.current.dataset.lcDragged = "1";
      }
      if (drag.axis !== "x") return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (event.clientX - drag.lastX) / dt;
      drag.lastX = event.clientX;
      drag.lastT = now;
      const stepPx = Math.max((cardWidth + gap) * scaleRef.current * 0.55, 40);
      posRef.current = drag.startPos - dx / stepPx;
      if (!loop) posRef.current = clamp(posRef.current, 0, Math.max(count - 1, 0));
      layout(posRef.current);
    },
    [cardWidth, count, gap, layout, loop, setTurnFromClientX, trigger],
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    const stage = stageRef.current;
    if (drag?.moved) {
      const stepPx = Math.max((cardWidth + gap) * scaleRef.current * 0.55, 40);
      const projected = posRef.current - (drag.v * 180) / stepPx;
      setFocus(Math.round(projected), true);
      if (stage) {
        stage.dataset.lcDragged = "1";
        window.setTimeout(() => {
          delete stage.dataset.lcDragged;
        }, 80);
      }
    }
    dragRef.current = null;
  }, [cardWidth, gap, setFocus]);

  const onPointerLeave = useCallback(() => {
    if (trigger === "hover" && !coarseRef.current && !reducedRef.current) {
      turnRef.current = 0;
      layout(posRef.current);
    }
  }, [layout, trigger]);

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
    if (stageRef.current?.dataset.lcDragged === "1") {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  const atStart = !loop && active <= 0;
  const atEnd = !loop && active >= count - 1;
  const slideWidth = cardWidth;
  const slideHeight = cardWidth * aspect;

  return (
    <div
      ref={rootRef}
      className={`lenticular-carousel ${className}`.trim()}
      tabIndex={enableKeyboard ? 0 : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      <div
        ref={stageRef}
        className="lenticular-carousel__stage"
        style={{ perspective: `${perspective}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerLeave}
      >
        <div className="lenticular-carousel__world">
          {data.map((item, index) => {
            const href = item.href;
            const label = item.label ?? item.alt ?? `Slide ${index + 1}`;
            const face = (
              <>
                <div className="lenticular-carousel__faces">
                  <div className="lenticular-carousel__face lenticular-carousel__face--front" data-face="front">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- mixed remote / data URI surfaces
                      <img src={item.image} alt="" draggable={false} />
                    ) : (
                      <span className="lenticular-carousel__face-fill" />
                    )}
                  </div>
                  <div className="lenticular-carousel__face lenticular-carousel__face--back" data-face="back">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- mixed remote / data URI surfaces
                      <img src={item.image} alt="" draggable={false} />
                    ) : (
                      <span className="lenticular-carousel__face-fill" />
                    )}
                  </div>
                </div>
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el;
                  }}
                  className="lenticular-carousel__canvas"
                  aria-hidden
                />
                {showLabels ? (
                  <div
                    className="lenticular-carousel__scrim"
                    style={{ opacity: scrim }}
                  >
                    {item.meta ? (
                      <span className="lenticular-carousel__meta">{item.meta}</span>
                    ) : null}
                    <p className="lenticular-carousel__label" style={{ color: labelColor }}>
                      {label}
                    </p>
                  </div>
                ) : null}
              </>
            );

            return (
              <article
                key={`${label}-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="lenticular-carousel__slide"
                style={{
                  width: slideWidth,
                  height: slideHeight,
                  borderRadius,
                }}
                aria-roledescription="slide"
                aria-label={`${label}, ${index + 1} of ${count}`}
                aria-hidden={active !== index}
              >
                {href ? (
                  isExternalHref(href) ? (
                    <a
                      href={href}
                      className="lenticular-carousel__link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      tabIndex={active === index ? 0 : -1}
                      onClick={preventDragClick}
                      onFocus={() => {
                        if (trigger === "focus" || coarseRef.current) {
                          turnRef.current = 1;
                          layout(posRef.current);
                        }
                      }}
                    >
                      {face}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="lenticular-carousel__link"
                      aria-label={label}
                      tabIndex={active === index ? 0 : -1}
                      onClick={preventDragClick}
                    >
                      {face}
                    </Link>
                  )
                ) : (
                  <div className="lenticular-carousel__link">{face}</div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {showControls || showDots ? (
        <div className="lenticular-carousel__controls">
          {showControls ? (
            <button
              type="button"
              className="lenticular-carousel__nav"
              aria-label="Previous slide"
              disabled={atStart}
              onClick={() => navigateBy(-1)}
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          ) : null}

          {showDots ? (
            <div className="lenticular-carousel__rail" role="tablist" aria-label="Slides">
              {data.map((item, index) => (
                <button
                  key={`${item.label ?? index}-seg`}
                  type="button"
                  role="tab"
                  className={`lenticular-carousel__seg${index === active ? " is-active" : ""}`}
                  aria-label={`Go to ${item.label ?? `slide ${index + 1}`}`}
                  aria-selected={index === active}
                  onClick={() => setFocus(index, true)}
                />
              ))}
            </div>
          ) : null}

          {showControls ? (
            <button
              type="button"
              className="lenticular-carousel__nav"
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
