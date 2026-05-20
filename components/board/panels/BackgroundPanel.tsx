"use client";

import { useBoardStore } from "@/stores/useBoardStore";
import { BACKGROUND_COLORS, BACKGROUND_PATTERNS } from "@/lib/constants";

export function BackgroundPanel() {
  const board = useBoardStore((s) => s.board);
  const setBackground = useBoardStore((s) => s.setBackground);

  if (!board) return null;

  const currentBg = board.background;

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Background</h3>

      {/* Colors */}
      <div>
        <p className="text-sm text-soft-brown mb-2">Color</p>
        <div className="flex flex-wrap gap-2">
          {BACKGROUND_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() =>
                setBackground({
                  type: currentBg.type === "pattern" ? "pattern" : "color",
                  value: currentBg.type === "pattern" ? currentBg.value : c.value,
                  patternColor: currentBg.patternColor,
                })
              }
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${
                (currentBg.type === "color" && currentBg.value === c.value)
                  ? "border-warm-pink scale-110"
                  : "border-soft-brown/20"
              }`}
              style={{ backgroundColor: c.value }}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Patterns */}
      <div>
        <p className="text-sm text-soft-brown mb-2">Pattern</p>
        <div className="grid grid-cols-2 gap-2">
          {BACKGROUND_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                if (p.id === "none") {
                  setBackground({
                    type: "color",
                    value: currentBg.type === "color" ? currentBg.value : "#FFF8F0",
                  });
                } else {
                  setBackground({
                    type: "pattern",
                    value: p.id,
                    patternColor: "rgba(0,0,0,0.08)",
                  });
                }
              }}
              className={`px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                (p.id === "none" && currentBg.type === "color") ||
                (currentBg.type === "pattern" && currentBg.value === p.id)
                  ? "bg-warm-pink/20 font-medium"
                  : "bg-white/50 hover:bg-soft-brown/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
