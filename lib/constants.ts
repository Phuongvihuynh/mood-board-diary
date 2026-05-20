export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const COLORS = {
  cream: "#FFF8F0",
  blush: "#FFE4E1",
  lavender: "#E8DFF5",
  sage: "#D4E2D4",
  warmPink: "#E8A0BF",
  softBrown: "#C4A882",
  parchment: "#F5E6D3",
  roseDust: "#D4A5A5",
  paleYellow: "#FFF9DB",
  mintCream: "#F0FFF4",
} as const;

export const BACKGROUND_COLORS = [
  { id: "cream", label: "Cream", value: "#FFF8F0" },
  { id: "blush", label: "Blush", value: "#FFE4E1" },
  { id: "lavender", label: "Lavender", value: "#E8DFF5" },
  { id: "sage", label: "Sage", value: "#D4E2D4" },
  { id: "parchment", label: "Parchment", value: "#F5E6D3" },
  { id: "paleYellow", label: "Pale Yellow", value: "#FFF9DB" },
  { id: "mintCream", label: "Mint", value: "#F0FFF4" },
  { id: "white", label: "White", value: "#FFFFFF" },
  { id: "warmPink", label: "Warm Pink", value: "#E8A0BF" },
  { id: "roseDust", label: "Rose Dust", value: "#D4A5A5" },
];

export const BACKGROUND_PATTERNS = [
  { id: "none", label: "None" },
  { id: "dots", label: "Dots" },
  { id: "grid", label: "Grid" },
  { id: "lines", label: "Lines" },
];

export const FONT_OPTIONS = [
  { id: "caveat", label: "Caveat", className: "font-caveat" },
  { id: "indie-flower", label: "Indie Flower", className: "font-indie-flower" },
  { id: "kalam", label: "Kalam", className: "font-kalam" },
  { id: "dancing-script", label: "Dancing Script", className: "font-dancing-script" },
  { id: "patrick-hand", label: "Patrick Hand", className: "font-patrick-hand" },
  { id: "gloria-hallelujah", label: "Gloria Hallelujah", className: "font-gloria-hallelujah" },
];

export const TEXT_COLORS = [
  "#1a1a2e",
  "#4a3728",
  "#8B4513",
  "#2d4a3e",
  "#4a2d4a",
  "#E8A0BF",
  "#D4A5A5",
  "#6B7280",
  "#DC2626",
  "#2563EB",
];

export const MAX_UNDO_STEPS = 50;
export const AUTOSAVE_DELAY = 1000;
export const MAX_IMAGE_DIMENSION = 800;
