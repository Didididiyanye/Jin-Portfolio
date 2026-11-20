import type { Metadata } from "next";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "@fontsource/quicksand/500.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlobalStage } from "@/components/layout/GlobalStage";
import { CaseStudyBackdrop } from "@/components/layout/CaseStudyBackdrop";
import { LanguageProvider } from "@/lib/i18n";
import { SkipLink } from "@/components/layout/SkipLink";

export const metadata: Metadata = {
  title: {
    default: "Jin Fanhao — Visual UI, Product & Creative Designer",
    template: "%s — Jin Fanhao",
  },
  description:
    "Portfolio of Jin Fanhao, a visual UI, product and creative designer working across interface systems, editorial layouts and motion-led digital experiences.",
  keywords: [
    "Jin Fanhao",
    "UI designer",
    "product designer",
    "creative designer",
    "interaction design",
    "portfolio",
  ],
  authors: [{ name: "Jin Fanhao" }],
  creator: "Jin Fanhao",
  openGraph: {
    type: "website",
    title: "Jin Fanhao — Visual UI, Product & Creative Designer",
    description:
      "Designing interfaces where clarity becomes character. Selected work across product systems, visual UI and motion.",
    siteName: "Jin Fanhao Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jin Fanhao — Visual UI, Product & Creative Designer",
    description: "Designing interfaces where clarity becomes character.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="day" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem("portfolio-theme");document.documentElement.dataset.theme=t==="night"?"night":"day";const l=localStorage.getItem("portfolio-language");const n=l==="zh"||l==="en"?l:(navigator.language||"en").toLowerCase().startsWith("zh")?"zh":"en";document.documentElement.lang=n==="zh"?"zh-CN":"en";document.documentElement.dataset.language=n}catch(e){}`,
          }}
        />
      </head>
      <body id="top">
        <LanguageProvider>
          <CaseStudyBackdrop />
          <GlobalStage />
          <SkipLink />
          <Navbar />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}



