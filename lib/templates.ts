import { v4 as uuid } from "uuid";
import { BoardData, BoardElement, BoardBackground } from "@/types/board";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";

export interface Template {
  id: string;
  name: string;
  description: string;
  previewColor: string;
  create: () => BoardData;
}

function createBoard(
  background: BoardBackground,
  elements: BoardElement[] = []
): BoardData {
  return {
    id: uuid(),
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    background,
    elements,
    nextZIndex: elements.length + 1,
  };
}

export const templates: Template[] = [
  {
    id: "blank",
    name: "Blank Canvas",
    description: "Start fresh with a warm cream canvas",
    previewColor: "#FFF8F0",
    create: () =>
      createBoard({ type: "color", value: "#FFF8F0" }),
  },
  {
    id: "cozy-journal",
    name: "Cozy Journal",
    description: "Parchment with dots, washi tape & text prompt",
    previewColor: "#F5E6D3",
    create: () =>
      createBoard(
        { type: "pattern", value: "dots", patternColor: "#D4C4B0" },
        [
          {
            id: uuid(),
            type: "decoration",
            variant: "washi-tape",
            src: "/decorations/washi-pink.svg",
            x: 50,
            y: 30,
            width: 200,
            height: 40,
            rotation: -3,
            zIndex: 1,
            opacity: 0.9,
          },
          {
            id: uuid(),
            type: "decoration",
            variant: "torn-paper",
            src: "/decorations/torn-paper.svg",
            x: 500,
            y: 400,
            width: 250,
            height: 150,
            rotation: 2,
            zIndex: 2,
            opacity: 0.8,
          },
          {
            id: uuid(),
            type: "text",
            content: "Today I feel...",
            fontFamilyId: "caveat",
            fontSize: 28,
            color: "#4a3728",
            textAlign: "left",
            x: 80,
            y: 90,
            width: 300,
            height: 50,
            rotation: 0,
            zIndex: 3,
            opacity: 1,
          },
        ]
      ),
  },
  {
    id: "soft-memories",
    name: "Soft Memories",
    description: "Blush pink with masking tape accents",
    previewColor: "#FFE4E1",
    create: () =>
      createBoard(
        { type: "color", value: "#FFE4E1" },
        [
          {
            id: uuid(),
            type: "decoration",
            variant: "scotch-tape",
            src: "/decorations/scotch-tape.svg",
            x: 300,
            y: 20,
            width: 120,
            height: 30,
            rotation: 0,
            zIndex: 1,
            opacity: 0.7,
          },
          {
            id: uuid(),
            type: "text",
            content: "Memories",
            fontFamilyId: "dancing-script",
            fontSize: 36,
            color: "#4a2d4a",
            textAlign: "center",
            x: 250,
            y: 60,
            width: 300,
            height: 60,
            rotation: 0,
            zIndex: 2,
            opacity: 1,
          },
        ]
      ),
  },
  {
    id: "garden-vibes",
    name: "Garden Vibes",
    description: "Sage green with grid, leaf & butterfly stickers",
    previewColor: "#D4E2D4",
    create: () =>
      createBoard(
        { type: "pattern", value: "grid", patternColor: "#B8D4B8" },
        [
          {
            id: uuid(),
            type: "sticker",
            stickerId: "leaf-1",
            src: "/stickers/nature/leaf.svg",
            x: 30,
            y: 30,
            width: 60,
            height: 60,
            rotation: -15,
            zIndex: 1,
            opacity: 0.9,
          },
          {
            id: uuid(),
            type: "sticker",
            stickerId: "butterfly-1",
            src: "/stickers/nature/butterfly.svg",
            x: 680,
            y: 50,
            width: 70,
            height: 70,
            rotation: 10,
            zIndex: 2,
            opacity: 0.9,
          },
          {
            id: uuid(),
            type: "text",
            content: '"Bloom where you are planted"',
            fontFamilyId: "indie-flower",
            fontSize: 22,
            color: "#2d4a3e",
            textAlign: "center",
            x: 200,
            y: 500,
            width: 400,
            height: 50,
            rotation: 0,
            zIndex: 3,
            opacity: 1,
          },
        ]
      ),
  },
];
