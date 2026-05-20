import {
  Caveat,
  Indie_Flower,
  Kalam,
  Dancing_Script,
  Patrick_Hand,
  Gloria_Hallelujah,
} from "next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-flower",
  display: "swap",
});

export const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

export const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick-hand",
  display: "swap",
});

export const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloria-hallelujah",
  display: "swap",
});

export const fontVariables = [
  caveat.variable,
  indieFlower.variable,
  kalam.variable,
  dancingScript.variable,
  patrickHand.variable,
  gloriaHallelujah.variable,
].join(" ");

export const FONT_FAMILY_MAP: Record<string, string> = {
  caveat: "var(--font-caveat)",
  "indie-flower": "var(--font-indie-flower)",
  kalam: "var(--font-kalam)",
  "dancing-script": "var(--font-dancing-script)",
  "patrick-hand": "var(--font-patrick-hand)",
  "gloria-hallelujah": "var(--font-gloria-hallelujah)",
};
