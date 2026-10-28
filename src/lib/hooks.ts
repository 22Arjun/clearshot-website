"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.25 }) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as [RefObject<T>, boolean];
}

/**
 * Steps through a scripted animation. Returns how many marks have passed
 * since `playing` became true; resets when playback stops.
 */
export function useTimeline(playing: boolean, marks: number[], reduced = false) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduced) {
      setStep(marks.length);
      return;
    }
    if (!playing) {
      const t = setTimeout(() => setStep(0), 500);
      return () => clearTimeout(t);
    }
    setStep(0);
    const timers = marks.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, reduced]);
  return step;
}

/** Animates 0 → 1 over `duration` whenever `run` flips on. */
export function useTween(run: boolean, duration: number, ease: (t: number) => number = easeInOut) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) {
      setValue(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, duration]);
  return value;
}

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const easeOut = (t: number) => 1 - (1 - t) ** 3;
