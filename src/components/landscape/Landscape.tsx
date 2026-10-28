import type { CSSProperties } from "react";
import { scenes, type Hill, type Scene, type SceneName } from "./scenes";
import styles from "./Landscape.module.css";

const W = 1600;
const H = 1000;
const X0 = -140;
const X1 = W + 140;

/* mulberry32 — tiny deterministic PRNG so every render is identical */
function prng(seed: number) {
  let a = seed * 9973 + 0x6d2b79f5;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rand = () => number;
const r = Math.round;
const pick = <T,>(rand: Rand, list: T[]) => list[Math.floor(rand() * list.length)];

/* A ridge is a sum of gaussian mounds plus a slow ripple — rolling hills. */
function makeRidge(rand: Rand, hill: Hill) {
  const span = X1 - X0;
  const slot = span / hill.bumps;
  const mounds = Array.from({ length: hill.bumps }, (_, i) => ({
    c: X0 + slot * (i + 0.5) + (rand() - 0.5) * slot * 0.8,
    h: hill.height * (0.5 + rand() * 0.5),
    w: hill.width * (0.7 + rand() * 0.6),
  }));
  const phase = rand() * Math.PI * 2;
  return (x: number) => {
    let y = hill.y;
    for (const m of mounds) y -= m.h * Math.exp(-(((x - m.c) / m.w) ** 2));
    return y + Math.sin(x / 170 + phase) * hill.ripple;
  };
}

/* Catmull-Rom spline through sampled points, emitted as cubic béziers. */
function ridgePath(ridge: (x: number) => number, step = 50) {
  const pts: [number, number][] = [];
  for (let x = X0; x <= X1; x += step) pts.push([x, ridge(x)]);
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    d += `C${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)} ${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(
      p2[1] - (p3[1] - p1[1]) / 6,
    )} ${r(p2[0])} ${r(p2[1])}`;
  }
  return d;
}

const depthStyle = (depth: number) => ({ "--depth": depth }) as CSSProperties;

type Props = {
  scene: SceneName;
  /** Unique suffix when the same scene appears twice on a page. */
  uid?: string;
  className?: string;
  /** SVG preserveAspectRatio alignment, e.g. "xMidYMax". */
  align?: string;
};

