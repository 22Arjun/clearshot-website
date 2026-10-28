"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import styles from "./Footer.module.css";

/* Front-end only: wire `onSubmit` to your email provider before launch. */
export function Newsletter() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className={styles.thanks} role="status">
        <Icon name="check" size={15} /> You&rsquo;re on the list. See you next month.
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <Icon name="mail" size={16} />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input id="newsletter-email" type="email" required placeholder="Enter your email" autoComplete="email" />
      <button type="submit" className="btn btn-dark btn-sm">
        Subscribe
      </button>
    </form>
  );
}
