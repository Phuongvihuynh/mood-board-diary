"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { BoardCard } from "./BoardCard";
import { CreateBoardCard } from "./CreateBoardCard";

type SortBy = "newest" | "oldest" | "name-asc" | "name-desc";

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

interface BoardGridProps {
  onCreateClick: () => void;
}

export function BoardGrid({ onCreateClick }: BoardGridProps) {
  const boards = useBoardListStore((s) => s.boards);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  const sorted = useMemo(() => {
    const copy = [...boards];
    switch (sortBy) {
      case "newest":
        return copy.sort((a, b) => b.createdAt - a.createdAt);
      case "oldest":
        return copy.sort((a, b) => a.createdAt - b.createdAt);
      case "name-asc":
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return copy.sort((a, b) => b.name.localeCompare(a.name));
    }
  }, [boards, sortBy]);

  return (
    <div>
      {/* Sort bar */}
      {boards.length > 0 && (
        <div className="flex items-center justify-end gap-2 mb-4">
          <span className="text-sm text-soft-brown">Sort by:</span>
          <div className="flex gap-1">
            {sortOptions.map((opt) => (
              <motion.button
                key={opt.value}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortBy(opt.value)}
                className={`px-3 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                  sortBy === opt.value
                    ? "bg-warm-pink/20 text-foreground font-medium"
                    : "bg-white/50 text-soft-brown hover:bg-soft-brown/10"
                }`}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <CreateBoardCard onClick={onCreateClick} />
        <AnimatePresence>
          {sorted.map((board, i) => (
            <BoardCard key={board.id} board={board} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
