/** Step index helpers for CEM cinematic scenes — avoids off-by-one active states. */

import { mapRange } from "@/components/services/pilots/cemMotion";

/** Maps progress into a stable 0..count-1 index with hold zones at start/end. */
export function sceneStepIndex(
  progress: number,
  count: number,
  start = 0.04,
  end = 0.92,
): number {
  if (count <= 1) return 0;
  const t = mapRange(progress, start, end, 0, 1);
  return Math.min(count - 1, Math.floor(t * count));
}
