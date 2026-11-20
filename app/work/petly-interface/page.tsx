import type { Metadata } from "next";
import Link from "next/link";
import { ChapterEntryPlaque } from "@/components/case-study/ChapterEntryPlaque";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/motion/Reveal";
import { CoverStopController } from "@/components/motion/CoverStopController";
import { getProject } from "@/lib/projects";
import { PetlyPageArchive, type PetlyPage } from "./_components/PetlyPageArchive";
import { PetlyGallery } from "./_components/PetlyGallery";
import { PetlyPageProvider } from "./_components/PetlyPageContext";
import styles from "./petly-interface.module.css";

export const metadata: Metadata = {
  title: "PETLY: Pet Care App Design",
  description:
    "A ten-screen Figma app design for a new pet care product, covering home, pet profiles, health records, walks, membership and onboarding.",
};

const petlyPages: PetlyPage[] = [
  {
    id: "home",
    index: "01",
    label: "Home",
    name: "Home dashboard",
    summary: "A daily dashboard with pet identity, health metrics, quick actions and the main navigation.",
    note: "The home screen sets the app's tone with pet photography, soft green surfaces and a short set of actions.",
    sourceNode: "4003:1684",
    modules: ["Morning greeting", "Pet identity", "Today metrics", "Quick actions"],
    path: ["Brand entry", "Pet context", "Today overview", "Care action"],
    image: { src: "/images/case-studies/petly-interface/01-home-2x.webp", width: 780, height: 1920 },
  },
  {
    id: "pet-profile",
    index: "02",
    label: "Profile",
    name: "Pet profile",
    summary: "A pet profile with portrait, identity badges, health values, care summaries and record shortcuts.",
    note: "The layout keeps medical information close to the pet's identity, so the record still feels personal.",
    sourceNode: "4003:651",
    modules: ["Pet portrait", "Editorial chips", "Quick vitals", "Health records"],
    path: ["Pet identity", "Identity badges", "Health summary", "Care record"],
    image: { src: "/images/case-studies/petly-interface/02-pet-profile-2x.webp", width: 780, height: 2632 },
  },
  {
    id: "health-weight",
    index: "03",
    label: "Weight",
    name: "Weight and body",
    summary: "Direction A shows current weight, target range, adjustment controls and weight history.",
    note: "The large value and stepper controls make weight entry direct, while the history keeps the measurement in context.",
    sourceNode: "4003:1181",
    modules: ["Health switcher", "Weight display", "Target range", "History chart"],
    path: ["Health area", "Current metric", "Adjustment", "Historical record"],
    image: { src: "/images/case-studies/petly-interface/03-health-weight-2x.webp", width: 780, height: 2338 },
  },
  {
    id: "health-vaccinations",
    index: "04",
    label: "Vaccinations",
    name: "Vaccinations",
    summary: "Direction B shows vaccine status, previous records, booster reminders and clinic prompts.",
    note: "The card layout separates current status from history and makes the next booster easy to find.",
    sourceNode: "4006:1909",
    modules: ["Vaccine status", "Record list", "Booster reminder", "Care prompt"],
    path: ["Health area", "Vaccine status", "Record detail", "Next prevention"],
    image: { src: "/images/case-studies/petly-interface/04-health-vaccinations-2x.webp", width: 780, height: 3284 },
  },
  {
    id: "health-care",
    index: "05",
    label: "Care",
    name: "PETLY Care",
    summary: "Direction C combines clinic access, membership benefits, subscription options and consultation history.",
    note: "This direction places prevention and ongoing care beside the health record instead of treating them as separate products.",
    sourceNode: "4011:2331",
    modules: ["Active clinic", "Care benefits", "Plan selection", "Consultation history"],
    path: ["Health area", "Clinic access", "Membership value", "Care history"],
    image: { src: "/images/case-studies/petly-interface/05-health-care-2x.webp", width: 780, height: 2606 },
  },
  {
    id: "walk-tracking",
    index: "06",
    label: "Walks",
    name: "Walk tracking",
    summary: "A weekly walking goal, activity chart and recent walk summary for the selected dog.",
    note: "The chart and goal share the same card system as the health screens, so exercise feels part of the same record.",
    sourceNode: "4003:1386",
    modules: ["Weekly goal", "Activity chart", "Walk summary", "Bottom navigation"],
    path: ["Walk overview", "Weekly goal", "Activity data", "Movement summary"],
    image: { src: "/images/case-studies/petly-interface/06-walk-tracking-2x.webp", width: 780, height: 1732 },
  },
  {
    id: "live-walk",
    index: "07",
    label: "Live walk",
    name: "Live walk",
    summary: "A map view with the current route, live walk figures and basic activity controls.",
    note: "The map is the main surface. Route and activity data sit on top without covering the path.",
    sourceNode: "4019:1230",
    modules: ["Map viewport", "Route state", "Walk metrics", "Activity controls"],
    path: ["Map entry", "Route context", "Live metrics", "Walk state"],
    image: { src: "/images/case-studies/petly-interface/07-live-walk-2x.webp", width: 780, height: 1688 },
  },
  {
    id: "petly-care",
    index: "08",
    label: "CARE plan",
    name: "PETLY CARE subscription",
    summary: "A membership page with a care image, benefit list, plan options and one subscription action.",
    note: "The page places the membership beside health care, with one clear decision at the end.",
    sourceNode: "4016:529",
    modules: ["Membership hero", "Care benefits", "Plan choice", "Primary CTA"],
    path: ["Membership entry", "Value explanation", "Plan choice", "Start care"],
    image: { src: "/images/case-studies/petly-interface/08-petly-care-2x.webp", width: 780, height: 2611 },
  },
  {
    id: "login",
    index: "09",
    label: "Login",
    name: "Login",
    summary: "A login screen with pet photography, form fields, social access and account creation.",
    note: "The login keeps the app's typography and warm imagery instead of switching to a generic form.",
    sourceNode: "6007:153",
    modules: ["Back navigation", "Pet visual", "Login form", "Account entry"],
    path: ["Welcome", "Pet visual", "Credentials", "App entry"],
    image: { src: "/images/case-studies/petly-interface/09-login-2x.webp", width: 780, height: 1760 },
  },
  {
    id: "create-pet",
    index: "10",
    label: "Create pet",
    name: "Create pet onboarding",
    summary: "An onboarding form for a pet photo, identity details and the first profile record.",
    note: "The last screen uses the same fields, chips and rounded cards as the rest of the app.",
    sourceNode: "6007:241",
    modules: ["Photo upload", "Identity form", "Profile fields", "Create action"],
    path: ["New pet", "Photo", "Identity details", "First record"],
    image: { src: "/images/case-studies/petly-interface/10-create-pet-2x.webp", width: 780, height: 1978 },
  },
];

