import type { CSSProperties, ReactNode } from "react";
import { extras } from "@/content/site";
import { Icon, type IconName } from "../Icon";
import { ReportWindow } from "../hero/HeroPanels";
import styles from "./Bento.module.css";

const v = (o: Record<string, string | number>) => o as CSSProperties;

function Card({
  icon,
  title,
  text,
  wide,
  tag,
  children,
  delay = 0,
}: {
  icon: IconName;
  title: string;
  text: string;
  wide?: boolean;
  tag?: string;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <article className={styles.card} data-wide={wide || undefined} data-reveal style={v({ "--d": `${delay}ms` })}>
      <div className={styles.visual}>{children}</div>
      <div className={styles.text}>
        <h3>
          <Icon name={icon} size={17} /> {title}
          {tag && <span className={styles.tag}>{tag}</span>}
        </h3>
        <p>{text}</p>
      </div>
    </article>
  );
}

function OcrVisual() {
  return (
    <div className={styles.ocr}>
      <div className={styles.board}>
        <span className={styles.boardTitle}>Sprint 42</span>
        <p>Ship v2 on Friday</p>
        <p>Fix onboarding flow</p>
        <p>Book the Halcyon demo</p>
        <span className={styles.scan} />
        <span className={styles.ocrSel} />
      </div>
      <div className={styles.ocrOut}>
        <span className={styles.ocrHead}>
          <Icon name="copy" size={13} /> Copied text
        </span>
        <code>
          <span>Sprint 42</span>
          <span>Ship v2 on Friday</span>
          <span>Fix onboarding flow</span>
          <span>Book the Halcyon demo</span>
        </code>
      </div>
    </div>
  );
}

function RedactVisual() {
  const rows: [IconName, string][] = [
    ["mail", "maya@northwind.co"],
    ["lock", "sk_live_51Hx9aQfQ2c"],
    ["keyboard", "+1 (415) 555-0132"],
    ["shield", "4242 4242 4242 4242"],
  ];
  return (
    <div className={styles.redact}>
      {rows.map(([icon, text], i) => (
        <div key={text} className={styles.secret} style={v({ "--i": i })}>
          <Icon name={icon} size={14} />
          <span>{text}</span>
          <i className={styles.mosaic} />
        </div>
      ))}
      <span className={styles.aiBadge}>
        <Icon name="sparkles" size={13} /> 4 secrets hidden
      </span>
    </div>
  );
}

function PinVisual() {
  return (
    <div className={styles.pin}>
      <div className={styles.doc}>
        {Array.from({ length: 7 }, (_, i) => (
          <i key={i} style={v({ width: `${[92, 70, 84, 40, 88, 64, 76][i]}%` })} />
        ))}
      </div>
      <div className={styles.pinned}>
        <span className={styles.pinIcon}>
          <Icon name="pin" size={13} />
        </span>
        <svg viewBox="0 0 120 50" preserveAspectRatio="none">
          <path d="M0 42 20 34 40 37 60 22 80 26 100 10 120 14V50H0Z" fill="#e4e1ff" />
          <path d="M0 42 20 34 40 37 60 22 80 26 100 10 120 14" fill="none" stroke="#6b6cff" strokeWidth="2" />
        </svg>
        <div className={styles.opacity}>
          <span>Opacity</span>
          <i>
            <b />
          </i>
        </div>
      </div>
    </div>
  );
}

function BackgroundsVisual() {
  return (
    <div className={styles.bg}>
      <div className={styles.bgCanvas}>
        <span className={styles.bgLayers} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <div className={styles.bgShot}>
          <ReportWindow className={styles.bgWin} />
        </div>
      </div>
      <div className={styles.bgPanel}>
        <span className={styles.bgLabel}>Background</span>
        <div className={styles.bgSwatches}>
          {[0, 1, 2, 3].map((i) => (
            <i key={i} style={v({ "--i": i })} />
          ))}
        </div>
        {["Padding", "Shadow", "Corners"].map((l, i) => (
          <div key={l} className={styles.slider}>
            <span>{l}</span>
            <i style={v({ "--w": `${[64, 48, 72][i]}%` })} />
          </div>
        ))}
        <span className={styles.ratio}>16 : 9 · Social</span>
      </div>
    </div>
  );
}

function HistoryVisual() {
  return (
    <div className={styles.history}>
      <span className={styles.search}>
        <Icon name="search" size={13} /> invoice
      </span>
      <div className={styles.thumbs}>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} data-match={i === 1 || i === 4 ? "" : undefined} style={v({ "--i": i })} />
        ))}
      </div>
    </div>
  );
}

function CloudVisual() {
  return (
    <div className={styles.cloud}>
      <div className={styles.cloudLink}>
        <Icon name="link" size={14} />
        <span>shots.northwind.co/k29fA</span>
      </div>
      <div className={styles.cloudStats}>
        <div>
          <b>128</b>
          <span>views</span>
        </div>
        <div>
          <b>7d</b>
          <span>expires</span>
        </div>
        <div>
          <Icon name="lock" size={15} />
          <span>protected</span>
        </div>
      </div>
    </div>
  );
}

function DesktopVisual() {
  return (
    <div className={styles.desk}>
      <div className={styles.icons}>
        {(["folder", "image", "folder", "image", "video", "folder"] as IconName[]).map((n, i) => (
          <span key={i} style={v({ "--i": i })}>
            <Icon name={n} size={18} />
          </span>
        ))}
      </div>
      <span className={styles.toggle}>
        <i /> Hide desktop icons
      </span>
    </div>
  );
}

export function Bento() {
  return (
    <section className="section" id="more">
      <div className="container">
        <header className={styles.head}>
          <h2 className="h2" data-reveal>
            A hundred little things,
            <br />
            <em>done right.</em>
          </h2>
          <p className="lead" data-reveal style={v({ "--d": "80ms" })}>
            The details you only notice when they&rsquo;re missing — and a few you&rsquo;ve never had before.
          </p>
        </header>

        <div className={styles.grid}>
          <Card
            wide
            icon="ocr"
            title="Text recognition"
            text="Copy text from any pixel — images, videos, PDFs, even other screenshots. On-device, in 30+ languages."
          >
            <OcrVisual />
          </Card>
          <Card
            icon="sparkles"
            title="Smart Redact"
            tag="AI"
            text="Emails, keys and card numbers are found and blurred before you ever hit share."
            delay={80}
          >
            <RedactVisual />
          </Card>
          <Card icon="pin" title="Pin to screen" text="Float any capture above every window. Perfect for reference." >
            <PinVisual />
          </Card>
          <Card
            wide
            icon="palette"
            title="Beautiful backgrounds"
            text="Drop any screenshot on a painted backdrop with padding, shadow and rounded corners — ready for socials and docs."
            delay={80}
          >
            <BackgroundsVisual />
          </Card>
          <Card icon="history" title="Capture history" text="Every shot, searchable for 30 days — even the ones you forgot to save.">
            <HistoryVisual />
          </Card>
          <Card icon="cloud" title="Instant cloud links" text="Links on your own domain, with passwords, expiry and view counts." delay={80}>
            <CloudVisual />
          </Card>
          <Card icon="eyeOff" title="Clean desktop" text="Hide icons and notifications in one click for spotless shots." delay={160}>
            <DesktopVisual />
          </Card>
        </div>

        <div className={styles.extras} data-reveal>
          <span className={styles.extrasLabel}>Plus</span>
          {extras.map((e) => (
            <span key={e} className={styles.chip}>
              {e}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
