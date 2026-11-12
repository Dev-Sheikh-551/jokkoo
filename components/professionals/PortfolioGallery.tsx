import { Camera } from "lucide-react";
import { PortfolioItem } from "@/types/professional";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface PortfolioGalleryProps {
  portfolio: PortfolioItem[];
}

export function PortfolioGallery({ portfolio }: PortfolioGalleryProps) {
  if (portfolio.length === 0) return null;

  return (
    <div className="rounded-[3px] border border-border-subtle bg-warm-bone p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-deep-slate flex items-center gap-2">
            <Camera className="h-4 w-4 text-laterite" />
            <span>Portfolio &amp; Documented Work</span>
          </h3>
          <p className="text-xs text-river-silt mt-1">
            Photographs of past installations, craftsmanship, and trade projects.
          </p>
        </div>
        <span className="text-xs text-river-silt font-medium">
          {portfolio.length} Projects
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune/20"
          >
            {/* Image placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <ImagePlaceholder
                tone="sand"
                label={item.tag}
                className="rounded-[2px] border-none"
              />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[2px] bg-deep-slate/85 backdrop-blur-sm text-[10px] font-semibold text-warm-bone">
                {item.completedYear}
              </div>
            </div>

            {/* Details */}
            <div className="p-4 space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-laterite">
                {item.tag}
              </span>
              <h4 className="text-sm font-semibold text-deep-slate leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-river-silt leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
