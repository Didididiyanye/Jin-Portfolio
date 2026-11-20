"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, useState, type FocusEvent, type PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 190, damping: 24, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 190, damping: 24, mass: 0.35 });
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rawX.set(event.clientX - rect.left);
    rawY.set(event.clientY - rect.top);
  };

  const handleFocusPreview = (event: FocusEvent<HTMLAnchorElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const rowRect = event.currentTarget.getBoundingClientRect();
    rawX.set(rect.width * 0.72);
    rawY.set(rowRect.top - rect.top + Math.min(rowRect.height * 0.5, 180));
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerLeave={() => setActiveProject(null)}
    >
      <ul aria-label="Selected projects">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onActivate={() => setActiveProject(project)}
            onDeactivate={() => setActiveProject(null)}
            onPointerMove={handlePointerMove}
            onFocusPreview={handleFocusPreview}
          />
        ))}
      </ul>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[clamp(16rem,25vw,23rem)] md:block"
            style={{ x, y }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="translate-x-[-50%] translate-y-[-50%]">
              <div className="border border-rule bg-paper p-1.5 shadow-[0_18px_60px_rgba(13,13,12,0.12)]">
                <div
                  className={`media-shell ${
                    activeProject.previewAspect === "portrait"
                      ? "aspect-[3/4]"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={activeProject.image}
                    alt=""
                    fill
                    quality={90}
                    sizes="(min-width: 768px) 25vw, 0vw"
                    className="object-cover object-top"
                    priority={activeProject.slug === "petly-product"}
                  />
                </div>
                <div className="flex items-center justify-between gap-4 px-2 py-2">
                  <p className="eyebrow text-muted">{activeProject.index} / 06</p>
                  <p className="text-xs text-ink-soft">View project ↗</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
