"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import type { CardMeta } from "@/types/card";

interface CardListState {
  cards: CardMeta[];
  addCard: (name: string) => string;
  updateCard: (id: string, updates: Partial<CardMeta>) => void;
  deleteCard: (id: string) => void;
}

export const useCardListStore = create<CardListState>()(
  persist(
    (set) => ({
      cards: [],

      addCard: (name) => {
        const id = uuid();
        const now = Date.now();
        set((state) => ({
          cards: [
            { id, name, createdAt: now, updatedAt: now },
            ...state.cards,
          ],
        }));
        return id;
      },

      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c
          ),
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id),
        })),
    }),
    { name: "mood-card-list" }
  )
);
