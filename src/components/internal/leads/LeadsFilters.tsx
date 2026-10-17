"use client";

import { useState } from "react";
import { GlassButton, GlassSelect } from "@/components/internal/glass/Glass";
import { LeadsOverlay } from "@/components/internal/leads/LeadsOverlay";
import type { LeadListFilters, LeadsFacets } from "@/lib/internal/leads/types";
import { activeFilterCount } from "@/lib/internal/leads/validation";

function FilterFields({
  filters,
  facets,
  onChange,
}: {
  filters: LeadListFilters;
  facets: LeadsFacets;
  onChange: (patch: Partial<LeadListFilters>) => void;
}) {
  return (
    <>
      <label className="block">
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Status
        </span>
        <GlassSelect
          aria-label="Status"
          value={filters.statusId ?? ""}
          onChange={(event) => onChange({ statusId: event.target.value || null, page: 1 })}
        >
          <option value="">All statuses</option>
          {facets.statuses.map((status) => (
            <option key={status.id} value={status.id}>
              {status.label}
            </option>
          ))}
        </GlassSelect>
      </label>
      <label className="block">
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Owner
        </span>
        <GlassSelect
          aria-label="Owner"
          value={filters.owner}
          onChange={(event) =>
            onChange({
              owner: event.target.value === "mine" || event.target.value === "unclaimed" ? event.target.value : "all",
              page: 1,
            })
          }
        >
          <option value="all">All</option>
          <option value="mine">Mine</option>
          <option value="unclaimed">Unclaimed</option>
        </GlassSelect>
      </label>
      <label className="block">
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Source
        </span>
        <GlassSelect
          aria-label="Source"
          value={filters.sourceId ?? ""}
          onChange={(event) => onChange({ sourceId: event.target.value || null, page: 1 })}
        >
          <option value="">All sources</option>
          {facets.sources.map((source) => (
            <option key={source.id} value={source.id}>
              {source.name}
            </option>
          ))}
        </GlassSelect>
      </label>
      <label className="block">
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Region
        </span>
        <GlassSelect
          aria-label="Region"
          value={filters.region ?? ""}
          onChange={(event) => onChange({ region: event.target.value || null, page: 1 })}
        >
          <option value="">All regions</option>
          {facets.regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </GlassSelect>
      </label>
      <label className="block">
        <span className="mb-2 block font-display text-[10px] uppercase tracking-[0.16em] text-cadet/70">
          Language
        </span>
        <GlassSelect
          aria-label="Language"
          value={filters.language ?? ""}
          onChange={(event) => onChange({ language: event.target.value || null, page: 1 })}
        >
          <option value="">All languages</option>
          {facets.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </GlassSelect>
      </label>
    </>
  );
}

export function LeadsFilters({
  filters,
  facets,
  onChange,
  onClear,
}: {
  filters: LeadListFilters;
  facets: LeadsFacets;
  onChange: (patch: Partial<LeadListFilters>) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);
  const count = activeFilterCount(filters);

  return (
    <>
      <div className="leads-filters">
        <FilterFields filters={filters} facets={facets} onChange={onChange} />
      </div>
      <div className="leads-filter-toggle flex items-center justify-between gap-3 lg:justify-end">
        <GlassButton type="button" variant="secondary" className="lg:hidden" onClick={() => setOpen(true)}>
          Filters{count > 0 ? ` · ${count}` : ""}
        </GlassButton>
        {count > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="font-display text-[10px] uppercase tracking-[0.16em] text-[#bde0fe]/80"
          >
            Clear filters · {count}
          </button>
        ) : (
          <span className="hidden font-display text-[10px] uppercase tracking-[0.16em] text-cadet/50 lg:inline">
            No filters
          </span>
        )}
      </div>
      {open ? (
        <LeadsOverlay eyebrow="Leads" title="Filters" onClose={() => setOpen(false)}>
          <div className="flex flex-col gap-4">
            <FilterFields
              filters={filters}
              facets={facets}
              onChange={(patch) => {
                onChange(patch);
              }}
            />
            <div className="flex flex-wrap gap-3 pt-2">
              <GlassButton type="button" variant="secondary" onClick={onClear} disabled={count === 0}>
                Clear filters
              </GlassButton>
              <GlassButton type="button" onClick={() => setOpen(false)}>
                Done
              </GlassButton>
            </div>
          </div>
        </LeadsOverlay>
      ) : null}
    </>
  );
}
