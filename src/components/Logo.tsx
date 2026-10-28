type MarkProps = { size?: number; tone?: "dark" | "light" };

/* Capture brackets around a lens — the selection you draw, the shot you keep. */
export function LogoMark({ size = 28, tone = "dark" }: MarkProps) {
  const bg = tone === "dark" ? "#0d0d10" : "#ffffff";
  const fg = tone === "dark" ? "#ffffff" : "#0d0d10";
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9.5" fill={bg} />
      <path
        d="M9 13.5v-3A1.5 1.5 0 0 1 10.5 9h3M18.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3M23 18.5v3a1.5 1.5 0 0 1-1.5 1.5h-3M13.5 23h-3A1.5 1.5 0 0 1 9 21.5v-3"
        fill="none"
        stroke={fg}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3.4" fill="#7b86ff" />
      <circle cx="17.1" cy="14.9" r="1.1" fill="#fff" opacity=".85" />
    </svg>
  );
}

export function Logo({ tone = "dark", size = 26 }: MarkProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: 18,
        letterSpacing: "-0.03em",
        color: tone === "dark" ? "var(--ink)" : "#fff",
      }}
    >
      <LogoMark size={size} tone={tone} />
      <span>
        ClearShot<span style={{ opacity: 0.45, fontWeight: 500 }}>X</span>
      </span>
    </span>
  );
}
