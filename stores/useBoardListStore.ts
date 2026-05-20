"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { BoardMeta } from "@/types/board";

interface BoardListState {
  boards: BoardMeta[];
  addBoard: (name: string, templateId?: string) => string;
  updateBoard: (id: string, updates: Partial<BoardMeta>) => void;
  deleteBoard: (id: string) => void;
}

export const useBoardListStore = create<BoardListState>()(
  persist(
    (set) => ({
      boards: [],

      addBoard: (name, templateId) => {
        const id = uuid();
        const now = Date.now();
        set((state) => ({
          boards: [
            { id, name, createdAt: now, updatedAt: now, templateId },
            ...state.boards,
          ],
        }));
        return id;
      },

      updateBoard: (id, updates) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === id ? { ...b, ...updates, updatedAt: Date.now() } : b
          ),
        })),

      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
        })),
    }),
    { name: "mood-board-list" }
  )
);
