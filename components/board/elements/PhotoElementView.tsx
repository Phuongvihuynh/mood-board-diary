"use client";

import { PhotoElement } from "@/types/board";

interface PhotoElementViewProps {
  element: PhotoElement;
}

export function PhotoElementView({ element }: PhotoElementViewProps) {
  const frameClass =
    element.frame === "polaroid"
      ? "bg-white p-2 pb-8 shadow-md rounded-sm"
      : element.frame === "tape-corners"
        ? "relative"
        : "";

  return (
    <div className={`w-full h-full ${frameClass}`}>
      <img
        src={element.src}
        alt=""
        className="w-full h-full object-cover rounded-sm"
        draggable={false}
      />
      {element.frame === "tape-corners" && (
        <>
          <div className="absolute -top-1 -left-1 w-6 h-3 bg-amber-100/70 rotate-[-20deg] rounded-sm" />
          <div className="absolute -top-1 -right-1 w-6 h-3 bg-amber-100/70 rotate-[20deg] rounded-sm" />
        </>
      )}
    </div>
  );
}
