"use client";

import { StickerElement } from "@/types/board";

interface StickerElementViewProps {
  element: StickerElement;
}

export function StickerElementView({ element }: StickerElementViewProps) {
  return (
    <img
      src={element.src}
      alt={element.stickerId}
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}
