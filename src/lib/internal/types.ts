import type { TeamMember } from "@/content/global/marketing/teamContent";

export type ProfilePersistenceKind = "database";

export type ProfileSaveResult =
  | {
      ok: true;
      persistence: "database";
      publishedToPublicSite: false;
      profile: EditableProfile;
    }
  | {
      ok: false;
      error: string;
    };

export type ProfileAttachmentKind = "cv" | "portfolio" | "document";

export type ProfileAttachment = {
  id: string;
  kind: ProfileAttachmentKind;
  name: string;
  mime: string;
  size: number;
  /**
   * Object URL for in-session preview only.
   * Never written to storage. Revoke on remove/unmount.
   */
  previewUrl?: string;
};

export type EditableSocialLink = {
  id: string;
  label: string;
  href: string;
};

/**
 * Editor-facing projection of the public `TeamMember` model.
 * Extra fields (first/last name split, attachments) are editor UX only.
 */
export type EditableProfile = {
  id: string;
  slug: string;
  displayName: string;
  firstName: string;
  lastName: string;
  role: string;
  group: TeamMember["group"];
  initials: string;
  imageSrc: string | null;
  locationCity: string;
  locationCountry: string;
  locationCountryCode: string;
  /** Maps to public `quote`. */
  status: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  languages: string[];
  email: string;
  linkedin: string;
  website: string;
  x: string;
  telegram: string;
  instagram: string;
  otherSocials: EditableSocialLink[];
  attachments: ProfileAttachment[];
  profileStatus: TeamMember["profileStatus"];
  publicHref: string;
};

export type InternalFeedType = "event" | "news" | "blog" | "update";

export type InternalFeedPriority = "normal" | "high";

type InternalFeedBase = {
  id: string;
  title: string;
  excerpt: string;
  body?: string;
  date: string;
  author?: string;
  image?: string;
  href?: string;
  priority?: InternalFeedPriority;
};

export type InternalEvent = InternalFeedBase & {
  type: "event";
  whenLabel: string;
  location?: string;
};

export type InternalNews = InternalFeedBase & {
  type: "news";
};

export type InternalBlog = InternalFeedBase & {
  type: "blog";
};

export type InternalUpdate = InternalFeedBase & {
  type: "update";
};

export type InternalFeedItem = InternalEvent | InternalNews | InternalBlog | InternalUpdate;
