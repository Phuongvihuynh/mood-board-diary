export type FrameType =
  | "none"
  | "polaroid"
  | "vintage-gold"
  | "tape-corners"
  | "torn-paper"
  | "stamp-border";

export interface TypewriterOverlay {
  id: string;
  type: "sticker" | "image";
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  frame: FrameType;
}

export interface FrameTemplate {
  id: FrameType;
  name: string;
  description: string;
}

export interface TypewriterStickerDef {
  id: string;
  name: string;
  category: "Vintage" | "Nature" | "Paper";
  src: string;
  width: number;
  height: number;
}
