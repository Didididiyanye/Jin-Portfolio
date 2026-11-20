import type { ReactNode } from "react";

type SectionHeaderProps = {
  index: string;
  title: string;
  intro?: ReactNode;
  className?: string;
};

export function SectionHeader({ index, title, intro, className = "" }: SectionHeaderProps) {
  return (
    <div className={`border-t border-rule pt-5 ${className}`}>
      <div className="editorial-grid">
        <p className="eyebrow col-span-1 text-muted">{index}</p>
        <h2 className="col-span-3 font-sans text-[clamp(2.7rem,9vw,5rem)] font-medium leading-[0.98] tracking-[-0.04em] md:col-span-4 lg:col-span-5 lg:text-[clamp(3.75rem,6vw,6rem)]">
          {title}
        </h2>
        {intro ? (
          <div className="col-span-4 mt-8 max-w-md text-pretty text-[1.0625rem] leading-[1.64] text-ink-soft md:col-span-3 md:col-start-6 md:mt-0 lg:col-span-4 lg:col-start-8 lg:text-lg">
            {intro}
          </div>
        ) : null}
      </div>
    </div>
  );
}
