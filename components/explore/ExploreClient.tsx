"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, RotateCcw, X } from "lucide-react";
import type { ExploreProfessional } from "@/data/professionals";
import { CATEGORIES } from "@/data/categories";
import {
  getLocationLabel,
  getProfessionalLocationMatch,
} from "@/data/locations";
import { ProfessionalCard } from "@/components/professionals/ProfessionalCard";

const FiltersDialog = dynamic(() => import("./FiltersDialog"), {
  ssr: false,
});

type SortOption = "recommended" | "newest";

const INITIAL_VISIBLE_COUNT = 12;

interface ExploreClientProps {
  initialProfessionals?: ExploreProfessional[];
}

export function ExploreClient({ initialProfessionals = [] }: ExploreClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allProfessionals = useMemo(
    () => initialProfessionals,
    [initialProfessionals]
  );

  // Canonical state derived directly from URL searchParams
  const paramQ = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") ?? "";
  const selectedLocation = searchParams.get("location") ?? "";
  const onlyVerified = searchParams.get("verified") === "true";
  const sortBy = (searchParams.get("sort") as SortOption) || "recommended";

  // Local state for interactive typing, pagination, and dialog drafts
  const [query, setQuery] = useState(paramQ);
  const [debouncedQuery, setDebouncedQuery] = useState(paramQ);
  const [prevParamQ, setPrevParamQ] = useState(paramQ);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Synchronize local input if URL query param changes externally (e.g. back/forward or clear)
  if (prevParamQ !== paramQ) {
    setPrevParamQ(paramQ);
    setQuery(paramQ);
    setDebouncedQuery(paramQ);
  }

  // Draft filters for native <dialog>
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false);
  const [draftLocation, setDraftLocation] = useState(selectedLocation);
  const [draftVerified, setDraftVerified] = useState(onlyVerified);

  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const chipsContainerRef = useRef<HTMLDivElement | null>(null);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const isTypingRef = useRef(false);

  // Scroll active chip into view on mount or URL change
  useEffect(() => {
    if (activeChipRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedCategory]);

  // Debounce query input by 300ms and push to URL via router.replace (no scroll jump)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (isTypingRef.current) {
        isTypingRef.current = false;
        const params = new URLSearchParams(searchParams.toString());
        if (query.trim()) {
          params.set("q", query.trim());
        } else {
          params.delete("q");
        }
        const qs = params.toString();
        router.replace(qs ? `/explore?${qs}` : "/explore", { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  // Helper to push URL changes for discrete actions (chips, modal apply, sort)
  const pushFilterState = useCallback(
    (updates: {
      category?: string;
      location?: string;
      verified?: boolean;
      sort?: SortOption;
      q?: string;
    }) => {
      const nextCategory = updates.category !== undefined ? updates.category : selectedCategory;
      const nextLocation = updates.location !== undefined ? updates.location : selectedLocation;
      const nextVerified = updates.verified !== undefined ? updates.verified : onlyVerified;
      const nextSort = updates.sort !== undefined ? updates.sort : sortBy;
      const nextQ = updates.q !== undefined ? updates.q : query;

      const params = new URLSearchParams();
      if (nextQ.trim()) params.set("q", nextQ.trim());
      if (nextCategory && nextCategory !== "all") params.set("category", nextCategory);
      if (nextLocation && nextLocation !== "all") params.set("location", nextLocation);
      if (nextVerified) params.set("verified", "true");
      if (nextSort && nextSort !== "recommended") params.set("sort", nextSort);

      const qs = params.toString();
      router.push(qs ? `/explore?${qs}` : "/explore", { scroll: false });
      setVisibleCount(INITIAL_VISIBLE_COUNT);
    },
    [selectedCategory, selectedLocation, onlyVerified, sortBy, query, router]
  );

  const handleCategorySelect = (catSlug: string) => {
    const target = catSlug === "all" || catSlug === selectedCategory ? "" : catSlug;
    pushFilterState({ category: target });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    pushFilterState({ sort: newSort });
  };

  // Open native <dialog>
  const openFiltersDialog = () => {
    setDraftLocation(selectedLocation);
    setDraftVerified(onlyVerified);
    setIsFiltersDialogOpen(true);
  };

  // Close native <dialog> and return focus
  const closeFiltersDialog = useCallback(() => {
    setIsFiltersDialogOpen(false);
    filterButtonRef.current?.focus();
  }, []);

  const handleApplyDraftFilters = () => {
    pushFilterState({ location: draftLocation, verified: draftVerified });
    closeFiltersDialog();
  };

  const handleResetFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setDraftLocation("");
    setDraftVerified(false);
    router.push("/explore", { scroll: false });
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    closeFiltersDialog();
  };

  const handleClearLocationOnly = () => {
    setDraftLocation("");
    pushFilterState({ location: "" });
  };

  // Filter & deterministic sort calculation
  const filteredProfessionals = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    // 1. Filtering
    const matches = allProfessionals.filter((pro) => {
      // Keyword query
      if (q) {
        const matchesSearchTerms = (pro.searchTerms ?? []).some((term) =>
          term.toLowerCase().includes(q)
        );
        const matchesName = pro.displayName.toLowerCase().includes(q);
        const matchesBusiness = pro.businessName?.toLowerCase().includes(q) ?? false;
        if (!matchesSearchTerms && !matchesName && !matchesBusiness) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== "all") {
        if (!pro.categories.includes(selectedCategory)) {
          return false;
        }
      }

      // Location filter (base, regular, or by-arrangement)
      if (selectedLocation && selectedLocation !== "all") {
        const matchType = getProfessionalLocationMatch(pro, selectedLocation);
        if (!matchType) {
          return false;
        }
      }

      // Phone verified filter
      if (onlyVerified && pro.verification !== "phone") {
        return false;
      }

      return true;
    });

    // 2. Deterministic sorting helper
    const compareDeterministically = (a: ExploreProfessional, b: ExploreProfessional): number => {
      if (sortBy === "recommended") {
        // Phone verified first
        const aVer = a.verification === "phone" ? 1 : 0;
        const bVer = b.verification === "phone" ? 1 : 0;
        if (aVer !== bVer) return bVer - aVer;

        // Completeness score
        const aScore = a.completenessPercent ?? 0;
        const bScore = b.completenessPercent ?? 0;
        if (aScore !== bScore) return bScore - aScore;

        // Newest date
        const aDate = a.joinedTimestamp;
        const bDate = b.joinedTimestamp;
        if (aDate !== bDate) return bDate - aDate;

        // Tie breaker
        return a.slug.localeCompare(b.slug);
      } else {
        // Newest
        const aDate = a.joinedTimestamp;
        const bDate = b.joinedTimestamp;
        if (aDate !== bDate) return bDate - aDate;
        return a.slug.localeCompare(b.slug);
      }
    };

    // 3. Location matching order priority if location filter is active
    if (selectedLocation && selectedLocation !== "all") {
      const getPriority = (pro: ExploreProfessional): number => {
        const match = getProfessionalLocationMatch(pro, selectedLocation);
        if (match === "base") return 1;
        if (match === "regular") return 2;
        if (match === "byArrangement") return 3;
        return 4;
      };

      return [...matches].sort((a, b) => {
        const prioA = getPriority(a);
        const prioB = getPriority(b);
        if (prioA !== prioB) return prioA - prioB;
        return compareDeterministically(a, b);
      });
    }

    // Default sorting when no location filter is active
    return [...matches].sort(compareDeterministically);
  }, [allProfessionals, debouncedQuery, selectedCategory, selectedLocation, onlyVerified, sortBy]);

  // Compute draft results count for the filters modal button
  const draftResultsCount = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return allProfessionals.filter((pro) => {
      if (q) {
        const matchesSearchTerms = (pro.searchTerms ?? []).some((term) =>
          term.toLowerCase().includes(q)
        );
        const matchesName = pro.displayName.toLowerCase().includes(q);
        const matchesBusiness = pro.businessName?.toLowerCase().includes(q) ?? false;
        if (!matchesSearchTerms && !matchesName && !matchesBusiness) return false;
      }
      if (selectedCategory && selectedCategory !== "all") {
        if (!pro.categories.includes(selectedCategory)) {
          return false;
        }
      }
      if (draftLocation && draftLocation !== "all") {
        const matchType = getProfessionalLocationMatch(pro, draftLocation);
        if (!matchType) return false;
      }
      if (draftVerified && pro.verification !== "phone") {
        return false;
      }
      return true;
    }).length;
  }, [allProfessionals, debouncedQuery, selectedCategory, draftLocation, draftVerified]);

  const activeModalFiltersCount =
    (selectedLocation && selectedLocation !== "all" ? 1 : 0) + (onlyVerified ? 1 : 0);

  // Result summary text
  const locationLabel = selectedLocation && selectedLocation !== "all" ? getLocationLabel(selectedLocation) : "";
  const resultSummary = useMemo(() => {
    const count = filteredProfessionals.length;
    const unit = count === 1 ? "professional" : "professionals";
    if (locationLabel) {
      return `${count} ${unit} in ${locationLabel}`;
    }
    return `${count} ${unit}`;
  }, [filteredProfessionals.length, locationLabel]);

  // Paginated visible items
  const visibleProfessionals = useMemo(() => {
    return filteredProfessionals.slice(0, visibleCount);
  }, [filteredProfessionals, visibleCount]);

  // EMPTY STATE (A): No professionals at all in directory (mock data off)
  if (allProfessionals.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="font-serif font-medium text-3xl sm:text-4xl text-deep-slate tracking-tight">
            Be one of the first professionals on Jokkoo
          </h1>
          <p className="text-base text-river-silt leading-relaxed">
            Create your profile in about five minutes. Build your presence and connect directly with customers across The Gambia.
          </p>
          <div>
            <Link
              href="/join"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-laterite px-8 py-3 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors shadow-xs"
            >
              Join as a professional
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. Header & Live Result Summary */}
      <div className="space-y-2 border-b border-border-subtle pb-6">
        <h1 className="font-serif font-medium text-3xl sm:text-4xl tracking-tight text-deep-slate">
          Explore professionals
        </h1>
        <div aria-live="polite" className="text-sm font-medium text-river-silt">
          {resultSummary}
        </div>
      </div>

      {/* 2. Search & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Keyword search input (full-width on mobile, flex-1 on desktop) */}
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-river-silt/70 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                isTypingRef.current = true;
                setQuery(e.target.value);
              }}
              placeholder="Search by name, skill, or service..."
              className="w-full h-11 min-h-[44px] rounded-full border border-border-subtle bg-white pl-10 pr-10 text-sm text-deep-slate placeholder:text-river-silt/60 focus:border-laterite focus:ring-1 focus:ring-laterite outline-none transition-colors"
              aria-label="Search professionals by keyword"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  isTypingRef.current = true;
                  setQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 flex items-center justify-center text-river-silt hover:text-deep-slate cursor-pointer"
                aria-label="Clear search text"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Row with Filters button on the left and Sort select on the right (equal weight on mobile, shrink-0 on desktop) */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 w-full sm:w-auto">
            {/* Filters modal toggle button */}
            <button
              ref={filterButtonRef}
              type="button"
              onClick={openFiltersDialog}
              className="inline-flex h-11 min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border-subtle bg-white px-5 text-sm font-medium text-deep-slate hover:border-deep-slate/40 transition-colors cursor-pointer"
              aria-haspopup="dialog"
            >
              <SlidersHorizontal className="h-4 w-4 text-river-silt" />
              <span>Filters</span>
              {activeModalFiltersCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-laterite text-[11px] font-bold text-white">
                  {activeModalFiltersCount}
                </span>
              )}
            </button>

            {/* Sort select */}
            <div className="relative w-full sm:w-auto sm:shrink-0">
              <label htmlFor="explore-sort" className="sr-only">
                Sort professionals
              </label>
              <select
                id="explore-sort"
                value={sortBy}
                onChange={handleSortChange}
                className="w-full sm:w-auto h-11 min-h-[44px] rounded-full border border-border-subtle bg-white px-4 text-sm font-medium text-deep-slate focus:border-laterite focus:ring-1 focus:ring-laterite outline-none cursor-pointer transition-colors text-center sm:text-left"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="newest">Sort: Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category chips row: "All" plus nine, single select, horizontally scrollable with right edge fade */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            ref={chipsContainerRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar"
          >
            <button
              type="button"
              ref={!selectedCategory || selectedCategory === "all" ? activeChipRef : null}
              onClick={(e) => {
                e.currentTarget.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
                handleCategorySelect("all");
              }}
              className={`min-h-[44px] rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border shrink-0 ${
                !selectedCategory || selectedCategory === "all"
                  ? "bg-laterite text-white border-laterite"
                  : "bg-white text-deep-slate border-border-subtle hover:border-deep-slate/40"
              }`}
              aria-pressed={!selectedCategory || selectedCategory === "all"}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  ref={isSelected ? activeChipRef : null}
                  type="button"
                  onClick={(e) => {
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "center",
                    });
                    handleCategorySelect(cat.slug);
                  }}
                  className={`min-h-[44px] rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border shrink-0 ${
                    isSelected
                      ? "bg-laterite text-white border-laterite"
                      : "bg-white text-deep-slate border-border-subtle hover:border-deep-slate/40"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat.shortName}
                </button>
              );
            })}
          </div>
          {/* Soft fade on the right edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 sm:w-12 bg-gradient-to-l from-warm-bone to-transparent"
          />
        </div>
      </div>

      {/* 3. Filters Sheet Dialog (dynamically loaded on open) */}
      <FiltersDialog
        isOpen={isFiltersDialogOpen}
        onClose={closeFiltersDialog}
        draftLocation={draftLocation}
        setDraftLocation={setDraftLocation}
        draftVerified={draftVerified}
        setDraftVerified={setDraftVerified}
        onClearAll={() => {
          setDraftLocation("");
          setDraftVerified(false);
        }}
        onApply={handleApplyDraftFilters}
        draftResultsCount={draftResultsCount}
      />

      {/* 4. Results Grid or Empty States */}
      {allProfessionals.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-white p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <h2 className="font-serif font-medium text-2xl text-deep-slate">
            Be one of the first professionals on Jokkoo
          </h2>
          <p className="text-sm text-river-silt leading-relaxed">
            Profiles across The Gambia will appear here as professionals join. Build your profile today to get discovered.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              href="/join"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-6 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors shadow-xs"
            >
              Build your profile
            </Link>
          </div>
        </div>
      ) : filteredProfessionals.length === 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-white p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <h2 className="font-serif font-medium text-2xl text-deep-slate">
            No professionals match
          </h2>
          <p className="text-sm text-river-silt leading-relaxed">
            We couldn&apos;t find any professionals matching your current filters. Try searching with different keywords or clearing your filters.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border-subtle bg-warm-bone px-5 py-2.5 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear filters</span>
            </button>
            {selectedLocation && (
              <button
                type="button"
                onClick={handleClearLocationOnly}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-laterite px-5 py-2.5 text-sm font-semibold text-white hover:bg-laterite-dark transition-colors cursor-pointer shadow-xs"
              >
                Try anywhere in The Gambia
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <h2 className="sr-only">Available professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleProfessionals.map((pro, index) => (
              <ProfessionalCard
                key={pro.slug}
                professional={pro}
                filterLocation={selectedLocation}
                priority={index === 0}
              />
            ))}
          </div>

          {/* Show More Pagination */}
          {visibleProfessionals.length < filteredProfessionals.length && (
            <div className="flex justify-center pt-4 pb-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT)}
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border-subtle bg-white px-8 py-3 text-sm font-semibold text-deep-slate hover:border-deep-slate/40 transition-colors cursor-pointer shadow-xs"
              >
                Show more professionals ({filteredProfessionals.length - visibleProfessionals.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
