"use client";

import { useBoardStore } from "@/stores/useBoardStore";
import { FONT_OPTIONS, TEXT_COLORS } from "@/lib/constants";
import { FONT_FAMILY_MAP } from "@/lib/fonts";
import { Button } from "@/components/ui/Button";
import { TextElement } from "@/types/board";

export function TextPanel() {
  const addElement = useBoardStore((s) => s.addElement);
  const selectedId = useBoardStore((s) => s.selectedElementId);
  const board = useBoardStore((s) => s.board);
  const updateElement = useBoardStore((s) => s.updateElement);

  const selectedElement = board?.elements.find((e) => e.id === selectedId);
  const isText = selectedElement?.type === "text";
  const textEl = isText ? (selectedElement as TextElement) : null;

  const handleAddText = () => {
    addElement({
      type: "text",
      content: "Double-click to edit",
      fontFamilyId: "caveat",
      fontSize: 24,
      color: "#1a1a2e",
      textAlign: "left",
      x: 150 + Math.random() * 200,
      y: 150 + Math.random() * 150,
      width: 250,
      height: 60,
      rotation: 0,
      opacity: 1,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Text</h3>

      <Button
        variant="secondary"
        size="md"
        className="w-full"
        onClick={handleAddText}
      >
        Add Text
      </Button>

      {textEl && (
        <>
          {/* Font picker */}
          <div>
            <p className="text-sm text-soft-brown mb-2">Font</p>
            <div className="grid grid-cols-1 gap-1.5">
              {FONT_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateElement(textEl.id, { fontFamilyId: f.id })}
                  className={`text-left px-3 py-1.5 rounded-lg text-sm cursor-pointer transition-colors ${
                    textEl.fontFamilyId === f.id
                      ? "bg-warm-pink/20 text-foreground"
                      : "hover:bg-soft-brown/10"
                  }`}
                  style={{ fontFamily: FONT_FAMILY_MAP[f.id] }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font size */}
          <div>
            <p className="text-sm text-soft-brown mb-2">Size: {textEl.fontSize}px</p>
            <input
              type="range"
              min={12}
              max={72}
              value={textEl.fontSize}
              onChange={(e) =>
                updateElement(textEl.id, { fontSize: Number(e.target.value) })
              }
              className="w-full accent-warm-pink"
            />
          </div>

          {/* Color picker */}
          <div>
            <p className="text-sm text-soft-brown mb-2">Color</p>
            <div className="flex flex-wrap gap-2">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateElement(textEl.id, { color: c })}
                  className={`w-7 h-7 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${
                    textEl.color === c ? "border-warm-pink scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Align */}
          <div>
            <p className="text-sm text-soft-brown mb-2">Align</p>
            <div className="flex gap-1">
              {(["left", "center", "right"] as const).map((align) => (
                <button
                  key={align}
                  onClick={() => updateElement(textEl.id, { textAlign: align })}
                  className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                    textEl.textAlign === align
                      ? "bg-warm-pink/20"
                      : "hover:bg-soft-brown/10"
                  }`}
                >
                  {align === "left" ? "⫷" : align === "center" ? "☰" : "⫸"}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
