import { GlassSurface } from "@/components/internal/glass/Glass";
import { InternalSigmaMark } from "@/components/internal/InternalSigmaMark";

export function ComingSoonMessages() {
  return (
    <section className="internal-profile-enter px-0">
      <GlassSurface className="flex min-h-[62dvh] flex-col justify-center rounded-none px-6 py-12 sm:rounded-[1.75rem] sm:px-10 lg:px-14">
        <p className="font-display text-[10px] uppercase tracking-[0.32em] text-[#bde0fe]/80">
          Messages
        </p>
        <div className="mt-8 flex items-end gap-4">
          <InternalSigmaMark className="mb-1 h-8 w-8 text-white/80" />
          <h1 className="font-display text-[2.15rem] font-medium leading-none tracking-[0.12em] text-white sm:text-[2.45rem]">
            Coming soon
          </h1>
        </div>
        <div className="glass-divider mt-8 max-w-16" />
        <p className="mt-8 max-w-[34ch] text-[16px] leading-[1.65] text-cadet">
          Private team messaging is not built yet. This space stays empty on purpose.
        </p>
        <p className="mt-5 max-w-[38ch] text-[13px] leading-relaxed text-cadet/70">
          When it ships, conversation between SIGMA operators will live here — not on public channels.
        </p>
      </GlassSurface>
    </section>
  );
}
