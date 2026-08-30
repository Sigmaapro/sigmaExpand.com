"use client";

import { useState } from "react";
import { ProfileEditor } from "@/components/internal/profile/ProfileEditor";
import { ProfileView } from "@/components/internal/profile/ProfileView";
import {
  createLocalPreviewUrl,
  revokeLocalPreviewUrl,
  validateProfileDocumentFile,
  validateProfileImageFile,
} from "@/lib/internal/file-upload";
import { saveInternalProfileAction } from "@/lib/internal/profile-actions";
import type { EditableProfile, ProfileAttachmentKind } from "@/lib/internal/types";

type Mode = "view" | "edit";

type Props = {
  profile: EditableProfile;
};

function cloneProfile(profile: EditableProfile): EditableProfile {
  return {
    ...profile,
    expertise: [...profile.expertise],
    languages: [...profile.languages],
    otherSocials: profile.otherSocials.map((item) => ({ ...item })),
    attachments: profile.attachments.map((item) => ({ ...item })),
  };
}

export function ProfileScreen({ profile: initialProfile }: Props) {
  const [mode, setMode] = useState<Mode>("view");
  const [profile, setProfile] = useState<EditableProfile>(() => cloneProfile(initialProfile));
  const [draft, setDraft] = useState<EditableProfile | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [draftPreview, setDraftPreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function enterEdit() {
    setNotice(null);
    setImageError(null);
    setFileError(null);
    setDraft(cloneProfile(profile));
    setDraftPreview(imagePreview);
    setMode("edit");
  }

  function patchDraft(patch: Partial<EditableProfile>) {
    setDraft((current) => (current ? { ...current, ...patch } : current));
  }

  function handleImageFile(file: File) {
    const result = validateProfileImageFile(file);
    if (!result.ok) {
      setImageError(result.error);
      return;
    }
    setImageError(null);
    setDraftPreview((current) => {
      revokeLocalPreviewUrl(current ?? undefined);
      return createLocalPreviewUrl(file);
    });
  }

  function clearImagePreview() {
    setDraftPreview((current) => {
      revokeLocalPreviewUrl(current ?? undefined);
      return null;
    });
    setImageError(null);
  }

  function handleAddFile(file: File, kind: ProfileAttachmentKind) {
    const result = validateProfileDocumentFile(file);
    if (!result.ok) {
      setFileError(result.error);
      return;
    }
    setFileError(null);
    const previewUrl = createLocalPreviewUrl(file);
    setDraft((current) =>
      current
        ? {
            ...current,
            attachments: [
              ...current.attachments,
              {
                id: `file-${Date.now()}`,
                kind,
                name: file.name,
                mime: result.mime,
                size: file.size,
                previewUrl,
              },
            ],
          }
        : current,
    );
  }

  function handleRemoveFile(id: string) {
    setDraft((current) => {
      if (!current) return current;
      const target = current.attachments.find((item) => item.id === id);
      revokeLocalPreviewUrl(target?.previewUrl);
      return {
        ...current,
        attachments: current.attachments.filter((item) => item.id !== id),
      };
    });
  }

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    setNotice(null);
    const next: EditableProfile = {
      ...draft,
      displayName:
        draft.displayName.trim() ||
        `${draft.firstName.trim()} ${draft.lastName.trim()}`.trim() ||
        draft.displayName,
    };
    const hadLocalPhoto = Boolean(draftPreview);
    const result = await saveInternalProfileAction(next);
    setSaving(false);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }

    if (draftPreview) {
      revokeLocalPreviewUrl(draftPreview);
    }

    setProfile({
      ...result.profile,
      attachments: next.attachments.map((item) => ({ ...item, previewUrl: undefined })),
    });
    setImagePreview(null);
    setDraftPreview(null);
    setMode("view");
    setDraft(null);
    setNotice(
      hadLocalPhoto
        ? "Profile changes saved. Photo upload is not stored yet."
        : "Profile changes saved.",
    );
  }

  function handleCancel() {
    if (draft) {
      for (const file of draft.attachments) {
        if (!profile.attachments.some((item) => item.id === file.id)) {
          revokeLocalPreviewUrl(file.previewUrl);
        }
      }
    }
    if (draftPreview && draftPreview !== imagePreview) {
      revokeLocalPreviewUrl(draftPreview);
    }
    setDraft(null);
    setDraftPreview(null);
    setImageError(null);
    setFileError(null);
    setNotice(null);
    setMode("view");
  }

  return (
    <div className="internal-profile space-y-5 sm:space-y-6">
      {notice ? (
        <p
          role="status"
          className="glass-panel mx-3 rounded-2xl px-4 py-3 text-[13px] leading-relaxed text-[#bde0fe] sm:mx-0"
        >
          {notice}
        </p>
      ) : null}

      {mode === "view" || !draft ? (
        <ProfileView
          profile={profile}
          imagePreview={imagePreview}
          onEdit={enterEdit}
        />
      ) : (
        <ProfileEditor
          draft={draft}
          imagePreview={draftPreview}
          imageError={imageError}
          fileError={fileError}
          saving={saving}
          onChange={patchDraft}
          onImageFile={handleImageFile}
          onClearImagePreview={clearImagePreview}
          onAddFile={handleAddFile}
          onRemoveFile={handleRemoveFile}
          onSave={() => {
            void handleSave();
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
