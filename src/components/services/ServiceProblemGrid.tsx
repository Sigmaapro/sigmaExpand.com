import type { ServiceProblemItem } from "@/content/services";

type ServiceProblemGridProps = {
  items: ServiceProblemItem[];
};

export function ServiceProblemGrid({ items }: ServiceProblemGridProps) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 sm:p-6"
        >
          <h3 className="font-display text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
