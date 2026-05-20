"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Text, Image as KonvaImage } from "react-konva";
import { useBoardStore } from "@/stores/useBoardStore";
import { FONT_FAMILY_MAP } from "@/lib/fonts";
import type Konva from "konva";

export interface ExportLayerHandle {
  exportPNG: () => Promise<string | null>;
}

export const BoardExportLayer = forwardRef<ExportLayerHandle>(
  function BoardExportLayer(_, ref) {
    const stageRef = useRef<Konva.Stage>(null);
    const board = useBoardStore((s) => s.board);

    useImperativeHandle(ref, () => ({
      exportPNG: async () => {
        if (!stageRef.current || !board) return null;

        // Wait a tick for images to render
        await new Promise((r) => setTimeout(r, 200));

        return stageRef.current.toDataURL({ pixelRatio: 2 });
      },
    }));

    if (!board) return null;

    // Parse background color
    const bgColor =
      board.background.type === "color"
        ? board.background.value
        : "#F5E6D3";

    return (
      <div
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          pointerEvents: "none",
        }}
      >
        <Stage
          ref={stageRef}
          width={board.canvasWidth}
          height={board.canvasHeight}
        >
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={board.canvasWidth}
              height={board.canvasHeight}
              fill={bgColor}
            />

            {/* Elements */}
            {[...board.elements]
              .sort((a, b) => a.zIndex - b.zIndex)
              .map((el) => {
                if (el.type === "text") {
                  // Map CSS variable font to actual font name
                  const fontNames: Record<string, string> = {
                    caveat: "Caveat",
                    "indie-flower": "Indie Flower",
                    kalam: "Kalam",
                    "dancing-script": "Dancing Script",
                    "patrick-hand": "Patrick Hand",
                    "gloria-hallelujah": "Gloria Hallelujah",
                  };
                  return (
                    <Text
                      key={el.id}
                      x={el.x}
                      y={el.y}
                      width={el.width}
                      height={el.height}
                      text={el.content}
                      fontSize={el.fontSize}
                      fontFamily={fontNames[el.fontFamilyId] || "Kalam"}
                      fill={el.color}
                      align={el.textAlign}
                      rotation={el.rotation}
                      opacity={el.opacity}
                    />
                  );
                }

                // For images (photo, sticker, decoration), render via KonvaImage
                if (
                  el.type === "photo" ||
                  el.type === "sticker" ||
                  el.type === "decoration"
                ) {
                  return (
                    <KonvaImageFromSrc
                      key={el.id}
                      src={el.src}
                      x={el.x}
                      y={el.y}
                      width={el.width}
                      height={el.height}
                      rotation={el.rotation}
                      opacity={el.opacity}
                    />
                  );
                }

                return null;
              })}
          </Layer>
        </Stage>
      </div>
    );
  }
);

function KonvaImageFromSrc({
  src,
  x,
  y,
  width,
  height,
  rotation,
  opacity,
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
    img.src = src;
  }, [src]);

  if (!image) return null;

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      rotation={rotation}
      opacity={opacity}
    />
  );
}

