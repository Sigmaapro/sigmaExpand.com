import {
  getTeamMemberSlug,
  type TeamMember,
} from "@/content/global/marketing/teamContent";
import { findTeamMemberByIdOrSlug } from "@/lib/internal/current-user";
import type { ProfileRow } from "@/lib/internal/profile-row";
import { publicTeamProfileHref } from "@/lib/internal/routes";
import type { EditableProfile, EditableSocialLink } from "@/lib/internal/types";

const X_LABELS = new Set(["x", "twitter", "x / twitter"]);
const TELEGRAM_LABELS = new Set(["telegram", "tg"]);
const INSTAGRAM_LABELS = new Set(["instagram", "ig"]);

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0]!, lastName: "" };
  return { firstName: parts[0]!, lastName: parts.slice(1).join(" ") };
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "SG";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

function normalizeHref(href: string): string {
  return href.trim();
}

function classifySocials(member: TeamMember): Pick<
  EditableProfile,
  "x" | "telegram" | "instagram" | "otherSocials"
> {
  let x = "";
  let telegram = "";
  let instagram = "";
  const otherSocials: EditableSocialLink[] = [];

  for (const link of member.socialLinks ?? []) {
    const href = normalizeHref(link.href);
    if (!href) continue;
    const key = link.label.trim().toLowerCase();
    if (X_LABELS.has(key) && !x) {
      x = href;
      continue;
    }
    if (TELEGRAM_LABELS.has(key) && !telegram) {
      telegram = href;
      continue;
    }
    if (INSTAGRAM_LABELS.has(key) && !instagram) {
      instagram = href;
      continue;
    }
    otherSocials.push({
      id: `social-${otherSocials.length + 1}`,
      label: link.label.trim(),
      href,
    });
  }

  return { x, telegram, instagram, otherSocials };
}

export function teamMemberToEditable(member: TeamMember): EditableProfile {
  const slug = getTeamMemberSlug(member);
  const { firstName, lastName } = splitName(member.name);
  const classified = classifySocials(member);

  return {
    id: member.id,
    slug,
    displayName: member.name,
    firstName,
    lastName,
    role: member.role ?? "",
    group: member.group,
    initials: member.initials?.trim() || initialsFromName(member.name),
    imageSrc: member.portrait ?? member.imageSrc ?? null,
    locationCity: member.location?.city ?? "",
    locationCountry: member.location?.country ?? "",
    locationCountryCode: member.location?.countryCode ?? "",
    status: member.quote?.trim() || member.quotes?.[0]?.trim() || "",
    shortBio: member.shortBio?.trim() || member.bio?.trim() || "",
    fullBio: member.fullBio?.trim() || "",
    expertise: [...(member.skills ?? [])],
    languages: [...(member.languages ?? [])],
    email: member.email?.trim() || "",
    linkedin: member.linkedin?.trim() || "",
    website: member.website?.trim() || "",
    ...classified,
    attachments: [],
    profileStatus: member.profileStatus,
    publicHref: publicTeamProfileHref(slug),
  };
}

