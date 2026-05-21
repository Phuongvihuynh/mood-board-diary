"use client";

import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { CollageElement } from "@/types/board";
import { COLLAGE_TEMPLATES, CollageTemplate } from "@/lib/collage-templates";
import { v4 as uuid } from "uuid";

function TemplateMiniPreview({ template }: { template: CollageTemplate }) {
  return (
    <div className="w-full aspect-square relative bg-soft-brown/10 rounded-lg overflow-hidden">
      {template.slots.map((slot, i) => (
        <div
          key={i}
          className="absolute bg-warm-pink/20 border border-warm-pink/30"
          style={{
            left: `${slot.x}%`,
            top: `${slot.y}%`,
            width: `${slot.width}%`,
            height: `${slot.height}%`,
            margin: 1,
          }}
        />
      ))}
    </div>
  );
}

export function CollagePanel() {
  const addElement = useBoardStore((s) => s.addElement);
  const selectedId = useBoardStore((s) => s.selectedElementId);
  const board = useBoardStore((s) => s.board);
  const updateElement = useBoardStore((s) => s.updateElement);

  const selectedElement = board?.elements.find((e) => e.id === selectedId);
  const isCollage = selectedElement?.type === "collage";
  const collageEl = isCollage ? (selectedElement as CollageElement) : null;

  const handleAddCollage = (template: CollageTemplate) => {
    addElement({
      type: "collage",
      templateId: template.id,
      slots: template.slots.map((s) => ({
        id: uuid(),
        x: s.x,
        y: s.y,
        width: s.width,
        height: s.height,
      })),
      gap: 4,
      borderRadius: 8,
      backgroundColor: "#ffffff",
      x: 80 + Math.random() * 100,
      y: 80 + Math.random() * 100,
      width: 300,
      height: 300,
      rotation: 0,
      opacity: 1,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Collage Frames</h3>

      <div className="grid grid-cols-3 gap-2">
        {COLLAGE_TEMPLATES.map((t) => (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddCollage(t)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl cursor-pointer bg-white/50 hover:bg-soft-brown/10 transition-colors"
          >
            <TemplateMiniPreview template={t} />
            <span className="text-[10px] text-soft-brown">{t.name}</span>
          </motion.button>
        ))}
      </div>

      {collageEl && (
        <div className="space-y-3 border-t border-soft-brown/10 pt-3">
          <p className="text-sm text-soft-brown font-medium">Collage Settings</p>

          <div>
            <label className="text-xs text-soft-brown">Gap ({collageEl.gap}px)</label>
            <input
              type="range"
              min={0}
              max={20}
              value={collageEl.gap}
              onChange={(e) =>
                updateElement(collageEl.id, { gap: Number(e.target.value) } as Partial<CollageElement>)
              }
              className="w-full accent-warm-pink"
            />
          </div>

          <div>
            <label className="text-xs text-soft-brown">
              Radius ({collageEl.borderRadius}px)
            </label>
            <input
              type="range"
              min={0}
              max={32}
              value={collageEl.borderRadius}
              onChange={(e) =>
                updateElement(collageEl.id, {
                  borderRadius: Number(e.target.value),
                } as Partial<CollageElement>)
              }
              className="w-full accent-warm-pink"
            />
          </div>

          <div>
            <label className="text-xs text-soft-brown">Background</label>
            <div className="flex gap-2 mt-1">
              {["#ffffff", "#000000", "#F5E6D3", "#fce4ec", "#e8f5e9", "#e3f2fd"].map(
                (color) => (
                  <button
                    key={color}
                    onClick={() =>
                      updateElement(collageEl.id, {
                        backgroundColor: color,
                      } as Partial<CollageElement>)
                    }
                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${
                      collageEl.backgroundColor === color
                        ? "border-warm-pink scale-110"
                        : "border-soft-brown/20"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-soft-brown">
        Click a template to add a collage frame, then click each slot to upload photos.
      </p>
    </div>
  );
}
