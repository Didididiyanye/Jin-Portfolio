import type { Metadata } from "next";
import { ReaderExperience } from "@/components/secondary/ReaderExperience";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Jin Fanhao's approach to product structure, visual systems, prototyping, AI-assisted design and motion-led digital experiences.",
};

export default function ApproachPage() {
  return <ReaderExperience page="approach" />;
}
