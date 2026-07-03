import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamMemberBreadcrumbStructuredData, TeamMemberPersonStructuredData } from "@/components/seo/TeamMemberStructuredData";
import { InnerPageShell } from "@/components/site/InnerPageShell";
import { TeamMemberProfilePageView } from "@/components/site/marketing/TeamMemberProfilePageView";
import { getAllTeamMembers, getTeamMemberBySlug, getTeamMemberSlug } from "@/content/global/marketing/teamContent";
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
  const title = `${member.name} | Sigma Team`;
  const description = buildDescription(member.name, member.role);
  const image = resolveMemberImage(member.ogImage ?? member.imageSrc);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
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

export default async function TeamMemberProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug, "EN");
  if (!member) notFound();

  return (
    <InnerPageShell>
      <TeamMemberBreadcrumbStructuredData member={member} />
      <TeamMemberPersonStructuredData member={member} />
      <TeamMemberProfilePageView member={member} />
    </InnerPageShell>
  );
}
