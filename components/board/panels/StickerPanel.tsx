"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { stickers, StickerInfo } from "@/lib/stickers";

const categories = [
  { id: "emoji", label: "Emoji" },
  { id: "cute", label: "Cute" },
  { id: "nature", label: "Nature" },
] as const;

export function StickerPanel() {
  const [category, setCategory] = useState<string>("emoji");
  const addElement = useBoardStore((s) => s.addElement);

  const filtered = stickers.filter((s) => s.category === category);

  const handleAdd = (sticker: StickerInfo) => {
    addElement({
      type: "sticker",
      stickerId: sticker.id,
      src: sticker.src,
      x: 200 + Math.random() * 300,
      y: 150 + Math.random() * 200,
      width: 60,
      height: 60,
      rotation: Math.random() * 20 - 10,
      opacity: 1,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Stickers</h3>

      {/* Category tabs */}
      <div className="flex gap-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors ${
              category === cat.id
                ? "bg-warm-pink/20 text-foreground font-medium"
                : "hover:bg-soft-brown/10 text-soft-brown"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <div className="grid grid-cols-4 gap-2">
        {filtered.map((sticker) => (
          <motion.button
            key={sticker.id}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleAdd(sticker)}
            className="aspect-square rounded-xl bg-white/50 border border-soft-brown/10 p-2 cursor-pointer hover:shadow-sm transition-shadow flex items-center justify-center"
            title={sticker.name}
          >
            <img
              src={sticker.src}
              alt={sticker.name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
