"use client";

import { useCallback, useRef } from "react";
import { useOverlayDrag } from "@/hooks/useOverlayDrag";
import { useCardStore } from "@/stores/useCardStore";
import { getFrameStyles } from "@/lib/frame-templates";
import type { TypewriterOverlay } from "@/types/typewriter";

interface DraggableOverlayProps {
  overlay: TypewriterOverlay;
  isSelected: boolean;
}

export default function DraggableOverlay({
  overlay,
  isSelected,
}: DraggableOverlayProps) {
  const { updateOverlay, removeOverlay, selectOverlay } = useCardStore();

  const onDragEnd = useCallback(
    (x: number, y: number) => {
      updateOverlay(overlay.id, { x, y });
    },
    [overlay.id, updateOverlay]
  );

  const { elementRef, onPointerDown, onPointerMove, onPointerUp } =
    useOverlayDrag({ onDragEnd });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      selectOverlay(overlay.id);
    },
    [overlay.id, selectOverlay]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      removeOverlay(overlay.id);
    },
    [overlay.id, removeOverlay]
  );

  const handleDeletePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
    },
    []
  );

  // Resize logic
  const resizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  // Rotation logic
  const rotating = useRef(false);
  const rotateCenter = useRef({ x: 0, y: 0 });

  const handleRotatePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      rotating.current = true;
      const el = elementRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        rotateCenter.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const handleRotatePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!rotating.current) return;
      const cx = rotateCenter.current.x;
      const cy = rotateCenter.current.y;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      updateOverlay(overlay.id, { rotation: Math.round(angle) });
    },
    [overlay.id, updateOverlay]
  );

  const handleRotatePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!rotating.current) return;
      rotating.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    []
  );

  const handleResizePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      resizing.current = true;
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        w: overlay.width,
        h: overlay.height,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [overlay.width, overlay.height]
  );

  const handleResizePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizing.current) return;
      const dx = e.clientX - resizeStart.current.x;
      const aspectRatio = resizeStart.current.w / resizeStart.current.h;
      const newWidth = Math.max(30, resizeStart.current.w + dx);
      const newHeight = newWidth / aspectRatio;
      updateOverlay(overlay.id, { width: Math.round(newWidth), height: Math.round(newHeight) });
    },
    [overlay.id, updateOverlay]
  );

  const handleResizePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!resizing.current) return;
      resizing.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    },
    []
  );

  const frameStyles =
    overlay.frame !== "none"
      ? getFrameStyles(overlay.frame, overlay.width, overlay.height)
      : {};

  return (
    <div
      ref={elementRef}
      onClick={handleClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="absolute pointer-events-auto select-none"
      style={{
        left: overlay.x,
        top: overlay.y,
        transform: overlay.rotation ? `rotate(${overlay.rotation}deg)` : undefined,
        cursor: "grab",
        touchAction: "none",
        outline: isSelected ? "2px solid #8B6914" : "none",
        outlineOffset: 2,
      }}
    >
      {/* Frame wrapper */}
      <div style={frameStyles}>
        {/* Tape corner decorations */}
        {overlay.frame === "tape-corners" && (
          <>
            <div
              className="absolute -top-2 -left-2 w-8 h-4 bg-amber-100/70 rotate-[-25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -top-2 -right-2 w-8 h-4 bg-amber-100/70 rotate-[25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -bottom-2 -left-2 w-8 h-4 bg-amber-100/70 rotate-[25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
            <div
              className="absolute -bottom-2 -right-2 w-8 h-4 bg-amber-100/70 rotate-[-25deg]"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
            />
          </>
        )}

        <img
          src={overlay.src}
          alt=""
          draggable={false}
          style={{
            width: overlay.width,
            height: overlay.height,
            display: "block",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Rotation handle */}
      {isSelected && (
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: -32, pointerEvents: "auto", zIndex: 10 }}>
          <div
            onPointerDown={handleRotatePointerDown}
            onPointerMove={handleRotatePointerMove}
            onPointerUp={handleRotatePointerUp}
            className="w-5 h-5 rounded-full bg-white border-2 border-[#8B6914] shadow flex items-center justify-center"
            style={{ cursor: "grab", touchAction: "none" }}
          >
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="#8B6914" strokeWidth="1.5" strokeLinecap="round">
              <path d="M12 4a6 6 0 1 0 1.5 4" />
              <polyline points="10 2 12 4 14 2" />
            </svg>
          </div>
          <div className="w-px h-2 bg-[#8B6914]" />
        </div>
      )}

      {/* Delete button */}
      {isSelected && (
        <button
          onClick={handleDelete}
          onPointerDown={handleDeletePointerDown}
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors shadow"
          style={{ pointerEvents: "auto", zIndex: 10 }}
        >
          &times;
        </button>
      )}

      {/* Resize handle */}
      {isSelected && (
        <div
          onPointerDown={handleResizePointerDown}
          onPointerMove={handleResizePointerMove}
          onPointerUp={handleResizePointerUp}
          className="absolute -bottom-2 -right-2 w-5 h-5 rounded-sm bg-white border-2 border-[#8B6914] shadow"
          style={{
            cursor: "nwse-resize",
            pointerEvents: "auto",
            touchAction: "none",
            zIndex: 10,
          }}
        >
          <svg viewBox="0 0 10 10" className="w-full h-full text-[#8B6914]">
            <path d="M8 2L2 8M8 5L5 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}
