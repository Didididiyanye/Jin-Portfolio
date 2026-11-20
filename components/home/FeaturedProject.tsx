"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { ProjectSwitcher } from "@/components/work/ProjectSwitcher";
import { PetlyInterfaceCardPreview, PetlyProductCardPreview } from "@/components/work/PetlyProductCardPreview";
import { useLanguage } from "@/lib/i18n";
import styles from "./featured-project.module.css";

const initialIndex = Math.max(0, projects.findIndex((project) => project.slug === "hape"));

export function FeaturedProject({ variant = "default" }: { variant?: "default" | "overlay" }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const reduceMotion = useReducedMotion();
  const active = projects[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  if (!active) return null;

  return (
    <section
      id="selected-work"
      className={`${styles.section} ${variant === "overlay" ? styles.overlaySection : ""}`}
      aria-labelledby="selected-work-title"
    >
      <div className={`${styles.surface} tone-${active.tone} ${variant === "overlay" ? styles.overlaySurface : ""}`}>
        <div className={styles.topline}>
          <p className="mono-label">{t("Selected work / single project focus")}</p>
          <p className="mono-label">{active.index} / 06</p>
        </div>

        <div className={styles.main}>
          <div className={styles.copy}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.48, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.categoryRow}>
                  <span>{t(active.category)}</span>
                  <span>{active.available ? t("Case study online") : t("Case study in development")}</span>
                </div>
                <h2 id="selected-work-title" className={styles.title}>{active.title}</h2>
                <p className={styles.subtitle}>{t(active.subtitle)}</p>
                <p className={styles.description}>{t(active.description)}</p>

                <dl className={styles.meta}>
                  <div><dt>{t("Discipline")}</dt><dd>{t(active.discipline)}</dd></div>
                  <div><dt>{t("Evidence")}</dt><dd>{t(active.evidence)}</dd></div>
                </dl>

                {active.available ? (
                  active.externalHref ? (
                    <a
                      href={active.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.caseLink}
                      aria-label={`${t("Open the")} ${active.title} ${t("live project")} · ${t("Opens in a new tab")}`}
                    >
                      <span>{t("Open the")} {active.title} {t("live project")}</span>
                      <span className={styles.caseLinkIcon}><ArrowUpRight className={styles.arrow} /></span>
                    </a>
                  ) : (
                    <Link href={active.href} className={styles.caseLink}>
                      <span>{t("Open the")} {active.title} {t("case study")}</span>
                      <span className={styles.caseLinkIcon}><ArrowUpRight className={styles.arrow} /></span>
                    </Link>
                  )
                ) : (
                  <p className={styles.progressNote}>{t("The full chapter is being prepared. Use the project switcher to preview the next direction.")}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.visual}>
            <div className={styles.visualChrome}>
              <span>{t("Project preview")}</span>
              <span>{active.index} / 06</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {active.slug === "petly-product" || active.slug === "petly-interface" ? (
                <motion.div
                  key={`petly-preview-${active.slug}`}
                  className={styles.cardPreviewWrap}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.slug === "petly-product" ? <PetlyProductCardPreview /> : <PetlyInterfaceCardPreview />}
                </motion.div>
              ) : (
                <motion.figure
                  key={`${active.slug}-image`}
                  className={`${styles.imageFrame} ${active.previewAspect === "portrait" ? styles.portraitMode : styles.landscapeMode}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`${styles.imageMount} ${active.previewAspect === "portrait" ? styles.imageMountPortrait : styles.imageMountLandscape}`}>
                    <Image
                      src={active.heroImage}
                      alt={active.imageAlt}
                      fill
                      priority={active.slug === "hape"}
                      quality={95}
                      sizes="(min-width: 1100px) 56vw, (min-width: 760px) 52vw, 100vw"
                      className={`${styles.image} ${active.previewAspect === "portrait" ? styles.containImage : styles.coverImage}`}
                    />
                  </div>
                  <figcaption className={styles.imageCaption}>
                    <span>{active.title} / {t(active.subtitle)}</span>
                    <span>{t(active.category)}</span>
                  </figcaption>
                </motion.figure>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className={styles.switcherWrap}>
          <ProjectSwitcher
            projects={projects}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            onPrevious={() => move(-1)}
            onNext={() => move(1)}
          />
        </div>
      </div>
    </section>
  );
}



