/**
 * Content → section mapping for crypto-exchange-growth-market-development.
 * All strings are taken verbatim from importedFinalServiceDocuments — never rewrite.
 *
 * Mapping (block order preserved):
 * - blocks[0]          → Hero lead (handled by Hero)
 * - blocks[1]          → §02 Intro statement
 * - blocks[2] + What Is → §02b Definition editorial (document H2 present; keep visible)
 * - Who This Page Is For → §03 Audience bento
 * - Why … Underperforms → §04 Problem grid (+ compliance note in section)
 * - Growth Loop         → §05 Sticky scroll
 * - Services            → §06 Capabilities bento
 * - Growth Stage table  → §07 Timeline
 * - Metrics             → §08 Metric grid (labels only — no invented numbers)
 * - Channels            → §09 Scroll stack
 * - Regional            → §10 Map + copy
 * - User Acquisition    → §11 Acquisition flow
 * - Traffic to Volume   → §12 Conversion flow (paragraph exact; decorative rail only)
 * - Sigma vs Standard   → §13 Comparison
 * - Who Sigma Works With→ §14 Marquee + static list (categories from §03 + body)
 * - Brokers             → §15 Texture split
 * - How Engagements Work→ §16 Stepper
 * - Risk & Transparency → §17 Quiet editorial
 * - FAQ                 → §18 Accordion
 * - Scale Your Exchange → §19 Final CTA
 */

import type {
  ImportedServiceBlock,
  ImportedServiceDocument,
} from "@/content/services/importedFinalServiceDocuments";

export type LabeledItem = {
  /** Exact text before the first ": " when present; otherwise full string. */
  title: string;
  /** Exact text after the first ": "; empty if no separator. */
  body: string;
  /** Full exact original string. */
  full: string;
};

export type FaqPair = { question: string; answer: string };

