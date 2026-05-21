"use client";

import { useRef, useState } from "react";
import { useCardStore } from "@/stores/useCardStore";
import FrameSelector from "./FrameSelector";
import type { TypewriterOverlay, FrameType } from "@/types/typewriter";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function TypewriterImageUpload() {
  const { addOverlay, overlays, selectedOverlayId, setOverlayFrame, paperWidth, paperHeight } =
    useCardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>("none");

  const selectedOverlay = overlays.find((o) => o.id === selectedOverlayId);
  const isImageSelected =
    selectedOverlay && selectedOverlay.type === "image";

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;

      const img = new Image();
      img.onload = () => {
        // Scale image to fit within paper, max 200px
        const maxSize = 200;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        const overlay: TypewriterOverlay = {
          id: generateId(),
          type: "image",
          src,
          x: (paperWidth - width) / 2,
          y: (paperHeight - height) / 2,
          width,
          height,
          rotation: 0,
          frame: selectedFrame,
        };

        addOverlay(overlay);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be uploaded again
    e.target.value = "";
  };

  const handleFrameChange = (frame: FrameType) => {
    setSelectedFrame(frame);
    if (isImageSelected) {
      setOverlayFrame(selectedOverlay.id, frame);
    }
  };

  return (
    <div className="p-4 border-b border-warm-brown/20">
      <h3 className="text-sm font-semibold text-warm-brown mb-3">
        Image Upload
      </h3>

      <button
        onClick={handleUploadClick}
        className="w-full py-2 px-3 rounded border border-dashed border-warm-brown/40 text-ink/70 text-sm hover:bg-warm-brown/5 transition-colors mb-3"
      >
        + Upload Image
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <h4 className="text-xs font-medium text-ink/60 mb-2">
        Frame{isImageSelected ? " (editing selected)" : ""}
      </h4>
      <FrameSelector
        currentFrame={isImageSelected ? selectedOverlay.frame : selectedFrame}
        onSelect={handleFrameChange}
      />
    </div>
  );
}
