import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { PracticeAbout } from "@/components/home/PracticeAbout";

export const metadata: Metadata = {
  title: "Long-form portfolio",
  description:
    "The scroll-based edition of Jin Fanhao's portfolio, including selected work, practice, about and contact.",
};

export default function LongformPage() {
  return (
    <div className="site-shell site-stack">
      <Hero />
      <FeaturedProject />
      <PracticeAbout />
    </div>
  );
}
