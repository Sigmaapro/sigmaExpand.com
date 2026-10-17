import Link from "next/link";
import { GlassSurface } from "@/components/internal/glass/Glass";
import { INTERNAL_ROUTES } from "@/lib/internal/routes";

export function LeadsAccessDenied() {
  return (
    <section className="internal-profile-enter">
      <GlassSurface className="rounded-2xl px-5 py-10 sm:px-10">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">
          Leads
        </p>
        <h1 className="mt-4 font-display text-[1.7rem] font-medium tracking-[0.08em] text-white">
          Access withheld
        </h1>
        <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-cadet">
          You do not have permission to view Leads.
        </p>
      </GlassSurface>
    </section>
  );
}

export function LeadsLoadError() {
  return (
    <section className="internal-profile-enter">
      <GlassSurface className="rounded-2xl px-5 py-10 sm:px-10">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">
          Leads
        </p>
        <h1 className="mt-4 font-display text-[1.7rem] font-medium tracking-[0.08em] text-white">
          Leads could not be loaded
        </h1>
        <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-cadet">
          The record is temporarily unavailable. Try again in a moment.
        </p>
        <Link href={INTERNAL_ROUTES.leads} className="glass-button glass-button-primary mt-6">
          Try again
        </Link>
      </GlassSurface>
    </section>
  );
}

export function LeadsSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="leads-skeleton h-16 w-full" />
      ))}
    </div>
  );
}
