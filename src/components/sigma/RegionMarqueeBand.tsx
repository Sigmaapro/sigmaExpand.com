"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Direction = "rtl" | "ltr";

type Props = {
  direction: Direction;
  ariaHidden?: boolean;
  /** Repeated track content (rendered twice for seamless loop). */
  children: ReactNode;
  className?: string;
  durationSec?: number;
  /** When false, no top/bottom border lines (floating location ticker). */
  framed?: boolean;
  /** Tighter vertical padding for stacked location rows. */
  compact?: boolean;
};

/**
 * Lightweight glass marquee. Pause on hover. Honors prefers-reduced-motion.
 */
export function RegionMarqueeBand({
  direction,
  ariaHidden = true,
  children,
  className = "",
  durationSec = 42,
  framed = true,
  compact = false,
}: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const animName =
    direction === "rtl" ? "sigma-region-marquee-rtl" : "sigma-region-marquee-ltr";

  return (
    <div
      className={`group/marquee relative w-full max-w-[100vw] overflow-hidden backdrop-blur-md ${
        framed
          ? "border-y border-white/[0.03] bg-transparent"
          : "border-0 bg-transparent"
      } ${className}`}
      aria-hidden={ariaHidden || undefined}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#06122f]/65 via-[#06122f]/30 to-transparent sm:w-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#06122f]/65 via-[#06122f]/30 to-transparent sm:w-16"
        aria-hidden
      />

      <div
        className={`flex w-max items-center gap-3 sm:gap-3.5 ${
          compact ? "py-2 sm:py-2.5" : "py-3.5 sm:py-4"
        }`}
      >
        <div
          className="sigma-region-marquee-track flex w-max items-center gap-3 sm:gap-3.5"
          style={
            reduceMotion
              ? undefined
              : ({
                  animation: `${animName} ${durationSec}s linear infinite`,
                } as CSSProperties)
          }
        >
          <div className="flex shrink-0 items-center gap-3 sm:gap-3.5">{children}</div>
          <div className="flex shrink-0 items-center gap-3 sm:gap-3.5" aria-hidden>
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sigma-region-marquee-rtl {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes sigma-region-marquee-ltr {
          from { transform: translate3d(-50%, 0, 0); }
          to { transform: translate3d(0, 0, 0); }
        }
        .group\\/marquee:hover .sigma-region-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .sigma-region-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

type MarketTicker = {
  symbol: "BTC" | "ETH" | "USDT" | "BNB" | "SOL" | "XRP" | "USDC" | "DOGE" | "TRX" | "ADA";
  accent: string;
  accentSoft: string;
  mark: "btc" | "eth" | "usdt" | "bnb" | "sol" | "xrp" | "usdc" | "doge" | "trx" | "ada";
};

/** Approved market-atmosphere ticker list — visual symbols only, not partnerships. */
const MARKET_TICKERS: MarketTicker[] = [
  { symbol: "BTC", accent: "#e8b86d", accentSoft: "rgba(232,184,109,0.18)", mark: "btc" },
  { symbol: "ETH", accent: "#a8b8d8", accentSoft: "rgba(168,184,216,0.16)", mark: "eth" },
  { symbol: "USDT", accent: "#4db896", accentSoft: "rgba(77,184,150,0.16)", mark: "usdt" },
  { symbol: "BNB", accent: "#d4b45a", accentSoft: "rgba(212,180,90,0.16)", mark: "bnb" },
  { symbol: "SOL", accent: "#b49aef", accentSoft: "rgba(180,154,239,0.16)", mark: "sol" },
  { symbol: "XRP", accent: "#dce3ec", accentSoft: "rgba(220,227,236,0.12)", mark: "xrp" },
  { symbol: "USDC", accent: "#5b9dff", accentSoft: "rgba(91,157,255,0.16)", mark: "usdc" },
  { symbol: "DOGE", accent: "#d4b45a", accentSoft: "rgba(212,180,90,0.14)", mark: "doge" },
  { symbol: "TRX", accent: "#e07878", accentSoft: "rgba(224,120,120,0.14)", mark: "trx" },
  { symbol: "ADA", accent: "#6ea4e8", accentSoft: "rgba(110,164,232,0.16)", mark: "ada" },
];

/**
 * Compact crypto market badges (icon + ticker).
 * Atmosphere-only — no partners/clients/integrations claims.
 */
export function CryptoMarketTickerBadges() {
  return (
    <>
      {MARKET_TICKERS.map((item) => (
        <span
          key={item.symbol}
          className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.1] bg-[#0c121c]/88 px-3.5 py-2 shadow-[0_0_18px_rgba(28,57,187,0.1)] backdrop-blur-md sm:gap-3 sm:px-4 sm:py-2.5"
          style={{
            borderColor: `color-mix(in srgb, ${item.accent} 22%, rgba(255,255,255,0.08))`,
            boxShadow: `0 0 20px ${item.accentSoft}`,
          }}
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8"
            style={{
              background: item.accentSoft,
              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${item.accent} 35%, transparent)`,
            }}
            aria-hidden
          >
            <TickerCoinMark mark={item.mark} color={item.accent} />
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e8edf4] sm:text-[13px]"
            style={{ color: `color-mix(in srgb, ${item.accent} 28%, #e8edf4)` }}
          >
            {item.symbol}
          </span>
        </span>
      ))}
    </>
  );
}

function TickerCoinMark({
  mark,
  color,
}: {
  mark: MarketTicker["mark"];
  color: string;
}) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 16 16",
    "aria-hidden": true as const,
  };

  switch (mark) {
    case "btc":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.2" fill="none" stroke={color} strokeWidth="1.2" />
          <path
            d="M6.2 4.2h2.1c1.3 0 2.2.7 2.2 1.75 0 .7-.35 1.25-.95 1.5.8.25 1.25.9 1.25 1.7 0 1.2-1 2.05-2.5 2.05H6.2V4.2zm1.35 1.15v1.85h.7c.55 0 .9-.25.9-.9s-.35-.95-.9-.95h-.7zm0 3v2.1h.9c.65 0 1.05-.35 1.05-1.05S8.9 8.35 8.25 8.35h-.7z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "eth":
      return (
        <svg {...common}>
          <path d="M8 1.8 L12.2 8.1 L8 14.2 L3.8 8.1 Z" fill="none" stroke={color} strokeWidth="1.1" />
          <path d="M8 1.8 V8.1 L12.2 8.1 Z" fill={color} opacity="0.35" />
          <path d="M8 8.1 V14.2 L3.8 8.1 Z" fill={color} opacity="0.55" />
        </svg>
      );
    case "usdt":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.2" fill="none" stroke={color} strokeWidth="1.2" />
          <path d="M5 5.4h6M8 5.4v5.6M5.8 8.6h4.4" stroke={color} strokeWidth="1.15" strokeLinecap="round" />
        </svg>
      );
    case "bnb":
      return (
        <svg {...common}>
          <path
            d="M8 2.2 L10.2 4.4 L8 6.6 L5.8 4.4 Z M3.4 6.8 L5.6 9 L3.4 11.2 L1.2 9 Z M12.6 6.8 L14.8 9 L12.6 11.2 L10.4 9 Z M8 9.4 L10.2 11.6 L8 13.8 L5.8 11.6 Z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "sol":
      return (
        <svg {...common}>
          <path
            d="M4.2 5.2h7.1l-1.3 1.8H2.9zM4.2 9h7.1l-1.3 1.8H2.9zM11.8 7.1H4.7l1.3-1.8H13z"
            fill={color}
            opacity="0.85"
          />
        </svg>
      );
    case "xrp":
      return (
        <svg {...common}>
          <path
            d="M4.2 4.2 L8 7.6 L11.8 4.2 M4.2 11.8 L8 8.4 L11.8 11.8"
            fill="none"
            stroke={color}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "usdc":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.2" fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx="8" cy="8" r="2.4" fill="none" stroke={color} strokeWidth="1.1" />
          <path d="M8 4.6v1.4M8 10v1.4" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      );
    case "doge":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6.2" fill="none" stroke={color} strokeWidth="1.2" />
          <path
            d="M6 5.2h2.4c1.5 0 2.6 1.1 2.6 2.8S9.9 10.8 8.4 10.8H6V5.2zm1.35 1.2v3.2h1c.8 0 1.3-.55 1.3-1.6s-.5-1.6-1.3-1.6h-1z"
            fill={color}
            opacity="0.9"
          />
        </svg>
      );
    case "trx":
      return (
        <svg {...common}>
          <path
            d="M3.4 4.4h9.2L8 13.2 3.4 4.4zm2.2 1.3 2.4 5.1 2.4-5.1H5.6z"
            fill={color}
            opacity="0.88"
          />
        </svg>
      );
    case "ada":
      return (
        <svg {...common}>
          <circle cx="8" cy="4.2" r="1.15" fill={color} />
          <circle cx="8" cy="11.8" r="1.15" fill={color} />
          <circle cx="4.2" cy="8" r="1.15" fill={color} />
          <circle cx="11.8" cy="8" r="1.15" fill={color} />
          <circle cx="5.5" cy="5.5" r="0.85" fill={color} opacity="0.7" />
          <circle cx="10.5" cy="5.5" r="0.85" fill={color} opacity="0.7" />
          <circle cx="5.5" cy="10.5" r="0.85" fill={color} opacity="0.7" />
          <circle cx="10.5" cy="10.5" r="0.85" fill={color} opacity="0.7" />
        </svg>
      );
  }
}

type CountryPillsProps = {
  countries: string[];
};

/** Place token → ISO flag code (circle-flags). Bali uses Indonesia. */
const PLACE_FLAG_CODE: Record<string, string> = {
  Oman: "om",
  Germany: "de",
  Spain: "es",
  Italy: "it",
  Poland: "pl",
  Turkey: "tr",
  Bali: "id",
  UAE: "ae",
  KSA: "sa",
  Qatar: "qa",
  Kuwait: "kw",
  Bahrain: "bh",
};

function CircleFlag({ code }: { code: string }) {
  return (
    <span
      className="relative inline-flex size-[1.125rem] shrink-0 overflow-hidden rounded-full ring-1 ring-[rgba(147,197,253,0.28)] shadow-[0_0_10px_rgba(28,57,187,0.18)] sm:size-5"
      aria-hidden
    >
      {/* Local circle-flag SVGs — decorative beside visible country name. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/flags/circle/${code}.svg`}
        alt=""
        width={18}
        height={18}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}

/** Minimal location ticker items — circular flag + name, no pill boxes. */
export function RegionCountryPills({ countries }: CountryPillsProps) {
  if (countries.length === 0) return null;
  return (
    <>
      {countries.map((name) => {
        const flagCode = PLACE_FLAG_CODE[name];
        return (
          <span
            key={name}
            className="inline-flex shrink-0 items-center gap-2 px-2.5 sm:gap-2.5 sm:px-3.5"
          >
            {flagCode ? <CircleFlag code={flagCode} /> : null}
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#e2e8f0] sm:text-[14px]">
              {name}
            </span>
          </span>
        );
      })}
    </>
  );
}

/** Offset order so twin marquees do not mirror each other. */
export function offsetPlaceTokens(countries: string[], shift = 5): string[] {
  if (countries.length === 0) return countries;
  const n = shift % countries.length;
  return [...countries.slice(n), ...countries.slice(0, n)];
}

/**
 * Country / place proper nouns that already appear in approved EN cryptoAgency copy.
 * Shown only when the token is present in the active locale's aggregated section text.
 */
export const APPROVED_MARKET_PLACE_TOKENS = [
  "UAE",
  "KSA",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Germany",
  "Spain",
  "Italy",
  "Poland",
  "Turkey",
  "Bali",
] as const;

/** Extract approved place tokens that appear as whole words in source text. */
export function extractApprovedPlaceTokens(sourceText: string): string[] {
  const found: string[] = [];
  for (const token of APPROVED_MARKET_PLACE_TOKENS) {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?:^|[^A-Za-z0-9])${escaped}(?=[^A-Za-z0-9]|$)`);
    if (re.test(sourceText)) found.push(token);
  }
  return found;
}
