"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { plans } from "@/content/site";
import { Icon } from "../Icon";
import styles from "./Pricing.module.css";

export function Pricing({ featuredArt }: { featuredArt: ReactNode }) {
  const [yearly, setYearly] = useState(true);

  return (
    <section className="section" id="pricing">
      <div className="container">
        <header className={styles.head}>
          <h2 className="h2" data-reveal>
            Simple pricing.
            <br />
            <em>Yours forever.</em>
          </h2>
          <p className="lead" data-reveal style={{ "--d": "80ms" } as CSSProperties}>
            Try everything free for 14 days. Then buy once — or add Pro when you want the cloud.
          </p>
          <div className={styles.toggle} role="group" aria-label="Billing period" data-reveal>
            <span className={styles.thumb} data-yearly={yearly} aria-hidden="true" />
            <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
              Monthly
            </button>
            <button aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly <span className={styles.save}>−25%</span>
            </button>
          </div>
        </header>

        <div className={styles.grid}>
          {plans.map((p, i) => {
            const price = typeof p.price === "number" ? p.price : yearly ? p.price.yearly : p.price.monthly;
            return (
              <div
                key={p.name}
                className={styles.plan}
                data-featured={p.featured || undefined}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as CSSProperties}
              >
                {p.featured && (
                  <div className={styles.art} aria-hidden="true">
                    {featuredArt}
                    <span className={styles.popular}>Most popular</span>
                  </div>
                )}
                <div className={styles.planBody}>
                  <h3>{p.name}</h3>
                  <p className={styles.blurb}>{p.blurb}</p>
                  <div className={styles.price}>
                    <span className={styles.currency}>$</span>
                    <span key={price} className={styles.amount}>
                      {price}
                    </span>
                    <span className={styles.unit}>
                      {p.unit}
                      {typeof p.price !== "number" && <em>{yearly ? "billed yearly" : "billed monthly"}</em>}
                    </span>
                  </div>
                  <a href="#download" className={`btn ${p.featured ? "btn-white" : "btn-dark"} ${styles.cta}`}>
                    {p.cta}
                  </a>
                  <ul className={styles.features}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={15} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <p className={styles.note} data-reveal>
          Prices in USD. Students & educators get 50% off. 30-day money-back guarantee, no questions asked.
        </p>
      </div>
    </section>
  );
}
