import "@/app/internal/leads.css";

export default function AdminSourcesLoading() {
  return (
    <section className="leads-screen" aria-busy="true" aria-live="polite">
      <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80">SIGMA Leads</p>
      <h1 className="mt-3 font-display text-[1.7rem] font-medium tracking-[0.08em] text-white">Sources</h1>
      <div className="mt-6 flex flex-col gap-3">
        <div className="leads-skeleton h-16 w-full" />
        <div className="leads-skeleton h-16 w-full" />
        <div className="leads-skeleton h-16 w-full" />
      </div>
    </section>
  );
}
