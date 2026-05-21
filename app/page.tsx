"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { BoardGrid } from "@/components/dashboard/BoardGrid";
import { CardGrid } from "@/components/dashboard/CardGrid";
import { TemplatePicker } from "@/components/dashboard/TemplatePicker";
import { DashboardTabs, type DashboardTab } from "@/components/dashboard/DashboardTabs";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { useCardListStore } from "@/stores/useCardListStore";
import { templates } from "@/lib/templates";
import { saveBoardData } from "@/lib/storage";
import { saveCardData } from "@/lib/card-storage";
import { PAPER, PAPER_TEMPLATES, FONT_FAMILIES } from "@/lib/typewriter-constants";
import { INK_COLORS, FONT_SIZES } from "@/lib/typewriter-constants";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("boards");
  const [showPicker, setShowPicker] = useState(false);
  const addBoard = useBoardListStore((s) => s.addBoard);
  const addCard = useCardListStore((s) => s.addCard);
  const router = useRouter();

  const handleSelectTemplate = useCallback(
    (templateId: string) => {
      const tmpl = templates.find((t) => t.id === templateId);
      if (!tmpl) return;

      const boardData = tmpl.create();

      // addBoard returns the id it generated — overwrite boardData.id to match
      const boardId = addBoard(tmpl.name, templateId);
      boardData.id = boardId;

      saveBoardData(boardData);
      setShowPicker(false);
      router.push(`/board/${boardId}`);
    },
    [addBoard, router]
  );

  const handleCreateCard = useCallback(() => {
    const cardId = addCard("Untitled Card");

    // Create default card data
    saveCardData({
      id: cardId,
      text: "",
      inkColor: INK_COLORS[0].value,
      fontSize: FONT_SIZES[3],
      fontFamilyId: FONT_FAMILIES[0].id,
      paperWidth: PAPER.width,
      paperHeight: PAPER.height,
      paperBackground: PAPER_TEMPLATES[0].background,
      paperLineColor: PAPER_TEMPLATES[0].lineColor,
      paperBackgroundImage: null,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      textAlign: "left",
      lineSpacing: PAPER.lineSpacing,
      overlays: [],
      customBackgrounds: [],
    });

    router.push(`/card/${cardId}`);
  }, [addCard, router]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="px-6 py-8 text-center">
          <h1 className="text-4xl font-bold font-dancing-script text-foreground">
            Mood Board Diary
          </h1>
          <p className="text-soft-brown mt-2 font-kalam">
            Your cozy corner to collect moments & feelings
          </p>

          {/* Tabs */}
          <div className="flex justify-center mt-4">
            <DashboardTabs active={activeTab} onChange={setActiveTab} />
          </div>
        </header>

        {/* Content */}
        <main className="px-6 pb-12 max-w-6xl mx-auto">
          {activeTab === "boards" ? (
            <BoardGrid onCreateClick={() => setShowPicker(true)} />
          ) : (
            <CardGrid onCreateClick={handleCreateCard} />
          )}
        </main>

        {/* Template Picker (boards only) */}
        <TemplatePicker
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onSelect={handleSelectTemplate}
        />
      </div>
    </PageTransition>
  );
}
