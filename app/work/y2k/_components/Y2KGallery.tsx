"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useY2KPage } from "./Y2KPageContext";
import type { Y2KPage } from "./Y2KPageArchive";
import { useLanguage } from "@/lib/i18n";
import styles from "../y2k.module.css";

type Y2KGalleryProps = {
  pages: Y2KPage[];
};

export function Y2KGallery({ pages }: Y2KGalleryProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = useY2KPage();

  const openPage = (index: number) => {
    setActivePageIndex(index);
    window.requestAnimationFrame(() => {
      const viewer = document.getElementById("y2k-page-viewer");
      const title = document.getElementById("y2k-page-title");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      viewer?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => title?.focus({ preventScroll: true }), reduceMotion ? 0 : 420);
    });
  };

  return (
    <div className={styles.pageGallery}>
      {pages.map((page, index) => {
        const isShortPage = index >= pages.length - 2;

        return (
        <button
          key={page.id}
          type="button"
          className={`${styles.pageGalleryCard}${isShortPage ? ` ${styles.pageGalleryCardShort}` : ""}`}
          aria-label={`${t("Open")} ${page.name} ${t("in the complete page viewer")}`}
          aria-pressed={activePageIndex === index}
          onClick={() => openPage(index)}
        >
          <span
            className={styles.pageGalleryPreview}
            style={isShortPage ? { aspectRatio: `${page.image.width} / ${page.image.height}` } : undefined}
          >
            <Image
              src={page.image.src}
              alt={`${page.name} ${t("complete Y2K page preview")}`}
              fill
              quality={90}
              sizes="(min-width: 1000px) 24vw, (min-width: 640px) 46vw, 46vw"
              className={styles.pageGalleryImage}
            />
            <span className={styles.pageGalleryAction}>{t("Open page")} <ArrowUpRight className={styles.pageGalleryArrow} /></span>
          </span>
          <span className={styles.pageGalleryMeta}>
            <span className={styles.pageGalleryIndex}>{page.index}</span>
            <span className={styles.pageGalleryName}>{page.label}</span>
            <span className={styles.pageGallerySections}>{page.path.length} {t("steps")}</span>
          </span>
        </button>
        );
      })}
    </div>
  );
}
