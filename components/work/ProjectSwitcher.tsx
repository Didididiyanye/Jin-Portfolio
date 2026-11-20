"use client";

import { useRef, type KeyboardEvent } from "react";
import type { Project } from "@/lib/projects";
import { useLanguage } from "@/lib/i18n";
import styles from "./project-switcher.module.css";

type ProjectSwitcherProps = {
  projects: Project[];
  activeIndex: number;
  onChange: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ProjectSwitcher({
  projects,
  activeIndex,
  onChange,
  onPrevious,
  onNext,
}: ProjectSwitcherProps) {
  const { language, t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const active = projects[activeIndex];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const controls = Array.from(
      timelineRef.current?.querySelectorAll<HTMLButtonElement>("[data-project-control]") ?? []
    );
    const current = controls.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;

    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? controls.length - 1
          : event.key === "ArrowRight"
            ? (current + 1) % controls.length
            : (current - 1 + controls.length) % controls.length;

    controls[next]?.focus();
    controls[next]?.click();
  };

  if (!active) return null;

  return (
    <div className={styles.dock} aria-label={t("Project switcher")}>
      <div className={styles.current}>
        <span className={styles.currentIndex}>{active.index} / 06</span>
        <span className={styles.currentTitle}>{active.title}</span>
        <span className={styles.currentSubtitle}>{t(active.subtitle)}</span>
      </div>

      <div
        ref={timelineRef}
        className={styles.timeline}
        role="group"
        aria-label={t("Choose a project")}
        onKeyDown={onKeyDown}
      >
        <span className={styles.timelineLine} aria-hidden="true" />
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            data-project-control
            className={styles.node}
            aria-label={`${project.index} ${project.title}, ${t(project.subtitle)}`}
            title={`${project.title}: ${t(project.subtitle)}`}
            aria-pressed={index === activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => onChange(index)}
          >
            <span className={styles.nodeIndex}>{project.index}</span>
          </button>
        ))}
      </div>

      <div className={styles.arrows}>
        <button type="button" className={styles.arrow} onClick={onPrevious} aria-label={t("Previous project")}>
          ←
        </button>
        <button type="button" className={styles.arrow} onClick={onNext} aria-label={t("Next project")}>
          →
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {language === "zh" ? `当前项目：${active.title}，${t(active.subtitle)}。` : `Current project: ${active.title}, ${t(active.subtitle)}.`}
      </p>
    </div>
  );
}

