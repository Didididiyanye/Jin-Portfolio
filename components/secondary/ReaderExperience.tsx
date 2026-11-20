"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ReaderPage, type ReaderPageKey } from "./ReaderPage";
import styles from "./reader-page.module.css";
import { site } from "@/lib/site";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { useLanguage } from "@/lib/i18n";

type ReaderExperienceProps = {
  page: ReaderPageKey;
  mode?: "page" | "overlay";
  onClose?: () => void;
  onNavigate?: (page: ReaderPageKey) => void;
};

const definitions: Record<ReaderPageKey, {
  index: string;
  label: string;
  kicker: string;
  title: (language: "en" | "zh") => ReactNode;
  lead: string;
}> = {
  works: {
    index: "02",
    label: "Works",
    kicker: "Works / Selected projects",
    title: (language) => language === "zh" ? <>精选<em>作品</em></> : <>Selected <em>work.</em></>,
    lead: "Six projects across product systems, visual UI, editorial commerce and motion-led web experiences.",
  },
  about: {
    index: "01",
    label: "About",
    kicker: "About / Resume and practice",
    title: (language) => language === "zh" ? <>简历</> : <>UI designer with a hands-on <em>making practice.</em></>,
    lead: "I work across interface design, 3D modeling and AI-assisted animation. My background includes toy product development and project-led motion work.",
  },
  approach: {
    index: "03",
    label: "Approach",
    kicker: "Approach / Process and principles",
    title: (language) => language === "zh" ? <>从结构到表达</> : <>From structure{" "}<br /><em>to expression</em></>,
    lead: "Start with the problem, build the system, then complete the visual and interaction design.",
  },
  contact: {
    index: "04",
    label: "Contact",
    kicker: "Contact / Start a conversation",
    title: (language) => language === "zh" ? <>联系</> : <>Let&apos;s make it <em>memorable.</em></>,
    lead: "For product, interface, visual system or motion-led design conversations, use the address below.",
  },
};

function SectionCta({
  target,
  onNavigate,
  className,
  children,
}: {
  target: ReaderPageKey;
  onNavigate?: (page: ReaderPageKey) => void;
  className: string;
  children: ReactNode;
}) {
  if (onNavigate) {
    return (
      <button type="button" className={className} onClick={() => onNavigate(target)}>
        {children}
      </button>
    );
  }

  return (
    <Link href={`/${target}`} className={className}>
      {children}
    </Link>
  );
}

