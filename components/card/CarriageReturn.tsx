"use client";

import { CARRIAGE } from "@/lib/typewriter-constants";
import { useCarriageDrag } from "@/hooks/useCarriageDrag";
import { useCardStore } from "@/stores/useCardStore";

interface CarriageReturnProps {
  onReturn: () => void;
}

export default function CarriageReturn({ onReturn }: CarriageReturnProps) {
  const paperWidth = useCardStore((s) => s.paperWidth);
  const { handleRef, onPointerDown, onPointerMove, onPointerUp } =
    useCarriageDrag({
      trackWidth: paperWidth,
      onReturn,
    });

  return (
    <div
      className="relative select-none"
      style={{
        width: paperWidth,
        height: CARRIAGE.trackHeight,
      }}
    >
      {/* Track bar */}
      <div className="absolute inset-0 rounded-t bg-warm-brown/20 border border-warm-brown/30" />

      {/* Track groove */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-2 right-2 h-1 rounded bg-warm-brown/15"
      />

      {/* Draggable handle */}
      <div
        ref={handleRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="absolute top-1 cursor-grab active:cursor-grabbing"
        style={{
          width: CARRIAGE.handleWidth,
          height: CARRIAGE.trackHeight - 8,
          transform: "translateX(0px)",
          touchAction: "none",
        }}
      >
        {/* Handle body */}
        <div className="w-full h-full rounded bg-warm-brown shadow-md flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-white/30 rounded" />
            <div className="w-0.5 h-3 bg-white/30 rounded" />
            <div className="w-0.5 h-3 bg-white/30 rounded" />
          </div>
        </div>

        {/* Ding indicator */}
        <div
          data-ding
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-warm-brown whitespace-nowrap pointer-events-none transition-opacity"
          style={{ opacity: 0 }}
        >
          ding!
        </div>
      </div>
    </div>
  );
}
