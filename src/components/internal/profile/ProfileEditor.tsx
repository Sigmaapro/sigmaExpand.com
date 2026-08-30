"use client";

import { FileAttachmentField } from "@/components/internal/profile/FileAttachmentField";
import { ChipListEditor } from "@/components/internal/profile/ChipListEditor";
import { FieldLabel, ProfileFormSection } from "@/components/internal/profile/ProfileFormSection";
import { ProfileImageUploader } from "@/components/internal/profile/ProfileImageUploader";
import { SocialLinksEditor } from "@/components/internal/profile/SocialLinksEditor";
import { GlassButton, GlassField, GlassSurface, GlassTextarea } from "@/components/internal/glass/Glass";
import type { EditableProfile, ProfileAttachmentKind } from "@/lib/internal/types";

type Props = {
  draft: EditableProfile;
  imagePreview: string | null;
  imageError: string | null;
  fileError: string | null;
  saving: boolean;
  onChange: (patch: Partial<EditableProfile>) => void;
  onImageFile: (file: File) => void;
  onClearImagePreview: () => void;
  onAddFile: (file: File, kind: ProfileAttachmentKind) => void;
  onRemoveFile: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function ProfileEditor({
  draft,
  imagePreview,
  imageError,
  fileError,
  saving,
  onChange,
  onImageFile,
  onClearImagePreview,
  onAddFile,
  onRemoveFile,
  onSave,
  onCancel,
}: Props) {
  return (
    <form
      className="internal-profile-enter pb-[calc(9.5rem+env(safe-area-inset-bottom))]"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <GlassSurface className="rounded-none px-5 py-8 sm:rounded-[1.75rem] sm:px-8 sm:py-10 lg:px-12">
        <header className="space-y-3 pb-8">
          <p className="font-display text-[10px] uppercase tracking-[0.32em] text-[#bde0fe]/80">Edit profile</p>
          <h1 className="font-display text-[1.85rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[2.2rem]">
            {draft.displayName}
          </h1>
          <p className="max-w-xl text-[13px] leading-relaxed text-cadet/80">
            These fields save to your SIGMA team profile. They are not published to the public website yet.
          </p>
        </header>

        <div className="space-y-10">
          <ProfileFormSection title="Profile photo">
            <ProfileImageUploader
              name={draft.displayName}
              initials={draft.initials}
              imageSrc={draft.imageSrc}
              previewUrl={imagePreview}
              error={imageError}
              onFile={onImageFile}
              onClearPreview={onClearImagePreview}
            />
          </ProfileFormSection>

          <ProfileFormSection title="Identity">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="display-name">Display name</FieldLabel>
              <GlassField
                id="display-name"
                autoComplete="name"
                value={draft.displayName}
                onChange={(event) => onChange({ displayName: event.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <GlassField
                  id="first-name"
                  autoComplete="given-name"
                  value={draft.firstName}
                  onChange={(event) => onChange({ firstName: event.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <GlassField
                  id="last-name"
                  autoComplete="family-name"
                  value={draft.lastName}
                  onChange={(event) => onChange({ lastName: event.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <GlassField
                id="role"
                autoComplete="organization-title"
                value={draft.role}
                onChange={(event) => onChange({ role: event.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <GlassField
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={draft.email}
                onChange={(event) => onChange({ email: event.target.value })}
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Location">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel htmlFor="city">City</FieldLabel>
                <GlassField
                  id="city"
                  autoComplete="address-level2"
                  value={draft.locationCity}
                  onChange={(event) => onChange({ locationCity: event.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <GlassField
                  id="country"
                  autoComplete="country-name"
                  value={draft.locationCountry}
                  onChange={(event) => onChange({ locationCountry: event.target.value })}
                />
              </div>
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="About">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="status">Quote</FieldLabel>
              <GlassField
                id="status"
                value={draft.status}
                onChange={(event) => onChange({ status: event.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="short-bio" hint="Public short">
                Short bio
              </FieldLabel>
              <GlassTextarea
                id="short-bio"
                rows={4}
                value={draft.shortBio}
                onChange={(event) => onChange({ shortBio: event.target.value })}
                className="min-h-[7rem]"
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="full-bio" hint="Public long">
                Long bio
              </FieldLabel>
              <GlassTextarea
                id="full-bio"
                rows={8}
                value={draft.fullBio}
                onChange={(event) => onChange({ fullBio: event.target.value })}
                className="min-h-[12rem]"
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Expertise">
            <div className="space-y-1.5">
              <FieldLabel htmlFor="expertise">Specialties</FieldLabel>
              <ChipListEditor
                id="expertise"
                values={draft.expertise}
                onChange={(expertise) => onChange({ expertise })}
                placeholder="Add a specialty"
              />
            </div>
            <div className="space-y-1.5">
              <FieldLabel htmlFor="languages">Languages</FieldLabel>
              <ChipListEditor
                id="languages"
                values={draft.languages}
                onChange={(languages) => onChange({ languages })}
                placeholder="Add a language"
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Social">
            <SocialLinksEditor
              linkedin={draft.linkedin}
              x={draft.x}
              telegram={draft.telegram}
              instagram={draft.instagram}
              website={draft.website}
              otherSocials={draft.otherSocials}
              onChange={onChange}
            />
          </ProfileFormSection>

          <ProfileFormSection title="Files" divider={false}>
            <FileAttachmentField
              attachments={draft.attachments}
              error={fileError}
              onAdd={onAddFile}
              onRemove={onRemoveFile}
            />
          </ProfileFormSection>
        </div>
      </GlassSurface>

      <div className="pointer-events-none internal-edit-actions fixed inset-x-0 z-40 px-3 sm:px-6">
        <div className="pointer-events-auto glass-surface mx-auto flex max-w-[1180px] flex-col gap-2 rounded-2xl p-3 md:flex-row-reverse">
          <GlassButton type="submit" disabled={saving} className="w-full md:flex-1">
            {saving ? "Saving" : "Save changes"}
          </GlassButton>
          <GlassButton
            type="button"
            variant="secondary"
            disabled={saving}
            onClick={onCancel}
            className="w-full md:flex-1"
          >
            Cancel
          </GlassButton>
        </div>
      </div>
    </form>
  );
}
