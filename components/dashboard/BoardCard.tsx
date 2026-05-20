"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BoardMeta } from "@/types/board";
import { useBoardListStore } from "@/stores/useBoardListStore";
import { deleteBoardData } from "@/lib/storage";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface BoardCardProps {
  board: BoardMeta;
  index: number;
}

export function BoardCard({ board, index }: BoardCardProps) {
  const deleteBoard = useBoardListStore((s) => s.deleteBoard);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    deleteBoard(board.id);
    deleteBoardData(board.id);
    setShowConfirm(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, type: "spring", damping: 20 }}
      >
        <Link href={`/board/${board.id}`}>
          <motion.div
            whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            className="group rounded-2xl border-2 border-soft-brown/20 bg-white/60 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-warm-pink/40 transition-colors"
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
              <h3 className="font-bold font-patrick-hand text-lg truncate">
                {board.name}
              </h3>
              <p className="text-xs text-soft-brown mt-1">
                {new Date(board.updatedAt).toLocaleDateString()}
              </p>
            </div>

            {/* Delete button */}
            <button
              onClick={handleDeleteClick}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-rose-dust hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-sm"
              title="Delete"
            >
              ✕
            </button>
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
