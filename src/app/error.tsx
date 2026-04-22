"use client";

/**
 * Renders inside the root layout when the route segment errors, so the page
 * does not stay an empty white screen (e.g. stale `.next` / missing chunks).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#212529] px-6 font-body text-[#adb5bd]"
      style={{ backgroundColor: "#212529", minHeight: "100vh" }}
    >
      <p className="max-w-md text-center text-sm leading-relaxed">
        Something went wrong loading this page. If you are in development, stop
        the server, run{" "}
        <code className="rounded bg-black/30 px-1.5 py-0.5 text-[#bde0fe]">
          npm run dev:clean
        </code>
        , then hard-refresh the browser.
      </p>
      {process.env.NODE_ENV === "development" ? (
        <pre className="max-h-40 max-w-full overflow-auto rounded border border-white/10 bg-black/40 p-3 text-left text-xs text-[#e9ecef]">
          {error.message}
        </pre>
      ) : null}
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#1c39bb]/50 hover:bg-[#1c39bb]/20"
      >
        Try again
      </button>
    </div>
  );
}
