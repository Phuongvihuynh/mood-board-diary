"use client";

import { FRAME_TEMPLATES } from "@/lib/frame-templates";
import type { FrameType } from "@/types/typewriter";

interface FrameSelectorProps {
  currentFrame: FrameType;
  onSelect: (frame: FrameType) => void;
}

const FRAME_PREVIEW_STYLES: Record<FrameType, string> = {
  none: "border border-warm-brown/20",
  polaroid: "bg-white shadow-md pb-3",
  "vintage-gold": "border-2 border-[#8B6914] bg-[#F5E6CA]",
  "tape-corners": "border border-warm-brown/20",
  "torn-paper": "bg-white",
  "stamp-border": "border-2 border-dashed border-[#8B6914] bg-white",
};

export default function FrameSelector({
  currentFrame,
  onSelect,
}: FrameSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {FRAME_TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          title={template.description}
          className={`p-1 rounded transition-colors ${
            currentFrame === template.id
              ? "ring-2 ring-warm-brown bg-warm-brown/10"
              : "hover:bg-warm-brown/5"
          }`}
        >
          <div
            className={`w-full aspect-square rounded-sm flex items-center justify-center ${
              FRAME_PREVIEW_STYLES[template.id]
            }`}
          >
            <div className="w-4 h-4 bg-warm-brown/20 rounded-sm" />
          </div>
          <span className="text-[9px] text-ink/60 mt-1 block text-center leading-tight">
            {template.name}
          </span>
        </button>
      ))}
    </div>
  );
}
