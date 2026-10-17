"use client";

import { useEffect, useState } from "react";
import { GlassButton, GlassChip, GlassSelect, GlassTextarea } from "@/components/internal/glass/Glass";
import { AddIdentityForm } from "@/components/internal/leads/AddIdentityForm";
import { DuplicateReviewSheet } from "@/components/internal/leads/DuplicateReviewSheet";
import { LeadActivityTimeline } from "@/components/internal/leads/LeadActivityTimeline";
import { LeadsOverlay } from "@/components/internal/leads/LeadsOverlay";
import { LeadsSkeleton } from "@/components/internal/leads/LeadsStates";
import {
  addLeadNoteAction,
  archiveLeadAction,
  assignLeadAction,
  claimLeadAction,
  releaseLeadAction,
  setIdentityActiveAction,
  updateLeadNoteAction,
  updateLeadStatusAction,
} from "@/lib/internal/leads/actions";
import { formatLeadDate, formatLeadDateTime, safeHttpUrl } from "@/lib/internal/leads/format";
import type { DuplicateMatch, LeadAssignee, LeadDetail, LeadSourceOption, LeadStatusOption } from "@/lib/internal/leads/types";
import { cn } from "@/lib/utils";

export type LeadDetailView =
  | { state: "loading" }
  | { state: "ready"; detail: LeadDetail }
  | { state: "not_found" }
  | { state: "forbidden" }
  | { state: "error" };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="leads-section">
      <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-[10px] uppercase tracking-[0.14em] text-cadet/60">{label}</p>
      <p className="mt-1 break-words text-[14px] text-white">{value}</p>
    </div>
  );
}

function ownershipState(detail: LeadDetail): string {
  if (detail.unclaimed) return "Unclaimed";
  if (detail.ownerLabel === "Mine") return "You";
  return detail.ownerLabel;
}

function handleLabel(handle: string | null, displayName: string | null): string {
  if (handle) return handle.startsWith("@") ? handle : `@${handle}`;
  return displayName ?? "No handle";
}

