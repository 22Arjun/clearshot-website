"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useTimeline, useTween } from "@/lib/hooks";
import { Icon, type IconName } from "../Icon";
import { LogoMark } from "../Logo";
import s from "./HeroPanels.module.css";

type PanelProps = { visible: boolean; playing: boolean; reduced: boolean };

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const at = (x: number, y: number, w?: number, h?: number): CSSProperties => ({ left: x, top: y, width: w, height: h });

/* ── Shared desktop chrome ─────────────────────────────────── */

export function Lights() {
  return (
    <span className={s.lights} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function MenuGlyph() {
  return (
    <svg viewBox="0 0 32 32" width="15" height="15" aria-hidden="true">
      <path
        d="M6 12V8a2 2 0 0 1 2-2h4M20 6h4a2 2 0 0 1 2 2v4M26 20v4a2 2 0 0 1-2 2h-4M12 26H8a2 2 0 0 1-2-2v-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.6" fill="currentColor" />
    </svg>
  );
}

export function MenuBar({ appActive }: { appActive: boolean }) {
  return (
    <div className={s.menubar}>
      <div className={s.mbLeft}>
        <b>Finder</b>
        {["File", "Edit", "View", "Go", "Window", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <div className={s.mbRight}>
        <span className={cx(s.mbApp, appActive && s.mbAppOn)}>
          <MenuGlyph />
        </span>
        <span className={s.battery} aria-hidden="true">
          <i />
        </span>
        <Icon name="wifi" size={15} />
        <Icon name="search" size={14} />
        <Icon name="toggles" size={15} />
        <span>Wed 28 Oct&nbsp;&nbsp;9:41</span>
      </div>
    </div>
  );
}

/* A believable little dashboard to capture, share and thumbnail. */
const chartPts: [number, number][] = [
  [0, 120], [40, 108], [80, 112], [120, 90], [160, 96], [200, 74], [240, 82],
  [280, 60], [320, 68], [360, 48], [400, 56], [440, 36], [480, 44], [520, 24], [560, 30],
];

function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const [p1, p2] = [pts[i], pts[i + 1]];
    const p3 = pts[i + 2] ?? p2;
    d += `C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${
      p2[1] - (p3[1] - p1[1]) / 6
    } ${p2[0]} ${p2[1]}`;
  }
  return d;
}
const chartLine = smooth(chartPts);

export function ReportWindow({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={cx(s.win, s.report, className)} style={style}>
      <div className={s.titlebar}>
        <Lights />
        <span className={s.winTitle}>Q4 Report — Northwind</span>
        <span className={s.avatars}>
          <i style={{ background: "linear-gradient(135deg,#ffb38a,#f0789b)" }} />
          <i style={{ background: "linear-gradient(135deg,#8ec5ff,#6b7bff)" }} />
          <i style={{ background: "linear-gradient(135deg,#a8e6a1,#3fb27f)" }} />
        </span>
      </div>
      <div className={s.reportBody}>
        <div className={s.reportHead}>
          <div>
            <b>Weekly overview</b>
            <span>Oct 21 – Oct 27</span>
          </div>
          <div className={s.seg}>
            <span>7D</span>
            <span data-on="">30D</span>
            <span>90D</span>
          </div>
        </div>
        <div className={s.kpis}>
          {[
            ["Revenue", "$48.2k", "+12.4%"],
            ["Active users", "9,841", "+3.1%"],
            ["Avg. session", "6m 12s", "+0.8%"],
          ].map(([k, v, d]) => (
            <div key={k} className={s.kpi}>
              <span>{k}</span>
              <b>{v}</b>
              <em>{d}</em>
            </div>
          ))}
        </div>
        <div className={s.chart}>
          <svg viewBox="0 0 560 140" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rw-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6c7bff" stopOpacity=".28" />
                <stop offset="1" stopColor="#6c7bff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[35, 70, 105].map((y) => (
              <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="#eceef3" />
            ))}
            <path d={`${chartLine}L560 140L0 140Z`} fill="url(#rw-fill)" />
            <path d={chartLine} fill="none" stroke="#5f6cff" strokeWidth="2.5" />
            <circle cx="440" cy="36" r="5" fill="#fff" stroke="#5f6cff" strokeWidth="2.5" />
          </svg>
          <span className={s.chartTip}>$6.9k</span>
        </div>
      </div>
    </div>
  );
}

