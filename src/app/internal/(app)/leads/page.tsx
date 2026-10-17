import type { Metadata } from "next";
import "@/app/internal/leads.css";
import { LeadsScreen } from "@/components/internal/leads/LeadsScreen";
import { LeadsAccessDenied, LeadsLoadError } from "@/components/internal/leads/LeadsStates";
import { requireInternalUser } from "@/lib/internal/auth";
import { getLeadDetail, getLeadsAccess, listAssignableMembers, listLeads } from "@/lib/internal/leads/queries";
import { parseLeadListFilters } from "@/lib/internal/leads/validation";

export const metadata: Metadata = {
  title: { absolute: "Leads · SIGMA" },
  robots: { index: false, follow: false },
};

export default async function InternalLeadsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireInternalUser();
  const filters = parseLeadListFilters(await searchParams);
  const access = await getLeadsAccess();
  if (!access.canRead) return <LeadsAccessDenied />;

  const list = await listLeads(filters);
  if (list.status === "forbidden") return <LeadsAccessDenied />;
  if (list.status === "error") return <LeadsLoadError />;

  const detail = filters.leadId ? await getLeadDetail(filters.leadId) : null;
  const assignees = access.canAssign ? await listAssignableMembers() : { status: "forbidden" as const };

  return (
    <LeadsScreen
      access={access}
      filters={filters}
      list={list.data}
      detail={detail}
      assignees={assignees.status === "ok" ? assignees.members : []}
    />
  );
}
