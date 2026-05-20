"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { BoardGrid } from "@/components/dashboard/BoardGrid";
import { TemplatePicker } from "@/components/dashboard/TemplatePicker";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { templates } from "@/lib/templates";
import { saveBoardData } from "@/lib/storage";

export default function DashboardPage() {
  const [showPicker, setShowPicker] = useState(false);
  const addBoard = useBoardListStore((s) => s.addBoard);
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

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="px-6 py-8 text-center">
          <h1 className="text-4xl font-bold font-dancing-script text-foreground">
            Mood Board Diary
          </h1>
          <p className="text-soft-brown mt-2 font-kalam">
            Your cozy corner to collect moments & feelings
          </p>
        </header>

        {/* Board Grid */}
        <main className="px-6 pb-12 max-w-6xl mx-auto">
          <BoardGrid onCreateClick={() => setShowPicker(true)} />
        </main>

        {/* Template Picker */}
        <TemplatePicker
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onSelect={handleSelectTemplate}
        />
      </div>
    </PageTransition>
  );
}