export type CryptoExchangeLandingModel = {
  intro: string;
  whatIs: {
    title: string;
    paragraphs: string[];
  };
  audience: {
    title: string;
    intro: string;
    items: LabeledItem[];
  };
  problems: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
    closingNote: string | null;
  };
  growthLoop: {
    title: string;
    intro: string;
    steps: LabeledItem[];
    outro: string | null;
  };
  services: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  growthStages: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  metrics: {
    title: string;
    intro: string;
    items: LabeledItem[];
  };
  channels: {
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  regional: {
    title: string;
    intro: string;
    regions: LabeledItem[];
    outro: string | null;
  };
  acquisition: {
    title: string;
    intro: string;
    stages: Array<{ title: string; body: string }>;
  };
  trafficToVolume: {
    title: string;
    body: string;
  };
  comparison: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  whoWorksWith: {
    title: string;
    body: string;
  };
  brokers: {
    title: string;
    paragraphs: string[];
  };
  engagements: {
    title: string;
    steps: LabeledItem[];
  };
  risk: {
    title: string;
    body: string;
  };
  faq: {
    title: string;
    items: FaqPair[];
  };
  finalCta: {
    title: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

function splitLabeled(text: string): LabeledItem {
  const idx = text.indexOf(": ");
  if (idx === -1) {
    return { title: text, body: "", full: text };
  }
  return {
    title: text.slice(0, idx),
    body: text.slice(idx + 2),
    full: text,
  };
}

function paragraphAt(blocks: readonly ImportedServiceBlock[], index: number): string {
  const block = blocks[index];
  return block?.type === "paragraph" ? block.text : "";
}

function headingTextAt(blocks: readonly ImportedServiceBlock[], index: number): string {
  const block = blocks[index];
  return block?.type === "heading" ? block.text : "";
}

function collectListRun(
  blocks: readonly ImportedServiceBlock[],
  start: number,
): { items: string[]; next: number } {
  const first = blocks[start];
  if (!first || first.type !== "list") return { items: [], next: start };
  const ordered = first.ordered;
  const items: string[] = [first.text];
  let i = start + 1;
  while (i < blocks.length) {
    const b = blocks[i]!;
    if (b.type !== "list" || b.ordered !== ordered) break;
    items.push(b.text);
    i += 1;
  }
  return { items, next: i };
}

function findH2Index(blocks: readonly ImportedServiceBlock[], title: string): number {
  return blocks.findIndex((b) => b.type === "heading" && b.level === 2 && b.text === title);
}

/**
 * Build a typed landing model from the imported crypto-exchange document.
 * Throws if required structural headings are missing (guards content integrity).
 */
export function buildCryptoExchangeLandingModel(
  document: ImportedServiceDocument,
): CryptoExchangeLandingModel {
  const blocks = document.blocks;

  const intro = blocks[1]?.type === "paragraph" ? blocks[1].text : "";
  const bridge = blocks[2]?.type === "paragraph" ? blocks[2].text : "";

  const whatIsIdx = findH2Index(blocks, "What Is Crypto Exchange Marketing?");
  const audienceIdx = findH2Index(blocks, "Who This Page Is For");
  const problemsIdx = findH2Index(blocks, "Why Crypto Exchange Marketing Usually Underperforms");
  const loopIdx = findH2Index(blocks, "Sigma's Crypto Exchange Marketing Growth Loop");
  const servicesIdx = findH2Index(blocks, "Crypto Exchange Marketing Services");
  const stagesIdx = findH2Index(blocks, "Crypto Exchange Marketing by Growth Stage");
  const metricsIdx = findH2Index(blocks, "The Metrics Sigma Optimises For");
  const channelsIdx = findH2Index(blocks, "Crypto Exchange Marketing Channels Explained");
  const regionalIdx = findH2Index(blocks, "Regional Crypto Exchange Marketing");
  const acquisitionIdx = findH2Index(blocks, "Exchange User Acquisition: From Sign-Up to First Trade");
  const trafficIdx = findH2Index(blocks, "From Traffic to Trading Volume");
  const comparisonIdx = findH2Index(blocks, "Sigma vs a Standard Crypto Exchange Marketing Agency");
  const whoIdx = findH2Index(blocks, "Who Sigma Works With");
  const brokersIdx = findH2Index(blocks, "Crypto Exchange Marketing for Brokers and Multi-Asset Platforms");
  const engagementsIdx = findH2Index(blocks, "How Engagements Work");
  const riskIdx = findH2Index(blocks, "Risk & Transparency");
  const faqIdx = findH2Index(blocks, "Frequently Asked Questions");
  const finalIdx = findH2Index(blocks, "Scale Your Exchange With Sigma");

  const required = [
    whatIsIdx,
    audienceIdx,
    problemsIdx,
    loopIdx,
    servicesIdx,
    stagesIdx,
    metricsIdx,
    channelsIdx,
    regionalIdx,
    acquisitionIdx,
    trafficIdx,
    comparisonIdx,
    whoIdx,
    brokersIdx,
    engagementsIdx,
    riskIdx,
    faqIdx,
    finalIdx,
  ];
  if (required.some((i) => i < 0)) {
    throw new Error("Crypto exchange landing: missing expected H2 heading in imported document");
  }

  // What Is
  const whatIsParagraphs: string[] = [];
  if (bridge) whatIsParagraphs.push(bridge);
  for (let i = whatIsIdx + 1; i < audienceIdx; i++) {
    const b = blocks[i]!;
    if (b.type === "paragraph") whatIsParagraphs.push(b.text);
  }

  // Audience
  const audienceIntro = paragraphAt(blocks, audienceIdx + 1);
  const audienceList = collectListRun(blocks, audienceIdx + 2);

  // Problems — H3 + paragraph pairs, optional closing paragraph before next H2
  const problemItems: Array<{ title: string; body: string }> = [];
  let problemsIntro = "";
  let closingNote: string | null = null;
  {
    let i = problemsIdx + 1;
    if (blocks[i]?.type === "paragraph") {
      problemsIntro = paragraphAt(blocks, i);
      i += 1;
    }
    while (i < loopIdx) {
      const b = blocks[i]!;
      if (b.type === "heading" && b.level === 3) {
        const next = blocks[i + 1];
        problemItems.push({
          title: b.text,
          body: next?.type === "paragraph" ? next.text : "",
        });
        i += next?.type === "paragraph" ? 2 : 1;
        continue;
      }
      if (b.type === "paragraph") {
        closingNote = b.text;
      }
      i += 1;
    }
  }

  // Growth loop
  const loopIntro = paragraphAt(blocks, loopIdx + 1);
  const loopList = collectListRun(blocks, loopIdx + 2);
  const loopOutro =
    blocks[loopList.next]?.type === "paragraph" && loopList.next < servicesIdx
      ? paragraphAt(blocks, loopList.next)
      : null;

  // Services — H3 + paragraph
  const serviceItems: Array<{ title: string; body: string }> = [];
  for (let i = servicesIdx + 1; i < stagesIdx; i++) {
    const b = blocks[i]!;
    if (b.type === "heading" && b.level === 3) {
      const next = blocks[i + 1];
      serviceItems.push({
        title: b.text,
        body: next?.type === "paragraph" ? next.text : "",
      });
    }
  }

  // Growth stages table
  const stagesTable = blocks[stagesIdx + 1];
  if (!stagesTable || stagesTable.type !== "table") {
    throw new Error("Crypto exchange landing: growth stages table missing");
  }

  // Metrics
  const metricsIntro = paragraphAt(blocks, metricsIdx + 1);
  const metricsList = collectListRun(blocks, metricsIdx + 2);

  // Channels
  const channelsIntro = paragraphAt(blocks, channelsIdx + 1);
  const channelItems: Array<{ title: string; body: string }> = [];
  for (let i = channelsIdx + 2; i < regionalIdx; i++) {
    const b = blocks[i]!;
    if (b.type === "heading" && b.level === 3) {
      const next = blocks[i + 1];
      channelItems.push({
        title: b.text,
        body: next?.type === "paragraph" ? next.text : "",
      });
    }
  }

  // Regional
  const regionalIntro = paragraphAt(blocks, regionalIdx + 1);
  const regionalList = collectListRun(blocks, regionalIdx + 2);
  const regionalOutro =
    blocks[regionalList.next]?.type === "paragraph" && regionalList.next < acquisitionIdx
      ? paragraphAt(blocks, regionalList.next)
      : null;

  // Acquisition
  const acquisitionIntro = paragraphAt(blocks, acquisitionIdx + 1);
  const acquisitionStages: Array<{ title: string; body: string }> = [];
  for (let i = acquisitionIdx + 2; i < trafficIdx; i++) {
    const b = blocks[i]!;
    if (b.type === "heading" && b.level === 3) {
      const next = blocks[i + 1];
      acquisitionStages.push({
        title: b.text,
        body: next?.type === "paragraph" ? next.text : "",
      });
    }
  }

  // Traffic
  const trafficBody = paragraphAt(blocks, trafficIdx + 1);

  // Comparison table
  const comparisonTable = blocks[comparisonIdx + 1];
  if (!comparisonTable || comparisonTable.type !== "table") {
    throw new Error("Crypto exchange landing: comparison table missing");
  }

  // Who works with
  const whoBody = paragraphAt(blocks, whoIdx + 1);

  // Brokers
  const brokerParagraphs: string[] = [];
  for (let i = brokersIdx + 1; i < engagementsIdx; i++) {
    const b = blocks[i]!;
    if (b.type === "paragraph") brokerParagraphs.push(b.text);
  }

  // Engagements
  const engagementList = collectListRun(blocks, engagementsIdx + 1);

  // Risk
  const riskBody = paragraphAt(blocks, riskIdx + 1);

  // FAQ — alternating Q/A paragraphs until final H2
  const faqItems: FaqPair[] = [];
  {
    let i = faqIdx + 1;
    while (i < finalIdx) {
      const q = blocks[i];
      const a = blocks[i + 1];
      if (q?.type === "paragraph" && a?.type === "paragraph") {
        faqItems.push({ question: q.text, answer: a.text });
        i += 2;
        continue;
      }
      break;
    }
  }

  // Final CTA
  const finalBody = paragraphAt(blocks, finalIdx + 1);

  return {
    intro,
    whatIs: {
      title: headingTextAt(blocks, whatIsIdx),
      paragraphs: whatIsParagraphs,
    },
    audience: {
      title: headingTextAt(blocks, audienceIdx),
      intro: audienceIntro,
      items: audienceList.items.map(splitLabeled),
    },
    problems: {
      title: headingTextAt(blocks, problemsIdx),
      intro: problemsIntro,
      items: problemItems,
      closingNote,
    },
    growthLoop: {
      title: headingTextAt(blocks, loopIdx),
      intro: loopIntro,
      steps: loopList.items.map(splitLabeled),
      outro: loopOutro,
    },
    services: {
      title: headingTextAt(blocks, servicesIdx),
      items: serviceItems,
    },
    growthStages: {
      title: headingTextAt(blocks, stagesIdx),
      headers: stagesTable.headers,
      rows: stagesTable.rows,
    },
    metrics: {
      title: headingTextAt(blocks, metricsIdx),
      intro: metricsIntro,
      items: metricsList.items.map(splitLabeled),
    },
    channels: {
      title: headingTextAt(blocks, channelsIdx),
      intro: channelsIntro,
      items: channelItems,
    },
    regional: {
      title: headingTextAt(blocks, regionalIdx),
      intro: regionalIntro,
      regions: regionalList.items.map(splitLabeled),
      outro: regionalOutro,
    },
    acquisition: {
      title: headingTextAt(blocks, acquisitionIdx),
      intro: acquisitionIntro,
      stages: acquisitionStages,
    },
    trafficToVolume: {
      title: headingTextAt(blocks, trafficIdx),
      body: trafficBody,
    },
    comparison: {
      title: headingTextAt(blocks, comparisonIdx),
      headers: comparisonTable.headers,
      rows: comparisonTable.rows,
    },
    whoWorksWith: {
      title: headingTextAt(blocks, whoIdx),
      body: whoBody,
    },
    brokers: {
      title: headingTextAt(blocks, brokersIdx),
      paragraphs: brokerParagraphs,
    },
    engagements: {
      title: headingTextAt(blocks, engagementsIdx),
      steps: engagementList.items.map(splitLabeled),
    },
    risk: {
      title: headingTextAt(blocks, riskIdx),
      body: riskBody,
    },
    faq: {
      title: headingTextAt(blocks, faqIdx),
      items: faqItems,
    },
    finalCta: {
      title: headingTextAt(blocks, finalIdx),
      body: finalBody,
      primaryCta: document.primaryCta,
      secondaryCta: document.secondaryCta,
    },
  };
}
