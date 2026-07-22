type ServiceRiskDisclosureProps = {
  text: string;
};

export function ServiceRiskDisclosure({ text }: ServiceRiskDisclosureProps) {
  return (
    <aside
      className="rounded-2xl border border-[#1c39bb]/30 bg-[#1c39bb]/10 p-5 text-sm leading-relaxed text-[#d6dbe1] sm:p-6"
      role="note"
    >
      {text}
    </aside>
  );
}
