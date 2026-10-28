"use client";

import { useEffect, useState } from "react";
import { navFeatures, site } from "@/content/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import styles from "./Nav.module.css";

const links = [
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled || open} data-open={open}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} aria-label={`${site.name} home`}>
          <Logo />
        </a>

        <nav className={styles.links} aria-label="Primary">
          <div className={styles.dropdown}>
            <button className={styles.link} aria-haspopup="true">
              Features <Icon name="chevronDown" size={14} />
            </button>
            <div className={styles.menu}>
              <div className={styles.menuGrid}>
                {navFeatures.map((f) => (
                  <a key={f.title} href={f.href} className={styles.menuItem}>
                    <span className={styles.menuIcon}>
                      <Icon name={f.icon} size={18} />
                    </span>
                    <span>
                      <strong>{f.title}</strong>
                      <span>{f.text}</span>
                    </span>
                  </a>
                ))}
              </div>
              <a href="#more" className={styles.menuFoot}>
                <span>
                  <span className={styles.badge}>New</span> Smart Redact blurs secrets before you share
                </span>
                <Icon name="arrowRight" size={15} />
              </a>
            </div>
          </div>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#login" className={styles.login}>
            Log in
          </a>
          <a href={site.downloadUrl} className="btn btn-dark btn-sm">
            Download free
          </a>
          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={styles.sheet} hidden={!open}>
        {[{ label: "Features", href: "#features" }, ...links].map((l) => (
          <a key={l.href} href={l.href} className={styles.sheetLink} onClick={() => setOpen(false)}>
            {l.label}
            <Icon name="arrowRight" size={18} />
          </a>
        ))}
        <a href={site.downloadUrl} className="btn btn-dark" onClick={() => setOpen(false)}>
          <Icon name="download" /> Download for Mac
        </a>
      </div>
    </header>
  );
}
