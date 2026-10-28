"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* Words light up from grey to ink as the paragraph scrolls through the viewport.
   Wrap a phrase in *asterisks* to set it in the italic serif. */
export function ScrollLitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  const words = useMemo(() => {
    const out: { word: string; em: boolean }[] = [];
    text.split(/(\*[^*]+\*)/).forEach((part) => {
      const em = part.startsWith("*");
      part
        .replace(/\*/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => out.push({ word, em }));
    });
    return out;
  }, [text]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(words.length);
      return;
    }
    let frame = 0;
    const update = () => {
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh * 0.86 - box.top) / (box.height + vh * 0.32);
      setLit(Math.round(Math.min(1, Math.max(0, p)) * words.length * 1.05));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map(({ word, em }, i) => (
        <span key={i} aria-hidden="true" data-lit={i < lit} data-em={em || undefined}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
