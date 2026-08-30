"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type EyeProps = {
  guarded: boolean;
  size: number;
  reduceMotion: boolean;
};

function Eye({ guarded, size, reduceMotion }: EyeProps) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const eyeW = size * 1.45;
  const eyeH = size;
  const pupilR = size * 0.52;
  const maxTravel = size * 0.16;

  useEffect(() => {
    if (reduceMotion) return;

    const onMove = (event: MouseEvent) => {
      if (!eyeRef.current || guarded) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const clamp = Math.min(maxTravel / dist, 1);
      setPupil({ x: dx * clamp, y: dy * clamp });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [guarded, maxTravel, reduceMotion]);

  useEffect(() => {
    if (guarded) setPupil({ x: 0, y: 0 });
  }, [guarded]);

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
  const [reduceMotion, setReduceMotion] = useState(false);
  const [eyeSize, setEyeSize] = useState(48);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);

    const syncSize = () => {
      const width = window.innerWidth;
      if (width < 360) setEyeSize(40);
      else if (width < 640) setEyeSize(46);
      else if (width < 1024) setEyeSize(54);
      else setEyeSize(62);
    };
    syncSize();
    window.addEventListener("resize", syncSize, { passive: true });

    return () => {
      media.removeEventListener("change", syncMotion);
      window.removeEventListener("resize", syncSize);
    };
  }, []);

  return (
    <div
      className={cn("relative flex items-end justify-center", className)}
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
        <Eye guarded={guarded} size={eyeSize} reduceMotion={reduceMotion} />
        <Eye guarded={guarded} size={eyeSize} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
}
