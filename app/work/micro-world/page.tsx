import type { Metadata } from "next";
import Link from "next/link";
import { ChapterEntryPlaque } from "@/components/case-study/ChapterEntryPlaque";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/motion/Reveal";
import { CoverStopController } from "@/components/motion/CoverStopController";
import { getProject } from "@/lib/projects";
import { MicroWorldBrowser, type MicroWorldPage } from "./_components/MicroWorldBrowser";
import { MicroWorldGallery } from "./_components/MicroWorldGallery";
import { MicroWorldPageProvider } from "./_components/MicroWorldPageContext";
import styles from "./micro-world.module.css";

export const metadata: Metadata = {
  title: "Micro World: Insect Science Website",
  description:
    "An eight-page insect science website concept that uses specimen photography, taxonomy, anatomy and habitat information to explain insects to general readers.",
};

const microWorldPages: MicroWorldPage[] = [
  {
    id: "explore",
    index: "01",
    label: "Home",
    name: "Home",
    summary: "The homepage introduces the insect archive with a large specimen image, field labels and several browsing paths.",
    note: "Macro photography draws attention first. The labels and navigation then explain how to browse the collection.",
    sourceNode: "1012:8728",
    modules: ["Large specimen image", "Species shortcuts", "Habitat filters", "Search"],
    path: ["Introduction", "Featured insect", "Browse by topic", "Open a record"],
    image: { src: "/images/case-studies/micro-world/01-explore.webp", width: 1280, height: 5338 },
  },
  {
    id: "species",
    index: "02",
    label: "Species catalogue",
    name: "Species catalogue",
    summary: "A catalogue of insect records that can be browsed by species, habitat and visual group.",
    note: "Each record keeps the specimen image large and the classification close to it.",
    sourceNode: "1012:9242",
    modules: ["Record grid", "Species labels", "Habitat groups", "Filters"],
    path: ["Catalogue intro", "Species groups", "Habitat groups", "Open a record"],
    image: { src: "/images/case-studies/micro-world/02-species.webp", width: 1280, height: 5402 },
  },
  {
    id: "praying-mantis",
    index: "03",
    label: "Praying mantis",
    name: "Praying mantis",
    summary: "A full species record with identification, habitat, anatomy, behaviour, life cycle and conservation information.",
    note: "The page shows how one record can carry several kinds of information without changing the archive layout.",
    sourceNode: "1009:2275",
    modules: ["Species record", "Habitat map", "Anatomy diagram", "Behaviour notes"],
    path: ["Identification", "Habitat", "Anatomy", "Behaviour", "Conservation"],
    image: { src: "/images/case-studies/micro-world/03-praying-mantis.webp", width: 1280, height: 5550 },
  },
  {
    id: "monarch",
    index: "04",
    label: "Monarch butterfly",
    name: "Monarch butterfly",
    summary: "A species record that applies the same structure to the monarch butterfly's appearance, migration, life cycle and conservation status.",
    note: "The shared structure keeps records consistent, while the photography and content order change the reading experience.",
    sourceNode: "1009:3224",
    modules: ["Species record", "Life cycle", "Migration map", "Conservation status"],
    path: ["Identification", "Life cycle", "Migration", "Conservation"],
    image: { src: "/images/case-studies/micro-world/04-monarch-butterfly.webp", width: 1280, height: 5741 },
  },
  {
    id: "anatomy",
    index: "05",
    label: "Anatomy",
    name: "Anatomy",
    summary: "A visual explanation of insect body structures using diagrams, close-up images and short labels.",
    note: "The diagrams and photographs carry most of the explanation, so the page works as a learning aid as well as a visual archive.",
    sourceNode: "1009:3764",
    modules: ["Body diagrams", "Close-up images", "Labels", "Explanatory text"],
    path: ["Introduction", "Body structures", "Comparison", "Explanation"],
    image: { src: "/images/case-studies/micro-world/05-anatomy-v2.webp", width: 1280, height: 6741 },
  },
  {
    id: "conservation",
    index: "06",
    label: "Conservation",
    name: "Conservation",
    summary: "An editorial page about habitat loss, species status and the role small insects play in ecosystems.",
    note: "This page gives more room to the conservation argument and uses fewer interface elements than the species records.",
    sourceNode: "1009:4412",
    modules: ["Habitat pressure", "Species status", "Conservation notes", "Action links"],
    path: ["Habitat pressure", "Species impact", "Conservation status", "Next action"],
    image: { src: "/images/case-studies/micro-world/06-conservation.webp", width: 1280, height: 5081 },
  },
  {
    id: "soil",
    index: "07",
    label: "Soil",
    name: "Soil",
    summary: "An introduction to the layers of soil and the insects and organisms that live in them.",
    note: "The page moves from one specimen to a wider ecosystem and uses diagrams to show how species relate to each soil layer.",
    sourceNode: "1009:4909",
    modules: ["Soil layers", "Organism groups", "Relationship diagram", "Field notes"],
    path: ["Soil profile", "Layers", "Organisms", "Ecosystem"],
    image: { src: "/images/case-studies/micro-world/07-soil.webp", width: 1280, height: 4904 },
  },
  {
    id: "tactic",
    index: "08",
    label: "Hunting sequence",
    name: "Wait, track, strike",
    summary: "A short visual explanation of how a praying mantis waits, tracks its prey and strikes.",
    note: "This page shows that the same system can support a small educational card as well as a long species record.",
    sourceNode: "1012:8259",
    modules: ["Behaviour steps", "Timing labels", "Illustrations", "Short explanation"],
    path: ["Waiting", "Tracking", "Strike", "Outcome"],
    image: { src: "/images/case-studies/micro-world/08-tactic.webp", width: 1280, height: 3342 },
  },
];

