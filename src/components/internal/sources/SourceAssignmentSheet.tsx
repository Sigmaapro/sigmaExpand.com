"use client";

import { useState } from "react";
import { GlassButton, GlassSelect } from "@/components/internal/glass/Glass";
import { LeadsOverlay } from "@/components/internal/leads/LeadsOverlay";
import { assignSourceMemberAction, removeSourceMemberAction } from "@/lib/internal/leads/sources/actions";
import type { SourceRecord, TeamMemberOption } from "@/lib/internal/leads/sources/types";

export function SourceAssignmentSheet({
  source,
  members,
  canAssign,
  onClose,
  onChanged,
}: {
  source: SourceRecord;
  members: TeamMemberOption[];
  canAssign: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const assignedIds = new Set(source.assignments.map((item) => item.userId));
  const available = members.filter((member) => !assignedIds.has(member.userId));
  const [userId, setUserId] = useState(available[0]?.userId ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const archived = Boolean(source.archivedAt);

  async function addMember(event: React.FormEvent) {
    event.preventDefault();
    if (!userId) return;
    setPending("add");
    setError(null);
    const result = await assignSourceMemberAction(source.id, userId);
    setPending(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChanged();
  }

  async function removeMember(memberId: string) {
    setPending(memberId);
    setError(null);
    const result = await removeSourceMemberAction(source.id, memberId);
    setPending(null);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChanged();
  }

  return (
    <LeadsOverlay eyebrow="Assignments" title={source.name} full onClose={onClose}>
      <div className="flex flex-col gap-5 pb-8">
        <section>
          <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">
            Assigned members
          </h3>
          {source.assignments.length === 0 ? (
            <p className="mt-3 text-[14px] leading-relaxed text-cadet">No members assigned.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {source.assignments.map((member) => (
                <li
                  key={member.userId}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-3 py-2"
                >
                  <span className="min-w-0 truncate text-[14px] text-white">{member.label}</span>
                  {canAssign ? (
                    <GlassButton
                      type="button"
                      variant="secondary"
                      className="!min-h-11 !px-3"
                      disabled={pending === member.userId}
                      onClick={() => removeMember(member.userId)}
                    >
                      Remove
                    </GlassButton>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        {canAssign && !archived ? (
          <form className="flex flex-col gap-3" onSubmit={addMember}>
            <h3 className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">Add member</h3>
            {members.length === 0 ? (
              <p className="text-[14px] leading-relaxed text-cadet">No team members are available to assign.</p>
            ) : available.length === 0 ? (
              <p className="text-[14px] leading-relaxed text-cadet">Every available member is already assigned.</p>
            ) : (
              <>
                <GlassSelect value={userId} onChange={(event) => setUserId(event.target.value)} aria-label="Team member">
                  {available.map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.label}
                    </option>
                  ))}
                </GlassSelect>
                <GlassButton type="submit" disabled={pending === "add" || !userId}>
                  {pending === "add" ? "Assigning" : "Assign member"}
                </GlassButton>
              </>
            )}
          </form>
        ) : null}

        {!canAssign ? (
          <p className="text-[14px] leading-relaxed text-cadet">You cannot assign sources.</p>
        ) : null}
        {archived ? (
          <p className="text-[14px] leading-relaxed text-cadet">Archived sources cannot take new assignments.</p>
        ) : null}
        {error ? (
          <p role="alert" className="text-[14px] leading-relaxed text-[#f3c1c1]">
            {error}
          </p>
        ) : null}
      </div>
    </LeadsOverlay>
  );
}
