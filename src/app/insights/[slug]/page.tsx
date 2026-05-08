import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getInsightBySlug,
  getInsightSlugs,
  getRelatedPosts,
} from "@/content/insights";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { InsightHero } from "@/components/insights/InsightHero";
import { RelatedPosts } from "@/components/insights/RelatedPosts";
import {
  ArticleStructuredData,
  BreadcrumbInsightStructuredData,
} from "@/components/seo/ArticleStructuredData";
import { SEO_PAGES, SIGMA_SITE_AUTHORS, getCanonicalUrl } from "@/content/seo";
import { siteTranslations } from "@/content/siteTranslations";
import type { LangCode } from "@/content/types";
import { buildLanguageAlternates, langFromUnknown } from "@/lib/i18n";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

export async function generateStaticParams() {
  return getInsightSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = (langFromUnknown(langParam) ?? "EN") as LangCode;
  const post = getInsightBySlug(slug);
  if (!post) return { title: siteTranslations.EN.insights.pageTitle };
  const canonicalAbsolute = getCanonicalUrl(`/insights/${slug}`);
  const og = post.ogImage ?? post.coverImage;
  return {
    ...SIGMA_SITE_AUTHORS,
    title: { absolute: post.seoTitle },
    description: post.seoDescription,
    keywords: [...SEO_PAGES.insights.keywords, post.category],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: `/insights/${slug}`,
      languages: buildLanguageAlternates(`/insights/${slug}`),
    },
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: canonicalAbsolute,
      locale: lang === "AR" ? "ar_SA" : "en_US",
      siteName: "Sigma",
      images: [{ url: og, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      images: [og],
    },
  };
}

export default async function InsightArticlePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { lang: langParam } = await searchParams;
  const lang = (langFromUnknown(langParam) ?? "EN") as LangCode;
  const post = getInsightBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  return (
    <>
      <ArticleStructuredData post={post} lang={lang} />
      <BreadcrumbInsightStructuredData post={post} lang={lang} />
      <article>
      <InsightHero post={post} />

      <div className="mx-auto max-w-5xl px-3 pt-8 sm:px-6 sm:pt-10 lg:px-10">
        <div className="relative aspect-[16/10] max-h-[min(48vh,380px)] w-full min-w-0 overflow-hidden rounded-lg border border-white/[0.07] bg-[#151a22] sm:aspect-[2/1] sm:max-h-[min(56vh,520px)] sm:rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c12]/80 via-transparent to-transparent" />
        </div>
      </div>

      <div className="pb-8 pt-10 sm:pb-12 sm:pt-16">
        <ArticleBody content={post.content} />
      </div>

      <RelatedPosts posts={related} />
    </article>
    </>
  );
}
