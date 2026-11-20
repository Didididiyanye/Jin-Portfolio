import type { Metadata } from "next";
import { ReaderExperience } from "@/components/secondary/ReaderExperience";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jin Fanhao for visual UI, product, interface system and motion-led design conversations.",
};

export default function ContactPage() {
  return <ReaderExperience page="contact" />;
}
