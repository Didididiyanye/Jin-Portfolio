"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "@/lib/projects";
import styles from "./case-study-backdrop.module.css";

gsap.registerPlugin(useGSAP);

const MonumentScene = dynamic(
  () => import("@/components/home/MonumentScene").then((module) => module.MonumentScene),
  { ssr: false }
);

const ignoreSelection = () => {};

export function CaseStudyBackdrop() {
  const pathname = usePathname();
  const isCaseStudy = projects.some((project) => project.href === pathname);
  const [canvasMounted, setCanvasMounted] = useState(isCaseStudy);
  const [canvasReady, setCanvasReady] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const canvasLayerRef = useRef<HTMLDivElement>(null);
  const previousCaseState = useRef(isCaseStudy);

  useEffect(() => {
    if (isCaseStudy) setCanvasMounted(true);
  }, [isCaseStudy]);

  useGSAP(
    () => {
      const backdrop = backdropRef.current;
      if (!backdrop) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wasCaseStudy = previousCaseState.current;
      gsap.killTweensOf(backdrop);

      if (isCaseStudy) {
        if (wasCaseStudy) {
          gsap.set(backdrop, { opacity: 1 });
        } else {
          gsap.fromTo(
            backdrop,
            { opacity: 0 },
            {
              opacity: 1,
              duration: reduceMotion ? 0.01 : 0.52,
              ease: "power2.out",
              overwrite: true,
            }
          );
        }
      } else if (wasCaseStudy) {
        gsap.to(backdrop, {
          opacity: 0,
          duration: reduceMotion ? 0.01 : 0.58,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            setCanvasMounted(false);
            setCanvasReady(false);
          },
        });
      } else {
        gsap.set(backdrop, { opacity: 0 });
      }

      previousCaseState.current = isCaseStudy;
    },
    { dependencies: [isCaseStudy] }
  );

  useGSAP(
    () => {
      const canvasLayer = canvasLayerRef.current;
      if (!canvasReady || !canvasLayer) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(
        canvasLayer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: reduceMotion ? 0.01 : 0.64,
          ease: "power2.out",
          overwrite: true,
        }
      );
    },
    { dependencies: [canvasReady] }
  );

  return (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      data-active={isCaseStudy || undefined}
      aria-hidden="true"
    >
      {canvasMounted ? (
        <div ref={canvasLayerRef} className={styles.canvasLayer}>
          <MonumentScene
            onSelect={ignoreSelection}
            showMonument={false}
            onReady={() => setCanvasReady(true)}
          />
        </div>
      ) : null}
    </div>
  );
}