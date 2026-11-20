"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useLanguage } from "@/lib/i18n";
import styles from "./practice-about.module.css";

const principles = [
  {
    index: "01",
    title: "Structure first",
    copy: "Start with the information, the task and the context. Visual decisions should make the system easier to understand, not just more expressive.",
  },
  {
    index: "02",
    title: "Atmosphere with intent",
    copy: "Colour, type, material and motion are used to build a recognisable world around the work while preserving reading comfort.",
  },
  {
    index: "03",
    title: "Evidence over theatre",
    copy: "Finished screens, working interactions and technical checks are presented for what they are. Research and testing are never inferred.",
  },
];

const capabilities = [
  "Visual UI",
  "Product thinking",
  "Design systems",
  "Typography",
  "Motion direction",
  "Responsive behaviour",
  "Interaction prototyping",
  "Creative development",
];

export function PracticeAbout() {
  const { t } = useLanguage();
  return (
    <>
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <div className={styles.tickerGroup} key={copy}>
              <span>{t("Visual identity")}</span><i />
              <span>{t("Product systems")}</span><i />
              <span>{t("Editorial interfaces")}</span><i />
              <span>{t("Motion-led experiences")}</span><i />
              <span>{t("Responsive craft")}</span><i />
            </div>
          ))}
        </div>
      </div>

      <section id="approach" className={styles.practice} aria-labelledby="practice-title">
        <Reveal className={styles.practicePanel}>
          <header className={styles.sectionHeader}>
            <p className="mono-label">{t("Practice / How I work")}</p>
            <h2 id="practice-title" className={styles.sectionTitle}>{t("Three working principles.")}</h2>
            <p className={styles.sectionIntro}>{t("A flexible process for visual systems, digital products and motion-led experiences. Each project uses the parts it genuinely needs.")}</p>
          </header>
          <div className={styles.principles}>
            {principles.map((principle) => (
              <article key={principle.index} className={styles.principle}>
                <p className={styles.principleIndex}>{principle.index}</p>
                <h3>{t(principle.title)}</h3>
                <p>{t(principle.copy)}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="about" className={styles.aboutWrap} aria-labelledby="about-title">
        <Reveal className={`${styles.about} page-surface tone-mint`}>
          <div className={styles.aboutTopline}>
            <p className="mono-label">{t("About / Jin Fanhao")}</p>
            <p className="mono-label">{t("Independent designer / 2026")}</p>
          </div>

          <div className={styles.aboutMain}>
            <div>
              <p className={styles.aboutLabel}>{t("A practice between systems and expression")}</p>
              <h2 id="about-title" className={styles.aboutTitle}>
                {t("Structure, atmosphere and")} <em>{t("motion.")}</em>
              </h2>
            </div>

            <div className={styles.aboutCopy}>
              <p>{t("I'm Jin Fanhao, a visual UI, product and creative designer with a background in Art and Technology, 3D modelling and AI-assisted motion. I studied at Zhejiang Wanli University from 2022 to 2026.")}</p>
              <p>{t("My work connects interface systems, editorial composition and spatial thinking. I care about clear information architecture, reusable patterns, multilingual behaviour and the small details that make a digital product feel coherent.")}</p>
              <Link href="/?section=works" className={styles.aboutLink}>
                {t("Explore the work index")} <ArrowUpRight className={styles.arrow} />
              </Link>
            </div>
          </div>

          <div className={styles.aboutBottom}>
            <div className={styles.education}>
              <p className="mono-label">{t("Education / 2022—2026")}</p>
              <p className={styles.school}>{t("Zhejiang Wanli University")}</p>
              <p className={styles.degree}>{t("Art and Technology")}</p>
            </div>
            <div className={styles.capabilities}>
              <p className="mono-label">{t("Selected capabilities")}</p>
              <ul>
                {capabilities.map((capability) => (
                  <li key={capability}>{t(capability)}</li>
                ))}
              </ul>
            </div>
            <div className={styles.note}>
              <p className="mono-label">{t("Project boundary")}</p>
              <p>{t("All six projects were independently completed. HAPE began as an internship assignment and is presented as a concept proposal. Browser checks are technical evidence, not user testing.")}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

