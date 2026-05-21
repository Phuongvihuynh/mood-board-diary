"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { compressImage } from "@/lib/image-helpers";
import { Button } from "@/components/ui/Button";
import { PhotoElement, PhotoFrame } from "@/types/board";

const frames: { id: PhotoFrame; label: string; preview: string }[] = [
  { id: "none", label: "None", preview: "▢" },
  { id: "polaroid", label: "Polaroid", preview: "📸" },
  { id: "tape-corners", label: "Tape", preview: "📌" },
  { id: "rounded", label: "Rounded", preview: "⬭" },
  { id: "shadow", label: "Shadow", preview: "🖼" },
  { id: "vintage", label: "Vintage", preview: "📜" },
];

export function PhotoPanel() {
  const addElement = useBoardStore((s) => s.addElement);
  const selectedId = useBoardStore((s) => s.selectedElementId);
  const board = useBoardStore((s) => s.board);
  const updateElement = useBoardStore((s) => s.updateElement);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedElement = board?.elements.find((e) => e.id === selectedId);
  const isPhoto = selectedElement?.type === "photo";
  const photoEl = isPhoto ? (selectedElement as PhotoElement) : null;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const src = await compressImage(file);
      addElement({
        type: "photo",
        src,
        frame: "none",
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        width: 200,
        height: 200,
        rotation: Math.random() * 6 - 3,
        opacity: 1,
      });
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold font-patrick-hand text-lg">Photos</h3>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />

      <Button
        variant="secondary"
        size="md"
        className="w-full"
        onClick={() => inputRef.current?.click()}
      >
        Upload Photo
      </Button>

      {photoEl && (
        <div>
          <p className="text-sm text-soft-brown mb-2">Frame Style</p>
          <div className="grid grid-cols-3 gap-2">
            {frames.map((f) => (
              <motion.button
                key={f.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateElement(photoEl.id, { frame: f.id })}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs cursor-pointer transition-colors ${
                  photoEl.frame === f.id
                    ? "bg-warm-pink/20 text-foreground font-medium"
                    : "bg-white/50 text-soft-brown hover:bg-soft-brown/10"
                }`}
              >
                <span className="text-lg">{f.preview}</span>
                <span>{f.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-soft-brown">
        Images are compressed to max 800px and stored locally.
      </p>
    </div>
  );
}
