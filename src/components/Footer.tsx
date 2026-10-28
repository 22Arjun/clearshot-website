import { footerLinks, site } from "@/content/site";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.subscribeTitle}>Subscribe</p>
          <p className={styles.subscribeText}>Product updates and capture tips, once a month. Never spam.</p>
          <Newsletter />
        </div>
        {footerLinks.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <p>{col.title}</p>
            {col.links.map((l) => (
              <a key={l} href="#">
                {l}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className={styles.word} aria-hidden="true">
        ClearShot<span>X</span>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span className={styles.legal}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">License</a>
        </span>
      </div>
    </footer>
  );
}
