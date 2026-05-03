/**
 * Crawler-visible `<img>` references with no layout impact (home sections).
 */
export function SeoHiddenImages() {
  return (
    <>
      <img
        src="/images/seo/web3-growth.jpg"
        alt="Web3 growth infrastructure dashboard"
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/crypto-marketing.jpg"
        alt="Crypto marketing performance analytics"
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/liquidity-system.jpg"
        alt="Liquidity system visualization"
        style={{ display: "none" }}
      />
    </>
  );
}
