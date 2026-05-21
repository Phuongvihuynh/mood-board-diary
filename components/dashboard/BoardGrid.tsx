"use client";

import { AnimatePresence } from "framer-motion";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { BoardCard } from "./BoardCard";
import { CreateBoardCard } from "./CreateBoardCard";

interface BoardGridProps {
  onCreateClick: () => void;
}

export function BoardGrid({ onCreateClick }: BoardGridProps) {
  const boards = useBoardListStore((s) => s.boards);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <CreateBoardCard onClick={onCreateClick} />
      <AnimatePresence>
        {boards.map((board, i) => (
          <BoardCard key={board.id} board={board} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}
