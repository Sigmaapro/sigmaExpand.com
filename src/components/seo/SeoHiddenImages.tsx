/**
 * Crawler-visible image references with no layout impact (home sections).
 * Uses `next/image` for lint compliance; dimensions match typical hero/OG assets.
 */
import Image from "next/image";
import type { LangCode } from "@/content/types";
import { getSeoImageAlts } from "@/content/global/seoImageAlts";

const SEO_HIDDEN_DIM = { width: 1200, height: 630 } as const;

export function SeoHiddenImages({ lang }: { lang: LangCode }) {
  const alts = getSeoImageAlts(lang);
  return (
    <>
      <Image
        src="/images/seo/web3-growth.jpg"
        alt={alts.home.web3Growth}
        {...SEO_HIDDEN_DIM}
        className="hidden"
        sizes="1px"
      />
      <Image
        src="/images/seo/crypto-marketing.jpg"
        alt={alts.home.cryptoMarketing}
        {...SEO_HIDDEN_DIM}
        className="hidden"
        sizes="1px"
      />
      <Image
        src="/images/seo/liquidity-system.jpg"
        alt={alts.home.liquiditySystem}
        {...SEO_HIDDEN_DIM}
        className="hidden"
        sizes="1px"
      />
    </>
  );
}
