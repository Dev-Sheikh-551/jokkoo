import { CATEGORIES } from "@/data/categories";
import { GAMBIAN_LOCATIONS } from "@/data/locations";
import { HeroClient } from "@/components/home/HeroClient";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-warm-bone py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroClient
          categories={CATEGORIES}
          locations={GAMBIAN_LOCATIONS}
          defaultCategorySlug="electrical-work"
          headerCopy={
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
          }
        />
      </div>
    </section>
  );
}
