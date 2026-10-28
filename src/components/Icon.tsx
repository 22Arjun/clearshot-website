import type { SVGProps } from "react";

/* One stroke family, 24px grid, 1.7 stroke — drawn to sit beside SF Symbols. */
const paths = {
  arrowRight: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  download: <path d="M12 4v11m-4.5-4.5L12 15l4.5-4.5M5 19h14" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  area: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M12 9v6M9 12h6" />
    </>
  ),
  window: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 9h18" />
      <circle cx="6" cy="7" r=".4" fill="currentColor" />
      <circle cx="8" cy="7" r=".4" fill="currentColor" />
    </>
  ),
  fullscreen: (
    <>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 20.5h8M12 17v3.5" />
    </>
  ),
  scroll: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M12 8v8m-2.5-2.5L12 16l2.5-2.5" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9.5V13l2.2 1.6M9.5 2.8h5" />
    </>
  ),
  freeze: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 6.5l2.5-2M9.5 19.5 12 17.5l2.5 2" />,
  ocr: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <path d="M8.5 9h7M12 9v7" />
    </>
  ),
  sparkles: (
    <path d="M12 3.5 13.6 8a3 3 0 0 0 1.9 1.9L20 11.5l-4.5 1.6a3 3 0 0 0-1.9 1.9L12 19.5 10.4 15a3 3 0 0 0-1.9-1.9L4 11.5l4.5-1.6A3 3 0 0 0 10.4 8L12 3.5ZM19 3v3m-1.5-1.5h3" />
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.8 7 9.5 4.1-1.7 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  link: (
    <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
      <path d="M15.5 8.5V6A2.5 2.5 0 0 0 13 3.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
    </>
  ),
  pencil: <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4ZM13.5 6.5l4 4" />,
  pin: <path d="M9 4h6l-1 5 3.5 3.5v1.5h-11v-1.5L10 9 9 4ZM12 14v6.5" />,
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.5 1.7A3.7 3.7 0 0 1 17.5 18.5H7Z" />,
  upload: <path d="M12 16V5m-4.5 4.5L12 5l4.5 4.5M5 19h14" />,
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5" />
      <path d="M3.5 4v4.5H8M12 7.5V12l3 2" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.8" />
      <path d="m21 15.5-5-5L5 20" />
    </>
  ),
  record: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.4-2h5.8l1.4 2h1.2A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-8Z" />
      <circle cx="12" cy="12.5" r="3.3" />
    </>
  ),
  pause: <path d="M9 6v12M15 6v12" />,
  stop: <rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" stroke="none" />,
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" />,
  keyboard: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
      <path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M8 14h8" />
    </>
  ),
  cursor: <path d="M5 3.5 19 10l-6.2 1.8L10 18 5 3.5Z" fill="currentColor" />,
  star: (
    <path
      d="m12 3.2 2.6 5.5 6 .8-4.4 4.1 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.1 6-.8L12 3.2Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  undo: <path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />,
  trash: <path d="M4.5 7h15M10 11v6M14 11v6M6 7l1 12.5A1.5 1.5 0 0 0 8.5 21h7a1.5 1.5 0 0 0 1.5-1.5L18 7M9 7V4.5h6V7" />,
  toolArrow: <path d="M5 19 18 6m0 0h-7.5M18 6v7.5" />,
  toolRect: <rect x="4" y="6" width="16" height="12" rx="2" />,
  toolEllipse: <ellipse cx="12" cy="12" rx="8.5" ry="6.5" />,
  toolLine: <path d="M5 19 19 5" />,
  toolText: <path d="M5 6.5V5h14v1.5M12 5v14m-3 0h6" />,
  toolHighlight: (
    <>
      <path d="m9 15 6.5-11 4 2.3L13 17.3 9 15Z" />
      <path d="m9 15-1.5 4h4.5l1-1.7" />
      <path d="M4 21h16" />
    </>
  ),
  toolBlur: (
    <>
      <path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z" />
      <path d="M9 14.5a3 3 0 0 0 3 3" />
    </>
  ),
  toolCounter: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.5 9.5 12.5 8v8" />
    </>
  ),
  toolCrop: <path d="M6 2.5V16a2 2 0 0 0 2 2h13.5M2.5 6H16a2 2 0 0 1 2 2v13.5" />,
  toolSpotlight: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  wifi: (
    <path d="M2.5 9.5a14 14 0 0 1 19 0M5.5 12.8a9.5 9.5 0 0 1 13 0M8.6 16a5 5 0 0 1 6.8 0M12 19.2h.01" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  toggles: (
    <>
      <rect x="3" y="4.5" width="18" height="6" rx="3" />
      <rect x="3" y="13.5" width="18" height="6" rx="3" />
      <circle cx="17.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="6.5" cy="16.5" r="1.5" fill="currentColor" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" />,
  feather: (
    <path d="M20 4c-6 0-11.5 3-13.5 9L5 20m1.5-7c3 .5 6 0 8.5-2.5M9.5 16.5c2.5.2 5-.6 7-2.8C19.5 10.5 20 7 20 4" />
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  layers: <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5ZM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: <path d="M4 4l16 16M10.6 6a9.6 9.6 0 0 1 1.4-.1c6 0 9.5 6.1 9.5 6.1a17 17 0 0 1-2.6 3.3M6.6 7.6A16 16 0 0 0 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2" />,
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.8 1.8-1.7 0-1.3-1-1.5-1-2.6 0-1 .8-1.7 1.8-1.7h2.2a3.7 3.7 0 0 0 3.7-3.7c0-4.2-3.8-7.3-8.5-7.3Z" />
      <circle cx="7.8" cy="11" r=".9" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r=".9" fill="currentColor" />
      <circle cx="15" cy="7.8" r=".9" fill="currentColor" />
    </>
  ),
  folder: <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.5Z" />,
  command: (
    <path d="M9 6.5V17.5M15 6.5v11M6.5 9H17.5M6.5 15h11M9 9H6.5A2.5 2.5 0 1 1 9 6.5V9Zm6 0h2.5A2.5 2.5 0 1 0 15 6.5V9Zm-6 6H6.5A2.5 2.5 0 1 0 9 17.5V15Zm6 0h2.5a2.5 2.5 0 1 1-2.5 2.5V15Z" />
  ),
  gauge: (
    <>
      <path d="M4 17a8.5 8.5 0 1 1 16 0" />
      <path d="m12 13.5 4-4.5" />
      <circle cx="12" cy="14" r="1.2" fill="currentColor" />
    </>
  ),
  dock: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M7 16.5h10" />
    </>
  ),
  quote: (
    <path
      d="M10 7.5C6.8 8.3 5 10.6 5 14.2V17h4.5v-4.5H7.3c.1-1.9 1.1-3.1 2.9-3.6L10 7.5Zm9 0c-3.2.8-5 3.1-5 6.7V17h4.5v-4.5h-2.2c.1-1.9 1.1-3.1 2.9-3.6L19 7.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size ?? 18}
      height={size ?? 18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
