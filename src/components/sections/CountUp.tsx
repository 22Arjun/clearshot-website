"use client";

import { useEffect, useState } from "react";
import { easeOut, useInView } from "@/lib/hooks";

export function CountUp({ to, decimals = 0, duration = 1600 }: { to: number; decimals?: number; duration?: number }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.6 });
  const [value, setValue] = useState(to);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView || started) return;
    setStarted(true);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, started, to, duration]);

  return <span ref={ref}>{value.toFixed(decimals)}</span>;
}
