export interface BackgroundTemplate {
  id: string;
  name: string;
  category: "Floral" | "Texture" | "Pattern" | "Seasonal" | "Cute";
  src: string;
  preview: string; // CSS background color for tiny thumbnail
}

export const BACKGROUND_TEMPLATES: BackgroundTemplate[] = [
  // Floral
  { id: "rose-garden", name: "Rose Garden", category: "Floral", src: "/backgrounds/rose-garden.svg", preview: "#FFF0F3" },
  { id: "cherry-blossom", name: "Cherry Blossom", category: "Floral", src: "/backgrounds/cherry-blossom.svg", preview: "#FFF5F8" },
  { id: "wildflowers", name: "Wildflowers", category: "Floral", src: "/backgrounds/wildflowers.svg", preview: "#FEFDF5" },
  { id: "lavender-field", name: "Lavender", category: "Floral", src: "/backgrounds/lavender-field.svg", preview: "#F5F0FA" },
  { id: "sunflower", name: "Sunflower", category: "Floral", src: "/backgrounds/sunflower.svg", preview: "#FFFEF5" },

  // Texture
  { id: "aged-parchment", name: "Aged Paper", category: "Texture", src: "/backgrounds/aged-parchment.svg", preview: "#E8D0A0" },
  { id: "kraft-paper", name: "Kraft", category: "Texture", src: "/backgrounds/kraft-paper.svg", preview: "#C4956A" },
  { id: "linen", name: "Linen", category: "Texture", src: "/backgrounds/linen.svg", preview: "#F0E8DA" },
  { id: "watercolor-blue", name: "Watercolor Blue", category: "Texture", src: "/backgrounds/watercolor-blue.svg", preview: "#E0EEF8" },
  { id: "watercolor-pink", name: "Watercolor Pink", category: "Texture", src: "/backgrounds/watercolor-pink.svg", preview: "#FFF0F5" },
  { id: "marble", name: "Marble", category: "Texture", src: "/backgrounds/marble.svg", preview: "#F5F2EE" },
  { id: "rose-gold-marble", name: "Rose Marble", category: "Texture", src: "/backgrounds/rose-gold-marble.svg", preview: "#FAE4DE" },

  // Pattern
  { id: "polka-dots", name: "Polka Dots", category: "Pattern", src: "/backgrounds/polka-dots.svg", preview: "#FFF8F0" },
  { id: "gingham", name: "Gingham", category: "Pattern", src: "/backgrounds/gingham.svg", preview: "#FFF5F5" },
  { id: "vintage-stripes", name: "Stripes", category: "Pattern", src: "/backgrounds/vintage-stripes.svg", preview: "#FDF8F0" },
  { id: "damask", name: "Damask", category: "Pattern", src: "/backgrounds/damask.svg", preview: "#F8F0E8" },
  { id: "lace", name: "Lace", category: "Pattern", src: "/backgrounds/lace.svg", preview: "#FFFBF5" },
  { id: "gold-filigree", name: "Gold Filigree", category: "Pattern", src: "/backgrounds/gold-filigree.svg", preview: "#FDF8F0" },

  // Seasonal
  { id: "autumn-leaves", name: "Autumn", category: "Seasonal", src: "/backgrounds/autumn-leaves.svg", preview: "#FFF8F0" },
  { id: "snowflakes", name: "Snowflakes", category: "Seasonal", src: "/backgrounds/snowflakes.svg", preview: "#F0F4F8" },
  { id: "hearts", name: "Hearts", category: "Seasonal", src: "/backgrounds/hearts.svg", preview: "#FFF5F5" },
  { id: "stars", name: "Stars", category: "Seasonal", src: "/backgrounds/stars.svg", preview: "#F8F5FF" },
  { id: "confetti", name: "Confetti", category: "Seasonal", src: "/backgrounds/confetti.svg", preview: "#FFFEF8" },

  // Cute
  { id: "shark-cat", name: "Shark Cat", category: "Cute", src: "/backgrounds/shark-cat.jpg", preview: "#EDE8E0" },
  { id: "red-lilies", name: "Red Lilies", category: "Cute", src: "/backgrounds/red-lilies.webp", preview: "#F5F0E8" },
  { id: "wildflower-field", name: "Flower Field", category: "Cute", src: "/backgrounds/wildflower-field.webp", preview: "#F0EBE0" },
  { id: "lace-ribbon", name: "Lace Ribbon", category: "Cute", src: "/backgrounds/lace-ribbon.webp", preview: "#5A1520" },
  { id: "ribbon-paper", name: "Ribbon Paper", category: "Cute", src: "/backgrounds/ribbon-paper.webp", preview: "#6A1828" },
  { id: "maroon-polaroid", name: "Polaroid", category: "Cute", src: "/backgrounds/maroon-polaroid.webp", preview: "#1A1A1A" },
  { id: "vintage-photos", name: "Vintage Photos", category: "Cute", src: "/backgrounds/vintage-photos.webp", preview: "#D0D0D0" },
];

export const BACKGROUND_CATEGORIES = ["All", "Floral", "Texture", "Pattern", "Seasonal", "Cute"] as const;
