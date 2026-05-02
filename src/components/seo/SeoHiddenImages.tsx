/**
 * Crawler-visible `<img>` references with no layout impact (home sections).
 */
export function SeoHiddenImages() {
  return (
    <>
      <img
        src="/images/seo/web3-growth.jpg"
        alt="Web3 growth infrastructure and liquidity system"
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/crypto-marketing.jpg"
        alt="Crypto marketing agency campaigns and exchange growth"
        style={{ display: "none" }}
      />
      <img
        src="/images/seo/liquidity-system.jpg"
        alt="Liquidity solutions and DeFi marketing execution"
        style={{ display: "none" }}
      />
    </>
  );
}
