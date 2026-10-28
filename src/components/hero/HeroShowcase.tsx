"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Icon, type IconName } from "../Icon";
import { Parallax } from "../landscape/Parallax";
import { ScaledStage } from "../ScaledStage";
import { AnnotatePanel, CapturePanel, MenuBar, RecordPanel, SharePanel } from "./HeroPanels";
import styles from "./HeroShowcase.module.css";

const TABS: { id: string; label: string; icon: IconName }[] = [
  { id: "capture", label: "Capture", icon: "area" },
  { id: "annotate", label: "Annotate", icon: "pencil" },
  { id: "record", label: "Record", icon: "record" },
  { id: "share", label: "Share", icon: "link" },
];

const DWELL = 6800;

export function HeroShowcase({ wallpaper }: { wallpaper: ReactNode }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const cycling = auto && inView && !reduced;

  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % TABS.length), DWELL);
    return () => clearTimeout(t);
  }, [active, cycling]);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const playing = (i: number) => inView && active === i;

  return (
    <div className={styles.showcase} ref={ref}>
      <div className={styles.tabs} role="tablist" aria-label="ClearShotX in action" data-reveal style={{ "--d": "340ms" } as React.CSSProperties}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            role="tab"
            id={`hero-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="hero-stage"
            className={styles.tab}
            data-active={i === active}
            onClick={() => select(i)}
          >
            <Icon name={t.icon} size={15} />
            {t.label}
            {cycling && i === active && (
              <span key={`timer-${active}`} className={styles.tabTimer} style={{ animationDuration: `${DWELL}ms` }} />
            )}
          </button>
        ))}
      </div>

      <div className={styles.stageWrap} data-reveal="scale" style={{ "--d": "420ms" } as React.CSSProperties}>
        <ScaledStage width={1200} height={660} minScale={0.5} className={styles.frame}>
          <Parallax className={styles.desktop}>
            <div
              id="hero-stage"
              role="tabpanel"
              aria-labelledby={`hero-tab-${TABS[active].id}`}
              className={styles.screen}
            >
              <div className={styles.wallpaper}>
                {wallpaper}
                <div className="noise" />
              </div>
              <MenuBar appActive={menuOpen} />
              <CapturePanel visible={active === 0} playing={playing(0)} reduced={reduced} onMenu={setMenuOpen} />
              <AnnotatePanel visible={active === 1} playing={playing(1)} reduced={reduced} />
              <RecordPanel visible={active === 2} playing={playing(2)} reduced={reduced} />
              <SharePanel visible={active === 3} playing={playing(3)} reduced={reduced} />
            </div>
          </Parallax>
        </ScaledStage>
      </div>
    </div>
  );
}
