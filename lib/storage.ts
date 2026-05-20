import { BoardData, BoardMeta } from "@/types/board";

const BOARD_LIST_KEY = "mood-board-list";
const BOARD_DATA_PREFIX = "mood-board-data-";

export function loadBoardList(): BoardMeta[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOARD_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBoardList(boards: BoardMeta[]) {
  localStorage.setItem(BOARD_LIST_KEY, JSON.stringify(boards));
}

export function loadBoardData(id: string): BoardData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BOARD_DATA_PREFIX + id);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveBoardData(data: BoardData) {
  localStorage.setItem(BOARD_DATA_PREFIX + data.id, JSON.stringify(data));
}

export function deleteBoardData(id: string) {
  localStorage.removeItem(BOARD_DATA_PREFIX + id);
}

export function getStorageUsage(): { used: number; percentage: number } {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      total += localStorage.getItem(key)?.length || 0;
    }
  }
  const maxSize = 5 * 1024 * 1024; // ~5MB typical
  return { used: total, percentage: (total / maxSize) * 100 };
}
