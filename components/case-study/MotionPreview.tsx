import Image from "next/image";

type MotionPreviewProps = {
  poster: string;
  posterAlt: string;
  title: string;
  description: string;
  videoSrc?: string;
};

export function MotionPreview({
  poster,
  posterAlt,
  title,
  description,
  videoSrc,
}: MotionPreviewProps) {
  return (
    <figure>
      <div className="media-shell aspect-video border border-rule bg-ink">
        {videoSrc ? (
          <video
            controls
            playsInline
            preload="metadata"
            poster={poster}
            className="h-full w-full object-cover"
          >
            <source src={videoSrc} />
            Your browser does not support the video element.
          </video>
        ) : (
          <>
            <Image
              src={poster}
              alt={posterAlt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 75vw, 100vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 border border-paper/40 bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-paper">
              Motion study
            </span>
          </>
        )}
      </div>
      <figcaption className="mt-4 grid gap-3 md:grid-cols-12">
        <p className="font-medium md:col-span-3">{title}</p>
        <p className="max-w-xl text-sm leading-relaxed text-muted md:col-span-6">
          {description}
        </p>
      </figcaption>
    </figure>
  );
}
