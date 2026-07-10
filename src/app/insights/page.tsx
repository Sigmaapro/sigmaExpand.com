import { permanentRedirect } from "next/navigation";

const INSIGHTS_BLOG_URL = "https://blog.sigmaa.pro";

export default function InsightsPage() {
  permanentRedirect(INSIGHTS_BLOG_URL);
}
