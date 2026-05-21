"use client";

import { useCardStore } from "@/stores/useCardStore";
import DraggableOverlay from "./DraggableOverlay";

export default function OverlayLayer() {
  const overlays = useCardStore((s) => s.overlays);
  const selectedOverlayId = useCardStore((s) => s.selectedOverlayId);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20 }}
    >
      {overlays.map((overlay) => (
        <DraggableOverlay
          key={overlay.id}
          overlay={overlay}
          isSelected={overlay.id === selectedOverlayId}
        />
      ))}
    </div>
  );
}
