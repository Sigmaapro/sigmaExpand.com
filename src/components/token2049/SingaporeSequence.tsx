const ARTWORK = "/token2049/BG_section02.png";

const SEGMENTS = [
  "Crypto Exchanges",
  "Forex & CFD Brokers",
  "Fintech Platforms",
  "Web3 Companies & Protocols",
  "Prop Firms",
  "KOLs & Financial Creators",
  "IB & Affiliate Networks",
  "Trading Communities",
  "Technology & Infrastructure Partners",
] as const;

export function SingaporeSequence() {
  return (
    <section className="sg-film" id="singapore" aria-labelledby="singapore-title">
      <img
        className="sg-film__art"
        src={ARTWORK}
        alt="Singapore waterfront, with the ArtScience Museum, the skyline, and a line drawing across the bay."
      />
      <div className="sg-film__safe">
        <p className="sg-film__mark">Section 02</p>
        <h2 id="singapore-title" className="sg-film__name">
          Singapore
        </h2>
        <h3 className="sg-film__who">Who Sigma Helps</h3>
        <ol className="sg-film__list">
          {SEGMENTS.map((segment) => (
            <li key={segment}>{segment}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
