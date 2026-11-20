import type { Metadata } from "next";
import { ReaderExperience } from "@/components/secondary/ReaderExperience";

export const metadata: Metadata = {
  title: "About",
  description:
    "The resume and practice of Jin Fanhao, a UI designer with experience in 3D modeling, visual design and AI-assisted animation.",
};

export default function AboutPage() {
  return <ReaderExperience page="about" />;
}
