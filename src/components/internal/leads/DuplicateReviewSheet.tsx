"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GlassButton } from "@/components/internal/glass/Glass";
import { keepDuplicateSeparateAction, loadMergePreviewAction, mergeLeadsAction } from "@/lib/internal/leads/actions";
import type { DuplicateMatch, MergeIdentitySummary, MergeLeadPreview, MergePreview } from "@/lib/internal/leads/types";

function identityLabel(identity: MergeIdentitySummary): string {
  const handle = identity.handle?.replace(/^@/, "");
  return handle ? `${identity.platform} · @${handle}` : `${identity.platform} · ${identity.externalId}`;
}

function IdentityList({
  identities,
  pending,
  unavailable,
}: {
  identities: MergeIdentitySummary[];
  pending?: boolean;
  unavailable?: boolean;
}) {
  if (pending) return <p className="mt-2 text-[13px] text-cadet">Checking identities</p>;
  if (unavailable) return null;
  if (identities.length === 0) {
    return <p className="mt-2 text-[13px] text-cadet">No identities</p>;
  }
  return (
    <ul className="mt-2 flex flex-col gap-1">
      {identities.map((identity) => (
        <li key={`${identity.platform}:${identity.externalId}`} className="break-words text-[13px] text-white">
          {identityLabel(identity)}
        </li>
      ))}
    </ul>
  );
}

function LeadCard({
  title,
  name,
  owner,
  identities,
  pending,
  unavailable,
  selected,
  onSelect,
}: {
  title: string;
  name: string;
  owner: string;
  identities: MergeIdentitySummary[];
  pending?: boolean;
  unavailable?: boolean;
  selected: boolean;
  onSelect?: () => void;
}) {
  const primary = identities[0];
  const handle = primary?.handle
    ? primary.handle.startsWith("@")
      ? primary.handle
      : `@${primary.handle}`
    : null;

  return (
    <article className="leads-review-card" data-selected={selected ? "true" : "false"}>
      <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cadet/65">{title}</p>
      <p className="mt-2 break-words text-[16px] text-white">{name}</p>
      {pending ? <p className="mt-2 text-[13px] text-cadet">Checking identities</p> : null}
      {!pending && unavailable ? <p className="mt-2 text-[13px] text-cadet">Identities unavailable</p> : null}
      {!pending && !unavailable && identities.length === 0 ? (
        <p className="mt-2 text-[13px] text-cadet">No identity</p>
      ) : null}
      {!pending && !unavailable && primary ? (
        <>
          <p className="mt-2 break-words text-[14px] text-white">{handle ?? primary.externalId}</p>
          <p className="mt-1 break-words text-[13px] text-cadet">{primary.platform}</p>
        </>
      ) : null}
      {!pending && !unavailable && identities.length > 1 ? (
        <IdentityList identities={identities.slice(1)} />
      ) : null}
      <p className="mt-2 break-words text-[13px] text-cadet">Owner: {owner}</p>
      {onSelect ? (
        <label className="leads-review-choice">
          <input type="radio" name="surviving-lead" checked={selected} onChange={onSelect} />
          <span className="leads-review-radio" aria-hidden="true" />
          Surviving lead
        </label>
      ) : null}
    </article>
  );
}

