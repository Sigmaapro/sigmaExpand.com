import type { Metadata } from "next";
import { redirect } from "next/navigation";
import "@/app/internal/board.css";
import { SigmaTeamBoard } from "@/components/internal/board/SigmaTeamBoard";
import {
  ProfileLoadError,
  UnprovisionedProfile,
} from "@/components/internal/profile/ProfileUnavailable";
import { getTeamBoard } from "@/lib/internal/board-query";
import { getAuthenticatedProfile } from "@/lib/internal/profile-query";
import { isBoardAdminRole } from "@/lib/internal/profile-row";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

export const metadata: Metadata = {
  title: { absolute: "Team Board · SIGMA" },
  robots: { index: false, follow: false },
};

export default async function InternalSigmaPage() {
  const profileLoad = await getAuthenticatedProfile();

  if (profileLoad.status === "unauthenticated") {
    redirect(INTERNAL_ROUTES.login);
  }

  if (profileLoad.status === "missing") {
    return <UnprovisionedProfile />;
  }

  if (profileLoad.status === "error") {
    return <ProfileLoadError />;
  }

  const board = await getTeamBoard();
  const isAdmin = isBoardAdminRole(profileLoad.profile.internal_role);

  return (
    <SigmaTeamBoard
      isAdmin={isAdmin}
      announcements={board.status === "ok" ? board.announcements : []}
      meetings={board.status === "ok" ? board.meetings : []}
      loadError={board.status === "error"}
    />
  );
}
