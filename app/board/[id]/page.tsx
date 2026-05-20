"use client";

import { useEffect, useRef, useState, use } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useBoardStore } from "@/stores/useBoardStore";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { useAutoSave } from "@/hooks/useAutoSave";
import { loadBoardData } from "@/lib/storage";
import { downloadDataUrl } from "@/lib/export-helpers";
import { BoardCanvas } from "@/components/board/BoardCanvas";
import { BoardToolbar } from "@/components/board/BoardToolbar";
import { BoardSidebar } from "@/components/board/BoardSidebar";
import { PageTransition } from "@/components/ui/PageTransition";
import type { ExportLayerHandle } from "@/components/board/BoardExportLayer";

// react-konva must be loaded client-side only
const BoardExportLayer = dynamic(
  () =>
    import("@/components/board/BoardExportLayer").then(
      (m) => m.BoardExportLayer
    ),
  { ssr: false }
);

export default function BoardEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const loadBoard = useBoardStore((s) => s.loadBoard);
  const resetBoard = useBoardStore((s) => s.resetBoard);
  const board = useBoardStore((s) => s.board);
  const exportRef = useRef<ExportLayerHandle>(null);
  const [loaded, setLoaded] = useState(false);

  useAutoSave();

  useEffect(() => {
    const data = loadBoardData(id);
    if (data) {
      loadBoard(data);
      setLoaded(true);
    } else {
      router.replace("/");
    }

    return () => resetBoard();
  }, [id, loadBoard, resetBoard, router]);

  const handleExport = async () => {
    if (!exportRef.current) return;
    const dataUrl = await exportRef.current.exportPNG();
    if (dataUrl) {
      const boardMeta = useBoardListStore.getState().boards.find((b) => b.id === id);
      const name = boardMeta?.name || "mood-board";
      downloadDataUrl(dataUrl, `${name}.png`);
    }
  };

  if (!loaded || !board) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-soft-brown font-kalam text-lg animate-pulse">
          Loading your board...
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <BoardToolbar boardId={id} onExport={handleExport} />

        <div className="flex-1 flex overflow-hidden">
          {/* Canvas area */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
            <BoardCanvas />
          </div>

          {/* Sidebar */}
          <BoardSidebar />
        </div>

        {/* Hidden export layer */}
        <BoardExportLayer ref={exportRef} />
      </div>
    </PageTransition>
  );
}
