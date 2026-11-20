"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import styles from "./navbar.module.css";

type MenuItem = {
  index: string;
  label: string;
  detail: string;
  href: string;
  externalHref?: string;
};

const menuLinks: MenuItem[] = [
  { index: "01", label: "Home", detail: "Introduction and selected work", href: "/" },
  { index: "02", label: "Work", detail: "One project at a time", href: "/?section=works" },
  { index: "03", label: "HAPE", detail: "Open the first full case study", href: "/work/hape" },
  { index: "04", label: "Approach", detail: "Process and working principles", href: "/approach" },
  { index: "05", label: "About", detail: "Practice, background and point of view", href: "/about" },
  { index: "06", label: "Contact", detail: "Start a conversation", href: "/contact" },
  { index: "07", label: "Long-form", detail: "Read the scroll-based portfolio edition", href: "/longform" },
];


const caseSectionLinks = [
  { label: "About", href: "/?section=about" },
  { label: "Works", href: "/?section=works" },
  { label: "Approach", href: "/?section=approach" },
  { label: "Contact", href: "/?section=contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"day" | "night">("day");
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    const nextTheme = stored === "night" ? "night" : "day";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    document.body.dataset.menuOpen = "true";
    window.setTimeout(() => focusable?.[0]?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 20);
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      delete document.body.dataset.menuOpen;
      previousFocus?.focus();
    };
  }, [open]);

  const toggleTheme = () => {
    const nextTheme = theme === "day" ? "night" : "day";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  const isWork = pathname.startsWith("/work");
  const activeProject = projects.find((project) => pathname === project.href);
  const caseMenuLinks = activeProject
    ? projects
        .filter((project) => project.available && project.slug !== activeProject.slug)
        .map((project, index) => ({
          index: String(index + 1).padStart(2, "0"),
          label:
            project.slug === "petly-interface"
              ? "PETLY Interface"
              : project.slug === "petly-product"
                ? "PETLY Product"
                : project.title,
          detail: project.subtitle,
          href: project.href,
          externalHref: project.externalHref,
        }))
    : [];
  const linksForPage = activeProject ? caseMenuLinks : menuLinks;
  const menuCount = activeProject
    ? `01—${String(caseMenuLinks.length).padStart(2, "0")}`
    : "01—07";

  const renderMenuTrigger = (iconOnly = false) => (
    <button
      ref={triggerRef}
      type="button"
      className={`${styles.menuTrigger} ${iconOnly ? styles.menuTriggerIconOnly : ""}`}
      aria-label={open ? t("Close navigation") : t("Open navigation")}
      aria-expanded={open}
      aria-controls="portfolio-menu"
      onClick={() => setOpen((value) => !value)}
    >
      {!iconOnly ? <span className={styles.triggerLabel}>{open ? t("Close") : t("Index")}</span> : null}
      <span className={styles.triggerIcon} aria-hidden="true">
        <span className={open ? styles.lineTopOpen : styles.lineTop} />
        <span className={open ? styles.lineBottomOpen : styles.lineBottom} />
      </span>
    </button>
  );

  return (
    <>
      <header className={styles.header}>
        {activeProject ? (
          <>
            <Link href="/" className={styles.brand} aria-label={t("Back to Jin Fanhao homepage")}>
              <span className={styles.brandMark}>JF</span>
              <span className={styles.brandCopy}>
                <span>Jin Fanhao</span>
                <small>{t("Visual UI · Product · Motion")}</small>
              </span>
            </Link>

            <div className={styles.actions}>
              <nav className={styles.caseSwitch} aria-label={t("Portfolio sections")}>
                {caseSectionLinks.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {t(item.label)}
                  </Link>
                ))}
              </nav>
              <LanguageToggle />
              {renderMenuTrigger()}
            </div>
          </>
        ) : (
          <>
            <Link href="/" className={styles.brand} aria-label={t("Jin Fanhao, home")}>
              <span className={styles.brandMark}>JF</span>
              <span className={styles.brandCopy}>
                <span>Jin Fanhao</span>
                <small>{t("Visual UI · Product · Motion")}</small>
              </span>
            </Link>

            <div className={styles.actions}>
              <Link href="/?section=works" className={styles.workLink} aria-current={isWork ? "page" : undefined}>
                <span>{t("Selected work")}</span>
                <span className={styles.count}>06</span>
              </Link>
              <LanguageToggle />
              {pathname === "/" ? null : renderMenuTrigger()}
            </div>
          </>
        )}
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.28 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="portfolio-menu"
              ref={menuRef}
              className={styles.menu}
              role="dialog"
              aria-modal="true"
              aria-label={t("Portfolio navigation")}
              initial={reduceMotion ? false : { opacity: 0, x: 28, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.46, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.menuTop}>
                <div>
                  <p className="mono-label">{activeProject ? t("Case index") : t("Portfolio index")}</p>
                  <p className={styles.menuTitle}>{activeProject ? t("Explore another case.") : t("Navigate the work.")}</p>
                </div>
                <span className={styles.menuCount}>{menuCount}</span>
              </div>

              <nav aria-label={t("Menu links")}>
                <ul className={styles.menuList}>
                  {linksForPage.map((item) => {
                    const active = !item.externalHref && (
                      item.href === "/"
                        ? pathname === "/"
                        : item.href === "/work"
                          ? pathname.startsWith("/work")
                          : pathname.startsWith(item.href)
                    );
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.externalHref ?? item.href}
                          target={item.externalHref ? "_blank" : undefined}
                          rel={item.externalHref ? "noopener noreferrer" : undefined}
                          className={styles.menuLink}
                          onClick={() => setOpen(false)}
                        >
                          <span className={styles.menuIndex}>{item.index}</span>
                          <span className={styles.menuLinkCopy}>
                            <span className={styles.menuLabel} data-active={active || undefined}>
                              {t(item.label)}
                            </span>
                            <small>{t(item.detail)}</small>
                          </span>
                          <ArrowUpRight className={styles.menuArrow} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className={styles.menuFooter}>
                <button type="button" className={styles.themeToggle} onClick={toggleTheme}>
                  <span className={styles.themeDot} data-theme={theme} />
                  {theme === "day" ? t("Switch to night") : t("Switch to day")}
                </button>
                <a href={"mailto:" + site.email} className={styles.menuEmail}>
                  {site.email}
                  <ArrowUpRight className={styles.menuArrow} />
                </a>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

