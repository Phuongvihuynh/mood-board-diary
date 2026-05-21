"use client";

import { useEffect } from "react";
import { useBoardStore } from "@/stores/useBoardStore";

export function useKeyboardShortcuts(onExport?: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore when typing in input/contenteditable
      const tag = (e.target as HTMLElement).tagName;
      const isEditable =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable;

      const meta = e.metaKey || e.ctrlKey;

      // Delete/Backspace — delete selected element
      if (!isEditable && (e.key === "Delete" || e.key === "Backspace")) {
        const id = useBoardStore.getState().selectedElementId;
        if (id) {
          e.preventDefault();
          useBoardStore.getState().deleteElement(id);
        }
        return;
      }

      // Cmd+Z — undo
      if (meta && !e.shiftKey && e.key === "z") {
        e.preventDefault();
        useBoardStore.getState().undo();
        return;
      }

      // Cmd+Shift+Z — redo
      if (meta && e.shiftKey && e.key === "z") {
        e.preventDefault();
        useBoardStore.getState().redo();
        return;
      }

      // Cmd+D — duplicate selected
      if (meta && e.key === "d") {
        const id = useBoardStore.getState().selectedElementId;
        if (id) {
          e.preventDefault();
          useBoardStore.getState().duplicateElement(id);
        }
        return;
      }

      // Cmd+E — export
      if (meta && e.key === "e") {
        e.preventDefault();
        onExport?.();
        return;
      }

      // Escape — deselect
      if (e.key === "Escape") {
        useBoardStore.getState().selectElement(null);
        return;
      }

      // Arrow keys — nudge selected element
      if (!isEditable && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        const id = useBoardStore.getState().selectedElementId;
        if (!id) return;
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const el = useBoardStore.getState().board?.elements.find((el) => el.id === id);
        if (!el) return;

        const updates: Record<string, number> = {};
        if (e.key === "ArrowUp") updates.y = el.y - step;
        if (e.key === "ArrowDown") updates.y = el.y + step;
        if (e.key === "ArrowLeft") updates.x = el.x - step;
        if (e.key === "ArrowRight") updates.x = el.x + step;

        useBoardStore.getState().updateElement(id, updates);
        return;
      }

      // ] — bring to front
      if (!isEditable && e.key === "]") {
        const id = useBoardStore.getState().selectedElementId;
        if (id) useBoardStore.getState().bringToFront(id);
        return;
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onExport]);
}
