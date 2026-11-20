"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ReaderExperience } from "@/components/secondary/ReaderExperience";
import type { ReaderPageKey } from "@/components/secondary/ReaderPage";
import { useLanguage } from "@/lib/i18n";
import { acquireBodyScrollLock } from "@/lib/body-scroll-lock";
import styles from "./monument-hero.module.css";

function SceneLoading() {
  const { t } = useLanguage();
  return <div className={styles.loading}>{t("Building the monument...")}</div>;
}

const MonumentScene = dynamic(
  () => import("./MonumentScene").then((module) => module.MonumentScene),
  { ssr: false, loading: () => <SceneLoading /> }
);

type SectionId = "about" | "works" | "approach" | "contact";

function updateReaderUrl(page: ReaderPageKey | null) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (page) url.searchParams.set("section", page);
  else url.searchParams.delete("section");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
}

export function HomeHero() {
  const { t } = useLanguage();
  const [activePage, setActivePage] = useState<ReaderPageKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [loaderExiting, setLoaderExiting] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const requested = new URLSearchParams(window.location.search).get("section");
    if (requested === "about" || requested === "works" || requested === "approach" || requested === "contact") {
      setActivePage(requested);
    }
  }, []);

  useEffect(() => {
    if (!sceneReady) return;

    const holdTimer = window.setTimeout(() => setLoaderExiting(true), 260);
    return () => window.clearTimeout(holdTimer);
  }, [sceneReady]);

  useEffect(() => {
    if (!loaderExiting) return;

    const hideTimer = window.setTimeout(() => setLoaderVisible(false), 560);
    const fallbackTimer = window.setTimeout(() => setLoaderExiting(true), 8000);
    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [loaderExiting]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => setLoaderExiting(true), 8000);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!loaderVisible) return;
    return acquireBodyScrollLock();
  }, [loaderVisible]);

  useEffect(() => {
    if (!activePage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePage(null);
        updateReaderUrl(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activePage]);

  const selectSection = (id: SectionId) => {
    setActivePage(id);
    updateReaderUrl(id);
  };

  const closeReader = () => {
    setActivePage(null);
    updateReaderUrl(null);
  };

  const navigateReader = (page: ReaderPageKey) => {
    setActivePage(page);
    updateReaderUrl(page);
  };

  return (
    <>
      {loaderVisible ? (
        <div
          className={`${styles.loader} ${loaderExiting ? styles.loaderExiting : ""}`}
          data-ready={sceneReady || undefined}
          role="status"
          aria-live="polite"
          aria-label={t("Loading portfolio")}
        >
          <div className={styles.loaderTop}>
            <div className={styles.loaderIdentity}>
              <span className={styles.loaderBrandMark}>JF</span>
              <span className={styles.loaderBrandText}>
                <strong>Jin Fanhao</strong>
                <small>{t("Visual UI · Product · Motion")}</small>
              </span>
            </div>
            <span className={styles.loaderTopMeta}>{t("Independent portfolio / 2022—2026")}</span>
          </div>

          <div className={styles.loaderCenter}>
            <div className={styles.loaderStage}>
              <div className={styles.loaderMonument} aria-hidden="true">
                <div className={styles.loaderModule}>
                  <span className={`${styles.loaderBlock} ${styles.loaderBlockAbout}`} />
                </div>
                <div className={styles.loaderModule}>
                  <span className={`${styles.loaderBlock} ${styles.loaderBlockWorks}`} />
                </div>
                <div className={styles.loaderModule}>
                  <span className={`${styles.loaderBlock} ${styles.loaderBlockApproach}`} />
                </div>
                <div className={styles.loaderModule}>
                  <span className={`${styles.loaderBlock} ${styles.loaderBlockContact}`} />
                </div>
              </div>
              <div className={styles.loaderCopy}>
                <p className={styles.loaderKicker}>PORTFOLIO LOADER / 01—04</p>
              </div>
            </div>
          </div>

          <div className={styles.loaderFooter}>
            <div className={styles.loaderProgress} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>{sceneReady ? t("Scene ready") : t("Loading scene")}</p>
          </div>
        </div>
      ) : null}

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.metaRow}>
          <p className="mono-label">{t("Independent portfolio / 2022—2026")}</p>
          <p className="mono-label">{t("Visual UI · Product · Motion")}</p>
        </div>

        <header className={styles.heading}>
          <h1 id="home-title" className="sr-only">
            {t("Jin Fanhao — Visual UI, Product and Motion Designer")}
          </h1>
        </header>

        <div className={styles.canvasWrap} data-ready={sceneReady || undefined}>
          <MonumentScene onSelect={selectSection} onReady={() => setSceneReady(true)} />
        </div>

        <div className={styles.dock}>
          <p className={styles.sceneHint}>
            <span>{t("Select a module to enter a chapter")}</span>
            <span className={styles.sceneHintArrow} aria-hidden="true">↑</span>
          </p>
        </div>
      </section>

      {mounted && activePage
        ? createPortal(
            <ReaderExperience
              page={activePage}
              mode="overlay"
              onClose={closeReader}
              onNavigate={navigateReader}
            />,
            document.body
          )
        : null}
    </>
  );
}
