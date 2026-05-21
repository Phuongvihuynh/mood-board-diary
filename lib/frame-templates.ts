import type { FrameTemplate, FrameType } from "@/types/typewriter";

export const FRAME_TEMPLATES: FrameTemplate[] = [
  { id: "none", name: "No Frame", description: "Plain image" },
  { id: "polaroid", name: "Polaroid", description: "Classic instant photo" },
  {
    id: "vintage-gold",
    name: "Vintage Gold",
    description: "Ornate gold border",
  },
  {
    id: "tape-corners",
    name: "Tape Corners",
    description: "Photo taped at corners",
  },
  { id: "torn-paper", name: "Torn Paper", description: "Torn edge effect" },
  {
    id: "stamp-border",
    name: "Stamp Border",
    description: "Postage stamp style",
  },
];

export function getFrameStyles(
  frame: FrameType,
  width: number,
  height: number
): React.CSSProperties {
  const base: React.CSSProperties = {
    width,
    height,
    position: "relative",
    overflow: "visible",
  };

  switch (frame) {
    case "polaroid":
      return {
        ...base,
        width: width + 16,
        height: height + 40,
        padding: "8px 8px 32px 8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "2px 3px 8px rgba(0,0,0,0.2)",
      };

    case "vintage-gold":
      return {
        ...base,
        width: width + 16,
        height: height + 16,
        padding: 8,
        border: "4px solid #8B6914",
        backgroundColor: "#F5E6CA",
      };

    case "tape-corners":
      return {
        ...base,
        // Tape corners are rendered as pseudo-elements in the component
      };

    case "torn-paper":
      return {
        ...base,
        width: width + 16,
        height: height + 16,
        padding: 8,
        backgroundColor: "#FFFFFF",
        clipPath:
          "polygon(0% 2%, 4% 0%, 8% 3%, 12% 1%, 16% 2%, 20% 0%, 24% 3%, 28% 1%, 32% 2%, 36% 0%, 40% 2%, 44% 1%, 48% 3%, 52% 0%, 56% 2%, 60% 1%, 64% 3%, 68% 0%, 72% 2%, 76% 1%, 80% 3%, 84% 0%, 88% 2%, 92% 1%, 96% 3%, 100% 0%, 100% 98%, 96% 100%, 92% 97%, 88% 100%, 84% 98%, 80% 100%, 76% 97%, 72% 100%, 68% 98%, 64% 100%, 60% 97%, 56% 100%, 52% 98%, 48% 100%, 44% 97%, 40% 100%, 36% 98%, 32% 100%, 28% 97%, 24% 100%, 20% 98%, 16% 100%, 12% 97%, 8% 100%, 4% 98%, 0% 100%)",
      };

    case "stamp-border":
      return {
        ...base,
        width: width + 20,
        height: height + 20,
        padding: 10,
        border: "3px dashed #8B6914",
        backgroundColor: "#FFFFFF",
      };

    default:
      return base;
  }
}
