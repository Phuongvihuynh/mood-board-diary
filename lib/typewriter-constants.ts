export const INK_COLORS = [
  { name: "Black", value: "#2C2C2C" },
  { name: "Navy", value: "#1B3A5C" },
  { name: "Red", value: "#8B2500" },
  { name: "Green", value: "#2E5A2E" },
  { name: "Sepia", value: "#704214" },
  { name: "Purple", value: "#4A2060" },
] as const;

export const FONT_FAMILIES = [
  { id: "special-elite", name: "Special Elite", css: "var(--font-special-elite), monospace", konva: "Special Elite, monospace" },
  { id: "dancing-script", name: "Dancing Script", css: "var(--font-dancing-script), cursive", konva: "Dancing Script, cursive" },
  { id: "caveat", name: "Caveat", css: "var(--font-caveat), cursive", konva: "Caveat, cursive" },
  { id: "indie-flower", name: "Indie Flower", css: "var(--font-indie-flower), cursive", konva: "Indie Flower, cursive" },
  { id: "homemade-apple", name: "Homemade Apple", css: "var(--font-homemade-apple), cursive", konva: "Homemade Apple, cursive" },
  { id: "sacramento", name: "Sacramento", css: "var(--font-sacramento), cursive", konva: "Sacramento, cursive" },
  { id: "great-vibes", name: "Great Vibes", css: "var(--font-great-vibes), cursive", konva: "Great Vibes, cursive" },
  { id: "pacifico", name: "Pacifico", css: "var(--font-pacifico), cursive", konva: "Pacifico, cursive" },
  { id: "satisfy", name: "Satisfy", css: "var(--font-satisfy), cursive", konva: "Satisfy, cursive" },
  { id: "kalam", name: "Kalam", css: "var(--font-kalam), cursive", konva: "Kalam, cursive" },
  { id: "amatic-sc", name: "Amatic SC", css: "var(--font-amatic-sc), cursive", konva: "Amatic SC, cursive" },
  { id: "patrick-hand", name: "Patrick Hand", css: "var(--font-patrick-hand), cursive", konva: "Patrick Hand, cursive" },
  { id: "shadows-into-light", name: "Shadows Into Light", css: "var(--font-shadows-into-light), cursive", konva: "Shadows Into Light, cursive" },
  { id: "architects-daughter", name: "Architects Daughter", css: "var(--font-architects-daughter), cursive", konva: "Architects Daughter, cursive" },
  { id: "alex-brush", name: "Alex Brush", css: "var(--font-alex-brush), cursive", konva: "Alex Brush, cursive" },
  { id: "allura", name: "Allura", css: "var(--font-allura), cursive", konva: "Allura, cursive" },
] as const;

export type FontFamily = (typeof FONT_FAMILIES)[number];

export const FONT_SIZES = [16, 18, 20, 22, 24, 28, 32] as const;

export const LINE_SPACINGS = [
  { label: "Tight", value: 22 },
  { label: "Normal", value: 28 },
  { label: "Relaxed", value: 34 },
  { label: "Loose", value: 40 },
  { label: "Double", value: 48 },
] as const;

export const PAPER = {
  width: 700,
  height: 520,
  background: "#F5E6CA",
  lineSpacing: 28,
  paddingTop: 40,
  paddingLeft: 48,
  paddingRight: 48,
  lineColor: "rgba(139, 105, 20, 0.15)",
} as const;

export const PAPER_TEMPLATES = [
  {
    id: "parchment",
    name: "Parchment",
    background: "#F5E6CA",
    lineColor: "rgba(139, 105, 20, 0.15)",
  },
  {
    id: "rose",
    name: "Rose",
    background: "#F9E4E4",
    lineColor: "rgba(180, 100, 100, 0.15)",
  },
  {
    id: "lavender",
    name: "Lavender",
    background: "#EDE4F3",
    lineColor: "rgba(120, 80, 160, 0.15)",
  },
  {
    id: "sky",
    name: "Sky",
    background: "#E2EEF6",
    lineColor: "rgba(60, 100, 150, 0.15)",
  },
  {
    id: "mint",
    name: "Mint",
    background: "#E4F2E8",
    lineColor: "rgba(70, 130, 80, 0.15)",
  },
  {
    id: "cream",
    name: "Cream",
    background: "#FDF6E3",
    lineColor: "rgba(160, 130, 60, 0.12)",
  },
  {
    id: "blush",
    name: "Blush",
    background: "#FAE8E0",
    lineColor: "rgba(170, 110, 90, 0.15)",
  },
  {
    id: "ivory",
    name: "Ivory",
    background: "#FFFFF0",
    lineColor: "rgba(140, 130, 100, 0.12)",
  },
] as const;

export type PaperTemplate = (typeof PAPER_TEMPLATES)[number];

export const PAPER_SIZES = [
  { id: "letter", name: "Letter", width: 700, height: 520 },
  { id: "a4", name: "A4", width: 620, height: 877 },
  { id: "square", name: "Square", width: 600, height: 600 },
  { id: "postcard", name: "Postcard", width: 600, height: 400 },
  { id: "wide", name: "Wide", width: 800, height: 450 },
] as const;

export type PaperSize = (typeof PAPER_SIZES)[number];

export const CARRIAGE = {
  trackHeight: 32,
  handleWidth: 48,
  returnThreshold: 0.7,
  springBackDuration: 400,
} as const;

export type InkColor = (typeof INK_COLORS)[number];
