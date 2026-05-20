"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBoardStore } from "@/stores/useBoardStore";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { IconButton } from "@/components/ui/IconButton";

interface BoardToolbarProps {
  boardId: string;
  onExport: () => void;
}

export function BoardToolbar({ boardId, onExport }: BoardToolbarProps) {
  const board = useBoardStore((s) => s.board);
  const undo = useBoardStore((s) => s.undo);
  const redo = useBoardStore((s) => s.redo);
  const canUndo = useBoardStore((s) => s.canUndo);
  const canRedo = useBoardStore((s) => s.canRedo);
  const boardMeta = useBoardListStore((s) => s.boards.find((b) => b.id === boardId));
  const updateBoard = useBoardListStore((s) => s.updateBoard);

  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(boardMeta?.name || "Untitled");

  const handleNameSubmit = () => {
    setEditingName(false);
    if (name.trim()) {
      updateBoard(boardId, { name: name.trim() });
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-sm border-b border-soft-brown/20"
    >
      {/* Left: Back + Name */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <IconButton label="Back to dashboard" size="md">
            ←
          </IconButton>
        </Link>

        {editingName ? (
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            className="text-lg font-patrick-hand bg-transparent border-b-2 border-warm-pink outline-none px-1"
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-lg font-patrick-hand hover:text-warm-pink transition-colors cursor-pointer"
          >
            {boardMeta?.name || "Untitled"}
          </button>
        )}
      </div>

      {/* Center: Undo/Redo */}
      <div className="flex items-center gap-1">
        <IconButton
          label="Undo"
          onClick={undo}
          disabled={!canUndo()}
        >
          ↶
        </IconButton>
        <IconButton
          label="Redo"
          onClick={redo}
          disabled={!canRedo()}
        >
          ↷
        </IconButton>
      </div>

      {/* Right: Export */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="px-4 py-1.5 bg-warm-pink text-white rounded-xl text-sm font-medium cursor-pointer hover:bg-rose-dust transition-colors"
        >
          Export PNG
        </motion.button>
      </div>
    </motion.div>
  );
}
