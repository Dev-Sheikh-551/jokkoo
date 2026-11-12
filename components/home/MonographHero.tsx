"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { CATEGORIES } from "@/data/categories";

export function MonographHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (selectedLocation && selectedLocation !== "all") {
      params.set("location", selectedLocation);
    }
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative w-full border-b border-border-subtle bg-warm-bone pt-8 pb-16 lg:py-20 overflow-hidden">
      {/* Subtle architectural vertical grid rule on desktop */}
      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-border-subtle/50 hidden lg:block pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Folio Metadata Spine */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4 mb-10 text-[11px] font-mono tracking-wider uppercase text-river-silt">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-laterite" />
            <span className="text-deep-slate font-semibold">Jokkoo Monograph</span>
            <span>•</span>
            <span>Vol. 01 — Digital Craft & Human Connection</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">The Gambia • West Africa</span>
            <span className="px-2 py-0.5 rounded-[2px] bg-sand-dune border border-border-subtle text-deep-slate font-sans font-medium text-[10px]">
              Milestone 1 Preview
            </span>
          </div>
        </div>

        {/* Hero Composition: Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Monumental Typography & Manifesto & Search (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 lg:pr-8">
            <div className="space-y-4">
              <span className="text-xs uppercase font-semibold tracking-[0.25em] text-laterite block">
                The Living Archive of Skilled Labour
              </span>

              {/* Monumental Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-deep-slate leading-[1.02]">
                Where hands{" "}
                <span className="font-serif italic font-normal text-laterite">
                  shape dignity.
                </span>
              </h1>

              {/* Curated Editorial Manifesto */}
              <p className="text-base sm:text-lg text-river-silt leading-relaxed max-w-2xl pt-2 font-normal">
                An art-directed marketplace celebrating the masters behind everyday infrastructure across The Gambia. From precision solar inverter matrices to bespoke mahogany millwork and ceremonial couture—connect directly without platform deductions.
              </p>
            </div>

            {/* Architectural Dispatch Search Console */}
            <div className="border border-border-subtle bg-sand-dune/30 p-2 sm:p-2.5 rounded-[2px] shadow-xs">
              <div className="text-[10px] uppercase font-mono tracking-widest text-river-silt px-2 pb-1.5 border-b border-border-subtle/60 flex items-center justify-between">
                <span>Dispatch Terminal</span>
                <span>Direct Artisan Locator</span>
              </div>

              <form onSubmit={handleDispatch} className="flex flex-col sm:flex-row gap-2 pt-2">
                {/* Craft Input */}
                <div className="flex-1 flex items-center px-3 py-2 bg-warm-bone border border-border-subtle rounded-[2px]">
                  <Search className="h-4 w-4 text-river-silt shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search craft or material (e.g. Solar, Joinery, Boubou)..."
                    className="w-full bg-transparent text-xs sm:text-sm text-deep-slate placeholder:text-river-silt/70 focus:outline-none"
                  />
                </div>

                {/* Territory Selector */}
                <div className="sm:w-56 flex items-center px-3 py-2 bg-warm-bone border border-border-subtle rounded-[2px]">
                  <MapPin className="h-4 w-4 text-laterite shrink-0 mr-2" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-deep-slate focus:outline-none cursor-pointer"
                  >
                    <option value="">All Territories</option>
                    {GAMBIAN_LOCATIONS.filter((l) => l.id !== "all").map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dispatch Trigger */}
                <button
                  type="submit"
                  className="px-5 py-3 bg-laterite hover:bg-laterite-dark text-white text-xs font-semibold tracking-wider uppercase rounded-[2px] transition-colors shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Dispatch</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Taxonomy Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 px-1 text-[11px] text-river-silt">
                <span className="font-mono text-[10px] uppercase text-deep-slate mr-1">Direct Index:</span>
                {CATEGORIES.slice(0, 4).map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => router.push(`/explore?category=${c.slug}`)}
                    className="px-2 py-0.5 rounded-[2px] bg-warm-bone border border-border-subtle text-deep-slate hover:border-laterite hover:text-laterite transition-colors"
                  >
                    {c.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Architectural Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle text-xs text-river-silt font-mono">
              <div className="space-y-0.5">
                <span className="text-deep-slate font-semibold block text-[11px]">01 / IDENTITY VERIFIED</span>
                <p className="text-[10px] text-river-silt leading-tight font-sans">
                  Government-issued identification checked by administrators.
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-deep-slate font-semibold block text-[11px]">02 / DEFINED TERRITORY</span>
                <p className="text-[10px] text-river-silt leading-tight font-sans">
                  Artisans specify actual operational base and coverage limits.
                </p>
              </div>

              <div className="space-y-0.5">
                <span className="text-deep-slate font-semibold block text-[11px]">03 / DIRECT WHATSAPP</span>
                <p className="text-[10px] text-river-silt leading-tight font-sans">
                  Direct communication with zero middleman deductions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Monumental Documentary Photographic Plate (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-[2px] border border-border-subtle bg-sand-dune shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&auto=format&fit=crop&q=80"
                alt="Documentary portrait of a master carpenter examining timber in a Gambian workshop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />

              {/* Architectural Technical Annotations Layered Over Photo */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-deep-slate/90 backdrop-blur-xs text-warm-bone font-mono text-[10px] tracking-wider uppercase border border-white/10">
                Plate 01 • Master Bench
              </div>

              <div className="absolute bottom-3 inset-x-3 p-3 rounded-[2px] bg-warm-bone/95 backdrop-blur-xs border border-border-subtle text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-deep-slate">Pa Ousman Sowe</span>
                  <span className="text-[10px] font-mono text-laterite font-semibold">Bakau Workshop</span>
                </div>
                <p className="text-[11px] text-river-silt leading-tight">
                  Hand-shaping seasoned West African mahogany. Documented 22-year mastery in architectural joinery.
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-river-silt font-mono border-t border-border-subtle/60">
                  <span className="flex items-center gap-1 text-deep-slate">
                    <ShieldCheck className="h-3 w-3 text-laterite" />
                    <span>Identity Verified</span>
                  </span>
                  <span className="italic">Demonstration Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
