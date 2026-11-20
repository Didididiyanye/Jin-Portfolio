"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className="bg-ink text-bone">
      <div className="site-container py-[var(--section-space)]">
        <div className="editorial-grid">
          <p className="eyebrow col-span-4 mb-8 text-bone/50 md:col-span-3 lg:col-span-2">
            04 / Contact
          </p>

          <div className="col-span-4 md:col-span-8 lg:col-span-10">
            <h2 className="max-w-[12ch] text-balance font-sans text-[clamp(4rem,12vw,11rem)] leading-[0.84] tracking-[-0.045em]">
              Let&apos;s make something clear.
            </h2>
          </div>
        </div>

        <div className="editorial-grid mt-16 gap-y-8 border-t border-bone/20 pt-6 md:mt-24">
          <p className="col-span-4 max-w-sm text-[0.9375rem] leading-[1.62] text-bone/75 md:col-span-3 lg:col-span-3">
            For product, interface, visual system or motion-led design
            conversations, use the address below.
          </p>

          <div className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-4">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-h-14 items-center gap-3 font-sans text-[clamp(1.75rem,4vw,4rem)] leading-none tracking-[-0.025em]"
            >
              <span className="link-line">{site.email}</span>
              <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-8" />
            </a>
          </div>

          <div className="col-span-4 flex items-start md:col-span-2 md:col-start-9 lg:col-span-2 lg:col-start-11">
            <button
              type="button"
              onClick={copyEmail}
              className="touch-target inline-flex items-center justify-center border border-bone/30 px-4 text-xs uppercase tracking-[0.08em] transition-colors hover:border-bone hover:bg-bone hover:text-ink"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied to clipboard." : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

