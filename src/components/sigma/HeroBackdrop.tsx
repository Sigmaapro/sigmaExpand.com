"use client";

type Props = { reduced: boolean };

export function HeroBackdrop({ reduced }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Depth: dark floor → blue lift */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_100%,rgba(28,57,187,0.16)_0%,transparent_55%),radial-gradient(ellipse_90%_60%_at_80%_15%,rgba(189,224,254,0.045)_0%,transparent_50%),linear-gradient(180deg,#0d0f12_0%,#12151a_45%,#151a2a_100%)]" />

      {/* Diagonal light beam */}
      <div
        className="absolute -left-1/4 top-[-20%] h-[140%] w-[55%] rotate-[-14deg] opacity-[0.075]"
        style={{
          background:
            "linear-gradient(105deg, transparent 0%, rgba(189,224,254,0.35) 45%, transparent 70%)",
        }}
      />

      {/* Animated sweep */}
      {!reduced ? (
        <div className="sigma-hero-sweep pointer-events-none absolute inset-0 opacity-[0.12]" />
      ) : null}

      {/* Film grain */}
      <div
        className="sigma-hero-noise absolute inset-0 opacity-[0.038] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Bottom vignette for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0a0c0f] via-transparent to-transparent opacity-80" />
    </div>
  );
}
