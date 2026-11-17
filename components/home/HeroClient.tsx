"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { Category } from "@/types/category";
import { LocationItem } from "@/data/locations";
import { categoryMedia } from "@/lib/media";
import { buildExploreHref } from "@/lib/search";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface HeroClientProps {
  categories: Category[];
  locations: LocationItem[];
  defaultCategorySlug?: string;
}

export function HeroClient({
  categories,
  locations,
  defaultCategorySlug,
}: HeroClientProps) {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState(
    defaultCategorySlug || categories[0]?.slug || "electrical-work"
  );
  const [selectedArea, setSelectedArea] = useState("");

  const currentCategory = categories.find((c) => c.slug === selectedTrade) || categories[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = buildExploreHref({
      category: selectedTrade,
      location: selectedArea,
    });
    router.push(href);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left Column (Text & Search) */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-river-silt block mb-3">
            Connecting people across The Gambia
          </span>
          <h1 className="font-serif font-medium text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[0.98] tracking-tight text-deep-slate">
            Skilled hands,{" "}
            <span className="italic font-normal text-laterite">
              close to home.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-river-silt max-w-[520px] leading-relaxed mt-4">
            Electricians, tailors, plumbers, mechanics and more. See their work, then reach them on WhatsApp.
          </p>
        </div>

        {/* Sentence Search Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[var(--radius-card,1.5rem)] border border-border-subtle/80 bg-white p-5 sm:p-7 shadow-sm space-y-4"
        >
          <div className="font-serif text-xl sm:text-2xl text-deep-slate leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-3">
            <span>I need help with</span>

            <span className="inline-block relative">
              <label htmlFor="hero-trade-select" className="sr-only">
                Select trade category
              </label>
              <select
                id="hero-trade-select"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
                className="font-serif italic font-normal text-laterite bg-transparent border-b-2 border-laterite/40 pb-0.5 pr-6 cursor-pointer focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite rounded-[2px] transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug} className="font-sans not-italic text-deep-slate">
                    {cat.shortName}
                  </option>
                ))}
              </select>
            </span>

            <span>in</span>

            <span className="inline-block relative">
              <label htmlFor="hero-area-select" className="sr-only">
                Select location or area
              </label>
              <select
                id="hero-area-select"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="font-serif italic font-normal text-laterite bg-transparent border-b-2 border-laterite/40 pb-0.5 pr-6 cursor-pointer focus:outline-none focus:border-laterite focus:ring-2 focus:ring-laterite rounded-[2px] transition-colors"
              >
                <option value="" className="font-sans not-italic text-deep-slate">
                  Anywhere in The Gambia
                </option>
                {locations
                  .filter((loc) => loc.id !== "all")
                  .map((loc) => (
                    <option key={loc.id} value={loc.id} className="font-sans not-italic text-deep-slate">
                      {loc.name}
                    </option>
                  ))}
              </select>
            </span>

            <div className="w-full sm:w-auto sm:ml-auto pt-2 sm:pt-0">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-laterite-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite focus-visible:ring-offset-2"
              >
                Find them
              </button>
            </div>
          </div>
        </form>

        <p className="text-xs text-river-silt">
          Phone-verified profiles get a badge. Contact by WhatsApp or phone. Free to join.
        </p>
      </div>

      {/* Right Column (Dynamic Photo Card) */}
      <div className="lg:col-span-5">
        <div className="relative aspect-4/3 lg:aspect-4/5 w-full overflow-hidden rounded-[var(--radius-card,1.5rem)] border border-border-subtle bg-sand-dune shadow-sm">
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.div
                key={selectedTrade}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative h-full w-full"
              >
                {/* ImagePlaceholder as background fallback if photo fails to load */}
                <div aria-hidden="true" className="absolute inset-0 h-full w-full">
                  <ImagePlaceholder
                    tone={categoryMedia[selectedTrade]?.tone ?? "clay"}
                    label=""
                    className="h-full w-full border-none"
                  />
                </div>
                {categoryMedia[selectedTrade]?.src && (
                  <Image
                    src={categoryMedia[selectedTrade].src!}
                    alt={categoryMedia[selectedTrade].alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={75}
                    priority={selectedTrade === (categories[0]?.slug ?? "electrical-work")}
                    className="object-cover"
                    style={{
                      objectPosition: categoryMedia[selectedTrade]?.objectPosition ?? "center",
                    }}
                  />
                )}
              </m.div>
            </AnimatePresence>
          </LazyMotion>

          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 max-w-[calc(100%-1.5rem)] px-3 py-1 rounded-[2px] bg-deep-slate/90 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-warm-bone backdrop-blur-xs">
            {currentCategory?.shortName ?? "Trade"}
          </div>
        </div>
      </div>
    </div>
  );
}
