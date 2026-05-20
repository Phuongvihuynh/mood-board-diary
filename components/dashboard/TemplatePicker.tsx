"use client";

import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { templates } from "@/lib/templates";

interface TemplatePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export function TemplatePicker({ open, onClose, onSelect }: TemplatePickerProps) {
  return (
    <Modal open={open} onClose={onClose} title="Choose a Template">
      <div className="grid grid-cols-2 gap-4">
        {templates.map((tmpl, i) => (
          <motion.button
            key={tmpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(tmpl.id)}
            className="cursor-pointer rounded-xl border-2 border-soft-brown/20 p-4 text-left transition-colors hover:border-warm-pink/50 hover:shadow-md"
          >
            <div
              className="w-full h-24 rounded-lg mb-3 border border-soft-brown/10"
              style={{ backgroundColor: tmpl.previewColor }}
            />
            <h3 className="font-bold text-base font-patrick-hand">
              {tmpl.name}
            </h3>
            <p className="text-sm text-soft-brown mt-1">{tmpl.description}</p>
          </motion.button>
        ))}
      </div>
    </Modal>
  );
}
