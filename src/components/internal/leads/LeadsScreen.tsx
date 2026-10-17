"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassButton, GlassField, GlassSurface } from "@/components/internal/glass/Glass";
import { AddLeadSheet } from "@/components/internal/leads/AddLeadSheet";
import { LeadDetailSheet, type LeadDetailView } from "@/components/internal/leads/LeadDetailSheet";
import { LeadsFilters } from "@/components/internal/leads/LeadsFilters";
import { LeadsList } from "@/components/internal/leads/LeadsList";
import { claimLeadAction } from "@/lib/internal/leads/actions";
import { pageCount } from "@/lib/internal/leads/format";
import type {
  LeadAssignee,
  LeadDetailResult,
  LeadListFilters,
  LeadsAccess,
  LeadsListPayload,
} from "@/lib/internal/leads/types";
import { activeFilterCount, leadsListHref } from "@/lib/internal/leads/validation";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

function detailView(openId: string | null, filters: LeadListFilters, detail: LeadDetailResult | null): LeadDetailView {
  if (!openId || filters.leadId !== openId || !detail) return { state: "loading" };
  if (detail.status === "ready") return { state: "ready", detail: detail.detail };
  if (detail.status === "not_found") return { state: "not_found" };
  if (detail.status === "forbidden") return { state: "forbidden" };
  return { state: "error" };
}

