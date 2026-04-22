import { InsightsChrome } from "@/components/insights/InsightsChrome";

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0c12] font-body text-[#adb5bd] antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(28,57,187,0.12),transparent_50%)]" />
      <div className="relative z-10">
        <InsightsChrome />
        {children}
      </div>
    </div>
  );
}
