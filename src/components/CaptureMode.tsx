"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { Icon } from "./Icon";
import styles from "./CaptureMode.module.css";

const EVENT = "clearshot:capture";

export function CaptureTrigger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(EVENT))}>
      {children}
    </button>
  );
}

type Rect = { x: number; y: number; w: number; h: number };

/* A real (well, almost) capture mode for the website itself. Press C anywhere. */
export function CaptureMode() {
  const [mode, setMode] = useState<"off" | "aim" | "shot">("off");
  const [rect, setRect] = useState<Rect | null>(null);
  const [shot, setShot] = useState<Rect | null>(null);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const origin = useRef<{ x: number; y: number } | null>(null);

  const start = useCallback(() => {
    setRect(null);
    setShot(null);
    origin.current = null;
    setMode("aim");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      const typing = el.closest("input, textarea, select, [contenteditable]");
      if (e.key === "Escape") setMode("off");
      else if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key.toLowerCase() === "c") start();
    };
    window.addEventListener(EVENT, start);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, start);
      window.removeEventListener("keydown", onKey);
    };
  }, [start]);

  useEffect(() => {
    if (mode !== "aim") return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [mode]);

  useEffect(() => {
    if (mode !== "shot") return;
    const t = setTimeout(() => setMode("off"), 9000);
    return () => clearTimeout(t);
  }, [mode]);

  const onDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    origin.current = { x: e.clientX, y: e.clientY };
    setRect({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
  };

  const onMove = (e: React.PointerEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
    const o = origin.current;
    if (!o) return;
    setRect({
      x: Math.min(o.x, e.clientX),
      y: Math.min(o.y, e.clientY),
      w: Math.abs(e.clientX - o.x),
      h: Math.abs(e.clientY - o.y),
    });
  };

  const onUp = () => {
    const r = rect && rect.w > 8 && rect.h > 8 ? rect : { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight };
    origin.current = null;
    setShot(r);
    setMode("shot");
  };

  const dpr = typeof window === "undefined" ? 2 : Math.max(1, Math.round(window.devicePixelRatio || 1));

  return (
    <>
      {mode === "aim" && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-label="Capture mode: drag to select an area, press Escape to cancel"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
        >
          {!rect && <div className={styles.dim} />}
          {rect && <div className={styles.sel} style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }} />}
          <div className={styles.lineH} style={{ top: cursor.y }} />
          <div className={styles.lineV} style={{ left: cursor.x }} />
          <div className={styles.readout} style={{ left: cursor.x + 14, top: cursor.y + 14 }}>
            {rect && rect.w > 0 ? (
              <>
                {Math.round(rect.w * dpr)} × {Math.round(rect.h * dpr)}
              </>
            ) : (
              <>
                {Math.round(cursor.x * dpr)}, {Math.round(cursor.y * dpr)}
              </>
            )}
          </div>
          <div className={styles.hint}>
            <span>Drag to capture</span>
            <i />
            <span>Click for full window</span>
            <i />
            <span>
              <kbd>esc</kbd> to cancel
            </span>
          </div>
        </div>
      )}

      {mode === "shot" && shot && (
        <>
          <div
            className={styles.flash}
            style={{ left: shot.x, top: shot.y, width: shot.w, height: shot.h }}
            aria-hidden="true"
          />
          <div className={styles.qa} role="status">
            <div className={styles.thumb} style={{ aspectRatio: `${Math.max(shot.w, 1)} / ${Math.max(shot.h, 1)}` }}>
              <span>
                {Math.round(shot.w * dpr)} × {Math.round(shot.h * dpr)}
              </span>
            </div>
            <div className={styles.qaText}>
              <b>Captured. That&rsquo;s the feeling.</b>
              <span>Now imagine it everywhere on your Mac — with annotations, blur and instant links.</span>
              <div className={styles.qaActions}>
                <a href={site.downloadUrl} className="btn btn-dark btn-sm" onClick={() => setMode("off")}>
                  <Icon name="download" /> Get {site.name}
                </a>
                <button className="btn btn-light btn-sm" onClick={start}>
                  Again
                </button>
              </div>
            </div>
            <button className={styles.close} aria-label="Dismiss" onClick={() => setMode("off")}>
              <Icon name="x" size={14} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
