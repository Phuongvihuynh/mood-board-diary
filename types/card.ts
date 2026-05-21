export type { FrameType, TypewriterOverlay, FrameTemplate, TypewriterStickerDef } from "./typewriter";

export interface CardMeta {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
}

export interface CardData {
  id: string;
  text: string;
  inkColor: string;
  fontSize: number;
  fontFamilyId: string;
  paperWidth: number;
  paperHeight: number;
  paperBackground: string;
  paperLineColor: string;
  paperBackgroundImage: string | null;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlign: "left" | "center" | "right";
  lineSpacing: number;
  overlays: import("./typewriter").TypewriterOverlay[];
  customBackgrounds: { id: string; src: string; name: string }[];
}
