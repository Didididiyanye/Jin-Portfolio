import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

type NextProjectProps = {
  project: Project;
};

export function NextProject({ project }: NextProjectProps) {
  return (
    <section className="site-container py-[var(--section-space)]">
      <div className="border-t border-rule pt-5">
        <p className="eyebrow text-muted">Next project / {project.index}</p>
        <Link
          href={project.href}
          prefetch={false}
          className="group mt-10 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-balance font-sans text-[clamp(3.5rem,11vw,9rem)] font-medium leading-[0.88] tracking-[-0.055em] transition-colors duration-300 group-hover:text-signal group-focus-visible:text-signal">
              {project.title}
            </h2>
            <p className="mt-4 text-lg text-ink-soft">{project.subtitle}</p>
          </div>
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-rule transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-paper group-focus-visible:border-signal group-focus-visible:bg-signal group-focus-visible:text-paper md:size-20">
            <ArrowUpRight className="size-6" />
          </span>
        </Link>
      </div>
    </section>
  );
}
