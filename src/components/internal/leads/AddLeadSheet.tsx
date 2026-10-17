"use client";

import { useMemo, useState } from "react";
import { GlassButton, GlassField, GlassSelect, GlassTextarea } from "@/components/internal/glass/Glass";
import { LeadsOverlay } from "@/components/internal/leads/LeadsOverlay";
import { createLeadAction } from "@/lib/internal/leads/actions";
import type { CreateLeadInput, DuplicateMatch, LeadFieldErrors, LeadsFacets } from "@/lib/internal/leads/types";

const EMPTY: CreateLeadInput = {
  displayName: "",
  language: "",
  region: "",
  statusId: "",
  sourceId: "",
  externalId: "",
  handle: "",
  profileUrl: "",
  bio: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-[13px] text-[#f3c1c1]">{message}</p>;
}

export function AddLeadSheet({
  facets,
  onClose,
  onCreated,
  onReview,
}: {
  facets: LeadsFacets;
  onClose: () => void;
  onCreated: (leadId: string, warning?: string) => void;
  onReview: (leadId: string) => void;
}) {
  const defaultStatus = useMemo(
    () => facets.statuses.find((status) => status.key === "discovered")?.id ?? facets.statuses[0]?.id ?? "",
    [facets.statuses],
  );
  const [form, setForm] = useState<CreateLeadInput>({ ...EMPTY, statusId: defaultStatus });
  const [fields, setFields] = useState<LeadFieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [matches, setMatches] = useState<DuplicateMatch[] | null>(null);

  function patch(next: Partial<CreateLeadInput>) {
    setForm((current) => ({ ...current, ...next }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setFields({});
    const result = await createLeadAction(form);
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
    onCreated(result.leadId, result.warning);
  }

  async function keepSeparate() {
    setSaving(true);
    setError(null);
    const result = await createLeadAction({ ...form, acknowledgeSeparate: true });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      setFields(result.fields ?? {});
      return;
    }
    onCreated(result.leadId, result.warning);
  }

  if (matches) {
    return (
      <LeadsOverlay eyebrow="Leads" title="Possible duplicate" full onClose={onClose}>
        <div className="flex flex-col gap-3 pb-6">
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
                <GlassButton type="button" variant="secondary" onClick={() => onReview(match.leadId)}>
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
      </LeadsOverlay>
    );
  }

  return (
    <LeadsOverlay eyebrow="Leads" title="Add lead" full onClose={onClose}>
      <form className="flex flex-col gap-4 pb-6" onSubmit={onSubmit}>
        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Display name
          </span>
          <GlassField
            value={form.displayName}
            onChange={(event) => patch({ displayName: event.target.value })}
            aria-invalid={Boolean(fields.displayName)}
            maxLength={200}
            required
          />
          <FieldError message={fields.displayName} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
              Language
            </span>
            <GlassField
              value={form.language}
              onChange={(event) => patch({ language: event.target.value })}
              aria-invalid={Boolean(fields.language)}
              maxLength={64}
            />
            <FieldError message={fields.language} />
          </label>
          <label>
            <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
              Region
            </span>
            <GlassField
              value={form.region}
              onChange={(event) => patch({ region: event.target.value })}
              aria-invalid={Boolean(fields.region)}
              maxLength={80}
            />
            <FieldError message={fields.region} />
          </label>
        </div>
        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Status
          </span>
          {facets.statuses.length === 0 ? (
            <p className="text-[14px] text-cadet">Statuses are not available yet.</p>
          ) : (
            <GlassSelect
              value={form.statusId}
              onChange={(event) => patch({ statusId: event.target.value })}
              aria-invalid={Boolean(fields.statusId)}
            >
              {facets.statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </GlassSelect>
          )}
          <FieldError message={fields.statusId} />
        </label>

        <div className="leads-section mt-2">
          <p className="font-display text-[10px] uppercase tracking-[0.18em] text-[#bde0fe]/75">
            Initial identity
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-white">Optional</p>
          <p className="mt-2 text-[13px] leading-relaxed text-cadet/80">
            {facets.sources.length === 0
              ? "No source configured yet. You can add social identities later."
              : "Leave this blank to save the lead without a social identity."}
          </p>
        </div>

        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Source
          </span>
          <GlassSelect
            value={form.sourceId}
            onChange={(event) => patch({ sourceId: event.target.value })}
            aria-invalid={Boolean(fields.sourceId)}
            disabled={facets.sources.length === 0}
          >
            <option value="">No identity</option>
            {facets.sources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </GlassSelect>
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
              <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
                Handle
              </span>
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
                Bio
              </span>
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

        <GlassButton type="submit" disabled={saving || facets.statuses.length === 0}>
          {saving ? "Saving" : "Add lead"}
        </GlassButton>
      </form>
    </LeadsOverlay>
  );
}
