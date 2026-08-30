import { GlassSurface } from "@/components/internal/glass/Glass";

function UnavailableFrame({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <GlassSurface className="rounded-none px-5 py-10 sm:rounded-[1.75rem] sm:px-10">
      <p className="font-display text-[10px] uppercase tracking-[0.32em] text-[#bde0fe]/80">Profile</p>
      <h1 className="mt-4 font-display text-[1.85rem] font-medium leading-[1.08] tracking-tight text-white">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cadet">{body}</p>
    </GlassSurface>
  );
}

export function UnprovisionedProfile() {
  return (
    <UnavailableFrame
      title="Profile unavailable"
      body="Your team profile has not been provisioned yet."
    />
  );
}

export function ProfileLoadError() {
  return (
    <UnavailableFrame title="Profile unavailable" body="Could not load your profile." />
  );
}
