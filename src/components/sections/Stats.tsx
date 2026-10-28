import type { CSSProperties } from "react";
import { stats } from "@/content/site";
import { CountUp } from "./CountUp";
import styles from "./Stats.module.css";

export function Stats() {
  return (
    <section className="section">
      <div className="container">
        <header className={styles.head}>
          <h2 className="h2" data-reveal>
            Fast enough to feel <em>invisible.</em>
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
            Built in Swift and tuned for Apple silicon — ClearShotX stays out of your way until the moment you need it.
          </p>
        </header>
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={s.label} className={styles.card} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties}>
              <span className={styles.prefix}>{s.prefix}</span>
              <b className={styles.value}>
                <CountUp to={s.value} decimals={s.decimals} />
                <small>{s.suffix}</small>
              </b>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
