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
    <section className="internal-profile-form-section">
      <header>
        <h2 className="internal-profile-form-section-title font-display">{title}</h2>
      </header>
      <div className="internal-profile-form-section-body">{children}</div>
      {divider ? <GlassDivider className="internal-profile-form-section-divider" /> : null}
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
      <label htmlFor={htmlFor} className="internal-profile-field-label">
        {children}
      </label>
      {hint ? <span className="internal-profile-field-hint">{hint}</span> : null}
    </div>
  );
}
