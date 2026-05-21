import {
  Caveat,
  Indie_Flower,
  Kalam,
  Dancing_Script,
  Patrick_Hand,
  Gloria_Hallelujah,
  Special_Elite,
  Homemade_Apple,
  Sacramento,
  Great_Vibes,
  Pacifico,
  Satisfy,
  Amatic_SC,
  Shadows_Into_Light,
  Architects_Daughter,
  Allura,
  Alex_Brush,
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

export const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-homemade-apple",
  display: "swap",
});

export const sacramento = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sacramento",
  display: "swap",
});

export const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

export const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
  display: "swap",
});

export const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amatic-sc",
  display: "swap",
});

export const shadowsIntoLight = Shadows_Into_Light({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shadows-into-light",
  display: "swap",
});

export const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  display: "swap",
});

export const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

export const fontVariables = [
  caveat.variable,
  indieFlower.variable,
  kalam.variable,
  dancingScript.variable,
  patrickHand.variable,
  gloriaHallelujah.variable,
  specialElite.variable,
  homemadeApple.variable,
  sacramento.variable,
  greatVibes.variable,
  pacifico.variable,
  satisfy.variable,
  amaticSC.variable,
  shadowsIntoLight.variable,
  architectsDaughter.variable,
  alexBrush.variable,
  allura.variable,
].join(" ");

export const FONT_FAMILY_MAP: Record<string, string> = {
  caveat: "var(--font-caveat)",
  "indie-flower": "var(--font-indie-flower)",
  kalam: "var(--font-kalam)",
  "dancing-script": "var(--font-dancing-script)",
  "patrick-hand": "var(--font-patrick-hand)",
  "gloria-hallelujah": "var(--font-gloria-hallelujah)",
};
