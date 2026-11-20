import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import styles from "./chapter-entry-plaque.module.css";

type ChapterEntryPlaqueProps = {
  index: string;
  tone: "hape" | "micro" | "petly" | "y2k";
  children: ReactNode;
  href?: string;
  external?: boolean;
};

function PlaqueContent({ index, children }: Pick<ChapterEntryPlaqueProps, "index" | "children">) {
  return (
    <>
      <span className={styles.copy}>
        <span className={styles.index}>{index}</span>
        <span className={styles.label}>{children}</span>
      </span>
      <span className={styles.icon} aria-hidden="true">
        <ArrowUpRight className={styles.arrow} />
      </span>
    </>
  );
}

export function ChapterEntryPlaque({ index, tone, children, href, external = false }: ChapterEntryPlaqueProps) {
  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={styles.plaque}
        data-tone={tone}
      >
        <PlaqueContent index={index}>{children}</PlaqueContent>
      </Link>
    );
  }

  return (
    <span className={styles.plaque} data-tone={tone}>
      <PlaqueContent index={index}>{children}</PlaqueContent>
    </span>
  );
}