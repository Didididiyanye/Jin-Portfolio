"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";
import { acquireBodyScrollLock } from "@/lib/body-scroll-lock";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import styles from "./reader-page.module.css";

export type ReaderPageKey = "works" | "about" | "approach" | "contact";

const readerLinks: Array<{ key: ReaderPageKey; label: string; href: string; index: string }> = [
  { key: "about", label: "About", href: "/about", index: "01" },
  { key: "works", label: "Works", href: "/?section=works", index: "02" },
  { key: "approach", label: "Approach", href: "/approach", index: "03" },
  { key: "contact", label: "Contact", href: "/contact", index: "04" },
];

type ReaderPageProps = {
  page: ReaderPageKey;
  index: string;
  label: string;
  kicker: string;
  title: ReactNode;
  lead: string;
  children: ReactNode;
  showHero?: boolean;
  mode?: "page" | "overlay";
  onBack?: () => void;
  onNavigate?: (page: ReaderPageKey) => void;
};

export function ReaderPage({
  page,
  index,
  label,
  kicker,
  title,
  lead,
  children,
  showHero = true,
  mode = "page",
  onBack,
  onNavigate,
}: ReaderPageProps) {
  const { language, t } = useLanguage();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isOverlay = mode === "overlay";

  useEffect(() => {
    const releaseBodyScrollLock = acquireBodyScrollLock();
    const scroller = scrollerRef.current;

    const updateProgress = () => {
      if (!scroller) return;
      const range = scroller.scrollHeight - scroller.clientHeight;
      setProgress(range <= 0 ? 1 : Math.min(1, scroller.scrollTop / range));
    };

    updateProgress();
    scroller?.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      releaseBodyScrollLock();
      scroller?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    setProgress(0);
    scrollerRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  const brandContent = (
    <>
      <span className={styles.brandMark}>JF</span>
      <span className={styles.brandName}>Jin Fanhao</span>
    </>
  );

  const backContent = <>{t("Back to monument")} <span aria-hidden="true">↖</span></>;

  return (
    <section className={styles.reader} data-page={page} data-reader-page={page} aria-labelledby="reader-title">
      <header className={styles.topbar}>
        {isOverlay && onBack ? (
          <button type="button" className={styles.brand} aria-label={t("Close reader and return to the monument")} onClick={onBack}>
            {brandContent}
          </button>
        ) : (
          <Link href="/" className={styles.brand} aria-label={t("Return to Jin Fanhao home")}>
            {brandContent}
          </Link>
        )}

        <div className={styles.identity}>
          <span>{label}</span>
          <span className={styles.identityIndex}>{index}</span>
        </div>

        <div className={styles.tools}>
          <nav className={styles.pageSwitcher} aria-label={t("Portfolio sections")}>
            {readerLinks.map((item) => {
              const content = (
                <>
                  <span>{item.index}</span>
                  {t(item.label)}
                </>
              );

              return isOverlay && onNavigate ? (
                <button
                  key={item.key}
                  type="button"
                  className={styles.pageLink}
                  aria-current={item.key === page ? "page" : undefined}
                  onClick={() => onNavigate(item.key)}
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={styles.pageLink}
                  aria-current={item.key === page ? "page" : undefined}
                >
                  {content}
                </Link>
              );
            })}
          </nav>
          <LanguageToggle compact />
          {isOverlay && onBack ? (
            <button type="button" className={styles.back} onClick={onBack}>
              {backContent}
            </button>
          ) : (
            <Link href="/" className={styles.back}>
              {backContent}
            </Link>
          )}
        </div>
      </header>

      <div ref={scrollerRef} className={styles.scroller} tabIndex={0} aria-label={language === "zh" ? `${t(label)}页面内容` : `${label} page content`}>
        <article className={styles.article}>
          {showHero ? (
            <header className={styles.hero}>
              <p className={styles.kicker}>{kicker}</p>
              <h1 id="reader-title" className={styles.title}>{title}</h1>
              <p className={styles.lead}>{lead}</p>
            </header>
          ) : (
            <h1 id="reader-title" className="sr-only">{title}</h1>
          )}

          {children}

          <footer className={styles.end}>
            <p>{t("Jin Fanhao / Visual UI, Product & Motion")}</p>
            {isOverlay && onBack ? (
              <button type="button" onClick={onBack}>
                {t("Return to the monument")} <span aria-hidden="true">↖</span>
              </button>
            ) : (
              <Link href="/">
                {t("Return to the monument")} <span aria-hidden="true">↖</span>
              </Link>
            )}
          </footer>
        </article>
      </div>

      <div className={styles.progressTrack} aria-hidden="true">
        <span className={styles.progressFill} style={{ transform: `scaleX(${progress})` }} />
      </div>
    </section>
  );
}

