import Image from "next/image";

type CaseStudyHeroProps = {
  index: string;
  title: string;
  subtitle: string;
  summary: string;
  role: string;
  scope: string;
  evidence: string;
  image: string;
  imageAlt: string;
};

export function CaseStudyHero({
  index,
  title,
  subtitle,
  summary,
  role,
  scope,
  evidence,
  image,
  imageAlt,
}: CaseStudyHeroProps) {
  return (
    <section className="pt-[calc(var(--header-height)+clamp(4rem,8vw,8rem))]">
      <div className="site-container">
        <div className="editorial-grid border-t border-rule pt-5">
          <p className="eyebrow col-span-1 text-muted">{index}</p>
          <p className="eyebrow col-span-3 text-right text-muted md:col-span-7 md:text-left lg:col-span-11">
            {subtitle}
          </p>
        </div>

        <div className="editorial-grid mt-12 md:mt-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <h1 className="text-balance font-sans text-[clamp(4rem,15vw,12rem)] leading-[0.82] tracking-[-0.05em]">
              {title}
            </h1>
          </div>
          <p className="col-span-4 mt-8 max-w-xl text-pretty text-lg leading-[1.5] text-muted md:col-span-5 md:col-start-2 md:mt-12 lg:col-span-5 lg:col-start-4 lg:text-xl">
            {summary}
          </p>
        </div>

        <dl className="editorial-grid mt-16 gap-y-6 border-y border-rule py-6 md:mt-24 md:py-8">
          <div className="col-span-4 md:col-span-2">
            <dt className="eyebrow text-muted">Role</dt>
            <dd className="mt-2 text-sm leading-relaxed">{role}</dd>
          </div>
          <div className="col-span-4 md:col-span-3">
            <dt className="eyebrow text-muted">Scope</dt>
            <dd className="mt-2 text-sm leading-relaxed">{scope}</dd>
          </div>
          <div className="col-span-4 md:col-span-3">
            <dt className="eyebrow text-muted">Evidence</dt>
            <dd className="mt-2 text-sm leading-relaxed">{evidence}</dd>
          </div>
        </dl>
      </div>

      <div className="site-container mt-8 md:mt-12">
        <div className="media-shell aspect-[4/3] md:aspect-[16/9]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}

