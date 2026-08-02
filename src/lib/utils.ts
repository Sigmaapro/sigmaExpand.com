/**
 * Small class-name helper used by local UI primitives.
 *
 * The project does not use shadcn's optional clsx/tailwind-merge packages, so
 * keep this dependency-free while retaining the familiar cn() API.
 */
export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
