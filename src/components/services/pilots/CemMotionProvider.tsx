"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { clamp01, type CemSceneId } from "@/components/services/pilots/cemMotion";

type SceneProgressMap = Partial<Record<CemSceneId, number>>;

type CemMotionContextValue = {
  reduceMotion: boolean;
  ready: boolean;
  activeScene: CemSceneId | null;
  sceneProgress: SceneProgressMap;
  registerPin: (id: CemSceneId, el: HTMLElement | null) => void;
  getProgress: (id: CemSceneId) => number;
};

const CemMotionContext = createContext<CemMotionContextValue | null>(null);

/**
 * One page-level scroll driver for all CEM pins.
 * Writes CSS vars on pins; React state updates are throttled.
 */
export function CemMotionProvider({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pinsRef = useRef<Map<CemSceneId, HTMLElement>>(new Map());
  const progressRef = useRef<SceneProgressMap>({});
  const frameRef = useRef(0);
  const tickRef = useRef<() => void>(() => {});

  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [activeScene, setActiveScene] = useState<CemSceneId | null>(null);
  const [sceneProgress, setSceneProgress] = useState<SceneProgressMap>({});

  const registerPin = useCallback((id: CemSceneId, el: HTMLElement | null) => {
    if (el) pinsRef.current.set(id, el);
    else pinsRef.current.delete(id);
    tickRef.current();
  }, []);

  const getProgress = useCallback(
    (id: CemSceneId) => {
      if (reduceMotion) return 1;
      return progressRef.current[id] ?? 0;
    },
    [reduceMotion],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduceMotion) {
      const full: SceneProgressMap = {
        boot: 1,
        problems: 1,
        rebuild: 1,
        modules: 1,
        stages: 1,
        trust: 1,
        activation: 1,
      };
      progressRef.current = full;
      setSceneProgress(full);
      root.style.setProperty("--cem-page-ready", "1");
      root.dataset.reduceMotion = "true";
      tickRef.current = () => {};
      return;
    }

    root.dataset.reduceMotion = "false";
    root.style.setProperty("--cem-page-ready", "1");

    const update = () => {
      frameRef.current = 0;
      const vh = window.innerHeight || 1;
      const next: SceneProgressMap = { ...progressRef.current };
      let bestId: CemSceneId | null = null;
      let bestVisibility = -1;

      pinsRef.current.forEach((el, id) => {
        const rect = el.getBoundingClientRect();
        const travel = Math.max(el.offsetHeight - vh, 1);
        const raw = clamp01(-rect.top / travel);
        next[id] = raw;

        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (visible > bestVisibility) {
          bestVisibility = visible;
          bestId = id;
        }

        el.style.setProperty("--cem-local-t", raw.toFixed(4));
        el.dataset.progress = raw.toFixed(3);
      });

      progressRef.current = next;

      setSceneProgress((prev) => {
        let changed = false;
        const merged: SceneProgressMap = { ...prev };
        (Object.keys(next) as CemSceneId[]).forEach((id) => {
          const a = prev[id] ?? -1;
          const b = next[id] ?? 0;
          if (Math.abs(a - b) >= 0.02 || !(id in prev)) {
            merged[id] = b;
            changed = true;
          }
        });
        return changed ? merged : prev;
      });

      setActiveScene((prev) => (prev === bestId ? prev : bestId));
      if (bestId) root.dataset.activeScene = bestId;
    };

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    tickRef.current = onScroll;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      tickRef.current = () => {};
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduceMotion]);

  const value = useMemo(
    () => ({
      reduceMotion,
      ready,
      activeScene,
      sceneProgress,
      registerPin,
      getProgress,
    }),
    [reduceMotion, ready, activeScene, sceneProgress, registerPin, getProgress],
  );

  return (
    <CemMotionContext.Provider value={value}>
      <div ref={rootRef} className="cem-motion-root">
        {children}
      </div>
    </CemMotionContext.Provider>
  );
}

export function useCemMotion() {
  const ctx = useContext(CemMotionContext);
  if (!ctx) {
    throw new Error("useCemMotion must be used within CemMotionProvider");
  }
  return ctx;
}

/** Register a pin section and read its local 0–1 progress. */
export function useCemSceneProgress(id: CemSceneId) {
  const { registerPin, sceneProgress, reduceMotion, ready } = useCemMotion();
  const ref = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
      registerPin(id, node);
    },
    [id, registerPin],
  );

  const progress = reduceMotion ? 1 : (sceneProgress[id] ?? 0);
  return { setRef, progress, reduceMotion, ready };
}
