type MarketingPageBackgroundProps = {
  className?: string;
};

export function MarketingPageBackground({ className = "" }: MarketingPageBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`.trim()} aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_5%,rgba(32,73,180,0.18),transparent_40%),radial-gradient(circle_at_90%_15%,rgba(86,130,255,0.14),transparent_35%),linear-gradient(180deg,#05070e_0%,#070b14_45%,#05070e_100%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(171,189,237,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(171,189,237,0.3)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute left-1/2 top-0 h-[580px] w-[580px] -translate-x-1/2 rounded-full bg-[#1d4adb]/20 blur-3xl" />
    </div>
  );
}
