import type { Metadata } from "next";
import Link from "next/link";
import { ChapterEntryPlaque } from "@/components/case-study/ChapterEntryPlaque";
import { T } from "@/components/ui/T";
import { Reveal } from "@/components/motion/Reveal";
import { CoverStopController } from "@/components/motion/CoverStopController";
import { getProject } from "@/lib/projects";
import { Y2KPageArchive, type Y2KPage } from "./_components/Y2KPageArchive";
import { Y2KGallery } from "./_components/Y2KGallery";
import { Y2KPageProvider } from "./_components/Y2KPageContext";
import styles from "./y2k.module.css";

export const metadata: Metadata = {
  title: "Y2K: CYBERGLOSS Fashion Website",
  description:
    "A ten-page concept for the CYBERGLOSS fashion brand, using early-web interfaces to connect shopping, lookbooks, brand history and community pages.",
};

const y2kPages: Y2KPage[] = [
  {
    id: "home",
    index: "01",
    label: "Home",
    name: "Home",
    summary: "The CYBERGLOSS homepage combines a brand hero, product entry points, editorial features and community links.",
    note: "Retail, archive and community appear on one page so the site feels connected.",
    sourceNode: "12:1854",
    modules: ["System status strip", "Editorial hero", "Product entry points", "Community modules"],
    path: ["System entry", "Brand hero", "Commerce modules", "Community layer"],
    image: { src: "/images/case-studies/y2k/01-home.webp", width: 1280, height: 5151 },
  },
  {
    id: "shop",
    index: "02",
    label: "Shop",
    name: "Shop",
    summary: "A product catalogue with category filters, prices, materials and product listings inside the retro software frame.",
    note: "File labels and status details add to the brand language, but product names, prices and categories stay easy to find.",
    sourceNode: "12:807",
    modules: ["Shop hero", "Archive release", "Product directory", "Commerce footer"],
    path: ["Category entry", "Archive release", "Product grid", "Purchase path"],
    image: { src: "/images/case-studies/y2k/02-shop.webp", width: 1280, height: 3203 },
  },
  {
    id: "collections",
    index: "03",
    label: "Collections",
    name: "Collections",
    summary: "An archive of CYBERGLOSS collections presented as digital folders and image-led product groups.",
    note: "Each collection has its own cover, product group and navigation path.",
    sourceNode: "12:1330",
    modules: ["Capsule archive", "Collection cards", "Product families", "Archive navigation"],
    path: ["Collection index", "Capsule archive", "Product family", "Collection detail"],
    image: { src: "/images/case-studies/y2k/03-collections.webp", width: 1280, height: 4489 },
  },
  {
    id: "lookbook",
    index: "04",
    label: "Lookbook",
    name: "Lookbook",
    summary: "A long editorial page for campaign images, styling and seasonal looks.",
    note: "Image scale and pacing carry the page. Interface elements step back so the clothes remain the focus.",
    sourceNode: "12:2531",
    modules: ["Editorial hero", "Full-bleed imagery", "Look sequencing", "Closing editorial"],
    path: ["Lookbook opening", "Editorial spread", "Look sequence", "Closing chapter"],
    image: { src: "/images/case-studies/y2k/04-lookbook.webp", width: 1280, height: 3871 },
  },
  {
    id: "about",
    index: "05",
    label: "About",
    name: "About",
    summary: "The CYBERGLOSS brand story and references, told through archive panels and short editorial sections.",
    note: "The about page uses the same window and label system as the shop, so the brand history feels part of the site.",
    sourceNode: "12:3056",
    modules: ["Brand manifesto", "Cultural archive", "Editorial panels", "System history"],
    path: ["Brand opening", "Cultural context", "Archive evidence", "Brand statement"],
    image: { src: "/images/case-studies/y2k/05-about.webp", width: 1280, height: 4678 },
  },
  {
    id: "product-detail",
    index: "06",
    label: "Product detail",
    name: "Product detail",
    summary: "A product page with image gallery, material details, sizing, price and purchase controls.",
    note: "The retro interface frames the product without hiding the information needed to compare or buy it.",
    sourceNode: "12:3494",
    modules: ["Media viewer", "Material story", "Size specifications", "Recommendations"],
    path: ["Product identity", "Media viewer", "Material detail", "Specifications"],
    image: { src: "/images/case-studies/y2k/06-product-detail.webp", width: 1280, height: 4346 },
  },
  {
    id: "music-archive",
    index: "07",
    label: "Music archive",
    name: "Music archive",
    summary: "A CD-ROM-inspired music page with a track directory, player view and downloadable collection.",
    note: "The player is a visual concept, not a working audio product. It shows how far the software reference extends across the site.",
    sourceNode: "12:2",
    modules: ["Player hero", "CD-ROM collection", "Directory grid", "Download states"],
    path: ["MUSIC.DIR", "Player state", "Track archive", "Download output"],
    image: { src: "/images/case-studies/y2k/07-music-archive.webp", width: 1280, height: 1768 },
  },
  {
    id: "archive-community",
    index: "08",
    label: "Archive and community",
    name: "Archive and community",
    summary: "A combined archive and community area for fashion references, downloads and member contributions.",
    note: "Fashion images and community material are stored as files in the same brand archive.",
    sourceNode: "12:191",
    modules: ["Cultural archive", "Fashion artifacts", "Community terminal", "Downloads"],
    path: ["Archive entrance", "Cultural files", "Community layer", "Download state"],
    image: { src: "/images/case-studies/y2k/08-archive-community.webp", width: 1280, height: 2686 },
  },
  {
    id: "community-chat",
    index: "09",
    label: "Chat terminal",
    name: "Chat terminal",
    summary: "A chat interface styled as a desktop terminal, with contacts, conversation space and a compact status bar.",
    note: "The chat is part of the brand environment, presented as a desktop panel.",
    sourceNode: "12:492",
    modules: ["Terminal header", "Workspace", "Buddies online", "Compact footer"],
    path: ["Terminal login", "Workspace state", "Buddy presence", "Community exit"],
    image: { src: "/images/case-studies/y2k/09-community-chat.webp", width: 1280, height: 1070 },
  },
  {
    id: "submit-look",
    index: "10",
    label: "Submit your look",
    name: "Submit your look",
    summary: "A community submission form for uploading a look, adding profile details and contributing to the archive.",
    note: "The form keeps the same window and panel language while making the upload steps clear.",
    sourceNode: "12:679",
    modules: ["Submission hero", "Bento form", "Image upload", "Community submission"],
    path: ["Submission opening", "Profile field", "Image upload", "Archive entry"],
    image: { src: "/images/case-studies/y2k/10-submit-look.webp", width: 1280, height: 1101 },
  },
];

