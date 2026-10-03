import { Archivo, Instrument_Serif } from "next/font/google";
import "./exhibit.css";

const exhibit = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-exhibit",
  display: "swap",
});

const poster = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-poster",
  display: "swap",
});

export default function Token2049Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`sg ${exhibit.variable} ${poster.variable}`} lang="en" dir="ltr">
      {children}
    </div>
  );
}
