import Image from "next/image";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface WorkPhoto {
  src: string;
  caption?: string;
}

interface PortfolioGalleryProps {
  workPhotos: WorkPhoto[];
  isSample?: boolean;
}

export function PortfolioGallery({
  workPhotos,
}: PortfolioGalleryProps) {
  if (workPhotos.length === 0) return null;

  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-deep-slate">Work photos</h3>
        <span className="text-xs text-river-silt">
          {workPhotos.length} photo{workPhotos.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workPhotos.map((photo, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune/20"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt={photo.caption ?? "Work photo"}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 400px, 100vw"
                  quality={75}
                />
              ) : (
                <ImagePlaceholder
                  tone="sand"
                  label={photo.caption ?? "Work photo"}
                  className="rounded-[2px] border-none"
                />
              )}
            </div>
            {photo.caption && (
              <div className="p-3 text-xs text-river-silt">{photo.caption}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
