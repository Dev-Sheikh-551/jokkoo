import { Search, SlidersHorizontal } from "lucide-react";
import { getExploreProfessionals } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";

export function ExploreFallback() {
  const allProfessionals = getExploreProfessionals();
  const initialCards = allProfessionals.slice(0, 12);
  const totalCount = allProfessionals.length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header with live result summary */}
      <div className="border-b border-border-subtle pb-6 mb-8 space-y-2">
        <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-deep-slate">
          Explore professionals
        </h1>
        <p className="text-sm font-medium text-river-silt">
          {totalCount} professionals in The Gambia
        </p>
      </div>

      {/* 2. Controls & Categories */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-river-silt" />
            <input
              type="search"
              placeholder="Search by name, skill, or service (e.g. solar, wiring)..."
              disabled
              className="w-full h-11 min-h-[44px] rounded-full border border-border-subtle bg-white pl-10 pr-10 text-sm text-deep-slate placeholder:text-river-silt/70 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled
              className="inline-flex h-11 min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 text-sm font-medium text-deep-slate"
            >
              <SlidersHorizontal className="h-4 w-4 text-river-silt" />
              <span>Filters</span>
            </button>

            <div className="relative w-full sm:w-auto sm:shrink-0">
              <select
                disabled
                className="w-full sm:w-auto h-11 min-h-[44px] rounded-full border border-border-subtle bg-white px-4 text-sm font-medium text-deep-slate outline-none text-center sm:text-left"
              >
                <option>Sort: Recommended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category chips row with right edge fade */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
            <span className="min-h-[44px] inline-flex items-center rounded-full px-5 text-sm font-medium whitespace-nowrap border bg-laterite text-white border-laterite shrink-0">
              All
            </span>
            {CATEGORIES.map((cat) => (
              <span
                key={cat.slug}
                className="min-h-[44px] inline-flex items-center rounded-full px-5 text-sm font-medium whitespace-nowrap border bg-white text-deep-slate border-border-subtle shrink-0"
              >
                {cat.shortName}
              </span>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 sm:w-12 bg-gradient-to-l from-warm-bone to-transparent"
          />
        </div>
      </div>

      {/* 3. Initial Cards Grid or Empty State */}
      {allProfessionals.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-white p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <h2 className="font-serif font-medium text-2xl text-deep-slate">
            Be one of the first professionals on Jokkoo
          </h2>
          <p className="text-sm text-river-silt leading-relaxed">
            Profiles across The Gambia will appear here as professionals join. Build your profile today to get discovered.
          </p>
          <div className="pt-2 flex justify-center">
            <span className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white shadow-xs">
              Build your profile
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <h2 className="sr-only">Available professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialCards.map((pro, index) => (
              <ProfessionalCard
                key={pro.slug}
                professional={pro}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
