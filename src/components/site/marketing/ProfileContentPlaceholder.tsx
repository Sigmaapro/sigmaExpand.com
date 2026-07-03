type Props = {
  label?: string;
  lines?: number;
  pills?: number;
  blocks?: number;
  className?: string;
};

export function ProfileContentPlaceholder({
  label = "Profile data pending",
  lines = 0,
  pills = 0,
  blocks = 0,
  className = "",
}: Props) {
  return (
    <div className={`rounded-xl border border-dashed border-white/[0.14] bg-white/[0.02] p-4 ${className}`}>
      <p className="text-xs uppercase tracking-[0.12em] text-[#8f98a3]">{label}</p>

      {lines > 0 ? (
        <div className="mt-3 space-y-2" aria-hidden="true">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={`line-${index}`}
              className={`h-2 rounded-full bg-white/[0.08] ${index === lines - 1 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      ) : null}

      {pills > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2" aria-hidden="true">
          {Array.from({ length: pills }).map((_, index) => (
            <span key={`pill-${index}`} className="inline-flex h-7 w-24 rounded-full border border-white/[0.1] bg-white/[0.04]" />
          ))}
        </div>
      ) : null}

      {blocks > 0 ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2" aria-hidden="true">
          {Array.from({ length: blocks }).map((_, index) => (
            <div key={`block-${index}`} className="h-16 rounded-lg border border-white/[0.08] bg-white/[0.03]" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
