import type { ServiceV2Visual } from "@/content/services/v2/types";
import { v2Type } from "./ServiceV2Primitives";

type ServiceV2VisualInterludeProps = {
  id: string;
  visual: ServiceV2Visual;
};

export function ServiceV2VisualInterlude({ id, visual }: ServiceV2VisualInterludeProps) {
  return (
    <section id={id} className="relative z-[1] scroll-mt-28" aria-label={visual.caption}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.16] to-transparent"
        aria-hidden="true"
      />
      <figure className="relative mx-auto max-w-[1720px] px-4 py-12 sm:px-5 md:px-6 md:py-16 lg:px-10">
        <p className={`mb-4 ${v2Type.meta}`}>{visual.label}</p>
        <div className="relative overflow-hidden border-y border-white/15">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(52,75,252,0.16),transparent_70%)]"
            aria-hidden="true"
          />
          <SystemMap />
        </div>
        <figcaption className={`mt-4 ${v2Type.meta} text-[#c5d4ee]`}>{visual.caption}</figcaption>
      </figure>
    </section>
  );
}

function SystemMap() {
  return (
    <svg
      viewBox="0 0 1200 320"
      className="relative z-10 h-auto w-full max-h-[220px] sm:max-h-[280px] md:max-h-[320px]"
      role="img"
      aria-label="Pipeline stages from fit to activation"
    >
      <title>Commercial pipeline system</title>
      <line x1="80" y1="140" x2="1120" y2="140" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {[
        { x: 140, label: "Fit" },
        { x: 380, label: "Route" },
        { x: 620, label: "Negotiate" },
        { x: 860, label: "Onboard" },
        { x: 1060, label: "Activate" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy="140" r="6" fill="#05070e" stroke="#88a8ff" strokeWidth="1.4" />
          <text
            x={node.x}
            y="178"
            textAnchor="middle"
            fill="#e8eef8"
            fontSize="13"
            letterSpacing="0.14em"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
          >
            {node.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
