"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
import { ElectricBorder } from "@/components/react-bits/ElectricBorder";
import "./ServiceCarousel.css";

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

type ServiceCarouselProps = {
  services: PrimaryServiceCard[];
  language: LangCode;
  actionLabel: string;
};

export function ServiceCarousel({ services, language, actionLabel }: ServiceCarouselProps) {
  const angle = 360 / Math.max(services.length, 1);
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (reduceMotion || paused || services.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % services.length);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [paused, reduceMotion, services.length]);

  const moveCarousel = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + services.length) % services.length;
    setActiveIndex(nextIndex);

    if (window.matchMedia("(max-width: 767px)").matches) {
      cardRefs.current[nextIndex]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  return (
    <div
      className="service-carousel"
      aria-label="Primary service routes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="service-carousel__viewport" ref={viewportRef}>
        <div
          className="service-carousel__ring"
          style={{
            "--service-angle": `${angle}deg`,
            "--service-rotation": `${activeIndex * -angle}deg`,
          } as CSSProperties}
        >
          {services.map((service, index) => {
            const Icon = SERVICE_ICON_MAP[service.icon];

            return (
              <div
                key={service.href}
                className="service-carousel__card-shell"
                style={{ "--service-index": index } as CSSProperties}
              >
                <ElectricBorder
                  color="#1c39bb"
                  speed={0.55}
                  chaos={0.035}
                  borderRadius={20}
                  borderOffset={14}
                  displacement={5}
                  className="service-carousel__card"
                >
                  <Link
                    ref={(element) => {
                      cardRefs.current[index] = element;
                    }}
                    href={service.href}
                    className={`service-carousel__card-content group ${localeBody(language)}`}
                  >
                    <span className="service-carousel__card-glow" aria-hidden />
                    <span className="service-carousel__card-top">
                      <span className="service-carousel__icon">
                        <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                      </span>
                      <span className="service-carousel__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span className="service-carousel__copy">
                      <span className="service-carousel__title">{service.title}</span>
                      <span className="service-carousel__description">{service.description}</span>
                    </span>

                    <span className="service-carousel__footer">
                      <span>{actionLabel}</span>
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.7}
                        aria-hidden
                      />
                    </span>
                  </Link>
                </ElectricBorder>
              </div>
            );
          })}
        </div>
      </div>
      <div className="service-carousel__controls" aria-label="Carousel controls">
        <button
          type="button"
          className="service-carousel__control"
          onClick={() => moveCarousel(-1)}
          aria-label="Previous service"
        >
          <ArrowUpRight className="size-5 rotate-[225deg]" strokeWidth={1.7} aria-hidden />
        </button>
        <button
          type="button"
          className="service-carousel__control"
          onClick={() => moveCarousel(1)}
          aria-label="Next service"
        >
          <ArrowUpRight className="size-5 rotate-45" strokeWidth={1.7} aria-hidden />
        </button>
      </div>
      <p className="service-carousel__hint" aria-hidden>
        Hover or use the arrows to explore
      </p>
    </div>
  );
}
