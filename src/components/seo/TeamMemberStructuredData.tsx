import type { TeamMember } from "@/content/global/marketing/teamContent";
import { getTeamMemberSlug } from "@/content/global/marketing/teamContent";
import { getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

type Props = {
  member: TeamMember;
};

function toAbsoluteUrl(value: string, base: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${base}${value.startsWith("/") ? value : `/${value}`}`;
}

export function TeamMemberBreadcrumbStructuredData({ member }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const slug = getTeamMemberSlug(member);
  const profileUrl = getCanonicalUrl(`/team/${slug}`);
  const teamUrl = getCanonicalUrl("/team");

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Team", item: teamUrl },
      { "@type": "ListItem", position: 3, name: member.name, item: profileUrl },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function TeamMemberPersonStructuredData({ member }: Props) {
  const base = getSiteUrl().replace(/\/$/, "");
  const slug = getTeamMemberSlug(member);
  const profileUrl = getCanonicalUrl(`/team/${slug}`);
  const sameAs = [
    ...(member.linkedin ? [member.linkedin] : []),
    ...(member.website ? [member.website] : []),
    ...((member.socialLinks ?? []).map((link) => link.href)),
  ].filter((value) => /^https?:\/\//.test(value));
  const description = member.fullBio ?? member.shortBio ?? member.bio;
  const knowsAbout = member.skills?.filter((item) => item.trim().length > 0) ?? [];

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: member.role ?? "Team Member",
    url: profileUrl,
    worksFor: {
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "Sigma",
    },
  };

  if (member.portrait ?? member.imageSrc) {
    data.image = toAbsoluteUrl((member.portrait ?? member.imageSrc) as string, base);
  }

  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  if (description) {
    data.description = description;
  }

  if (knowsAbout.length > 0) {
    data.knowsAbout = knowsAbout;
  }

  if (member.location) {
    data.homeLocation = {
      "@type": "Place",
      name: [member.location.city, member.location.country].filter(Boolean).join(", "),
    };
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
