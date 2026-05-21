export interface CollageTemplateSlot {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CollageTemplate {
  id: string;
  name: string;
  icon: string;
  slots: CollageTemplateSlot[];
}

export const COLLAGE_TEMPLATES: CollageTemplate[] = [
  {
    id: "side-by-side",
    name: "Side by Side",
    icon: "⬜⬜",
    slots: [
      { x: 0, y: 0, width: 50, height: 100 },
      { x: 50, y: 0, width: 50, height: 100 },
    ],
  },
  {
    id: "stacked",
    name: "Stacked",
    icon: "⬜\n⬜",
    slots: [
      { x: 0, y: 0, width: 100, height: 50 },
      { x: 0, y: 50, width: 100, height: 50 },
    ],
  },
  {
    id: "one-plus-two",
    name: "One + Two",
    icon: "🟫⬜",
    slots: [
      { x: 0, y: 0, width: 60, height: 100 },
      { x: 60, y: 0, width: 40, height: 50 },
      { x: 60, y: 50, width: 40, height: 50 },
    ],
  },
  {
    id: "three-strip",
    name: "Three Strip",
    icon: "⬜⬜⬜",
    slots: [
      { x: 0, y: 0, width: 33.333, height: 100 },
      { x: 33.333, y: 0, width: 33.334, height: 100 },
      { x: 66.667, y: 0, width: 33.333, height: 100 },
    ],
  },
  {
    id: "grid-2x2",
    name: "Grid 2x2",
    icon: "⬜⬜\n⬜⬜",
    slots: [
      { x: 0, y: 0, width: 50, height: 50 },
      { x: 50, y: 0, width: 50, height: 50 },
      { x: 0, y: 50, width: 50, height: 50 },
      { x: 50, y: 50, width: 50, height: 50 },
    ],
  },
  {
    id: "feature-plus-two",
    name: "Feature + Two",
    icon: "🟫🟫\n⬜⬜",
    slots: [
      { x: 0, y: 0, width: 100, height: 60 },
      { x: 0, y: 60, width: 50, height: 40 },
      { x: 50, y: 60, width: 50, height: 40 },
    ],
  },
];
