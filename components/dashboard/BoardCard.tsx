"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BoardMeta } from "@/types/board";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { deleteBoardData, loadBoardData, saveBoardData } from "@/lib/storage";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface BoardCardProps {
  board: BoardMeta;
  index: number;
}

export function BoardCard({ board, index }: BoardCardProps) {
  const deleteBoard = useBoardListStore((s) => s.deleteBoard);
  const updateBoard = useBoardListStore((s) => s.updateBoard);
  const addBoard = useBoardListStore((s) => s.addBoard);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(board.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleRenameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditing(true);
  };

  const handleRenameSubmit = () => {
    setEditing(false);
    const trimmed = name.trim();
    if (trimmed && trimmed !== board.name) {
      updateBoard(board.id, { name: trimmed });
    } else {
      setName(board.name);
    }
  };

  const handleDuplicateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const data = loadBoardData(board.id);
    if (!data) return;
    const newId = addBoard(`${board.name} (copy)`);
    const newData = JSON.parse(JSON.stringify(data));
    newData.id = newId;
    saveBoardData(newData);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    deleteBoard(board.id);
    deleteBoardData(board.id);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8, y: -10, transition: { duration: 0.3, ease: "easeIn" } }}
        transition={{ delay: index * 0.06, type: "spring", damping: 20 }}
      >
        <Link href={editing ? "#" : `/board/${board.id}`} onClick={editing ? (e) => e.preventDefault() : undefined}>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            className="group rounded-2xl border-2 border-soft-brown/20 bg-white/60 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-warm-pink/40 transition-colors relative"
          >
            {/* Thumbnail area */}
            <div className="h-36 bg-parchment/50 flex items-center justify-center relative overflow-hidden">
              {board.thumbnail ? (
                <img
                  src={board.thumbnail}
                  alt={board.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl opacity-30">📓</span>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              {editing ? (
                <input
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleRenameSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameSubmit();
                    if (e.key === "Escape") {
                      setName(board.name);
                      setEditing(false);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold font-patrick-hand text-lg w-full bg-white/80 border-b-2 border-warm-pink outline-none px-1 rounded-md"
                />
              ) : (
                <h3
                  className="font-bold font-patrick-hand text-lg truncate"
                  onDoubleClick={handleRenameClick}
                >
                  {board.name}
                </h3>
              )}
              <p className="text-xs text-soft-brown mt-1">
                {new Date(board.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleRenameClick}
                className="w-7 h-7 rounded-full bg-white/80 text-soft-brown hover:bg-lavender hover:text-foreground flex items-center justify-center cursor-pointer text-xs"
                title="Rename"
              >
                ✎
              </button>
              <button
                onClick={handleDuplicateClick}
                className="w-7 h-7 rounded-full bg-white/80 text-soft-brown hover:bg-sage hover:text-foreground flex items-center justify-center cursor-pointer text-xs"
                title="Duplicate"
              >
                ⧉
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-7 h-7 rounded-full bg-white/80 text-rose-dust hover:bg-red-100 hover:text-red-600 flex items-center justify-center cursor-pointer text-sm"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      <ConfirmModal
        open={showConfirm}
        title="Delete Board?"
        message={`"${board.name}" will be permanently removed. This can't be undone.`}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
