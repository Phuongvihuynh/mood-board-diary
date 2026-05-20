"use client";

import { useRef } from "react";
import { useBoardStore } from "@/stores/useBoardStore";
import { compressImage } from "@/lib/image-helpers";
import { Button } from "@/components/ui/Button";

export function PhotoPanel() {
  const addElement = useBoardStore((s) => s.addElement);
  const inputRef = useRef<HTMLInputElement>(null);

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

      <p className="text-xs text-soft-brown">
        Images are compressed to max 800px and stored locally.
      </p>
    </div>
  );
}
