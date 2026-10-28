import type { CSSProperties } from "react";
import { site, switchReasons } from "@/content/site";
import { Icon } from "../Icon";
import styles from "./WhySwitch.module.css";

export function WhySwitch() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.top}>
          <h2 className="h2" data-reveal>
            Why people <em>switch.</em>
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
            Screenshot apps tend to grow heavy, noisy and subscription-shaped. {site.name} is built on three promises
            instead.
          </p>
        </div>

        <div className={styles.grid}>
          {switchReasons.map((r, i) => (
            <div key={r.title} className={styles.card} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
              <span className={styles.num}>0{i + 1}</span>
              <span className={styles.icon}>
                <Icon name={r.icon} size={20} />
              </span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.banner} data-reveal>
          <div className={styles.bannerGlow} aria-hidden="true" />
          <div>
            <b>Switching from another screenshot app?</b>
            <span>
              Point {site.name} at your screenshot folder and remap any shortcut in a click. Your muscle memory keeps
              working from day one.
            </span>
          </div>
          <a href="#faq" className="btn btn-white btn-sm">
            How switching works <Icon name="arrowRight" className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
