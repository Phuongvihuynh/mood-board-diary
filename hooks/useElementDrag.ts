"use client";

import { useCallback, useRef } from "react";
import { useBoardStore } from "@/stores/useBoardStore";

const DRAG_THRESHOLD = 3;

export function useElementDrag(elementId: string) {
  const updateElement = useBoardStore((s) => s.updateElement);
  const startRef = useRef<{
    x: number;
    y: number;
    mx: number;
    my: number;
    dragging: boolean;
  } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      const el = useBoardStore.getState().board?.elements.find((e) => e.id === elementId);
      if (!el) return;

      startRef.current = { x: el.x, y: el.y, mx: e.clientX, my: e.clientY, dragging: false };
      const target = e.currentTarget as HTMLElement;

      const onMove = (ev: PointerEvent) => {
        if (!startRef.current) return;
        const dx = ev.clientX - startRef.current.mx;
        const dy = ev.clientY - startRef.current.my;

        // Only start dragging after threshold
        if (!startRef.current.dragging) {
          if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
          startRef.current.dragging = true;
          target.setPointerCapture(ev.pointerId);
        }

        updateElement(elementId, {
          x: startRef.current.x + dx,
          y: startRef.current.y + dy,
        });
      };

      const onUp = () => {
        startRef.current = null;
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
      };

      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
    },
    [elementId, updateElement]
  );

  return { onPointerDown };
}
