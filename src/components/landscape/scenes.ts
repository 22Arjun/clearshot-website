/*
  Painted landscape presets. Every scene is generated from a seed at build
  time, so the SVG is deterministic and ships as static markup.
  Coordinates live in a 1600 × 1000 viewBox.
*/

export type Rows = {
  count: number;
  gap: number;
  growth: number;
  width: number;
  colors: [string, string];
  opacity: number;
};

export type Hill = {
  y: number;
  height: number;
  width: number;
  bumps: number;
  ripple: number;
  fill: [string, string];
  depth: number;
  rim?: { color: string; width: number; opacity: number };
  rows?: Rows;
  bushes?: { count: number; r: [number, number]; light: string; dark: string };
  flowers?: { count: number; colors: string[]; size: [number, number]; spread: number };
};

export type Scene = {
  seed: number;
  sky: [number, string][];
  sun?: { x: number; y: number; r: number; core: string; glow: string; glowR: number };
  clouds?: { count: number; y: [number, number]; color: string; opacity: number; flat?: number };
  hills: Hill[];
  bokeh?: { count: number; colors: string[] };
};

const lavender = ["#f7f4ff", "#cdb8f7", "#ab92ea", "#f3c9e2"];

export const scenes = {
  /* Bright spring morning — the hero desktop */
  meadow: {
    seed: 11,
    sky: [
      [0, "#6b9bd6"],
      [0.32, "#a3c3ea"],
      [0.56, "#d9e6f2"],
      [0.68, "#f2efe9"],
    ],
    sun: { x: 1190, y: 330, r: 46, core: "#fffdf6", glow: "#fff4d8", glowR: 460 },
    clouds: { count: 6, y: [90, 400], color: "#ffffff", opacity: 0.9 },
    hills: [
      { y: 650, height: 80, width: 240, bumps: 7, ripple: 4, fill: ["#b1c6b0", "#a2b8a2"], depth: 0.1 },
      {
        y: 705, height: 110, width: 210, bumps: 6, ripple: 5, fill: ["#97b882", "#76995f"], depth: 0.2,
        rim: { color: "#eef6df", width: 2, opacity: 0.55 },
      },
      {
        y: 800, height: 150, width: 250, bumps: 5, ripple: 6, fill: ["#80ae5a", "#507f35"], depth: 0.36,
        rim: { color: "#d8f0b0", width: 2.5, opacity: 0.5 },
        bushes: { count: 4, r: [26, 46], light: "#9fd066", dark: "#2c5a1b" },
        rows: { count: 4, gap: 16, growth: 0.2, width: 3, colors: ["#d9cdf7", "#f5f2ff"], opacity: 0.55 },
      },
      {
        y: 915, height: 170, width: 320, bumps: 4, ripple: 6, fill: ["#6fa046", "#3d6b25"], depth: 0.56,
        rim: { color: "#cdeca1", width: 3, opacity: 0.45 },
        rows: { count: 7, gap: 22, growth: 0.22, width: 4.5, colors: ["#c9b4f4", "#f7f4ff"], opacity: 0.92 },
        flowers: { count: 90, colors: lavender, size: [1.6, 4.6], spread: 160 },
      },
      {
        y: 1030, height: 120, width: 300, bumps: 4, ripple: 5, fill: ["#548d33", "#2d5a1b"], depth: 0.82,
        rows: { count: 6, gap: 30, growth: 0.25, width: 8, colors: ["#b99ff0", "#ffffff"], opacity: 0.95 },
        flowers: { count: 70, colors: lavender, size: [3, 8], spread: 140 },
      },
    ],
    bokeh: { count: 7, colors: ["#cdb8f7", "#ffffff", "#a98be6"] },
  },

  /* Lavender evening, flowers up close */
  bloom: {
    seed: 7,
    sky: [
      [0, "#8577cc"],
      [0.38, "#b7a5e6"],
      [0.62, "#e4d8f4"],
      [0.76, "#f8eef4"],
    ],
    sun: { x: 420, y: 560, r: 0, core: "#fff8f2", glow: "#fff1ee", glowR: 420 },
    clouds: { count: 4, y: [80, 360], color: "#f8f1ff", opacity: 0.6, flat: 0.6 },
    hills: [
      { y: 660, height: 80, width: 260, bumps: 6, ripple: 4, fill: ["#aaa6c9", "#9399ae"], depth: 0.1 },
      {
        y: 735, height: 105, width: 240, bumps: 5, ripple: 5, fill: ["#86a078", "#647f55"], depth: 0.24,
        rows: { count: 4, gap: 14, growth: 0.2, width: 3, colors: ["#c6b0f2", "#e7dcff"], opacity: 0.6 },
      },
      {
        y: 850, height: 130, width: 300, bumps: 5, ripple: 6, fill: ["#6e9152", "#46703a"], depth: 0.44,
        rim: { color: "#e2d6ff", width: 2, opacity: 0.4 },
        rows: { count: 7, gap: 20, growth: 0.22, width: 5, colors: ["#b99cf2", "#8f72dc"], opacity: 0.9 },
      },
      {
        y: 990, height: 150, width: 260, bumps: 4, ripple: 6, fill: ["#5a8340", "#2e5523"], depth: 0.76,
        rows: { count: 7, gap: 28, growth: 0.24, width: 9, colors: ["#a888ea", "#d9c6ff"], opacity: 0.95 },
        flowers: { count: 130, colors: ["#cbb2f8", "#a687ea", "#ffffff", "#f1c6e6"], size: [2.4, 8], spread: 170 },
      },
    ],
    bokeh: { count: 12, colors: ["#c9b0f7", "#a888ea", "#ffffff", "#f2c4e4"] },
  },

  /* Cool, misty morning — sits behind the annotation editor */
  mist: {
    seed: 23,
    sky: [
      [0, "#93bce4"],
      [0.45, "#c8dcee"],
      [0.7, "#eaf1f3"],
    ],
    sun: { x: 320, y: 420, r: 0, core: "#ffffff", glow: "#ffffff", glowR: 520 },
    clouds: { count: 5, y: [80, 380], color: "#ffffff", opacity: 0.75 },
    hills: [
      { y: 640, height: 100, width: 300, bumps: 6, ripple: 4, fill: ["#bccfcb", "#adc2bc"], depth: 0.1 },
      { y: 705, height: 120, width: 260, bumps: 6, ripple: 5, fill: ["#98b9a8", "#7ca38e"], depth: 0.2 },
      {
        y: 810, height: 140, width: 300, bumps: 5, ripple: 6, fill: ["#7aa682", "#558566"], depth: 0.4,
        rim: { color: "#e6f6e8", width: 2, opacity: 0.5 },
        rows: { count: 5, gap: 18, growth: 0.2, width: 3.5, colors: ["#ffffff", "#e8f3d0"], opacity: 0.55 },
      },
      {
        y: 960, height: 150, width: 320, bumps: 4, ripple: 6, fill: ["#5f9668", "#376a46"], depth: 0.7,
        rows: { count: 8, gap: 24, growth: 0.22, width: 6, colors: ["#ffffff", "#fff3c2"], opacity: 0.85 },
        flowers: { count: 90, colors: ["#ffffff", "#fff6cf", "#e2f0ff"], size: [2, 6], spread: 150 },
      },
    ],
  },

  /* Pink-lavender dusk — full-bleed testimonial */
  dusk: {
    seed: 5,
    sky: [
      [0, "#7470c2"],
      [0.28, "#ab8fd6"],
      [0.5, "#e2afd0"],
      [0.68, "#f8d3c7"],
    ],
    sun: { x: 1250, y: 610, r: 0, core: "#fff3ea", glow: "#ffe2d4", glowR: 480 },
    clouds: { count: 7, y: [70, 420], color: "#fbd3e6", opacity: 0.75, flat: 0.45 },
    hills: [
      { y: 650, height: 70, width: 300, bumps: 6, ripple: 4, fill: ["#a093bd", "#8b86a6"], depth: 0.1 },
      {
        y: 715, height: 110, width: 260, bumps: 6, ripple: 5, fill: ["#829c70", "#5e7d54"], depth: 0.22,
        rows: { count: 4, gap: 14, growth: 0.2, width: 3, colors: ["#d2b8f2", "#efe4ff"], opacity: 0.6 },
      },
      {
        y: 820, height: 150, width: 320, bumps: 5, ripple: 6, fill: ["#6f9256", "#4a7038"], depth: 0.42,
        rim: { color: "#ffd9e6", width: 2.5, opacity: 0.45 },
        rows: { count: 8, gap: 18, growth: 0.22, width: 4.5, colors: ["#c3a6ee", "#efe4ff"], opacity: 0.88 },
      },
      {
        y: 975, height: 160, width: 330, bumps: 4, ripple: 6, fill: ["#5d8a43", "#30591f"], depth: 0.74,
        rows: { count: 9, gap: 24, growth: 0.22, width: 7.5, colors: ["#b393ea", "#e3d4ff"], opacity: 0.95 },
        flowers: { count: 110, colors: lavender, size: [2.4, 7], spread: 150 },
      },
    ],
    bokeh: { count: 8, colors: ["#c7a9f2", "#ffffff", "#f3c6e0"] },
  },

  /* Warm golden-hour — screen recording */
  golden: {
    seed: 31,
    sky: [
      [0, "#86a9d6"],
      [0.38, "#dcc3c0"],
      [0.6, "#f6d6ad"],
      [0.72, "#fbe6bd"],
    ],
    sun: { x: 900, y: 600, r: 54, core: "#fff6dc", glow: "#ffd697", glowR: 560 },
    clouds: { count: 5, y: [80, 380], color: "#fff0dc", opacity: 0.7, flat: 0.5 },
    hills: [
      { y: 655, height: 80, width: 260, bumps: 6, ripple: 4, fill: ["#cdb093", "#b89c80"], depth: 0.1 },
      {
        y: 725, height: 110, width: 240, bumps: 5, ripple: 5, fill: ["#aaa36a", "#878650"], depth: 0.22,
        rim: { color: "#ffe6ad", width: 2.5, opacity: 0.6 },
      },
      {
        y: 830, height: 140, width: 300, bumps: 5, ripple: 6, fill: ["#90974a", "#66702f"], depth: 0.42,
        rim: { color: "#ffd98a", width: 3, opacity: 0.55 },
        rows: { count: 6, gap: 18, growth: 0.22, width: 4, colors: ["#f5d47d", "#fff3c8"], opacity: 0.7 },
      },
      {
        y: 975, height: 150, width: 320, bumps: 4, ripple: 6, fill: ["#72823a", "#45541c"], depth: 0.72,
        rows: { count: 8, gap: 24, growth: 0.22, width: 7, colors: ["#ffd36e", "#fff2c9"], opacity: 0.9 },
        flowers: { count: 90, colors: ["#ffd36e", "#fff2c9", "#f5a35c", "#ffffff"], size: [2, 6.5], spread: 150 },
      },
    ],
    bokeh: { count: 8, colors: ["#ffd98a", "#fff2c9", "#f5a35c"] },
  },

  /* Deep violet sunset — final call to action */
  sunset: {
    seed: 3,
    sky: [
      [0, "#241f4a"],
      [0.32, "#55397f"],
      [0.54, "#b86a8f"],
      [0.66, "#f09b78"],
      [0.74, "#fccf8c"],
    ],
    sun: { x: 800, y: 660, r: 64, core: "#fff3cf", glow: "#ffae6a", glowR: 620 },
    clouds: { count: 5, y: [120, 470], color: "#f6a7a0", opacity: 0.4, flat: 0.4 },
    hills: [
      {
        y: 670, height: 70, width: 300, bumps: 6, ripple: 4, fill: ["#7d5288", "#5e3f72"], depth: 0.1,
        rim: { color: "#ffbf8f", width: 2, opacity: 0.6 },
      },
      {
        y: 740, height: 110, width: 260, bumps: 5, ripple: 5, fill: ["#553b70", "#3e2e5a"], depth: 0.22,
        rim: { color: "#ffa877", width: 2.5, opacity: 0.55 },
      },
      {
        y: 845, height: 140, width: 300, bumps: 5, ripple: 6, fill: ["#3d2d58", "#2a2142"], depth: 0.42,
        rim: { color: "#ff9d7a", width: 2, opacity: 0.4 },
        rows: { count: 7, gap: 18, growth: 0.22, width: 4, colors: ["#7f63c4", "#a487e6"], opacity: 0.7 },
      },
      {
        y: 990, height: 150, width: 320, bumps: 4, ripple: 6, fill: ["#271d3b", "#140f22"], depth: 0.72,
        rows: { count: 8, gap: 24, growth: 0.22, width: 7, colors: ["#8b6dd8", "#c3a6ff"], opacity: 0.8 },
        flowers: { count: 90, colors: ["#9d7fe0", "#c6a8ff", "#ffcf9a"], size: [2, 6], spread: 150 },
      },
    ],
    bokeh: { count: 8, colors: ["#ffb98a", "#c6a8ff", "#ffe0b0"] },
  },
} satisfies Record<string, Scene>;

export type SceneName = keyof typeof scenes;
