"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { usePetlyPage } from "./PetlyPageContext";
import type { PetlyPage } from "./PetlyPageArchive";
import { useLanguage } from "@/lib/i18n";
import styles from "../petly-interface.module.css";

type PetlyGalleryProps = {
  pages: PetlyPage[];
};

export function PetlyGallery({ pages }: PetlyGalleryProps) {
  const { t } = useLanguage();
  const { activePageIndex, setActivePageIndex } = usePetlyPage();

  const openPage = (index: number) => {
    setActivePageIndex(index);
    window.requestAnimationFrame(() => {
      const viewer = document.getElementById("petly-page-viewer");
      const title = document.getElementById("petly-page-title");
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
          aria-label={`${t("Open")} ${page.name} ${t("in the complete route viewer")}`}
          aria-pressed={activePageIndex === index}
          onClick={() => openPage(index)}
        >
          <span className={styles.pageGalleryPreview}>
            <Image
              src={page.image.src}
              alt={`${page.name} ${t("PETLY mobile route preview")}`}
              fill
              quality={90}
              sizes="(min-width: 1000px) 22vw, (min-width: 640px) 44vw, 44vw"
              className={styles.pageGalleryImage}
            />
            <span className={styles.pageGalleryAction}>{t("Open screen")} <ArrowUpRight className={styles.pageGalleryArrow} /></span>
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
