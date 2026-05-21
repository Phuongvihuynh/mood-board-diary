"use client";

import dynamic from "next/dynamic";
import TypewriterToolbar from "./TypewriterToolbar";
import TypewriterStickerPanel from "./TypewriterStickerPanel";
import TypewriterImageUpload from "./TypewriterImageUpload";
import BackgroundTemplatePicker from "./BackgroundTemplatePicker";

const TypewriterMode = dynamic(
  () => import("./TypewriterMode"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-[700px] h-[520px] bg-parchment border border-warm-brown/20 rounded">
        <p className="text-ink/50">Loading editor...</p>
      </div>
    ),
  }
);

export function CardEditor() {
  return (
    <div className="flex-1 flex overflow-hidden">
      <aside className="w-64 bg-parchment border-r border-warm-brown/20 flex flex-col overflow-y-auto">
        <TypewriterToolbar />
        <div className="px-4 pb-4">
          <BackgroundTemplatePicker />
        </div>
        <TypewriterStickerPanel />
        <TypewriterImageUpload />
      </aside>
      <main className="flex-1 bg-cream overflow-auto flex items-center justify-center">
        <TypewriterMode />
      </main>
    </div>
  );
}
