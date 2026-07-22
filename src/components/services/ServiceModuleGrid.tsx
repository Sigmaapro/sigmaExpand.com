import type { ServiceIconName, ServiceModuleItem } from "@/content/services";
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

type ServiceModuleGridProps = {
  items: ServiceModuleItem[];
};

export function ServiceModuleGrid({ items }: ServiceModuleGridProps) {
  return (
    <ul className="grid gap-4 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon ? ICON_MAP[item.icon] : Layers;
        return (
          <li
            key={item.id}
            className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 sm:p-6"
          >
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-[#1c39bb]/30 bg-[#1c39bb]/12 text-[#bde0fe]">
              <Icon className="size-4" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{item.description}</p>
            {item.bullets && item.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-[#b6bcc4]">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
