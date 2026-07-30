import {
  SERVICE_DISCLAIMER,
  SERVICE_PLACEHOLDER_NOTE,
  type FinalService,
} from "@/content/services/finalServices";

export function ServicePlaceholderPageView({ service }: { service: FinalService }) {
  return (
    <div className="relative isolate min-h-0 flex-1 overflow-x-clip">
      <div className="relative z-10 mx-auto max-w-[1720px] px-4 py-12 sm:px-6 md:py-16 lg:px-10">
        <article className="mx-auto max-w-3xl">
          <header className="border-b border-white/[0.08] pb-8">
            <p className="font-display text-[11px] font-semibold uppercase tracking-[0.24em] text-[#93C5FD]">
              Service
            </p>
            <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-white text-balance md:text-4xl">
              {service.title}
            </h1>
          </header>

          <p
            className="mt-8 rounded-2xl border border-white/[0.08] bg-[#07090f]/65 px-5 py-4 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]"
            role="status"
          >
            {SERVICE_PLACEHOLDER_NOTE}
          </p>

          <aside
            className="mt-10 border-t border-white/[0.08] pt-8"
            aria-label="Service disclaimer"
          >
            <p className="text-xs leading-relaxed text-[#8b929c] md:text-sm">
              {SERVICE_DISCLAIMER}
            </p>
          </aside>
        </article>
      </div>
    </div>
  );
}
