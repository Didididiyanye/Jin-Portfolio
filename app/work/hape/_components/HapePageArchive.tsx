"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import styles from "../hape.module.css";
import { useHapePage } from "./HapePageContext";
import { useLanguage } from "@/lib/i18n";

export type HapeArchiveSection = {
  index: string;
  name: string;
  src: string;
  width: number;
  height: number;
  start: number;
  end: number;
};

export type HapeArchivePage = {
  id: string;
  index: string;
  name: string;
  summary: string;
  src: string;
  width: number;
  height: number;
  node: string;
  sections: HapeArchiveSection[];
};

type HapePageArchiveProps = {
  pages: HapeArchivePage[];
};

const palette = [
  { name: "Ink", value: "#1C1C18", color: "#1C1C18" },
  { name: "Warm brown", value: "#5E3F3B", color: "#5E3F3B" },
  { name: "Brand red", value: "#B5000B", color: "#B5000B" },
  { name: "Blush", value: "#E9BCB6", color: "#E9BCB6" },
  { name: "Warm beige", value: "#F1EDE7", color: "#F1EDE7" },
  { name: "Warm white", value: "#FDF9F3", color: "#FDF9F3" },
  { name: "Soft paper", value: "#F7F3ED", color: "#F7F3ED" },
  { name: "Forest", value: "#1A3C34", color: "#1A3C34" },
];

type PageNote = {
  purpose: string;
  content: string;
  highlight: string;
};

const pageNotes: Record<string, PageNote> = {
  homepage: {
    purpose: "Introduce HAPE and provide routes into products, age groups and brand content.",
    content: "Hero image, play categories, age-based shopping, toy-making content, journal stories and newsletter sign-up.",
    highlight: "Shopping and brand content receive similar visual weight on the homepage.",
  },
  shop: {
    purpose: "Help shoppers find a toy when they do not know the product name.",
    content: "Entry points by play, age and developmental benefit, followed by featured products and carousels.",
    highlight: "All three browse routes lead into the same product catalogue.",
  },
  "learning-benefits": {
    purpose: "Explain the skills children practice through play.",
    content: "Motor, social, problem-solving and exploration skills, with toy examples.",
    highlight: "The page uses the same typography and imagery as the shop, so it still reads as part of the site.",
  },
  sustainability: {
    purpose: "Explain what HAPE makes toys from and how it approaches durability and safety.",
    content: "Material stories, designed-to-last examples, responsible design, nature imagery and brand history.",
    highlight: "Product examples and photographs carry most of the sustainability claims.",
  },
  "age-development": {
    purpose: "Help parents browse toys by age and developmental stage.",
    content: "Age groups, skill areas and product suggestions.",
    highlight: "The page explains why a toy may suit a child while keeping the path to purchase short.",
  },
  toys: {
    purpose: "Let visitors browse a large product range and narrow it down.",
    content: "Category introduction, filters, sorting and a product grid.",
    highlight: "Filters and sorting stay visible, while product photography keeps the category easy to scan.",
  },
  "product-detail": {
    purpose: "Give parents enough information to decide whether a toy suits their child.",
    content: "Gallery, play narrative, learning benefits, design notes, materials, specifications, FAQ, reviews and related products.",
    highlight: "The page answers practical questions in the order a shopper is likely to ask them.",
  },
  about: {
    purpose: "Introduce HAPE's team, learning approach and design values.",
    content: "Company beliefs, design team, six skills, design philosophy, research and the link between play and learning.",
    highlight: "The page returns to HAPE's central claim that play supports learning.",
  },
};

type PagePathStep = string;

const pagePaths: Record<string, PagePathStep[]> = {
  homepage: [
    "Hero",
    "Play categories",
    "Age-based shopping",
    "How toys are made",
    "Journal and newsletter",
  ],
  shop: [
    "Shop entry",
    "Browse by play",
    "Browse by age",
    "Browse by benefit",
    "Featured products",
  ],
  "learning-benefits": [
    "Introduction",
    "Skill areas",
    "Toy examples",
    "Next step",
  ],
  sustainability: [
    "Material story",
    "Product lifespan",
    "Responsible design",
    "Nature",
    "Brand history",
  ],
  "age-development": [
    "Choose age",
    "Stage overview",
    "Skills",
    "Product suggestions",
  ],
  toys: [
    "Category intro",
    "Filters",
    "Product grid",
    "Load more",
  ],
  "product-detail": [
    "Gallery",
    "How it plays",
    "Learning value",
    "Materials and specs",
    "FAQ and reviews",
    "Related products",
  ],
  about: [
    "Brand statement",
    "Design team",
    "Six skills",
    "Design approach",
    "Play and learning",
  ],
};

