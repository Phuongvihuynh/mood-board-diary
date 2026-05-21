"use client";

import { create } from "zustand";
import { INK_COLORS, FONT_SIZES, FONT_FAMILIES, PAPER_TEMPLATES, PAPER, PAPER_SIZES } from "@/lib/typewriter-constants";
import type { TypewriterOverlay, FrameType } from "@/types/typewriter";
import type { CardData } from "@/types/card";

// Undoable state snapshot
interface Snapshot {
  text: string;
  inkColor: string;
  fontSize: number;
  fontFamilyId: string;
  paperWidth: number;
  paperHeight: number;
  paperBackground: string;
  paperLineColor: string;
  paperBackgroundImage: string | null;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  textAlign: "left" | "center" | "right";
  lineSpacing: number;
  overlays: TypewriterOverlay[];
}

const MAX_HISTORY = 50;

interface CardStore extends Snapshot {
  cardId: string | null;
  customBackgrounds: { id: string; src: string; name: string }[];
  selectedOverlayId: string | null;
  _isDirty: boolean;
  _past: Snapshot[];
  _future: Snapshot[];
  _saveSnapshot: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setText: (text: string) => void;
  setInkColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (id: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleUnderline: () => void;
  setTextAlign: (align: "left" | "center" | "right") => void;
  setLineSpacing: (spacing: number) => void;
  setPaperSize: (sizeId: string) => void;
  setPaperTemplate: (templateId: string) => void;
  setPaperBackgroundImage: (src: string | null) => void;
  addCustomBackground: (src: string, name: string) => void;
  removeCustomBackground: (id: string) => void;
  addOverlay: (overlay: TypewriterOverlay) => void;
  updateOverlay: (id: string, updates: Partial<TypewriterOverlay>) => void;
  removeOverlay: (id: string) => void;
  selectOverlay: (id: string | null) => void;
  setOverlayFrame: (id: string, frame: FrameType) => void;
  loadCard: (data: CardData) => void;
  resetCard: () => void;
  clearContent: () => void;
  getCardData: () => CardData | null;
  markClean: () => void;
}

function getSnapshot(state: CardStore): Snapshot {
  return {
    text: state.text,
    inkColor: state.inkColor,
    fontSize: state.fontSize,
    fontFamilyId: state.fontFamilyId,
    paperWidth: state.paperWidth,
    paperHeight: state.paperHeight,
    paperBackground: state.paperBackground,
    paperLineColor: state.paperLineColor,
    paperBackgroundImage: state.paperBackgroundImage,
    isBold: state.isBold,
    isItalic: state.isItalic,
    isUnderline: state.isUnderline,
    textAlign: state.textAlign,
    lineSpacing: state.lineSpacing,
    overlays: state.overlays,
  };
}

const initialState = {
  cardId: null as string | null,
  text: "",
  inkColor: INK_COLORS[0].value,
  fontSize: FONT_SIZES[3],
  fontFamilyId: FONT_FAMILIES[0].id,
  paperWidth: PAPER.width,
  paperHeight: PAPER.height,
  paperBackground: PAPER_TEMPLATES[0].background,
  paperLineColor: PAPER_TEMPLATES[0].lineColor,
  paperBackgroundImage: null as string | null,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  textAlign: "left" as const,
  lineSpacing: PAPER.lineSpacing,
  customBackgrounds: [] as { id: string; src: string; name: string }[],
  overlays: [] as TypewriterOverlay[],
  selectedOverlayId: null as string | null,
  _isDirty: false,
  _past: [] as Snapshot[],
  _future: [] as Snapshot[],
  canUndo: false,
  canRedo: false,
};

export const useCardStore = create<CardStore>((set, get) => ({
  ...initialState,

  _saveSnapshot: () => {
    const snap = getSnapshot(get());
    set((s) => ({
      _past: [...s._past.slice(-(MAX_HISTORY - 1)), snap],
      _future: [],
      canUndo: true,
      canRedo: false,
    }));
  },

  undo: () => {
    const { _past } = get();
    if (_past.length === 0) return;
    const prev = _past[_past.length - 1];
    const currentSnap = getSnapshot(get());
    set({
      ...prev,
      _past: _past.slice(0, -1),
      _future: [...get()._future, currentSnap],
      canUndo: _past.length - 1 > 0,
      canRedo: true,
      _isDirty: true,
    });
  },

  redo: () => {
    const { _future } = get();
    if (_future.length === 0) return;
    const next = _future[_future.length - 1];
    const currentSnap = getSnapshot(get());
    set({
      ...next,
      _past: [...get()._past, currentSnap],
      _future: _future.slice(0, -1),
      canUndo: true,
      canRedo: _future.length - 1 > 0,
      _isDirty: true,
    });
  },

  setText: (text) => set({ text, _isDirty: true }),
  setInkColor: (inkColor) => {
    get()._saveSnapshot();
    set({ inkColor, _isDirty: true });
  },
  setFontSize: (fontSize) => {
    get()._saveSnapshot();
    set({ fontSize, _isDirty: true });
  },
  setFontFamily: (fontFamilyId) => {
    get()._saveSnapshot();
    set({ fontFamilyId, _isDirty: true });
  },
  toggleBold: () => {
    get()._saveSnapshot();
    set((s) => ({ isBold: !s.isBold, _isDirty: true }));
  },
  toggleItalic: () => {
    get()._saveSnapshot();
    set((s) => ({ isItalic: !s.isItalic, _isDirty: true }));
  },
  toggleUnderline: () => {
    get()._saveSnapshot();
    set((s) => ({ isUnderline: !s.isUnderline, _isDirty: true }));
  },
  setTextAlign: (textAlign) => {
    get()._saveSnapshot();
    set({ textAlign, _isDirty: true });
  },
  setLineSpacing: (lineSpacing) => {
    get()._saveSnapshot();
    set({ lineSpacing, _isDirty: true });
  },
  setPaperSize: (sizeId) => {
    const size = PAPER_SIZES.find((s) => s.id === sizeId);
    if (size) {
      get()._saveSnapshot();
      set({ paperWidth: size.width, paperHeight: size.height, _isDirty: true });
    }
  },
  setPaperTemplate: (templateId) => {
    const tmpl = PAPER_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      get()._saveSnapshot();
      set({
        paperBackground: tmpl.background,
        paperLineColor: tmpl.lineColor,
        paperBackgroundImage: null,
        _isDirty: true,
      });
    }
  },
  setPaperBackgroundImage: (src) => {
    get()._saveSnapshot();
    set({ paperBackgroundImage: src, _isDirty: true });
  },

  addCustomBackground: (src, name) =>
    set((state) => ({
      customBackgrounds: [
        ...state.customBackgrounds,
        { id: `custom-${Date.now()}`, src, name },
      ],
      _isDirty: true,
    })),

  removeCustomBackground: (id) =>
    set((state) => ({
      customBackgrounds: state.customBackgrounds.filter((bg) => bg.id !== id),
      paperBackgroundImage:
        state.customBackgrounds.find((bg) => bg.id === id)?.src === state.paperBackgroundImage
          ? null
          : state.paperBackgroundImage,
      _isDirty: true,
    })),

  addOverlay: (overlay) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: [...state.overlays, overlay],
      selectedOverlayId: overlay.id,
      _isDirty: true,
    }));
  },

  updateOverlay: (id, updates) =>
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
      _isDirty: true,
    })),

  removeOverlay: (id) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: state.overlays.filter((o) => o.id !== id),
      selectedOverlayId:
        state.selectedOverlayId === id ? null : state.selectedOverlayId,
      _isDirty: true,
    }));
  },

  selectOverlay: (id) => set({ selectedOverlayId: id }),

  setOverlayFrame: (id, frame) => {
    get()._saveSnapshot();
    set((state) => ({
      overlays: state.overlays.map((o) =>
        o.id === id ? { ...o, frame } : o
      ),
      _isDirty: true,
    }));
  },

  loadCard: (data: CardData) =>
    set({
      cardId: data.id,
      text: data.text,
      inkColor: data.inkColor,
      fontSize: data.fontSize,
      fontFamilyId: data.fontFamilyId,
      paperWidth: data.paperWidth,
      paperHeight: data.paperHeight,
      paperBackground: data.paperBackground,
      paperLineColor: data.paperLineColor,
      paperBackgroundImage: data.paperBackgroundImage,
      isBold: data.isBold,
      isItalic: data.isItalic,
      isUnderline: data.isUnderline,
      textAlign: data.textAlign,
      lineSpacing: data.lineSpacing,
      overlays: data.overlays,
      customBackgrounds: data.customBackgrounds,
      selectedOverlayId: null,
      _isDirty: false,
      _past: [],
      _future: [],
      canUndo: false,
      canRedo: false,
    }),

  resetCard: () => set(initialState),

  clearContent: () => {
    get()._saveSnapshot();
    set({
      text: "",
      inkColor: INK_COLORS[0].value,
      fontSize: FONT_SIZES[3],
      fontFamilyId: FONT_FAMILIES[0].id,
      paperWidth: PAPER.width,
      paperHeight: PAPER.height,
      paperBackground: PAPER_TEMPLATES[0].background,
      paperLineColor: PAPER_TEMPLATES[0].lineColor,
      paperBackgroundImage: null,
      isBold: false,
      isItalic: false,
      isUnderline: false,
      textAlign: "left" as const,
      lineSpacing: PAPER.lineSpacing,
      overlays: [],
      selectedOverlayId: null,
      _isDirty: true,
    });
  },

  getCardData: () => {
    const s = get();
    if (!s.cardId) return null;
    return {
      id: s.cardId,
      text: s.text,
      inkColor: s.inkColor,
      fontSize: s.fontSize,
      fontFamilyId: s.fontFamilyId,
      paperWidth: s.paperWidth,
      paperHeight: s.paperHeight,
      paperBackground: s.paperBackground,
      paperLineColor: s.paperLineColor,
      paperBackgroundImage: s.paperBackgroundImage,
      isBold: s.isBold,
      isItalic: s.isItalic,
      isUnderline: s.isUnderline,
      textAlign: s.textAlign,
      lineSpacing: s.lineSpacing,
      overlays: s.overlays,
      customBackgrounds: s.customBackgrounds,
    };
  },

  markClean: () => set({ _isDirty: false }),
}));
