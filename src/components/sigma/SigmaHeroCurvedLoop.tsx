"use client";

const MARQUEE_TEXT =
  "Finance & Web3 Growth Infrastructure · 40+ Markets · 1,500+ Network";

type SigmaHeroCurvedLoopProps = {
  /** Localized eyebrow copy; falls back to EN marquee string. */
  text?: string;
};

/**
 * Homepage hero signal line — docked just under the fixed navbar.
 * The spacer keeps SIGMA / copy / CTAs from shifting.
 */
export function SigmaHeroCurvedLoopSpacer() {
  return (
    <div
      className="sigma-hero-curved-loop-spacer mb-3 w-full max-w-[72rem] sm:mb-4 md:mb-5"
      aria-hidden
    />
  );
}

export function SigmaHeroCurvedLoop({ text = MARQUEE_TEXT }: SigmaHeroCurvedLoopProps) {
  return (
    <div
      className="sigma-hero-curved-loop pointer-events-none absolute inset-x-0 top-[max(5.15rem,calc(env(safe-area-inset-top,0px)+4.15rem))] z-[12] flex justify-center px-3 sm:px-5 md:top-[max(5.85rem,calc(env(safe-area-inset-top,0px)+4.85rem))] md:px-10 lg:px-16"
      aria-label={text}
    >
      <div className="sigma-hero-simple-line w-full max-w-[min(100%,76rem)]">
        <span className="sigma-hero-simple-line__text">{text}</span>
      </div>
    </div>
  );
}
