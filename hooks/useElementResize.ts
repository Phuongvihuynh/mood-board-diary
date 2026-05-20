"use client";

import { useCallback, useRef } from "react";
import { useBoardStore } from "@/stores/useBoardStore";

export function useElementResize(elementId: string) {
  const updateElement = useBoardStore((s) => s.updateElement);
  const startRef = useRef<{
    w: number;
    h: number;
    x: number;
    y: number;
    mx: number;
    my: number;
    corner: string;
  } | null>(null);

  const onResizePointerDown = useCallback(
    (corner: string) => (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const el = useBoardStore.getState().board?.elements.find((e) => e.id === elementId);
      if (!el) return;

      startRef.current = {
        w: el.width,
        h: el.height,
        x: el.x,
        y: el.y,
        mx: e.clientX,
        my: e.clientY,
        corner,
      };
      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        if (!startRef.current) return;
        const s = startRef.current;
        const dx = ev.clientX - s.mx;
        const dy = ev.clientY - s.my;

        let newW = s.w;
        let newH = s.h;
        let newX = s.x;
        let newY = s.y;

        if (s.corner.includes("e")) newW = Math.max(30, s.w + dx);
        if (s.corner.includes("w")) {
          newW = Math.max(30, s.w - dx);
          newX = s.x + dx;
        }
        if (s.corner.includes("s")) newH = Math.max(30, s.h + dy);
        if (s.corner.includes("n")) {
          newH = Math.max(30, s.h - dy);
          newY = s.y + dy;
        }

        updateElement(elementId, { width: newW, height: newH, x: newX, y: newY });
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

  return { onResizePointerDown };
}
