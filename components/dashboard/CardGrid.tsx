"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCardListStore } from "@/stores/useCardListStore";
import { CardCard } from "./CardCard";
import { CreateCardCard } from "./CreateCardCard";

type SortBy = "newest" | "oldest" | "name-asc" | "name-desc";

const sortOptions: { value: SortBy; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

interface CardGridProps {
  onCreateClick: () => void;
}

export function CardGrid({ onCreateClick }: CardGridProps) {
  const cards = useCardListStore((s) => s.cards);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    let copy = [...cards];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      copy = copy.filter((c) => c.name.toLowerCase().includes(q));
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
  }, [cards, sortBy, search]);

  return (
    <div>
      {/* Search & Sort bar */}
      {cards.length > 0 && (
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-soft-brown text-sm">&#x1F50D;</span>
            <input
              type="text"
              placeholder="Search cards..."
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
          No cards matching &ldquo;{search}&rdquo;
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        <CreateCardCard onClick={onCreateClick} />
        <AnimatePresence>
          {sorted.map((card, i) => (
            <CardCard key={card.id} card={card} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
