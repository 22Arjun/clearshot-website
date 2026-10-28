import type { CSSProperties } from "react";
import { recordPoints, site } from "@/content/site";
import { Icon } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { Parallax } from "../landscape/Parallax";
import styles from "./Feature.module.css";

const v = (o: Record<string, string | number>) => o as CSSProperties;

/* Deterministic waveform so server and client agree. */
const wave = Array.from({ length: 64 }, (_, i) => 22 + Math.round(Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31)) * 78));

export function RecordFeature() {
  return (
    <section className="section" id="record">
      <div className={`container ${styles.split} ${styles.flip}`}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            <Icon name="record" /> Record
          </span>
          <h2 className="h2" data-reveal style={v({ "--d": "60ms" })}>
            Record like a studio.
            <br />
            Send like a <em>text.</em>
          </h2>
          <p className="lead" data-reveal style={v({ "--d": "120ms" })}>
            Capture your screen in 4K at 60 fps with webcam, microphone and system audio. Trim it in place and send
            a link before the coffee&rsquo;s cold.
          </p>
          <ul className={styles.checks} data-reveal style={v({ "--d": "180ms" })}>
            {recordPoints.map((p) => (
              <li key={p}>
                <span>
                  <Icon name="check" size={13} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <a href={site.downloadUrl} className="btn btn-dark btn-sm" data-reveal style={v({ marginTop: 32 })}>
            Start recording free <Icon name="arrowRight" className="arrow" />
          </a>
        </div>

        <Parallax className={`${styles.visual} grain`}>
          <Landscape scene="golden" />
          <div className={`glass ${styles.editor}`}>
            <div className={styles.frame}>
              <div className={styles.frameBar}>
                <i />
                <i />
                <i />
              </div>
              <div className={styles.slide}>
                <div>
                  <b>
                    Q4 launch, <em>in 90 seconds</em>
                  </b>
                  <span />
                  <span style={{ width: "70%" }} />
                </div>
                <div className={styles.slideArt} />
              </div>
              <span className={styles.clicks} />
              <span className={styles.camBubble} />
            </div>

            <div className={styles.timeline}>
              <div className={styles.thumbs}>
                {Array.from({ length: 9 }, (_, i) => (
                  <i key={i} style={v({ "--i": i })} />
                ))}
              </div>
              <div className={styles.wave}>
                {wave.map((h, i) => (
                  <i key={i} style={v({ "--h": `${h}%` })} />
                ))}
              </div>
              <span className={styles.trim} />
              <span className={styles.playhead} />
            </div>

            <div className={styles.exportBar}>
              <span className={styles.chip}>MP4</span>
              <span className={styles.chip} data-on="">
                GIF
              </span>
              <span className={styles.size}>0:42 · 1.8 MB</span>
              <span className="btn btn-dark">
                <Icon name="upload" size={14} /> Share
              </span>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
