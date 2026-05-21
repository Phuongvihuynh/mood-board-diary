"use client";

import {
  INK_COLORS,
  FONT_SIZES,
  FONT_FAMILIES,
  LINE_SPACINGS,
  PAPER_TEMPLATES,
  PAPER_SIZES,
} from "@/lib/typewriter-constants";
import { useCardStore } from "@/stores/useCardStore";

export default function TypewriterToolbar() {
  const {
    inkColor,
    setInkColor,
    fontSize,
    setFontSize,
    fontFamilyId,
    setFontFamily,
    paperWidth,
    paperHeight,
    paperBackground,
    paperBackgroundImage,
    isBold,
    isItalic,
    isUnderline,
    textAlign,
    lineSpacing,
    setPaperSize,
    setPaperTemplate,
    toggleBold,
    toggleItalic,
    toggleUnderline,
    setTextAlign,
    setLineSpacing,
    undo,
    redo,
    canUndo,
    canRedo,
    clearContent,
  } = useCardStore();
  const handleDownload = () => {
    window.dispatchEvent(new CustomEvent("typewriter:export"));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Undo / Redo */}
      <div className="flex gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="flex-1 py-1.5 text-sm rounded border transition-colors flex items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          Undo
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="flex-1 py-1.5 text-sm rounded border transition-colors flex items-center justify-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
          </svg>
          Redo
        </button>
      </div>

      {/* Ink Color */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Ink Color</h3>
        <div className="grid grid-cols-3 gap-2">
          {INK_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setInkColor(color.value)}
              className="flex flex-col items-center gap-1 p-1.5 rounded border transition-colors"
              style={{
                borderColor:
                  inkColor === color.value
                    ? color.value
                    : "rgba(139, 105, 20, 0.2)",
                backgroundColor:
                  inkColor === color.value
                    ? "rgba(139, 105, 20, 0.08)"
                    : "transparent",
              }}
            >
              <div
                className="w-5 h-5 rounded-full border border-warm-brown/20"
                style={{ backgroundColor: color.value }}
              />
              <span className="text-[10px] text-ink/70">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Paper Size */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Paper Size</h3>
        <div className="flex flex-wrap gap-1">
          {PAPER_SIZES.map((size) => (
            <button
              key={size.id}
              onClick={() => setPaperSize(size.id)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                paperWidth === size.width && paperHeight === size.height
                  ? "bg-warm-brown text-cream"
                  : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-ink/40 mt-1">
          {paperWidth} &times; {paperHeight}px
        </p>
      </div>

      {/* Paper Color */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Paper Color</h3>
        <div className="grid grid-cols-4 gap-2">
          {PAPER_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setPaperTemplate(tmpl.id)}
              title={tmpl.name}
              className="flex flex-col items-center gap-1 p-1 rounded border transition-colors"
              style={{
                borderColor:
                  !paperBackgroundImage && paperBackground === tmpl.background
                    ? "#8B6914"
                    : "rgba(139, 105, 20, 0.2)",
                borderWidth:
                  !paperBackgroundImage && paperBackground === tmpl.background
                    ? 2
                    : 1,
              }}
            >
              <div
                className="w-8 h-8 rounded-sm border border-warm-brown/10"
                style={{ backgroundColor: tmpl.background }}
              />
              <span className="text-[9px] text-ink/60 leading-tight">
                {tmpl.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Formatting */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Format</h3>
        <div className="flex gap-1">
          <button
            onClick={toggleBold}
            className={`flex-1 py-1.5 text-sm font-bold rounded border transition-colors ${
              isBold
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            B
          </button>
          <button
            onClick={toggleItalic}
            className={`flex-1 py-1.5 text-sm italic rounded border transition-colors ${
              isItalic
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            I
          </button>
          <button
            onClick={toggleUnderline}
            className={`flex-1 py-1.5 text-sm underline rounded border transition-colors ${
              isUnderline
                ? "bg-warm-brown text-cream border-warm-brown"
                : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
            }`}
          >
            U
          </button>
        </div>
        <div className="flex gap-1 mt-1">
          {(["left", "center", "right"] as const).map((align) => (
            <button
              key={align}
              onClick={() => setTextAlign(align)}
              title={align.charAt(0).toUpperCase() + align.slice(1)}
              className={`flex-1 py-1.5 rounded border transition-colors flex items-center justify-center ${
                textAlign === align
                  ? "bg-warm-brown text-cream border-warm-brown"
                  : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                {align === "left" && (
                  <>
                    <rect x="1" y="2" width="14" height="1.5" rx="0.5"/>
                    <rect x="1" y="6" width="10" height="1.5" rx="0.5"/>
                    <rect x="1" y="10" width="12" height="1.5" rx="0.5"/>
                    <rect x="1" y="14" width="8" height="1.5" rx="0.5"/>
                  </>
                )}
                {align === "center" && (
                  <>
                    <rect x="1" y="2" width="14" height="1.5" rx="0.5"/>
                    <rect x="3" y="6" width="10" height="1.5" rx="0.5"/>
                    <rect x="2" y="10" width="12" height="1.5" rx="0.5"/>
                    <rect x="4" y="14" width="8" height="1.5" rx="0.5"/>
                  </>
                )}
                {align === "right" && (
                  <>
                    <rect x="1" y="2" width="14" height="1.5" rx="0.5"/>
                    <rect x="5" y="6" width="10" height="1.5" rx="0.5"/>
                    <rect x="3" y="10" width="12" height="1.5" rx="0.5"/>
                    <rect x="7" y="14" width="8" height="1.5" rx="0.5"/>
                  </>
                )}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Font</h3>
        <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto pr-1">
          {FONT_FAMILIES.map((font) => (
            <button
              key={font.id}
              onClick={() => setFontFamily(font.id)}
              className={`px-2 py-1.5 text-xs rounded border transition-colors truncate ${
                fontFamilyId === font.id
                  ? "bg-warm-brown text-cream border-warm-brown"
                  : "bg-cream text-ink/70 border-warm-brown/20 hover:bg-warm-brown/10"
              }`}
              style={{ fontFamily: font.css }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Font Size</h3>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full px-2 py-1.5 rounded border border-warm-brown/20 bg-cream text-ink text-sm"
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* Line Spacing */}
      <div>
        <h3 className="text-sm font-semibold text-ink mb-2">Line Spacing</h3>
        <div className="flex flex-wrap gap-1">
          {LINE_SPACINGS.map((sp) => (
            <button
              key={sp.value}
              onClick={() => setLineSpacing(sp.value)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                lineSpacing === sp.value
                  ? "bg-warm-brown text-cream"
                  : "bg-warm-brown/10 text-warm-brown hover:bg-warm-brown/20"
              }`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Download */}
      <button
        onClick={handleDownload}
        className="w-full py-2 px-3 rounded bg-warm-brown text-cream text-sm font-medium hover:bg-warm-brown/90 transition-colors"
      >
        Download as Image
      </button>

      {/* Clear */}
      <button
        onClick={() => clearContent()}
        className="w-full py-2 px-3 rounded border border-warm-brown/30 text-ink/70 text-sm hover:bg-warm-brown/10 transition-colors"
      >
        Clear Letter
      </button>
    </div>
  );
}