export function Landscape({ scene, uid, className, align = "xMidYMid" }: Props) {
  const s: Scene = scenes[scene];
  const id = `ls-${uid ?? scene}`;
  const rand = prng(s.seed);
  const horizon = s.sky[s.sky.length - 1][1];

  const clouds = s.clouds
    ? Array.from({ length: s.clouds.count }, () => {
        const cx = rand() * W;
        const cy = s.clouds!.y[0] + rand() * (s.clouds!.y[1] - s.clouds!.y[0]);
        const flat = s.clouds!.flat ?? 1;
        return Array.from({ length: 5 }, () => ({
          cx: r(cx + (rand() - 0.5) * 320),
          cy: r(cy + (rand() - 0.5) * 36),
          rx: r(70 + rand() * 130),
          ry: r((22 + rand() * 30) * flat),
        }));
      }).flat()
    : [];

  const hills = s.hills.map((hill) => {
    const ridge = makeRidge(rand, hill);
    const line = ridgePath(ridge);

    const rows = hill.rows
      ? Array.from({ length: hill.rows.count }, (_, i) => {
          const k = i + 1;
          const { gap, growth, width } = hill.rows!;
          const sw = width * (1 + growth * k * 0.9);
          return { dy: r(gap * k * (1 + growth * k)), dx: ((k * 37) % 50) - 25, sw: Math.round(sw * 10) / 10 };
        })
      : [];

    const bushes = hill.bushes
      ? Array.from({ length: hill.bushes.count }, (_, i) => {
          const x = 140 + ((W - 280) / hill.bushes!.count) * (i + 0.2 + rand() * 0.6);
          const rad = hill.bushes!.r[0] + rand() * (hill.bushes!.r[1] - hill.bushes!.r[0]);
          return { cx: r(x), cy: r(ridge(x) + rad * 0.5), r: r(rad) };
        })
      : [];

    const flowers = hill.flowers
      ? Array.from({ length: hill.flowers.count }, () => {
          const f = hill.flowers!;
          const x = rand() * (W + 120) - 60;
          const d = rand() ** 1.2 * f.spread;
          const size = f.size[0] + (f.size[1] - f.size[0]) * (d / f.spread) * (0.55 + rand() * 0.45);
          const spike = rand() < 0.35;
          return {
            cx: r(x),
            cy: r(ridge(x) + 6 + d),
            rx: Math.max(1, r(spike ? size * 0.6 : size)),
            ry: Math.max(1, r(spike ? size * 1.7 : size)),
            fill: pick(rand, f.colors),
            o: Math.round((0.7 + rand() * 0.3) * 100) / 100,
          };
        })
      : [];

    return { hill, line, rows, bushes, flowers };
  });

  const bokeh = s.bokeh
    ? Array.from({ length: s.bokeh.count }, () => ({
        cx: r(rand() * W),
        cy: r(930 + rand() * 120),
        r: r(16 + rand() * 34),
        fill: pick(rand, s.bokeh!.colors),
        o: Math.round((0.25 + rand() * 0.3) * 100) / 100,
      }))
    : [];

  return (
    <svg
      className={[styles.svg, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={`${align} slice`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          {s.sky.map(([o, c]) => (
            <stop key={o} offset={o} stopColor={c} />
          ))}
        </linearGradient>
        <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={horizon} stopOpacity="0" />
          <stop offset="0.55" stopColor={horizon} stopOpacity="0.55" />
          <stop offset="1" stopColor={horizon} stopOpacity="0" />
        </linearGradient>
        {s.sun && (
          <>
            <radialGradient id={`${id}-glow`}>
              <stop offset="0" stopColor={s.sun.glow} stopOpacity="0.95" />
              <stop offset="0.35" stopColor={s.sun.glow} stopOpacity="0.45" />
              <stop offset="1" stopColor={s.sun.glow} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${id}-sun`}>
              <stop offset="0.55" stopColor={s.sun.core} />
              <stop offset="1" stopColor={s.sun.core} stopOpacity="0" />
            </radialGradient>
          </>
        )}
        {s.clouds && (
          <radialGradient id={`${id}-cloud`}>
            <stop offset="0" stopColor={s.clouds.color} stopOpacity="1" />
            <stop offset="0.6" stopColor={s.clouds.color} stopOpacity="0.55" />
            <stop offset="1" stopColor={s.clouds.color} stopOpacity="0" />
          </radialGradient>
        )}
        {hills.map(({ hill, line }, i) => (
          <g key={i}>
            <linearGradient id={`${id}-h${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={hill.fill[0]} />
              <stop offset="0.7" stopColor={hill.fill[1]} />
            </linearGradient>
            <path id={`${id}-r${i}`} d={line} />
            {hill.bushes && (
              <radialGradient id={`${id}-b${i}`} fx="0.36" fy="0.28" r="0.62">
                <stop offset="0" stopColor={hill.bushes.light} />
                <stop offset="1" stopColor={hill.bushes.dark} />
              </radialGradient>
            )}
          </g>
        ))}
        <filter id={`${id}-dof`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}-soft`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect x="-200" y="-200" width={W + 400} height={H + 400} fill={`url(#${id}-sky)`} />

      {s.sun && (
        <g className={styles.layer} style={depthStyle(0.04)}>
          <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.glowR} fill={`url(#${id}-glow)`} />
          {s.sun.r > 0 && <circle cx={s.sun.x} cy={s.sun.y} r={s.sun.r} fill={`url(#${id}-sun)`} />}
        </g>
      )}

      {clouds.length > 0 && (
        <g className={styles.layer} style={depthStyle(0.06)}>
          <g className={styles.drift} opacity={s.clouds!.opacity}>
            {clouds.map((c, i) => (
              <ellipse key={i} {...c} fill={`url(#${id}-cloud)`} />
            ))}
          </g>
        </g>
      )}

      {hills.map(({ hill, rows, bushes, flowers }, i) => (
        <g key={i} className={styles.layer} style={depthStyle(hill.depth)}>
          {i === 1 && <rect x="-200" y={hill.y - 260} width={W + 400} height="300" fill={`url(#${id}-haze)`} />}
          <path d={`${hills[i].line}L${X1} ${H + 80}L${X0} ${H + 80}Z`} fill={`url(#${id}-h${i})`} />
          {hill.rim && (
            <use
              href={`#${id}-r${i}`}
              fill="none"
              stroke={hill.rim.color}
              strokeWidth={hill.rim.width}
              opacity={hill.rim.opacity}
              filter={`url(#${id}-soft)`}
            />
          )}
          {rows.length > 0 && (
            <g opacity={hill.rows!.opacity} fill="none" strokeLinecap="round">
              {rows.map((row, k) => (
                <g key={k} transform={`translate(${row.dx} ${row.dy})`}>
                  <use
                    href={`#${id}-r${i}`}
                    stroke={hill.rows!.colors[0]}
                    strokeWidth={row.sw}
                    strokeDasharray={`0 ${r(row.sw * 1.15)} 0 ${r(row.sw * 1.5)} 0 ${r(row.sw * 0.9)}`}
                  />
                  <use
                    href={`#${id}-r${i}`}
                    stroke={hill.rows!.colors[1]}
                    strokeWidth={Math.round(row.sw * 7) / 10}
                    strokeDasharray={`0 ${r(row.sw * 1.9)} 0 ${r(row.sw * 1.3)}`}
                    strokeDashoffset={r(row.sw * 1.3)}
                  />
                </g>
              ))}
            </g>
          )}
          {bushes.map((b, k) => (
            <g key={k}>
              <ellipse
                cx={b.cx}
                cy={b.cy + b.r * 0.72}
                rx={r(b.r * 1.4)}
                ry={r(b.r * 0.26)}
                fill={hill.bushes!.dark}
                opacity="0.4"
                filter={`url(#${id}-soft)`}
              />
              <ellipse cx={b.cx} cy={b.cy} rx={r(b.r * 1.3)} ry={b.r} fill={`url(#${id}-b${i})`} />
            </g>
          ))}
          {flowers.map((f, k) => (
            <ellipse key={k} cx={f.cx} cy={f.cy} rx={f.rx} ry={f.ry} fill={f.fill} opacity={f.o} />
          ))}
        </g>
      ))}

      {bokeh.length > 0 && (
        <g className={styles.layer} style={depthStyle(1)} filter={`url(#${id}-dof)`}>
          {bokeh.map((b, i) => (
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={b.fill} opacity={b.o} />
          ))}
        </g>
      )}
    </svg>
  );
}
