import type { CardData } from "@/types/card";

const CARD_DATA_PREFIX = "mood-card-data-";

export function loadCardData(id: string): CardData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CARD_DATA_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveCardData(data: CardData) {
  localStorage.setItem(CARD_DATA_PREFIX + data.id, JSON.stringify(data));
}

export function deleteCardData(id: string) {
  localStorage.removeItem(CARD_DATA_PREFIX + id);
}
