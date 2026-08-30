import { GlassDivider } from "@/components/internal/glass/Glass";

export function ProfileFormSection({
  title,
  children,
  divider = true,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section className="space-y-3 sm:space-y-5">
      <header>
        <h2 className="font-display text-[10px] uppercase tracking-[0.22em] text-[#bde0fe]/80 sm:text-[11px] sm:tracking-[0.26em]">
          {title}
        </h2>
      </header>
      <div className="space-y-3 sm:space-y-4">{children}</div>
      {divider ? <GlassDivider /> : null}
    </section>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-[12px] font-medium text-white/90 sm:text-[13px]">
        {children}
      </label>
      {hint ? <span className="text-[10px] text-cadet/70 sm:text-[11px]">{hint}</span> : null}
    </div>
  );
}
