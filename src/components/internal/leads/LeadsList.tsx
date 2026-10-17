"use client";

import { GlassButton, GlassChip, GlassSurface } from "@/components/internal/glass/Glass";
import { cn } from "@/lib/utils";
import { formatLeadDate } from "@/lib/internal/leads/format";
import type { LeadListItem } from "@/lib/internal/leads/types";

function StatusChip({ label, statusKey }: { label: string; statusKey: string }) {
  return (
    <span className={cn("glass-chip leads-status")} data-key={statusKey}>
      {label}
    </span>
  );
}

export function LeadsList({
  items,
  canClaim,
  pendingId,
  onOpen,
  onClaim,
}: {
  items: LeadListItem[];
  canClaim: boolean;
  pendingId: string | null;
  onOpen: (id: string) => void;
  onClaim: (id: string) => void;
}) {
  return (
    <GlassSurface className="overflow-hidden rounded-2xl">
      <div className="leads-table-wrap">
        <table className="leads-table">
          <caption className="sr-only">Leads</caption>
          <thead>
            <tr>
              <th scope="col">Lead</th>
              <th scope="col">Owner</th>
              <th scope="col">Status</th>
              <th scope="col">Source</th>
              <th scope="col">Identity</th>
              <th scope="col">Region</th>
              <th scope="col">Language</th>
              <th scope="col">Last activity</th>
              <th scope="col">
                <span className="sr-only">Claim</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} onClick={() => onOpen(item.id)}>
                <td>
                  <button
                    type="button"
                    className="leads-name-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onOpen(item.id);
                    }}
                  >
                    {item.displayName}
                  </button>
                </td>
                <td>{item.ownerLabel}</td>
                <td>
                  <StatusChip label={item.statusLabel} statusKey={item.statusKey} />
                </td>
                <td>{item.sourceLabel}</td>
                <td>{item.identityLabel}</td>
                <td>{item.region ?? "—"}</td>
                <td>{item.language ?? "—"}</td>
                <td>{item.lastActivityAt ? formatLeadDate(item.lastActivityAt) : "—"}</td>
                <td>
                  {item.unclaimed && canClaim ? (
                    <GlassButton
                      type="button"
                      variant="secondary"
                      className="!min-h-11 !px-3"
                      disabled={pendingId === item.id}
                      onClick={(event) => {
                        event.stopPropagation();
                        onClaim(item.id);
                      }}
                    >
                      {pendingId === item.id ? "Claiming" : "Claim"}
                    </GlassButton>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="leads-cards">
        {items.map((item) => (
          <article key={item.id} className="px-4 py-1">
            <button type="button" className="leads-card" onClick={() => onOpen(item.id)}>
              <span className="block text-[16px] text-white">{item.displayName}</span>
              <span className="block text-[13px] text-cadet">{item.identityLabel}</span>
              <span className="flex flex-wrap items-center gap-2">
                <StatusChip label={item.statusLabel} statusKey={item.statusKey} />
                <GlassChip>{item.ownerLabel}</GlassChip>
                <GlassChip>{item.sourceLabel}</GlassChip>
              </span>
              <span className="block text-[12px] leading-relaxed text-cadet/80">
                {[item.region, item.language, item.lastActivityAt ? formatLeadDate(item.lastActivityAt) : null]
                  .filter(Boolean)
                  .join(" · ")}
                {item.identityCount > 1 ? ` · ${item.identityCount} identities` : ""}
              </span>
            </button>
            {item.unclaimed && canClaim ? (
              <div className="px-4 pb-3">
                <GlassButton
                  type="button"
                  variant="secondary"
                  disabled={pendingId === item.id}
                  onClick={() => onClaim(item.id)}
                >
                  {pendingId === item.id ? "Claiming" : "Claim"}
                </GlassButton>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </GlassSurface>
  );
}
