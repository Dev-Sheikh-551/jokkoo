"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxPhoto {
  src: string;
  caption?: string;
  alt: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  photos: LightboxPhoto[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({
  isOpen,
  currentIndex,
  photos,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        } else {
          onNavigate(photos.length - 1);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (currentIndex < photos.length - 1) {
          onNavigate(currentIndex + 1);
        } else {
          onNavigate(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !currentPhoto) return null;

  // Preload adjacent photos only
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
  const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
  const prevPhoto = photos.length > 1 ? photos[prevIndex] : null;
  const nextPhoto = photos.length > 1 ? photos[nextIndex] : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-0 h-full w-full max-h-none max-w-none bg-deep-slate/94 p-0 text-warm-bone backdrop:bg-deep-slate/94 outline-none overflow-hidden flex flex-col items-center justify-between"
    >
      {/* Top bar with counter & close */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-4 z-10">
        <span className="font-mono text-xs text-warm-bone/80">
          {currentIndex + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-warm-bone/10 text-warm-bone hover:bg-warm-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite transition-colors cursor-pointer"
          aria-label="Close photo preview"
          autoFocus
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Image Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center px-4 sm:px-12 py-2">
        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate(prevIndex)}
            className="absolute left-3 sm:left-6 z-20 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-warm-bone/10 text-warm-bone hover:bg-warm-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        <div className="relative w-full max-w-[1600px] h-full max-h-[75vh]">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1600px) 100vw, 1600px"
            quality={85}
            priority
          />
        </div>

        {/* Hidden preloads for adjacent photos */}
        {prevPhoto && (
          <div className="hidden" aria-hidden="true">
            <Image
              src={prevPhoto.src}
              alt=""
              width={1600}
              height={1000}
              priority
            />
          </div>
        )}
        {nextPhoto && nextPhoto.src !== prevPhoto?.src && (
          <div className="hidden" aria-hidden="true">
            <Image
              src={nextPhoto.src}
              alt=""
              width={1600}
              height={1000}
              priority
            />
          </div>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate(nextIndex)}
            className="absolute right-3 sm:right-6 z-20 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-warm-bone/10 text-warm-bone hover:bg-warm-bone/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Caption footer */}
      <div className="w-full text-center px-4 py-4 min-h-[60px] flex items-center justify-center">
        <p className="text-sm text-warm-bone/90 max-w-2xl">
          {currentPhoto.caption}
        </p>
      </div>
    </dialog>
  );
}
