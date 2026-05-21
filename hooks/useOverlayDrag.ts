import { useRef, useCallback } from "react";

interface UseOverlayDragOptions {
  onDragEnd: (x: number, y: number) => void;
}

export function useOverlayDrag({ onDragEnd }: UseOverlayDragOptions) {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offsetX = useRef(0);
  const offsetY = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = elementRef.current;
      if (!el) return;
      e.stopPropagation();
      dragging.current = true;

      const rect = el.getBoundingClientRect();
      const parentRect = el.offsetParent?.getBoundingClientRect();
      if (!parentRect) return;

      offsetX.current = e.clientX - rect.left;
      offsetY.current = e.clientY - rect.top;

      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const el = elementRef.current;
      if (!el) return;

      const parentRect = el.offsetParent?.getBoundingClientRect();
      if (!parentRect) return;

      const x = e.clientX - parentRect.left - offsetX.current;
      const y = e.clientY - parentRect.top - offsetY.current;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    },
    []
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const el = elementRef.current;
      if (!el) return;
      el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";

      const parentRect = el.offsetParent?.getBoundingClientRect();
      if (!parentRect) return;

      const x = e.clientX - parentRect.left - offsetX.current;
      const y = e.clientY - parentRect.top - offsetY.current;
      onDragEnd(x, y);
    },
    [onDragEnd]
  );

  return {
    elementRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
