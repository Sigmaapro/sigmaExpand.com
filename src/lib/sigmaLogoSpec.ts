/** SVG-derived Σ geometry — plain math only (no Three.js) for small client bundles. */

const SVG_CENTER = 100;
export const SIGMA_SVG_SCALE = 0.01;

export type Vec3 = { x: number; y: number; z: number };

export function svgToWorld(x: number, y: number): Vec3 {
  return {
    x: (x - SVG_CENTER) * SIGMA_SVG_SCALE,
    y: -(y - SVG_CENTER) * SIGMA_SVG_SCALE,
    z: 0,
  };
}

/** Canonical Σ strokes — same paths as 2D hero SVG. */
export const SIGMA_STROKES = [
  { id: "left" as const, ax: 100, ay: 36, bx: 54, by: 164 },
  { id: "right" as const, ax: 100, ay: 36, bx: 146, by: 164 },
  { id: "bar" as const, ax: 62, ay: 108, bx: 138, by: 108 },
];

/** SVG stroke width 2 → world thickness */
export function sigmaStrokeThickness(): number {
  return 2 * SIGMA_SVG_SCALE;
}

function vSub(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function vAdd(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function vScale(v: Vec3, s: number): Vec3 {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

function vLen(v: Vec3): number {
  return Math.hypot(v.x, v.y, v.z);
}

function vNorm(v: Vec3): Vec3 {
  const l = vLen(v);
  if (l < 1e-8) return { x: 0, y: 1, z: 0 };
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

export type SigmaStrokePiece = {
  id: string;
  length: number;
  mid: Vec3;
  angleZ: number;
  burstDir: Vec3;
};

export function buildSigmaStrokePieces(): SigmaStrokePiece[] {
  return SIGMA_STROKES.map((s) => {
    const a = svgToWorld(s.ax, s.ay);
    const b = svgToWorld(s.bx, s.by);
    const delta = vSub(b, a);
    const length = vLen(delta);
    const mid = vScale(vAdd(a, b), 0.5);
    const angleZ = Math.atan2(delta.y, delta.x);
    const burstDir = vNorm(mid);
    return { id: s.id, length, mid, angleZ, burstDir };
  });
}

function smoothstep01(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Scroll progress → 0..1 explosion amount (smooth). Works both directions. */
export function scrollToExplodeAmount(scrollProgress: number): number {
  return smoothstep01((scrollProgress - 0.1) / 0.52);
}

/** 2D explode offsets (SVG units) — matches `burstDir` × scale. */
export function sigmaExplodeOffsetsSvg(
  explode: number,
  scale = 18,
): { dx: number; dy: number }[] {
  return buildSigmaStrokePieces().map((p) => ({
    dx: p.burstDir.x * scale * explode,
    dy: p.burstDir.y * scale * explode,
  }));
}
