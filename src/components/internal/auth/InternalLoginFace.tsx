"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Pupil = { x: number; y: number };

type TrackingMode = "mouse" | "orientation" | "static";

type DeviceOrientationConstructor = {
  requestPermission?: () => Promise<"granted" | "denied" | "default">;
};

const ZERO: Pupil = { x: 0, y: 0 };
/** Usable tilt range (degrees) mapped into pupil travel. */
const TILT_RANGE_DEG = 22;
/** Low-pass factor per animation frame — lower = smoother / more delayed. */
const ORIENT_LERP = 0.11;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function maxPupilTravel(size: number) {
  return clamp(size * 0.14, 3, 7);
}

function subscribeMediaQuery(query: string, onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => subscribeMediaQuery(query, onChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function useOrientationApiAvailable() {
  return useSyncExternalStore(
    () => () => {},
    () => "DeviceOrientationEvent" in window,
    () => false,
  );
}

function useEyeSize() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("resize", onChange, { passive: true });
      return () => window.removeEventListener("resize", onChange);
    },
    () => {
      const width = window.innerWidth;
      if (width < 360) return 40;
      if (width < 640) return 46;
      if (width < 1024) return 54;
      return 62;
    },
    () => 48,
  );
}

type EyeProps = {
  guarded: boolean;
  size: number;
  reduceMotion: boolean;
  mode: TrackingMode;
  sharedPupil: Pupil;
};

function Eye({ guarded, size, reduceMotion, mode, sharedPupil }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [mousePupil, setMousePupil] = useState<Pupil>(ZERO);
  const eyeW = size * 1.45;
  const eyeH = size;
  const pupilR = size * 0.52;
  const maxTravel = maxPupilTravel(size);

  useEffect(() => {
    if (mode !== "mouse" || reduceMotion) return;

    const onMove = (event: MouseEvent) => {
      if (!eyeRef.current || guarded) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const scale = Math.min(maxTravel / dist, 1);
      setMousePupil({ x: dx * scale, y: dy * scale });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [guarded, maxTravel, mode, reduceMotion]);

  useEffect(() => {
    if (guarded) setMousePupil(ZERO);
  }, [guarded]);

  const pupil = guarded
    ? ZERO
    : mode === "orientation"
      ? sharedPupil
      : mode === "mouse"
        ? mousePupil
        : ZERO;

  return (
    <div
      ref={eyeRef}
      aria-hidden="true"
      className="relative shrink-0 overflow-hidden"
      style={{
        width: eyeW,
        height: eyeH,
        borderRadius: eyeH * 0.85,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(220,230,245,0.88) 100%)",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.75), inset 0 -1px 0 rgba(28,57,187,0.12)",
      }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: pupilR,
          height: pupilR,
          top: "50%",
          left: "50%",
          background:
            "radial-gradient(circle at 32% 28%, #3a4a6a 0%, #0b1020 55%, #05070e 100%)",
          boxShadow: "0 0 0 1px rgba(189,224,254,0.18)",
          transform: `translate(calc(-50% + ${pupil.x}px), calc(-50% + ${pupil.y}px))`,
          transition: reduceMotion
            ? "none"
            : guarded
              ? "transform 200ms ease"
              : mode === "orientation"
                ? "none"
                : "transform 40ms linear",
        }}
      >
        <div
          className="absolute rounded-full bg-white/55"
          style={{
            width: pupilR * 0.26,
            height: pupilR * 0.26,
            top: "16%",
            left: "20%",
          }}
        />
      </div>

      <div
        className="internal-login-face-lid absolute inset-x-0 top-0 z-[2]"
        style={{
          height: guarded ? "98%" : "0%",
          background:
            "linear-gradient(180deg, #0a0e18 0%, #111827 55%, #0c1220 100%)",
          borderRadius: `${eyeH * 0.2}px ${eyeH * 0.2}px 0 0`,
          transition: reduceMotion ? "none" : "height 300ms cubic-bezier(0.55, 0, 0.45, 1)",
          boxShadow: guarded ? "inset 0 -1px 0 rgba(189,224,254,0.12)" : undefined,
        }}
      />
      <div
        className="internal-login-face-lid absolute inset-x-0 bottom-0 z-[2]"
        style={{
          height: guarded ? "14%" : "0%",
          background: "linear-gradient(0deg, #0a0e18 0%, #121a2a 100%)",
          borderRadius: `0 0 ${eyeH * 0.55}px ${eyeH * 0.55}px`,
          transition: reduceMotion ? "none" : "height 300ms cubic-bezier(0.55, 0, 0.45, 1)",
        }}
      />
    </div>
  );
}

type Props = {
  guarded: boolean;
  className?: string;
};

