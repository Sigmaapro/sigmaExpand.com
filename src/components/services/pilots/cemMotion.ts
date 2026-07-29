/** Shared motion math for CEM cinematic page — no React. */

export function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin;
  return lerp(outMin, outMax, clamp01((value - inMin) / (inMax - inMin)));
}

export function smoothStep(t: number): number {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}

export function segmentProgress(t: number, start: number, end: number): number {
  return smoothStep(mapRange(t, start, end, 0, 1));
}

export type CemSceneId =
  | "boot"
  | "problems"
  | "rebuild"
  | "modules"
  | "stages"
  | "trust"
  | "activation";

export const CEM_LOOP_ORDER = [
  "acquisition",
  "distribution",
  "activation",
  "retention",
  "volume",
] as const;
