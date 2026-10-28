import { reviews, site, type Review } from "@/content/site";
import { Icon } from "../Icon";
import { Odometer } from "./Odometer";
import styles from "./Reviews.module.css";

function ReviewCard({ r }: { r: Review }) {
  const initials = r.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <figure className={styles.review}>
      <div className={styles.stars} aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon key={i} name="star" size={14} />
        ))}
      </div>
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className={styles.avatar} style={{ "--h": r.hue } as React.CSSProperties}>
          {initials}
        </span>
        <span>
          <b>{r.name}</b>
          <span>{r.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];
  return (
    <section className="section" id="reviews">
      <div className="container">
        <h2 className="h2" data-reveal>
          Don&rsquo;t just take our word for it
        </h2>
        <p className={styles.users} data-reveal>
          120,000+ Mac users · 4.9 average rating
        </p>
        <div className={styles.counter} data-reveal>
          <Odometer start={48213907} />
          <span>
            screenshots captured with <em className="serif">{site.name}</em>
          </span>
        </div>
      </div>

      <div className={styles.wall}>
        {rows.map((row, i) => (
          <div key={i} className={styles.row} data-dir={i % 2 ? "rev" : undefined}>
            <div className={styles.track}>
              {[...row, ...row].map((r, j) => (
                <div key={j} aria-hidden={j >= row.length || undefined}>
                  <ReviewCard r={r} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
