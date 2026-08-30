"use client";

import { GlassButton, GlassField } from "@/components/internal/glass/Glass";
import { FieldLabel } from "@/components/internal/profile/ProfileFormSection";
import type { EditableSocialLink } from "@/lib/internal/types";

type Props = {
  linkedin: string;
  x: string;
  telegram: string;
  instagram: string;
  website: string;
  otherSocials: EditableSocialLink[];
  onChange: (patch: {
    linkedin?: string;
    x?: string;
    telegram?: string;
    instagram?: string;
    website?: string;
    otherSocials?: EditableSocialLink[];
  }) => void;
};

function TextField({
  id,
  label,
  value,
  type = "url",
  autoComplete,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  type?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <GlassField
        id={id}
        type={type}
        inputMode={type === "url" ? "url" : undefined}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function SocialLinksEditor({
  linkedin,
  x,
  telegram,
  instagram,
  website,
  otherSocials,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <TextField
        id="profile-linkedin"
        label="LinkedIn"
        value={linkedin}
        autoComplete="url"
        onChange={(value) => onChange({ linkedin: value })}
      />
      <TextField id="profile-x" label="X / Twitter" value={x} onChange={(value) => onChange({ x: value })} />
      <TextField
        id="profile-telegram"
        label="Telegram"
        value={telegram}
        onChange={(value) => onChange({ telegram: value })}
      />
      <TextField
        id="profile-instagram"
        label="Instagram"
        value={instagram}
        onChange={(value) => onChange({ instagram: value })}
      />
      <TextField
        id="profile-website"
        label="Personal website"
        value={website}
        onChange={(value) => onChange({ website: value })}
      />

      <div className="space-y-3">
        <p className="text-[13px] font-medium text-white/90">Other links</p>
        {otherSocials.length === 0 ? (
          <p className="text-[13px] text-cadet/70">None yet.</p>
        ) : null}
        {otherSocials.map((link, index) => (
          <div key={link.id} className="grid gap-2 md:grid-cols-[1fr_1.4fr_auto]">
            <label className="sr-only" htmlFor={`${link.id}-label`}>
              Link label {index + 1}
            </label>
            <GlassField
              id={`${link.id}-label`}
              value={link.label}
              placeholder="Label"
              onChange={(event) => {
                const next = otherSocials.map((item) =>
                  item.id === link.id ? { ...item, label: event.target.value } : item,
                );
                onChange({ otherSocials: next });
              }}
            />
            <label className="sr-only" htmlFor={`${link.id}-href`}>
              Link URL {index + 1}
            </label>
            <GlassField
              id={`${link.id}-href`}
              type="url"
              inputMode="url"
              value={link.href}
              placeholder="https://"
              onChange={(event) => {
                const next = otherSocials.map((item) =>
                  item.id === link.id ? { ...item, href: event.target.value } : item,
                );
                onChange({ otherSocials: next });
              }}
            />
            <GlassButton
              type="button"
              variant="secondary"
              className="w-full md:w-auto"
              onClick={() => onChange({ otherSocials: otherSocials.filter((item) => item.id !== link.id) })}
            >
              Remove
            </GlassButton>
          </div>
        ))}
        <GlassButton
          type="button"
          variant="secondary"
          className="w-auto"
          onClick={() =>
            onChange({
              otherSocials: [
                ...otherSocials,
                { id: `social-${Date.now()}`, label: "", href: "" },
              ],
            })
          }
        >
          Add link
        </GlassButton>
      </div>
    </div>
  );
}
