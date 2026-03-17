"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { GalleryImage } from "@/lib/site-data";

export function ProjectGallery({
  images,
  productName,
}: {
  images: GalleryImage[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  const activeImage = images[activeIndex] ?? images[0] ?? null;
  const hasMultipleImages = images.length > 1;
  const isPaused = isHovered || isFocusWithin;

  useEffect(() => {
    if (!hasMultipleImages || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [hasMultipleImages, images.length, isPaused]);

  if (!activeImage) {
    return null;
  }

  return (
    <section
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocusWithin(true)}
      onBlurCapture={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) {
          return;
        }

        setIsFocusWithin(false);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-[color:var(--line)] bg-[color:var(--surface)]">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(min-width: 1320px) 670px, (min-width: 1024px) calc(54vw - 32px), calc(100vw - 48px)"
          className="animate-gallery-fade object-cover"
        />
      </div>

      {hasMultipleImages ? (
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <div className="flex min-w-max gap-3">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show ${productName} image ${index + 1}`}
                aria-pressed={index === activeIndex}
                className={`relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-[16px] border bg-[color:var(--surface)] transition duration-300 md:w-32 ${
                  index === activeIndex
                    ? "border-[color:var(--accent)]"
                    : "border-[color:var(--line)] hover:border-[color:var(--accent-soft)]"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="128px"
                  className="object-cover transition duration-300 hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
