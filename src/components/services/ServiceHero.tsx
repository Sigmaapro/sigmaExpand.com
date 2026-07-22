import type { ServiceDefinition, ServiceIconName } from "@/content/services";
import {
  Activity,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Network,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<ServiceIconName, LucideIcon> = {
  activity: Activity,
  shield: Shield,
  cpu: Cpu,
  code2: Code2,
  network: Network,
  globe: Globe2,
  sparkles: Sparkles,
  layers: Layers,
};

type ServiceHeroProps = {
  service: ServiceDefinition;
};

export function ServiceHero({ service }: ServiceHeroProps) {
  const Icon = ICON_MAP[service.icon] ?? Activity;
  const density =
    service.visual.heroDensity === "compact"
      ? "py-8 md:py-10"
      : service.visual.heroDensity === "tall"
        ? "py-14 md:py-20"
        : "py-10 md:py-14";

  return (
    <header
      className={`relative overflow-hidden rounded-[1.75rem] border border-[rgba(147,197,253,0.14)] bg-[linear-gradient(155deg,rgba(7,11,21,0.55),rgba(12,22,42,0.48))] px-6 text-center shadow-[0_24px_64px_rgba(2,8,22,0.4),inset_0_1px_0_rgba(210,228,255,0.08)] backdrop-blur-xl sm:px-10 ${density}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(28,57,187,0.18),transparent_65%)]"
        aria-hidden
      />
      {service.visual.showGrid ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(125,170,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,170,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]"
          aria-hidden
        />
      ) : null}

      <div className="relative mx-auto max-w-3xl">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-[#1c39bb]/35 bg-[#1c39bb]/15 text-[#bde0fe] sm:size-14">
          <Icon className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden />
        </div>
        <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD]">
          {service.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl lg:text-[2.75rem]">
          {service.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#cfd6de] md:text-base">
          {service.lead}
        </p>
      </div>
    </header>
  );
}