function AboutContent({ onNavigate }: { onNavigate?: (page: ReaderPageKey) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <section className={styles.resumeSection} aria-labelledby="about-profile-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Profile")}</p>
          <h2 id="about-profile-title" className={styles.resumeSectionTitle}>{t("Interface design, 3D and AI-assisted production.")}</h2>
        </div>
        <div className={styles.resumeBody}>
          <p>{t("I'm Jin Fanhao, a designer working across UI design, 3D modeling, visual design and AI-assisted animation.")}</p>
          <p>{t("I have worked on toy product development, including model design for furniture role-play and ride-on toy series, as well as sticker artwork, layout and product introduction videos. AI supports my animation, short video and visual asset production, so my work moves between interfaces, models and motion.")}</p>
        </div>
      </section>

      <div className={[styles.metaGrid, styles.aboutMetaGrid].join(" ")}>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Target role")}</p>
          <strong>{t("UI Designer")}</strong>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Hometown")}</p>
          <strong>{t("Taizhou, Zhejiang, China")}</strong>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Gender")}</p>
          <strong>{t("Male")}</strong>
        </div>
      </div>

      <section className={styles.resumeSection} aria-labelledby="about-education-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Education")}</p>
          <h2 id="about-education-title" className={styles.resumeSectionTitle}>{t("Zhejiang Wanli University")}</h2>
          <p className={styles.resumeSectionMeta}>{t("Bachelor's degree in Art and Technology / Sep 2022 to Jun 2026")}</p>
        </div>
        <div className={styles.resumeBody}>
          <p>{t("Relevant coursework included AI generation, interactive prototype design, fundamentals of brand design, motion image design and cross-media integration.")}</p>
          <div className={styles.chips} aria-label={t("Relevant coursework")}>
            {["AI generation", "Interactive prototype design", "Brand design fundamentals", "Motion image design", "Cross-media integration"].map((item) => <span key={item}>{t(item)}</span>)}
          </div>
        </div>
      </section>

      <section className={styles.resumeSection} aria-labelledby="about-skills-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Skills")}</p>
          <h2 id="about-skills-title" className={styles.resumeSectionTitle}>{t("Tools and capabilities.")}</h2>
        </div>
        <div className={styles.skillModules} aria-label={t("Skill groups")}>
          <article className={styles.skillModule}>
            <div className={styles.skillModuleHeader}>
              <p className={styles.cardIndex}>{t("Design tools")}</p>
              <h3 className={styles.skillModuleTitle}>{t("Software I use.")}</h3>
            </div>
            <ul className={styles.skillList}>
              <li>Figma</li>
              <li>Stitch</li>
              <li>Photoshop</li>
              <li>Adobe Illustrator</li>
              <li>Codex</li>
              <li>Midjourney</li>
            </ul>
          </article>
          <article className={styles.skillModule}>
            <div className={styles.skillModuleHeader}>
              <p className={styles.cardIndex}>{t("Core skills")}</p>
              <h3 className={styles.skillModuleTitle}>{t("What I make.")}</h3>
            </div>
            <ul className={styles.skillList}>
              <li>{t("UI design")}</li>
              <li>{t("3D modeling")}</li>
              <li>{t("AI generation")}</li>
              <li>{t("Poster design")}</li>
              <li>{t("Brand visual design")}</li>
            </ul>
          </article>
          <article className={styles.skillModule}>
            <div className={styles.skillModuleHeader}>
              <p className={styles.cardIndex}>{t("Additional tools")}</p>
              <h3 className={styles.skillModuleTitle}>{t("AI and 3D.")}</h3>
            </div>
            <ul className={styles.skillList}>
              <li>Gemini</li>
              <li>{t("ChatGPT for prompt writing")}</li>
              <li>Blender</li>
              <li>Lovart</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.resumeSection} aria-labelledby="about-experience-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Experience")}</p>
          <h2 id="about-experience-title" className={styles.resumeSectionTitle}>{t("Product development and AI animation.")}</h2>
        </div>
        <div className={styles.experienceList}>
          <article className={styles.experienceItem}>
            <div className={styles.experiencePeriod}>
              <span>{t("Oct 2025 to Jan 2026")}</span>
              <span>{t("Ningbo, China")}</span>
            </div>
            <div className={styles.experienceContent}>
              <p className={styles.experienceCompany}>{t("Ningbo Yiren Toy Co., Ltd.")}</p>
              <h3>{t("3D Modeling Design Intern")}</h3>
              <ul className={styles.experienceBullets}>
                <li>{t("Designed and developed 3D models for the furniture role-play product series.")}</li>
                <li>{t("Designed and optimized models for the ride-on toy series.")}</li>
                <li>{t("Completed sticker artwork for the crayon series.")}</li>
                <li>{t("Supported the team with UI interface improvements, manual layout and proofreading.")}</li>
                <li>{t("Produced and edited introduction videos for product play proposals.")}</li>
              </ul>
            </div>
          </article>

          <article className={styles.experienceItem}>
            <div className={styles.experiencePeriod}>
              <span>{t("Mar 2026 to May 2026")}</span>
              <span>{t("Hangzhou, China")}</span>
            </div>
            <div className={styles.experienceContent}>
              <p className={styles.experienceCompany}>{t("Hangzhou Network Technology Co., Ltd.")}</p>
              <h3>{t("AI Animator")}</h3>
              <ul className={styles.experienceBullets}>
                <li>{t("Used generative AI tools to create animation, short video and visual assets, covering ideation, prompt design, image generation, animation and post-production.")}</li>
                <li>{t("Wrote and iterated prompts from scripts, storyboards and visual requirements, with attention to consistency in characters, scenes, camera movement, lighting and visual style.")}</li>
                <li>{t("Used Midjourney, Kling, Dreamina and Lovart to generate characters, scenes and motion assets, then edited, composited and refined them in post-production.")}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.resumeSection} aria-labelledby="about-campus-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Campus experience")}</p>
          <h2 id="about-campus-title" className={styles.resumeSectionTitle}>{t("Youth Volunteer Association.")}</h2>
        </div>
        <div className={styles.resumeBody}>
          <p>{t("I was a member of the Youth Volunteer Association and took part in and organized several volunteer activities.")}</p>
          <p>{t("From 2022 to 2024, I planned and organized the Mantianxing (A Sky Full of Stars) activity. It was intended to enrich daily life for the special groups it served.")}</p>
        </div>
      </section>

      <section className={styles.resumeSection} aria-labelledby="about-evaluation-title">
        <div className={styles.resumeSectionHeader}>
          <p className={styles.sectionLabel}>{t("Self-evaluation")}</p>
          <h2 id="about-evaluation-title" className={styles.resumeSectionTitle}>{t("Visual judgment, fast learning and practical AI use.")}</h2>
        </div>
        <div className={styles.resumeBody}>
          <p>{t("I have a foundation in visual aesthetics and learn quickly. I use AI technologies to support and improve content production efficiency.")}</p>
        </div>
      </section>

      <div className={styles.ctaRow}>
        <Link href="/?section=works" className={styles.cta}>{t("View selected work")} <span aria-hidden="true">↗</span></Link>
        <SectionCta target="approach" onNavigate={onNavigate} className={[styles.cta, styles.ctaSecondary].join(" ")}>
          {t("Read the approach")} <span aria-hidden="true">→</span>
        </SectionCta>
      </div>
    </>
  );
}

