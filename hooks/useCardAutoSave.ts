"use client";

import { useEffect, useRef } from "react";
import { useCardStore } from "@/stores/useCardStore";
import { saveCardData } from "@/lib/card-storage";
import { AUTOSAVE_DELAY } from "@/lib/constants";

export function useCardAutoSave() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsub = useCardStore.subscribe((state) => {
      if (!state.cardId || !state._isDirty) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const current = useCardStore.getState();
        const data = current.getCardData();
        if (data && current._isDirty) {
          saveCardData(data);
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
