/**
 * Quiet interludes — remaining approved Word content between cinematic scenes.
 * Typography-led; no invented copy.
 */
import {
  CEM_AUDIENCE,
  CEM_BROKERS,
  CEM_CHANNELS,
  CEM_COMPARISON,
  CEM_DEFINITION,
  CEM_ENGAGEMENT,
  CEM_FUNNEL,
  CEM_METRICS,
  CEM_VOLUME,
} from "@/content/services/pilots/cryptoExchangeMarketing.content";
import { CemFaq } from "@/components/services/pilots/CemFaq";

export function CemInterludeAudience() {
  return (
    <section className="cem-interlude" aria-labelledby="cem-audience-title">
      <h2 id="cem-audience-title" className="cem-interlude__h">
        {CEM_AUDIENCE.heading}
      </h2>
      <p className="cem-interlude__lede">{CEM_AUDIENCE.intro}</p>
      <ul className="cem-interlude__list">
        {CEM_AUDIENCE.items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CemInterludeDefinitionRest() {
  return (
    <section className="cem-interlude cem-interlude--narrow" aria-labelledby="cem-def-rest">
      <h2 id="cem-def-rest" className="sr-only">
        {CEM_DEFINITION.heading}
      </h2>
      <p className="cem-interlude__prose">{CEM_DEFINITION.paragraphs[1]}</p>
    </section>
  );
}

export function CemInterludeSignals() {
  return (
    <section className="cem-interlude" aria-labelledby="cem-metrics-title">
      <h2 id="cem-metrics-title" className="cem-interlude__h">
        {CEM_METRICS.heading}
      </h2>
      <p className="cem-interlude__lede">{CEM_METRICS.intro}</p>
      <ul className="cem-interlude__metrics">
        {CEM_METRICS.items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CemInterludeChannels() {
  return (
    <section className="cem-interlude cem-interlude--narrow" aria-labelledby="cem-channels-title">
      <h2 id="cem-channels-title" className="cem-interlude__h">
        {CEM_CHANNELS.heading}
      </h2>
      <p className="cem-interlude__lede">{CEM_CHANNELS.intro}</p>
      <div className="cem-interlude__stack">
        {CEM_CHANNELS.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CemInterludeFunnel() {
  return (
    <section className="cem-interlude" aria-labelledby="cem-funnel-title">
      <h2 id="cem-funnel-title" className="cem-interlude__h">
        {CEM_FUNNEL.heading}
      </h2>
      <p className="cem-interlude__lede">{CEM_FUNNEL.intro}</p>
      <ol className="cem-interlude__stack">
        {CEM_FUNNEL.steps.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <h3 className="cem-interlude__h3">{CEM_VOLUME.heading}</h3>
      <p className="cem-interlude__prose">{CEM_VOLUME.body}</p>
    </section>
  );
}

export function CemInterludeCompare() {
  return (
    <section className="cem-interlude" aria-labelledby="cem-compare-title">
      <h2 id="cem-compare-title" className="cem-interlude__h">
        {CEM_COMPARISON.heading}
      </h2>
      <div className="cem-interlude__table-wrap" tabIndex={0}>
        <table className="cem-interlude__table">
          <thead>
            <tr>
              {CEM_COMPARISON.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CEM_COMPARISON.rows.map((row) => (
              <tr key={row.dimension}>
                <th scope="row">{row.dimension}</th>
                <td>{row.standard}</td>
                <td>{row.sigma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function CemInterludeBrokersEngage() {
  return (
    <section className="cem-interlude cem-interlude--narrow" aria-labelledby="cem-brokers-title">
      <h2 id="cem-brokers-title" className="cem-interlude__h">
        {CEM_BROKERS.heading}
      </h2>
      <div className="cem-interlude__stack">
        {CEM_BROKERS.paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="cem-interlude__prose">
            {p}
          </p>
        ))}
      </div>
      <h3 className="cem-interlude__h3">{CEM_ENGAGEMENT.heading}</h3>
      <ol className="cem-interlude__stack">
        {CEM_ENGAGEMENT.steps.map((step) => (
          <li key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CemInterludeFaq() {
  return (
    <section className="cem-interlude cem-interlude--narrow" aria-labelledby="cem-faq-title">
      <h2 id="cem-faq-title" className="cem-interlude__h">
        Frequently Asked Questions
      </h2>
      <CemFaq />
    </section>
  );
}
