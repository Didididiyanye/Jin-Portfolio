"use client";

import Image from "next/image";
import Link from "next/link";
import type { FocusEvent, PointerEvent } from "react";
import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

type ProjectCardProps = {
  project: Project;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onPointerMove?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onFocusPreview?: (event: FocusEvent<HTMLAnchorElement>) => void;
};

export function ProjectCard({
  project,
  onActivate,
  onDeactivate,
  onPointerMove,
  onFocusPreview,
}: ProjectCardProps) {
  return (
    <li className="border-b border-rule">
      <Link
        href={project.externalHref ?? project.href}
        target={project.externalHref ? "_blank" : undefined}
        rel={project.externalHref ? "noopener noreferrer" : undefined}
        prefetch={false}
        className="group block py-5 md:py-7"
        onPointerEnter={onActivate}
        onPointerLeave={onDeactivate}
        onPointerMove={onPointerMove}
        onFocus={(event) => {
          onActivate?.();
          onFocusPreview?.(event);
        }}
        onBlur={onDeactivate}
        aria-label={`${project.title} — ${project.subtitle}. ${project.discipline}. ${project.evidence}.`}
      >
        <div className="editorial-grid items-start">
          <span className="eyebrow col-span-1 pt-2 text-muted">{project.index}</span>

          <div className="col-span-3 md:col-span-5 lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <h3 className="font-sans text-[clamp(2.5rem,10.5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.045em] transition-[color,transform] duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2 group-hover:text-signal group-focus-visible:translate-x-2 group-focus-visible:text-signal lg:text-[clamp(3.75rem,5.5vw,5.75rem)]">
                {project.title}
              </h3>
              <span className="hidden font-sans text-2xl text-muted md:inline">
                {project.index}
              </span>
            </div>
            <p className="mt-2 text-lg tracking-[-0.01em] text-ink md:mt-3">
              {project.subtitle}
            </p>
          </div>

          <div className="col-span-4 mt-6 grid grid-cols-2 gap-4 md:col-span-2 md:col-start-7 md:mt-2 lg:col-span-3 lg:col-start-7">
            <div>
              <p className="eyebrow text-muted">Discipline</p>
              <p className="mt-2 text-sm leading-[1.35] text-ink-soft">
                {project.discipline}
              </p>
            </div>
            <div>
              <p className="eyebrow text-muted">Evidence</p>
              <p className="mt-2 text-sm leading-[1.35] text-ink-soft">
                {project.evidence}
              </p>
            </div>
          </div>

          <span className="col-span-4 mt-6 flex items-center justify-between border-t border-rule pt-4 md:col-span-1 md:col-start-12 md:mt-1 md:justify-center md:border-0 md:pt-0">
            <span className="text-sm text-muted md:hidden">Open case study</span>
            <span className="flex size-11 items-center justify-center rounded-full border border-rule transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-paper group-focus-visible:border-signal group-focus-visible:bg-signal group-focus-visible:text-paper">
              <ArrowUpRight className="size-4" />
            </span>
          </span>

          <div className="col-span-4 mt-6 md:hidden">
            <div
              className={`media-shell ${project.previewAspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                quality={90}
                sizes="calc(100vw - 2rem)"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-[1.6] text-ink-soft">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

