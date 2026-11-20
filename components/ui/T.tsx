"use client";

import { useLanguage } from "@/lib/i18n";

export function T({ text }: { text: string }) {
  const { t } = useLanguage();
  return <>{t(text)}</>;
}
