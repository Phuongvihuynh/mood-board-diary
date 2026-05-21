"use client";

import { useRef, useState } from "react";
import { CollageElement } from "@/types/board";
import { useBoardStore } from "@/stores/useBoardStore";
import { compressImage } from "@/lib/image-helpers";

interface CollageElementViewProps {
  element: CollageElement;
}

export function CollageElementView({ element }: CollageElementViewProps) {
  const updateElement = useBoardStore((s) => s.updateElement);
  const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const dragSlotId = useRef<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const handleSwap = (targetSlotId: string) => {
    const sourceId = dragSlotId.current;
    if (!sourceId || sourceId === targetSlotId) return;
    const sourceSlot = element.slots.find((s) => s.id === sourceId);
    const targetSlot = element.slots.find((s) => s.id === targetSlotId);
    if (!sourceSlot || !targetSlot) return;
    const newSlots = element.slots.map((s) => {
      if (s.id === sourceId) return { ...s, src: targetSlot.src };
      if (s.id === targetSlotId) return { ...s, src: sourceSlot.src };
      return s;
    });
    updateElement(element.id, { slots: newSlots } as Partial<CollageElement>);
  };

  const handleSlotUpload = async (slotId: string, file: File) => {
    const src = await compressImage(file);
    const newSlots = element.slots.map((s) =>
      s.id === slotId ? { ...s, src } : s
    );
    updateElement(element.id, { slots: newSlots } as Partial<CollageElement>);
  };

  const handleSlotRemove = (e: React.MouseEvent, slotId: string) => {
    e.stopPropagation();
    const newSlots = element.slots.map((s) =>
      s.id === slotId ? { ...s, src: undefined } : s
    );
    updateElement(element.id, { slots: newSlots } as Partial<CollageElement>);
  };

  const handleSlotClick = (e: React.MouseEvent, slotId: string) => {
    e.stopPropagation();
    const input = inputRefs.current.get(slotId);
    input?.click();
  };

  const halfGap = element.gap / 2;

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        backgroundColor: element.backgroundColor,
        borderRadius: element.borderRadius,
      }}
    >
      {element.slots.map((slot) => (
        <div
          key={slot.id}
          className="absolute"
          style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: `${slot.width}%`,
            height: `${slot.height}%`,
            padding: halfGap,
          }}
          onDragOver={(e) => {
            if (!dragSlotId.current || dragSlotId.current === slot.id) return;
            e.preventDefault();
            setDropTargetId(slot.id);
          }}
          onDragLeave={() => setDropTargetId(null)}
          onDrop={(e) => {
            e.preventDefault();
            handleSwap(slot.id);
            setDropTargetId(null);
            dragSlotId.current = null;
          }}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(el) => {
              if (el) inputRefs.current.set(slot.id, el);
            }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) await handleSlotUpload(slot.id, file);
              e.target.value = "";
            }}
          />
          <div
            className={`group w-full h-full cursor-pointer overflow-hidden relative ${
              dropTargetId === slot.id ? "ring-2 ring-soft-brown ring-offset-1" : ""
            }`}
            style={{ borderRadius: Math.max(0, element.borderRadius - 2) }}
            onClick={(e) => handleSlotClick(e, slot.id)}
            draggable={!!slot.src}
            onDragStart={(e) => {
              dragSlotId.current = slot.id;
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragEnd={() => {
              dragSlotId.current = null;
              setDropTargetId(null);
            }}
          >
            {slot.src ? (
              <>
                <img
                  src={slot.src}
                  alt=""
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 hover:bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleSlotRemove(e, slot.id)}
                >
                  ×
                </button>
              </>
            ) : (
              <div className="w-full h-full border-2 border-dashed border-soft-brown/30 flex items-center justify-center bg-white/30 hover:bg-white/50 transition-colors">
                <span className="text-2xl text-soft-brown/40">+</span>
              </div>
            )}
            {dropTargetId === slot.id && (
              <div className="absolute inset-0 bg-soft-brown/10 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
