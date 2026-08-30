"use client";

import { useId, useRef } from "react";
import { GlassButton } from "@/components/internal/glass/Glass";
import { PROFILE_IMAGE_ACCEPT } from "@/lib/internal/file-upload";

type Props = {
  name: string;
  initials: string;
  imageSrc: string | null;
  previewUrl: string | null;
  error: string | null;
  onFile: (file: File) => void;
  onClearPreview: () => void;
};

export function ProfileImageUploader({
  name,
  initials,
  imageSrc,
  previewUrl,
  error,
  onFile,
  onClearPreview,
}: Props) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const shown = previewUrl || imageSrc;

  return (
    <div className="flex flex-row items-center gap-3 sm:gap-4">
      <div className="relative h-16 w-16 shrink-0 sm:h-24 sm:w-24">
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-[radial-gradient(circle,rgba(189,224,254,0.16)_0%,transparent_70%)] sm:-inset-1.5"
        />
        <div className="relative h-full w-full overflow-hidden rounded-full border border-white/20 bg-white/[0.04]">
          {shown ? (
            // Local blob previews cannot use next/image.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown} alt={`${name} profile photo`} className="h-full w-full object-cover" />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center font-display text-base tracking-[0.12em] text-white sm:text-xl"
            >
              {initials}
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={PROFILE_IMAGE_ACCEPT}
          className="sr-only"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;
            onFile(file);
          }}
        />
        <div className="flex flex-wrap gap-2">
          <GlassButton
            type="button"
            variant="secondary"
            className="h-10 min-h-10 w-auto px-3 text-[10px] tracking-[0.14em] sm:h-12 sm:min-h-12 sm:px-5 sm:text-[11px]"
            onClick={() => inputRef.current?.click()}
          >
            {shown ? "Replace photo" : "Upload photo"}
          </GlassButton>
          {previewUrl ? (
            <GlassButton
              type="button"
              variant="secondary"
              className="h-10 min-h-10 w-auto px-3 text-[10px] tracking-[0.14em] sm:h-12 sm:min-h-12 sm:px-5 sm:text-[11px]"
              onClick={onClearPreview}
            >
              Remove new photo
            </GlassButton>
          ) : null}
        </div>
        <p className="text-[11px] leading-snug text-cadet/75 sm:text-[12px] sm:leading-relaxed">
          Preview only. Photo upload is not stored yet.
        </p>
        {error ? (
          <p id={errorId} role="alert" className="text-[13px] text-red-300">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
