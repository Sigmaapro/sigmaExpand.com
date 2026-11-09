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

const BLOG_SITEMAP_URL = "https://blog.sigmaa.pro/post-sitemap.xml";

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function latestPostUrlsFromSitemap(xml: string): string[] {
  const blocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
  const rows: { lastmod: string; loc: string }[] = [];
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? "";
    if (!loc?.startsWith("https://blog.sigmaa.pro/")) continue;
    const path = loc.slice("https://blog.sigmaa.pro/".length).replace(/\/$/, "");
    if (!path || path.includes("/")) continue;
    rows.push({ lastmod, loc: loc.endsWith("/") ? loc : `${loc}/` });
  }
  rows.sort((a, b) => (a.lastmod < b.lastmod ? 1 : a.lastmod > b.lastmod ? -1 : 0));
  return rows.slice(0, 6).map((row) => row.loc);
}

function metaContent(html: string, property: string): string {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]*)"|<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${property}"`,
    "i",
  );
  const match = html.match(pattern);
  return decodeEntities(match?.[1] || match?.[2] || "");
}

function cardFromPublicPost(url: string, html: string): HomeInsightCard | null {
  const scripts = html.match(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g) ?? [];
  let headline = "";
  let description = "";
  let section = "";
  let published = "";
  let image: string | null = null;

  for (const script of scripts) {
    const raw = script.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    let data: unknown;
    try {
      data = JSON.parse(raw);
    } catch {
      continue;
    }
    const record = data as { "@graph"?: unknown };
    const nodes = Array.isArray(record["@graph"]) ? record["@graph"] : [data];
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const entry = node as Record<string, unknown>;
      const type = entry["@type"];
      const types = Array.isArray(type) ? type.map(String) : [String(type ?? "")];
      if (types.includes("BlogPosting") || types.includes("Article")) {
        headline = decodeEntities(String(entry.headline ?? ""));
        description = decodeEntities(String(entry.description ?? ""));
        section = decodeEntities(String(entry.articleSection ?? ""));
        const img = entry.image;
        if (typeof img === "string") image = img;
        else if (img && typeof img === "object" && "url" in img && typeof img.url === "string") {
          image = img.url;
        }
      }
      if (!published && typeof entry.datePublished === "string") published = entry.datePublished;
    }
  }

  if (!headline) headline = metaContent(html, "og:title");
  if (!description) description = metaContent(html, "og:description");
  if (!image) image = metaContent(html, "og:image") || null;
  if (!headline) return null;

  const { label, dateTime } = formatPostDate(published);
  const slug = url.replace(/\/$/, "").split("/").pop() || url;
  return {
    id: slug,
    category: (section || "Insights").toUpperCase(),
    date: label,
    dateTime,
    title: headline,
    summary: truncateText(stripHtml(description)),
    href: url,
    imageSrc: preferBlogHost(image),
  };
}

/** Public pages stay readable when the WordPress REST API requires a login. */
async function fetchPublicBlogCards(): Promise<HomeInsightCard[]> {
  const sitemap = await fetch(BLOG_SITEMAP_URL, {
    headers: { Accept: "application/xml,text/xml" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!sitemap.ok) return [];
  const urls = latestPostUrlsFromSitemap(await sitemap.text());
  const cards = await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, {
          headers: { Accept: "text/html" },
          next: { revalidate: REVALIDATE_SECONDS },
        });
        if (!res.ok) return null;
        return cardFromPublicPost(url, await res.text());
      } catch {
        return null;
      }
    }),
  );
  return cards.filter((card): card is HomeInsightCard => Boolean(card));
}

/**
 * Live WP REST fetch — primary Insights data source.
 * Cached by Next.js for REVALIDATE_SECONDS, then revalidated.
 * If REST is locked, the public sitemap and post pages supply the same cards.
 */
async function fetchHomeInsights(): Promise<InsightsPayload> {
  try {
    const res = await fetch(BLOG_POSTS_API, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.ok) {
      const data = (await res.json()) as unknown;
      if (Array.isArray(data)) {
        const cards = data
          .map((item) => mapWpPostToCard(item as WpPost))
          .filter((card): card is HomeInsightCard => Boolean(card));
        if (cards.length > 0) return { cards, error: false };
      }
    }
  } catch {
    // REST can be closed; the public pages below are the backup.
  }

  try {
    const cards = await fetchPublicBlogCards();
    if (cards.length > 0) return { cards, error: false };
  } catch {
    // Homepage must not crash if WordPress is down.
  }
  return { cards: [], error: true };
}

export default async function SigmaLanding() {
  const insights = await fetchHomeInsights();
  return <SigmaLandingClient insights={insights} />;
}
