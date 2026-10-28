"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  width: number;
  height: number;
  /** Below this scale the stage stops shrinking and crops from the sides instead. */
  minScale?: number;
  className?: string;
  stageClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/* Renders a fixed-size artboard and fits it to its container, like a Mac screen in a frame. */
export function ScaledStage({ width, height, minScale = 0.5, className, stageClassName, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ scale: number; offset: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      const scale = Math.max(w / width, minScale);
      setBox({ scale, offset: (w - width * scale) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, minScale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        height: box ? height * box.scale : undefined,
        aspectRatio: box ? undefined : `${width} / ${height}`,
      }}
    >
      <div
        className={stageClassName}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          transformOrigin: "0 0",
          transform: box ? `translateX(${box.offset}px) scale(${box.scale})` : undefined,
          opacity: box ? 1 : 0,
          transition: "opacity .7s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
