import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { SIGMA_SITE_AUTHORS } from "@/content/seo";
import { getNotFoundCopy } from "@/content/global/systemMessages";
import { langFromUnknown } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = langFromUnknown(cookieStore.get("sigma-lang")?.value) ?? "EN";
  const copy = getNotFoundCopy(lang);
  return {
    ...SIGMA_SITE_AUTHORS,
    title: copy.title,
    description: copy.description,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = langFromUnknown(cookieStore.get("sigma-lang")?.value) ?? "EN";
  const copy = getNotFoundCopy(lang);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-erie px-6 text-center font-body text-cadet">
      <p className="font-display text-xs uppercase tracking-[0.28em] text-cadet/80">
        {copy.wordmark}
      </p>
      <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed">
        {copy.body}
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center justify-center rounded-full border border-white/15 bg-[#07090f]/80 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-persian/40 hover:bg-[#1c39bb]/20"
      >
        {copy.backHome}
      </Link>
    </div>
  );
}