export function DuplicateReviewSheet({
  currentLeadId,
  currentName,
  currentOwner,
  match,
  canMerge,
  onClose,
  onResolved,
}: {
  currentLeadId: string;
  currentName: string;
  currentOwner: string;
  match: DuplicateMatch;
  canMerge: boolean;
  onClose: () => void;
  onResolved: (result?: { survivorId: string; message: string }) => void;
}) {
  const [survivorId, setSurvivorId] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [preview, setPreview] = useState<MergePreview | null>(null);
  const [previewState, setPreviewState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const differentOwners =
    currentOwner !== "Unclaimed" && match.ownerLabel !== "Unclaimed" && currentOwner !== match.ownerLabel;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const leadLayer = document.getElementById("lead-detail-layer");
    leadLayer?.setAttribute("inert", "");
    leadLayer?.setAttribute("aria-hidden", "true");
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(nodes).filter((node) => node.tabIndex !== -1);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      leadLayer?.removeAttribute("inert");
      leadLayer?.removeAttribute("aria-hidden");
      document.removeEventListener("keydown", onKey, true);
      if (previous instanceof HTMLElement && document.contains(previous)) previous.focus();
    };
  }, [mounted]);

  useEffect(() => {
    if (!canMerge || !match.candidateId) return;
    let cancelled = false;
    setPreviewState("loading");
    loadMergePreviewAction(match.candidateId).then((result) => {
      if (cancelled) return;
      if (!result.ok) {
        setPreviewState("error");
        setError(result.error);
        return;
      }
      setPreview(result.preview);
      setPreviewState("ready");
    });
    return () => {
      cancelled = true;
    };
  }, [canMerge, match.candidateId]);

  const leadA: MergeLeadPreview | null = preview
    ? preview.low.id === currentLeadId
      ? preview.low
      : preview.high.id === currentLeadId
        ? preview.high
        : null
    : null;
  const leadB: MergeLeadPreview | null = preview
    ? preview.low.id === match.leadId
      ? preview.low
      : preview.high.id === match.leadId
        ? preview.high
        : null
    : null;
  const loser =
    survivorId && leadA && leadB ? (survivorId === leadA.id ? leadB : survivorId === leadB.id ? leadA : null) : null;
  const conflicts = preview?.conflicts ?? [];
  const blocked = conflicts.length > 0 || Boolean(leadA?.merged || leadB?.merged || leadA?.archived || leadB?.archived);
  const mergeReady = Boolean(canMerge && match.candidateId && previewState === "ready" && !blocked && survivorId);

  async function keepSeparate() {
    if (!match.candidateId) {
      onResolved();
      return;
    }
    setBusy("separate");
    setError(null);
    const result = await keepDuplicateSeparateAction(match.candidateId);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onResolved();
  }

  async function confirmMerge() {
    if (!match.candidateId || !mergeReady) return;
    setBusy("merge");
    setError(null);
    const result = await mergeLeadsAction(match.candidateId, survivorId);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      setConfirming(false);
      return;
    }
    const survivorName = survivorId === currentLeadId ? currentName : match.leadName;
    onResolved({
      survivorId: result.survivorId ?? survivorId,
      message: `Leads merged. Identities are now on ${survivorName}.`,
    });
  }

  if (!mounted) return null;

  const showMerge = Boolean(canMerge && match.candidateId);

  return createPortal(
    <div id="duplicate-review-layer" className="leads-review">
      <button type="button" className="leads-review-backdrop" tabIndex={-1} aria-label="Close duplicate review" onClick={onClose} />
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="leads-review-panel"
      >
        <header className="leads-review-header">
          <div className="min-w-0">
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#bde0fe]/75">Duplicate review</p>
            <h2 id={titleId} className="mt-2 font-display text-xl tracking-[0.04em] text-white">
              Possible matching lead
            </h2>
            <p id={descriptionId} className="sr-only">
              Compare the two leads, choose the surviving lead, then keep them separate or merge.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="glass-button glass-button-secondary !min-h-11 shrink-0 !px-3"
          >
            Close
          </button>
        </header>

        <div className="leads-review-body">
          <div className="leads-review-cards">
            <LeadCard
              title="Lead A"
              name={leadA?.displayName ?? currentName}
              owner={currentOwner}
              identities={leadA?.identities ?? []}
              pending={previewState === "loading"}
              unavailable={previewState === "error"}
              selected={survivorId === currentLeadId}
              onSelect={
                showMerge
                  ? () => {
                      setSurvivorId(currentLeadId);
                      setConfirming(false);
                    }
                  : undefined
              }
            />
            <LeadCard
              title="Lead B"
              name={leadB?.displayName ?? match.leadName}
              owner={match.ownerLabel}
              identities={leadB?.identities ?? []}
              pending={previewState === "loading"}
              unavailable={previewState === "error"}
              selected={survivorId === match.leadId}
              onSelect={
                showMerge
                  ? () => {
                      setSurvivorId(match.leadId);
                      setConfirming(false);
                    }
                  : undefined
              }
            />
          </div>

          <section className="leads-review-block">
            <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">Evidence</h3>
            <dl className="leads-review-evidence">
              {match.evidence.length === 0 ? (
                <div>
                  <dt>Record</dt>
                  <dd>Stored duplicate candidate</dd>
                </div>
              ) : (
                match.evidence.map((item) => (
                  <div key={item}>
                    <dt>Match</dt>
                    <dd>{item}</dd>
                  </div>
                ))
              )}
              <div>
                <dt>Possible matching identity</dt>
                <dd>
                  {match.platform}
                  {match.handle ? ` · ${match.handle}` : ""}
                </dd>
              </div>
              {match.confidence !== null ? (
                <div>
                  <dt>Confidence</dt>
                  <dd>{Math.round(match.confidence * 100)}%</dd>
                </div>
              ) : null}
            </dl>
          </section>

          <aside className="leads-review-notice">
            {differentOwners
              ? "These leads have different owners. Choose the surviving lead. Its owner stays, and the other owner is not copied."
              : "The surviving lead keeps its owner. Ownership is not copied from the other lead."}
          </aside>

          {conflicts.length > 0 ? (
            <section className="leads-review-block">
              <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#f3c1c1]">Identity conflict</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {conflicts.map((identity) => (
                  <li key={`${identity.platform}:${identity.externalId}`} className="break-words text-[14px] text-white">
                    {identityLabel(identity)}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[14px] text-[#f3c1c1]">Merge disabled</p>
            </section>
          ) : null}

          {previewState === "ready" && loser ? (
            <section className="leads-review-block">
              <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">Merge impact</h3>
              <ul className="mt-3 flex flex-col gap-2 text-[14px] text-white">
                <li>Identities to transfer: {loser.identities.length}</li>
                <li>Notes to transfer: {loser.noteCount}</li>
                <li>Activities preserved: {loser.activityCount}</li>
              </ul>
            </section>
          ) : null}

          {confirming && mergeReady ? (
            <p className="mt-4 text-[13px] leading-relaxed text-cadet">
              Confirm merge. The other lead leaves the active list, and its identities, notes, and activity move to the surviving lead.
            </p>
          ) : null}

          {error ? (
            <p role="alert" className="mt-4 break-words text-[14px] leading-relaxed text-[#f3c1c1]">
              {error}
            </p>
          ) : null}
        </div>

        <footer className={showMerge ? "leads-review-bar" : "leads-review-bar leads-review-bar-single"}>
          <GlassButton type="button" variant="secondary" disabled={busy !== null} onClick={keepSeparate}>
            {busy === "separate" ? "Saving" : "Keep separate"}
          </GlassButton>
          {showMerge ? (
            confirming ? (
              <GlassButton type="button" disabled={!mergeReady || busy === "merge"} onClick={confirmMerge}>
                {busy === "merge" ? "Merging" : "Confirm merge"}
              </GlassButton>
            ) : (
              <GlassButton type="button" disabled={!mergeReady || busy !== null} onClick={() => setConfirming(true)}>
                Merge leads
              </GlassButton>
            )
          ) : null}
        </footer>
      </section>
    </div>,
    document.body,
  );
}