export function InternalLoginFace({ guarded, className }: Props) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const orientationSupported = useOrientationApiAvailable();
  const eyeSize = useEyeSize();

  const [motionEnabled, setMotionEnabled] = useState(false);
  const [motionDenied, setMotionDenied] = useState(false);
  const [sharedPupil, setSharedPupil] = useState<Pupil>(ZERO);

  const guardedRef = useRef(guarded);
  const eyeSizeRef = useRef(eyeSize);
  const targetRef = useRef<Pupil>(ZERO);
  const currentRef = useRef<Pupil>(ZERO);
  const baselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    guardedRef.current = guarded;
    if (guarded) {
      targetRef.current = ZERO;
      currentRef.current = ZERO;
      setSharedPupil(ZERO);
    }
  }, [guarded]);

  useEffect(() => {
    eyeSizeRef.current = eyeSize;
  }, [eyeSize]);

  useEffect(() => {
    if (reduceMotion) setMotionEnabled(false);
  }, [reduceMotion]);

  const canUseOrientation =
    !reduceMotion && coarsePointer && orientationSupported && !motionDenied;
  const motionActive = canUseOrientation && motionEnabled;
  const showMotionOptIn = canUseOrientation && !motionEnabled;

  const mapOrientation = useCallback((event: DeviceOrientationEvent): Pupil => {
    const beta = event.beta;
    const gamma = event.gamma;
    if (beta == null || gamma == null) return ZERO;

    if (!baselineRef.current) {
      baselineRef.current = { beta, gamma };
    }

    const base = baselineRef.current;
    const travel = maxPupilTravel(eyeSizeRef.current);
    const x = clamp((gamma - base.gamma) / TILT_RANGE_DEG, -1, 1) * travel;
    // Forward tilt (beta ↑ from resting) → pupils up (negative Y in CSS).
    const y = clamp(-(beta - base.beta) / TILT_RANGE_DEG, -1, 1) * travel;
    return { x, y };
  }, []);

  useEffect(() => {
    if (!motionActive) {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      targetRef.current = ZERO;
      currentRef.current = ZERO;
      setSharedPupil(ZERO);
      return;
    }

    const onOrientation = (event: DeviceOrientationEvent) => {
      if (guardedRef.current) {
        targetRef.current = ZERO;
        return;
      }
      targetRef.current = mapOrientation(event);
    };

    const resetBaseline = () => {
      baselineRef.current = null;
      targetRef.current = ZERO;
    };

    const tick = () => {
      const target = guardedRef.current ? ZERO : targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * ORIENT_LERP;
      current.y += (target.y - current.y) * ORIENT_LERP;

      if (Math.abs(current.x) < 0.02) current.x = 0;
      if (Math.abs(current.y) < 0.02) current.y = 0;

      setSharedPupil({ x: current.x, y: current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("deviceorientation", onOrientation, true);
    window.addEventListener("orientationchange", resetBaseline, { passive: true });
    const screenOrientation = window.screen?.orientation;
    screenOrientation?.addEventListener?.("change", resetBaseline);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("deviceorientation", onOrientation, true);
      window.removeEventListener("orientationchange", resetBaseline);
      screenOrientation?.removeEventListener?.("change", resetBaseline);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      baselineRef.current = null;
      targetRef.current = ZERO;
      currentRef.current = ZERO;
    };
  }, [mapOrientation, motionActive]);

  const enableMotion = useCallback(async () => {
    if (!canUseOrientation) return;

    try {
      const Orientation = DeviceOrientationEvent as unknown as DeviceOrientationConstructor;
      if (typeof Orientation.requestPermission === "function") {
        const result = await Orientation.requestPermission();
        if (result !== "granted") {
          setMotionDenied(true);
          setMotionEnabled(false);
          return;
        }
      }
      baselineRef.current = null;
      targetRef.current = ZERO;
      currentRef.current = ZERO;
      setSharedPupil(ZERO);
      setMotionEnabled(true);
    } catch {
      setMotionDenied(true);
      setMotionEnabled(false);
    }
  }, [canUseOrientation]);

  const trackingMode: TrackingMode = reduceMotion
    ? "static"
    : coarsePointer
      ? motionActive
        ? "orientation"
        : "static"
      : "mouse";

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      <div
        className="relative flex w-full flex-1 items-end justify-center"
        aria-hidden="true"
      >
        <div
          className="pointer-events-none absolute inset-[-18%] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle at 50% 70%, rgba(189,224,254,0.1) 0%, rgba(28,57,187,0.12) 28%, rgba(12,16,24,0) 64%)",
          }}
        />
        <div className="relative flex items-end" style={{ gap: eyeSize * 0.5 }}>
          <Eye
            guarded={guarded}
            size={eyeSize}
            reduceMotion={reduceMotion}
            mode={trackingMode}
            sharedPupil={sharedPupil}
          />
          <Eye
            guarded={guarded}
            size={eyeSize}
            reduceMotion={reduceMotion}
            mode={trackingMode}
            sharedPupil={sharedPupil}
          />
        </div>
      </div>

      {showMotionOptIn ? (
        <button
          type="button"
          onClick={enableMotion}
          className="absolute left-1/2 top-[calc(100%+0.15rem)] z-10 -translate-x-1/2 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 font-display text-[9px] uppercase tracking-[0.16em] text-cadet/55 backdrop-blur-sm transition-colors hover:border-white/[0.14] hover:text-cadet/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bde0fe]/35"
        >
          Enable motion
        </button>
      ) : null}
    </div>
  );
}
