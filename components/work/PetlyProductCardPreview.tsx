"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { useLanguage } from "@/lib/i18n";
import styles from "./petly-product-card.module.css";

type PreviewScreen = {
  src: string;
  alt: string;
  className: "phoneLeft" | "phoneCenter" | "phoneRight";
};

type PreviewConfig = {
  href: string;
  ariaLabel: string;
  eyebrow: string;
  meta: string;
  screens: readonly PreviewScreen[];
  badge: string;
  chips: readonly string[];
  cta: string;
};

const previews = {
  product: {
    href: "/work/petly-product",
    ariaLabel: "Open the PETLY app design and user flow case study",
    eyebrow: "App design / 05",
    meta: "CN / EN",
    screens: [
      { src: "/images/case-studies/petly-product/03-walks.webp", alt: "PETLY walk overview screen", className: "phoneLeft" },
      { src: "/images/projects/petly-product.jpg", alt: "PETLY home care overview", className: "phoneCenter" },
      { src: "/images/case-studies/petly-product/07-book-vet.webp", alt: "PETLY veterinary booking screen", className: "phoneRight" },
    ],
    badge: "Click to try",
    chips: ["Pet profiles", "Shared appointments", "Live walk"],
    cta: "Open app case",
  },
  interface: {
    href: "/work/petly-interface",
    ariaLabel: "Open the PETLY pet care app interface case study",
    eyebrow: "App design / 03",
    meta: "10 screens / Figma",
    screens: [
      { src: "/images/case-studies/petly-interface/02-pet-profile-2x.webp", alt: "PETLY pet profile screen", className: "phoneLeft" },
      { src: "/images/case-studies/petly-interface/01-home-2x.webp", alt: "PETLY home dashboard screen", className: "phoneCenter" },
      { src: "/images/case-studies/petly-interface/05-health-care-2x.webp", alt: "PETLY care screen", className: "phoneRight" },
    ],
    badge: "Click to open",
    chips: ["Home dashboard", "Pet profile", "Health directions"],
    cta: "Open interface case",
  },
} satisfies Record<string, PreviewConfig>;

function PetlyCardPreview({ variant }: { variant: keyof typeof previews }) {
  const { t } = useLanguage();
  const preview = previews[variant];

  return (
    <Link href={preview.href} className={`${styles.card} ${variant === "interface" ? styles.cardInterface : ""}`} aria-label={t(preview.ariaLabel)}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />
      <div className={styles.topline}><span>{t(preview.eyebrow)}</span><span>{preview.meta}</span></div>
      <div className={styles.phones} aria-hidden="true">
        {preview.screens.map((screen) => (
          <div key={screen.alt} className={`${styles.phone} ${styles[screen.className]}`}>
            <Image src={screen.src} alt="" fill quality={90} sizes="(min-width: 900px) 16vw, 28vw" className={styles.phoneImage} />
          </div>
        ))}
      </div>
      <div className={styles.tryBadge} aria-hidden="true"><span className={styles.pulse} />{t(preview.badge)}</div>
      <div className={styles.bottomline}>
        <div className={styles.chips}>{preview.chips.map((chip) => <span key={chip}>{t(chip)}</span>)}</div>
        <span className={styles.cta}>{t(preview.cta)} <ArrowUpRight className={styles.arrow} /></span>
      </div>
    </Link>
  );
}

export function PetlyProductCardPreview() { return <PetlyCardPreview variant="product" />; }
export function PetlyInterfaceCardPreview() { return <PetlyCardPreview variant="interface" />; }

