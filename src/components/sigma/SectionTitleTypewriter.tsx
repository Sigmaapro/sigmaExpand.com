"use client";

import { useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

/**
 * Premium once-per-viewport title typewriter (Regions / Network pattern).
 * Copy is unchanged — characters reveal only; respects prefers-reduced-motion.
 */
export function useSectionTitleTypewriter(
  fullText: string,
  enabled: boolean,
  observeRef: RefObject<HTMLElement | null>,
) {
  const [typed, setTyped] = useState(enabled ? "" : fullText);
  const [done, setDone] = useState(!enabled);
  const [started, setStarted] = useState(!enabled);
  const runIdRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setTyped(fullText);
      setDone(true);
      setStarted(true);
      return;
    }

    setTyped("");
    setDone(false);
    setStarted(false);
    const el = observeRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { root: null, threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [enabled, fullText, observeRef]);

  useEffect(() => {
    if (!enabled || !started) return;

    const id = ++runIdRef.current;
    let i = 0;
    setTyped("");
    setDone(false);

    const stepMs = Math.min(
      42,
      Math.max(22, Math.floor(1800 / Math.max(fullText.length, 1))),
    );
    const timer = window.setInterval(() => {
      if (runIdRef.current !== id) return;
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        window.clearInterval(timer);
        setDone(true);
      }
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [enabled, started, fullText]);

  return { typed, done, showCursor: enabled && started && !done };
}

type SectionTitleTypewriterProps = {
  text: string;
  id?: string;
  as?: "h2" | "h3";
  className?: string;
  /**
   * Element watched for once-per-viewport start.
   * Defaults to the heading itself when omitted.
   */
  observeRef?: RefObject<HTMLElement | null>;
};

/** Heading markup matching the Regions glass title typewriter. */
export function SectionTitleTypewriter({
  text,
  id,
  as = "h2",
  className = "",
  observeRef,
}: SectionTitleTypewriterProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const selfRef = useRef<HTMLHeadingElement | null>(null);
  const targetRef = observeRef ?? selfRef;
  const { typed, done, showCursor } = useSectionTitleTypewriter(
    text,
    !reduceMotion,
    targetRef,
  );

  const sharedClass = `relative ${className}`.trim();
  const overlay = (
    <>
      <span className="invisible select-none" aria-hidden>
        {text}
      </span>
      <span
        className="absolute inset-0 text-inherit"
        aria-hidden={!done && !reduceMotion}
      >
        {reduceMotion || done ? text : typed}
        {showCursor ? (
          <span
            className="ms-0.5 inline-block h-[0.92em] w-[0.08em] translate-y-[0.08em] bg-[#38bdf8] align-baseline opacity-90 animate-pulse"
            aria-hidden
          />
        ) : null}
      </span>
      {!reduceMotion && !done ? (
        <span className="sr-only">{text}</span>
      ) : null}
    </>
  );

  if (as === "h3") {
    return (
      <h3 ref={selfRef} id={id} className={sharedClass}>
        {overlay}
      </h3>
    );
  }

  return (
    <h2 ref={selfRef} id={id} className={sharedClass}>
      {overlay}
    </h2>
  );
}
