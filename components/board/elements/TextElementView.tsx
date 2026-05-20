"use client";

import { useState, useRef, useEffect } from "react";
import { TextElement } from "@/types/board";
import { useBoardStore } from "@/stores/useBoardStore";
import { FONT_FAMILY_MAP } from "@/lib/fonts";

interface TextElementViewProps {
  element: TextElement;
}

export function TextElementView({ element }: TextElementViewProps) {
  const [editing, setEditing] = useState(false);
  const updateElement = useBoardStore((s) => s.updateElement);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(ref.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [editing]);

  const fontFamily = FONT_FAMILY_MAP[element.fontFamilyId] || "inherit";

  if (editing) {
    return (
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="w-full h-full outline-none cursor-text select-text"
        style={{
          fontFamily,
          fontSize: element.fontSize,
          color: element.color,
          textAlign: element.textAlign,
          lineHeight: 1.4,
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onBlur={(e) => {
          setEditing(false);
          updateElement(element.id, {
            content: e.currentTarget.textContent || "",
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.currentTarget.blur();
          }
        }}
      >
        {element.content}
      </div>
    );
  }

  return (
    <div
      className="w-full h-full cursor-move"
      style={{
        fontFamily,
        fontSize: element.fontSize,
        color: element.color,
        textAlign: element.textAlign,
        lineHeight: 1.4,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
    >
      {element.content}
    </div>
  );
}
