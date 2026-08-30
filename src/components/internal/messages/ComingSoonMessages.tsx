import { GlassSurface } from "@/components/internal/glass/Glass";
import { InternalSigmaMark } from "@/components/internal/InternalSigmaMark";

export function ComingSoonMessages() {
  return (
    <section className="internal-profile-enter">
      <GlassSurface className="flex min-h-[52dvh] flex-col justify-center rounded-2xl px-4 py-8 sm:min-h-[62dvh] sm:rounded-[1.75rem] sm:px-10 sm:py-12 lg:px-14">
        <p className="font-display text-[10px] uppercase tracking-[0.28em] text-[#bde0fe]/80 sm:tracking-[0.32em]">
          Messages
        </p>
        <div className="mt-5 flex items-end gap-3 sm:mt-8 sm:gap-4">
          <InternalSigmaMark className="mb-1 h-7 w-7 text-white/80 sm:h-8 sm:w-8" />
          <h1 className="font-display text-[1.85rem] font-medium leading-none tracking-[0.1em] text-white sm:text-[2.45rem] sm:tracking-[0.12em]">
            Coming soon
          </h1>
        </div>
        <div className="glass-divider mt-5 max-w-16 sm:mt-8" />
        <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-cadet sm:mt-8 sm:text-[16px] sm:leading-[1.65]">
          Private team messaging is not built yet. This space stays empty on purpose.
        </p>
        <p className="mt-4 max-w-[38ch] text-[12px] leading-relaxed text-cadet/70 sm:mt-5 sm:text-[13px]">
          When it ships, conversation between SIGMA operators will live here — not on public channels.
        </p>
      </GlassSurface>
    </section>
  );
}
