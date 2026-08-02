import type { LabeledItem } from "@/content/services/landing/cryptoExchangeLandingModel";
import { ServiceSectionShell } from "@/components/services/landing/ServiceSectionShell";
import { ServiceSectionHeading } from "@/components/services/landing/ServiceSectionHeading";

type ServiceRegionalMapProps = {
  title: string;
  intro: string;
  regions: LabeledItem[];
  outro: string | null;
};

/**
 * Magic UI Dotted Map — decorative framework only.
 * Markers and copy use exact region labels from the imported document.
 * Turkey remains because it is present in the client document copy.
 */
export function ServiceRegionalMap({ title, intro, regions, outro }: ServiceRegionalMapProps) {
  return (
    <ServiceSectionShell id="regional" atmosphere="violet">
      <ServiceSectionHeading id="regional" title={title} intro={intro} />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div className="relative hidden overflow-hidden rounded-2xl border border-white/[0.09] bg-[#05070c]/80 p-6 md:block lg:p-8">
          <DottedMapArt regions={regions.map((r) => r.title)} />
        </div>

        <ul className="m-0 list-none space-y-4 p-0">
          {regions.map((region, i) => (
            <li
              key={region.full}
              className="rounded-2xl border border-white/[0.09] bg-[#07090f]/65 p-5 sm:p-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">{region.title}</h3>
              </div>
              {region.body ? (
                <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{region.body}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {outro ? (
        <p className="mt-10 max-w-[48rem] text-[15px] leading-relaxed text-[#cfd6de] md:text-base">{outro}</p>
      ) : null}
    </ServiceSectionShell>
  );
}

/** Approximate marker positions — decorative only, not geolocation claims. */
const MARKERS: Record<string, { x: number; y: number }> = {
  "MENA & GCC": { x: 58, y: 42 },
  Turkey: { x: 56, y: 34 },
  "Persian-speaking markets": { x: 62, y: 40 },
  Europe: { x: 50, y: 28 },
  "LATAM & CIS": { x: 28, y: 55 },
};

function DottedMapArt({ regions }: { regions: string[] }) {
  const dots: Array<{ cx: number; cy: number }> = [];
  for (let y = 8; y <= 92; y += 4.5) {
    for (let x = 6; x <= 94; x += 4.5) {
      // Soft oval “world” mask
      const nx = (x - 50) / 46;
      const ny = (y - 50) / 38;
      if (nx * nx + ny * ny * 1.15 > 1) continue;
      dots.push({ cx: x, cy: y });
    }
  }

  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full" role="img" aria-label="Decorative regional coverage map">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="0.55" fill="rgba(189,224,254,0.22)" />
      ))}
      {regions.map((name) => {
        const m = MARKERS[name] ?? { x: 50, y: 50 };
        return (
          <g key={name}>
            <circle cx={m.x} cy={m.y} r="1.8" fill="#1D89BB" opacity="0.95" />
            <circle cx={m.x} cy={m.y} r="4" fill="none" stroke="#4F1DBB" strokeWidth="0.4" opacity="0.7" />
            <text
              x={m.x}
              y={m.y - 5}
              textAnchor="middle"
              className="fill-[#e8eef5]"
              style={{ fontSize: "2.4px", fontFamily: "inherit" }}
            >
              {name}
            </text>
          </g>
        );
      })}
      {/* Connection paths between consecutive document regions */}
      {regions.slice(0, -1).map((name, i) => {
        const a = MARKERS[name];
        const b = MARKERS[regions[i + 1]!];
        if (!a || !b) return null;
        return (
          <path
            key={`${name}-link`}
            d={`M${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 8} ${b.x} ${b.y}`}
            fill="none"
            stroke="rgba(29,137,187,0.35)"
            strokeWidth="0.35"
            strokeDasharray="1.2 1.2"
          />
        );
      })}
    </svg>
  );
}
