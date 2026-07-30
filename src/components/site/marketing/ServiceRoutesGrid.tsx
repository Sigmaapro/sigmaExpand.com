"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Network,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { PrimaryServiceCard } from "@/content/global/marketing/servicesContent";
import type { ServiceIconName } from "@/content/services";
import type { LangCode } from "@/content/types";
import { localeBody } from "@/lib/localeTypography";
import { BackgroundGradient } from "@/components/aceternity/BackgroundGradient";
import "./ServiceRoutesGrid.css";

const SERVICE_ICON_MAP: Record<ServiceIconName, LucideIcon> = {
  activity: Activity,
  shield: Shield,
  cpu: Cpu,
  code2: Code2,
  network: Network,
  globe: Globe2,
  sparkles: Sparkles,
  layers: Layers,
};

type ServiceRoutesGridProps = {
  services: PrimaryServiceCard[];
  language: LangCode;
  actionLabel: string;
};

export function ServiceRoutesGrid({ services, language, actionLabel }: ServiceRoutesGridProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <ul className="service-routes-grid" aria-label="Primary service routes">
      {services.map((service, index) => {
        const Icon = SERVICE_ICON_MAP[service.icon];

        return (
          <li key={service.href} className="service-routes-grid__item">
            <BackgroundGradient
              animate={!reduceMotion}
              containerClassName="service-routes-grid__card"
            >
              <Link
                href={service.href}
                className={`service-routes-grid__card-content group ${localeBody(language)}`}
              >
                <span className="service-routes-grid__card-top">
                  <span className="service-routes-grid__icon">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="service-routes-grid__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <span className="service-routes-grid__copy">
                  <span className="service-routes-grid__title">{service.title}</span>
                  {service.description ? (
                    <span className="service-routes-grid__description">{service.description}</span>
                  ) : null}
                </span>

                <span className="service-routes-grid__footer">
                  <span>{actionLabel}</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                    aria-hidden
                  />
                </span>
              </Link>
            </BackgroundGradient>
          </li>
        );
      })}
    </ul>
  );
}
