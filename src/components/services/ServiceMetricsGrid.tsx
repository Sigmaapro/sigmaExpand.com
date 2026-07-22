import type { ServiceMetricItem } from "@/content/services";

type ServiceMetricsGridProps = {
  items: ServiceMetricItem[];
};

export function ServiceMetricsGrid({ items }: ServiceMetricsGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 px-5 py-6 text-center sm:px-6"
        >
          <p className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {item.value}
          </p>
          <p className="mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-[#93C5FD]">
            {item.label}
          </p>
          {item.detail ? (
            <p className="mt-3 text-sm leading-relaxed text-[#b6bcc4]">{item.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
