"use client";

import { DecorationElement } from "@/types/board";

interface DecorationElementViewProps {
  element: DecorationElement;
}

export function DecorationElementView({ element }: DecorationElementViewProps) {
  return (
    <img
      src={element.src}
      alt={element.variant}
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}
