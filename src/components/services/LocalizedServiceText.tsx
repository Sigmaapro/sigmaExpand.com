"use client";

import type { ElementType, HTMLAttributes } from "react";
import { getFinalServiceTitle, serviceUiByLang, type ServiceUiCopy } from "@/content/services/localizedServiceUi";
import type { FinalServiceSlug } from "@/content/services/finalServices";
import { useLanguage } from "@/context/LanguageContext";

type ServiceUiKey = keyof ServiceUiCopy;

type Props<T extends ElementType> = {
  as?: T;
  kind: ServiceUiKey;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function LocalizedServiceText<T extends ElementType = "span">({
  as,
  kind,
  ...props
}: Props<T>) {
  const { language } = useLanguage();
  const Component = (as ?? "span") as ElementType;
  return <Component {...props}>{serviceUiByLang[language][kind]}</Component>;
}

export function LocalizedFinalServiceTitle({
  slug,
  as,
  ...props
}: {
  slug: FinalServiceSlug;
  as?: ElementType;
} & Omit<HTMLAttributes<HTMLElement>, "children">) {
  const { language } = useLanguage();
  const Component = (as ?? "span") as ElementType;
  return <Component {...props}>{getFinalServiceTitle(slug, language)}</Component>;
}
