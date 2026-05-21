"use client";

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from "react-konva";
import { useBoardStore } from "@/stores/useBoardStore";
import { FONT_FAMILY_MAP } from "@/lib/fonts";
import type Konva from "konva";
import type { CollageElement } from "@/types/board";

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

                if (el.type === "collage") {
                  return (
                    <KonvaCollage
                      key={el.id}
                      element={el}
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

function KonvaCollage({ element }: { element: CollageElement }) {
  const halfGap = element.gap / 2;

  return (
    <Group
      x={element.x}
      y={element.y}
      width={element.width}
      height={element.height}
      rotation={element.rotation}
      opacity={element.opacity}
    >
      {/* Background */}
      <Rect
        x={0}
        y={0}
        width={element.width}
        height={element.height}
        fill={element.backgroundColor}
        cornerRadius={element.borderRadius}
      />
      {/* Slots */}
      {element.slots.map((slot) => {
        const sx = (slot.x / 100) * element.width + halfGap;
        const sy = (slot.y / 100) * element.height + halfGap;
        const sw = (slot.width / 100) * element.width - element.gap;
        const sh = (slot.height / 100) * element.height - element.gap;

        if (!slot.src) {
          return (
            <Rect
              key={slot.id}
              x={sx}
              y={sy}
              width={sw}
              height={sh}
              fill="#f0f0f0"
              cornerRadius={Math.max(0, element.borderRadius - 2)}
            />
          );
        }

        return (
          <KonvaCollageSlotImage
            key={slot.id}
            src={slot.src}
            x={sx}
            y={sy}
            width={sw}
            height={sh}
            cornerRadius={Math.max(0, element.borderRadius - 2)}
          />
        );
      })}
    </Group>
  );
}

function KonvaCollageSlotImage({
  src,
  x,
  y,
  width,
  height,
  cornerRadius,
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  cornerRadius: number;
}) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
    img.src = src;
  }, [src]);

  if (!image) return null;

  // Compute crop for object-cover behavior
  const imgRatio = image.naturalWidth / image.naturalHeight;
  const slotRatio = width / height;
  let cropX = 0, cropY = 0, cropW = image.naturalWidth, cropH = image.naturalHeight;

  if (imgRatio > slotRatio) {
    cropW = image.naturalHeight * slotRatio;
    cropX = (image.naturalWidth - cropW) / 2;
  } else {
    cropH = image.naturalWidth / slotRatio;
    cropY = (image.naturalHeight - cropH) / 2;
  }

  return (
    <Group x={x} y={y} clipX={0} clipY={0} clipWidth={width} clipHeight={height}>
      <KonvaImage
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
        crop={{ x: cropX, y: cropY, width: cropW, height: cropH }}
      />
    </Group>
  );
}

