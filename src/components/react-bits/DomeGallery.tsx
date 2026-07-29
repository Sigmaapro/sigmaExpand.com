"use client";

import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import { useGesture } from "@use-gesture/react";

export type DomeGalleryImage = {
  src: string;
  alt: string;
  href?: string;
  objectPosition?: string;
};

type DomeGalleryProps = {
  images?: DomeGalleryImage[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  segments?: number;
  dragDampening?: number;
  imageBorderRadius?: string;
  grayscale?: boolean;
  /** Deterministic shuffle seed for tile distribution (hydration-safe). */
  shuffleSeed?: number;
  onItemActivate?: (item: DomeGalleryImage) => void;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
};

type ItemDef = DomeGalleryImage & {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  segments: 35,
};

/** Stable homepage shuffle seed — not Math.random(); hydration-safe. */
export const DOME_TEAM_SHUFFLE_SEED = 0x51474d41; // "SGMA"

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

/** Deterministic PRNG (Mulberry32) — safe for render; no Math.random(). */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const out = items.slice();
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = out[i]!;
    out[i] = out[j]!;
    out[j] = tmp;
  }
  return out;
}

/**
 * Fill dome slots with a deterministic shuffled sequence.
 * Avoids immediate neighbors sharing the same src and reduces same-column streaks.
 */
function distributeImages(
  pool: DomeGalleryImage[],
  coords: Array<{ x: number; y: number; sizeX: number; sizeY: number }>,
  seed: number,
): DomeGalleryImage[] {
  if (pool.length === 0) {
    return coords.map(() => ({ src: "", alt: "" }));
  }

  const rand = mulberry32(seed);
  const result: DomeGalleryImage[] = [];

  // Column boundaries from coord layout (same x = same column)
  const colStarts: number[] = [];
  for (let i = 0; i < coords.length; i++) {
    if (i === 0 || coords[i]!.x !== coords[i - 1]!.x) {
      colStarts.push(i);
    }
  }

  const indexToCol = (i: number) => {
    for (let c = colStarts.length - 1; c >= 0; c--) {
      if (i >= colStarts[c]!) return c;
    }
    return 0;
  };

  for (let i = 0; i < coords.length; i++) {
    const prev = result[i - 1];
    const col = indexToCol(i);
    const rowInCol = i - (colStarts[col] ?? 0);
    const prevColStart = col > 0 ? colStarts[col - 1]! : -1;
    const prevColLen =
      prevColStart >= 0 ? (colStarts[col] ?? coords.length) - prevColStart : 0;
    const horizontalNeighbor =
      prevColStart >= 0
        ? result[prevColStart + Math.min(rowInCol, Math.max(0, prevColLen - 1))]
        : undefined;

    const order = seededShuffle(pool, seed + i * 2654435761);
    let chosen = order[0]!;
    let bestScore = -Infinity;

    for (const cand of order) {
      let score = rand() * 0.15;
      if (prev && cand.src === prev.src) score -= 100;
      if (horizontalNeighbor && cand.src === horizontalNeighbor.src) score -= 55;
      for (let k = 2; k <= 4; k++) {
        const earlier = result[i - k];
        if (earlier && earlier.src === cand.src) score -= 18 - k * 2;
      }
      let localCount = 0;
      for (let k = 1; k <= Math.min(pool.length, 8); k++) {
        if (result[i - k]?.src === cand.src) localCount += 1;
      }
      score -= localCount * 12;

      if (score > bestScore) {
        bestScore = score;
        chosen = cand;
      }
    }

    if (prev && chosen.src === prev.src) {
      const alt = order.find((img) => img.src !== prev.src);
      if (alt) chosen = alt;
    }

    result.push(chosen);
  }

  for (let i = 1; i < result.length; i++) {
    if (result[i]!.src !== result[i - 1]!.src) continue;
    for (let j = i + 1; j < result.length; j++) {
      const candidate = result[j]!;
      if (candidate.src === result[i - 1]!.src) continue;
      if (j + 1 < result.length && candidate.src === result[j + 1]!.src) continue;
      if (i + 1 < result.length && candidate.src === result[i + 1]!.src) continue;
      result[j] = result[i]!;
      result[i] = candidate;
      break;
    }
  }

  return result;
}

function buildItems(pool: DomeGalleryImage[], seg: number, seed: number): ItemDef[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const usedImages = distributeImages(pool, coords, seed);

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i]?.src ?? "",
    alt: usedImages[i]?.alt ?? "",
    href: usedImages[i]?.href,
    objectPosition: usedImages[i]?.objectPosition,
  }));
}

/**
 * React Bits Dome Gallery — adapted for Sigma:
 * drag/inertia preserved; tiles activate profile links (no enlarge lightbox).
 */
