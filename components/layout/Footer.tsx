"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { GmailIcon, QqMailIcon } from "@/components/ui/MailBrandIcons";
import { useLanguage } from "@/lib/i18n";
import styles from "./footer.module.css";

type StampTone = "hape" | "micro-world" | "petly" | "y2k";

const stampTones: Partial<Record<string, StampTone>> = {
  "/work/hape": "hape",
  "/work/micro-world": "micro-world",
  "/work/petly-interface": "petly",
  "/work/petly-product": "petly",
  "/work/y2k": "y2k",
};

function CaseStampLinks({ label, tone }: { label: string; tone: StampTone }) {
  return (
    <div className={styles.caseStampContactBlock} data-tone={tone}>
      <p className={styles.caseStampLabel}>{label}</p>
      <div className={styles.caseStampGrid}>
        <a
          href={`mailto:${site.email}`}
          className={`${styles.caseStamp} ${styles.caseStampQq}`}
          aria-label={`QQ Mail: ${site.email}`}
          title={`QQ Mail · ${site.email}`}
        >
          <span className={styles.caseStampPostmark} aria-hidden="true">01</span>
          <span className={styles.caseStampIcon}><QqMailIcon /></span>
          <span className={styles.caseStampCopy}>
            <strong>QQ Mail</strong>
            <small>{site.email}</small>
          </span>
        </a>
        <a
          href={`mailto:${site.alternativeEmail}`}
          className={`${styles.caseStamp} ${styles.caseStampGmail}`}
          aria-label={`Gmail: ${site.alternativeEmail}`}
          title={`Gmail · ${site.alternativeEmail}`}
        >
          <span className={styles.caseStampPostmark} aria-hidden="true">02</span>
          <span className={styles.caseStampIcon}><GmailIcon /></span>
          <span className={styles.caseStampCopy}>
            <strong>Gmail</strong>
            <small>{site.alternativeEmail}</small>
          </span>
        </a>
      </div>
    </div>
  );
}

export function Footer() {
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const stampTone = stampTones[pathname];
  const showContactHeading = language !== "zh" || Boolean(stampTone);
  const compactFooter = language === "zh" && !stampTone ? "true" : undefined;

  return (
    <footer id="contact" className={styles.wrap}>
      <div className={styles.footer}>
        <div className={styles.topline}>
          <p className="mono-label">{t("Contact / 2026")}</p>
          <p className="mono-label">{t("Open to product, interface and motion conversations")}</p>
        </div>

        <div className={styles.main} data-compact={compactFooter}>
          {showContactHeading ? (
            <div>
              <p className={styles.kicker}>{t("Have a project in mind?")}</p>
              <h2 className={`${styles.title} ${stampTone ? styles.caseContactTitle : ""}`}>
                Let&apos;s make it
                <span className={styles.accent}> memorable.</span>
              </h2>
            </div>
          ) : null}
          {stampTone ? (
            <CaseStampLinks label={t("Email me")} tone={stampTone} />
          ) : (
            <a href={`mailto:${site.email}`} className={styles.email}>
              <span>{site.email}</span>
              <span className={styles.emailIcon}>
                <ArrowUpRight className={styles.arrow} />
              </span>
            </a>
          )}
        </div>

        <div className={styles.bottom}>
          <p>{t("Jin Fanhao / Visual UI, Product & Creative Designer")}</p>
          <nav aria-label={t("Footer navigation")}>
            <Link href="/">{t("Home")}</Link>
            <Link href="/?section=works">{t("Work")}</Link>
            <Link href="/work/hape">HAPE</Link>
            <Link href="/approach">{t("Approach")}</Link>
            <Link href="/about">{t("About")}</Link>
            <Link href="/contact">{t("Contact")}</Link>
            <Link href="/longform">{t("Long-form")}</Link>
          </nav>
          <p>{t("Independent portfolio / 2022—2026")}</p>
        </div>
      </div>
    </footer>
  );
}