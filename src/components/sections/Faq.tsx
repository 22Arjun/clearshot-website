import { faqs, site } from "@/content/site";
import { Icon } from "../Icon";
import styles from "./Faq.module.css";

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className={`container ${styles.layout}`}>
        <div className={styles.side}>
          <h2 className="h2" data-reveal>
            Questions,
            <br />
            <em>answered.</em>
          </h2>
          <p className="lead" data-reveal>
            Can&rsquo;t find what you&rsquo;re looking for? We reply to every email, usually within a day.
          </p>
          <a href={`mailto:${site.supportEmail}`} className="btn btn-light btn-sm" data-reveal>
            <Icon name="mail" /> {site.supportEmail}
          </a>
        </div>
        <div className={styles.list} data-reveal>
          {faqs.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary>
                {f.q}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
