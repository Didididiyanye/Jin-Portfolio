"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useMicroWorldPage } from "./MicroWorldPageContext";
import type { MicroWorldPage } from "./MicroWorldBrowser";
import { useLanguage } from "@/lib/i18n";
import styles from "../micro-world.module.css";

type MicroWorldGalleryProps = {
  pages: MicroWorldPage[];
};

export function MicroWorldGallery({ pages }: MicroWorldGalleryProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = useMicroWorldPage();

  const openPage = (index: number) => {
    setActivePageIndex(index);
    window.requestAnimationFrame(() => {
      const viewer = document.getElementById("micro-page-viewer");
      const title = document.getElementById("micro-page-title");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      viewer?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => title?.focus({ preventScroll: true }), reduceMotion ? 0 : 420);
    });
  };

  return (
    <div className={styles.pageGallery}>
      {pages.map((page, index) => (
        <button
          key={page.id}
          type="button"
          className={styles.pageGalleryCard}
          aria-label={`${t("Open")} ${page.name} ${t("in the complete page viewer")}`}
          aria-pressed={activePageIndex === index}
          onClick={() => openPage(index)}
        >
          <span className={styles.pageGalleryPreview}>
            <Image
              src={page.image.src}
              alt={`${page.name} ${t("complete Micro World page preview")}`}
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
      ))}
    </div>
  );
}
