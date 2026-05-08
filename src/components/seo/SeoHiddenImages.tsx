/**
 * Crawler-visible `<img>` references with no layout impact (home sections).
 */
import type { LangCode } from "@/content/types";
import { getSeoImageAlts } from "@/content/global/seoImageAlts";

export function SeoHiddenImages({ lang }: { lang: LangCode }) {
  const alts = getSeoImageAlts(lang);
  return (
    <>
      <img
        src="/images/seo/web3-growth.jpg"
        alt={alts.home.web3Growth}
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/crypto-marketing.jpg"
        alt={alts.home.cryptoMarketing}
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/liquidity-system.jpg"
        alt={alts.home.liquiditySystem}
        style={{ display: "none" }}
      />
    </>
  );
}
