import { Icon } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { Parallax } from "../landscape/Parallax";
import styles from "./Testimonial.module.css";

export function Testimonial() {
  return (
    <section className={styles.wrap} aria-label="Customer story">
      <Parallax className={`${styles.scene} grain`}>
        <Landscape scene="dusk" align="xMidYMax" />
        <div className={styles.shade} />
        <div className={`container ${styles.inner}`}>
          <blockquote className={styles.quote} data-reveal>
            &ldquo;ClearShotX replaced four apps on my Mac. Bug reports that used to take ten minutes now take ten
            seconds.&rdquo;
          </blockquote>

          <div className={styles.cards} data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
            <div className={styles.video}>
              <span className={styles.play}>
                <Icon name="play" size={16} />
              </span>
              <span className={styles.wave} aria-hidden="true">
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} style={{ animationDelay: `${i * -0.13}s` }} />
                ))}
              </span>
              <span className={styles.duration}>0:42</span>
            </div>
            <span className={styles.rule} />
            <div className={styles.person}>
              <div>
                <b>Maya Lindqvist</b>
                <span>Design Lead, Northwind</span>
              </div>
              <a href="#reviews" className="btn btn-white btn-sm">
                Read the story
              </a>
            </div>
          </div>
        </div>
      </Parallax>
    </section>
  );
}
