"use client";

import { useState } from "react";
import { useCardStore } from "@/stores/useCardStore";
import {
  TYPEWRITER_STICKERS,
  TYPEWRITER_STICKER_CATEGORIES,
  type TypewriterStickerCategory,
} from "@/lib/typewriter-stickers";
import type { TypewriterOverlay, TypewriterStickerDef } from "@/types/typewriter";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function TypewriterStickerPanel() {
  const { addOverlay, paperWidth, paperHeight } = useCardStore();
  const [activeCategory, setActiveCategory] =
    useState<TypewriterStickerCategory>("All");

  const filtered =
    activeCategory === "All"
      ? TYPEWRITER_STICKERS
      : TYPEWRITER_STICKERS.filter((s) => s.category === activeCategory);

  const handleStickerClick = async (sticker: TypewriterStickerDef) => {
    const res = await fetch(sticker.src);
    const text = await res.text();
    const dataUrl = `data:image/svg+xml;base64,${btoa(text)}`;

    const overlay: TypewriterOverlay = {
      id: generateId(),
      type: "sticker",
      src: dataUrl,
      x: (paperWidth - sticker.width) / 2,
      y: (paperHeight - sticker.height) / 2,
      width: sticker.width,
      height: sticker.height,
      rotation: 0,
      frame: "none",
    };

    addOverlay(overlay);
  };

  return (
    <div className="p-4 border-b border-warm-brown/20">
      <h3 className="text-sm font-semibold text-warm-brown mb-3">Stickers</h3>

      <div className="flex flex-wrap gap-1 mb-3">
        {TYPEWRITER_STICKER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              activeCategory === cat
                ? "bg-warm-brown text-cream"
                : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {filtered.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => handleStickerClick(sticker)}
            title={sticker.name}
            className="aspect-square rounded border border-warm-brown/15 bg-cream hover:border-warm-brown/40 hover:bg-parchment transition-colors p-1"
          >
            <img
              src={sticker.src}
              alt={sticker.name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
