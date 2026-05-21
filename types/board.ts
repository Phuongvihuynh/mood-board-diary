export type ElementType = "photo" | "text" | "sticker" | "decoration" | "collage";

export type DecorationVariant =
  | "washi-tape"
  | "scotch-tape"
  | "torn-paper"
  | "paper-clip";

export type PhotoFrame = "none" | "polaroid" | "tape-corners" | "rounded" | "shadow" | "vintage";

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  opacity: number;
}

export interface PhotoElement extends BaseElement {
  type: "photo";
  src: string; // base64
  frame: PhotoFrame;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontFamilyId: string;
  fontSize: number;
  color: string;
  textAlign: "left" | "center" | "right";
}

export interface StickerElement extends BaseElement {
  type: "sticker";
  stickerId: string;
  src: string;
}

export interface DecorationElement extends BaseElement {
  type: "decoration";
  variant: DecorationVariant;
  src: string;
}

export interface CollageSlot {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src?: string;
  zoom?: number; // 1 = default, >1 = zoomed in
}

export interface CollageElement extends BaseElement {
  type: "collage";
  templateId: string;
  slots: CollageSlot[];
  gap: number;
  borderRadius: number;
  backgroundColor: string;
}

export type BoardElement =
  | PhotoElement
  | TextElement
  | StickerElement
  | DecorationElement
  | CollageElement;

export interface BoardBackground {
  type: "color" | "pattern";
  value: string; // hex color or pattern id
  patternColor?: string;
}

export interface BoardData {
  id: string;
  canvasWidth: number;
  canvasHeight: number;
  background: BoardBackground;
  elements: BoardElement[];
  nextZIndex: number;
}

export interface BoardMeta {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  templateId?: string;
  thumbnail?: string;
}
