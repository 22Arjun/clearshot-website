import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { Icon } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { Parallax } from "../landscape/Parallax";
import styles from "./Cta.module.css";

export function Cta() {
  return (
    <section className={styles.wrap} id="download">
      <div className="container">
        <Parallax className={`${styles.card} grain`}>
          <Landscape scene="sunset" align="xMidYMax" />
          <div className={styles.content}>
            <h2 className="h2" data-reveal>
              Start capturing
              <br />
              <em>clearly</em> today.
            </h2>
            <p data-reveal style={{ "--d": "80ms" } as CSSProperties}>
              Free for 14 days. No account, no credit card — just a better way to show what you mean.
            </p>
            <div className={styles.ctas} data-reveal style={{ "--d": "160ms" } as CSSProperties}>
              <a href={site.downloadUrl} className="btn btn-white">
                <Icon name="download" /> Download for Mac
              </a>
              <a href="#pricing" className="btn btn-glass">
                See pricing
              </a>
            </div>
            <span className={styles.req}>{site.requirements}</span>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