function ApproachContent({ onNavigate }: { onNavigate?: (page: ReaderPageKey) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <section className={styles.approachIntro} aria-labelledby="approach-model-title">
        <h2 id="approach-model-title" className={styles.approachIntroTitle}>
          {t("A connected way of working.")}
        </h2>
        <div className={styles.approachIntroCopy}>
          <p>{t("Good digital work is not a pile of isolated screens. It is a connected system of information, behaviours and visual signals that helps people understand where they are and what comes next.")}</p>
          <p>{t("I usually move from structure to expression: define the task and context, map the content hierarchy, and establish reusable rules for layout, type, colour and components. I then use material, motion and detail to give the system its own point of view. AI helps with research sorting, comparing directions, interface drafts, local asset generation, and checking bilingual length and repeated wording. It speeds up exploration, but it does not decide whether the problem is defined, the hierarchy holds or the interaction works.")}</p>
        </div>
      </section>

      <section className={styles.approachMethod} aria-labelledby="approach-process-title">
        <header className={styles.approachMethodHeader}>
          <h2 id="approach-process-title" className={styles.approachMethodTitle}>
            {t("From problem to validation")}
          </h2>
          <p className={styles.approachMethodSummary}>{t("Each stage resolves one kind of uncertainty before the next begins. Decisions stay visible instead of disappearing between screens.")}</p>
        </header>
        <ol className={styles.approachSteps}>
          <li className={styles.approachStep}>
            <h3>{t("Frame the problem")}</h3>
            <p>{t("Define the audience, content, constraints and decisions the interface must support. Sort the reference material and decide where AI can usefully contribute.")}</p>
          </li>
          <li className={styles.approachStep}>
            <h3>{t("Build the system")}</h3>
            <p>{t("Define flows, layouts, type, colour and component rules first. Then use AI to generate direction variants and interface drafts, and bring only the useful parts back into the system.")}</p>
          </li>
          <li className={styles.approachStep}>
            <h3>{t("Prove the experience")}</h3>
            <p>{t("Test the system through working interactions and edge states. AI can draft assets and state variations; timing and usability still need direct review.")}</p>
          </li>
        </ol>
      </section>

      <section className={styles.approachPrinciples} aria-labelledby="approach-principles-title">
        <header className={styles.approachPrinciplesHeader}>
          <h2 id="approach-principles-title" className={styles.approachPrinciplesTitle}>
            {t("Design and AI collaboration")}
          </h2>
        </header>
        <div className={styles.approachPrincipleList}>
          <article className={styles.approachPrinciple}>
            <h3>{t("Structure first")}</h3>
            <p>{t("Clarify the task, information hierarchy and use context first. AI can sort material, break down pages and draft screens, but I still decide whether the structure holds.")}</p>
          </article>
          <article className={styles.approachPrinciple}>
            <h3>{t("Rules before variants")}</h3>
            <p>{t("Define type, colour, spacing and component rules first. Then use AI to generate variants, bilingual length tests and edge states, and keep only what still belongs inside the system.")}</p>
          </article>
          <article className={styles.approachPrinciple}>
            <h3>{t("Results must be verified")}</h3>
            <p>{t("Use visual and motion decisions to clarify hierarchy and state changes. AI is useful for exploring sequences, assets and transition drafts; timing, pacing and the final interaction still need direct review.")}</p>
          </article>
        </div>
      </section>

      <div className={styles.ctaRow}>
        <SectionCta target="about" onNavigate={onNavigate} className={styles.cta}>
          {t("More about the practice")} <span aria-hidden="true">→</span>
        </SectionCta>
        <SectionCta target="contact" onNavigate={onNavigate} className={`${styles.cta} ${styles.ctaSecondary}`}>
          {t("Start a conversation")} <span aria-hidden="true">↗</span>
        </SectionCta>
      </div>
    </>
  );
}
function ContactContent({ onNavigate }: { onNavigate?: (page: ReaderPageKey) => void }) {
  const { t } = useLanguage();
  return (
    <>
      <a href={"mailto:" + site.email} className={styles.emailBlock}>
        <span>{site.email}</span>
        <span aria-hidden="true">↗</span>
      </a>

      <a href={`mailto:${site.alternativeEmail}`} className={styles.alternateEmail}>
        <span className={styles.alternateEmailLabel}>{t("Also reach me at")}</span>
        <span className={styles.alternateEmailAddress}>{site.alternativeEmail}</span>
        <span className={styles.alternateEmailArrow} aria-hidden="true">↗</span>
      </a>

      <section className={styles.contactBrief} aria-labelledby="contact-brief-title">
        <header className={styles.contactBriefHeader}>
          <h2 id="contact-brief-title" className={styles.contactBriefTitle}>
            {t("What to include.")}
          </h2>
        </header>
        <div className={styles.contactBriefBody}>
          <p className={styles.contactBriefLead}>{t("A few clear lines are enough to begin.")}</p>
          <ul className={styles.contactTopicList} aria-label={t("Useful details to include")}>
            <li>{t("The project context")}</li>
            <li>{t("What needs to change")}</li>
            <li>{t("The experience you want to create")}</li>
          </ul>
          <p>{t("I'm open to product design, interface systems, visual identities for digital products and motion-led portfolio or campaign experiences.")}</p>
        </div>
      </section>

      <div className={styles.metaGrid}>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Product")}</p>
          <strong>{t("Product systems")}</strong>
          <small>{t("Flows, information architecture, UI systems and interactive prototypes.")}</small>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Visual")}</p>
          <strong>{t("Digital art direction")}</strong>
          <small>{t("Visual languages, editorial interfaces and responsive component systems.")}</small>
        </div>
        <div className={styles.metaCard}>
          <p className={styles.sectionLabel}>{t("Motion")}</p>
          <strong>{t("Interaction and motion")}</strong>
          <small>{t("State transitions, spatial interaction and motion-led web experiences.")}</small>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Link href="/?section=works" className={styles.cta}>{t("View selected work")} <span aria-hidden="true">↗</span></Link>
        <SectionCta target="about" onNavigate={onNavigate} className={styles.cta + " " + styles.ctaSecondary}>
          {t("Read about the practice")} <span aria-hidden="true">→</span>
        </SectionCta>
      </div>
    </>
  );
}

export function ReaderExperience({ page, mode = "page", onClose, onNavigate }: ReaderExperienceProps) {
  const { language, t } = useLanguage();
  const definition = definitions[page];

  return (
    <ReaderPage
      page={page}
      {...definition}
      label={t(definition.label)}
      kicker={t(definition.kicker)}
      title={definition.title(language)}
      lead={t(definition.lead)}
      showHero={page !== "works"}
      mode={mode}
      onBack={onClose}
      onNavigate={onNavigate}
    >
      {page === "works" ? <FeaturedProject variant="overlay" /> : null}
      {page === "about" ? <AboutContent onNavigate={mode === "overlay" ? onNavigate : undefined} /> : null}
      {page === "approach" ? <ApproachContent onNavigate={mode === "overlay" ? onNavigate : undefined} /> : null}
      {page === "contact" ? <ContactContent onNavigate={mode === "overlay" ? onNavigate : undefined} /> : null}
    </ReaderPage>
  );
}

