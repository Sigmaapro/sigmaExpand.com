"use client";

import { useId, useRef } from "react";
import { GlassButton, GlassSelect } from "@/components/internal/glass/Glass";
import { PROFILE_DOCUMENT_ACCEPT } from "@/lib/internal/file-upload";
import type { ProfileAttachment, ProfileAttachmentKind } from "@/lib/internal/types";

const KIND_LABEL: Record<ProfileAttachmentKind, string> = {
  cv: "CV",
  portfolio: "Portfolio",
  document: "Document",
};

type Props = {
  attachments: ProfileAttachment[];
  error: string | null;
  onAdd: (file: File, kind: ProfileAttachmentKind) => void;
  onRemove: (id: string) => void;
};

export function FileAttachmentField({ attachments, error, onAdd, onRemove }: Props) {
  const inputId = useId();
  const kindId = `${inputId}-kind`;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const kindRef = useRef<HTMLSelectElement>(null);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-[8.5rem_1fr]">
        <div className="space-y-1.5">
          <label htmlFor={kindId} className="text-[13px] font-medium text-white/90">
            Type
          </label>
          <GlassSelect id={kindId} ref={kindRef} defaultValue="cv">
            <option value="cv">CV</option>
            <option value="portfolio">Portfolio PDF</option>
            <option value="document">Document</option>
          </GlassSelect>
        </div>
        <div className="space-y-1.5">
          <label htmlFor={inputId} className="text-[13px] font-medium text-white/90">
            File
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={PROFILE_DOCUMENT_ACCEPT}
            className="glass-field py-2.5 file:mr-3 file:border-0 file:bg-transparent file:text-[12px] file:uppercase file:tracking-[0.14em] file:text-[#bde0fe]"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              const kind = (kindRef.current?.value ?? "document") as ProfileAttachmentKind;
              onAdd(file, kind);
            }}
          />
        </div>
      </div>
      <p className="text-[12px] leading-relaxed text-cadet/75">
        PNG, JPG, WebP, or PDF. Max 8 MB. Files are not uploaded — only held in this session.
      </p>
      {error ? (
        <p id={errorId} role="alert" className="text-[13px] text-red-300">
          {error}
        </p>
      ) : null}

      {attachments.length > 0 ? (
        <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          {attachments.map((file) => (
            <li key={file.id} className="flex min-h-12 items-center justify-between gap-3 px-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-[14px] text-white">{file.name}</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-cadet/70">
                  {KIND_LABEL[file.kind]} · {(file.size / 1024).toFixed(0)} KB · local only
                </p>
              </div>
              <GlassButton
                type="button"
                variant="secondary"
                className="w-auto shrink-0 px-3"
                onClick={() => onRemove(file.id)}
              >
                Remove
              </GlassButton>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
