"use client";

import { useEffect } from "react";

export function CoverStopController() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>("[data-cover-page]");
    const hero = document.querySelector<HTMLElement>("[data-cover-hero]");
    const stop = document.querySelector<HTMLElement>("[data-cover-stop]");

    if (!page || !hero || !stop) return;

    const update = () => {
      const heroRect = hero.getBoundingClientRect();
      const stopRect = stop.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;
      const stopTop = stopRect.top - heroRect.top;
      const stopBottom = stopRect.bottom - heroRect.top;
      const viewportHeight = window.innerHeight;
      const pageTop = Number.parseFloat(getComputedStyle(page).paddingTop) || 0;
      const revealDistance = Math.max(
        96,
        pageTop + stopBottom + 48 - viewportHeight,
      );
      const heroTop = Math.round(pageTop - revealDistance);
      const coverDistance = viewportHeight - heroTop - stopTop;
      const stageHeight = Math.ceil(heroHeight + coverDistance);
      const overlap = Math.max(0, Math.round(heroHeight - stopTop));

      page.style.setProperty("--cover-overlap", `${overlap}px`);
      page.style.setProperty("--cover-hero-top", `${heroTop}px`);
      page.style.setProperty("--cover-stage-height", `${stageHeight}px`);
    };

    const observer = new ResizeObserver(update);
    observer.observe(hero);
    observer.observe(stop);
    window.addEventListener("resize", update);
    document.fonts?.ready.then(update).catch(() => undefined);
    requestAnimationFrame(update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
