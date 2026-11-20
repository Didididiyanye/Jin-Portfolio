import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";

export const metadata: Metadata = {
  title: "Visual UI, Product & Creative Designer",
  description:
    "Selected work by Jin Fanhao across product design, visual UI, editorial systems and motion-led digital experiences.",
};

export default function HomePage() {
  return (
    <div className="site-shell site-stack home-only">
      <HomeHero />
    </div>
  );
}
