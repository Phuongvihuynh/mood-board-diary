import { useRef, useCallback } from "react";
import { CARRIAGE } from "@/lib/typewriter-constants";

interface UseCarriageDragOptions {
  trackWidth: number;
  onReturn: () => void;
}

export function useCarriageDrag({ trackWidth, onReturn }: UseCarriageDragOptions) {
  const handleRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const getProgress = useCallback(() => {
    return Math.min(1, Math.max(0, currentX.current / (trackWidth - CARRIAGE.handleWidth)));
  }, [trackWidth]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const el = handleRef.current;
      if (!el) return;
      dragging.current = true;
      startX.current = e.clientX - currentX.current;
      el.setPointerCapture(e.pointerId);
      el.style.transition = "none";
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const el = handleRef.current;
      if (!el) return;

      const maxX = trackWidth - CARRIAGE.handleWidth;
      const x = Math.min(maxX, Math.max(0, e.clientX - startX.current));
      currentX.current = x;
      el.style.transform = `translateX(${x}px)`;

      // Update ding indicator
      const indicator = el.querySelector("[data-ding]") as HTMLElement | null;
      if (indicator) {
        indicator.style.opacity = x / maxX >= CARRIAGE.returnThreshold ? "1" : "0";
      }
    },
    [trackWidth]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      const el = handleRef.current;
      if (!el) return;
      el.releasePointerCapture(e.pointerId);

      const maxX = trackWidth - CARRIAGE.handleWidth;
      const progress = currentX.current / maxX;

      if (progress >= CARRIAGE.returnThreshold) {
        onReturn();
      }

      // Spring back
      el.style.transition = `transform ${CARRIAGE.springBackDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
      el.style.transform = "translateX(0px)";
      currentX.current = 0;

      const indicator = el.querySelector("[data-ding]") as HTMLElement | null;
      if (indicator) {
        indicator.style.opacity = "0";
      }
    },
    [trackWidth, onReturn]
  );

  return {
    handleRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    getProgress,
  };
}
