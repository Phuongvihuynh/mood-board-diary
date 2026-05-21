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
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    let copy = [...boards];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      copy = copy.filter((b) => b.name.toLowerCase().includes(q));
    }
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
  }, [boards, sortBy, search]);

  return (
    <div>
      {/* Search & Sort bar */}
      {boards.length > 0 && (
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-brown text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search boards..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-white/60 border border-soft-brown/20 text-sm outline-none focus:border-warm-pink/50 transition-colors w-48 font-kalam placeholder:text-soft-brown/50"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
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
        </div>
      )}

      {/* Empty search state */}
      {search.trim() && sorted.length === 0 && (
        <p className="text-center text-soft-brown py-8 font-kalam">
          No boards matching &ldquo;{search}&rdquo;
        </p>
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
