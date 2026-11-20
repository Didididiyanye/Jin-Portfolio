import type { Metadata } from "next";
import Link from "next/link";
import { HapePageArchive, type HapeArchivePage } from "./_components/HapePageArchive";
import { HapePageProvider } from "./_components/HapePageContext";
import { HapePageGallery } from "./_components/HapePageGallery";
import { HapeHeroStage } from "./_components/HapeHeroStage";
import hapePagesJson from "@/lib/hape-sections.json";
import { ChapterEntryPlaque } from "@/components/case-study/ChapterEntryPlaque";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/motion/Reveal";
import { CoverStopController } from "@/components/motion/CoverStopController";
import { getProject } from "@/lib/projects";
import styles from "./hape.module.css";

export const metadata: Metadata = {
  title: "HAPE: Brand Website Redesign",
  description:
    "A concept redesign of the HAPE brand website across eight desktop pages, connecting product shopping, learning content, sustainability and company information.",
};

const pageSummaries: Record<string, string> = {
  homepage: "A brand-led homepage with product categories, age-based shopping, toy-making content, journal stories and newsletter sign-up.",
  shop: "Ways to shop by play type, age and developmental benefit, followed by featured products and product carousels.",
  "learning-benefits": "An overview of motor, social, problem-solving and exploration skills, with toy examples tied to each area.",
  sustainability: "Stories about materials, product lifespan, responsible design, nature and the company's history.",
  "age-development": "Shopping and learning content grouped by age and developmental stage.",
  toys: "A category page with product stories, filters, sorting and a product grid.",
  "product-detail": "A product page with gallery, play information, learning benefits, design notes, materials, specifications, FAQ, reviews and related toys.",
  about: "The HAPE story, design team, six learning skills, design philosophy, research approach and the link between play and learning.",
};

const completePages: HapeArchivePage[] = hapePagesJson.map((page) => ({
  ...page,
  summary: pageSummaries[page.id] ?? "",
})) as HapeArchivePage[];

const principles = [
  {
    tag: "Original hierarchy",
    title: "Reference the original hierarchy",
    copy: "Keep the original relationship between the homepage, shop, age development, product detail and brand content instead of introducing an unfamiliar information architecture. The redesign focuses on entry order and content continuity: users can enter through category, age or skill, and all paths lead back to the same product information and learning content.",
  },
  {
    tag: "Browsing + visual",
    title: "Improve browsing and visual clarity",
    copy: "The browsing sequence becomes: see a play scenario first, narrow by age, play type and skill, then move into product detail. Visually, large scene photography sets the mood, while shared product cards, labels and spacing control information density, so the pages feel more branded and easier to judge.",
  },
  {
    tag: "Content + system",
    title: "Build trust through content and system",
    copy: "About, Sustainability and product detail share one information structure. Material, design philosophy and learning-through-play content appear where users need to make a decision. Consistent headers, image ratios, product cards, skill labels and closing prompts make the eight pages feel like one continuous brand system rather than separate templates.",
  },
];

export default function HapeCaseStudyPage() {
  const nextProject = getProject("micro-world")!;

  return (
    <HapePageProvider>
      <div className={`site-shell site-stack ${styles.page}`} data-cover-page>
        <CoverStopController />
      <HapeHeroStage />

      <section className={styles.workbench} aria-labelledby="hape-pages-title" data-cover-target>
        <div className={styles.surfaceTopline}>
          <p className="mono-label"><T text="02 / Complete design pages" /></p>
          <p className="mono-label"><T text="8 complete pages / page notes" /></p>
        </div>
        <header className={styles.workbenchHeader}>
          <div>
            <p className={styles.workbenchKicker}><T text="Complete page viewer" /></p>
            <h2 id="hape-pages-title" className={styles.workbenchTitle}><T text="See each page in context." /></h2>
          </div>
          <p className={styles.workbenchIntro}><T text="Choose a page from the index. The viewer keeps the full page beside notes on its purpose, content and design." /></p>
        </header>
        <HapePageArchive pages={completePages} />
      </section>

      <Reveal className={styles.chapters}>
        <section className={styles.chapter + " " + styles.responseChapter} aria-labelledby="hape-response-title">
          <header className={styles.chapterHeader}>
            <div className={styles.chapterMeta}>
              <span className={styles.chapterIndex}>03</span>
              <span className={styles.chapterLabel}><T text="Design response" /></span>
            </div>
            <div className={styles.chapterHeadline}>
              <h2 id="hape-response-title" className={styles.chapterTitle}><T text="From product browsing to brand understanding." /></h2>
              <p className={styles.chapterIntro}><T text="The HAPE website needs to connect browsing, choosing and understanding. The design starts with the original site&apos;s content hierarchy, then reorganises entry points and information order through browsing logic, visual presentation and a shared page system." /></p>
            </div>
          </header>
          <div className={styles.principles}>
            {principles.map((principle, index) => (
              <article key={principle.title} className={styles.principle}>
                <div className={styles.principleTopline}>
                  <span className={styles.principleIndex}>0{index + 1}</span>
                  <span className={styles.principleTag}><T text={principle.tag} /></span>
                </div>
                <span className={styles.principleNumber} aria-hidden="true">0{index + 1}</span>
                <h3><T text={principle.title} /></h3>
                <p><T text={principle.copy} /></p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.chapter + " " + styles.indexChapter} aria-labelledby="hape-complete-index-title">
          <header className={styles.chapterHeader}>
            <div className={styles.chapterMeta}>
              <span className={styles.chapterIndex}>04</span>
              <span className={styles.chapterLabel}><T text="Complete page index" /></span>
            </div>
            <div className={styles.chapterHeadline}>
              <h2 id="hape-complete-index-title" className={styles.chapterTitle}><T text="Eight pages in the HAPE website." /></h2>
              <p className={styles.chapterIntro}><T text="Open any page from this overview to inspect it in the full viewer above." /></p>
            </div>
          </header>
          <div className={styles.pageIndexPanel}>
            <div className={styles.pageIndexTopline}>
              <span><T text="Page index" /></span>
              <span><T text="Select a page to open" /></span>
            </div>
            <HapePageGallery pages={completePages} />
          </div>
        </section>

      </Reveal>

      <section className={styles.nextChapter} aria-labelledby="next-chapter-title">
        <p className="mono-label"><T text="Next in the index /" /> {nextProject.index}</p>
        <Link href={nextProject.href} className={styles.nextMain} prefetch={false}>
          <div>
            <h2 id="next-chapter-title" aria-label={nextProject.title}>
              {nextProject.slug === "micro-world" ? (
                <>
                  <span className={styles.nextProjectWord}>Micro</span>{" "}
                  <span className={styles.nextProjectWord}>World</span>
                </>
              ) : nextProject.title}
            </h2>
            <p><T text={nextProject.subtitle} /> · <T text={nextProject.category} /></p>
          </div>
          <p className={styles.nextStatus}><T text="Next is Micro World, an insect science website built around specimen records, taxonomy and clear educational content." /></p>
          <ChapterEntryPlaque index={`NEXT / ${nextProject.index}`} tone="hape"><T text="Continue browsing" /></ChapterEntryPlaque>
        </Link>
      </section>
      </div>
    </HapePageProvider>
  );
}



