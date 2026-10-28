import type { CSSProperties } from "react";
import { captureModes, site } from "@/content/site";
import { Icon } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { Parallax } from "../landscape/Parallax";
import { ScrollingCard } from "./ScrollingCard";
import styles from "./Feature.module.css";

export function CaptureFeature() {
  return (
    <section className="section" id="features">
      <div className={`container ${styles.split}`}>
        <div className={styles.copy}>
          <span className="eyebrow" data-reveal>
            <Icon name="area" /> Capture
          </span>
          <h2 className="h2" data-reveal style={{ "--d": "60ms" } as CSSProperties}>
            Capture anything,
            <br />
            in <em>any shape.</em>
          </h2>
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            Areas, windows, whole screens, endless pages — even the menu that vanishes the moment you click.
            ClearShotX freezes the moment so you never miss it.
          </p>

          <ul className={styles.modes} data-reveal style={{ "--d": "180ms" } as CSSProperties}>
            {captureModes.map((m) => (
              <li key={m.label}>
                <Icon name={m.icon} size={17} />
                <span>{m.label}</span>
                <kbd>{m.keys}</kbd>
              </li>
            ))}
          </ul>

          <div className={styles.callout} data-reveal style={{ "--d": "240ms" } as CSSProperties}>
            <span className={styles.calloutIcon}>
              <Icon name="scroll" />
            </span>
            <div>
              <b>Scrolling capture</b>
              <span>Stitch whole webpages, chats and docs into one seamless image.</span>
            </div>
          </div>
          <p className="small" data-reveal>
            Every shortcut is yours to remap.
          </p>
          <a href={site.downloadUrl} className="btn btn-dark btn-sm" data-reveal>
            Get started — free <Icon name="arrowRight" className="arrow" />
          </a>
        </div>

        <Parallax className={`${styles.visual} grain`}>
          <Landscape scene="bloom" />
          <ScrollingCard />
        </Parallax>
      </div>
    </section>
  );
}
