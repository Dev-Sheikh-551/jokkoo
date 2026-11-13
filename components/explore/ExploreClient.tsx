"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Filter, X } from "lucide-react";
import { getProfessionals } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";
import { Button } from "@/components/common/Button";

export function ExploreClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allProfessionals = useMemo(() => getProfessionals(), []);

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
    return allProfessionals.filter((pro) => {
      // 1. Text Search query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = pro.displayName.toLowerCase().includes(q);
        const matchesBusiness = pro.businessName?.toLowerCase().includes(q);
        const matchesServices = pro.services.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            (s.description ? s.description.toLowerCase().includes(q) : false)
        );
        const matchesBio = pro.bio.toLowerCase().includes(q);

        if (!matchesName && !matchesBusiness && !matchesServices && !matchesBio) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (!pro.categories.includes(selectedCategory as (typeof pro.categories)[number])) {
          return false;
        }
      }

      // 3. Location filter (Check if base OR served areas match)
      if (selectedLocation && selectedLocation !== "all") {
        const locLower = selectedLocation.toLowerCase();
        const matchesBase = pro.baseLocation.toLowerCase() === locLower;
        const matchesRegular = (pro.regularAreas ?? []).some(
          (area) => area.toLowerCase() === locLower
        );
        const matchesByArrangement = (pro.byArrangementAreas ?? []).some(
          (area) => area.toLowerCase() === locLower
        );
        if (!matchesBase && !matchesRegular && !matchesByArrangement) {
          return false;
        }
      }

      // 4. Verification filter
      if (onlyVerified && pro.verification !== "phone") {
        return false;
      }

      return true;
    });
  }, [allProfessionals, query, selectedCategory, selectedLocation, onlyVerified]);

  const activeFilterCount =
    (query ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedLocation ? 1 : 0) +
    (onlyVerified ? 1 : 0);

  // If no professionals in directory at all (e.g. SHOW_MOCK=false and no real pros yet)
  if (allProfessionals.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center space-y-6">
        <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-deep-slate">
          Directory of Professionals
        </h1>
        <p className="text-sm text-river-silt max-w-md mx-auto leading-relaxed">
          There are no professionals listed on Jokkoo yet. We are actively welcoming independent tradespeople across The Gambia.
        </p>
        <div>
          <Link
            href="/join"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite/90 transition-colors"
          >
            Be the first — join as a professional
          </Link>
        </div>
      </div>
    );
  }

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
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Text Search */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-river-silt/70 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by trade, skill, or keyword..."
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[2px] bg-warm-bone border border-border-subtle text-sm text-deep-slate placeholder:text-river-silt/60 focus:outline-none focus:border-laterite focus:ring-1 focus:ring-laterite transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-river-silt hover:text-deep-slate"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Location Select */}
          <div className="md:col-span-4 relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-river-silt/70 pointer-events-none" />
            <select
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-[2px] bg-warm-bone border border-border-subtle text-sm text-deep-slate focus:outline-none focus:border-laterite focus:ring-1 focus:ring-laterite appearance-none cursor-pointer transition-colors"
            >
              <option value="">All Locations (The Gambia)</option>
              {GAMBIAN_LOCATIONS.filter((loc) => loc.id !== "all").map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="w-full justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar: Category Links */}
        <aside className="hidden lg:block space-y-6 pr-4 border-r border-border-subtle">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-river-silt mb-3">
              Service Categories
            </h3>
            <div className="space-y-1">
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
                <span>{allProfessionals.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = allProfessionals.filter((p) =>
                  p.categories.includes(cat.slug as (typeof p.categories)[number])
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
                Phone verified only
              </span>
            </label>
            <p className="text-[10px] text-river-silt mt-1 pl-5">
              Only shows professionals whose phone number we have confirmed.
            </p>
          </div>
        </aside>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-warm-bone border border-border-subtle px-4 py-3 rounded-[2px]">
            <div className="text-xs text-river-silt">
              Showing <strong className="text-deep-slate">{filteredProfessionals.length}</strong> {filteredProfessionals.length === 1 ? "profile" : "profiles"}
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
