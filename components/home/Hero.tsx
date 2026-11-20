"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useLanguage } from "@/lib/i18n";
import styles from "./home-hero.module.css";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className={styles.hero} aria-labelledby="longform-title">
      <div className={styles.metaRow}>
        <p className="mono-label">{t("Independent portfolio / 2022—2026")}</p>
        <p className="mono-label">{t("Visual UI · Product · Motion")}</p>
      </div>

      <div className={styles.copyGrid}>
        <div>
          <p className={styles.introLabel}>{t("Independent / Design portfolio")}</p>
          <h1 id="longform-title" className={styles.title}>
            {t("Designing clarity")} <span className={styles.accent}>{t("with character.")}</span>
          </h1>
        </div>

        <aside className={styles.statement}>
          <p className={styles.statementLabel}>{t("Design approach")}</p>
          <p className={styles.statementCopy}>{t("I'm a visual UI, product and creative designer shaping clear systems, tactile identities and motion with a reason to exist.")}</p>
          <Link href="#selected-work" className={styles.workCta}>
            <span>{t("Explore selected work")}</span>
            <ArrowUpRight className={styles.workArrow} />
          </Link>
        </aside>
      </div>

      <div className={styles.dock}>
        <div className={`${styles.roles} glass-chip`}>
          <span className={styles.statusDot} />
          <span>{site.roles.map((role) => t(role)).join(" / ")}</span>
        </div>
        <Link href="#selected-work" className={`${styles.scrollCue} glass-chip`}>
          <span>{t("Scroll to the project stage")}</span>
          <span className={styles.scrollArrow} aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
