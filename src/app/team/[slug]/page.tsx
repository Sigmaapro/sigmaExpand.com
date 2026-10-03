import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamMemberBreadcrumbStructuredData, TeamMemberPersonStructuredData } from "@/components/seo/TeamMemberStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TeamMemberProfilePageView } from "@/components/site/marketing/TeamMemberProfilePageView";
import {
  getAllTeamMembers,
  getTeamMemberBySlug,
  getTeamMemberSlug,
  isTeamMemberPubliclyIndexable,
  type TeamMember,
} from "@/content/global/marketing/teamContent";
import { absoluteOgImage, getCanonicalUrl } from "@/content/seo";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveMemberImage(memberImage?: string | null): string {
  if (!memberImage) return absoluteOgImage();
  if (/^https?:\/\//.test(memberImage)) return memberImage;
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${memberImage.startsWith("/") ? memberImage : `/${memberImage}`}`;
}

function buildDescription(name: string, role?: string): string {
  return `Profile of ${name}, ${role ?? "Team Member"} at Sigma.`;
}

export async function generateStaticParams() {
  const seen = new Set<string>();
  const members = getAllTeamMembers();
  const params: Array<{ slug: string }> = [];

  for (const member of members) {
    const slug = getTeamMemberSlug(member);
    if (!seen.has(slug)) {
      seen.add(slug);
      params.push({ slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "EN");
  if (!member) notFound();

  const canonicalPath = `/team/${getTeamMemberSlug(member)}`;
  const title = member.seoTitle ?? `${member.name} | Sigma Team`;
  const description = member.metaDescription ?? buildDescription(member.name, member.role);
  const image = resolveMemberImage(member.ogImage ?? member.portrait ?? member.imageSrc);
  const indexable = isTeamMemberPubliclyIndexable(member);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(canonicalPath),
      siteName: "Sigma",
      locale: "en_US",
      type: "profile",
      images: [{ url: image, width: 1200, height: 630, alt: member.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function getPublicAdjacentMembers(members: TeamMember[], currentSlug: string) {
  const publicMembers = members.filter(isTeamMemberPubliclyIndexable);
  const cycle = publicMembers.length > 0 ? publicMembers : members;
  const currentPublicIndex = cycle.findIndex((item) => getTeamMemberSlug(item) === currentSlug);

  if (currentPublicIndex >= 0) {
    return {
      previous: cycle[(currentPublicIndex - 1 + cycle.length) % cycle.length]!,
      next: cycle[(currentPublicIndex + 1) % cycle.length]!,
    };
  }

  const currentIndex = members.findIndex((item) => getTeamMemberSlug(item) === currentSlug);
  const length = members.length;
  let previous = cycle[cycle.length - 1]!;
  let next = cycle[0]!;

  for (let step = 1; step < length; step += 1) {
    const candidate = members[(currentIndex - step + length) % length]!;
    if (isTeamMemberPubliclyIndexable(candidate)) {
      previous = candidate;
      break;
    }
  }

  for (let step = 1; step < length; step += 1) {
    const candidate = members[(currentIndex + step) % length]!;
    if (isTeamMemberPubliclyIndexable(candidate)) {
      next = candidate;
      break;
    }
  }

  return { previous, next };
}

export default async function TeamMemberProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "EN");
  if (!member) notFound();
  const members = getAllTeamMembers();
  const currentSlug = getTeamMemberSlug(member);
  const currentIndex = members.findIndex((item) => getTeamMemberSlug(item) === currentSlug);
  if (currentIndex < 0) notFound();

  const { previous, next } = getPublicAdjacentMembers(members, currentSlug);

  return (
    <InnerPageShell>
      <TeamMemberBreadcrumbStructuredData member={member} />
      <TeamMemberPersonStructuredData member={member} />
      <TeamMemberProfilePageView
        member={member}
        previousMember={{ name: previous.name, slug: getTeamMemberSlug(previous) }}
        nextMember={{ name: next.name, slug: getTeamMemberSlug(next) }}
      />
    </InnerPageShell>
  );
}
