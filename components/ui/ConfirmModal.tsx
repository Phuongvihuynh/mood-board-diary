"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center"
          >
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-xl font-bold font-dancing-script text-foreground mb-2">
              {title}
            </h3>
            <p className="text-soft-brown text-sm mb-6 font-kalam">
              {message}
            </p>

            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onCancel}
                className="px-5 py-2 rounded-xl bg-parchment text-foreground border border-soft-brown/20 cursor-pointer hover:bg-soft-brown/15 transition-colors font-medium text-sm"
              >
                {cancelLabel}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onConfirm}
                className="px-5 py-2 rounded-xl bg-red-100 text-red-600 border border-red-200 cursor-pointer hover:bg-red-200 transition-colors font-medium text-sm"
              >
                {confirmLabel}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
