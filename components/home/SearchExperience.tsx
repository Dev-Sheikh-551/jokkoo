"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { CATEGORIES } from "@/data/categories";

export function SearchExperience() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedLocation && selectedLocation !== "all") {
      params.set("location", selectedLocation);
    }
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-stretch bg-warm-bone border border-border-subtle p-2 gap-2 rounded-[3px] shadow-sm"
      >
        {/* Trade / Keyword Input */}
        <div className="relative flex-1 flex items-center px-3 min-h-[48px]">
          <Search className="h-4 w-4 text-river-silt shrink-0 mr-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trade or service (e.g. Solar inverter, Plumber, Tailor)..."
            className="w-full bg-transparent text-sm text-deep-slate placeholder:text-river-silt/70 focus:outline-none"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative md:w-64 flex items-center px-3 min-h-[48px] border-t md:border-t-0 md:border-l border-border-subtle">
          <MapPin className="h-4 w-4 text-laterite shrink-0 mr-2.5" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full bg-transparent text-sm text-deep-slate focus:outline-none cursor-pointer"
          >
            <option value="">All Locations in The Gambia</option>
            {GAMBIAN_LOCATIONS.filter((loc) => loc.id !== "all").map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.region})
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-laterite hover:bg-laterite-dark text-white text-sm font-medium rounded-[2px] transition-colors shrink-0"
        >
          <span>Find Pros</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick Search Suggestions */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-river-silt">
        <span className="font-medium text-deep-slate">Popular searches:</span>
        {CATEGORIES.slice(0, 5).map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => router.push(`/explore?category=${cat.slug}`)}
            className="hover:text-laterite hover:underline"
          >
            {cat.name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
