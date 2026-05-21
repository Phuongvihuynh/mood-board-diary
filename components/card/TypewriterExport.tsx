"use client";

import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Text, Line, Image as KonvaImage } from "react-konva";
import { PAPER, FONT_FAMILIES } from "@/lib/typewriter-constants";
import { useCardStore } from "@/stores/useCardStore";
import OverlayExportLayer from "./OverlayExportLayer";
import type Konva from "konva";

export default function TypewriterExport() {
  const stageRef = useRef<Konva.Stage>(null);
  const {
    text,
    inkColor,
    fontSize,
    overlays,
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
  } = useCardStore();

  const currentFont = FONT_FAMILIES.find((f) => f.id === fontFamilyId) ?? FONT_FAMILIES[0];
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!paperBackgroundImage) {
      setBgImage(null);
      return;
    }
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setBgImage(img);
    img.src = paperBackgroundImage;
  }, [paperBackgroundImage]);

  useEffect(() => {
    const handleExport = async () => {
      const stage = stageRef.current;
      if (!stage) return;

      // Wait for font and overlay images to be available
      await document.fonts.ready;

      // Give overlay images time to load in the Konva layer
      if (overlays.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      const dataUrl = stage.toDataURL({ pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "greeting-card.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    window.addEventListener("typewriter:export", handleExport);
    return () => window.removeEventListener("typewriter:export", handleExport);
  }, [overlays.length]);

  // Generate ruled lines
  const lines: number[] = [];
  for (
    let y = PAPER.paddingTop + lineSpacing;
    y < paperHeight;
    y += lineSpacing
  ) {
    lines.push(y);
  }

  return (
    <div style={{ position: "fixed", left: -9999, top: -9999, pointerEvents: "none" }}>
      <Stage ref={stageRef} width={paperWidth} height={paperHeight}>
        <Layer>
          {/* Paper background */}
          <Rect
            x={0}
            y={0}
            width={paperWidth}
            height={paperHeight}
            fill={paperBackground}
          />

          {/* Background image */}
          {bgImage && (
            <KonvaImage
              image={bgImage}
              x={0}
              y={0}
              width={paperWidth}
              height={paperHeight}
            />
          )}

          {/* Ruled lines */}
          {lines.map((y) => (
            <Line
              key={y}
              points={[0, y, paperWidth, y]}
              stroke={paperLineColor}
              strokeWidth={1}
            />
          ))}

          {/* Text */}
          <Text
            x={PAPER.paddingLeft}
            y={PAPER.paddingTop}
            width={paperWidth - PAPER.paddingLeft - PAPER.paddingRight}
            text={text}
            fontSize={fontSize}
            fontFamily={currentFont.konva}
            fontStyle={[isBold ? "bold" : "", isItalic ? "italic" : ""].filter(Boolean).join(" ") || "normal"}
            textDecoration={isUnderline ? "underline" : ""}
            align={textAlign}
            fill={inkColor}
            lineHeight={lineSpacing / fontSize}
          />

          {/* Overlays (stickers + images with frames) */}
          <OverlayExportLayer />
        </Layer>
      </Stage>
    </div>
  );
}
