"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassButton, GlassSurface } from "@/components/internal/glass/Glass";
import { SourceAssignmentSheet } from "@/components/internal/sources/SourceAssignmentSheet";
import { SourceFormSheet } from "@/components/internal/sources/SourceFormSheet";
import { formatLeadDate } from "@/lib/internal/leads/format";
import { SOURCE_CAPABILITY_LABELS, type SourceRecord } from "@/lib/internal/leads/sources/types";
import type { TeamMemberOption } from "@/lib/internal/leads/sources/types";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

function statusLabel(source: SourceRecord): string {
  if (source.archivedAt) return "Archived";
  return source.isActive ? "Active" : "Inactive";
}

function SourceFacts({ source }: { source: SourceRecord }) {
  return (
    <>
      <span className="glass-chip sources-provider" data-connection={source.providerConnection}>
        {source.providerLabel}
      </span>
      <span className="glass-chip">{statusLabel(source)}</span>
    </>
  );
}

export function SourcesScreen({
  sources,
  members,
  canAssign,
}: {
  sources: SourceRecord[];
  members: TeamMemberOption[];
  canAssign: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<SourceRecord | null>(null);
  const [assigning, setAssigning] = useState<SourceRecord | null>(null);

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  function saved() {
    setCreating(false);
    setEditing(null);
    setAssigning(null);
    refresh();
  }

  return (
    <section className={pending ? "leads-screen leads-pending" : "leads-screen"}>
      <header>
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">SIGMA Leads</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-[1.7rem] font-medium leading-none tracking-[0.08em] text-white sm:text-[2.1rem]">
              Sources
            </h1>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-cadet">
              Catalog the places leads can come from. Providers stay disconnected until a later phase.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href={INTERNAL_ROUTES.leads} className="glass-button glass-button-secondary">
              Leads
            </Link>
            <GlassButton type="button" onClick={() => setCreating(true)}>
              New source
            </GlassButton>
          </div>
        </div>
      </header>

      {sources.length === 0 ? (
        <GlassSurface className="rounded-2xl px-5 py-12 sm:px-10">
          <h2 className="font-display text-[1.45rem] font-medium tracking-[0.12em] text-white">No sources yet</h2>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-cadet">
            Create the first source before collection begins. Nothing is connected automatically.
          </p>
          <GlassButton type="button" className="mt-6" onClick={() => setCreating(true)}>
            New source
          </GlassButton>
        </GlassSurface>
      ) : (
        <GlassSurface className="overflow-hidden rounded-2xl">
          <div className="leads-table-wrap">
            <table className="leads-table">
              <caption className="sr-only">Lead sources</caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Key</th>
                  <th scope="col">Provider</th>
                  <th scope="col">Status</th>
                  <th scope="col">Capabilities</th>
                  <th scope="col">Team</th>
                  <th scope="col">Created</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((source) => (
                  <tr key={source.id} onClick={() => setEditing(source)}>
                    <td>
                      <button type="button" className="leads-name-button" onClick={() => setEditing(source)}>
                        {source.name}
                      </button>
                    </td>
                    <td>{source.key}</td>
                    <td>
                      <div className="flex flex-col items-start gap-2">
                        <span>{source.providerKey ?? "—"}</span>
                        <span className="glass-chip sources-provider" data-connection={source.providerConnection}>
                          {source.providerLabel}
                        </span>
                      </div>
                    </td>
                    <td>{statusLabel(source)}</td>
                    <td>
                      {source.capabilities.length === 0
                        ? "—"
                        : source.capabilities.map((item) => SOURCE_CAPABILITY_LABELS[item]).join(", ")}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="leads-name-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setAssigning(source);
                        }}
                      >
                        {source.assignedCount}
                      </button>
                    </td>
                    <td>{formatLeadDate(source.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="leads-cards">
            {sources.map((source) => (
              <article key={source.id}>
                <button type="button" className="leads-card" onClick={() => setEditing(source)}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-[15px] tracking-[0.04em] text-white">{source.name}</span>
                    <span className="text-[12px] text-cadet/70">{source.key}</span>
                  </span>
                  <span className="flex flex-wrap gap-2">
                    <SourceFacts source={source} />
                  </span>
                  <span className="text-[13px] text-cadet">
                    {source.providerKey ? source.providerKey : "No provider key"} · {source.assignedCount} assigned ·{" "}
                    {formatLeadDate(source.createdAt)}
                  </span>
                  <span className="text-[13px] leading-relaxed text-cadet/80">
                    {source.capabilities.length === 0
                      ? "No capabilities"
                      : source.capabilities.map((item) => SOURCE_CAPABILITY_LABELS[item]).join(" · ")}
                  </span>
                </button>
                <div className="px-4 pb-4">
                  <GlassButton type="button" variant="secondary" className="!min-h-11" onClick={() => setAssigning(source)}>
                    Assignments
                  </GlassButton>
                </div>
              </article>
            ))}
          </div>
        </GlassSurface>
      )}

      {creating ? <SourceFormSheet source={null} onClose={() => setCreating(false)} onSaved={saved} /> : null}
      {editing ? <SourceFormSheet source={editing} onClose={() => setEditing(null)} onSaved={saved} /> : null}
      {assigning ? (
        <SourceAssignmentSheet
          source={assigning}
          members={members}
          canAssign={canAssign}
          onClose={() => setAssigning(null)}
          onChanged={saved}
        />
      ) : null}
    </section>
  );
}
