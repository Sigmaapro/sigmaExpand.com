import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileScreen } from "@/components/internal/profile/ProfileScreen";
import {
  ProfileLoadError,
  UnprovisionedProfile,
} from "@/components/internal/profile/ProfileUnavailable";
import { backfillMissingOwnedProfileFields } from "@/lib/internal/profile-backfill";
import { profileRowToEditable } from "@/lib/internal/profile-mapper";
import { getAuthenticatedProfile } from "@/lib/internal/profile-query";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

export const metadata: Metadata = {
  title: { absolute: "Profile · SIGMA" },
  robots: { index: false, follow: false },
};

export default async function InternalProfilePage() {
  const result = await getAuthenticatedProfile();

  if (result.status === "unauthenticated") {
    redirect(INTERNAL_ROUTES.login);
  }

  if (result.status === "missing") {
    return <UnprovisionedProfile />;
  }

  if (result.status === "error") {
    return <ProfileLoadError />;
  }

  const profile = await backfillMissingOwnedProfileFields(result.user.id, result.profile);
  return <ProfileScreen profile={profileRowToEditable(profile)} />;
}
