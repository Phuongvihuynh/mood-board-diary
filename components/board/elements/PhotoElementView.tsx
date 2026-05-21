"use client";

import { PhotoElement } from "@/types/board";

interface PhotoElementViewProps {
  element: PhotoElement;
}

export function PhotoElementView({ element }: PhotoElementViewProps) {
  const frame = element.frame;

  if (frame === "polaroid") {
    return (
      <div className="w-full h-full bg-white p-2 pb-8 shadow-md rounded-sm">
        <img
          src={element.src}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    );
  }

  if (frame === "tape-corners") {
    return (
      <div className="w-full h-full relative">
        <img
          src={element.src}
          alt=""
          className="w-full h-full object-cover rounded-sm"
          draggable={false}
        />
        <div className="absolute -top-1 -left-1 w-6 h-3 bg-amber-100/70 rotate-[-20deg] rounded-sm" />
        <div className="absolute -top-1 -right-1 w-6 h-3 bg-amber-100/70 rotate-[20deg] rounded-sm" />
        <div className="absolute -bottom-1 -left-1 w-6 h-3 bg-amber-100/70 rotate-[20deg] rounded-sm" />
        <div className="absolute -bottom-1 -right-1 w-6 h-3 bg-amber-100/70 rotate-[-20deg] rounded-sm" />
      </div>
    );
  }

  if (frame === "rounded") {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-md">
        <img
          src={element.src}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
    );
  }

  if (frame === "shadow") {
    return (
      <div className="w-full h-full shadow-[4px_4px_15px_rgba(0,0,0,0.2)] rounded-sm">
        <img
          src={element.src}
          alt=""
          className="w-full h-full object-cover rounded-sm"
          draggable={false}
        />
      </div>
    );
  }

  if (frame === "vintage") {
    return (
      <div className="w-full h-full bg-amber-50 p-2.5 shadow-md rounded-sm border border-amber-200/60">
        <div className="w-full h-full overflow-hidden rounded-sm relative">
          <img
            src={element.src}
            alt=""
            className="w-full h-full object-cover sepia-[.2] contrast-[1.05]"
            draggable={false}
          />
        </div>
      </div>
    );
  }

  // none
  return (
    <img
      src={element.src}
      alt=""
      className="w-full h-full object-cover rounded-sm"
      draggable={false}
    />
  );
}
