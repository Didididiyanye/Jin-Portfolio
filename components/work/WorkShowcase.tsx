"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { ProjectSwitcher } from "@/components/work/ProjectSwitcher";
import { PetlyInterfaceCardPreview, PetlyProductCardPreview } from "@/components/work/PetlyProductCardPreview";
import styles from "./work-showcase.module.css";

const initialIndex = Math.max(0, projects.findIndex((project) => project.slug === "hape"));

export function WorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const reduceMotion = useReducedMotion();
  const active: Project | undefined = projects[activeIndex];

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + projects.length) % projects.length);
  };

  if (!active) return null;

  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <p className="mono-label">Work index / 2022-2026</p>
        <h1 className={styles.mastheadStatement}>
          Six projects, shown one at a time.
        </h1>
        <p className={styles.mastheadNote}>
          Open a project to inspect its page design, interaction or available evidence.
        </p>
      </header>

      <section className={`${styles.focusSurface} tone-${active.tone}`} aria-labelledby="active-project-title">
        <div className={styles.topline}>
          <span className="mono-label">Project focus / {active.index} of 06</span>
          <span className={styles.availability}>{active.available ? "Case study available" : "Case study in progress"}</span>
        </div>

        <div className={styles.main}>
          <div className={styles.info}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={styles.category}>{active.category}</p>
                <h2 id="active-project-title" className={styles.title}>{active.title}</h2>
                <p className={styles.subtitle}>{active.subtitle}</p>
                <p className={styles.description}>{active.description}</p>

                <dl className={styles.facts}>
                  <div><dt>Discipline</dt><dd>{active.discipline}</dd></div>
                  <div><dt>Evidence</dt><dd>{active.evidence}</dd></div>
                  <div><dt>Status</dt><dd>{active.available ? "Available" : "In progress"}</dd></div>
                </dl>

                {active.available ? (
                  <Link
                    href={active.externalHref ?? active.href}
                    target={active.externalHref ? "_blank" : undefined}
                    rel={active.externalHref ? "noopener noreferrer" : undefined}
                    className={styles.openLink}
                  >
                    <span>{active.externalHref ? "Open the live project" : "Open the case study"}</span>
                    <span className={styles.openIcon}><ArrowUpRight className={styles.arrow} /></span>
                  </Link>
                ) : (
                  <p className={styles.pending}>
                    This case is still being edited. The chapter will be added once the
                    page sequence and supporting images are ready.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.stage}>
            <div className={styles.stageChrome}>
              <span>Project preview</span>
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
                  transition={{ duration: reduceMotion ? 0.01 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                >
                  {active.slug === "petly-product" ? <PetlyProductCardPreview /> : <PetlyInterfaceCardPreview />}
                </motion.div>
              ) : (
                <motion.figure
                  key={`${active.slug}-stage`}
                  className={`${styles.imageFrame} ${active.previewAspect === "portrait" ? styles.portraitMode : styles.landscapeMode}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.52, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={`${styles.imageMount} ${active.previewAspect === "portrait" ? styles.imageMountPortrait : styles.imageMountLandscape}`}>
                    <Image
                      key={active.heroImage}
                      src={active.heroImage}
                      alt={active.imageAlt}
                      fill
                      priority={active.slug === "hape"}
                      quality={95}
                      sizes="(min-width: 1000px) 58vw, 100vw"
                      className={`${styles.image} ${active.previewAspect === "portrait" ? styles.containImage : styles.coverImage}`}
                    />
                  </div>
                  <figcaption>
                    <span>{active.title} / {active.subtitle}</span>
                    <span>{active.evidence}</span>
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
      </section>

      <aside className={styles.indexNotes} aria-label="Work index notes">
        <div>
          <p className="mono-label">Reading note / 01</p>
          <p>HAPE is a brand website redesign completed during an internship. Micro World is an insect science website. PETLY Interface and PETLY Product are two separate app design projects.</p>
        </div>
        <div>
          <p className="mono-label">Evidence note / 02</p>
          <p>No user research or usability testing was conducted. PETLY Product includes a working clickable prototype. The other projects are page-design concepts.</p>
        </div>
        <div>
          <p className="mono-label">Navigate / 03</p>
          <p>Use the project switcher or arrow keys to move between projects. Open a project to view its full page set or, for PETLY Product, the clickable flow.</p>
        </div>
      </aside>
    </div>
  );
}



