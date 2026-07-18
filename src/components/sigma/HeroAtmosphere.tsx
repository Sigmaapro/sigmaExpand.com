/**
 * Hero atmosphere overlays — soft depth only.
 * Bottom-faded so Hero → Regions does not read as a dark horizontal band.
 * No scanlines / grain / static noise. Copy, CTAs stay untouched.
 */
export function HeroAtmosphere() {
  return (
    <div
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_0%,#000_70%,transparent_100%)]"
      aria-hidden
    >
      <div className="sigma-hero-terminal-grid absolute inset-0 opacity-[0.03] md:opacity-[0.045]" />
      <div className="sigma-hero-corner-crush absolute inset-0" />
      <div className="sigma-hero-vignette absolute inset-0 opacity-[0.22] sm:opacity-[0.28] md:opacity-[0.34]" />
    </div>
  );
}