const responsePrinciples = [
  {
    index: "01",
    code: "ARCHIVE_STRUCTURE",
    title: "Archive structure",
    copy: "Window frames, file paths, folders and status bars do more than create a retro atmosphere. They divide content, signal hierarchy and orient the reader. Every page feels like a directory within the same brand archive, so users can read the visual identity and understand what they are browsing at the same time.",
  },
  {
    index: "02",
    code: "MODERN_LOGIC",
    title: "Modern logic",
    copy: "Product pages keep prices, materials, sizing and purchase paths; the lookbook uses contemporary editorial pacing; music and community interfaces provide clear states and actions. Beneath the retro surface, the shopping, browsing and communication logic remains familiar, so the visual language does not replace function.",
  },
  {
    index: "03",
    code: "TYPOGRAPHIC_RHYTHM",
    title: "Typographic rhythm",
    copy: "Long pages create rhythm between dense imagery, archive metadata, short labels and product information. Large images carry emotion, while modern grids, spacing and clear pauses support readability. High-density content keeps its visual impact without losing browsing order.",
  },
];

export default function Y2KCaseStudyPage() {
  const nextProject = getProject("petly-product")!;

  return (
    <Y2KPageProvider>
      <div className={`site-shell site-stack ${styles.page}`} data-cover-page>
        <CoverStopController />
        <div className={styles.heroStage}>
          <section className={`${styles.hero} tone-yellow`} aria-labelledby="y2k-title" data-cover-hero>
            <div className={styles.heroTop}>
              <Link href="/work" className={styles.backLink}>← <T text="Work index" /></Link>
              <span className={styles.heroIndex}>04 / <T text="CYBERGLOSS fashion website" /></span>

            </div>

            <div className={styles.heroContent}>
              <div className={styles.heroLead}>
                <div className={styles.heroCopy}>
                  <p className={styles.heroKicker}><T text="Fashion brand website / CYBERGLOSS" /></p>
                  <h1 id="y2k-title" className={styles.heroTitle}>
                    <span>Y2K</span>
                    <span><T text="Cybergloss" /></span>
                  </h1>
                </div>

                <div className={styles.heroLeadAside}>
                  <p className={styles.heroDeck}><T text="A fashion brand website for CYBERGLOSS. Desktop windows, file labels and terminal details connect product shopping, lookbooks, music and community pages." /></p>
                  <div className={styles.heroSlogan} aria-label="Y2K concept principles: Shop, Archive, Connect">
                    <span><i aria-hidden="true" /><T text="Shop." /></span>
                    <span><i aria-hidden="true" /><T text="Archive." /></span>
                    <span><i aria-hidden="true" /><T text="Connect." /></span>
                  </div>
                  <div className={styles.heroMetaRow}>
                    <span><T text="Role / Website design and art direction" /></span>
                    <span><T text="Scope / 10 desktop pages" /></span>
                    <span><T text="Canvas / 1280px" /></span>
                  </div>
                  <a href="#complete-pages" className={styles.primaryAction}><T text="Browse complete pages" /> <span>↓</span></a>
                </div>
              </div>

              <section className={styles.manifesto} aria-labelledby="y2k-context-title" data-cover-stop>
                <div className={styles.manifestoHeader}>
                  <h2 id="y2k-context-title">01 / <T text="Project background" /></h2>
                  <span>CYBERGLOSS / <T text="Fashion website" /></span>
                </div>

                <div className={styles.manifestoMain}>
                  <p className={styles.manifestoStatement}>
                    <span><T text="Commerce, archive and community" /></span>
                    <span><T text="inside one" /> <em><T text="2000-era desktop." /></em></span>
                  </p>
                  <p className={styles.manifestoIntro}><T text="CYBERGLOSS is a fashion brand concept. Its website uses desktop windows, file labels and terminal details to connect shopping, lookbooks, music and community. These references shape the navigation and page structure as well as the visual style." /></p>
                </div>

                <div className={styles.heroBrief} aria-label="Project context notes">
                  <article className={styles.heroBriefItem}>
                    <span>01</span>
                    <div><p><T text="Evidence boundary" /></p><p><T text="Independent concept design made without an original written brief." /></p></div>
                  </article>
                  <article className={styles.heroBriefItem}>
                    <span>02</span>
                    <div><p><T text="Visual direction" /></p><p><T text="Early-web software, fashion editorial, file directories and terminal UI." /></p></div>
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

        <section id="complete-pages" className={styles.pagesSection} data-cover-target aria-labelledby="y2k-pages-title">
          <div className={styles.sectionTopline}>
            <p className="mono-label">02 / <T text="Complete design pages" /></p>
            <p className="mono-label"><T text="10 pages / full-page source" /></p>
          </div>
          <header className={styles.pagesHeader}>
            <div>
              <p className={styles.sectionKicker}><T text="Complete page viewer" /></p>
              <h2 id="y2k-pages-title" className={styles.pagesTitle}><T text="Ten pages across the CYBERGLOSS site." /></h2>
            </div>
            <p className={styles.pagesIntro}><T text="Choose a page to inspect the full Figma layout. The viewer keeps the original composition and adds notes on the content and design." /></p>
          </header>
          <Y2KPageArchive pages={y2kPages} />
        </section>

        <Reveal>
          <section className={`${styles.responseSection} ${styles.archiveSection}`} aria-labelledby="y2k-response-title">
              <div className={styles.archiveTitlebar} aria-hidden="true">
                <span className={styles.archiveDots}><i /><i /><i /></span>
                <span className={styles.archiveWindowTitle}>CYBERGLOSS / SECTION_03 / DESIGN_RESPONSE</span>
                <span className={styles.archiveWindowMode}>10 PAGES / 1280</span>
              </div>
              <div className={styles.archivePathbar} aria-hidden="true">
                <span>ROOT / DESIGN_RESPONSE</span>
                <span>03 RECORDS</span>
              </div>
              <div className={styles.archiveBody}>
                <div className={styles.sectionTopline}>
                  <p className="mono-label">03 / <T text="Design response" /></p>
                  <p className="mono-label"><T text="Three archive records" /></p>
                </div>
                <header className={styles.responseHeader}>
                  <div>
                    <p className={styles.sectionKicker}><T text="How the archive becomes an interface" /></p>
                    <h2 id="y2k-response-title" className={styles.responseTitle}><T text="Retro archive, modern interface." /></h2>
                  </div>
                  <p className={styles.responseIntro}><T text="The core attempt behind CYBERGLOSS is not to reproduce a past decade, but to translate the language of 2000-era desktop archives into a modern website structure. Window frames, folders, paths, status bars and terminal interfaces become an information system, then are reorganised through contemporary product browsing, editorial layout and interaction logic. Period character, brand attitude and usability hold together." /></p>
                </header>
                <div className={styles.responseGrid}>
                  {responsePrinciples.map((principle) => (
                    <article key={principle.title} className={styles.responseCard}>
                      <div className={styles.responseFileTopline}>
                        <span className={styles.responseFileIndex}>{principle.index}</span>
                        <span className={styles.responseFileCode}>{principle.code}</span>
                      </div>
                      <h3><T text={principle.title} /></h3>
                      <p><T text={principle.copy} /></p>
                    </article>
                  ))}
                </div>
              </div>
              <div className={styles.archiveStatusbar} aria-hidden="true">
                <span>CYBERGLOSS ARCHIVE // DESIGN_RESPONSE</span>
                <span>READY</span>
              </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={styles.indexSection} aria-labelledby="y2k-complete-index-title">
            <div className={styles.sectionTopline}>
              <p className="mono-label">04 / <T text="Complete page index" /></p>
              <p className="mono-label"><T text="10 pages / select to open" /></p>
            </div>
            <header className={styles.indexHeader}>
              <div>
                <p className={styles.sectionKicker}><T text="Page index" /></p>
                <h2 id="y2k-complete-index-title" className={styles.indexTitle}><T text="Ten pages in one fashion site." /></h2>
              </div>
              <p className={styles.indexIntro}><T text="Open any page from this overview to inspect it in the viewer above." /></p>
            </header>
            <Y2KGallery pages={y2kPages} />
          </section>
        </Reveal>

        <section className={styles.nextChapter} aria-labelledby="y2k-next-title">
          <p className="mono-label"><T text="Next in the index /" /> {nextProject.index}</p>
          <Link href={nextProject.href} className={styles.nextMain} prefetch={false}>
            <div>
              <h2 id="y2k-next-title">{nextProject.title}</h2>
              <p><T text={nextProject.subtitle} /> · <T text={nextProject.category} /></p>
            </div>
            <p className={styles.nextStatus}><T text="Next is PETLY, a clickable app design case that shows both screen design and page logic across 20 routes." /></p>
            <ChapterEntryPlaque index={`NEXT / ${nextProject.index}`} tone="y2k"><T text="Continue browsing" /></ChapterEntryPlaque>
          </Link>
        </section>
      </div>
    </Y2KPageProvider>
  );
}


