import { SectionHeader } from "@/components/ui/SectionHeader";

const capabilities = [
  "UI / Product",
  "Visual Systems",
  "Information Architecture",
  "Interaction Prototyping",
  "Motion / 3D",
  "Localization / Quality",
];

export function AboutTeaser() {
  return (
    <section id="about" className="site-container py-[var(--section-space)]">
      <SectionHeader
        index="03"
        title="About"
        intro="My work moves between product interfaces, visual systems and motion-led prototypes, with a focus on making complex information feel calm and intentional."
      />

      <div className="mt-16 editorial-grid md:mt-24">
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <p className="max-w-[13ch] text-balance font-sans text-[clamp(3rem,9vw,7rem)] leading-[0.92] tracking-[-0.04em]">
            Designing the system behind the screen.
          </p>

          <div className="mt-10 max-w-[42rem] space-y-5 text-pretty text-[1.0625rem] leading-[1.66] text-ink-soft md:mt-14 md:text-[1.125rem]">
            <p>
              I&apos;m Jin Fanhao, a UI designer with a background in Art and
              Technology, 3D modelling and AI-assisted motion. I studied at
              Zhejiang Wanli University from 2022 to 2026.
            </p>
            <p>
              My practice connects interface design, visual systems and spatial
              thinking. I care about information architecture, reusable patterns,
              typography, multilingual behaviour and the small interactions that
              make a product feel coherent.
            </p>
          </div>
        </div>

        <div className="col-span-4 mt-14 md:col-span-3 md:col-start-6 md:mt-3 lg:col-span-4 lg:col-start-9">
          <div className="border border-rule bg-paper p-5 md:p-7">
            <p className="eyebrow text-muted">Education / 2022—2026</p>
            <p className="mt-4 font-sans text-3xl leading-[1.05] tracking-[-0.025em]">
              Zhejiang Wanli University
            </p>
            <p className="mt-2 text-sm text-muted">Art and Technology</p>

            <div className="my-8 h-px bg-rule" />

            <p className="eyebrow text-muted">Selected capabilities</p>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {capabilities.map((capability) => (
                <li key={capability} className="text-sm text-ink-soft">
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.62] text-ink-soft">
            All six portfolio projects were independently completed. HAPE
            originated as an internship assignment and is presented as a concept
            proposal.
          </p>
        </div>
      </div>
    </section>
  );
}

