import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { ChapterEntryPlaque } from "@/components/case-study/ChapterEntryPlaque";
import { T } from "@/components/ui/T";
import { CoverStopController } from "@/components/motion/CoverStopController";
import { getProject } from "@/lib/projects";
import { PetlyInteractiveDemo } from "./_components/PetlyInteractiveDemo";
import styles from "./petly-product.module.css";

export const metadata: Metadata = {
  title: "PETLY: Pet Care App Design and User Flow",
  description:
    "A clickable app design case for pet care, showing screen design and page logic across 20 routes, including pet profiles, walks, appointments and veterinary advice.",
};

export default function PetlyProductCaseStudyPage() {
  const nextProject = getProject("ui-motion")!;

  return (
    <div className={`site-shell site-stack ${styles.page}`} data-cover-page>
      <CoverStopController />

      <div className={styles.heroStage}>
        <section className={`${styles.hero} tone-rose`} aria-labelledby="petly-title" data-cover-hero>
          <div className={styles.heroTop}>
            <Link href="/work" className={styles.backLink}>← <T text="Work index" /></Link>
            <span className={styles.heroIndex}>05 / <T text="PETLY app design" /></span>
            <a href="#complete-routes" className={styles.figmaLink}>
              <T text="Try the prototype" /> <ArrowUpRight className={styles.inlineArrow} />
            </a>
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroLead}>
              <div className={styles.heroCopy}>
                <p className={styles.heroKicker}><T text="Mobile app design / Screen design and page logic" /></p>
                <h1 id="petly-title" className={styles.heroTitle}>
                  <span>PETLY</span>
                  <span><T text="App design and flow" /></span>
                </h1>
              </div>

              <div className={styles.heroLeadAside}>
                <p className={styles.heroDeck}><T text="A clickable app design case for a new pet care product. The prototype shows the screen set and page logic across 20 routes, from pet profiles and walks to appointments and veterinary advice." /></p>
                <div className={styles.heroSlogan} aria-label="PETLY app sections: profile, walks and care">
                  <span><i aria-hidden="true" /><T text="Profile." /></span>
                  <span><i aria-hidden="true" /><T text="Walks." /></span>
                  <span><i aria-hidden="true" /><T text="Care." /></span>
                </div>
                <div className={styles.heroMetaRow}>
                  <span><T text="Role / App design · UX/UI · Interaction" /></span>
                  <span><T text="Scope / 20 linked mobile screens" /></span>
                  <span><T text="Canvas / 390px" /></span>
                </div>
                <a href="#complete-routes" className={styles.primaryAction}><T text="Try the prototype" /> <span>↓</span></a>
              </div>
            </div>

            <section className={styles.manifesto} aria-labelledby="petly-context-title" data-cover-stop>
              <div className={styles.manifestoHeader}>
                <h2 id="petly-context-title">01 / <T text="Project background" /></h2>
                <span>PETLY / <T text="Mobile care product" /></span>
              </div>

              <div className={styles.manifestoMain}>
                <p className={styles.manifestoStatement}>
                  <span><T text="One pet. One record." /></span>
                  <span><T text="One continuous" /> <em><T text="context." /></em></span>
                </p>
                <p className={styles.manifestoIntro}><T text="The active pet stays visible across walks, appointments and advice. Changing the pet changes the records, appointments and next steps in the prototype." /></p>
              </div>

              <div className={styles.heroBrief} aria-label="Project context notes">
                <article className={styles.heroBriefItem}>
                  <span>01</span>
                  <div><p><T text="Evidence boundary" /></p><p><T text="Independent app design and prototype made without an original written brief." /></p></div>
                </article>
                <article className={styles.heroBriefItem}>
                  <span>02</span>
                  <div><p><T text="What the case shows" /></p><p><T text="The clickable prototype covers screen design as well as the page logic between 20 routes." /></p></div>
                </article>
                <article className={styles.heroBriefItem}>
                  <span>03</span>
                  <div><p><T text="Testing note" /></p><p><T text="No user research or production medical, booking or GPS integration was performed." /></p></div>
                </article>
              </div>
            </section>
          </div>
        </section>
      </div>

      <section
        id="complete-routes"
        className={styles.interactionSection}
        data-cover-target
        aria-labelledby="petly-interaction-title"
      >
        <div className={styles.sectionTopline}>
          <p className="mono-label">02 / <T text="Clickable prototype" /></p>
          <p className="mono-label"><T text="Click inside the mobile screen" /></p>
        </div>
        <header className={styles.interactionHeader}>
          <div className={styles.interactionIdentity}>
            <p className={styles.sectionKicker}><T text="Screen design and page logic" /></p>
            <h2 id="petly-interaction-title" className={styles.interactionTitle}>PETLY /<br /><T text="Interactive flow" /></h2>
            <p className={styles.interactionIntroInline}><T text="Start from the active pet, then follow walks, appointments and veterinary advice. Use the flow shortcuts or tap inside the phone." /></p>
          </div>

          <aside className={styles.visualLanguagePanel} aria-label="PETLY visual language">
            <div className={styles.visualLanguageTopline}>
              <span><T text="Visual language" /></span>
              <span>PETLY / <T text="App design" /></span>
            </div>
            <div className={styles.visualSwatches} aria-label="Core colour palette">
              <div><span style={{ backgroundColor: "#F1F6F0" }} /><small><T text="Ground" /></small><code>#F1F6F0</code></div>
              <div><span style={{ backgroundColor: "#FFFFFF" }} /><small><T text="Surface" /></small><code>#FFFFFF</code></div>
              <div><span style={{ backgroundColor: "#2F7559" }} /><small><T text="Care green" /></small><code>#2F7559</code></div>
              <div><span style={{ backgroundColor: "#1D5B48" }} /><small><T text="Deep green" /></small><code>#1D5B48</code></div>
              <div><span style={{ backgroundColor: "#C4954E" }} /><small><T text="Data sand" /></small><code>#C4954E</code></div>
            </div>
            <div className={styles.visualTypeRow}>
              <div><span>Aa</span><p>Instrument Sans<br /><T text="Display / UI" /></p></div>
              <div><span>24:18</span><p><T text="Tabular numbers" /><br /><T text="Care data" /></p></div>
            </div>
            <dl className={styles.visualRules}>
              <div><dt><T text="Interaction" /></dt><dd><T text="140-220ms state changes" /></dd></div>
              <div><dt><T text="Typography" /></dt><dd><T text="Chinese-first interface" /></dd></div>
              <div><dt><T text="Structure" /></dt><dd><T text="One main action per screen" /></dd></div>
            </dl>
          </aside>
        </header>

        <PetlyInteractiveDemo />

        <div className={styles.interactionEvidence}>
          <span><T text="20 linked routes" /></span>
          <span><T text="51 Chinese interface checks" /></span>
          <span><T text="48 English interface checks" /></span>
          <span><T text="390px layout checked" /></span>
        </div>
      </section>

      <section className={styles.nextChapter} aria-labelledby="petly-next-title">
        <p className="mono-label"><T text="Next in the index /" /> {nextProject.index}</p>
        <div className={styles.nextMain}>
          <div>
            <h2 id="petly-next-title">{nextProject.title}</h2>
            <p><T text={nextProject.subtitle} /> · <T text={nextProject.category} /></p>
          </div>
          <p className={styles.nextStatus}><T text="Next is UI Motion, a browser experiment built around a photo wall, card editor and 3D viewer." /></p>
          <ChapterEntryPlaque href={nextProject.externalHref ?? nextProject.href} external={Boolean(nextProject.externalHref)} index={`NEXT / ${nextProject.index}`} tone="petly"><T text="Continue browsing" /></ChapterEntryPlaque>
        </div>
      </section>
    </div>
  );
}

