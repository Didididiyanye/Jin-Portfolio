"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import styles from "../petly-interface.module.css";
import { usePetlyPage } from "./PetlyPageContext";
import { useLanguage } from "@/lib/i18n";

export type PetlyPage = {
  id: string;
  index: string;
  label: string;
  name: string;
  summary: string;
  note: string;
  sourceNode: string;
  modules: string[];
  path: string[];
  image: {
    src: string;
    width: number;
    height: number;
  };
};

type PetlyPageArchiveProps = {
  pages: PetlyPage[];
};

const palette = [
  { name: "Stage", value: "#F1F6F0", color: "#F1F6F0" },
  { name: "Paper", value: "#FFFFFF", color: "#FFFFFF" },
  { name: "PETLY green", value: "#2F7559", color: "#2F7559" },
  { name: "Deep green", value: "#1D5B48", color: "#1D5B48" },
  { name: "Care soft", value: "#E0F3E8", color: "#E0F3E8" },
  { name: "Data sand", value: "#C4954E", color: "#C4954E" },
];

const patterns = ["Pet context", "Shared schedule", "Care timeline", "Status pill"];

export function PetlyPageArchive({ pages }: PetlyPageArchiveProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = usePetlyPage();
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerTitleRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const activePage = pages[activePageIndex];

  function preloadPage(index: number) {
    if (typeof window === "undefined") return;
    const image = new window.Image();
    image.src = pages[index].image.src;
  }

  function selectPage(index: number) {
    setActivePageIndex(index);
    window.requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      viewerRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      viewerTitleRef.current?.focus({ preventScroll: true });
    });
  }

  function handlePageKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-page-control]")
    );
    const current = controls.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;

    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? controls.length - 1
          : event.key === "ArrowRight" || event.key === "ArrowDown"
            ? (current + 1) % controls.length
            : (current - 1 + controls.length) % controls.length;

    controls[next]?.focus();
    controls[next]?.click();
  }

  if (!activePage) return null;

  return (
    <div className={styles.browser}>
      <div id="petly-page-viewer" ref={viewerRef} className={styles.designViewer}>
        <section className={styles.pageRail} aria-label={t("PETLY page switcher")}>
          <div className={styles.railTopline}>
            <span>{t("Screens")}</span>
            <span>{activePage.index} / {String(pages.length).padStart(2, "0")}</span>
          </div>
          <div className={styles.pageButtons} onKeyDown={handlePageKeyDown}>
            {pages.map((page, index) => (
              <button
                key={page.id}
                type="button"
                data-page-control="true"
                aria-label={`${page.index} ${page.name}`}
                aria-pressed={activePageIndex === index}
                tabIndex={activePageIndex === index ? 0 : -1}
                className={styles.pageButton}
                onClick={() => selectPage(index)}
                onPointerEnter={() => preloadPage(index)}
                onFocus={() => preloadPage(index)}
              >
                <span>{page.index}</span>
                <span>{page.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.viewer}>
          <header className={styles.viewerHeader}>
            <div>
              <p className={styles.viewerKicker}>{activePage.index} / {t("Mobile route")}</p>
              <h3
                id="petly-page-title"
                ref={viewerTitleRef}
                tabIndex={-1}
                className={styles.viewerTitle}
              >
                {activePage.name}
              </h3>
              <p className={styles.viewerSummary}>{t(activePage.summary)}</p>
            </div>
            <p className={styles.viewerSource}>
              {activePage.image.width} × {activePage.image.height}{t("px source")}
              <span>{activePage.sourceNode}</span>
            </p>
          </header>

          <AnimatePresence initial={false}>
            <motion.figure
              key={activePage.id}
              className={styles.viewerFigure}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.viewerFrame}>
                <Image
                  src={activePage.image.src}
                  alt={`${activePage.name} ${t("PETLY mobile screen")}`}
                  width={activePage.image.width}
                  height={activePage.image.height}
                  quality={95}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 520px"
                  className={styles.viewerImage}
                />
              </div>
              <figcaption className={styles.viewerCaption}>
                <span>{t("390px mobile source · full route captured without crop")}</span>
                <a href={activePage.image.src} target="_blank" rel="noreferrer">{t("Open full image")} ↗</a>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <aside className={styles.visualSidebar} aria-label={t("PETLY visual language, route notes and care path")}>
        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Visual language")}</p>
            <span>{palette.length} {t("colours")}</span>
          </div>
          <div className={styles.sidebarPalette}>
            {palette.map((color) => (
              <div key={color.value} className={styles.sidebarSwatchItem} title={t(color.name)}>
                <span className={styles.sidebarSwatch} style={{ backgroundColor: color.color }} />
                <span className={styles.sidebarSwatchLabel}>{t(color.name)}</span>
                <small>{color.value}</small>
              </div>
            ))}
          </div>

          <div className={styles.typeSample}>
            <div><span>Aa</span><p>{t("Instrument Sans / UI")}</p></div>
            <div><span className={styles.dataAa}>24:18</span><p>{t("Tabular / Data")}</p></div>
          </div>

          <dl className={styles.sidebarMetrics}>
            <div><dt>{t("Canvas")}</dt><dd>390</dd></div>
            <div><dt>{t("Gutter")}</dt><dd>20</dd></div>
            <div><dt>{t("Screens")}</dt><dd>10</dd></div>
          </dl>

          <div className={styles.spacingBlock}>
            <p className="mono-label">{t("Spacing scale")}</p>
            <div className={styles.spacingTokens} aria-label={t("Product spacing scale")}>
              <span style={{ width: "18%" }}>04</span>
              <span style={{ width: "30%" }}>08</span>
              <span style={{ width: "52%" }}>16</span>
              <span style={{ width: "76%" }}>24</span>
            </div>
          </div>

          <div className={styles.patternTags} aria-label={t("Repeated visual patterns")}>
            {patterns.map((pattern) => <span key={pattern}>{t(pattern)}</span>)}
          </div>
        </section>

        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Screen guide")}</p>
            <span>{activePage.label}</span>
          </div>
          <dl className={styles.pageNotes}>
            <div>
              <dt><span>01</span> {t("Purpose")}</dt>
              <dd>{t(activePage.summary)}</dd>
            </div>
            <div>
              <dt><span>02</span> {t("Content")}</dt>
              <dd>{activePage.modules.map((module) => t(module)).join(" · ")}</dd>
            </div>
            <div>
              <dt><span>03</span> {t("Design note")}</dt>
              <dd>{t(activePage.note)}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Page path")}</p>
            <span>{activePage.path.length} {t("steps")}</span>
          </div>
          <p className={styles.pathHint}>{t("The order follows the screen from entry state to its next action.")}</p>
          <ol className={styles.pagePath}>
            {activePage.path.map((step, index) => (
              <li key={step} className={styles.pathStep}>
                <span className={styles.pathNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.pathLabel}>{t(step)}</span>
              </li>
            ))}
          </ol>
          <p className={styles.sidebarEvidence}>{t("The Figma file has no prototype reactions. This viewer presents the screen designs and the page logic visible in the layouts.")}</p>
        </section>
      </aside>
    </div>
  );
}
