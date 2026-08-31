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
      dir="ltr"
      className="internal-profile-editor internal-profile-enter"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <GlassSurface className="internal-profile-editor-surface w-full min-w-0 flex-col items-stretch justify-start">
        <header className="internal-profile-editor-intro hidden space-y-2 pb-5 sm:block sm:space-y-3 sm:pb-8">
          <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80 sm:tracking-[0.32em]">
            Edit profile
          </p>
          <h1 className="font-display text-[1.55rem] font-medium leading-[1.08] tracking-tight text-white sm:text-[2.2rem]">
            {draft.displayName}
          </h1>
          <p className="max-w-xl text-[13px] leading-relaxed text-cadet/80 sm:text-[13px]">
            These fields save to your SIGMA team profile. They are not published to the public website yet.
          </p>
        </header>

        <div className="internal-profile-editor-sections w-full min-w-0">
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
            <div className="internal-profile-field">
              <FieldLabel htmlFor="display-name">Display name</FieldLabel>
              <GlassField
                id="display-name"
                autoComplete="name"
                value={draft.displayName}
                onChange={(event) => onChange({ displayName: event.target.value })}
              />
            </div>
            <div className="internal-profile-field-grid">
              <div className="internal-profile-field">
                <FieldLabel htmlFor="first-name">First name</FieldLabel>
                <GlassField
                  id="first-name"
                  autoComplete="given-name"
                  value={draft.firstName}
                  onChange={(event) => onChange({ firstName: event.target.value })}
                />
              </div>
              <div className="internal-profile-field">
                <FieldLabel htmlFor="last-name">Last name</FieldLabel>
                <GlassField
                  id="last-name"
                  autoComplete="family-name"
                  value={draft.lastName}
                  onChange={(event) => onChange({ lastName: event.target.value })}
                />
              </div>
            </div>
            <div className="internal-profile-field">
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <GlassField
                id="role"
                autoComplete="organization-title"
                value={draft.role}
                className="internal-profile-input-long"
                onChange={(event) => onChange({ role: event.target.value })}
              />
            </div>
            <div className="internal-profile-field">
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
            <div className="internal-profile-field-grid">
              <div className="internal-profile-field">
                <FieldLabel htmlFor="city">City</FieldLabel>
                <GlassField
                  id="city"
                  autoComplete="address-level2"
                  value={draft.locationCity}
                  onChange={(event) => onChange({ locationCity: event.target.value })}
                />
              </div>
              <div className="internal-profile-field">
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
            <div className="internal-profile-field">
              <FieldLabel htmlFor="status">Quote</FieldLabel>
              <GlassTextarea
                id="status"
                rows={3}
                value={draft.status}
                onChange={(event) => onChange({ status: event.target.value })}
                className="internal-profile-textarea-quote"
              />
            </div>
            <div className="internal-profile-field">
              <FieldLabel htmlFor="short-bio" hint="Public short">
                Short bio
              </FieldLabel>
              <GlassTextarea
                id="short-bio"
                rows={5}
                value={draft.shortBio}
                onChange={(event) => onChange({ shortBio: event.target.value })}
                className="internal-profile-textarea-short"
              />
            </div>
            <div className="internal-profile-field">
              <FieldLabel htmlFor="full-bio" hint="Public long">
                Long bio
              </FieldLabel>
              <GlassTextarea
                id="full-bio"
                rows={10}
                value={draft.fullBio}
                onChange={(event) => onChange({ fullBio: event.target.value })}
                className="internal-profile-textarea-long"
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Expertise">
            <div className="internal-profile-field">
              <FieldLabel htmlFor="expertise">Specialties</FieldLabel>
              <ChipListEditor
                id="expertise"
                values={draft.expertise}
                onChange={(expertise) => onChange({ expertise })}
                placeholder="Add a specialty"
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Languages">
            <div className="internal-profile-field">
              <FieldLabel htmlFor="languages">Languages</FieldLabel>
              <ChipListEditor
                id="languages"
                values={draft.languages}
                onChange={(languages) => onChange({ languages })}
                placeholder="Add a language"
              />
            </div>
          </ProfileFormSection>

          <ProfileFormSection title="Social links">
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

      <div className="pointer-events-none internal-edit-actions fixed z-40">
        <div className="pointer-events-auto glass-surface internal-edit-actions-inner mx-auto max-w-[1180px]">
          <GlassButton
            type="button"
            variant="secondary"
            disabled={saving}
            className="internal-edit-cancel"
            onClick={onCancel}
          >
            Cancel
          </GlassButton>
          <GlassButton type="submit" disabled={saving} className="internal-edit-save">
            {saving ? "Saving" : "Save changes"}
          </GlassButton>
        </div>
      </div>
    </form>
  );
}
