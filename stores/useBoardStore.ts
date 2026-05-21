"use client";

import { create } from "zustand";
import { v4 as uuid } from "uuid";
import {
  BoardData,
  BoardElement,
  BoardBackground,
  PhotoElement,
  TextElement,
  StickerElement,
  DecorationElement,
  CollageElement,
} from "@/types/board";
import { MAX_UNDO_STEPS, CANVAS_WIDTH, CANVAS_HEIGHT } from "@/lib/constants";

interface BoardState {
  board: BoardData | null;
  selectedElementId: string | null;
  _past: BoardData[];
  _future: BoardData[];
  _isDirty: boolean;

  // Board lifecycle
  loadBoard: (data: BoardData) => void;
  resetBoard: () => void;

  // Selection
  selectElement: (id: string | null) => void;

  // Elements
  addElement: (element: Omit<PhotoElement, "id" | "zIndex"> | Omit<TextElement, "id" | "zIndex"> | Omit<StickerElement, "id" | "zIndex"> | Omit<DecorationElement, "id" | "zIndex"> | Omit<CollageElement, "id" | "zIndex">) => string;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  bringToFront: (id: string) => void;

  // Background
  setBackground: (bg: BoardBackground) => void;

  // Canvas
  setCanvasSize: (w: number, h: number) => void;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Dirty tracking
  markClean: () => void;
}

function snapshot(state: BoardState): BoardData | null {
  return state.board ? JSON.parse(JSON.stringify(state.board)) : null;
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  board: null,
  selectedElementId: null,
  _past: [],
  _future: [],
  _isDirty: false,

  loadBoard: (data) =>
    set({ board: data, selectedElementId: null, _past: [], _future: [], _isDirty: false }),

  resetBoard: () =>
    set({ board: null, selectedElementId: null, _past: [], _future: [], _isDirty: false }),

  selectElement: (id) => set({ selectedElementId: id }),

  addElement: (elementData) => {
    const id = uuid();
    const state = get();
    const board = state.board;
    if (!board) return id;

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);
    const element = { ...elementData, id, zIndex: board.nextZIndex } as BoardElement;

    set({
      board: {
        ...board,
        elements: [...board.elements, element],
        nextZIndex: board.nextZIndex + 1,
      },
      selectedElementId: id,
      _past: past,
      _future: [],
      _isDirty: true,
    });
    return id;
  },

  updateElement: (id, updates) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);

    set({
      board: {
        ...board,
        elements: board.elements.map((el) =>
          el.id === id ? { ...el, ...updates } as BoardElement : el
        ),
      },
      _past: past,
      _future: [],
      _isDirty: true,
    });
  },

  deleteElement: (id) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);

    set({
      board: {
        ...board,
        elements: board.elements.filter((el) => el.id !== id),
      },
      selectedElementId:
        state.selectedElementId === id ? null : state.selectedElementId,
      _past: past,
      _future: [],
      _isDirty: true,
    });
  },

  duplicateElement: (id) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    const original = board.elements.find((el) => el.id === id);
    if (!original) return;

    const newId = uuid();
    const clone = {
      ...original,
      id: newId,
      x: original.x + 20,
      y: original.y + 20,
      zIndex: board.nextZIndex,
    };

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);

    set({
      board: {
        ...board,
        elements: [...board.elements, clone],
        nextZIndex: board.nextZIndex + 1,
      },
      selectedElementId: newId,
      _past: past,
      _future: [],
      _isDirty: true,
    });
  },

  bringToFront: (id) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);

    set({
      board: {
        ...board,
        elements: board.elements.map((el) =>
          el.id === id ? { ...el, zIndex: board.nextZIndex } : el
        ),
        nextZIndex: board.nextZIndex + 1,
      },
      _past: past,
      _future: [],
      _isDirty: true,
    });
  },

  setBackground: (bg) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    const past = [...state._past, snapshot(state)!].slice(-MAX_UNDO_STEPS);

    set({
      board: { ...board, background: bg },
      _past: past,
      _future: [],
      _isDirty: true,
    });
  },

  setCanvasSize: (w, h) => {
    const state = get();
    const board = state.board;
    if (!board) return;

    set({
      board: { ...board, canvasWidth: w, canvasHeight: h },
      _isDirty: true,
    });
  },

  undo: () => {
    const state = get();
    if (state._past.length === 0) return;

    const previous = state._past[state._past.length - 1];
    const newPast = state._past.slice(0, -1);

    set({
      board: previous,
      _past: newPast,
      _future: [snapshot(state)!, ...state._future],
      _isDirty: true,
    });
  },

  redo: () => {
    const state = get();
    if (state._future.length === 0) return;

    const next = state._future[0];
    const newFuture = state._future.slice(1);

    set({
      board: next,
      _past: [...state._past, snapshot(state)!],
      _future: newFuture,
      _isDirty: true,
    });
  },

  canUndo: () => get()._past.length > 0,
  canRedo: () => get()._future.length > 0,

  markClean: () => set({ _isDirty: false }),
}));
