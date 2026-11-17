import { Search, SlidersHorizontal } from "lucide-react";
import { getProfessionals } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";

export function ExploreFallback() {
  const allProfessionals = getProfessionals();
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
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-river-silt" />
            <input
              type="search"
              placeholder="Search by name, trade or service (e.g. solar, wiring)..."
              disabled
              className="w-full h-11 min-h-[44px] rounded-full border border-border-subtle bg-white pl-10 pr-10 text-sm text-deep-slate placeholder:text-river-silt/70 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled
              className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 text-sm font-medium text-deep-slate shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4 text-river-silt" />
              <span>Filters</span>
            </button>

            <div className="relative shrink-0">
              <select
                disabled
                className="h-11 min-h-[44px] rounded-full border border-border-subtle bg-white px-4 text-sm font-medium text-deep-slate outline-none"
              >
                <option>Sort: Recommended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category chips row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <span className="min-h-[44px] inline-flex items-center rounded-full px-5 text-sm font-medium whitespace-nowrap border bg-laterite text-white border-laterite">
            All
          </span>
          {CATEGORIES.map((cat) => (
            <span
              key={cat.slug}
              className="min-h-[44px] inline-flex items-center rounded-full px-5 text-sm font-medium whitespace-nowrap border bg-white text-deep-slate border-border-subtle"
            >
              {cat.shortName}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Initial Cards Grid */}
      <div className="space-y-8">
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
    </div>
  );
}
