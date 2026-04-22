import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        erie: "#212529",
        persian: "#1c39bb",
        cadet: "#adb5bd",
        uranian: "#bde0fe",
      },
      fontFamily: {
        display: [
          '"Neue Haas Grotesk Display"',
          "var(--font-display)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        body: [
          '"Neue Haas Grotesk Text"',
          "var(--font-body)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "sigma-radial":
          "radial-gradient(ellipse 120% 80% at 70% 20%, rgba(28,57,187,0.35) 0%, transparent 55%)",
        "sigma-mesh":
          "linear-gradient(135deg, #212529 0%, #1a1f24 40%, #151a2e 70%, #1c39bb55 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
