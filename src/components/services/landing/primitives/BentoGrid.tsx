import type { ReactNode } from "react";

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

/** Magic UI Bento Grid — layout primitive (adapted). */
export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5 ${className}`}
    >
      {children}
    </div>
  );
}

type BentoCardProps = {
  title: string;
  body: string;
  index?: number;
  className?: string;
  children?: ReactNode;
};

export function BentoCard({ title, body, index, className = "", children }: BentoCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#07090f]/70 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#1D89BB]/35 hover:shadow-[0_0_0_1px_rgba(29,137,187,0.12),0_18px_40px_rgba(2,8,22,0.35)] motion-reduce:transform-none sm:p-7 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 70% at 0% 0%, rgba(29,137,187,0.12), transparent 55%), radial-gradient(70% 60% at 100% 100%, rgba(79,29,187,0.1), transparent 50%)",
        }}
        aria-hidden="true"
      />
      {typeof index === "number" ? (
        <span className="relative z-[1] font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D89BB]">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <h3 className="relative z-[1] mt-3 font-display text-lg font-semibold tracking-tight text-white md:text-xl">
        {title}
      </h3>
      {body ? (
        <p className="relative z-[1] mt-3 text-sm leading-relaxed text-[#b6bcc4] md:text-[15px]">{body}</p>
      ) : null}
      {children}
    </article>
  );
}
