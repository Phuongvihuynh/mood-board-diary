"use client";

import { Rect, Image as KonvaImage, Line, Group } from "react-konva";
import { useCardStore } from "@/stores/useCardStore";
import type { TypewriterOverlay } from "@/types/typewriter";
import { useEffect, useState } from "react";

interface LoadedOverlay {
  overlay: TypewriterOverlay;
  image: HTMLImageElement;
}

function FrameKonva({
  overlay,
  children,
}: {
  overlay: TypewriterOverlay;
  children: React.ReactNode;
}) {
  const { frame, x, y, width, height, rotation } = overlay;
  const offsetX = width / 2;
  const offsetY = height / 2;

  switch (frame) {
    case "polaroid":
      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          {/* Shadow */}
          <Rect
            x={2}
            y={3}
            width={width + 16}
            height={height + 40}
            fill="rgba(0,0,0,0.15)"
            cornerRadius={2}
          />
          {/* White border */}
          <Rect
            x={0}
            y={0}
            width={width + 16}
            height={height + 40}
            fill="#FFFFFF"
            cornerRadius={2}
          />
          <Group x={8} y={8}>{children}</Group>
        </Group>
      );

    case "vintage-gold":
      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          {/* Outer gold border */}
          <Rect
            x={0}
            y={0}
            width={width + 16}
            height={height + 16}
            fill="#F5E6CA"
            stroke="#8B6914"
            strokeWidth={4}
            cornerRadius={2}
          />
          <Group x={8} y={8}>{children}</Group>
        </Group>
      );

    case "tape-corners":
      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          {children}
          {/* Four tape corners */}
          <Rect x={-4} y={-4} width={24} height={12} fill="rgba(251,191,36,0.35)" rotation={-25} />
          <Rect x={width - 16} y={-6} width={24} height={12} fill="rgba(251,191,36,0.35)" rotation={25} />
          <Rect x={-4} y={height - 6} width={24} height={12} fill="rgba(251,191,36,0.35)" rotation={25} />
          <Rect x={width - 16} y={height - 2} width={24} height={12} fill="rgba(251,191,36,0.35)" rotation={-25} />
        </Group>
      );

    case "torn-paper": {
      // Generate jagged top and bottom edges
      const tornPoints: number[] = [];
      const w = width + 16;
      const h = height + 16;
      const step = w / 25;
      // Top edge (left to right)
      for (let i = 0; i <= 25; i++) {
        tornPoints.push(i * step, i % 2 === 0 ? 2 : 0);
      }
      // Right edge
      tornPoints.push(w, h);
      // Bottom edge (right to left)
      for (let i = 25; i >= 0; i--) {
        tornPoints.push(i * step, i % 2 === 0 ? h - 2 : h);
      }
      // Left edge
      tornPoints.push(0, 0);

      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          <Line points={tornPoints} closed fill="#FFFFFF" />
          <Group x={8} y={8}>{children}</Group>
        </Group>
      );
    }

    case "stamp-border":
      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          <Rect
            x={0}
            y={0}
            width={width + 20}
            height={height + 20}
            fill="#FFFFFF"
            stroke="#8B6914"
            strokeWidth={3}
            dash={[6, 4]}
            cornerRadius={2}
          />
          <Group x={10} y={10}>{children}</Group>
        </Group>
      );

    default:
      return (
        <Group x={x + offsetX} y={y + offsetY} offsetX={offsetX} offsetY={offsetY} rotation={rotation || 0}>
          {children}
        </Group>
      );
  }
}

export default function OverlayExportLayer() {
  const overlays = useCardStore((s) => s.overlays);
  const [loadedOverlays, setLoadedOverlays] = useState<LoadedOverlay[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      const results: LoadedOverlay[] = [];
      for (const overlay of overlays) {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        await new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = overlay.src;
        });
        if (!cancelled) {
          results.push({ overlay, image: img });
        }
      }
      if (!cancelled) {
        setLoadedOverlays(results);
      }
    };

    loadAll();
    return () => {
      cancelled = true;
    };
  }, [overlays]);

  return (
    <>
      {loadedOverlays.map(({ overlay, image }) => (
        <FrameKonva key={overlay.id} overlay={overlay}>
          <KonvaImage
            image={image}
            width={overlay.width}
            height={overlay.height}
          />
        </FrameKonva>
      ))}
    </>
  );
}
