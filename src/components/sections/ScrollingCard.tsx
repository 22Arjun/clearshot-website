"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Icon } from "../Icon";
import styles from "./Feature.module.css";

const STEPS = [
  { label: "Select area", until: 12 },
  { label: "Auto-scroll the page", until: 58 },
  { label: "Stitch 14 frames", until: 96 },
  { label: "Copy to clipboard", until: 100 },
];

/* A scrolling capture in progress — loops while visible. */
export function ScrollingCard() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      return;
    }
    if (!inView) return;
    let raf = 0;
    let start = performance.now();
    const LOOP = 6200;
    const tick = (now: number) => {
      const t = (now - start) % LOOP;
      setPct(Math.min(100, Math.round((t / (LOOP - 1600)) * 100)));
      raf = requestAnimationFrame(tick);
    };
    start = performance.now();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const active = STEPS.findIndex((s) => pct < s.until);
  const done = pct >= 100;

  return (
    <div ref={ref} className={styles.scene}>
      <div className={styles.strip} aria-hidden="true">
        <div className={styles.stripPage} style={{ transform: `translateY(${-pct * 2.6}px)` }}>
          <i className={styles.pHero} />
          <i />
          <i />
          <i className={styles.pShort} />
          <i className={styles.pImg} />
          <i />
          <i className={styles.pShort} />
          <i className={styles.pImg} />
          <i />
          <i />
          <i className={styles.pShort} />
        </div>
      </div>

      <div className={`glass ${styles.task}`}>
        <div className={styles.taskHead}>
          <b>
            <Icon name="scroll" size={16} /> Scrolling capture
          </b>
          <Icon name="x" size={15} />
        </div>
        <div className={styles.progress}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressMeta}>
          <span>{done ? "Done — 1,284 × 9,620 px" : "Capturing…"}</span>
          <span>{pct}%</span>
        </div>
        <ul className={styles.steps}>
          {STEPS.map((s, i) => {
            const state = done || i < active ? "done" : i === active ? "active" : "todo";
            return (
              <li key={s.label} data-state={state}>
                <span className={styles.stepDot}>{state === "done" && <Icon name="check" size={11} />}</span>
                {s.label}
                {state === "active" && <Icon name="chevronRight" size={14} className={styles.stepArrow} />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
