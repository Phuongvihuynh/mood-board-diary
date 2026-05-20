export interface StickerInfo {
  id: string;
  name: string;
  src: string;
  category: "emoji" | "cute" | "nature";
}

export const stickers: StickerInfo[] = [
  // Emoji
  { id: "heart", name: "Heart", src: "/stickers/emoji/heart.svg", category: "emoji" },
  { id: "star", name: "Star", src: "/stickers/emoji/star.svg", category: "emoji" },
  { id: "sparkle", name: "Sparkle", src: "/stickers/emoji/sparkle.svg", category: "emoji" },
  { id: "sun", name: "Sun", src: "/stickers/emoji/sun.svg", category: "emoji" },
  { id: "moon", name: "Moon", src: "/stickers/emoji/moon.svg", category: "emoji" },
  { id: "cloud", name: "Cloud", src: "/stickers/emoji/cloud.svg", category: "emoji" },
  { id: "rainbow", name: "Rainbow", src: "/stickers/emoji/rainbow.svg", category: "emoji" },

  // Cute
  { id: "bow", name: "Bow", src: "/stickers/cute/bow.svg", category: "cute" },
  { id: "cherry", name: "Cherry", src: "/stickers/cute/cherry.svg", category: "cute" },
  { id: "cupcake", name: "Cupcake", src: "/stickers/cute/cupcake.svg", category: "cute" },
  { id: "crown", name: "Crown", src: "/stickers/cute/crown.svg", category: "cute" },
  { id: "diamond", name: "Diamond", src: "/stickers/cute/diamond.svg", category: "cute" },
  { id: "music-note", name: "Music Note", src: "/stickers/cute/music-note.svg", category: "cute" },
  { id: "candy", name: "Candy", src: "/stickers/cute/candy.svg", category: "cute" },

  // Nature
  { id: "leaf", name: "Leaf", src: "/stickers/nature/leaf.svg", category: "nature" },
  { id: "butterfly", name: "Butterfly", src: "/stickers/nature/butterfly.svg", category: "nature" },
  { id: "flower", name: "Flower", src: "/stickers/nature/flower.svg", category: "nature" },
  { id: "tulip", name: "Tulip", src: "/stickers/nature/tulip.svg", category: "nature" },
  { id: "mushroom", name: "Mushroom", src: "/stickers/nature/mushroom.svg", category: "nature" },
  { id: "daisy", name: "Daisy", src: "/stickers/nature/daisy.svg", category: "nature" },
];
