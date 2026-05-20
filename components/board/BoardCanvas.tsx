"use client";

import { useBoardStore } from "@/stores/useBoardStore";
import { DraggableElement } from "./elements/DraggableElement";
import { PhotoElementView } from "./elements/PhotoElementView";
import { TextElementView } from "./elements/TextElementView";
import { StickerElementView } from "./elements/StickerElementView";
import { DecorationElementView } from "./elements/DecorationElementView";
import {
  PhotoElement,
  TextElement,
  StickerElement,
  DecorationElement,
} from "@/types/board";

export function BoardCanvas() {
  const board = useBoardStore((s) => s.board);
  const selectElement = useBoardStore((s) => s.selectElement);

  if (!board) return null;

  const bg = board.background;
  const bgStyle: React.CSSProperties = {
    backgroundColor:
      bg.type === "color"
        ? bg.value
        : bg.value === "dots" || bg.value === "grid" || bg.value === "lines"
          ? "#F5E6D3"
          : "#FFF8F0",
    width: board.canvasWidth,
    height: board.canvasHeight,
  };

  const patternClass =
    bg.type === "pattern"
      ? bg.value === "dots"
        ? "pattern-dots"
        : bg.value === "grid"
          ? "pattern-grid"
          : bg.value === "lines"
            ? "pattern-lines"
            : ""
      : "";

  const patternColor = bg.patternColor || "rgba(0,0,0,0.08)";

  const sortedElements = [...board.elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg border border-soft-brown/20"
      style={bgStyle}
      onClick={() => selectElement(null)}
    >
      {/* Pattern overlay */}
      {patternClass && (
        <div
          className={`absolute inset-0 ${patternClass} pointer-events-none`}
          style={{ color: patternColor, opacity: 0.3 }}
        />
      )}

      {/* Elements */}
      {sortedElements.map((el) => (
        <DraggableElement key={el.id} element={el}>
          {el.type === "photo" && (
            <PhotoElementView element={el as PhotoElement} />
          )}
          {el.type === "text" && (
            <TextElementView element={el as TextElement} />
          )}
          {el.type === "sticker" && (
            <StickerElementView element={el as StickerElement} />
          )}
          {el.type === "decoration" && (
            <DecorationElementView element={el as DecorationElement} />
          )}
        </DraggableElement>
      ))}
    </div>
  );
}