function QuickAccess({ show, hover, children }: { show: boolean; hover?: boolean; children: ReactNode }) {
  return (
    <div className={s.qa} data-show={show} data-hover={hover}>
      <div className={s.qaThumb}>{children}</div>
      <div className={s.qaHover}>
        <span className={s.qaBtn}>Copy</span>
        <span className={s.qaBtn}>Save</span>
        <i className={s.qaCorner} style={{ top: 7, left: 7 }}>
          <Icon name="x" size={12} />
        </i>
        <i className={s.qaCorner} style={{ top: 7, right: 7 }}>
          <Icon name="pencil" size={12} />
        </i>
        <i className={s.qaCorner} style={{ bottom: 7, left: 7 }}>
          <Icon name="pin" size={12} />
        </i>
        <i className={s.qaCorner} style={{ bottom: 7, right: 7 }}>
          <Icon name="cloud" size={12} />
        </i>
      </div>
    </div>
  );
}

function Pointer({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <svg className={cx(s.pointer, className)} style={{ left: x, top: y }} viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M5.5 3.2 19 12.4l-6.3 1.2-3.3 5.8L5.5 3.2Z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Tapered annotation arrow, drawn on with a clip reveal. */
export function Arrow({
  from,
  to,
  color = "#ff3b30",
  on = true,
  className,
}: {
  from: [number, number];
  to: [number, number];
  color?: string;
  on?: boolean;
  className?: string;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.max(Math.hypot(dx, dy), 1);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const head = Math.min(30, len * 0.45);
  const hx = len - head;
  const d = `M0 -1.5L${hx} -5L${hx - 3} -14L${len} 0L${hx - 3} 14L${hx} 5L0 1.5Z`;
  return (
    <div
      className={cx(s.arrow, className)}
      data-on={on}
      style={{ left: from[0], top: from[1] - 20, width: len, transform: `rotate(${angle}deg)` }}
    >
      <svg viewBox={`0 -20 ${len} 40`} width={len} height="40" overflow="visible">
        <path d={d} fill={color} stroke="#fff" strokeWidth="2" strokeLinejoin="round" paintOrder="stroke" />
      </svg>
    </div>
  );
}

/* ── 1 · Capture ───────────────────────────────────────────── */

const SEL = { x: 404, y: 76, w: 648, h: 444 };

export function CapturePanel({ visible, playing, reduced, onMenu }: PanelProps & { onMenu: (open: boolean) => void }) {
  const step = useTimeline(playing, [950, 1150, 2650, 2950, 4300], reduced);
  const p = useTween(step >= 2, reduced ? 1 : 1400);
  const progress = step >= 3 ? 1 : p;
  const w = SEL.w * progress;
  const h = SEL.h * progress;
  const cur = { x: SEL.x + w, y: SEL.y + h };
  const selecting = step >= 1 && step < 3;

  useEffect(() => {
    onMenu(visible && playing && step === 0 && !reduced);
  }, [visible, playing, step, reduced, onMenu]);

  return (
    <div className={s.panel} data-visible={visible} aria-hidden={!visible}>
      <ReportWindow style={at(424, 96, 608, 404)} />

      <div className={s.dropdown} data-show={playing && step === 0 && !reduced}>
        {[
          ["Capture Area", "⇧⌘4", true],
          ["Capture Window", "⇧⌘5"],
          ["Capture Fullscreen", "⇧⌘3"],
          ["Scrolling Capture", "⇧⌘6"],
          null,
          ["Record Screen", "⇧⌘7"],
          ["Record GIF", "⌥⇧⌘7"],
          null,
          ["Capture Text", "⇧⌘2"],
          ["Open History", "⌘H"],
        ].map((item, i) =>
          item ? (
            <div key={i} className={s.ddItem} data-on={item[2] ? "" : undefined}>
              <span>{item[0]}</span>
              <kbd>{item[1]}</kbd>
            </div>
          ) : (
            <hr key={i} />
          ),
        )}
      </div>

      <div
        className={s.selection}
        data-show={selecting}
        data-flash={step === 3}
        style={at(SEL.x, SEL.y, Math.max(w, 1), Math.max(h, 1))}
      />

      <div className={s.cross} data-show={selecting} style={{ left: cur.x, top: cur.y }}>
        <span className={s.crossH} />
        <span className={s.crossV} />
        <span className={s.dims}>
          {Math.round(w * 2)} <i>×</i> {Math.round(h * 2)}
        </span>
        <span className={s.loupe}>
          <span className={s.loupeGrid} />
          <span className={s.loupeCenter} />
        </span>
      </div>

      <QuickAccess show={step >= 4} hover={step >= 5}>
        <ReportWindow className={s.thumbWin} />
      </QuickAccess>
      <Pointer x={step >= 5 ? 118 : 300} y={step >= 5 ? 590 : 660} className={cx(step >= 5 && s.pointerOn)} />
    </div>
  );
}

/* ── 2 · Annotate ──────────────────────────────────────────── */

const TOOLS: IconName[] = [
  "toolArrow",
  "toolRect",
  "toolEllipse",
  "toolLine",
  "toolText",
  "toolHighlight",
  "toolBlur",
  "toolCounter",
  "toolSpotlight",
  "toolCrop",
];

export function EditorToolbar({ activeTool, color = 0 }: { activeTool?: IconName; color?: number }) {
  return (
    <div className={s.toolbar}>
      <div className={s.toolGroup}>
        {TOOLS.map((t) => (
          <span key={t} className={s.tool} data-on={t === activeTool}>
            <Icon name={t} size={17} />
          </span>
        ))}
      </div>
      <span className={s.toolSep} />
      <div className={s.swatches}>
        {["#ff3b30", "#ff9f0a", "#ffd60a", "#30c159", "#5466ff", "#111"].map((c, i) => (
          <i key={c} style={{ background: c }} data-on={i === color} />
        ))}
      </div>
      <span className={s.toolSep} />
      <span className={s.tool}>
        <Icon name="undo" size={16} />
      </span>
    </div>
  );
}

function Counter({ n, on, delay = 0 }: { n: number; on: boolean; delay?: number }) {
  return (
    <i className={s.counter} data-on={on} style={{ transitionDelay: on ? `${delay}ms` : "0ms" }}>
      {n}
    </i>
  );
}

/* The "screenshot" being marked up. Annotations hang off the elements they point at. */
function CheckoutShot({ step }: { step: number }) {
  return (
    <div className={s.shot}>
      <div className={s.shotHead}>
        <span className={s.shotLogo} />
        <div>
          <b>Northwind Pro</b>
          <span>
            <Icon name="lock" size={11} /> Secure checkout
          </span>
        </div>
      </div>
      <div className={s.plan}>
        <Counter n={1} on={step >= 5} />
        <div>
          <b>Pro · Yearly</b>
          <span>Billed annually, cancel anytime</span>
        </div>
        <b>$72.00</b>
      </div>
      <div className={s.field}>
        <span>Email</span>
        <div data-blur={step >= 4}>
          <span>maya.lindqvist@northwind.co</span>
        </div>
      </div>
      <div className={s.field}>
        <Counter n={2} on={step >= 5} delay={120} />
        <span>Card</span>
        <div data-blur={step >= 4}>
          <span>4242 4242 4242 4242</span>
          <em>12/28 · 314</em>
        </div>
      </div>
      <div className={s.pay}>
        Pay $72.00
        <Counter n={3} on={step >= 5} delay={240} />
        <svg className={s.drawRect} data-on={step >= 1} viewBox="0 0 410 64" width="410" height="64">
          <rect x="2" y="2" width="406" height="60" rx="15" pathLength={1} />
        </svg>
        <Arrow from={[476, -112]} to={[404, 8]} on={step >= 2} className={s.payArrow} />
        <span className={s.note} data-on={step >= 3}>
          Make this pop!
        </span>
      </div>
      <p className={s.shotFoot}>Payments are encrypted end-to-end</p>
    </div>
  );
}

export function AnnotatePanel({ visible, playing, reduced }: PanelProps) {
  const step = useTimeline(playing, [450, 1250, 1950, 2650, 3350, 4350], reduced);
  const tool: IconName | undefined = (
    [undefined, "toolRect", "toolArrow", "toolText", "toolBlur", "toolCounter", undefined] as const
  )[step];

  return (
    <div className={s.panel} data-visible={visible} aria-hidden={!visible}>
      <div className={cx(s.win, s.editor)} style={at(176, 58, 848, 572)}>
        <div className={s.titlebar}>
          <Lights />
          <span className={s.winTitle}>Screenshot 2026-10-28 at 09.41.12</span>
          <span className={s.tbBtns}>
            <span>Copy</span>
            <span data-dark="">Save</span>
          </span>
        </div>
        <EditorToolbar activeTool={tool} />
        <div className={s.canvas}>
          <CheckoutShot step={step} />
          <span className={s.toast} data-on={step >= 6}>
            <Icon name="check" size={14} /> Copied to clipboard
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 3 · Record ────────────────────────────────────────────── */

const CODE: [string, string][][] = [
  [["k", "import"], ["", " SwiftUI"]],
  [],
  [["k", "struct"], ["t", " ContentView"], ["", ": "], ["t", "View"], ["", " {"]],
  [["", "    "], ["k", "@State private var"], ["", " isCapturing = "], ["k", "false"]],
  [],
  [["", "    "], ["k", "var"], ["", " body: "], ["k", "some"], ["t", " View"], ["", " {"]],
  [["", "        "], ["t", "VStack"], ["", "(spacing: "], ["n", "16"], ["", ") {"]],
  [["", "            "], ["t", "Text"], ["", "("], ["s", '"Hello, ClearShotX"'], ["", ")"]],
  [["", "                ."], ["p", "font"], ["", "(."], ["p", "largeTitle"], ["", ")"]],
  [["", "            "], ["t", "Button"], ["", "("], ["s", '"Capture"'], ["", ") { isCapturing."], ["p", "toggle"], ["", "() }"]],
  [["", "                ."], ["p", "buttonStyle"], ["", "(."], ["p", "borderedProminent"], ["", ")"]],
  [["", "        }"]],
  [["", "        ."], ["p", "padding"], ["", "()"]],
  [["", "    }"]],
  [["", "}"]],
];

function useClock(playing: boolean) {
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (!playing) return;
    setSecs(0);
    const t = setInterval(() => setSecs((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);
  return `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
}

export function RecordPanel({ visible, playing, reduced }: PanelProps) {
  const step = useTimeline(playing, [500, 1500, 2600, 3200, 4700], reduced);
  const clock = useClock(playing && !reduced);
  const keys = step === 2 ? ["⌘", "S"] : step >= 3 && step < 5 ? ["⌘", "R"] : null;
  const pointer = step >= 3 ? { x: 966, y: 108 } : step >= 1 ? { x: 560, y: 330 } : { x: 760, y: 470 };

  return (
    <div className={s.panel} data-visible={visible} aria-hidden={!visible}>
      <div className={s.recArea} style={at(150, 66, 900, 476)} />

      <div className={cx(s.win, s.code)} style={at(190, 96, 820, 412)}>
        <div className={s.titlebar}>
          <Lights />
          <span className={s.winTitle}>ContentView.swift — Northwind</span>
          <span className={s.runBtn} data-click={step >= 3}>
            <Icon name="play" size={12} />
          </span>
        </div>
        <div className={s.codeBody}>
          <aside className={s.files}>
            <span>
              <Icon name="folder" size={13} /> Northwind
            </span>
            {["NorthwindApp.swift", "ContentView.swift", "Capture.swift", "Assets"].map((f) => (
              <span key={f} data-on={f === "ContentView.swift" ? "" : undefined}>
                {f}
              </span>
            ))}
          </aside>
          <pre className={s.codeText}>
            {CODE.map((line, i) => (
              <div key={i} data-hl={i === 9 && step >= 1 ? "" : undefined}>
                <i>{i + 1}</i>
                {line.map(([c, t], j) => (
                  <span key={j} className={c ? s[`c_${c}`] : undefined}>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
        <span className={s.build} data-on={step >= 4}>
          <Icon name="check" size={13} /> Build Succeeded
        </span>
      </div>

      <div className={s.keys} data-on={!!keys}>
        {(keys ?? ["⌘", "R"]).map((k, i) => (
          <kbd key={i}>{k}</kbd>
        ))}
      </div>

      <div className={s.cam}>
        <span className={s.camHead} />
        <span className={s.camBody} />
      </div>

      <Pointer x={pointer.x} y={pointer.y} className={s.pointerOn} />
      <span className={s.ripple} data-on={step === 3} style={at(970, 112)} />

      <div className={s.recBar}>
        <span className={s.recDot} />
        <span className={s.clock}>{clock}</span>
        <span className={s.recSep} />
        <Icon name="pause" size={16} />
        <span className={s.recStop}>
          <Icon name="stop" size={14} />
        </span>
        <span className={s.recSep} />
        <Icon name="mic" size={16} />
        <span className={s.level}>
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ animationDelay: `${i * -0.17}s` }} />
          ))}
        </span>
        <Icon name="camera" size={16} />
      </div>
    </div>
  );
}

/* ── 4 · Share ─────────────────────────────────────────────── */

export function SharePanel({ visible, playing, reduced }: PanelProps) {
  const step = useTimeline(playing, [300, 1500, 1900, 3000, 4000], reduced);

  return (
    <div className={s.panel} data-visible={visible} aria-hidden={!visible}>
      <QuickAccess show={visible} hover={false}>
        <ReportWindow className={s.thumbWin} />
        <span className={s.upload} data-state={step >= 2 ? "done" : step >= 1 ? "up" : "idle"}>
          <svg viewBox="0 0 48 48" width="48" height="48">
            <circle cx="24" cy="24" r="20" className={s.ringBg} />
            <circle cx="24" cy="24" r="20" pathLength={1} className={s.ring} />
          </svg>
          <Icon name="check" size={18} />
        </span>
      </QuickAccess>

      <div className={cx("glass", s.sheet)} data-on={step >= 3}>
        <div className={s.sheetHead}>
          <span className={s.thumbBox}>
            <ReportWindow className={s.sheetThumb} />
          </span>
          <div>
            <b>Q4 Report.png</b>
            <span>1.2 MB · Uploaded just now</span>
          </div>
        </div>
        <div className={s.linkRow}>
          <Icon name="globe" size={15} />
          <span className={s.linkText}>shots.northwind.co/k29fA</span>
          <span className={s.copyBtn} data-done={step >= 4}>
            {step >= 4 ? (
              <>
                <Icon name="check" size={13} /> Copied
              </>
            ) : (
              "Copy link"
            )}
          </span>
        </div>
        {[
          ["lock", "Password protect", true],
          ["timer", "Self-destruct after 7 days", true],
          ["download", "Allow downloads", false],
        ].map(([icon, label, on]) => (
          <div key={label as string} className={s.optRow}>
            <Icon name={icon as IconName} size={15} />
            <span>{label as string}</span>
            <i className={s.switch} data-on={on as boolean} />
          </div>
        ))}
        <div className={s.views}>
          <span className={s.viewAv}>
            {[30, 200, 140, 280].map((hue) => (
              <i key={hue} style={{ background: `hsl(${hue} 70% 72%)` }} />
            ))}
          </span>
          <span>
            <b>{step >= 5 ? 129 : 128}</b> views
          </span>
          <svg viewBox="0 0 80 24" width="80" height="24" className={s.spark} data-on={step >= 3}>
            <path d="M0 20 10 16 20 18 30 11 40 13 50 7 60 9 70 4 80 2" pathLength={1} />
          </svg>
        </div>
      </div>

      <div className={cx("glass", s.notif)} data-on={step >= 4}>
        <LogoMark size={34} />
        <div>
          <b>
            ClearShotX <span>now</span>
          </b>
          <span>Link copied to clipboard</span>
          <em>shots.northwind.co/k29fA</em>
        </div>
      </div>

      <Pointer
        x={step >= 3 ? 758 : 640}
        y={step >= 3 ? 214 : 420}
        className={cx(s.pointerOn, step >= 4 && s.pointerPress)}
      />
    </div>
  );
}
