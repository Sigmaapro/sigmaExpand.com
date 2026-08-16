const PALETTES = [
  ["#1D89BB", "#1D3ABB", "#4F1DBB"],
  ["#1D3ABB", "#4F1DBB", "#1D89BB"],
  ["#4F1DBB", "#1D89BB", "#1D3ABB"],
] as const;

/**
 * Abstract SIGMA surface (SVG data URI) for ReactBits slides that require an image.
 * No photography, no coin artwork — brand blues on #05070D.
 */
export function createSigmaSurfaceUri(seed: number): string {
  const [a, b, c] = PALETTES[((seed % PALETTES.length) + PALETTES.length) % PALETTES.length]!;
  const ox = 18 + ((seed * 19) % 64);
  const oy = 12 + ((seed * 13) % 56);
  const ox2 = 70 - ((seed * 11) % 40);
  const oy2 = 78 - ((seed * 7) % 36);
  const rot = (seed * 23) % 50;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
  <rect width="600" height="800" fill="#05070D"/>
  <defs>
    <radialGradient id="s${seed}a" cx="${ox}%" cy="${oy}%" r="72%">
      <stop offset="0%" stop-color="${a}" stop-opacity="0.52"/>
      <stop offset="48%" stop-color="${b}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#05070D" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="s${seed}b" cx="${ox2}%" cy="${oy2}%" r="64%">
      <stop offset="0%" stop-color="${c}" stop-opacity="0.42"/>
      <stop offset="60%" stop-color="${b}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#05070D" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="s${seed}e" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#BDE0FE" stop-opacity="0.18"/>
      <stop offset="45%" stop-color="#1D3ABB" stop-opacity="0"/>
      <stop offset="100%" stop-color="#4F1DBB" stop-opacity="0.14"/>
    </linearGradient>
  </defs>
  <rect width="600" height="800" fill="url(#s${seed}a)"/>
  <rect width="600" height="800" fill="url(#s${seed}b)"/>
  <g transform="translate(300 400) rotate(${rot}) translate(-300 -400)" fill="${a}" opacity="0.14">
    <polygon points="300,96 428,214 372,508 228,508 172,214"/>
    <polygon points="300,168 214,430 386,430"/>
  </g>
  <g stroke="rgba(189,224,254,0.12)" stroke-width="1" fill="none">
    <path d="M0 160 H600 M0 320 H600 M0 480 H600 M0 640 H600"/>
    <path d="M120 0 V800 M240 0 V800 M360 0 V800 M480 0 V800"/>
  </g>
  <rect width="600" height="800" fill="url(#s${seed}e)"/>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
