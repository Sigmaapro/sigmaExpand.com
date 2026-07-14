/**
 * Hero atmosphere overlays — soft depth only (vignette + corner falloff).
 * No scanlines / grain / static noise. Copy, CTAs, and carousel stay untouched.
 */
export function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className="sigma-hero-terminal-grid absolute inset-0 opacity-[0.03] md:opacity-[0.045]" />
      <div className="sigma-hero-corner-crush absolute inset-0" />
      <div className="sigma-hero-vignette absolute inset-0 opacity-[0.4] sm:opacity-[0.5] md:opacity-[0.58]" />
    </div>
  );
}
