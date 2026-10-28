"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/hooks";
import styles from "./Reviews.module.css";

/* A rolling-digit counter that ticks up while on screen. */
export function Odometer({ start }: { start: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [n, setN] = useState(start);

  useEffect(() => {
    if (!inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setN((v) => v + 1 + Math.floor(Math.random() * 9)), 1100);
    return () => clearInterval(t);
  }, [inView]);

  const chars = n.toLocaleString("en-US").split("");
  return (
    <div ref={ref} className={styles.odo} aria-label={n.toLocaleString("en-US")} role="img">
      {chars.map((c, i) => {
        const key = chars.length - i;
        if (c === ",") {
          return (
            <span key={`c${key}`} className={styles.comma}>
              ,
            </span>
          );
        }
        return (
          <span key={key} className={styles.digit}>
            <span style={{ transform: `translateY(${-Number(c) * 10}%)` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        );
      })}
    </div>
  );
}
