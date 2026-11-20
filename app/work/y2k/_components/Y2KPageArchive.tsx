"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, type KeyboardEvent } from "react";
import styles from "../y2k.module.css";
import { useY2KPage } from "./Y2KPageContext";
import { useLanguage } from "@/lib/i18n";

export type Y2KPage = {
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

type Y2KPageArchiveProps = {
  pages: Y2KPage[];
};

const palette = [
  { name: "Ink", value: "#1C1B1B", color: "#1C1B1B" },
  { name: "Slate", value: "#454558", color: "#454558" },
  { name: "Electric blue", value: "#0001BB", color: "#0001BB" },
  { name: "Magenta", value: "#AC2471", color: "#AC2471" },
  { name: "Acid lime", value: "#C3F400", color: "#C3F400" },
  { name: "Paper", value: "#FCF9F8", color: "#FCF9F8" },
];

const patterns = ["Window chrome", "Path label", "Status strip", "Archive card"];


export function Y2KPageArchive({ pages }: Y2KPageArchiveProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = useY2KPage();
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
      <div id="y2k-page-viewer" ref={viewerRef} className={styles.designViewer}>
        <section className={styles.pageRail} aria-label={t("Y2K page switcher")}>
          <div className={styles.railTopline}>
            <span>{t("Pages")}</span>
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
              <p className={styles.viewerKicker}>{activePage.index} / {t("Complete page")}</p>
              <h3
                id="y2k-page-title"
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
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.viewerFrame}>
                <Image
                  src={activePage.image.src}
                  alt={`${t("Complete")} ${activePage.name} ${t("Y2K design page")}`}
                  width={activePage.image.width}
                  height={activePage.image.height}
                  quality={95}
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 72vw, 700px"
                  className={styles.viewerImage}
                />
              </div>
              <figcaption className={styles.viewerCaption}>
                <span>{t("The full Figma page is shown at its original ratio with no crop or reconstruction.")}</span>
                <a href={activePage.image.src} target="_blank" rel="noreferrer">{t("Open full image")} ↗</a>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>

      <aside className={styles.visualSidebar} aria-label={t("Y2K visual language, page notes and page path")}>
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
            <div><span>Aa</span><p>{t("Display / Editorial")}</p></div>
            <div><span className={styles.readingAa}>Aa</span><p>{t("UI / Terminal")}</p></div>
          </div>

          <dl className={styles.sidebarMetrics}>
            <div><dt>{t("Canvas")}</dt><dd>1,280</dd></div>
            <div><dt>{t("Content")}</dt><dd>1,232</dd></div>
            <div><dt>{t("Gutter")}</dt><dd>24</dd></div>
          </dl>

          <div className={styles.spacingBlock}>
            <p className="mono-label">{t("Spacing scale")}</p>
            <div className={styles.spacingTokens} aria-label={t("Section spacing scale")}>
              <span style={{ width: "18%" }}>04</span>
              <span style={{ width: "30%" }}>12</span>
              <span style={{ width: "52%" }}>24</span>
              <span style={{ width: "76%" }}>48</span>
            </div>
          </div>

          <div className={styles.patternTags} aria-label={t("Repeated visual patterns")}>
            {patterns.map((pattern) => <span key={pattern}>{t(pattern)}</span>)}
          </div>
        </section>

        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Page guide")}</p>
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
          <p className={styles.pathHint}>{t("The order follows the page from entry to its final state.")}</p>
          <ol className={styles.pagePath}>
            {activePage.path.map((step, index) => (
              <li key={step} className={styles.pathStep}>
                <span className={styles.pathNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.pathLabel}>{t(step)}</span>
              </li>
            ))}
          </ol>
          <p className={styles.sidebarEvidence}>{t("The Figma file has no prototype reactions. This viewer presents the page designs and the navigation shown in the layouts.")}</p>
        </section>
      </aside>
    </div>
  );
}
