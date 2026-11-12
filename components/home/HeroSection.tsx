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
        />
      </div>
    </section>
  );
}
