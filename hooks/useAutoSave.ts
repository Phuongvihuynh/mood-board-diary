"use client";

import { useEffect, useRef } from "react";
import { useBoardStore } from "@/stores/useBoardStore";
import { saveBoardData } from "@/lib/storage";
import { AUTOSAVE_DELAY } from "@/lib/constants";

export function useAutoSave() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = useBoardStore.subscribe((state) => {
      if (!state.board || !state._isDirty) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const current = useBoardStore.getState();
        if (current.board && current._isDirty) {
          saveBoardData(current.board);
          current.markClean();
        }
      }, AUTOSAVE_DELAY);
    });

    return () => {
      unsub();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
}