export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#060010",
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  imageBorderRadius = "30px",
  grayscale = false,
  shuffleSeed = DOME_TEAM_SHUFFLE_SEED,
  onItemActivate,
  autoRotate = false,
  autoRotateSpeed = 0.06,
  className = "",
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const pointerTypeRef = useRef<"mouse" | "pen" | "touch">("mouse");
  const tapTargetRef = useRef<HTMLElement | null>(null);
  const lastDragEndAt = useRef(0);
  const itemsByKeyRef = useRef<Map<string, DomeGalleryImage>>(new Map());

  const items = useMemo(
    () => buildItems(images, segments, shuffleSeed),
    [images, segments, shuffleSeed],
  );

  const focusableKeys = useMemo(() => {
    const seen = new Set<string>();
    const keys = new Set<string>();
    items.forEach((it, i) => {
      const id = it.href || it.src;
      if (!id || seen.has(id)) return;
      seen.add(id);
      keys.add(`${it.x},${it.y},${i}`);
    });
    return keys;
  }, [items]);

  useEffect(() => {
    const map = new Map<string, DomeGalleryImage>();
    items.forEach((it, i) => {
      map.set(`${it.x},${it.y},${i}`, {
        src: it.src,
        alt: it.alt,
        href: it.href,
        objectPosition: it.objectPosition,
      });
    });
    itemsByKeyRef.current = map;
  }, [items]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0]?.contentRect;
      if (!cr) return;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = w;
          break;
        case "height":
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      radius = Math.min(radius, h * 1.35);
      radius = clamp(radius, minRadius, maxRadius);

      root.style.setProperty("--radius", `${Math.round(radius)}px`);
      root.style.setProperty("--viewer-pad", `${Math.max(8, Math.round(minDim * padFactor))}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;

    let animationFrame = 0;
    const rotate = () => {
      const isPaused =
        draggingRef.current ||
        inertiaRAF.current !== null;

      if (!isPaused) {
        const nextY = wrapAngleSigned(rotationRef.current.y + autoRotateSpeed);
        rotationRef.current = { ...rotationRef.current, y: nextY };
        applyTransform(rotationRef.current.x, nextY);
      }

      animationFrame = requestAnimationFrame(rotate);
    };

    animationFrame = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoRotate, autoRotateSpeed]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia],
  );

  const activateFromElement = useCallback(
    (el: HTMLElement | null) => {
      if (!el || cancelTapRef.current) return;
      if (performance.now() - lastDragEndAt.current < 120) return;
      const key = el.dataset.itemKey;
      if (!key) return;
      const item = itemsByKeyRef.current.get(key);
      if (!item) return;
      onItemActivate?.(item);
    },
    [onItemActivate],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        stopInertia();
        const evt = event as PointerEvent;
        pointerTypeRef.current = (evt.pointerType as "mouse" | "pen" | "touch") || "mouse";
        if (pointerTypeRef.current === "touch") evt.preventDefault();
        draggingRef.current = true;
        cancelTapRef.current = false;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        const potential = (evt.target as Element).closest?.(".item__image") as HTMLElement | null;
        tapTargetRef.current = potential || null;
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (!draggingRef.current || !startPosRef.current) return;

        const evt = event as PointerEvent;
        if (pointerTypeRef.current === "touch") evt.preventDefault();

        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg,
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        const cur = rotationRef.current;
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }

        if (last) {
          draggingRef.current = false;
          let isTap = false;

          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            const TAP_THRESH_PX = pointerTypeRef.current === "touch" ? 10 : 6;
            if (dx * dx + dy * dy <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true;
            }
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = (mx / dragSensitivity) * 0.02;
            vy = (my / dragSensitivity) * 0.02;
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy);
          }

          startPosRef.current = null;
          cancelTapRef.current = !isTap;

          if (isTap && tapTargetRef.current) {
            activateFromElement(tapTargetRef.current);
          }
          tapTargetRef.current = null;

          if (cancelTapRef.current) {
            window.setTimeout(() => {
              cancelTapRef.current = false;
            }, 120);
          }
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } },
  );

  return (
    <div
      ref={rootRef}
      className={`sphere-root relative h-full w-full ${className}`.trim()}
      style={
        {
          ["--segments-x" as string]: segments,
          ["--segments-y" as string]: segments,
          ["--overlay-blur-color" as string]: overlayBlurColor,
          ["--tile-radius" as string]: imageBorderRadius,
          ["--image-filter" as string]: grayscale ? "grayscale(1)" : "none",
        } as CSSProperties
      }
    >
      <div
        ref={mainRef}
        className="absolute inset-0 grid place-items-center overflow-hidden bg-transparent select-none"
        style={{ touchAction: "none", WebkitUserSelect: "none" }}
        role="presentation"
      >
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => {
              const key = `${it.x},${it.y},${i}`;
              return (
                <div
                  key={key}
                  className="sphere-item absolute m-auto"
                  data-src={it.src}
                  data-alt={it.alt}
                  data-offset-x={it.x}
                  data-offset-y={it.y}
                  data-size-x={it.sizeX}
                  data-size-y={it.sizeY}
                  style={
                    {
                      ["--offset-x" as string]: it.x,
                      ["--offset-y" as string]: it.y,
                      ["--item-size-x" as string]: it.sizeX,
                      ["--item-size-y" as string]: it.sizeY,
                      top: "-999px",
                      bottom: "-999px",
                      left: "-999px",
                      right: "-999px",
                    } as CSSProperties
                  }
                >
                  <div
                    className="item__image absolute block cursor-pointer overflow-hidden bg-[#121b32]/80 transition-transform duration-300"
                    role="link"
                    tabIndex={focusableKeys.has(key) ? 0 : -1}
                    data-item-key={key}
                    aria-label={it.alt ? `Open profile for ${it.alt}` : "Open profile"}
                    aria-hidden={focusableKeys.has(key) ? undefined : true}
                    onClick={(e) => {
                      e.preventDefault();
                      activateFromElement(e.currentTarget);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        activateFromElement(e.currentTarget);
                      }
                    }}
                    style={{
                      inset: "10px",
                      borderRadius: `var(--tile-radius, ${imageBorderRadius})`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.src}
                      draggable={false}
                      alt={it.alt}
                      className="pointer-events-none h-full w-full object-cover"
                      style={{
                        backfaceVisibility: "hidden",
                        objectPosition: it.objectPosition ?? "center center",
                        filter: `var(--image-filter, ${grayscale ? "grayscale(1)" : "none"})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
