import type { CSSProperties } from "react";
import { Icon, type IconName } from "../Icon";
import { Landscape } from "../landscape/Landscape";
import { Playground } from "./Playground";
import styles from "./AnnotateSection.module.css";

const points: { icon: IconName; title: string; text: string }[] = [
  { icon: "toolArrow", title: "Arrows & shapes", text: "Tapered, shadowed and always crisp." },
  { icon: "toolBlur", title: "A blur that hides", text: "Pixelate secrets beyond recovery." },
  { icon: "toolCounter", title: "Step counters", text: "Number every step of a how-to." },
  { icon: "toolSpotlight", title: "Spotlight & crop", text: "Focus the eye where it matters." },
];

export function AnnotateSection() {
  return (
    <section className="section" id="annotate">
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow" data-reveal>
            <Icon name="pencil" /> Annotate
          </span>
          <h2 className="h2" data-reveal style={{ "--d": "60ms" } as CSSProperties}>
            Say more with <em>less.</em>
          </h2>
          <p className="lead" data-reveal style={{ "--d": "120ms" } as CSSProperties}>
            Arrows, shapes, counters, highlights and a blur that really hides things. Go on — pick a tool and draw on
            the screenshot below.
          </p>
        </header>

        <div className={`${styles.card} grain`} data-reveal="scale">
          <Landscape scene="mist" />
          <Playground />
        </div>

        <ul className={styles.points}>
          {points.map((p, i) => (
            <li key={p.title} data-reveal style={{ "--d": `${i * 70}ms` } as CSSProperties}>
              <Icon name={p.icon} size={20} />
              <b>{p.title}</b>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