const responsePrinciples = [
  { index: "01", title: "Start with understanding", copy: "The website does not present taxonomy, anatomy, ecology and conservation all at once. It first answers three questions: what it is, how it lives and why it matters. The page structure follows that order: identify the subject, understand its structure and behaviour, then move into habitat and conservation." },
  { index: "02", title: "Keep information with the object", copy: "Taxonomy, measurements, habitat and behaviour information sit beside the corresponding image or diagram. Short text and local labels explain what the reader is already looking at, so facts do not require a separate lookup and scientific content is easier to understand and remember." },
  { index: "03", title: "Use the archive to control depth", copy: "Species, anatomy, soil and conservation pages share one archive language: numbering, titles, images, labels and short explanatory sections. Each topic changes the depth and diagram type, while the reading order remains stable." },
];

export default function MicroWorldCaseStudyPage() {
  const nextProject = getProject("petly-interface")!;

  return (
    <MicroWorldPageProvider>
      <div className={`site-shell site-stack ${styles.page}`} data-cover-page>
        <CoverStopController />
      <div className={styles.heroStage}>
      <section className={styles.hero + " tone-mint"} aria-labelledby="micro-world-title" data-cover-hero>
        <div className={styles.heroTop}>
          <Link href="/work" className={styles.backLink}>← <T text="Work index" /></Link>
          <span className={styles.heroIndex}>02 / <T text="Insect science website" /></span>

        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroLead}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}><T text="Insect science website / Independent concept" /></p>
              <h1 id="micro-world-title" className={styles.heroTitle}>
                <span>Micro</span>
                <span>World</span>
              </h1>
            </div>

            <div className={styles.heroLeadAside}>
              <p className={styles.heroDeck}><T text="An insect science website built around specimen photography, taxonomy, anatomy and clear field notes. The eight pages are made for readers who want to learn without a specialist background." /></p>
              <div className={styles.heroSlogan} aria-label="Micro World concept principles: Observe, Record, Understand">
                <span><i aria-hidden="true" /><T text="Observe." /></span>
                <span><i aria-hidden="true" /><T text="Record." /></span>
                <span><i aria-hidden="true" /><T text="Understand." /></span>
              </div>
              <div className={styles.heroMetaRow}>
                <span><T text="Role / Website design and information structure" /></span>
                <span><T text="Scope / 8 desktop pages" /></span>
                <span><T text="Canvas / 1280px" /></span>
              </div>
              <a href="#complete-pages" className={styles.primaryAction}><T text="Browse complete pages" /> <span>↓</span></a>
            </div>
          </div>

          <section className={styles.heroManifesto} aria-labelledby="micro-context-title" data-cover-stop>
            <div className={styles.heroManifestoHeader}>
              <h2 id="micro-context-title">01 / <T text="Project background" /></h2>
              <span>Micro World / <T text="Insect science website" /></span>
            </div>

            <div className={styles.heroManifestoMain}>
              <p className={styles.heroManifestoStatement}>
                <span><T text="Small lives, lasting" /> <em><T text="records." /></em></span>
              </p>
              <p className={styles.heroManifestoIntro}><T text="Micro World explains insects through specimen photography, taxonomy, anatomy and habitat information. The site is written for students and assumes no specialist knowledge." /></p>
            </div>

            <div className={styles.heroBrief} aria-label="Project context notes">
              <article className={styles.heroBriefItem}>
                <span>01</span>
                <div><p><T text="Evidence boundary" /></p><p><T text="Independent concept design made without an original written brief." /></p></div>
              </article>
              <article className={styles.heroBriefItem}>
                <span>02</span>
                <div><p><T text="Audience" /></p><p><T text="General readers, students and anyone using the site to identify or learn about an insect." /></p></div>
              </article>
              <article className={styles.heroBriefItem}>
                <span>03</span>
                <div><p><T text="Testing note" /></p><p><T text="No user research, usability testing or prototype reactions were recorded." /></p></div>
              </article>
            </div>
          </section>
        </div>
      </section>
      </div>

        <section id="complete-pages" className={styles.pagesSection} data-cover-target aria-labelledby="micro-pages-title">
          <div className={styles.sectionTopline}>
            <p className="mono-label">02 / <T text="Complete design pages" /></p>
            <p className="mono-label"><T text="8 pages / full-page source" /></p>
          </div>
          <header className={styles.pagesHeader}>
            <div>
              <p className={styles.sectionKicker}><T text="Complete page viewer" /></p>
              <h2 id="micro-pages-title" className={styles.pagesTitle}><T text="Eight pages in the insect archive." /></h2>
            </div>
            <p className={styles.pagesIntro}><T text="Choose a page to inspect the full Figma layout. The viewer keeps the original composition and adds notes on the content and design." /></p>
          </header>
          <MicroWorldBrowser pages={microWorldPages} />
        </section>


      <Reveal>
        <section className={styles.responseSection} aria-labelledby="micro-response-title">
          <div className={styles.sectionTopline}>
            <p className="mono-label">03 / <T text="Design response" /></p>
            <p className="mono-label"><T text="Three reading principles" /></p>
          </div>
          <header className={styles.responseHeader}>
            <div>
              <p className={styles.sectionKicker}><T text="How the science stays readable" /></p>
              <h2 id="micro-response-title" className={styles.responseTitle}><T text="From identifying insects to understanding ecology." /></h2>
            </div>
            <p className={styles.responseIntro}><T text="Micro World&apos;s goal is not to present as much knowledge as possible, but to give general readers a clear path from recognising a specimen to understanding its life and why it matters. The page architecture follows that path, using information placement, text length and diagrams to control reading depth." /></p>
          </header>
          <div className={styles.responseGrid}>
            {responsePrinciples.map((principle) => (
              <article key={principle.title} className={styles.responseCard}>
                <span>{principle.index}</span>
                <h3><T text={principle.title} /></h3>
                <p><T text={principle.copy} /></p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.indexSection} aria-labelledby="micro-complete-index-title">
          <div className={styles.sectionTopline}>
            <p className="mono-label">04 / <T text="Complete page index" /></p>
            <p className="mono-label"><T text="8 pages / select to open" /></p>
          </div>
          <header className={styles.indexHeader}>
            <div>
              <p className={styles.sectionKicker}><T text="Page index" /></p>
              <h2 id="micro-complete-index-title" className={styles.indexTitle}><T text="Eight pages in one insect archive." /></h2>
            </div>
            <p className={styles.indexIntro}><T text="Open any preview to inspect that page in the viewer above." /></p>
          </header>
          <MicroWorldGallery pages={microWorldPages} />
        </section>
      </Reveal>

      <section className={styles.nextChapter} aria-labelledby="micro-next-title">
        <p className="mono-label"><T text="Next in the index /" /> {nextProject.index}</p>
        <Link href={nextProject.href} className={styles.nextMain} prefetch={false}>
          <div>
            <h2 id="micro-next-title">{nextProject.title}</h2>
            <p><T text={nextProject.subtitle} /> · <T text={nextProject.category} /></p>
          </div>
          <p className={styles.nextStatus}><T text="Next is PETLY, a ten-screen app design for pet profiles, health records, walks, care plans and onboarding." /></p>
          <ChapterEntryPlaque index={`NEXT / ${nextProject.index}`} tone="micro"><T text="Continue browsing" /></ChapterEntryPlaque>
        </Link>
      </section>
      </div>
    </MicroWorldPageProvider>
  );
}

