"use client";

import Link from "next/link";
import { serviceUiByLang } from "@/content/services/localizedServiceUi";
import { useLanguage } from "@/context/LanguageContext";

type ServiceBreadcrumbsProps = {
  currentLabel: string;
  servicesHref?: string;
  homeHref?: string;
};

export function ServiceBreadcrumbs({
  currentLabel,
  servicesHref = "/services",
  homeHref = "/",
}: ServiceBreadcrumbsProps) {
  const { language } = useLanguage();
  const ui = serviceUiByLang[language];

  return (
    <nav aria-label={ui.services} className="text-sm text-[#9aa5b3]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link
            href={homeHref}
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
          >
            {ui.home}
          </Link>
        </li>
        <li aria-hidden className="text-[#5c6673]">
          /
        </li>
        <li>
          <Link
            href={servicesHref}
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
          >
            {ui.services}
          </Link>
        </li>
        <li aria-hidden className="text-[#5c6673]">
          /
        </li>
        <li>
          <span className="font-medium text-[#d8dde3]" aria-current="page">
            {currentLabel}
          </span>
        </li>
      </ol>
    </nav>
  );
}
