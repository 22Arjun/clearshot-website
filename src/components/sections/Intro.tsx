import type { ReactNode } from "react";
import { logos, site, statement } from "@/content/site";
import { Icon } from "../Icon";
import { ScrollLitText } from "./ScrollLitText";
import styles from "./Intro.module.css";

/* Simple invented marks for placeholder customers — replace with real logos. */
const glyphs: Record<(typeof logos)[number], ReactNode> = {
  Northwind: <path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
  Halcyon: (
    <>
      <path d="M3 13a9 9 0 0 1 18 0Z" />
      <rect x="3" y="16" width="18" height="2.6" rx="1.3" />
    </>
  ),
  Lumen: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  Parallel: <path d="M7 3h4L7 21H3L7 3Zm7 0h4l-4 18h-4l4-18Z" />,
  Kestrel: <path d="M2 14 9 6.5l3 3L22 4l-7.5 13-3-3L6 18Z" />,
  Fernway: <path d="M20 4C10 4 4 9 4 20c3-5 6-7 11-8-4 2-6 4-7.5 7C16 19 20 13 20 4Z" />,
  Orbit: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.8" transform="rotate(-25 12 12)" />
    </>
  ),
  Quill: <path d="M19.5 3c-7 1-12 6-13.5 13L4 21l2.5-3c6-1 11-5 13-15Zm-11 11c3-2 5.5-4.5 7.5-8" />,
};

export function LogoMarquee() {
  const row = logos.map((name) => (
    <span key={name} className={styles.logo}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        {glyphs[name]}
      </svg>
      {name}
    </span>
  ));
  return (
    <section className={styles.logos} aria-label="Teams using ClearShotX">
      <p className={styles.logosLabel} data-reveal>
        Loved by makers and teams at
      </p>
      <div className={styles.marquee} data-reveal>
        <div className={styles.track}>
          {row}
          <span aria-hidden="true" className={styles.dup}>
            {row}
          </span>
        </div>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className={`section ${styles.statement}`}>
      <div className="container">
        <ScrollLitText text={statement} className={styles.statementText} />
        <div className={styles.join} data-reveal>
          <div className={styles.joinPeople}>
            <span className={styles.faces} aria-hidden="true">
              {["MA", "DO", "PR", "LB"].map((initials, i) => (
                <i key={initials} style={{ "--h": `${[262, 210, 330, 150][i]}` } as React.CSSProperties}>
                  {initials}
                </i>
              ))}
            </span>
            <span>
              <b>Join 120,000+ people capturing with {site.name}</b>
              <span>Free 14-day trial. No account needed.</span>
            </span>
          </div>
          <a href={site.downloadUrl} className="btn btn-dark btn-sm">
            Get {site.name} <Icon name="arrowRight" className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
