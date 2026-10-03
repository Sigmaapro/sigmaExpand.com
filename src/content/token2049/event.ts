/**
 * Event facts and the Singapore film. Leave fields empty until the client
 * delivers them. The page renders only what is present.
 */

export type ExhibitionAction = {
  label: string;
  href: string;
};

export type ExhibitionEvent = {
  name: string;
  place?: string;
  dates?: string;
  venue?: string;
  note?: string;
  actions: ExhibitionAction[];
};

export type ExhibitionFilm = {
  src?: string;
  mobileSrc?: string;
  poster?: string;
};

export const EXHIBITION_EVENT: ExhibitionEvent = {
  name: "TOKEN2049",
  place: "Singapore",
  actions: [],
};

/** Daylight film slot. Empty until a real film is delivered. */
export const SINGAPORE_FILM: ExhibitionFilm = {};

/**
 * Temporary entrance plate. Not a page section.
 * An announcement with no filled fields does not render.
 */
export type ExhibitionAnnouncement = {
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
  };
};

export const EXHIBITION_ANNOUNCEMENT: ExhibitionAnnouncement = {};
