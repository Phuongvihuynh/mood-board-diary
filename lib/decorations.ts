export interface DecorationInfo {
  id: string;
  name: string;
  src: string;
  variant: "washi-tape" | "scotch-tape" | "torn-paper" | "paper-clip";
  defaultWidth: number;
  defaultHeight: number;
}

export const decorations: DecorationInfo[] = [
  // Washi tape
  {
    id: "washi-pink",
    name: "Pink Washi",
    src: "/decorations/washi-pink.svg",
    variant: "washi-tape",
    defaultWidth: 200,
    defaultHeight: 40,
  },
  {
    id: "washi-blue",
    name: "Blue Washi",
    src: "/decorations/washi-blue.svg",
    variant: "washi-tape",
    defaultWidth: 200,
    defaultHeight: 40,
  },
  {
    id: "washi-yellow",
    name: "Yellow Washi",
    src: "/decorations/washi-yellow.svg",
    variant: "washi-tape",
    defaultWidth: 200,
    defaultHeight: 40,
  },

  // Scotch tape
  {
    id: "scotch-tape",
    name: "Scotch Tape",
    src: "/decorations/scotch-tape.svg",
    variant: "scotch-tape",
    defaultWidth: 120,
    defaultHeight: 30,
  },
  {
    id: "masking-tape",
    name: "Masking Tape",
    src: "/decorations/masking-tape.svg",
    variant: "scotch-tape",
    defaultWidth: 140,
    defaultHeight: 35,
  },

  // Torn paper
  {
    id: "torn-paper",
    name: "Torn Paper",
    src: "/decorations/torn-paper.svg",
    variant: "torn-paper",
    defaultWidth: 250,
    defaultHeight: 150,
  },
  {
    id: "note-paper",
    name: "Note Paper",
    src: "/decorations/note-paper.svg",
    variant: "torn-paper",
    defaultWidth: 200,
    defaultHeight: 180,
  },

  // Paper clips
  {
    id: "paper-clip-gold",
    name: "Gold Clip",
    src: "/decorations/paper-clip-gold.svg",
    variant: "paper-clip",
    defaultWidth: 30,
    defaultHeight: 80,
  },
  {
    id: "paper-clip-rose",
    name: "Rose Clip",
    src: "/decorations/paper-clip-rose.svg",
    variant: "paper-clip",
    defaultWidth: 30,
    defaultHeight: 80,
  },
];
