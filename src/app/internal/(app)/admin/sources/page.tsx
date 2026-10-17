import type { Metadata } from "next";
import "@/app/internal/leads.css";
import "@/app/internal/sources.css";
import { SourcesScreen } from "@/components/internal/sources/SourcesScreen";
import { SourcesAccessDenied, SourcesLoadError } from "@/components/internal/sources/SourcesStates";
import { requireInternalUser } from "@/lib/internal/auth";
import { getSourceAdminAccess, listSourceDirectory } from "@/lib/internal/leads/sources/queries";

export const metadata: Metadata = {
  title: { absolute: "Sources · SIGMA" },
  robots: { index: false, follow: false },
};

export default async function AdminSourcesPage() {
  await requireInternalUser();
  const access = await getSourceAdminAccess();
  if (!access.canManage) return <SourcesAccessDenied />;

  const directory = await listSourceDirectory();
  if (directory.status === "forbidden") return <SourcesAccessDenied />;
  if (directory.status === "error") return <SourcesLoadError />;

  return (
    <SourcesScreen
      sources={directory.data.sources}
      members={directory.data.members}
      canAssign={access.canAssign}
    />
  );
}
