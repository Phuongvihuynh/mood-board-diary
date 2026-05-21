import type { TypewriterStickerDef } from "@/types/typewriter";

export const TYPEWRITER_STICKER_CATEGORIES = [
  "All",
  "Vintage",
  "Nature",
  "Paper",
] as const;

export type TypewriterStickerCategory =
  (typeof TYPEWRITER_STICKER_CATEGORIES)[number];

export const TYPEWRITER_STICKERS: TypewriterStickerDef[] = [
  // Vintage
  {
    id: "wax-seal",
    name: "Wax Seal",
    category: "Vintage",
    src: "/stickers/wax-seal.svg",
    width: 80,
    height: 80,
  },
  {
    id: "postage-stamp",
    name: "Postage Stamp",
    category: "Vintage",
    src: "/stickers/typewriter/postage-stamp.svg",
    width: 70,
    height: 80,
  },
  {
    id: "postcard",
    name: "Postcard",
    category: "Vintage",
    src: "/stickers/typewriter/postcard.svg",
    width: 100,
    height: 70,
  },
  {
    id: "envelope",
    name: "Envelope",
    category: "Vintage",
    src: "/stickers/typewriter/envelope.svg",
    width: 90,
    height: 70,
  },
  // Nature
  {
    id: "butterfly",
    name: "Butterfly",
    category: "Nature",
    src: "/stickers/butterfly.svg",
    width: 80,
    height: 80,
  },
  {
    id: "pressed-flower",
    name: "Pressed Flower",
    category: "Nature",
    src: "/stickers/typewriter/pressed-flower.svg",
    width: 80,
    height: 80,
  },
  {
    id: "leaf",
    name: "Leaf",
    category: "Nature",
    src: "/stickers/leaf.svg",
    width: 80,
    height: 80,
  },
  {
    id: "coffee-stain",
    name: "Coffee Stain",
    category: "Nature",
    src: "/stickers/typewriter/coffee-stain.svg",
    width: 80,
    height: 80,
  },
  // Paper
  {
    id: "tape-strip",
    name: "Tape Strip",
    category: "Paper",
    src: "/stickers/typewriter/tape-strip.svg",
    width: 100,
    height: 40,
  },
  {
    id: "paper-clip",
    name: "Paper Clip",
    category: "Paper",
    src: "/stickers/typewriter/paper-clip.svg",
    width: 40,
    height: 80,
  },
];