function optionalUrl(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Merge editor fields back onto the canonical public `TeamMember`.
 * Does not drop fields the editor does not touch (career, SEO, etc).
 */
export function applyEditableToTeamMember(
  canonical: TeamMember,
  edited: EditableProfile,
): TeamMember {
  const displayName =
    edited.displayName.trim() ||
    `${edited.firstName.trim()} ${edited.lastName.trim()}`.trim() ||
    canonical.name;

  const socialLinks: NonNullable<TeamMember["socialLinks"]> = [];
  if (edited.x.trim()) socialLinks.push({ label: "X", href: edited.x.trim() });
  if (edited.telegram.trim()) {
    socialLinks.push({ label: "Telegram", href: edited.telegram.trim() });
  }
  if (edited.instagram.trim()) {
    socialLinks.push({ label: "Instagram", href: edited.instagram.trim() });
  }
  for (const extra of edited.otherSocials) {
    const href = extra.href.trim();
    const label = extra.label.trim();
    if (!href || !label) continue;
    socialLinks.push({ label, href });
  }

  const nextImage = edited.imageSrc?.startsWith("blob:")
    ? (canonical.portrait ?? canonical.imageSrc ?? null)
    : edited.imageSrc;

  return {
    ...canonical,
    name: displayName,
    role: edited.role.trim() || canonical.role,
    initials: edited.initials.trim() || canonical.initials,
    imageSrc: nextImage,
    portrait: nextImage,
    shortBio: edited.shortBio.trim() || undefined,
    bio: edited.shortBio.trim() || canonical.bio,
    fullBio: edited.fullBio.trim() || undefined,
    skills: edited.expertise.map((item) => item.trim()).filter(Boolean),
    languages: edited.languages.map((item) => item.trim()).filter(Boolean),
    location: {
      city: edited.locationCity.trim() || undefined,
      country: edited.locationCountry.trim() || canonical.location?.country || "",
      countryCode:
        edited.locationCountryCode.trim() || canonical.location?.countryCode || "",
    },
    quote: edited.status.trim() || undefined,
    email: optionalUrl(edited.email),
    linkedin: optionalUrl(edited.linkedin),
    website: optionalUrl(edited.website),
    socialLinks,
  };
}

export function groupLabel(group: TeamMember["group"]): string {
  if (group === "core") return "Core";
  if (group === "innerCircle") return "Inner Circle";
  return "Contributors";
}

function text(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

function stringList(value: string[] | null | undefined): string[] {
  if (!value) return [];
  return value.map((item) => item.trim()).filter(Boolean);
}

function imageUrl(value: string | null | undefined): string | null {
  const next = value?.trim() ?? "";
  if (!next || next.startsWith("blob:")) return null;
  return next;
}

export function parseOtherSocials(value: unknown): EditableSocialLink[] {
  if (!Array.isArray(value)) return [];
  const links: EditableSocialLink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const label = typeof record.label === "string" ? record.label.trim() : "";
    const href = typeof record.href === "string" ? record.href.trim() : "";
    if (!label || !href) continue;
    links.push({
      id: `social-${links.length + 1}`,
      label,
      href,
    });
  }
  return links;
}

function preferText(dbValue: string | null | undefined, fallback: string | undefined): string {
  const fromDb = text(dbValue);
  if (fromDb) return fromDb;
  return fallback?.trim() ?? "";
}

function preferList(dbValue: string[] | null | undefined, fallback: string[] | undefined): string[] {
  const fromDb = stringList(dbValue);
  if (fromDb.length > 0) return fromDb;
  return fallback ? fallback.map((item) => item.trim()).filter(Boolean) : [];
}

function preferSocials(
  dbValue: unknown,
  fallback: EditableSocialLink[] | undefined,
): EditableSocialLink[] {
  const fromDb = parseOtherSocials(dbValue);
  if (fromDb.length > 0) return fromDb;
  return fallback?.map((item) => ({ ...item })) ?? [];
}

/**
 * Map a public.profiles row into the editor shape.
 *
 * Priority for DB-owned fields: non-empty DB value → approved static TeamMember → empty.
 * Static lookup is by the trusted DB slug only, after the row was loaded by auth.uid().
 * group/initials are not stored in profiles; they remain static/derived.
 */
export function profileRowToEditable(row: ProfileRow): EditableProfile {
  const fallbackMember = findTeamMemberByIdOrSlug(row.slug);
  const fromStatic = fallbackMember ? teamMemberToEditable(fallbackMember) : null;
  const displayName = preferText(row.full_name, fromStatic?.displayName);
  const names = text(row.full_name)
    ? splitName(text(row.full_name))
    : fromStatic
      ? { firstName: fromStatic.firstName, lastName: fromStatic.lastName }
      : splitName(displayName);

  return {
    id: row.id,
    slug: row.slug,
    displayName,
    firstName: names.firstName,
    lastName: names.lastName,
    role: preferText(row.role, fromStatic?.role),
    group: fromStatic?.group ?? fallbackMember?.group ?? "contributors",
    initials:
      fromStatic?.initials?.trim() ||
      fallbackMember?.initials?.trim() ||
      initialsFromName(displayName),
    imageSrc: imageUrl(row.profile_image_url) ?? fromStatic?.imageSrc ?? null,
    locationCity: preferText(row.location_city, fromStatic?.locationCity),
    locationCountry: preferText(row.location_country, fromStatic?.locationCountry),
    locationCountryCode: preferText(row.location_country_code, fromStatic?.locationCountryCode),
    status: preferText(row.quote, fromStatic?.status),
    shortBio: preferText(row.short_bio, fromStatic?.shortBio),
    fullBio: preferText(row.bio, fromStatic?.fullBio),
    expertise: preferList(row.expertise, fromStatic?.expertise),
    languages: preferList(row.languages, fromStatic?.languages),
    email: preferText(row.email, fromStatic?.email),
    linkedin: preferText(row.linkedin_url, fromStatic?.linkedin),
    website: preferText(row.website_url, fromStatic?.website),
    x: preferText(row.x_url, fromStatic?.x),
    telegram: preferText(row.telegram_url, fromStatic?.telegram),
    instagram: preferText(row.instagram_url, fromStatic?.instagram),
    otherSocials: preferSocials(row.other_socials, fromStatic?.otherSocials),
    attachments: [],
    profileStatus: row.profile_status,
    publicHref: publicTeamProfileHref(row.slug),
  };
}
