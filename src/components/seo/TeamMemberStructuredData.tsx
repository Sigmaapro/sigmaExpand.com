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

function buildPersonNode(
  member: TeamMember,
  options: {
    name: string;
    jobTitle?: string;
    profileUrl: string;
    base: string;
    image?: string;
    sameAs?: string[];
    description?: string;
    knowsAbout?: string[];
  },
) {
  const data: Record<string, unknown> = {
    "@type": "Person",
    name: options.name,
    jobTitle: options.jobTitle ?? member.role ?? "Team Member",
    url: options.profileUrl,
    worksFor: {
      "@type": "Organization",
      "@id": `${options.base}/#organization`,
      name: "Sigma",
    },
  };

  if (options.image) {
    data.image = options.image;
  }

  if (options.sameAs && options.sameAs.length > 0) {
    data.sameAs = options.sameAs;
  }

  if (options.description) {
    data.description = options.description;
  }

  if (options.knowsAbout && options.knowsAbout.length > 0) {
    data.knowsAbout = options.knowsAbout;
  }

  if (member.location) {
    data.homeLocation = {
      "@type": "Place",
      name: [member.location.city, member.location.country].filter(Boolean).join(", "),
    };
  }

  return data;
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
  const image =
    member.portrait ?? member.imageSrc
      ? toAbsoluteUrl((member.portrait ?? member.imageSrc) as string, base)
      : undefined;

  const related = member.relatedPersons?.filter((person) => person.name.trim().length > 0) ?? [];

  if (related.length > 0) {
    const personNodes = related.map((person, index) => {
      const personSameAs = person.linkedin && /^https?:\/\//.test(person.linkedin) ? [person.linkedin] : [];
      return {
        ...buildPersonNode(member, {
          name: person.name,
          jobTitle: person.jobTitle ?? member.role,
          profileUrl,
          base,
          image,
          sameAs: personSameAs,
          description: index === 0 ? description : undefined,
          knowsAbout: index === 0 ? knowsAbout : undefined,
        }),
        "@id": `${profileUrl}#person-${index + 1}`,
      };
    });

    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": `${profileUrl}#profile`,
          url: profileUrl,
          name: member.name,
          description,
          mainEntity: {
            "@type": "ItemList",
            name: member.name,
            itemListElement: personNodes.map((person, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: { "@id": person["@id"] },
            })),
          },
        },
        ...personNodes,
      ],
    };

    return (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    );
  }

  const data = buildPersonNode(member, {
    name: member.name,
    jobTitle: member.role,
    profileUrl,
    base,
    image,
    sameAs,
    description,
    knowsAbout,
  });
  data["@context"] = "https://schema.org";

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