export function LeadsScreen({
  access,
  filters,
  list,
  detail,
  assignees,
}: {
  access: LeadsAccess;
  filters: LeadListFilters;
  list: LeadsListPayload;
  detail: LeadDetailResult | null;
  assignees: LeadAssignee[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [draftQ, setDraftQ] = useState(filters.q);
  const [openId, setOpenId] = useState<string | null>(filters.leadId);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pendingClaimId, setPendingClaimId] = useState<string | null>(null);
  const canClaim = access.canClaim && access.canWrite;
  const filtering = activeFilterCount(filters) > 0 || Boolean(filters.q);
  const pages = pageCount(list.total, list.pageSize);
  const openTitle =
    detail?.status === "ready" && detail.detail.id === openId ? detail.detail.displayName : "Lead";

  useEffect(() => {
    setDraftQ(filters.q);
  }, [filters.q]);

  useEffect(() => {
    setOpenId(filters.leadId);
  }, [filters.leadId]);

  useEffect(() => {
    if (draftQ === filters.q) return;
    const timer = window.setTimeout(() => {
      startTransition(() => {
        router.replace(leadsListHref({ ...filters, q: draftQ, page: 1 }), { scroll: false });
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, [draftQ, filters, router]);

  function commit(next: LeadListFilters) {
    startTransition(() => {
      router.replace(leadsListHref(next), { scroll: false });
    });
  }

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  async function claim(id: string) {
    setPendingClaimId(id);
    setNotice(null);
    const result = await claimLeadAction(id);
    setPendingClaimId(null);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    refresh();
  }

  return (
    <section className="leads-screen internal-profile-enter">
      <header>
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">SIGMA Leads</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.7rem] font-medium leading-none tracking-[0.08em] text-white sm:text-[2.1rem]">
              Leads
            </h1>
            <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-cadet">
              People and identities the team can see, claim, and work.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {access.canManageSources ? (
              <Link href={INTERNAL_ROUTES.adminSources} className="glass-button glass-button-secondary">
                Sources
              </Link>
            ) : null}
            {access.canWrite ? (
              <GlassButton type="button" onClick={() => setAdding(true)}>
                Add lead
              </GlassButton>
            ) : null}
          </div>
        </div>
      </header>

      <div className="leads-context">
        <GlassSurface className="leads-metric rounded-2xl">
          <p className="leads-metric-label">In view</p>
          <p className="leads-metric-value font-display">{list.total}</p>
        </GlassSurface>
        <GlassSurface className="leads-metric rounded-2xl">
          <p className="leads-metric-label">Unclaimed</p>
          <p className="leads-metric-value font-display">{list.unclaimedCount}</p>
        </GlassSurface>
        <GlassSurface className="leads-metric rounded-2xl">
          <p className="leads-metric-label">Page</p>
          <p className="leads-metric-value font-display">
            {list.total === 0 ? "—" : `${list.page} / ${pages}`}
          </p>
        </GlassSurface>
      </div>

      <div className="leads-toolbar">
        <GlassField
          value={draftQ}
          onChange={(event) => setDraftQ(event.target.value)}
          placeholder="Search name, handle, or bio"
          aria-label="Search leads"
          maxLength={80}
        />
        <LeadsFilters
          filters={filters}
          facets={list.facets}
          onChange={(patch) => commit({ ...filters, ...patch })}
          onClear={() =>
            commit({
              ...filters,
              statusId: null,
              owner: "all",
              sourceId: null,
              region: null,
              language: null,
              page: 1,
            })
          }
        />
      </div>

      {success ? (
        <p role="status" className="text-[14px] leading-relaxed text-white">
          {success}
        </p>
      ) : null}

      {notice ? (
        <p role="status" className="text-[14px] leading-relaxed text-[#f3c1c1]">
          {notice}
        </p>
      ) : null}

      {list.total === 0 && !filtering ? (
        <GlassSurface className="rounded-2xl px-5 py-12 sm:px-10">
          <h2 className="font-display text-[1.45rem] font-medium tracking-[0.12em] text-white">No leads yet</h2>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-cadet">
            Start building the intelligence layer by adding your first lead.
          </p>
          {access.canWrite ? (
            <GlassButton type="button" className="mt-6" onClick={() => setAdding(true)}>
              Add lead
            </GlassButton>
          ) : null}
        </GlassSurface>
      ) : null}

      {list.total === 0 && filtering ? (
        <GlassSurface className="rounded-2xl px-5 py-12 sm:px-10">
          <h2 className="font-display text-[1.35rem] font-medium tracking-[0.08em] text-white">
            No leads match
          </h2>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-cadet">
            Nothing in the current search or filters. Clear them to see the full list.
          </p>
          <GlassButton
            type="button"
            variant="secondary"
            className="mt-6"
            onClick={() =>
              commit({
                ...filters,
                q: "",
                statusId: null,
                owner: "all",
                sourceId: null,
                region: null,
                language: null,
                page: 1,
              })
            }
          >
            Clear filters
          </GlassButton>
        </GlassSurface>
      ) : null}

      {list.total > 0 && list.items.length === 0 ? (
        <GlassSurface className="rounded-2xl px-5 py-10 sm:px-10">
          <h2 className="font-display text-[1.35rem] font-medium tracking-[0.08em] text-white">
            This page is empty
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-cadet">The list moved. Return to the first page.</p>
          <GlassButton type="button" variant="secondary" className="mt-6" onClick={() => commit({ ...filters, page: 1 })}>
            First page
          </GlassButton>
        </GlassSurface>
      ) : null}

      {list.items.length > 0 ? (
        <div className={pending ? "leads-pending" : undefined} aria-busy={pending}>
          <LeadsList
            items={list.items}
            canClaim={canClaim}
            pendingId={pendingClaimId}
            onOpen={(id) => {
              setOpenId(id);
              commit({ ...filters, leadId: id });
            }}
            onClaim={claim}
          />
        </div>
      ) : null}

      {list.total > list.pageSize ? (
        <div className="flex items-center justify-between gap-3">
          <GlassButton
            type="button"
            variant="secondary"
            disabled={pending || list.page <= 1}
            onClick={() => commit({ ...filters, page: list.page - 1 })}
          >
            Previous
          </GlassButton>
          <p className="font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
            Page {list.page} of {pages}
          </p>
          <GlassButton
            type="button"
            variant="secondary"
            disabled={pending || list.page >= pages}
            onClick={() => commit({ ...filters, page: list.page + 1 })}
          >
            Next
          </GlassButton>
        </div>
      ) : null}

      {openId ? (
        <LeadDetailSheet
          view={detailView(openId, filters, detail)}
          title={openTitle}
          statuses={list.facets.statuses}
          sources={list.facets.sources}
          assignees={assignees}
          canClaim={canClaim}
          canAssign={access.canAssign}
          canReviewDuplicates={access.canReviewDuplicates}
          onClose={() => {
            setOpenId(null);
            commit({ ...filters, leadId: null });
          }}
          onMutated={refresh}
          onMerged={(survivorId, message) => {
            setNotice(null);
            setSuccess(message);
            setOpenId(survivorId);
            startTransition(() => {
              router.replace(leadsListHref({ ...filters, leadId: survivorId, page: 1 }), { scroll: false });
              router.refresh();
            });
          }}
        />
      ) : null}

      {adding ? (
        <AddLeadSheet
          facets={list.facets}
          onClose={() => setAdding(false)}
          onReview={(leadId) => {
            setAdding(false);
            setOpenId(leadId);
            commit({ ...filters, leadId, page: 1 });
          }}
          onCreated={(leadId, warning) => {
            setAdding(false);
            setNotice(warning ?? null);
            setOpenId(leadId);
            commit({ ...filters, leadId, page: 1 });
          }}
        />
      ) : null}
    </section>
  );
}
