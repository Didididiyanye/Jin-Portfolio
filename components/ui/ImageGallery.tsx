import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
};

type ImageGalleryProps = {
  images: GalleryImage[];
  className?: string;
};

const aspectClasses: Record<NonNullable<GalleryImage["aspect"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  return (
    <div className={`grid gap-x-5 gap-y-12 md:grid-cols-12 ${className}`}>
      {images.map((image, index) => (
        <figure
          key={image.src}
          className={
            index % 3 === 0
              ? "md:col-span-7"
              : index % 3 === 1
                ? "md:col-span-5 md:mt-20"
                : "md:col-span-6"
          }
        >
          <div className={`media-shell ${aspectClasses[image.aspect ?? "landscape"]}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 55vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3 max-w-[var(--caption-width)] text-sm leading-relaxed text-muted">
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
