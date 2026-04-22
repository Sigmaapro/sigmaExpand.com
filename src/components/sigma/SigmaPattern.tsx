export function SigmaPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id="sigma-tile"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M10 100 L60 20 L110 100 M35 70 L85 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-persian/15"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sigma-tile)" />
    </svg>
  );
}
