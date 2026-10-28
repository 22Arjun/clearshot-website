"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { Icon, type IconName } from "../Icon";
import { Arrow, Lights } from "../hero/HeroPanels";
import hp from "../hero/HeroPanels.module.css";
import { ScaledStage } from "../ScaledStage";
import styles from "./Playground.module.css";

type Tool = "arrow" | "rect" | "ellipse" | "highlight" | "blur" | "counter";
type Shape = { id: number; tool: Tool; color: string; x1: number; y1: number; x2: number; y2: number; n?: number };

const TOOLS: { id: Tool; icon: IconName; label: string; key: string }[] = [
  { id: "arrow", icon: "toolArrow", label: "Arrow", key: "a" },
  { id: "rect", icon: "toolRect", label: "Rectangle", key: "r" },
  { id: "ellipse", icon: "toolEllipse", label: "Ellipse", key: "e" },
  { id: "highlight", icon: "toolHighlight", label: "Highlighter", key: "h" },
  { id: "blur", icon: "toolBlur", label: "Blur", key: "b" },
  { id: "counter", icon: "toolCounter", label: "Step counter", key: "n" },
];

const COLORS = ["#ff3b30", "#ff9f0a", "#ffd60a", "#30c159", "#5466ff"];

const SEED: Shape[] = [
  { id: 1, tool: "blur", color: COLORS[0], x1: 440, y1: 162, x2: 640, y2: 188 },
  { id: 2, tool: "rect", color: COLORS[0], x1: 296, y1: 246, x2: 914, y2: 288 },
  { id: 3, tool: "arrow", color: COLORS[0], x1: 806, y1: 432, x2: 712, y2: 360 },
  { id: 4, tool: "counter", color: COLORS[4], x1: 918, y1: 68, x2: 918, y2: 68, n: 1 },
];

const W = 1040;
const H = 470;

const box = (s: Shape): CSSProperties => ({
  left: Math.min(s.x1, s.x2),
  top: Math.min(s.y1, s.y2),
  width: Math.abs(s.x2 - s.x1),
  height: Math.abs(s.y2 - s.y1),
});

function ShapeView({ shape }: { shape: Shape }) {
  switch (shape.tool) {
    case "blur": {
      const b = box(shape);
      return (
        <div className={styles.blur} style={b}>
          <div className={styles.blurCopy} style={{ left: -(b.left as number), top: -(b.top as number) }}>
            <ApiScreenshot />
          </div>
        </div>
      );
    }
    case "highlight":
      return <div className={styles.highlight} style={{ ...box(shape), background: `${shape.color}66` }} />;
    case "arrow":
      return <Arrow from={[shape.x1, shape.y1]} to={[shape.x2, shape.y2]} color={shape.color} />;
    case "counter":
      return (
        <span className={styles.counter} style={{ left: shape.x1, top: shape.y1, background: shape.color }}>
          {shape.n}
        </span>
      );
    default: {
      const b = box(shape);
      const w = b.width as number;
      const h = b.height as number;
      return (
        <svg className={styles.shapeSvg} style={b} viewBox={`0 0 ${w} ${h}`} overflow="visible">
          {shape.tool === "rect" ? (
            <rect x="0" y="0" width={w} height={h} rx="10" stroke={shape.color} />
          ) : (
            <ellipse cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2} stroke={shape.color} />
          )}
        </svg>
      );
    }
  }
}

/* The mock app being annotated — a fictional API settings page. */
function ApiScreenshot() {
  return (
    <div className={styles.app}>
      <aside className={styles.side}>
        <b>
          <i /> Halcyon
        </b>
        {["Overview", "Projects", "Billing", "API keys", "Team", "Settings"].map((n) => (
          <span key={n} data-on={n === "API keys" ? "" : undefined}>
            {n}
          </span>
        ))}
      </aside>
      <div className={styles.main}>
        <div className={styles.mainHead}>
          <div>
            <b>API keys</b>
            <span>Secret keys for the Halcyon workspace.</span>
          </div>
          <span className={styles.newKey}>
            <Icon name="plus" size={13} /> New key
          </span>
        </div>
        <div className={styles.table}>
          <div className={styles.th}>
            <span>Name</span>
            <span>Secret</span>
            <span>Created</span>
            <span>Status</span>
          </div>
          {[
            ["Production", "sk_live_51Hx9aQ…fQ2c", "Oct 12", "Active"],
            ["Staging", "sk_test_4eC39Hq…dp7d", "Sep 30", "Active"],
            ["Legacy", "sk_live_7Qp2LmX…x8Ze", "Mar 02", "Revoked"],
          ].map(([name, key, date, status]) => (
            <div key={name} className={styles.tr}>
              <span>{name}</span>
              <code>{key}</code>
              <span>{date}</span>
              <span className={styles.status} data-bad={status === "Revoked" ? "" : undefined}>
                {status}
              </span>
            </div>
          ))}
        </div>
        <div className={styles.warn}>
          <Icon name="bolt" size={14} /> Webhook failed — 3 deliveries to <code>/hooks/billing</code> need attention.
        </div>
      </div>
    </div>
  );
}

