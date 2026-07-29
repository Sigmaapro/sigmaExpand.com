import { CemTextLink } from "@/components/services/pilots/CemCtaActions";
import {
  CEM_QUALIFICATION,
  CEM_RISK,
} from "@/content/services/pilots/cryptoExchangeMarketing.content";
import { ROUTES } from "@/content/global/routes";

/**
 * Scene 06 — Editorial Trust / Contract Layout
 * No diagrams, nodes, or network maps.
 */
export function CemSceneTransparency() {
  return (
    <section
      className="cem-scene cem-scene--trust"
      aria-labelledby="cem-risk-title"
      data-bg="minimal"
      data-scene="trust"
    >
      <div className="cem-trust cem-trust--contract">
        <p className="cem-scene-tag cem-scene-tag--quiet" aria-hidden>
          <span>06</span> Transparency
        </p>

        <header className="cem-trust__header">
          <h2 id="cem-risk-title" className="cem-trust__heading">
            {CEM_RISK.heading}
          </h2>
          <div className="cem-trust__rule" aria-hidden />
        </header>

        <p className="cem-trust__body">{CEM_RISK.body}</p>
        <p className="cem-trust__link">
          <CemTextLink href={ROUTES.riskDisclosure}>Read full Risk Disclosure</CemTextLink>
        </p>

        <div className="cem-trust__divider" aria-hidden />

        <h3 className="cem-trust__sub">{CEM_QUALIFICATION.heading}</h3>
        <p className="cem-trust__body">{CEM_QUALIFICATION.body}</p>
      </div>
    </section>
  );
}
