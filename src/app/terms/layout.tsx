import type { Metadata } from "next";
import type { ReactNode } from "react";
import { termsPageMetaByLang } from "@/content/global/termsPage";

const m = termsPageMetaByLang.EN;

export const metadata: Metadata = {
  title: m.title,
  description: m.description,
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