const responsePrinciples = [
  {
    index: "01",
    title: "Establish identity context",
    copy: "Health values can feel distant when they have no clear subject. Pet photography, name, identity labels and health summaries share the same screen context, so users always know which pet the record belongs to. Emotional connection and decision-making information are present at the same time.",
  },
  {
    index: "02",
    title: "Prioritise information",
    copy: "Weight, vaccination and care screens contain multiple values and history. Each screen has one primary health theme, organised as current status, key value, historical change and next-step prompt. A/B/C changes the health priority being emphasised, not the reading structure, so users do not have to relearn how to read each screen.",
  },
  {
    index: "03",
    title: "Make the next action clear",
    copy: "Viewing a record is only one part of care. Every screen ends with a clear action such as recording weight, checking a vaccination, starting a walk or choosing a care plan. Walks, login and pet creation reuse the same cards, labels and spacing, connecting health management with everyday care.",
  },
];

export default function PetlyInterfaceCaseStudyPage() {
  const nextProject = getProject("y2k")!;

  return (
    <PetlyPageProvider>
      <div className={`site-shell site-stack ${styles.page}`} data-cover-page>
        <CoverStopController />
        <div className={styles.heroStage}>
          <section className={`${styles.hero} tone-rose`} aria-labelledby="petly-interface-title" data-cover-hero>
            <div className={styles.heroTop}>
              <Link href="/work" className={styles.backLink}>← <T text="Work index" /></Link>
              <span className={styles.heroIndex}>03 / <T text="PETLY pet care app" /></span>

            </div>

            <div className={styles.heroContent}>
              <div className={styles.heroLead}>
                <div className={styles.heroCopy}>
                  <p className={styles.heroKicker}><T text="Mobile app design / Pet care" /></p>
                  <h1 id="petly-interface-title" className={styles.heroTitle}>
                    <span>PETLY</span>
                    <span><T text="App design" /></span>
                  </h1>
                </div>

                <div className={styles.heroLeadAside}>
                  <p className={styles.heroDeck}><T text="A ten-screen app design for a new pet care product. The set covers a home dashboard, pet profiles, health records, walks, care plans and onboarding." /></p>
                  <div className={styles.heroSlogan} aria-label="PETLY interface principles: Record, Understand, Care">
                    <span><i aria-hidden="true" /><T text="Record." /></span>
                    <span><i aria-hidden="true" /><T text="Understand." /></span>
                    <span><i aria-hidden="true" /><T text="Care." /></span>
                  </div>
                  <div className={styles.heroMetaRow}>
                    <span><T text="Role / App design and visual system" /></span>
                    <span><T text="Scope / 10 Figma screens" /></span>
                    <span><T text="Canvas / 390px" /></span>
                  </div>
                  <a href="#complete-screens" className={styles.primaryAction}><T text="Inspect the screens" /> <span>↓</span></a>
                </div>
              </div>

              <section className={styles.manifesto} aria-labelledby="petly-interface-context-title" data-cover-stop>
                <div className={styles.manifestoHeader}>
                  <h2 id="petly-interface-context-title">01 / <T text="Project background" /></h2>
                  <span>PETLY / <T text="Mobile interface language" /></span>
                </div>

                <div className={styles.manifestoMain}>
                  <p className={styles.manifestoStatement}>
                    <span><T text="Dense records." /></span>
                    <span><T text="A calmer" /> <em><T text="reading rhythm." /></em></span>
                  </p>
                  <p className={styles.manifestoIntro}><T text="The app keeps pet identity, health values and next actions together. Warm surfaces and large photographs make the records easier to approach without hiding the data." /></p>
                </div>

                <div className={styles.heroBrief} aria-label="Project context notes">
                  <article className={styles.heroBriefItem}>
                    <span>01</span>
                    <div><p><T text="Evidence boundary" /></p><p><T text="Independent app design made without an original written brief." /></p></div>
                  </article>
                  <article className={styles.heroBriefItem}>
                    <span>02</span>
                    <div><p><T text="What the screens cover" /></p><p><T text="The ten screens span dashboard, profile, health, walks, membership, login and pet creation." /></p></div>
                  </article>
                  <article className={styles.heroBriefItem}>
                    <span>03</span>
                    <div><p><T text="How to read the case" /></p><p><T text="The Figma file has no prototype reactions. This case presents the screen designs and the page logic shown in the layouts." /></p></div>
                  </article>
                </div>
              </section>
            </div>
          </section>
        </div>

        <section id="complete-screens" className={styles.pagesSection} data-cover-target aria-labelledby="petly-screens-title">
          <div className={styles.sectionTopline}>
            <p className="mono-label">02 / <T text="Complete design screens" /></p>
            <p className="mono-label"><T text="10 screens / 390px app canvas" /></p>
          </div>
          <header className={styles.pagesHeader}>
            <div>
              <p className={styles.sectionKicker}><T text="App screen archive" /></p>
              <h2 id="petly-screens-title" className={styles.pagesTitle}><T text="Ten screens for one pet care app." /></h2>
            </div>
            <p className={styles.pagesIntro}><T text="Choose a screen to inspect the full Figma layout. Notes beside it explain the purpose, main content and page path." /></p>
          </header>
          <PetlyPageArchive pages={petlyPages} />
        </section>

        <Reveal>
          <section className={styles.responseSection} aria-labelledby="petly-interface-response-title">
            <div className={styles.sectionTopline}>
              <p className="mono-label">03 / <T text="Design response" /></p>
              <p className="mono-label"><T text="Three design principles" /></p>
            </div>
            <header className={styles.responseHeader}>
              <div>
                <p className={styles.sectionKicker}><T text="How care stays understandable" /></p>
                <h2 id="petly-interface-response-title" className={styles.responseTitle}><T text="From pet identity to care action." /></h2>
              </div>
              <p className={styles.responseIntro}><T text="PETLY is not about showing more health data. It is about keeping the owner clear through recording, judgement and action. The ten screens are organised around pet identity, information priority and the next action, so health management feels personal and supports real decisions." /></p>
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
          <section className={styles.indexSection} aria-labelledby="petly-interface-index-title">
            <div className={styles.sectionTopline}>
              <p className="mono-label">04 / <T text="Complete screen index" /></p>
              <p className="mono-label"><T text="10 screens / select to open" /></p>
            </div>
            <header className={styles.indexHeader}>
              <div>
                <p className={styles.sectionKicker}><T text="Screen index" /></p>
                <h2 id="petly-interface-index-title" className={styles.indexTitle}><T text="Ten screens in one pet care app." /></h2>
              </div>
              <p className={styles.indexIntro}><T text="Open any screen from this overview to inspect it in the viewer above." /></p>
            </header>
            <PetlyGallery pages={petlyPages} />
          </section>
        </Reveal>

        <section className={styles.nextChapter} aria-labelledby="petly-interface-next-title">
          <p className="mono-label"><T text="Next in the index /" /> {nextProject.index}</p>
          <Link href={nextProject.href} className={styles.nextMain} prefetch={false}>
            <div>
              <h2 id="petly-interface-next-title">{nextProject.title}</h2>
              <p><T text={nextProject.subtitle} /> · <T text={nextProject.category} /></p>
            </div>
            <p className={styles.nextStatus}><T text="Next is Y2K, a fashion brand website for CYBERGLOSS that connects shopping, lookbooks, music and community pages." /></p>
            <ChapterEntryPlaque index={`NEXT / ${nextProject.index}`} tone="petly"><T text="Continue browsing" /></ChapterEntryPlaque>
          </Link>
        </section>
      </div>
    </PetlyPageProvider>
  );
}


