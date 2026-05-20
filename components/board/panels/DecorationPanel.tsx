"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { decorations, DecorationInfo } from "@/lib/decorations";

const variants = [
  { id: "washi-tape", label: "Washi" },
  { id: "scotch-tape", label: "Tape" },
  { id: "torn-paper", label: "Paper" },
  { id: "paper-clip", label: "Clips" },
] as const;

export function DecorationPanel() {
  const [variant, setVariant] = useState<string>("washi-tape");
  const addElement = useBoardStore((s) => s.addElement);

  const filtered = decorations.filter((d) => d.variant === variant);

  const handleAdd = (dec: DecorationInfo) => {
    addElement({
      type: "decoration",
      variant: dec.variant,
      src: dec.src,
      x: 150 + Math.random() * 300,
      y: 100 + Math.random() * 300,
      width: dec.defaultWidth,
      height: dec.defaultHeight,
      rotation: Math.random() * 10 - 5,
      opacity: dec.variant === "scotch-tape" ? 0.7 : 0.9,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Decorations</h3>

      <div className="flex gap-1 flex-wrap">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            className={`px-3 py-1 rounded-lg text-sm cursor-pointer transition-colors ${
              variant === v.id
                ? "bg-warm-pink/20 text-foreground font-medium"
                : "hover:bg-soft-brown/10 text-soft-brown"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filtered.map((dec) => (
          <motion.button
            key={dec.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAdd(dec)}
            className="rounded-xl bg-white/50 border border-soft-brown/10 p-3 cursor-pointer hover:shadow-sm transition-shadow flex items-center justify-center min-h-[60px]"
            title={dec.name}
          >
            <img
              src={dec.src}
              alt={dec.name}
              className="max-w-full max-h-12 object-contain"
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
