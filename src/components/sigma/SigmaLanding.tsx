import {
  SigmaLandingClient,
  type HomeInsightCard,
  type InsightsPayload,
} from "@/components/sigma/SigmaInsightsSection";

/** Primary live WordPress source for homepage Insights cards. */
const BLOG_POSTS_API =
  "https://blog.sigmaa.pro/wp-json/wp/v2/posts?_embed=1&per_page=6";

/** Next.js Data Cache revalidation — refresh blog posts roughly every 30 minutes. */
const REVALIDATE_SECONDS = 1800;

const PREFERRED_CATEGORIES = [
  "Crypto Events & Communities",
  "NFT Market & Web3 Trends",
  "Crypto PR & Media",
  "Crypto Audits & Security",
  "Crypto Beginner Guides",
  "Token Listing & Exchange Growth",
  "Cryptocurrency Launch Guides",
] as const;

type WpRendered = { rendered?: string };
type WpTerm = { taxonomy?: string; name?: string };
type WpMedia = {
  source_url?: string;
  media_details?: {
    sizes?: Record<string, { source_url?: string } | undefined>;
  };
};
type WpPost = {
  id: number;
  slug?: string;
  date?: string;
  link?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[][];
  };
};

function stripHtml(value: string | undefined | null): string {
  if (!value) return "";
  const withoutTags = value.replace(/<[^>]*>/g, " ");
  const decoded = withoutTags
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
  return decoded.replace(/\s+/g, " ").trim();
}

function truncateText(value: string, max = 170): string {
  if (value.length <= max) return value;
  const cut = value
    .slice(0, max)
    .replace(/\s+\S*$/, "")
    .replace(/[,.;:\-–—]+$/, "");
  return `${cut}…`;
}

function preferBlogHost(url: string | undefined | null): string | null {
  if (!url) return null;
  return url.replace(
    "https://demo.rivaxstudio.com/syron/main",
    "https://blog.sigmaa.pro",
  );
}

function formatPostDate(iso: string | undefined): { label: string; dateTime: string } {
  if (!iso) return { label: "", dateTime: "" };
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return { label: iso.slice(0, 10), dateTime: iso.slice(0, 10) };
  }
  return {
    label: `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}, ${d.getFullYear()}`,
    dateTime: iso.slice(0, 10),
  };
}

function pickCategory(post: WpPost): string {
  const names: string[] = [];
  for (const group of post._embedded?.["wp:term"] ?? []) {
    for (const term of group) {
      if (term.taxonomy !== "category" || !term.name) continue;
      const name = stripHtml(term.name);
      if (name && !names.includes(name)) names.push(name);
    }
  }
  const preferred = PREFERRED_CATEGORIES.find((c) => names.includes(c));
  return (preferred ?? names[0] ?? "Insights").toUpperCase();
}

function pickFeaturedImage(post: WpPost): string | null {
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return null;
  const sizes = media.media_details?.sizes ?? {};
  for (const key of ["large", "medium_large", "medium", "full"] as const) {
    const sized = preferBlogHost(sizes[key]?.source_url);
    if (sized) return sized;
  }
  return preferBlogHost(media.source_url);
}

function mapWpPostToCard(post: WpPost): HomeInsightCard | null {
  const title = stripHtml(post.title?.rendered);
  const href = (post.link ?? "").trim();
  if (!title || !href.startsWith("http")) return null;

  const { label, dateTime } = formatPostDate(post.date);
  return {
    id: post.slug || String(post.id),
    category: pickCategory(post),
    date: label,
    dateTime,
    title,
    summary: truncateText(stripHtml(post.excerpt?.rendered)),
    href,
    imageSrc: pickFeaturedImage(post),
  };
}

/**
 * Live WP REST fetch — primary Insights data source.
 * Cached by Next.js for REVALIDATE_SECONDS, then revalidated.
 */
async function fetchHomeInsights(): Promise<InsightsPayload> {
  try {
    const res = await fetch(BLOG_POSTS_API, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      return { cards: [], error: true };
    }
    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) {
      return { cards: [], error: true };
    }
    const cards = data
      .map((item) => mapWpPostToCard(item as WpPost))
      .filter((card): card is HomeInsightCard => Boolean(card));
    if (cards.length === 0) {
      return { cards: [], error: true };
    }
    return { cards, error: false };
  } catch {
    // Safe fallback — homepage must not crash if WordPress is down.
    return { cards: [], error: true };
  }
}

export default async function SigmaLanding() {
  const insights = await fetchHomeInsights();
  return <SigmaLandingClient insights={insights} />;
}
