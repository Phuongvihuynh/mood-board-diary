"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhotoPanel } from "./panels/PhotoPanel";
import { TextPanel } from "./panels/TextPanel";
import { StickerPanel } from "./panels/StickerPanel";
import { DecorationPanel } from "./panels/DecorationPanel";
import { BackgroundPanel } from "./panels/BackgroundPanel";
import { CollagePanel } from "./panels/CollagePanel";

const tabs = [
  { id: "photo", label: "Photo", icon: "📷" },
  { id: "text", label: "Text", icon: "Aa" },
  { id: "sticker", label: "Sticker", icon: "⭐" },
  { id: "collage", label: "Frame", icon: "🖼" },
  { id: "deco", label: "Deco", icon: "🎀" },
  { id: "bg", label: "BG", icon: "🎨" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function BoardSidebar() {
  const [activeTab, setActiveTab] = useState<TabId>("photo");

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="w-64 bg-white/60 backdrop-blur-sm border-l border-soft-brown/20 flex flex-col h-full"
    >
      {/* Tabs */}
      <div className="flex border-b border-soft-brown/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-center text-xs cursor-pointer transition-colors ${
              activeTab === tab.id
                ? "text-warm-pink border-b-2 border-warm-pink font-medium"
                : "text-soft-brown hover:text-foreground"
            }`}
          >
            <div className="text-base">{tab.icon}</div>
            <div>{tab.label}</div>
          </button>
        ))}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "photo" && <PhotoPanel />}
            {activeTab === "text" && <TextPanel />}
            {activeTab === "sticker" && <StickerPanel />}
            {activeTab === "collage" && <CollagePanel />}
            {activeTab === "deco" && <DecorationPanel />}
            {activeTab === "bg" && <BackgroundPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
