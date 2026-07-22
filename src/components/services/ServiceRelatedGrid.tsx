import Link from "next/link";
import type { ServiceDefinition } from "@/content/services";

type ServiceRelatedGridProps = {
  services: ServiceDefinition[];
};

export function ServiceRelatedGrid({ services }: ServiceRelatedGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            href={service.href}
            className="block h-full rounded-2xl border border-white/[0.08] bg-[#07090f]/55 p-5 transition-[border-color,background-color,box-shadow] hover:border-[#1c39bb]/40 hover:bg-[#1c39bb]/10 hover:shadow-[0_12px_40px_rgba(28,57,187,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55 sm:p-6"
          >
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-[#1c39bb]">
              {service.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-base font-semibold text-white">
              {service.shortLabel}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#b6bcc4]">{service.lead}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
