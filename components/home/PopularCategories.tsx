import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { categoryMedia } from "@/lib/media";
import { buildExploreHref } from "@/lib/search";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { CategoryRevealWrapper } from "@/components/home/CategoryRevealWrapper";
import { cn } from "@/lib/utils";

export function PopularCategories() {
  return (
    <section className="py-16 lg:py-24 border-b border-border-subtle bg-warm-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 lg:mb-12">
          <h2 className="font-serif font-medium text-[clamp(2rem,4vw,2.75rem)] tracking-tight text-deep-slate leading-tight">
            What do you need done?
          </h2>
        </div>

        {/* Desktop: 4 columns, auto-rows ~200px, 1st tile spans 2 cols and 2 rows */}
        <CategoryRevealWrapper className="hidden lg:grid grid-cols-4 auto-rows-[200px] gap-4">
          {CATEGORIES.map((category, index) => {
            const isLarge = index === 0;
            const media = categoryMedia[category.slug];
            const tone = media?.tone ?? (isLarge ? "clay" : "sand");

            return (
              <Link
                key={category.slug}
                href={buildExploreHref({ category: category.slug })}
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/40 transition-all duration-200 hover:border-deep-slate/40",
                  isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                )}
              >
                {/* ImagePlaceholder renders as background fallback if the photo fails to load */}
                <div aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <ImagePlaceholder
                    tone={tone}
                    label=""
                    className="h-full w-full border-none"
                  />
                </div>
                {media?.src && (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes={
                      isLarge
                        ? "(min-width: 1024px) 600px, 100vw"
                        : "(min-width: 1024px) 280px, 50vw"
                    }
                    quality={75}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: media.objectPosition ?? "center" }}
                  />
                )}

                <div className="absolute bottom-4 left-4 z-10 rounded-full bg-warm-bone px-3.5 py-1.5 shadow-xs border border-border-subtle/50">
                  <span className="text-xs font-semibold text-deep-slate block">
                    {category.shortName}
                  </span>
                  {isLarge && (
                    <span className="text-[11px] text-river-silt block mt-0.5">
                      {category.tagline}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </CategoryRevealWrapper>

        {/* Mobile: Horizontal scroll-snap row, ~150px wide by 190px tall, 20px edge padding */}
        <div className="lg:hidden">
          <CategoryRevealWrapper>
            <div className="-mx-4 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 pt-1">
              {CATEGORIES.map((category) => {
                const media = categoryMedia[category.slug];
                const tone = media?.tone ?? "sand";

                return (
                  <Link
                    key={category.slug}
                    href={buildExploreHref({ category: category.slug })}
                    className="w-[150px] h-[190px] shrink-0 snap-start group relative overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune/40"
                  >
                    {/* ImagePlaceholder as background fallback */}
                    <div aria-hidden="true" className="absolute inset-0 h-full w-full">
                      <ImagePlaceholder
                        tone={tone}
                        label=""
                        className="h-full w-full border-none"
                      />
                    </div>
                    {media?.src && (
                      <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes="150px"
                        quality={75}
                        className="object-cover"
                        style={{ objectPosition: media.objectPosition ?? "center" }}
                      />
                    )}

                    <div className="absolute bottom-3 left-3 z-10 rounded-full bg-warm-bone px-3 py-1 shadow-xs border border-border-subtle/50">
                      <span className="text-xs font-semibold text-deep-slate block">
                        {category.shortName}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Link
                href="/categories"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-laterite hover:text-laterite-dark transition-colors"
              >
                <span>See all categories</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CategoryRevealWrapper>
        </div>
      </div>
    </section>
  );
}
