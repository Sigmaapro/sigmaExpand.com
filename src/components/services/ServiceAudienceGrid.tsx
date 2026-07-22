import type { ServiceAudienceItem, ServiceIconName } from "@/content/services";
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

type ServiceAudienceGridProps = {
  items: ServiceAudienceItem[];
};

export function ServiceAudienceGrid({ items }: ServiceAudienceGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon ? ICON_MAP[item.icon] : Activity;
        return (
          <li
            key={item.id}
            className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-6"
          >
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl border border-[#1c39bb]/30 bg-[#1c39bb]/12 text-[#bde0fe]">
              <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
            </div>
            <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{item.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
