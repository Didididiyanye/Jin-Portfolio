import type { ReactNode } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";

type CaseStudySectionProps = {
  index: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function CaseStudySection({
  index,
  title,
  intro,
  children,
  className = "",
}: CaseStudySectionProps) {
  return (
    <section className={`site-container py-[clamp(4.5rem,8vw,8rem)] ${className}`}>
      <SectionHeader index={index} title={title} intro={intro} />
      <div className="mt-14 md:mt-20">{children}</div>
    </section>
  );
}
