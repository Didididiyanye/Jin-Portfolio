"use client";

import { useLanguage } from "@/lib/i18n";
import styles from "./navbar.module.css";

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, toggleLanguage } = useLanguage();
  const label = language === "en" ? "切换至中文" : "Switch to English";

  return (
    <button
      type="button"
      className={`${styles.languageToggle} ${compact ? styles.languageToggleCompact : ""}`}
      onClick={toggleLanguage}
      aria-label={label}
      title={label}
    >
      <span lang="en" data-active={language === "en" || undefined}>EN</span>
      <span lang="zh-CN" data-active={language === "zh" || undefined}>中文</span>
    </button>
  );
}
