"use client";

import Link from "next/link";
import { useMemo } from "react";
import DriftWall, { type DriftWallItem } from "@/components/react-bits/DriftWall";
import { ExhibitLink } from "@/components/token2049/ExhibitLink";
import { ROUTES } from "@/content/global/routes";
import { useClientMinWidth } from "@/hooks/useMedia";
import {
  getTeamMembersByLang,
  isTeamMemberPubliclyIndexable,
  type TeamMember,
} from "@/content/global/marketing/teamContent";

const PLACEHOLDER = "/images/team/placeholders/";
const MIX_SEED = 0x5e1a04;
const MIX_ROWS = 12;

function memberPhoto(member: TeamMember): string | null {
  const src = member.portrait ?? member.imageSrc ?? null;
  if (!src || src.includes(PLACEHOLDER)) return null;
  return src;
}

function mixRand(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shufflePortraits(items: DriftWallItem[], rand: () => number): DriftWallItem[] {
  const next = items.slice();
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rand() * (index + 1));
    const current = next[index];
    next[index] = next[swap];
    next[swap] = current;
  }
  return next;
}

function mixPortraits(source: DriftWallItem[], columns: number, seed: number): DriftWallItem[] {
  if (source.length === 0 || columns < 1) return [];
  const rand = mixRand(seed);
  const rows = Math.max(MIX_ROWS, source.length);
  const total = rows * columns;
  const mixed: DriftWallItem[] = [];

  for (let index = 0; index < total; index += 1) {
    const column = index % columns;
    const columnImages: string[] = [];
    for (let step = 1; index - columns * step >= 0; step += 1) {
      columnImages.push(mixed[index - columns * step].image);
    }
    const usedInColumn = new Set(columnImages);
    const recent = new Set(columnImages.slice(0, 3));
    if (column > 0) recent.add(mixed[index - 1].image);
    const deck = shufflePortraits(source, rand);
    const pick =
      deck.find((item) => !usedInColumn.has(item.image) && !recent.has(item.image)) ??
      deck.find((item) => !recent.has(item.image)) ??
      deck.find((item) => item.image !== columnImages[0]) ??
      deck[0];
    mixed.push(pick);
  }

  const seen = new Set(mixed.map((item) => item.image));
  for (const member of source) {
    if (seen.has(member.image)) continue;
    const slot = mixed.findIndex((item, index) => {
      const duplicates = mixed.filter((entry) => entry.image === item.image).length;
      const above = mixed[index - columns]?.image;
      const left = index % columns > 0 ? mixed[index - 1]?.image : undefined;
      return duplicates > 1 && above !== member.image && left !== member.image;
    });
    if (slot >= 0) {
      mixed[slot] = member;
      seen.add(member.image);
    }
  }

  return mixed;
}

export function MeetingPoint() {
  const desktop = useClientMinWidth(1100);
  const columns = desktop ? 7 : 4;
  const portraits = useMemo<DriftWallItem[]>(() => {
    const items: DriftWallItem[] = [];
    for (const member of getTeamMembersByLang("EN")) {
      if (!isTeamMemberPubliclyIndexable(member)) continue;
      const image = memberPhoto(member);
      if (!image) continue;
      items.push({ image, title: member.name });
    }
    return mixPortraits(items, columns, MIX_SEED);
  }, [columns]);

  return (
    <section className="sg-meet" id="meeting" aria-labelledby="meeting-title">
      {portraits.length > 0 ? (
        <div className="sg-meet__wall">
          <DriftWall
            items={portraits}
            columns={columns}
            tileWidth={132}
            tileHeight={168}
            gap={14}
            radius={2}
            tilt={14}
            turn={-12}
            speed={34}
            variance={0.32}
            parallax={0.35}
            pauseOnHover
            lift={36}
            fade={0.45}
            dim={1}
            grayscale={false}
            overlayColor="#f4f1e8"
          />
        </div>
      ) : null}
      <div className="sg-meet__copy">
        <p className="sg-kicker">05 — Meeting</p>
        <h2 id="meeting-title" className="sg-meet__title">
          Meet Sigma
          <br />
          in Singapore
        </h2>
        <p className="sg-meet__line">Grow Across Markets. Build Better Partnerships.</p>
        <p className="sg-meet__lead">
          Meet Sigma at TOKEN2049 Singapore and discover how our global network helps exchanges, brokers and Web3
          platforms build regional growth, KOL and IB channels, strategic partnerships and scalable growth infrastructure.
        </p>
        <ul className="sg-meet__facts">
          <li className="sg-meet__date">7–8 October 2026</li>
          <li>7:30 AM – 6:00 PM</li>
          <li>Marina Bay Sands, Singapore</li>
        </ul>
        <div className="sg-meet__actions">
          <ExhibitLink href={ROUTES.contact} className="sg-cta sg-cta--fill">
            Book a Meeting
          </ExhibitLink>
          <ExhibitLink href={ROUTES.home} className="sg-cta">
            Explore Sigma
          </ExhibitLink>
        </div>
        <p className="sg-meet__mail">
          <a href="mailto:BD@sigmaa.pro">BD@sigmaa.pro</a>
        </p>
        <footer className="sg-footer">
          <p>Sigma · TOKEN2049</p>
          <nav aria-label="Legal">
            <Link href={ROUTES.home}>Sigma</Link>
            <Link href={ROUTES.privacy}>Privacy</Link>
            <Link href={ROUTES.terms}>Terms</Link>
            <Link href={ROUTES.contact}>Contact</Link>
          </nav>
        </footer>
      </div>
    </section>
  );
}
