"use client";

import { useRef, useState } from "react";
import {
  BACKGROUND_TEMPLATES,
  BACKGROUND_CATEGORIES,
} from "@/lib/background-templates";
import { useCardStore } from "@/stores/useCardStore";

const ALL_CATEGORIES = [...BACKGROUND_CATEGORIES, "Custom"] as const;
type Category = (typeof ALL_CATEGORIES)[number];

export default function BackgroundTemplatePicker() {
  const {
    paperBackgroundImage,
    setPaperBackgroundImage,
    customBackgrounds,
    addCustomBackground,
    removeCustomBackground,
  } = useCardStore();
  const bgInputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category>("All");

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      const name = file.name.replace(/\.[^.]+$/, "").slice(0, 12);
      addCustomBackground(src, name);
      setPaperBackgroundImage(src);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const filtered =
    category === "All"
      ? BACKGROUND_TEMPLATES
      : category === "Custom"
        ? []
        : BACKGROUND_TEMPLATES.filter((t) => t.category === category);

  return (
    <div>
      <h3 className="text-sm font-semibold text-ink mb-2">
        Background Templates
      </h3>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 mb-2">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-2 py-0.5 text-[10px] rounded-full transition-colors ${
              category === cat
                ? "bg-warm-brown text-cream"
                : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
            }`}
          >
            {cat}
            {cat === "Custom" && customBackgrounds.length > 0 && (
              <span className="ml-0.5">({customBackgrounds.length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Preset template grid */}
      {category !== "Custom" && filtered.length > 0 && (
        <div className="grid grid-cols-4 gap-1.5">
          {filtered.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setPaperBackgroundImage(tmpl.src)}
              title={tmpl.name}
              className="flex flex-col items-center gap-0.5 p-1 rounded border transition-colors"
              style={{
                borderColor:
                  paperBackgroundImage === tmpl.src
                    ? "#8B6914"
                    : "rgba(139, 105, 20, 0.2)",
                borderWidth: paperBackgroundImage === tmpl.src ? 2 : 1,
              }}
            >
              <div
                className="w-full aspect-square rounded-sm overflow-hidden"
                style={{
                  backgroundImage: `url(${tmpl.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: tmpl.preview,
                }}
              />
              <span className="text-[8px] text-ink/60 leading-tight truncate w-full text-center">
                {tmpl.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Custom backgrounds grid */}
      {(category === "All" || category === "Custom") &&
        customBackgrounds.length > 0 && (
          <>
            {category === "All" && (
              <h4 className="text-[10px] font-medium text-ink/50 mt-2 mb-1">
                Custom
              </h4>
            )}
            <div className="grid grid-cols-4 gap-1.5">
              {customBackgrounds.map((bg) => (
                <div key={bg.id} className="relative group">
                  <button
                    onClick={() => setPaperBackgroundImage(bg.src)}
                    title={bg.name}
                    className="w-full flex flex-col items-center gap-0.5 p-1 rounded border transition-colors"
                    style={{
                      borderColor:
                        paperBackgroundImage === bg.src
                          ? "#8B6914"
                          : "rgba(139, 105, 20, 0.2)",
                      borderWidth: paperBackgroundImage === bg.src ? 2 : 1,
                    }}
                  >
                    <div
                      className="w-full aspect-square rounded-sm overflow-hidden"
                      style={{
                        backgroundImage: `url(${bg.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <span className="text-[8px] text-ink/60 leading-tight truncate w-full text-center">
                      {bg.name}
                    </span>
                  </button>
                  <button
                    onClick={() => removeCustomBackground(bg.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

      {/* Empty custom state */}
      {category === "Custom" && customBackgrounds.length === 0 && (
        <p className="text-[10px] text-ink/40 text-center py-4">
          No custom backgrounds yet. Upload one below!
        </p>
      )}

      {/* Upload + Remove */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => bgInputRef.current?.click()}
          className="flex-1 py-1.5 px-2 rounded border border-dashed border-warm-brown/40 text-ink/70 text-xs hover:bg-warm-brown/5 transition-colors"
        >
          + Upload Background
        </button>
        {paperBackgroundImage && (
          <button
            onClick={() => setPaperBackgroundImage(null)}
            className="py-1.5 px-2 rounded border border-warm-brown/30 text-ink/50 text-xs hover:bg-warm-brown/10 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
      <input
        ref={bgInputRef}
        type="file"
        accept="image/*"
        onChange={handleBgUpload}
        className="hidden"
      />
    </div>
  );
}
