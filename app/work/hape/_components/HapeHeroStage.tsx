import Link from "next/link";
import { T } from "@/components/ui/T";
import styles from "../hape.module.css";

const contextNotes = [
  {
    number: "01",
    title: "Brand context",
    description: "HAPE makes wooden toys and learning products for children.",
  },
  {
    number: "02",
    title: "Design task",
    description: "Redesign the brand website so product shopping, learning content and company information feel like one clear site.",
  },
  {
    number: "03",
    title: "Evidence boundary",
    description: "Independent internship concept. No written brief, user research or usability testing.",
  },
];

export function HapeHeroStage() {
  return (
    <div className={styles.heroStage}>
      <section className={styles.hero + " tone-olive"} aria-labelledby="hape-title" data-cover-hero>
        <div className={styles.heroTop}>
          <Link href="/work" className={styles.backLink}>← <T text="Work index" /></Link>
          <span className={styles.heroIndex}>01 / <T text="HAPE brand website" /></span>

        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroLead}>
            <div className={styles.heroCopy}>
              <p className={styles.heroKicker}><T text="HAPE internship concept / Brand website redesign" /></p>
              <h1 id="hape-title" className={styles.heroTitle}>
                HAPE<span className={styles.heroTitleDot} aria-hidden="true" />
              </h1>
            </div>

            <div className={styles.heroLeadAside}>
              <p className={styles.heroDeck}><T text="A website redesign for HAPE across eight desktop pages. Product shopping, age-based discovery, learning content and brand information share one visual language." /></p>
              <div className={styles.heroSlogan} aria-label="HAPE slogan: Love, Play, Learn">
                <span><i aria-hidden="true" /><T text="Love." /></span>
                <span><i aria-hidden="true" /><T text="Play." /></span>
                <span><i aria-hidden="true" /><T text="Learn." /></span>
              </div>
              <div className={styles.heroMetaRow}>
                <span><T text="Role / Website concept during HAPE internship" /></span>
                <span><T text="Scope / 8 desktop pages" /></span>
              </div>
            </div>
          </div>

          <section className={styles.heroManifesto} aria-labelledby="hape-context-title" data-cover-stop>
            <div className={styles.heroManifestoHeader}>
              <h2 id="hape-context-title">01 / <T text="Project background" /></h2>
              <span>HAPE / <T text="Brand world" /></span>
            </div>

            <div className={styles.heroManifestoMain}>
              <p className={styles.heroManifestoStatement}>
                <span><T text="Play becomes" /> <em><T text="learning." /></em></span>
                <span><T text="Learning becomes" /> <em><T text="discovery." /></em></span>
              </p>
              <p className={styles.heroManifestoIntro}><T text="The redesign is made for parents and gift buyers who want to compare toys, understand developmental benefits and learn about HAPE before buying." /></p>
            </div>

            <div className={styles.heroBrief} aria-label="Project context notes">
              {contextNotes.map((note) => (
                <article key={note.number} className={styles.heroBriefItem}>
                  <span>{note.number}</span>
                  <div>
                    <p><T text={note.title} /></p>
                    <p><T text={note.description} /></p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
