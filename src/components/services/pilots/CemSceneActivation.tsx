import Link from "next/link";
import { CemCtaActions } from "@/components/services/pilots/CemCtaActions";
import {
  CEM_FINAL_CTA,
  CEM_RELATED,
} from "@/content/services/pilots/cryptoExchangeMarketing.content";
import { ROUTES } from "@/content/global/routes";

/**
 * Scene 07 — Command Interface
 * Resolved signal + CTA dock. No diagram / no loop reuse.
 */
export function CemSceneActivation() {
  return (
    <section
      className="cem-scene cem-scene--activation"
      aria-labelledby="cem-cta-title"
      data-bg="cta"
      data-scene="activation"
    >
      <div className="cem-activation cem-activation--command">
        <p className="cem-scene-tag" aria-hidden>
          <span>07</span> Activation
        </p>

        <div className="cem-activation__signal" aria-hidden>
          <span className="cem-activation__signal-dot" />
          <span className="cem-activation__signal-line" />
          <span className="cem-activation__signal-label">SYSTEM READY</span>
        </div>

        <h2 id="cem-cta-title" className="cem-activation__heading">
          {CEM_FINAL_CTA.heading}
        </h2>
        <p className="cem-activation__body">{CEM_FINAL_CTA.body}</p>

        <div className="cem-activation__dock">
          <CemCtaActions
            layout="final"
            primaryLabel={CEM_FINAL_CTA.primaryCta}
            secondaryLabel={CEM_FINAL_CTA.secondaryCta}
            partnerLabel={CEM_FINAL_CTA.partnerCta}
          />
        </div>

        <nav className="cem-activation__related" aria-label="Related">
          <ul>
            {CEM_RELATED.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href={ROUTES.services}>All services</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
