"use client";

import { useCallback, useRef } from "react";
import { useBoardStore } from "@/stores/useBoardStore";

export function useElementRotate(elementId: string) {
  const updateElement = useBoardStore((s) => s.updateElement);
  const centerRef = useRef<{ cx: number; cy: number; startAngle: number; rotation: number } | null>(null);

  const onRotatePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const el = useBoardStore.getState().board?.elements.find((e) => e.id === elementId);
      if (!el) return;

      // Calculate center of the element in screen coords
      const parent = (e.currentTarget as HTMLElement).closest("[data-element-wrapper]");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const startAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);

      centerRef.current = { cx, cy, startAngle, rotation: el.rotation };

      const target = e.currentTarget as HTMLElement;
      target.setPointerCapture(e.pointerId);

      const onMove = (ev: PointerEvent) => {
        if (!centerRef.current) return;
        const c = centerRef.current;
        const currentAngle = Math.atan2(ev.clientY - c.cy, ev.clientX - c.cx) * (180 / Math.PI);
        const delta = currentAngle - c.startAngle;
        updateElement(elementId, { rotation: c.rotation + delta });
      };

      const onUp = () => {
        centerRef.current = null;
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
      };

      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
    },
    [elementId, updateElement]
  );

  return { onRotatePointerDown };
}
