import type { InternalFeedItem } from "@/lib/internal/types";

/**
 * Isolated demo feed for the internal SIGMA home.
 * Replace with a CMS/API later — do not import this from public website pages.
 */
export const INTERNAL_FEED_DEMO: InternalFeedItem[] = [
  {
    id: "update-internal-space",
    type: "update",
    title: "Internal team space is open",
    excerpt:
      "Profile, SIGMA, and Messages now live here. Messages is still coming. Treat this as a private room, not a public page.",
    date: "2026-08-30",
    author: "Sigma",
    priority: "high",
  },
  {
    id: "event-weekly-strategy",
    type: "event",
    title: "Weekly strategy session",
    excerpt:
      "Priorities for exchange partnerships, regional coverage, and what actually ships this week.",
    date: "2026-09-04",
    whenLabel: "Thursday · 15:00 GST",
    location: "Dubai · video",
    priority: "high",
  },
  {
    id: "news-phase-2",
    type: "news",
    title: "Website phase update",
    excerpt:
      "Public site Phase 2 visual work is in review. Public team profiles stay the source of truth until a backend is connected.",
    date: "2026-08-28",
    author: "Core",
  },
  {
    id: "blog-wana-expansion",
    type: "blog",
    title: "Market expansion notes — WANA",
    excerpt:
      "How we talk about WANA coverage without collapsing it into a generic MENA pitch. For internal reading before client calls.",
    date: "2026-08-26",
    author: "Strategy",
  },
  {
    id: "event-wana-sync",
    type: "event",
    title: "WANA market sync",
    excerpt: "Partner map, live conversations, and who owns follow-up this cycle.",
    date: "2026-09-08",
    whenLabel: "Monday · 11:00 GST",
    location: "Video",
  },
  {
    id: "news-partner-intros",
    type: "news",
    title: "Partner introductions pipeline",
    excerpt:
      "A short internal note on current exchange and infrastructure introductions. Names stay off this feed.",
    date: "2026-08-22",
    author: "BD",
  },
  {
    id: "blog-kol-ops",
    type: "blog",
    title: "KOL infrastructure operating notes",
    excerpt:
      "Screening before spend, tracking during the campaign, honest reporting after. Internal draft for operators.",
    date: "2026-08-18",
    author: "Growth",
  },
  {
    id: "update-public-profiles",
    type: "update",
    title: "Keep your public profile current",
    excerpt:
      "The public /team pages still read from the site catalog. Use Edit Profile here to prepare changes; they are not published until storage exists.",
    date: "2026-08-16",
    author: "Sigma",
  },
];

export function getInternalFeed(): InternalFeedItem[] {
  return [...INTERNAL_FEED_DEMO].sort((a, b) => {
    const priority = Number(b.priority === "high") - Number(a.priority === "high");
    if (priority !== 0) return priority;
    return b.date.localeCompare(a.date);
  });
}
