/**
 * Proof-layer metrics (“numbers” band in ProofLayer).
 * CMS shape: flat array of { id, value, label, optional note }.
 */

export type ProofMetric = {
  id: string;
  /** Display as-is, e.g. "$12B+", "2.4M" */
  value: string;
  label: string;
  note?: string;
};

/** Placeholder figures — replace with audited Sigma metrics when ready */
export const proofMetrics: ProofMetric[] = [
  {
    id: "volume",
    value: "$12B+",
    label: "Notional trading volume",
    note: "Cumulative across supported venues",
  },
  {
    id: "users",
    value: "2.4M",
    label: "Users activated",
    note: "Wallet-verified cohorts",
  },
  {
    id: "reach",
    value: "190+",
    label: "Network reach",
    note: "Partner and community surfaces",
  },
  {
    id: "partners",
    value: "85",
    label: "Strategic partners",
    note: "Active distribution relationships",
  },
  {
    id: "markets",
    value: "40",
    label: "Markets covered",
    note: "Regions with live execution",
  },
];