function ReadyDetail({
  detail,
  statuses,
  sources,
  assignees,
  canClaim,
  canAssign,
  canReviewDuplicates,
  onMutated,
  onMerged,
}: {
  detail: LeadDetail;
  statuses: LeadStatusOption[];
  sources: LeadSourceOption[];
  assignees: LeadAssignee[];
  canClaim: boolean;
  canAssign: boolean;
  canReviewDuplicates: boolean;
  onMutated: () => void;
  onMerged: (survivorId: string, message: string) => void;
}) {
  const [statusId, setStatusId] = useState(detail.status.id);
  const [assigneeId, setAssigneeId] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const [addingIdentity, setAddingIdentity] = useState(false);
  const [review, setReview] = useState<DuplicateMatch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const locked = detail.merged || Boolean(detail.archivedAt);

  useEffect(() => {
    setStatusId(detail.status.id);
    setEditingId(null);
    setError(null);
    setAddingIdentity(false);
  }, [detail.id, detail.status.id, detail.notes, detail.ownerLabel, detail.archivedAt]);

  async function claim() {
    setBusy("claim");
    setError(null);
    const result = await claimLeadAction(detail.id);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onMutated();
  }

  async function release() {
    setBusy("release");
    setError(null);
    const result = await releaseLeadAction(detail.id);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onMutated();
  }

  async function assign(event: React.FormEvent) {
    event.preventDefault();
    if (!assigneeId) return;
    setBusy("assign");
    setError(null);
    const result = await assignLeadAction(detail.id, assigneeId);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setAssigneeId("");
    onMutated();
  }

  async function archive() {
    setBusy("archive");
    setError(null);
    const result = await archiveLeadAction(detail.id);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onMutated();
  }

  async function saveStatus(event: React.FormEvent) {
    event.preventDefault();
    setBusy("status");
    setError(null);
    const result = await updateLeadStatusAction(detail.id, statusId);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onMutated();
  }

  async function addNote(event: React.FormEvent) {
    event.preventDefault();
    setBusy("note");
    setError(null);
    const result = await addLeadNoteAction(detail.id, note);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setNote("");
    onMutated();
  }

  async function saveNote(event: React.FormEvent) {
    event.preventDefault();
    if (!editingId) return;
    setBusy("edit");
    setError(null);
    const result = await updateLeadNoteAction(detail.id, editingId, editBody);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setEditingId(null);
    onMutated();
  }

  async function toggleIdentity(identityId: string, isActive: boolean) {
    setBusy(identityId);
    setError(null);
    const result = await setIdentityActiveAction(detail.id, identityId, isActive);
    setBusy(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onMutated();
  }

  return (
    <div className="pb-8">
      <div className="flex flex-wrap gap-2">
        <GlassChip>{ownershipState(detail)}</GlassChip>
        <span className={cn("glass-chip leads-status")} data-key={detail.status.key}>
          {detail.status.label}
        </span>
        <GlassChip>
          {detail.sourceCount} {detail.sourceCount === 1 ? "source" : "sources"}
        </GlassChip>
        <GlassChip>
          {detail.identities.length} {detail.identities.length === 1 ? "identity" : "identities"}
        </GlassChip>
      </div>

      {detail.merged ? (
        <p className="mt-4 text-[13px] leading-relaxed text-cadet">This lead was merged into another lead.</p>
      ) : null}
      {detail.archivedAt ? (
        <p className="mt-4 text-[13px] leading-relaxed text-cadet">This lead is archived.</p>
      ) : null}
      {detail.unclaimed && !detail.canWrite ? (
        <p className="mt-4 text-[13px] leading-relaxed text-cadet/80">
          {canClaim ? "Claim this lead before changing its status or notes." : "This lead is unclaimed."}
        </p>
      ) : null}

      {detail.duplicates.length > 0 ? (
        <Section title="Possible duplicate">
          <div className="flex flex-col gap-3">
            {detail.duplicates.map((match) => (
              <div key={match.candidateId ?? match.leadId} className="glass-panel rounded-2xl px-4 py-3">
                <p className="text-[13px] text-cadet">Existing lead</p>
                <p className="mt-1 text-[16px] text-white">{match.leadName}</p>
                <p className="mt-2 text-[13px] text-cadet">Possible matching identity</p>
                <p className="mt-1 text-[14px] text-white">
                  {match.platform}
                  {match.handle ? ` · ${match.handle}` : ""}
                </p>
                <div className="leads-actions mt-3">
                  <GlassButton type="button" variant="secondary" onClick={() => setReview(match)}>
                    Review
                  </GlassButton>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      <Section title="Ownership">
        <Meta label="Owner" value={ownershipState(detail)} />
        <div className="leads-actions mt-4">
          {detail.unclaimed && canClaim && !detail.merged ? (
            <GlassButton type="button" variant="secondary" disabled={busy === "claim"} onClick={claim}>
              {busy === "claim" ? "Claiming" : "Claim"}
            </GlassButton>
          ) : null}
          {canAssign && !detail.unclaimed && !locked ? (
            <GlassButton type="button" variant="secondary" disabled={busy === "release"} onClick={release}>
              {busy === "release" ? "Releasing" : "Unclaim"}
            </GlassButton>
          ) : null}
        </div>
        {canAssign && !locked && assignees.length > 0 ? (
          <form className="mt-4 flex flex-col gap-3" onSubmit={assign}>
            <GlassSelect aria-label="Assign to" value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}>
              <option value="">Choose a team member</option>
              {assignees
                .filter((member) => member.userId !== detail.ownerUserId)
                .map((member) => (
                  <option key={member.userId} value={member.userId}>
                    {member.label}
                  </option>
                ))}
            </GlassSelect>
            <GlassButton type="submit" variant="secondary" disabled={busy === "assign" || !assigneeId}>
              {busy === "assign" ? "Assigning" : "Assign"}
            </GlassButton>
          </form>
        ) : null}
      </Section>

      <Section title="Lifecycle">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.14em] text-cadet/60">Current status</p>
            <p className="mt-2">
              <span className={cn("glass-chip leads-status")} data-key={detail.status.key}>
                {detail.status.label}
              </span>
            </p>
          </div>
          <Meta
            label="Last activity"
            value={detail.lastActivityAt ? formatLeadDateTime(detail.lastActivityAt) : "—"}
          />
        </div>
        {detail.canWrite && !locked ? (
          <form className="mt-4 flex flex-col gap-3" onSubmit={saveStatus}>
            <GlassSelect aria-label="Status" value={statusId} onChange={(event) => setStatusId(event.target.value)}>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
              {statuses.some((status) => status.id === detail.status.id) ? null : (
                <option value={detail.status.id}>{detail.status.label}</option>
              )}
            </GlassSelect>
            <GlassButton type="submit" variant="secondary" disabled={busy === "status" || statusId === detail.status.id}>
              {busy === "status" ? "Saving" : "Update status"}
            </GlassButton>
          </form>
        ) : null}
        {detail.canWrite && !detail.archivedAt && !detail.merged ? (
          <div className="mt-4">
            <GlassButton type="button" variant="secondary" disabled={busy === "archive"} onClick={archive}>
              {busy === "archive" ? "Archiving" : "Archive"}
            </GlassButton>
          </div>
        ) : null}
      </Section>

      <Section title="Profile">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Meta label="Language" value={detail.language ?? "—"} />
          <Meta label="Region" value={detail.region ?? "—"} />
          <Meta label="Discovered" value={formatLeadDate(detail.discoveredAt) || "—"} />
        </div>
      </Section>

      <Section title="Identities">
        {detail.identities.length === 0 ? (
          <p className="text-[14px] text-cadet">No identities yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {detail.identities.map((identity) => {
              const href = safeHttpUrl(identity.profileUrl);
              return (
                <li key={identity.id} className="glass-panel rounded-2xl px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[15px] text-white">{identity.sourceName}</p>
                    <GlassChip>{identity.isActive ? "Active" : "Inactive"}</GlassChip>
                  </div>
                  <p className="mt-2 break-words text-[16px] text-white">
                    {handleLabel(identity.handle, identity.displayName)}
                  </p>
                  {identity.displayName ? (
                    <p className="mt-1 text-[13px] text-cadet/80">{identity.displayName}</p>
                  ) : null}
                  {identity.bio ? (
                    <p className="mt-2 whitespace-pre-wrap text-[13px] leading-relaxed text-cadet/85">{identity.bio}</p>
                  ) : null}
                  <p className="mt-2 break-all text-[12px] text-cadet/65">External ID {identity.externalId}</p>
                  {identity.lastSyncedAt ? (
                    <p className="mt-1 text-[12px] text-cadet/65">
                      Last synced {formatLeadDateTime(identity.lastSyncedAt)}
                    </p>
                  ) : (
                    <p className="mt-1 text-[12px] text-cadet/65">Not synced</p>
                  )}
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="leads-identity-link text-[13px] text-[#bde0fe]">
                      Open profile
                    </a>
                  ) : null}
                  {identity.canChangeActive && detail.canWrite && !locked ? (
                    <div className="mt-3">
                      <GlassButton
                        type="button"
                        variant="secondary"
                        disabled={busy === identity.id}
                        onClick={() => toggleIdentity(identity.id, !identity.isActive)}
                      >
                        {busy === identity.id ? "Saving" : identity.isActive ? "Mark inactive" : "Mark active"}
                      </GlassButton>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        {detail.canWrite && !locked ? (
          addingIdentity ? (
            <AddIdentityForm
              leadId={detail.id}
              sources={sources}
              onCancel={() => setAddingIdentity(false)}
              onSaved={() => {
                setAddingIdentity(false);
                onMutated();
              }}
              onReview={setReview}
            />
          ) : (
            <div className="mt-4">
              <GlassButton type="button" variant="secondary" onClick={() => setAddingIdentity(true)}>
                Add identity
              </GlassButton>
            </div>
          )
        ) : null}
      </Section>

      <Section title="Notes">
        {detail.notes.length === 0 ? (
          <p className="text-[14px] text-cadet">No notes yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {detail.notes.map((item) => (
              <li key={item.id} className="glass-panel rounded-2xl px-4 py-3">
                <p className="font-display text-[10px] uppercase tracking-[0.14em] text-cadet/65">
                  {item.authorLabel} · {formatLeadDateTime(item.createdAt)}
                  {item.edited ? " · Edited" : ""}
                </p>
                {editingId === item.id ? (
                  <form className="mt-3 flex flex-col gap-3" onSubmit={saveNote}>
                    <GlassTextarea
                      value={editBody}
                      onChange={(event) => setEditBody(event.target.value)}
                      maxLength={4000}
                    />
                    <div className="leads-actions">
                      <GlassButton type="submit" disabled={busy === "edit"}>
                        {busy === "edit" ? "Saving" : "Save"}
                      </GlassButton>
                      <GlassButton type="button" variant="secondary" onClick={() => setEditingId(null)}>
                        Cancel
                      </GlassButton>
                    </div>
                  </form>
                ) : (
                  <>
                    <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-white">{item.body}</p>
                    {item.mine && detail.canWrite ? (
                      <button
                        type="button"
                        className="mt-3 min-h-11 font-display text-[10px] uppercase tracking-[0.16em] text-[#bde0fe]/80"
                        onClick={() => {
                          setEditingId(item.id);
                          setEditBody(item.body);
                        }}
                      >
                        Edit my note
                      </button>
                    ) : null}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
        {detail.canWrite && !locked ? (
          <form className="mt-4 flex flex-col gap-3" onSubmit={addNote}>
            <GlassTextarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add a note"
              maxLength={4000}
            />
            <GlassButton type="submit" disabled={busy === "note"}>
              {busy === "note" ? "Saving" : "Add note"}
            </GlassButton>
          </form>
        ) : null}
      </Section>

      <Section title="Activity">
        <LeadActivityTimeline activities={detail.activities} />
      </Section>

      {error ? (
        <p role="alert" className="mt-5 text-[14px] leading-relaxed text-[#f3c1c1]">
          {error}
        </p>
      ) : null}

      {review ? (
        <DuplicateReviewSheet
          currentLeadId={detail.id}
          currentName={detail.displayName}
          currentOwner={detail.ownerLabel}
          match={review}
          canMerge={canReviewDuplicates}
          onClose={() => setReview(null)}
          onResolved={(result) => {
            setReview(null);
            if (result) onMerged(result.survivorId, result.message);
            else onMutated();
          }}
        />
      ) : null}
    </div>
  );
}

export function LeadDetailSheet({
  view,
  title,
  statuses,
  sources,
  assignees,
  canClaim,
  canAssign,
  canReviewDuplicates,
  onClose,
  onMutated,
  onMerged,
}: {
  view: LeadDetailView;
  title: string;
  statuses: LeadStatusOption[];
  sources: LeadSourceOption[];
  assignees: LeadAssignee[];
  canClaim: boolean;
  canAssign: boolean;
  canReviewDuplicates: boolean;
  onClose: () => void;
  onMutated: () => void;
  onMerged: (survivorId: string, message: string) => void;
}) {
  return (
    <LeadsOverlay eyebrow="Lead" title={title} full layerId="lead-detail-layer" onClose={onClose}>
      {view.state === "loading" ? <LeadsSkeleton rows={5} /> : null}
      {view.state === "not_found" ? (
        <p className="text-[15px] leading-relaxed text-cadet">Lead not found.</p>
      ) : null}
      {view.state === "forbidden" ? (
        <p className="text-[15px] leading-relaxed text-cadet">You do not have permission to view this Lead.</p>
      ) : null}
      {view.state === "error" ? (
        <p className="text-[15px] leading-relaxed text-cadet">This lead could not be loaded.</p>
      ) : null}
      {view.state === "ready" ? (
        <ReadyDetail
          detail={view.detail}
          statuses={statuses}
          sources={sources}
          assignees={assignees}
          canClaim={canClaim}
          canAssign={canAssign}
          canReviewDuplicates={canReviewDuplicates}
          onMutated={onMutated}
          onMerged={onMerged}
        />
      ) : null}
    </LeadsOverlay>
  );
}
