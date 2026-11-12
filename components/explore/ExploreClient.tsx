"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin, Filter, X, RotateCcw, AlertCircle } from "lucide-react";
import { SAMPLE_PROFESSIONALS } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { Button } from "@/components/common/Button";

export function ExploreClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialLocation = searchParams.get("location") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const updateURL = (newQuery: string, newCat: string, newLoc: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set("q", newQuery);
    if (newCat) params.set("category", newCat);
    if (newLoc) params.set("location", newLoc);
    router.replace(`/explore?${params.toString()}`);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateURL(val, selectedCategory, selectedLocation);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    updateURL(query, val, selectedLocation);
  };

  const handleLocationChange = (val: string) => {
    setSelectedLocation(val);
    updateURL(query, selectedCategory, val);
  };

  const resetFilters = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedLocation("");
    setOnlyVerified(false);
    router.replace("/explore");
  };

  // Filter logic
  const filteredProfessionals = useMemo(() => {
    return SAMPLE_PROFESSIONALS.filter((pro) => {
      // 1. Text Search query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = pro.name.toLowerCase().includes(q);
        const matchesBusiness = pro.businessName?.toLowerCase().includes(q);
        const matchesProfession = pro.profession.toLowerCase().includes(q);
        const matchesServices = pro.services.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.description.toLowerCase().includes(q)
        );
        const matchesBio = pro.bio.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesBusiness &&
          !matchesProfession &&
          !matchesServices &&
          !matchesBio
        ) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (pro.categorySlug !== selectedCategory) {
          return false;
        }
      }

      // 3. Location filter (Check if base OR served areas match)
      if (selectedLocation && selectedLocation !== "all") {
        const locLower = selectedLocation.toLowerCase();
        const matchesBase = pro.coverage.baseLocation
          .toLowerCase()
          .includes(locLower);
        const matchesCoverage = pro.coverage.coverageAreas.some((area) =>
          area.toLowerCase().includes(locLower)
        );
        if (!matchesBase && !matchesCoverage) {
          return false;
        }
      }

      // 4. Verification filter
      if (onlyVerified && !pro.verification.isVerified) {
        return false;
      }

      return true;
    });
  }, [query, selectedCategory, selectedLocation, onlyVerified]);

  const activeFilterCount =
    (query ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedLocation ? 1 : 0) +
    (onlyVerified ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Page Header */}
      <div className="mb-8 border-b border-border-subtle pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-laterite">
          The Gambia Service Directory
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-deep-slate mt-1">
          Explore Skilled Professionals
        </h1>
        <p className="text-sm text-river-silt mt-1.5 max-w-2xl">
          Browse artisans, trade contractors, and service businesses. Every professional lists their actual base workshop and confirmed geographic coverage.
        </p>

        {/* Development Data Notice */}
        <div className="mt-4 p-3 rounded-[2px] bg-sand-dune/60 border border-border-subtle flex items-start gap-2.5 text-xs text-river-silt">
          <AlertCircle className="h-4 w-4 text-laterite shrink-0 mt-0.5" />
          <div>
            <strong className="text-deep-slate">Sample Data:</strong> The profiles below represent trade archetypes and sample data. Free to join.
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-warm-bone border border-border-subtle rounded-[2px]">
          <span className="text-xs font-semibold text-deep-slate">
            {filteredProfessionals.length} Professionals Found
          </span>
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-sand-dune text-xs font-medium text-deep-slate"
          >
            <Filter className="h-3.5 w-3.5 text-laterite" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>
        </div>

        {/* Filters Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`lg:block ${
            isMobileFiltersOpen ? "block" : "hidden"
          } lg:col-span-1 space-y-6 bg-warm-bone border border-border-subtle p-5 rounded-[3px]`}
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h2 className="text-sm font-semibold text-deep-slate flex items-center gap-2">
              <Filter className="h-4 w-4 text-laterite" />
              <span>Filter Directory</span>
            </h2>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-laterite hover:underline flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search by Keyword */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-deep-slate block">
              Keyword or Trade
            </label>
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-river-silt absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="e.g. Solar, Joiner, Boubou..."
                className="w-full pl-8 pr-3 py-2 text-xs bg-sand-dune/40 border border-border-subtle rounded-[2px] text-deep-slate placeholder:text-river-silt/70 focus:outline-none focus:border-laterite"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => handleQueryChange("")}
                  className="absolute right-2.5 top-2.5 text-river-silt hover:text-deep-slate"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-deep-slate block">
              Location / Coverage
            </label>
            <div className="relative">
              <MapPin className="h-3.5 w-3.5 text-laterite absolute left-3 top-3 pointer-events-none" />
              <select
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-sand-dune/40 border border-border-subtle rounded-[2px] text-deep-slate focus:outline-none focus:border-laterite cursor-pointer"
              >
                <option value="">All Service Areas</option>
                {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-[11px] text-river-silt leading-tight">
              Only shows pros who explicitly confirm coverage for this district.
            </p>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-deep-slate block">
              Service Category
            </label>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => handleCategoryChange("")}
                className={`w-full text-left px-2.5 py-1.5 rounded-[2px] text-xs transition-colors flex items-center justify-between ${
                  !selectedCategory
                    ? "bg-sand-dune font-semibold text-deep-slate"
                    : "text-river-silt hover:bg-sand-dune/40 hover:text-deep-slate"
                }`}
              >
                <span>All Categories</span>
                <span>{SAMPLE_PROFESSIONALS.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = SAMPLE_PROFESSIONALS.filter(
                  (p) => p.categorySlug === cat.slug
                ).length;
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-[2px] text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-sand-dune font-semibold text-deep-slate"
                        : "text-river-silt hover:bg-sand-dune/40 hover:text-deep-slate"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="text-[10px] text-river-silt/70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verification Status Filter */}
          <div className="pt-2 border-t border-border-subtle">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="h-3.5 w-3.5 rounded-[2px] border-border-subtle text-laterite focus:ring-laterite accent-laterite"
              />
              <span className="text-xs text-deep-slate font-medium">
                Identity Verified Only
              </span>
            </label>
            <p className="text-[10px] text-river-silt mt-1 pl-5">
              Filters for professionals with validated government ID & physical base.
            </p>
          </div>
        </aside>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-warm-bone border border-border-subtle px-4 py-3 rounded-[2px]">
            <div className="text-xs text-river-silt">
              Showing <strong className="text-deep-slate">{filteredProfessionals.length}</strong> sample {filteredProfessionals.length === 1 ? "profile" : "profiles"}
              {selectedCategory && (
                <span> in <span className="font-semibold text-deep-slate">{CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}</span></span>
              )}
              {selectedLocation && (
                <span> covering <span className="font-semibold text-deep-slate">{GAMBIAN_LOCATIONS.find((l) => l.id === selectedLocation)?.name || selectedLocation}</span></span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-laterite hover:underline"
              >
                Clear all filters ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Listing Grid */}
          {filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfessionals.map((pro) => (
                <ProfessionalCard key={pro.id} professional={pro} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-sand-dune/20 border border-dashed border-border-subtle rounded-[3px] space-y-4">
              <div className="h-12 w-12 mx-auto flex items-center justify-center rounded-full bg-sand-dune text-river-silt">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-deep-slate">
                No professionals match your current filters
              </h3>
              <p className="text-xs text-river-silt max-w-sm mx-auto">
                Try widening your location coverage or selecting a different service category.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="mt-2"
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
