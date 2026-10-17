"use client";

import { useState } from "react";
import { GlassButton, GlassField, GlassSelect, GlassTextarea } from "@/components/internal/glass/Glass";
import { attachIdentityAction } from "@/lib/internal/leads/actions";
import type { AttachIdentityInput, DuplicateMatch, LeadFieldErrors, LeadSourceOption } from "@/lib/internal/leads/types";

const EMPTY = {
  sourceId: "",
  externalId: "",
  handle: "",
  profileUrl: "",
  displayName: "",
  bio: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-[13px] text-[#f3c1c1]">{message}</p>;
}

export function AddIdentityForm({
  leadId,
  sources,
  onCancel,
  onSaved,
  onReview,
}: {
  leadId: string;
  sources: LeadSourceOption[];
  onCancel: () => void;
  onSaved: () => void;
  onReview: (match: DuplicateMatch) => void;
}) {
  const [form, setForm] = useState(EMPTY);
  const [fields, setFields] = useState<LeadFieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [matches, setMatches] = useState<DuplicateMatch[] | null>(null);

  function patch(next: Partial<typeof EMPTY>) {
    setForm((current) => ({ ...current, ...next }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setFields({});
    const input: AttachIdentityInput = {
      leadId,
      ...form,
      acknowledgeSeparate: false,
    };
    const result = await attachIdentityAction(input);
    setSaving(false);
    if (!result.ok && result.code === "possible_duplicate") {
      setMatches(result.matches ?? []);
      return;
    }
    if (!result.ok) {
      setError(result.error);
      setFields(result.fields ?? {});
      return;
    }
    onSaved();
  }

  async function keepSeparate() {
    setSaving(true);
    setError(null);
    const result = await attachIdentityAction({
      leadId,
      ...form,
      acknowledgeSeparate: true,
    });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved();
  }

  if (matches) {
    return (
      <div className="mt-4 flex flex-col gap-3">
        <p className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">Possible duplicate</p>
        {matches.map((match) => (
          <div key={match.leadId} className="glass-panel rounded-2xl px-4 py-3">
            <p className="text-[13px] text-cadet">Existing lead</p>
            <p className="mt-1 text-[16px] text-white">{match.leadName}</p>
            <p className="mt-2 text-[13px] text-cadet">Possible matching identity</p>
            <p className="mt-1 text-[14px] text-white">
              {match.platform}
              {match.handle ? ` · ${match.handle}` : ""}
            </p>
            <div className="leads-actions mt-3">
              <GlassButton type="button" variant="secondary" onClick={() => onReview(match)}>
                Review
              </GlassButton>
            </div>
          </div>
        ))}
        <div className="leads-actions">
          <GlassButton type="button" disabled={saving} onClick={keepSeparate}>
            {saving ? "Saving" : "Keep separate"}
          </GlassButton>
          <GlassButton type="button" variant="secondary" onClick={() => setMatches(null)}>
            Back
          </GlassButton>
        </div>
        {error ? (
          <p role="alert" className="text-[14px] leading-relaxed text-[#f3c1c1]">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={onSubmit}>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">Source</span>
        {sources.length === 0 ? (
          <p className="text-[14px] leading-relaxed text-cadet">No active source is available for this account.</p>
        ) : (
          <GlassSelect
            value={form.sourceId}
            onChange={(event) => patch({ sourceId: event.target.value })}
            aria-invalid={Boolean(fields.sourceId)}
          >
            <option value="">Choose a source</option>
            {sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </GlassSelect>
        )}
        <FieldError message={fields.sourceId} />
      </label>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          External ID
        </span>
        <GlassField
          value={form.externalId}
          onChange={(event) => patch({ externalId: event.target.value })}
          aria-invalid={Boolean(fields.externalId)}
          maxLength={180}
        />
        <FieldError message={fields.externalId} />
      </label>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">Handle</span>
        <GlassField
          value={form.handle}
          onChange={(event) => patch({ handle: event.target.value })}
          aria-invalid={Boolean(fields.handle)}
          maxLength={120}
        />
        <FieldError message={fields.handle} />
      </label>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Profile URL
        </span>
        <GlassField
          value={form.profileUrl}
          onChange={(event) => patch({ profileUrl: event.target.value })}
          aria-invalid={Boolean(fields.profileUrl)}
          inputMode="url"
          maxLength={500}
        />
        <FieldError message={fields.profileUrl} />
      </label>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Display name
        </span>
        <GlassField
          value={form.displayName}
          onChange={(event) => patch({ displayName: event.target.value })}
          aria-invalid={Boolean(fields.displayName)}
          maxLength={200}
        />
        <FieldError message={fields.displayName} />
      </label>
      <label>
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">Bio</span>
        <GlassTextarea
          value={form.bio}
          onChange={(event) => patch({ bio: event.target.value })}
          aria-invalid={Boolean(fields.bio)}
          maxLength={2000}
        />
        <FieldError message={fields.bio} />
      </label>
      {error ? (
        <p role="alert" className="text-[14px] leading-relaxed text-[#f3c1c1]">
          {error}
        </p>
      ) : null}
      <div className="leads-actions">
        <GlassButton type="submit" disabled={saving || sources.length === 0}>
          {saving ? "Saving" : "Save identity"}
        </GlassButton>
        <GlassButton type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </GlassButton>
      </div>
    </form>
  );
}
