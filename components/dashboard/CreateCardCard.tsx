"use client";

import { motion } from "framer-motion";

interface CreateCardCardProps {
  onClick: () => void;
}

export function CreateCardCard({ onClick }: CreateCardCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="rounded-2xl border-2 border-dashed border-warm-pink/40 bg-blush/20 h-full min-h-[200px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-warm-pink/70 hover:bg-blush/40 transition-colors"
    >
      <span className="text-4xl text-warm-pink/60">+</span>
      <span className="font-patrick-hand text-warm-pink/80 text-lg">
        New Card
      </span>
    </motion.button>
  );
}
