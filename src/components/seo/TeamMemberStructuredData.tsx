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
    ...((member.socialLinks ?? []).map((link) => link.href)),
  ].filter((value) => /^https?:\/\//.test(value));

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

  if (member.imageSrc) {
    data.image = toAbsoluteUrl(member.imageSrc, base);
  }

  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
