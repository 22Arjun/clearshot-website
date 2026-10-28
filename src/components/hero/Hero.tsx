import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { CaptureTrigger } from "../CaptureMode";
import { Icon } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { HeroShowcase } from "./HeroShowcase";
import styles from "./Hero.module.css";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.aura} aria-hidden="true" />
      <div className="container">
        <div className={styles.copy}>
          <a href="#more" className={styles.pill} data-reveal>
            <span className={styles.pillTag}>New</span>
            <span>ClearShotX 2.0 — Smart Redact is here</span>
            <Icon name="arrowRight" size={14} />
          </a>

          <h1 className="h1" data-reveal style={d(80)}>
            Capture faster. Explain better.
            <br />
            Share <em>everything.</em>
          </h1>

          <p className={`lead ${styles.lead}`} data-reveal style={d(160)}>
            The native Mac toolkit for screenshots, recordings and annotations — with on-device AI that blurs
            what&rsquo;s private and copies what&rsquo;s useful.
          </p>

          <div className={styles.ctas} data-reveal style={d(240)}>
            <a href={site.downloadUrl} className="btn btn-dark">
              <Icon name="download" />
              Download free
            </a>
            <CaptureTrigger className="btn btn-light">
              Try capture mode <span className="kbd">C</span>
            </CaptureTrigger>
          </div>
          <p className={styles.req} data-reveal style={d(300)}>
            {site.requirements}
          </p>
        </div>

        <HeroShowcase wallpaper={<Landscape scene="meadow" />} />
      </div>
    </section>
  );
}
