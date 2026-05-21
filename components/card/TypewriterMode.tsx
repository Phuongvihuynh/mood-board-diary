"use client";

import { useRef, useCallback, useEffect } from "react";
import { PAPER, FONT_FAMILIES } from "@/lib/typewriter-constants";
import { useCardStore } from "@/stores/useCardStore";
import CarriageReturn from "./CarriageReturn";
import TypewriterExport from "./TypewriterExport";
import OverlayLayer from "./OverlayLayer";

export default function TypewriterMode() {
  const {
    text,
    setText,
    inkColor,
    fontSize,
    paperWidth,
    paperHeight,
    paperBackground,
    paperLineColor,
    paperBackgroundImage,
    isBold,
    isItalic,
    isUnderline,
    fontFamilyId,
    textAlign,
    lineSpacing,
    selectOverlay,
    undo,
    redo,
    _saveSnapshot,
  } = useCardStore();

  const currentFont = FONT_FAMILIES.find((f) => f.id === fontFamilyId) ?? FONT_FAMILIES[0];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced text snapshot: save a snapshot 500ms after the user stops typing
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      // Save snapshot before the first keystroke in a burst
      if (!debounceRef.current) _saveSnapshot();
      setText(e.target.value);
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
      }, 500);
    },
    [setText, _saveSnapshot]
  );

  // Keyboard shortcuts: Ctrl+Z / Ctrl+Shift+Z (or Cmd on Mac)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && e.key === "z" && e.shiftKey) {
        e.preventDefault();
        redo();
      } else if (mod && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const handleCarriageReturn = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) {
      setText(text + "\n");
      return;
    }

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = text.slice(0, start);
    const after = text.slice(end);
    const newText = before + "\n" + after;
    setText(newText);

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      ta.selectionStart = start + 1;
      ta.selectionEnd = start + 1;
      ta.focus();
    });
  }, [text, setText]);

  // Generate ruled-line background
  const ruledLinesBg = `repeating-linear-gradient(
    to bottom,
    transparent,
    transparent ${lineSpacing - 1}px,
    ${paperLineColor} ${lineSpacing - 1}px,
    ${paperLineColor} ${lineSpacing}px
  )`;

  return (
    <div className="flex flex-col items-center">
      {/* Carriage */}
      <CarriageReturn onReturn={handleCarriageReturn} />

      {/* Paper */}
      <div
        className="relative border border-warm-brown/30 shadow-lg"
        style={{
          width: paperWidth,
          height: paperHeight,
          backgroundColor: paperBackground,
          backgroundImage: paperBackgroundImage
            ? `url(${paperBackgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => selectOverlay(null)}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: ruledLinesBg,
            backgroundPositionY: PAPER.paddingTop,
          }}
        />

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none"
          style={{
            fontFamily: currentFont.css,
            fontSize,
            lineHeight: `${lineSpacing}px`,
            color: inkColor,
            caretColor: inkColor,
            padding: `${PAPER.paddingTop}px ${PAPER.paddingRight}px 20px ${PAPER.paddingLeft}px`,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            textAlign,
            zIndex: 10,
            position: "relative",
          }}
          placeholder="Start typing your letter..."
          spellCheck={false}
          autoFocus
        />

        {/* Overlay layer for stickers and images */}
        <OverlayLayer />
      </div>

      {/* Hidden export stage */}
      <TypewriterExport />
    </div>
  );
}