export function HapePageArchive({ pages }: HapePageArchiveProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = useHapePage();
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerTitleRef = useRef<HTMLHeadingElement>(null);
  const activePage = pages[activePageIndex];
  const activeNote = activePage ? pageNotes[activePage.id] : null;
  const pagePath = activePage ? pagePaths[activePage.id] ?? [] : [];

  const handlePageKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-page-control="true"]')
    );
    const current = controls.indexOf(document.activeElement as HTMLButtonElement);
    if (current < 0) return;
    event.preventDefault();
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? controls.length - 1
          : forward
            ? (current + 1) % controls.length
            : (current - 1 + controls.length) % controls.length;
    controls[next]?.focus();
    controls[next]?.click();
  };

  const selectPage = (index: number) => {
    setActivePageIndex(index);
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      viewerRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      viewerTitleRef.current?.focus({ preventScroll: true });
    });
  };

  if (!activePage) return null;

  return (
    <div className={styles.designBrowser}>
      <div id="hape-page-viewer" ref={viewerRef} className={styles.designViewer}>
        <section className={styles.pageSwitcher} aria-label={t("HAPE page switcher")}>
          <div className={styles.switcherTopline}>
            <p className="mono-label">{t("Pages / switch source")}</p>
            <p className={styles.switcherCount}>{activePage.index} / {String(pages.length).padStart(2, "0")}</p>
          </div>
          <div className={styles.pageControls} onKeyDown={handlePageKeyDown}>
            {pages.map((page, index) => (
              <button
                key={page.id}
                type="button"
                data-page-control="true"
                aria-pressed={activePageIndex === index}
                tabIndex={activePageIndex === index ? 0 : -1}
                className={styles.pageControl}
                onClick={() => selectPage(index)}
              >
                <span>{page.index}</span>
                <span>{page.name}</span>
              </button>
            ))}
          </div>
        </section>

        <div className={styles.viewerColumn}>
          <header className={styles.viewerHeader}>
            <div>
              <p className={styles.viewerKicker}>{activePage.index} / {t("Complete page")}</p>
              <h3 id="hape-page-title" ref={viewerTitleRef} tabIndex={-1} className={styles.viewerTitle}>{activePage.name}</h3>
              <p className={styles.viewerSummary}>{t(activePage.summary)}</p>
            </div>
            <p className={styles.viewerMeta}>{activePage.width} × {activePage.height}{t("px source")}</p>
          </header>

          <figure className={styles.viewerFigure}>
            <div className={styles.viewerFrame}>
              <Image
                src={activePage.src}
                alt={`${t("Complete")} ${activePage.name} ${t("HAPE website design page")}`}
                width={activePage.width}
                height={activePage.height}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 72vw, 700px"
                className={styles.viewerImage}
              />
            </div>
            <figcaption className={styles.viewerCaption}>{t("The full Figma page is shown at up to 700px CSS width with its original ratio, colour and crop.")}</figcaption>
          </figure>
        </div>
      </div>

      <aside className={styles.visualSidebar} aria-label={t("HAPE visual language, page notes and page path")}>
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
            <div><span>Aa</span><p>{t("Quicksand / Display")}</p></div>
            <div><span className={styles.readingAa}>Aa</span><p>{t("Source Sans 3 / Reading")}</p></div>
          </div>

          <dl className={styles.sidebarMetrics}>
            <div><dt>{t("Frame")}</dt><dd>1,280</dd></div>
            <div><dt>{t("Content")}</dt><dd>1,152</dd></div>
            <div><dt>{t("Gutter")}</dt><dd>64</dd></div>
          </dl>

          <div className={styles.spacingBlock}>
            <p className="mono-label">{t("Spacing scale")}</p>
            <div className={styles.spacingTokens} aria-label={t("Section spacing scale")}>
              <span style={{ width: "18%" }}>16</span>
              <span style={{ width: "30%" }}>32</span>
              <span style={{ width: "52%" }}>64</span>
              <span style={{ width: "76%" }}>96</span>
            </div>
          </div>
        </section>

        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Page guide")}</p>
            <span>{activePage.name}</span>
          </div>
          {activeNote ? (
            <dl className={styles.pageNotes}>
              <div>
                <dt><span>01</span> {t("Purpose")}</dt>
                <dd>{t(activeNote.purpose)}</dd>
              </div>
              <div>
                <dt><span>02</span> {t("Content")}</dt>
                <dd>{t(activeNote.content)}</dd>
              </div>
              <div>
                <dt><span>03</span> {t("Design note")}</dt>
                <dd>{t(activeNote.highlight)}</dd>
              </div>
            </dl>
          ) : null}
        </section>

        <section className={styles.sidebarBlock}>
          <div className={styles.sidebarHeading}>
            <p className="mono-label">{t("Page path")}</p>
            <span>{pagePath.length} {t("steps")}</span>
          </div>
          <p className={styles.pathHint}>{t("The order follows the page from top to bottom.")}</p>
          <ol className={styles.pagePath}>
            {pagePath.map((step, index) => (
              <li key={step} className={styles.pathStep}>
                <span className={styles.pathNode} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.pathLabel}>{t(step)}</span>
              </li>
            ))}
          </ol>
        </section>
      </aside>
    </div>
  );
}