export function Playground() {
  const [tool, setTool] = useState<Tool>("arrow");
  const [color, setColor] = useState(COLORS[0]);
  const [shapes, setShapes] = useState<Shape[]>(SEED);
  const [draft, setDraft] = useState<Shape | null>(null);
  const [touched, setTouched] = useState(false);
  const [hovering, setHovering] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);

  const point = (e: PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    const scale = r.width / W;
    return {
      x: Math.max(0, Math.min(W, (e.clientX - r.left) / scale)),
      y: Math.max(0, Math.min(H, (e.clientY - r.top) / scale)),
    };
  };

  const onDown = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y } = point(e);
    setTouched(true);
    if (tool === "counter") {
      const n = shapes.filter((s) => s.tool === "counter").length + 1;
      setShapes((s) => [...s, { id: nextId.current++, tool, color, x1: x, y1: y, x2: x, y2: y, n }]);
      return;
    }
    setDraft({ id: nextId.current++, tool, color, x1: x, y1: y, x2: x, y2: y });
  };

  const onMove = (e: PointerEvent) => {
    if (!draft) return;
    const { x, y } = point(e);
    setDraft({ ...draft, x2: x, y2: y });
  };

  const onUp = () => {
    if (!draft) return;
    const big = Math.hypot(draft.x2 - draft.x1, draft.y2 - draft.y1) > 10;
    if (big) setShapes((s) => [...s, draft]);
    setDraft(null);
  };

  const undo = useCallback(() => setShapes((s) => s.slice(0, -1)), []);

  useEffect(() => {
    if (!hovering) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
        return;
      }
      const t = TOOLS.find((t) => t.key === e.key.toLowerCase());
      if (t && !e.metaKey && !e.ctrlKey) {
        e.stopImmediatePropagation();
        setTool(t.id);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [hovering, undo]);

  return (
    <div
      className={styles.wrap}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <ScaledStage width={1120} height={640} minScale={0.42}>
        <div className={`${hp.win} ${styles.window}`}>
          <div className={hp.titlebar}>
            <Lights />
            <span className={hp.winTitle}>API keys — bug report.png</span>
            <span className={hp.tbBtns}>
              <span>Copy</span>
              <span data-dark="">Save</span>
            </span>
          </div>

          <div className={hp.toolbar} role="toolbar" aria-label="Annotation tools">
            <div className={hp.toolGroup}>
              {TOOLS.map((t) => (
                <button
                  key={t.id}
                  className={hp.tool}
                  data-on={t.id === tool}
                  aria-pressed={t.id === tool}
                  aria-label={`${t.label} (${t.key.toUpperCase()})`}
                  title={`${t.label} — ${t.key.toUpperCase()}`}
                  onClick={() => setTool(t.id)}
                >
                  <Icon name={t.icon} size={17} />
                </button>
              ))}
            </div>
            <span className={hp.toolSep} />
            <div className={hp.swatches}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  className={styles.swatch}
                  style={{ background: c }}
                  data-on={c === color}
                  aria-label={`Color ${c}`}
                  aria-pressed={c === color}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
            <span className={hp.toolSep} />
            <button className={hp.tool} onClick={undo} aria-label="Undo" title="Undo — ⌘Z">
              <Icon name="undo" size={16} />
            </button>
            <button className={hp.tool} onClick={() => setShapes([])} aria-label="Clear all" title="Clear all">
              <Icon name="trash" size={16} />
            </button>
            <button className={styles.reset} onClick={() => setShapes(SEED)}>
              Reset
            </button>
          </div>

          <div
            ref={canvasRef}
            className={styles.canvas}
            data-tool={tool}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <ApiScreenshot />
            {shapes.map((s) => (
              <ShapeView key={s.id} shape={s} />
            ))}
            {draft && <ShapeView shape={draft} />}
            <span className={styles.hint} data-hidden={touched}>
              <Icon name="cursor" size={14} /> Pick a tool and drag anywhere
            </span>
          </div>
        </div>
      </ScaledStage>
    </div>
  );
}
