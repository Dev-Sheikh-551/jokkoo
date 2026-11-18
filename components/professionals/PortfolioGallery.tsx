"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import type { LightboxPhoto } from "@/components/professionals/GalleryLightbox";
import { categoryMedia } from "@/lib/media";

const GalleryLightbox = dynamic(
  () =>
    import("@/components/professionals/GalleryLightbox").then(
      (m) => m.GalleryLightbox
    ),
  { ssr: false }
);

export interface WorkPhoto {
  src: string;
  caption?: string;
}

interface PortfolioGalleryProps {
  workPhotos: WorkPhoto[];
  displayName?: string;
  primaryCategorySlug?: string;
}

export function PortfolioGallery({
  workPhotos,
  displayName = "Professional",
  primaryCategorySlug,
}: PortfolioGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const lastActiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [mobileScrollIndex, setMobileScrollIndex] = useState(0);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll position on mobile to update counter
  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      const scrollLeft = scroller.scrollLeft;
      const width = scroller.clientWidth;
      if (width > 0) {
        const index = Math.round(scrollLeft / width);
        setMobileScrollIndex(Math.min(Math.max(0, index), (workPhotos?.length ?? 1) - 1));
      }
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [workPhotos?.length]);

  // If 0 photos, fallback to ImagePlaceholder
  if (!workPhotos || workPhotos.length === 0) {
    return (
      <div className="relative aspect-16/10 w-full overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/40">
        <ImagePlaceholder
          tone="sand"
          label="No work photos uploaded yet"
          className="h-full w-full border-none"
        />
      </div>
    );
  }

  const count = workPhotos.length;

  // Resolve object position from categoryMedia config
  const matchedMedia = primaryCategorySlug
    ? categoryMedia[primaryCategorySlug]
    : Object.values(categoryMedia).find((m) => m.src === workPhotos?.[0]?.src);
  const objectPosition = matchedMedia?.objectPosition ?? "center";

  const lightboxPhotos: LightboxPhoto[] = workPhotos.map((photo, i) => ({
    src: photo.src,
    caption: photo.caption || `${displayName}: work photo ${i + 1} of ${count}`,
    alt: photo.caption || `${displayName}: work photo ${i + 1} of ${count}`,
  }));

  const openLightbox = (index: number, triggerEl?: HTMLButtonElement | null) => {
    lastActiveTriggerRef.current = triggerEl ?? null;
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    if (lastActiveTriggerRef.current) {
      lastActiveTriggerRef.current.focus();
    }
  };

  return (
    <section aria-label="Work photos gallery" className="w-full">
      {/* MOBILE LAYOUT (< lg): Single large view or swipeable carousel with 1 / N chip */}
      <div className="lg:hidden relative">
        <div
          ref={mobileScrollerRef}
          className={`flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none ${
            count === 1 ? "aspect-16/9 max-h-[520px]" : "aspect-4/3"
          } rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/30`}
        >
          {workPhotos.map((photo, i) => (
            <button
              key={photo.src + i}
              type="button"
              onClick={(e) => openLightbox(i, e.currentTarget)}
              className="relative shrink-0 w-full h-full snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
              aria-label={`View photo ${i + 1} of ${count} in full size`}
            >
              <Image
                src={photo.src}
                alt={photo.caption || `${displayName}: work photo ${i + 1}`}
                fill
                priority={i === 0}
                className="object-cover"
                style={{ objectPosition }}
                sizes="(max-width: 1023px) 100vw, 1px"
                quality={75}
              />
            </button>
          ))}
        </div>

        {/* Counter Chip on mobile */}
        {count > 1 && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-deep-slate/85 backdrop-blur-xs text-[11px] font-mono text-warm-bone pointer-events-none">
            {mobileScrollIndex + 1} / {count}
          </div>
        )}
      </div>

      {/* DESKTOP ADAPTIVE LAYOUT (>= lg):
          1 photo: 16:9 frame (max height 520px) with object-position from config
          2 photos: 2 equal columns
          3 photos: large left (2fr) plus 2 stacked right (1fr)
          4+ photos: large left (2fr) plus 2x2 grid right (up to 4 shown, with '+N photos' overlay if > 5)
      */}
      <div className="hidden lg:block w-full">
        {count === 1 && (
          <div className="relative w-full aspect-16/9 max-h-[520px] max-w-[924px] mx-auto overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/20">
            <button
              type="button"
              onClick={(e) => openLightbox(0, e.currentTarget)}
              className="relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer block"
              aria-label="View photo in full size"
            >
              <Image
                src={workPhotos[0].src}
                alt={workPhotos[0].caption || `${displayName}: work photo 1`}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                style={{ objectPosition }}
                sizes="(min-width: 1024px) 924px, 1px"
                quality={75}
              />
            </button>
          </div>
        )}

        {count === 2 && (
          <div className="grid grid-cols-2 gap-3 h-[420px] rounded-[var(--radius-card,1.5rem)] overflow-hidden border border-border-subtle bg-sand-dune/20">
            {workPhotos.map((photo, i) => (
              <button
                key={photo.src + i}
                type="button"
                onClick={(e) => openLightbox(i, e.currentTarget)}
                className="relative h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
                aria-label={`View photo ${i + 1} of 2 in full size`}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption || `${displayName}: work photo ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 640px, 1px"
                  quality={75}
                />
              </button>
            ))}
          </div>
        )}

        {count === 3 && (
          <div className="grid grid-cols-3 gap-3 h-[440px] rounded-[var(--radius-card,1.5rem)] overflow-hidden border border-border-subtle bg-sand-dune/20">
            {/* Large Left Tile (spans 2 cols) */}
            <button
              type="button"
              onClick={(e) => openLightbox(0, e.currentTarget)}
              className="col-span-2 relative h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
              aria-label="View main photo in full size"
            >
              <Image
                src={workPhotos[0].src}
                alt={workPhotos[0].caption || `${displayName}: work photo 1`}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 800px, 1px"
                quality={75}
              />
            </button>

            {/* Stacked Right Tiles (2 rows in 1 col) */}
            <div className="col-span-1 grid grid-rows-2 gap-3 h-full">
              {workPhotos.slice(1, 3).map((photo, idx) => {
                const actualIndex = idx + 1;
                return (
                  <button
                    key={photo.src + actualIndex}
                    type="button"
                    onClick={(e) => openLightbox(actualIndex, e.currentTarget)}
                    className="relative h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
                    aria-label={`View photo ${actualIndex + 1} of 3 in full size`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption || `${displayName}: work photo ${actualIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 440px, 1px"
                      quality={75}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {count >= 4 && (
          <div className="grid grid-cols-12 gap-3 h-[450px] rounded-[var(--radius-card,1.5rem)] overflow-hidden border border-border-subtle bg-sand-dune/20">
            {/* Large Left Tile (7 cols) */}
            <button
              type="button"
              onClick={(e) => openLightbox(0, e.currentTarget)}
              className="col-span-7 relative h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
              aria-label="View main photo in full size"
            >
              <Image
                src={workPhotos[0].src}
                alt={workPhotos[0].caption || `${displayName}: work photo 1`}
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 750px, 1px"
                quality={75}
              />
            </button>

            {/* Right 2x2 Grid (5 cols) */}
            <div className="col-span-5 grid grid-cols-2 grid-rows-2 gap-3 h-full">
              {workPhotos.slice(1, Math.min(5, count)).map((photo, idx) => {
                const actualIndex = idx + 1;
                const isLastVisibleTile = idx === 3;
                const hasMore = count > 5;

                return (
                  <button
                    key={photo.src + actualIndex}
                    type="button"
                    onClick={(e) => openLightbox(actualIndex, e.currentTarget)}
                    className="relative h-full w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite group cursor-pointer"
                    aria-label={
                      isLastVisibleTile && hasMore
                        ? `Show all ${count} photos`
                        : `View photo ${actualIndex + 1} of ${count} in full size`
                    }
                  >
                    <Image
                      src={photo.src}
                      alt={photo.caption || `${displayName}: work photo ${actualIndex + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 250px, 1px"
                      quality={75}
                    />

                    {isLastVisibleTile && hasMore && (
                      <div className="absolute inset-0 bg-deep-slate/60 backdrop-blur-xs flex items-center justify-center p-2 text-center transition-opacity group-hover:bg-deep-slate/70">
                        <span className="font-sans text-xs sm:text-sm font-semibold text-warm-bone">
                          Show all {count} photos
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Dialog Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        currentIndex={activePhotoIndex}
        photos={lightboxPhotos}
        onClose={closeLightbox}
        onNavigate={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </section>
  );
}
