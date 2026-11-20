import { SectionHeader } from "@/components/ui/SectionHeader";

const principles = [
  {
    number: "01",
    title: "Structure before surface",
    body: "Start with the information architecture, the task and the context. Visual decisions become stronger when the system underneath them is clear.",
  },
  {
    number: "02",
    title: "Systems over isolated screens",
    body: "Build reusable type, colour, spacing and component rules so that every screen can feel specific without becoming disconnected.",
  },
  {
    number: "03",
    title: "Motion with a reason",
    body: "Use movement to reveal hierarchy, explain a state change and reward exploration. Precision matters more than the number of effects.",
  },
];

export function ApproachSection() {
  return (
    <section className="site-container py-[var(--section-space)]">
      <SectionHeader
        index="02"
        title="Approach"
        intro="A practice that connects product structure, visual systems and motion-led interaction — with clarity as the constant."
      />

      <ol className="mt-16 border-t border-rule md:mt-24">
        {principles.map((principle) => (
          <li key={principle.number} className="border-b border-rule py-8 md:py-10">
            <div className="editorial-grid items-start">
              <p className="eyebrow col-span-1 pt-2 text-muted">{principle.number}</p>
              <h3 className="col-span-3 text-balance font-sans text-[clamp(2.25rem,8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] md:col-span-4 lg:col-span-6 lg:text-[clamp(2.75rem,4.4vw,4.5rem)]">
                {principle.title}
              </h3>
              <p className="col-span-4 mt-5 max-w-md text-pretty text-[1.0625rem] leading-[1.65] text-ink-soft md:col-span-3 md:col-start-6 md:mt-2 lg:col-span-4 lg:col-start-8 lg:text-[1.125rem]">
                {principle.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
