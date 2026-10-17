"use client";

import { useState } from "react";
import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { LeadsOverlay } from "@/components/internal/leads/LeadsOverlay";
import { archiveSourceAction, createSourceAction, restoreSourceAction, updateSourceAction } from "@/lib/internal/leads/sources/actions";
import {
  SOURCE_CAPABILITIES,
  SOURCE_CAPABILITY_LABELS,
  type SourceCapability,
  type SourceFieldErrors,
  type SourceInput,
  type SourceRecord,
} from "@/lib/internal/leads/sources/types";
import { cn } from "@/lib/utils";

const EMPTY: SourceInput = {
  name: "",
  key: "",
  providerKey: "",
  capabilities: [],
  isActive: true,
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-[13px] text-[#f3c1c1]">{message}</p>;
}

function slugKey(name: string): string {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
  if (!slug) return "";
  return /^[a-z]/.test(slug) ? slug.slice(0, 64) : `source_${slug}`.slice(0, 64);
}

export function SourceFormSheet({
  source,
  onClose,
  onSaved,
}: {
  source: SourceRecord | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const editing = Boolean(source);
  const [form, setForm] = useState<SourceInput>(
    source
      ? {
          name: source.name,
          key: source.key,
          providerKey: source.providerKey ?? "",
          capabilities: source.capabilities,
          isActive: source.isActive,
        }
      : EMPTY,
  );
  const [keyTouched, setKeyTouched] = useState(editing);
  const [fields, setFields] = useState<SourceFieldErrors>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [confirmArchive, setConfirmArchive] = useState(false);
  const archived = Boolean(source?.archivedAt);
  const keyLocked = Boolean(source?.keyLocked);

  function patch(next: Partial<SourceInput>) {
    setForm((current) => ({ ...current, ...next }));
  }

  function toggleCapability(capability: SourceCapability) {
    setForm((current) => {
      const has = current.capabilities.includes(capability);
      return {
        ...current,
        capabilities: has
          ? current.capabilities.filter((item) => item !== capability)
          : [...current.capabilities, capability],
      };
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setFields({});
    const result = source
      ? await updateSourceAction(source.id, form)
      : await createSourceAction(form);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      setFields(result.fields ?? {});
      return;
    }
    onSaved();
  }

  async function archive() {
    if (!source) return;
    setSaving(true);
    setError(null);
    const result = await archiveSourceAction(source.id);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      setConfirmArchive(false);
      return;
    }
    onSaved();
  }

  async function restore() {
    if (!source) return;
    setSaving(true);
    setError(null);
    const result = await restoreSourceAction(source.id);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSaved();
  }

  return (
    <LeadsOverlay eyebrow="Sources" title={editing ? source?.name ?? "Source" : "New source"} full onClose={onClose}>
      <form className="flex flex-col gap-4 pb-8" onSubmit={onSubmit}>
        <p className="text-[13px] leading-relaxed text-cadet/80">Provider not connected. Credentials are not stored here.</p>
        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">Name</span>
          <GlassField
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              patch(keyTouched ? { name } : { name, key: slugKey(name) });
            }}
            aria-invalid={Boolean(fields.name)}
            maxLength={80}
            required
          />
          <FieldError message={fields.name} />
        </label>
        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">Key</span>
          <GlassField
            value={form.key}
            onChange={(event) => {
              setKeyTouched(true);
              patch({ key: event.target.value.toLowerCase() });
            }}
            aria-invalid={Boolean(fields.key)}
            maxLength={64}
            disabled={keyLocked}
            required
            spellCheck={false}
          />
          {keyLocked ? (
            <p className="mt-2 text-[13px] leading-relaxed text-cadet/70">
              This key is in use by social identities.
            </p>
          ) : null}
          <FieldError message={fields.key} />
        </label>
        <label>
          <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Provider key
          </span>
          <GlassField
            value={form.providerKey}
            onChange={(event) => patch({ providerKey: event.target.value.toLowerCase() })}
            aria-invalid={Boolean(fields.providerKey)}
            maxLength={64}
            spellCheck={false}
            placeholder="Optional"
          />
          <FieldError message={fields.providerKey} />
        </label>

        <fieldset>
          <legend className="mb-2 font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Capabilities
          </legend>
          <div className="flex flex-wrap gap-2">
            {SOURCE_CAPABILITIES.map((capability) => {
              const pressed = form.capabilities.includes(capability);
              return (
                <button
                  key={capability}
                  type="button"
                  className={cn("glass-chip sources-capability", pressed && "text-white")}
                  aria-pressed={pressed}
                  onClick={() => toggleCapability(capability)}
                >
                  {SOURCE_CAPABILITY_LABELS[capability]}
                </button>
              );
            })}
          </div>
          <FieldError message={fields.capabilities} />
        </fieldset>

        <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3">
          <span className="font-display text-[10px] uppercase tracking-[0.16em] text-cadet/80">Active</span>
          <input
            type="checkbox"
            checked={form.isActive && !archived}
            disabled={archived || saving}
            onChange={(event) => patch({ isActive: event.target.checked })}
          />
        </label>
        {archived ? (
          <p className="text-[13px] leading-relaxed text-cadet/70">Archived sources stay inactive until restored.</p>
        ) : null}
        <FieldError message={fields.isActive} />

        {error ? (
          <p role="alert" className="text-[14px] leading-relaxed text-[#f3c1c1]">
            {error}
          </p>
        ) : null}

        <GlassButton type="submit" disabled={saving}>
          {saving ? "Saving" : editing ? "Save source" : "Create source"}
        </GlassButton>

        {editing && !archived ? (
          confirmArchive ? (
            <div className="rounded-2xl border border-white/10 px-4 py-4">
              <p className="text-[14px] leading-relaxed text-white">Archive this source?</p>
              <p className="mt-2 text-[13px] leading-relaxed text-cadet/80">
                It leaves the active source list. Assignments stay on record.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <GlassButton type="button" disabled={saving} onClick={archive}>
                  Archive source
                </GlassButton>
                <GlassButton type="button" variant="secondary" disabled={saving} onClick={() => setConfirmArchive(false)}>
                  Cancel
                </GlassButton>
              </div>
            </div>
          ) : (
            <GlassButton type="button" variant="secondary" disabled={saving} onClick={() => setConfirmArchive(true)}>
              Archive
            </GlassButton>
          )
        ) : null}

        {archived ? (
          <GlassButton type="button" variant="secondary" disabled={saving} onClick={restore}>
            Restore source
          </GlassButton>
        ) : null}
      </form>
    </LeadsOverlay>
  );
}
