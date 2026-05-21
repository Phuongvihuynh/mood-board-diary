"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { useElementDrag } from "@/hooks/useElementDrag";
import { useElementResize } from "@/hooks/useElementResize";
import { useElementRotate } from "@/hooks/useElementRotate";
import { BoardElement } from "@/types/board";

interface DraggableElementProps {
  element: BoardElement;
  children: ReactNode;
}

const resizeHandleStyle =
  "absolute w-3 h-3 bg-white border-2 border-warm-pink rounded-full";

export function DraggableElement({ element, children }: DraggableElementProps) {
  const selectedId = useBoardStore((s) => s.selectedElementId);
  const selectElement = useBoardStore((s) => s.selectElement);
  const deleteElement = useBoardStore((s) => s.deleteElement);
  const duplicateElement = useBoardStore((s) => s.duplicateElement);
  const updateElement = useBoardStore((s) => s.updateElement);

  const isSelected = selectedId === element.id;
  const { onPointerDown } = useElementDrag(element.id);
  const { onResizePointerDown } = useElementResize(element.id);
  const { onRotatePointerDown } = useElementRotate(element.id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  return (
    <motion.div
      data-element-wrapper
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: element.opacity, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      style={{
        position: "absolute",
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
      }}
      className="group"
      onClick={handleClick}
      onPointerDown={onPointerDown}
    >
      {/* Content */}
      <div className="w-full h-full">{children}</div>

      {/* Selection ring & controls */}
      {isSelected && (
        <>
          <div className="absolute inset-[-3px] border-2 border-warm-pink rounded-lg pointer-events-none" />

          {/* Resize handles */}
          <div
            className={`${resizeHandleStyle} -top-1.5 -left-1.5 cursor-nw-resize`}
            onPointerDown={onResizePointerDown("nw")}
          />
          <div
            className={`${resizeHandleStyle} -top-1.5 -right-1.5 cursor-ne-resize`}
            onPointerDown={onResizePointerDown("ne")}
          />
          <div
            className={`${resizeHandleStyle} -bottom-1.5 -left-1.5 cursor-sw-resize`}
            onPointerDown={onResizePointerDown("sw")}
          />
          <div
            className={`${resizeHandleStyle} -bottom-1.5 -right-1.5 cursor-se-resize`}
            onPointerDown={onResizePointerDown("se")}
          />

          {/* Rotate handle */}
          <div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-lavender rounded-full cursor-grab flex items-center justify-center text-xs"
            onPointerDown={onRotatePointerDown}
          >
            ↻
          </div>

          {/* Delete button */}
          <button
            className="absolute -top-3 -right-3 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-red-200 border border-red-300"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              deleteElement(element.id);
            }}
          >
            ✕
          </button>

          {/* Duplicate button */}
          <button
            className="absolute -bottom-3 -right-3 w-6 h-6 bg-lavender text-foreground rounded-full flex items-center justify-center text-xs cursor-pointer hover:bg-lavender/80 border border-lavender"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              duplicateElement(element.id);
            }}
          >
            ⧉
          </button>

          {/* Opacity slider */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm border border-soft-brown/15"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] text-soft-brown">◐</span>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={element.opacity}
              onChange={(e) =>
                updateElement(element.id, { opacity: Number(e.target.value) })
              }
              className="w-20 h-1 accent-warm-pink cursor-pointer"
            />
            <span className="text-[10px] text-soft-brown w-7 text-right">
              {Math.round(element.opacity * 100)}%
            </span>
          </div>
        </>
      )}
    </motion.div>
  );
}
