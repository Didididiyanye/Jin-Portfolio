export type ProjectTone = "coral" | "blue" | "olive" | "mint" | "rose" | "yellow";

export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  discipline: string;
  evidence: string;
  description: string;
  href: string;
  externalHref?: string;
  image: string;
  heroImage: string;
  imageAlt: string;
  previewAspect: "portrait" | "landscape";
  tone: ProjectTone;
  available: boolean;
};

export const projects: Project[] = [
  {
    slug: "hape",
    index: "01",
    title: "HAPE",
    subtitle: "Brand Website Redesign",
    category: "Brand Website / Retail",
    discipline: "Web design · Art direction · Commerce",
    evidence: "8-page website concept",
    description:
      "A HAPE brand website redesign that connects product shopping, age-based discovery, learning content and the company's approach to play.",
    href: "/work/hape",
    image: "/images/projects/hape.png",
    heroImage: "/images/work/hape/homepage-hero-2x.png",
    imageAlt: "HAPE brand website redesign showing product categories and lifestyle photography",
    previewAspect: "landscape",
    tone: "olive",
    available: true,
  },
  {
    slug: "micro-world",
    index: "02",
    title: "Micro World",
    subtitle: "Insect Science Education",
    category: "Science Education / Website",
    discipline: "Web design · Information design · Illustration",
    evidence: "8-page website concept",
    description:
      "An insect science website that turns specimen photography, taxonomy, anatomy and habitat data into a browsable learning resource.",
    href: "/work/micro-world",
    image: "/images/projects/micro-world-card.webp",
    heroImage: "/images/projects/micro-world-card.webp",
    imageAlt: "Micro World insect science website showing specimen records and taxonomy",
    previewAspect: "landscape",
    tone: "mint",
    available: true,
  },
  {
    slug: "petly-interface",
    index: "03",
    title: "PETLY",
    subtitle: "Pet Care App",
    category: "Mobile App / Product Design",
    discipline: "App design · UX/UI · Visual system",
    evidence: "10-screen Figma app study",
    description:
      "An app design project for a new pet care product, covering home, pet profiles, health records, walks, care plans and onboarding.",
    href: "/work/petly-interface",
    image: "/images/projects/petly-interface.png",
    heroImage: "/images/projects/petly-interface.png",
    imageAlt: "PETLY pet care app interface showing a pet health dashboard",
    previewAspect: "portrait",
    tone: "rose",
    available: true,
  },
  {
    slug: "y2k",
    index: "04",
    title: "Y2K",
    subtitle: "CYBERGLOSS Brand Website",
    category: "Fashion / Brand Website",
    discipline: "Web design · Art direction · Brand identity",
    evidence: "10-page website concept",
    description:
      "A CYBERGLOSS fashion brand website that uses early-web software references to connect shopping, lookbooks, brand history and community pages.",
    href: "/work/y2k",
    image: "/images/projects/y2k-card.webp",
    heroImage: "/images/projects/y2k-card.webp",
    imageAlt: "CYBERGLOSS fashion brand website with product archive and editorial imagery",
    previewAspect: "landscape",
    tone: "yellow",
    available: true,
  },
  {
    slug: "petly-product",
    index: "05",
    title: "PETLY",
    subtitle: "App Design and User Flow",
    category: "Mobile App / Product Design",
    discipline: "App design · UX/UI · Interaction design",
    evidence: "Clickable 20-route prototype",
    description:
      "An app design and interaction case for a pet care product, showing the screen set and page logic from pet profiles and walks to appointments and veterinary advice.",
    href: "/work/petly-product",
    image: "/images/projects/petly-product.jpg",
    heroImage: "/images/projects/petly-product.jpg",
    imageAlt: "PETLY pet care app prototype showing pet profile and appointment screens",
    previewAspect: "portrait",
    tone: "coral",
    available: true,
  },
  {
    slug: "ui-motion",
    index: "06",
    title: "UI Motion",
    subtitle: "XG Fan Card Studio",
    category: "Motion / Web",
    discipline: "Creative Development · Motion · WebGL",
    evidence: "Working browser experiment",
    description:
      "A photo wall, card editor and 3D lanyard viewer built as one spatial, motion-led browsing experience.",
    href: "/work/ui-motion",
    externalHref: "https://didididiyanye.github.io/xgfanclub/",
    image: "/images/projects/ui-motion.jpg",
    heroImage: "/images/projects/ui-motion.jpg",
    imageAlt: "UI Motion photo-wall interface with editorial photography",
    previewAspect: "landscape",
    tone: "blue",
    available: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

